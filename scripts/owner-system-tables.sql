-- Owner System Tables for Egyptology App
-- This script creates tables for owner management, content management, and AI training

-- Owner authentication and management
CREATE TABLE IF NOT EXISTS owners (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'owner',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content management
CREATE TABLE IF NOT EXISTS content_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    author_id INTEGER REFERENCES owners(id),
    featured_image VARCHAR(255),
    tags TEXT[], -- Array of tags
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media files management
CREATE TABLE IF NOT EXISTS media_files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50) NOT NULL, -- image, video, audio, document
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by INTEGER REFERENCES owners(id),
    alt_text VARCHAR(255),
    description TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content-Media relationship
CREATE TABLE IF NOT EXISTS content_media (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES content_posts(id) ON DELETE CASCADE,
    media_id INTEGER REFERENCES media_files(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Models management
CREATE TABLE IF NOT EXISTS ai_models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    model_type VARCHAR(50) NOT NULL, -- chat, translation, analysis, custom
    version VARCHAR(20) NOT NULL,
    accuracy_score DECIMAL(5,2) DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'inactive', -- active, inactive, training, error
    model_path VARCHAR(500),
    configuration JSONB,
    training_data_size INTEGER DEFAULT 0,
    last_trained TIMESTAMP,
    created_by INTEGER REFERENCES owners(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Training sessions
CREATE TABLE IF NOT EXISTS ai_training_sessions (
    id SERIAL PRIMARY KEY,
    model_id INTEGER REFERENCES ai_models(id) ON DELETE CASCADE,
    session_name VARCHAR(100) NOT NULL,
    training_data TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, running, completed, failed
    progress_percentage INTEGER DEFAULT 0,
    accuracy_before DECIMAL(5,2),
    accuracy_after DECIMAL(5,2),
    training_duration INTEGER, -- in seconds
    error_message TEXT,
    started_by INTEGER REFERENCES owners(id),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Training data sets
CREATE TABLE IF NOT EXISTS training_datasets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    data_type VARCHAR(50) NOT NULL, -- conversation, translation, analysis
    file_path VARCHAR(500),
    sample_count INTEGER DEFAULT 0,
    file_size BIGINT,
    status VARCHAR(20) DEFAULT 'processing', -- processing, ready, error
    created_by INTEGER REFERENCES owners(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- System analytics and metrics
CREATE TABLE IF NOT EXISTS system_metrics (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metric_type VARCHAR(50) NOT NULL, -- performance, usage, accuracy, revenue
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Owner activity logs
CREATE TABLE IF NOT EXISTS owner_activity_logs (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES owners(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50), -- content, media, ai_model, user
    resource_id INTEGER,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content analytics
CREATE TABLE IF NOT EXISTS content_analytics (
    id SERIAL PRIMARY KEY,
    content_id INTEGER REFERENCES content_posts(id) ON DELETE CASCADE,
    views_count INTEGER DEFAULT 0,
    unique_views INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00,
    date_recorded DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_content_posts_status ON content_posts(status);
CREATE INDEX IF NOT EXISTS idx_content_posts_category ON content_posts(category);
CREATE INDEX IF NOT EXISTS idx_content_posts_author ON content_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_content_posts_published ON content_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_media_files_type ON media_files(file_type);
CREATE INDEX IF NOT EXISTS idx_media_files_uploaded_by ON media_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_ai_models_status ON ai_models(status);
CREATE INDEX IF NOT EXISTS idx_ai_models_type ON ai_models(model_type);
CREATE INDEX IF NOT EXISTS idx_training_sessions_model ON ai_training_sessions(model_id);
CREATE INDEX IF NOT EXISTS idx_training_sessions_status ON ai_training_sessions(status);
CREATE INDEX IF NOT EXISTS idx_system_metrics_name ON system_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_system_metrics_recorded ON system_metrics(recorded_at);
CREATE INDEX IF NOT EXISTS idx_owner_logs_owner ON owner_activity_logs(owner_id);
CREATE INDEX IF NOT EXISTS idx_owner_logs_action ON owner_activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_content_analytics_content ON content_analytics(content_id);
CREATE INDEX IF NOT EXISTS idx_content_analytics_date ON content_analytics(date_recorded);

-- Create triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_owners_updated_at BEFORE UPDATE ON owners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_posts_updated_at BEFORE UPDATE ON content_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_models_updated_at BEFORE UPDATE ON ai_models
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_datasets_updated_at BEFORE UPDATE ON training_datasets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default owner account (password should be hashed in real implementation)
INSERT INTO owners (username, email, password_hash, full_name, role) 
VALUES ('admin', 'admin@egyptology-app.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9S2', 'مدير التطبيق', 'owner')
ON CONFLICT (username) DO NOTHING;

-- Insert sample content categories
INSERT INTO content_posts (title, content, category, status, author_id, published_at) VALUES
('أسرار الأهرامات المصرية', 'محتوى تفصيلي عن أسرار الأهرامات وطرق بنائها...', 'تاريخ', 'published', 1, CURRENT_TIMESTAMP),
('رحلة في عالم الهيروغليفية', 'دليل شامل لفهم الكتابة الهيروغليفية المصرية القديمة...', 'لغة', 'published', 1, CURRENT_TIMESTAMP),
('معبد الكرنك - جولة افتراضية', 'استكشف معبد الكرنك من خلال جولة افتراضية مذهلة...', 'أماكن', 'published', 1, CURRENT_TIMESTAMP)
ON CONFLICT DO NOTHING;

-- Insert sample AI models
INSERT INTO ai_models (name, model_type, version, accuracy_score, status, created_by) VALUES
('نموذج المحادثة الذكية', 'chat', '1.0', 95.20, 'active', 1),
('نموذج ترجمة الهيروغليفية', 'translation', '1.2', 88.70, 'active', 1),
('نموذج تحليل النصوص التاريخية', 'analysis', '1.1', 92.10, 'active', 1)
ON CONFLICT DO NOTHING;

-- Insert sample training datasets
INSERT INTO training_datasets (name, description, data_type, sample_count, status, created_by) VALUES
('محادثات المستخدمين', 'مجموعة بيانات من محادثات المستخدمين مع المساعد الذكي', 'conversation', 15000, 'ready', 1),
('نصوص هيروغليفية', 'مجموعة من النصوص الهيروغليفية المترجمة', 'translation', 8500, 'ready', 1),
('معلومات تاريخية', 'قاعدة بيانات شاملة للمعلومات التاريخية المصرية', 'analysis', 12300, 'processing', 1)
ON CONFLICT DO NOTHING;

-- Insert sample system metrics
INSERT INTO system_metrics (metric_name, metric_value, metric_type) VALUES
('total_users', 15847, 'usage'),
('active_users', 8923, 'usage'),
('pi_earnings', 12847.50, 'revenue'),
('system_health', 98.5, 'performance'),
('ai_accuracy_avg', 91.8, 'accuracy')
ON CONFLICT DO NOTHING;

COMMENT ON TABLE owners IS 'Table for application owners and administrators';
COMMENT ON TABLE content_posts IS 'Table for managing blog posts and articles';
COMMENT ON TABLE media_files IS 'Table for storing uploaded media files';
COMMENT ON TABLE ai_models IS 'Table for managing AI models and their configurations';
COMMENT ON TABLE ai_training_sessions IS 'Table for tracking AI model training sessions';
COMMENT ON TABLE training_datasets IS 'Table for managing training data sets';
COMMENT ON TABLE system_metrics IS 'Table for storing system performance and usage metrics';
COMMENT ON TABLE owner_activity_logs IS 'Table for logging owner activities and actions';
COMMENT ON TABLE content_analytics IS 'Table for tracking content performance metrics';
