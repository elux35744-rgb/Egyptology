-- Advanced Database Schema for Egyptology App
-- Enhanced with AI, Analytics, and Performance Optimizations

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Create custom types
CREATE TYPE user_role AS ENUM ('user', 'premium', 'vip', 'moderator', 'admin', 'super_admin');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'expired', 'pending');
CREATE TYPE content_type AS ENUM ('article', 'video', 'story', 'hieroglyph', 'place', 'game', 'course', 'quiz', 'ar_experience');
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert', 'master');
CREATE TYPE ai_model_type AS ENUM ('conversation', 'content_generation', 'emotion_detection', 'video_creation', 'personalization');
CREATE TYPE payment_method AS ENUM ('pi_network', 'bitcoin', 'ethereum', 'credit_card', 'paypal', 'stripe');
CREATE TYPE notification_type AS ENUM ('system', 'achievement', 'social', 'learning', 'payment', 'security');

-- Enhanced Users table with advanced features
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    cover_image_url TEXT,
    bio TEXT,
    location VARCHAR(255),
    country VARCHAR(100),
    timezone VARCHAR(50),
    language VARCHAR(10) DEFAULT 'ar',
    role user_role DEFAULT 'user',
    subscription_type VARCHAR(50) DEFAULT 'free',
    subscription_status subscription_status DEFAULT 'inactive',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    learning_level difficulty_level DEFAULT 'beginner',
    interests TEXT[],
    specialization VARCHAR(255),
    total_points INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_learning_time INTEGER DEFAULT 0, -- in seconds
    videos_created INTEGER DEFAULT 0,
    articles_read INTEGER DEFAULT 0,
    games_completed INTEGER DEFAULT 0,
    achievements_count INTEGER DEFAULT 0,
    friends_count INTEGER DEFAULT 0,
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    reputation_score INTEGER DEFAULT 0,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login_at TIMESTAMP WITH TIME ZONE,
    login_count INTEGER DEFAULT 0,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    privacy_settings JSONB DEFAULT '{}',
    notification_settings JSONB DEFAULT '{}',
    ai_preferences JSONB DEFAULT '{}',
    learning_preferences JSONB DEFAULT '{}',
    social_links JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    is_banned BOOLEAN DEFAULT FALSE,
    ban_reason TEXT,
    banned_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Content Items table
CREATE TABLE content_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    content_type content_type NOT NULL,
    difficulty_level difficulty_level DEFAULT 'beginner',
    language VARCHAR(10) DEFAULT 'ar',
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category VARCHAR(100),
    tags TEXT[],
    keywords TEXT[],
    thumbnail_url TEXT,
    cover_image_url TEXT,
    video_url TEXT,
    audio_url TEXT,
    ar_model_url TEXT,
    vr_experience_url TEXT,
    duration_seconds INTEGER,
    estimated_read_time INTEGER,
    word_count INTEGER,
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    engagement_score INTEGER DEFAULT 0,
    quality_score DECIMAL(3,2) DEFAULT 0,
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_model_used VARCHAR(100),
    ai_confidence_score DECIMAL(3,2),
    content_vector vector(1536), -- for AI embeddings
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    trending BOOLEAN DEFAULT FALSE,
    premium_only BOOLEAN DEFAULT FALSE,
    age_restriction INTEGER DEFAULT 0,
    content_warnings TEXT[],
    accessibility_features TEXT[],
    interactive_elements JSONB DEFAULT '{}',
    learning_objectives TEXT[],
    prerequisites TEXT[],
    related_content_ids UUID[],
    external_links JSONB DEFAULT '{}',
    copyright_info TEXT,
    license_type VARCHAR(100) DEFAULT 'all_rights_reserved',
    status VARCHAR(50) DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    scheduled_publish_at TIMESTAMP WITH TIME ZONE,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version INTEGER DEFAULT 1,
    revision_notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced AI Conversations table
CREATE TABLE ai_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID NOT NULL,
    message_type VARCHAR(50) NOT NULL, -- 'user', 'assistant', 'system'
    content TEXT NOT NULL,
    content_vector vector(1536),
    ai_model_used VARCHAR(100),
    ai_personality VARCHAR(50) DEFAULT 'wise',
    emotion_detected VARCHAR(50),
    sentiment_score DECIMAL(3,2),
    confidence_score DECIMAL(3,2),
    response_time_ms INTEGER,
    tokens_used INTEGER,
    cost_usd DECIMAL(10,6),
    topics_extracted TEXT[],
    entities_extracted JSONB DEFAULT '{}',
    intent_detected VARCHAR(100),
    context_data JSONB DEFAULT '{}',
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_text TEXT,
    is_helpful BOOLEAN,
    is_accurate BOOLEAN,
    language VARCHAR(10) DEFAULT 'ar',
    translation_data JSONB DEFAULT '{}',
    attachments JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced User Learning Analytics
CREATE TABLE user_learning_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    session_id UUID,
    action_type VARCHAR(100) NOT NULL, -- 'view', 'complete', 'bookmark', 'share', 'rate', 'comment'
    time_spent_seconds INTEGER DEFAULT 0,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    scroll_depth DECIMAL(5,2) DEFAULT 0,
    interaction_count INTEGER DEFAULT 0,
    pause_count INTEGER DEFAULT 0,
    replay_count INTEGER DEFAULT 0,
    speed_adjustments INTEGER DEFAULT 0,
    note_count INTEGER DEFAULT 0,
    question_count INTEGER DEFAULT 0,
    correct_answers INTEGER DEFAULT 0,
    wrong_answers INTEGER DEFAULT 0,
    hint_used INTEGER DEFAULT 0,
    satisfaction_rating INTEGER CHECK (satisfaction_rating >= 1 AND satisfaction_rating <= 5),
    difficulty_perceived difficulty_level,
    learning_style_detected VARCHAR(50),
    attention_score DECIMAL(3,2),
    engagement_score DECIMAL(3,2),
    comprehension_score DECIMAL(3,2),
    retention_score DECIMAL(3,2),
    device_type VARCHAR(50),
    browser_type VARCHAR(50),
    screen_resolution VARCHAR(20),
    network_speed VARCHAR(20),
    location_data JSONB DEFAULT '{}',
    context_data JSONB DEFAULT '{}',
    behavioral_patterns JSONB DEFAULT '{}',
    learning_path TEXT[],
    next_recommended_content UUID[],
    personalization_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced AI Model Performance tracking
CREATE TABLE ai_model_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    model_type ai_model_type NOT NULL,
    task_type VARCHAR(100) NOT NULL,
    performance_metrics JSONB NOT NULL,
    accuracy_score DECIMAL(5,4),
    precision_score DECIMAL(5,4),
    recall_score DECIMAL(5,4),
    f1_score DECIMAL(5,4),
    response_time_ms INTEGER,
    throughput_requests_per_second DECIMAL(10,2),
    error_rate DECIMAL(5,4),
    user_satisfaction_avg DECIMAL(3,2),
    cost_per_request DECIMAL(10,6),
    training_data_size BIGINT,
    inference_count BIGINT DEFAULT 0,
    success_count BIGINT DEFAULT 0,
    failure_count BIGINT DEFAULT 0,
    last_training_date TIMESTAMP WITH TIME ZONE,
    deployment_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'active',
    configuration JSONB DEFAULT '{}',
    hardware_specs JSONB DEFAULT '{}',
    optimization_notes TEXT,
    benchmark_results JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced Pharaonic Videos table
CREATE TABLE pharaonic_videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    description TEXT,
    source_images TEXT[] NOT NULL,
    style_type VARCHAR(100) NOT NULL,
    generation_settings JSONB NOT NULL,
    ai_model_version VARCHAR(50),
    generation_status VARCHAR(50) DEFAULT 'pending',
    progress_percentage INTEGER DEFAULT 0,
    current_step TEXT,
    generated_video_url TEXT,
    thumbnail_url TEXT,
    preview_gif_url TEXT,
    duration_seconds INTEGER,
    resolution VARCHAR(20),
    file_size_mb DECIMAL(10,2),
    quality_metrics JSONB DEFAULT '{}',
    face_accuracy_score DECIMAL(3,2),
    style_consistency_score DECIMAL(3,2),
    motion_smoothness_score DECIMAL(3,2),
    audio_sync_score DECIMAL(3,2),
    overall_quality_score DECIMAL(3,2),
    processing_time_seconds INTEGER,
    gpu_time_seconds INTEGER,
    cpu_time_seconds INTEGER,
    memory_used_gb DECIMAL(10,2),
    cost_usd DECIMAL(10,4),
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    share_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    user_rating DECIMAL(3,2),
    is_public BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    error_message TEXT,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced User Achievements system
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'progress', 'milestone', 'special', 'seasonal'
    rarity VARCHAR(50) DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary', 'mythic'
    icon_url TEXT,
    badge_url TEXT,
    animation_url TEXT,
    points_reward INTEGER DEFAULT 0,
    xp_reward INTEGER DEFAULT 0,
    unlock_requirements JSONB NOT NULL,
    prerequisites UUID[], -- other achievement IDs
    is_hidden BOOLEAN DEFAULT FALSE,
    is_repeatable BOOLEAN DEFAULT FALSE,
    max_completions INTEGER DEFAULT 1,
    time_limit_hours INTEGER,
    seasonal_start DATE,
    seasonal_end DATE,
    unlock_message TEXT,
    share_message TEXT,
    metadata JSONB DEFAULT '{}',
    total_unlocked INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievement Progress tracking
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    progress DECIMAL(5,2) DEFAULT 0,
    current_value INTEGER DEFAULT 0,
    target_value INTEGER NOT NULL,
    is_unlocked BOOLEAN DEFAULT FALSE,
    unlocked_at TIMESTAMP WITH TIME ZONE,
    completion_count INTEGER DEFAULT 0,
    last_progress_update TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress_history JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Enhanced Orders and Payments
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    order_type VARCHAR(50) NOT NULL, -- 'subscription', 'product', 'course', 'premium_feature'
    status VARCHAR(50) DEFAULT 'pending',
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method payment_method,
    currency VARCHAR(10) DEFAULT 'USD',
    subtotal_amount DECIMAL(12,4) NOT NULL,
    tax_amount DECIMAL(12,4) DEFAULT 0,
    discount_amount DECIMAL(12,4) DEFAULT 0,
    shipping_amount DECIMAL(12,4) DEFAULT 0,
    total_amount DECIMAL(12,4) NOT NULL,
    pi_amount DECIMAL(18,8),
    bitcoin_amount DECIMAL(18,8),
    ethereum_amount DECIMAL(18,8),
    exchange_rate DECIMAL(18,8),
    payment_processor VARCHAR(100),
    transaction_id VARCHAR(255),
    payment_intent_id VARCHAR(255),
    refund_amount DECIMAL(12,4) DEFAULT 0,
    refund_reason TEXT,
    billing_address JSONB,
    shipping_address JSONB,
    items JSONB NOT NULL,
    coupon_code VARCHAR(100),
    affiliate_code VARCHAR(100),
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    processed_at TIMESTAMP WITH TIME ZONE,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced Notifications system
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    action_url TEXT,
    action_text VARCHAR(100),
    icon_url TEXT,
    image_url TEXT,
    priority INTEGER DEFAULT 1, -- 1=low, 2=medium, 3=high, 4=urgent
    is_read BOOLEAN DEFAULT FALSE,
    is_clicked BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    delivery_method VARCHAR(50)[], -- 'in_app', 'email', 'push', 'sms'
    delivery_status JSONB DEFAULT '{}',
    personalization_data JSONB DEFAULT '{}',
    ab_test_variant VARCHAR(50),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced AI Training Data
CREATE TABLE ai_training_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dataset_name VARCHAR(255) NOT NULL,
    data_type VARCHAR(100) NOT NULL,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    actual_output TEXT,
    quality_score DECIMAL(3,2),
    human_verified BOOLEAN DEFAULT FALSE,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    model_version VARCHAR(50),
    training_round INTEGER,
    feedback_incorporated BOOLEAN DEFAULT FALSE,
    data_source VARCHAR(100),
    language VARCHAR(10) DEFAULT 'ar',
    domain VARCHAR(100) DEFAULT 'egyptology',
    difficulty_level difficulty_level,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced Analytics Events
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID,
    event_name VARCHAR(255) NOT NULL,
    event_category VARCHAR(100),
    event_action VARCHAR(100),
    event_label VARCHAR(255),
    event_value DECIMAL(12,4),
    page_url TEXT,
    page_title VARCHAR(500),
    referrer_url TEXT,
    user_agent TEXT,
    ip_address INET,
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    device_type VARCHAR(50),
    device_brand VARCHAR(100),
    device_model VARCHAR(100),
    os_name VARCHAR(100),
    os_version VARCHAR(100),
    browser_name VARCHAR(100),
    browser_version VARCHAR(100),
    screen_resolution VARCHAR(20),
    viewport_size VARCHAR(20),
    language VARCHAR(10),
    timezone VARCHAR(50),
    utm_source VARCHAR(255),
    utm_medium VARCHAR(255),
    utm_campaign VARCHAR(255),
    utm_term VARCHAR(255),
    utm_content VARCHAR(255),
    custom_dimensions JSONB DEFAULT '{}',
    custom_metrics JSONB DEFAULT '{}',
    experiment_variants JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced Search Analytics
CREATE TABLE search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID,
    query TEXT NOT NULL,
    query_vector vector(1536),
    normalized_query TEXT,
    language VARCHAR(10) DEFAULT 'ar',
    search_type VARCHAR(50) DEFAULT 'general',
    filters_applied JSONB DEFAULT '{}',
    sort_order VARCHAR(50),
    results_count INTEGER DEFAULT 0,
    clicked_results INTEGER DEFAULT 0,
    first_click_position INTEGER,
    time_to_first_click_ms INTEGER,
    total_time_on_results_ms INTEGER,
    refinement_count INTEGER DEFAULT 0,
    zero_results BOOLEAN DEFAULT FALSE,
    spelling_corrected BOOLEAN DEFAULT FALSE,
    suggested_query TEXT,
    auto_complete_used BOOLEAN DEFAULT FALSE,
    voice_search BOOLEAN DEFAULT FALSE,
    image_search BOOLEAN DEFAULT FALSE,
    location_context JSONB DEFAULT '{}',
    device_context JSONB DEFAULT '{}',
    personalization_applied BOOLEAN DEFAULT FALSE,
    ab_test_variant VARCHAR(50),
    search_intent VARCHAR(100),
    satisfaction_score DECIMAL(3,2),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced Content Recommendations
CREATE TABLE content_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(100) NOT NULL, -- 'collaborative', 'content_based', 'hybrid', 'trending', 'personalized'
    algorithm_used VARCHAR(100),
    confidence_score DECIMAL(3,2),
    relevance_score DECIMAL(3,2),
    diversity_score DECIMAL(3,2),
    novelty_score DECIMAL(3,2),
    position_in_list INTEGER,
    context VARCHAR(100), -- 'homepage', 'after_content', 'search', 'category'
    user_features JSONB DEFAULT '{}',
    content_features JSONB DEFAULT '{}',
    interaction_features JSONB DEFAULT '{}',
    temporal_features JSONB DEFAULT '{}',
    was_clicked BOOLEAN DEFAULT FALSE,
    was_viewed BOOLEAN DEFAULT FALSE,
    was_completed BOOLEAN DEFAULT FALSE,
    was_liked BOOLEAN DEFAULT FALSE,
    was_shared BOOLEAN DEFAULT FALSE,
    time_to_click_ms INTEGER,
    time_spent_seconds INTEGER,
    feedback_rating INTEGER CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    explanation TEXT,
    ab_test_variant VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced User Preferences
CREATE TABLE user_ai_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    preferred_ai_personality VARCHAR(50) DEFAULT 'wise',
    response_length VARCHAR(20) DEFAULT 'medium',
    formality_level INTEGER DEFAULT 5 CHECK (formality_level >= 1 AND formality_level <= 10),
    creativity_level INTEGER DEFAULT 5 CHECK (creativity_level >= 1 AND creativity_level <= 10),
    cultural_depth INTEGER DEFAULT 7 CHECK (cultural_depth >= 1 AND cultural_depth <= 10),
    preferred_topics TEXT[],
    avoided_topics TEXT[],
    content_difficulty_preference difficulty_level DEFAULT 'adaptive',
    learning_style VARCHAR(50),
    preferred_content_types content_type[],
    preferred_languages VARCHAR(10)[] DEFAULT ARRAY['ar'],
    voice_enabled BOOLEAN DEFAULT FALSE,
    voice_speed DECIMAL(3,2) DEFAULT 1.0,
    voice_pitch DECIMAL(3,2) DEFAULT 1.0,
    accessibility_needs TEXT[],
    notification_frequency VARCHAR(50) DEFAULT 'normal',
    recommendation_diversity DECIMAL(3,2) DEFAULT 0.7,
    privacy_level VARCHAR(50) DEFAULT 'balanced',
    data_sharing_consent BOOLEAN DEFAULT FALSE,
    personalization_enabled BOOLEAN DEFAULT TRUE,
    adaptive_learning BOOLEAN DEFAULT TRUE,
    gamification_enabled BOOLEAN DEFAULT TRUE,
    social_features_enabled BOOLEAN DEFAULT TRUE,
    analytics_opt_in BOOLEAN DEFAULT TRUE,
    marketing_opt_in BOOLEAN DEFAULT FALSE,
    research_participation BOOLEAN DEFAULT FALSE,
    beta_features_enabled BOOLEAN DEFAULT FALSE,
    advanced_features_enabled BOOLEAN DEFAULT FALSE,
    custom_settings JSONB DEFAULT '{}',
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced System Logs
CREATE TABLE system_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    level VARCHAR(20) NOT NULL, -- 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'
    category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id UUID,
    request_id UUID,
    correlation_id UUID,
    service_name VARCHAR(100),
    service_version VARCHAR(50),
    environment VARCHAR(50),
    hostname VARCHAR(255),
    ip_address INET,
    user_agent TEXT,
    url TEXT,
    method VARCHAR(10),
    status_code INTEGER,
    response_time_ms INTEGER,
    memory_usage_mb DECIMAL(10,2),
    cpu_usage_percent DECIMAL(5,2),
    database_queries INTEGER,
    database_time_ms INTEGER,
    cache_hits INTEGER,
    cache_misses INTEGER,
    external_api_calls INTEGER,
    external_api_time_ms INTEGER,
    error_code VARCHAR(100),
    error_message TEXT,
    stack_trace TEXT,
    additional_data JSONB DEFAULT '{}',
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Advanced Security Events
CREATE TABLE security_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL, -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    country VARCHAR(100),
    city VARCHAR(100),
    device_fingerprint TEXT,
    session_id UUID,
    description TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
    is_blocked BOOLEAN DEFAULT FALSE,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_by UUID REFERENCES users(id),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolution_notes TEXT,
    false_positive BOOLEAN DEFAULT FALSE,
    automated_response TEXT,
    manual_review_required BOOLEAN DEFAULT FALSE,
    related_events UUID[],
    mitigation_actions TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comprehensive indexes for performance
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
CREATE INDEX CONCURRENTLY idx_users_username ON users(username);
CREATE INDEX CONCURRENTLY idx_users_role ON users(role);
CREATE INDEX CONCURRENTLY idx_users_subscription ON users(subscription_type, subscription_status);
CREATE INDEX CONCURRENTLY idx_users_active ON users(is_active, last_active_at);
CREATE INDEX CONCURRENTLY idx_users_location ON users(country, location);
CREATE INDEX CONCURRENTLY idx_users_learning ON users(learning_level, total_points);

CREATE INDEX CONCURRENTLY idx_content_type_status ON content_items(content_type, status);
CREATE INDEX CONCURRENTLY idx_content_author ON content_items(author_id, created_at);
CREATE INDEX CONCURRENTLY idx_content_category ON content_items(category, difficulty_level);
CREATE INDEX CONCURRENTLY idx_content_featured ON content_items(featured, trending);
CREATE INDEX CONCURRENTLY idx_content_published ON content_items(published_at) WHERE status = 'published';
CREATE INDEX CONCURRENTLY idx_content_tags ON content_items USING GIN(tags);
CREATE INDEX CONCURRENTLY idx_content_keywords ON content_items USING GIN(keywords);
CREATE INDEX CONCURRENTLY idx_content_vector ON content_items USING ivfflat (content_vector vector_cosine_ops);
CREATE INDEX CONCURRENTLY idx_content_engagement ON content_items(engagement_score DESC, view_count DESC);
CREATE INDEX CONCURRENTLY idx_content_quality ON content_items(quality_score DESC, average_rating DESC);

CREATE INDEX CONCURRENTLY idx_ai_conversations_user ON ai_conversations(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_ai_conversations_session ON ai_conversations(session_id, created_at);
CREATE INDEX CONCURRENTLY idx_ai_conversations_model ON ai_conversations(ai_model_used, ai_personality);
CREATE INDEX CONCURRENTLY idx_ai_conversations_emotion ON ai_conversations(emotion_detected, sentiment_score);
CREATE INDEX CONCURRENTLY idx_ai_conversations_feedback ON ai_conversations(feedback_rating, is_helpful);
CREATE INDEX CONCURRENTLY idx_ai_conversations_vector ON ai_conversations USING ivfflat (content_vector vector_cosine_ops);
CREATE INDEX CONCURRENTLY idx_ai_conversations_topics ON ai_conversations USING GIN(topics_extracted);

CREATE INDEX CONCURRENTLY idx_learning_analytics_user ON user_learning_analytics(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_learning_analytics_content ON user_learning_analytics(content_id, action_type);
CREATE INDEX CONCURRENTLY idx_learning_analytics_session ON user_learning_analytics(session_id, created_at);
CREATE INDEX CONCURRENTLY idx_learning_analytics_completion ON user_learning_analytics(completion_percentage, satisfaction_rating);
CREATE INDEX CONCURRENTLY idx_learning_analytics_engagement ON user_learning_analytics(engagement_score, attention_score);

CREATE INDEX CONCURRENTLY idx_pharaonic_videos_user ON pharaonic_videos(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_pharaonic_videos_status ON pharaonic_videos(generation_status, created_at);
CREATE INDEX CONCURRENTLY idx_pharaonic_videos_style ON pharaonic_videos(style_type, quality_metrics);
CREATE INDEX CONCURRENTLY idx_pharaonic_videos_public ON pharaonic_videos(is_public, is_featured);

CREATE INDEX CONCURRENTLY idx_achievements_category ON achievements(category, rarity);
CREATE INDEX CONCURRENTLY idx_achievements_active ON achievements(is_active, is_hidden);
CREATE INDEX CONCURRENTLY idx_user_achievements_user ON user_achievements(user_id, is_unlocked);
CREATE INDEX CONCURRENTLY idx_user_achievements_progress ON user_achievements(achievement_id, progress);

CREATE INDEX CONCURRENTLY idx_orders_user ON orders(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_orders_status ON orders(status, payment_status);
CREATE INDEX CONCURRENTLY idx_orders_payment ON orders(payment_method, currency);
CREATE INDEX CONCURRENTLY idx_orders_number ON orders(order_number);

CREATE INDEX CONCURRENTLY idx_notifications_user ON notifications(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_notifications_unread ON notifications(user_id, is_read, priority);
CREATE INDEX CONCURRENTLY idx_notifications_type ON notifications(type, priority);
CREATE INDEX CONCURRENTLY idx_notifications_expires ON notifications(expires_at) WHERE expires_at IS NOT NULL;

CREATE INDEX CONCURRENTLY idx_analytics_events_user ON analytics_events(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_analytics_events_session ON analytics_events(session_id, created_at);
CREATE INDEX CONCURRENTLY idx_analytics_events_name ON analytics_events(event_name, event_category);
CREATE INDEX CONCURRENTLY idx_analytics_events_page ON analytics_events(page_url, created_at);
CREATE INDEX CONCURRENTLY idx_analytics_events_device ON analytics_events(device_type, os_name, browser_name);

CREATE INDEX CONCURRENTLY idx_search_analytics_user ON search_analytics(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_search_analytics_query ON search_analytics(normalized_query, language);
CREATE INDEX CONCURRENTLY idx_search_analytics_results ON search_analytics(results_count, zero_results);
CREATE INDEX CONCURRENTLY idx_search_analytics_vector ON search_analytics USING ivfflat (query_vector vector_cosine_ops);

CREATE INDEX CONCURRENTLY idx_recommendations_user ON content_recommendations(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_recommendations_content ON content_recommendations(content_id, recommendation_type);
CREATE INDEX CONCURRENTLY idx_recommendations_context ON content_recommendations(context, confidence_score);
CREATE INDEX CONCURRENTLY idx_recommendations_interaction ON content_recommendations(was_clicked, was_viewed);

CREATE INDEX CONCURRENTLY idx_system_logs_level ON system_logs(level, created_at);
CREATE INDEX CONCURRENTLY idx_system_logs_category ON system_logs(category, service_name);
CREATE INDEX CONCURRENTLY idx_system_logs_user ON system_logs(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_system_logs_error ON system_logs(error_code, status_code) WHERE level IN ('ERROR', 'FATAL');

CREATE INDEX CONCURRENTLY idx_security_events_type ON security_events(event_type, severity);
CREATE INDEX CONCURRENTLY idx_security_events_user ON security_events(user_id, created_at);
CREATE INDEX CONCURRENTLY idx_security_events_ip ON security_events(ip_address, created_at);
CREATE INDEX CONCURRENTLY idx_security_events_unresolved ON security_events(is_resolved, severity) WHERE NOT is_resolved;

-- Create advanced stored procedures and functions

-- Function to calculate user engagement score
CREATE OR REPLACE FUNCTION calculate_user_engagement_score(user_uuid UUID)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    engagement_score DECIMAL(5,2) := 0;
    activity_score DECIMAL(5,2) := 0;
    content_score DECIMAL(5,2) := 0;
    social_score DECIMAL(5,2) := 0;
    learning_score DECIMAL(5,2) := 0;
BEGIN
    -- Calculate activity score (30% weight)
    SELECT COALESCE(
        (login_count * 0.1 + 
         EXTRACT(EPOCH FROM (NOW() - last_active_at)) / 86400 * -0.5 + 
         current_streak * 0.3) / 3, 0
    ) INTO activity_score
    FROM users WHERE id = user_uuid;
    
    -- Calculate content interaction score (25% weight)
    SELECT COALESCE(
        (articles_read * 0.1 + 
         videos_created * 0.5 + 
         games_completed * 0.2) / 3, 0
    ) INTO content_score
    FROM users WHERE id = user_uuid;
    
    -- Calculate social interaction score (20% weight)
    SELECT COALESCE(
        (friends_count * 0.1 + 
         followers_count * 0.05 + 
         reputation_score * 0.01) / 3, 0
    ) INTO social_score
    FROM users WHERE id = user_uuid;
    
    -- Calculate learning progress score (25% weight)
    SELECT COALESCE(
        (total_points * 0.001 + 
         achievements_count * 0.5 + 
         total_learning_time / 3600 * 0.1) / 3, 0
    ) INTO learning_score
    FROM users WHERE id = user_uuid;
    
    -- Combine all scores with weights
    engagement_score := (activity_score * 0.3 + content_score * 0.25 + social_score * 0.2 + learning_score * 0.25);
    
    -- Normalize to 0-100 scale
    engagement_score := LEAST(engagement_score * 10, 100);
    
    RETURN engagement_score;
END;
$$ LANGUAGE plpgsql;

-- Function to get personalized content recommendations
CREATE OR REPLACE FUNCTION get_personalized_recommendations(
    user_uuid UUID,
    content_limit INTEGER DEFAULT 10,
    recommendation_context VARCHAR DEFAULT 'homepage'
)
RETURNS TABLE(
    content_id UUID,
    title VARCHAR,
    content_type content_type,
    confidence_score DECIMAL,
    recommendation_reason TEXT
) AS $$
DECLARE
    user_preferences RECORD;
    user_learning_level difficulty_level;
    user_interests TEXT[];
BEGIN
    -- Get user preferences and learning data
    SELECT learning_level, interests, ai_preferences
    INTO user_learning_level, user_interests, user_preferences
    FROM users WHERE id = user_uuid;
    
    -- Return personalized recommendations based on multiple factors
    RETURN QUERY
    WITH user_content_interactions AS (
        SELECT 
            ula.content_id,
            AVG(ula.satisfaction_rating) as avg_satisfaction,
            AVG(ula.completion_percentage) as avg_completion,
            COUNT(*) as interaction_count
        FROM user_learning_analytics ula
        WHERE ula.user_id = user_uuid
        GROUP BY ula.content_id
    ),
    similar_users AS (
        SELECT DISTINCT u.id as similar_user_id
        FROM users u
        WHERE u.id != user_uuid
        AND u.learning_level = user_learning_level
        AND u.interests && user_interests
        LIMIT 100
    ),
    collaborative_recommendations AS (
        SELECT 
            ci.id,
            ci.title,
            ci.content_type,
            AVG(ula.satisfaction_rating) * 0.4 + 
            AVG(ula.completion_percentage) * 0.3 + 
            ci.average_rating * 0.3 as score
        FROM content_items ci
        JOIN user_learning_analytics ula ON ci.id = ula.content_id
        JOIN similar_users su ON ula.user_id = su.similar_user_id
        LEFT JOIN user_content_interactions uci ON ci.id = uci.content_id
        WHERE ci.status = 'published'
        AND uci.content_id IS NULL -- User hasn't interacted with this content
        AND (ci.difficulty_level = user_learning_level OR ci.difficulty_level = 'beginner')
        GROUP BY ci.id, ci.title, ci.content_type, ci.average_rating
        HAVING COUNT(ula.user_id) >= 3
    )
    SELECT 
        cr.id,
        cr.title,
        cr.content_type,
        ROUND(cr.score::numeric, 2) as confidence_score,
        'Based on similar users with your interests and learning level' as recommendation_reason
    FROM collaborative_recommendations cr
    ORDER BY cr.score DESC
    LIMIT content_limit;
END;
$$ LANGUAGE plpgsql;

-- Function to update content engagement metrics
CREATE OR REPLACE FUNCTION update_content_engagement_metrics(content_uuid UUID)
RETURNS VOID AS $$
DECLARE
    new_engagement_score INTEGER;
    avg_completion DECIMAL(5,2);
    avg_satisfaction DECIMAL(3,2);
    total_interactions INTEGER;
BEGIN
    -- Calculate engagement metrics from user analytics
    SELECT 
        AVG(completion_percentage),
        AVG(satisfaction_rating),
        COUNT(*)
    INTO avg_completion, avg_satisfaction, total_interactions
    FROM user_learning_analytics
    WHERE content_id = content_uuid;
    
    -- Calculate engagement score (0-100)
    new_engagement_score := COALESCE(
        (avg_completion * 0.4 + 
         avg_satisfaction * 20 * 0.3 + 
         LEAST(total_interactions, 1000) * 0.1 * 0.3)::INTEGER, 
        0
    );
    
    -- Update content item
    UPDATE content_items 
    SET 
        engagement_score = new_engagement_score,
        average_rating = COALESCE(avg_satisfaction, 0),
        updated_at = NOW()
    WHERE id = content_uuid;
END;
$$ LANGUAGE plpgsql;

-- Function to detect and flag suspicious user behavior
CREATE OR REPLACE FUNCTION detect_suspicious_behavior(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    recent_logins INTEGER;
    rapid_actions INTEGER;
    unusual_locations INTEGER;
    risk_score INTEGER := 0;
    is_suspicious BOOLEAN := FALSE;
BEGIN
    -- Check for rapid login attempts
    SELECT COUNT(*)
    INTO recent_logins
    FROM system_logs
    WHERE user_id = user_uuid
    AND category = 'authentication'
    AND level = 'INFO'
    AND created_at > NOW() - INTERVAL '1 hour';
    
    -- Check for rapid content interactions
    SELECT COUNT(*)
    INTO rapid_actions
    FROM user_learning_analytics
    WHERE user_id = user_uuid
    AND created_at > NOW() - INTERVAL '10 minutes';
    
    -- Check for unusual location patterns
    SELECT COUNT(DISTINCT country)
    INTO unusual_locations
    FROM analytics_events
    WHERE user_id = user_uuid
    AND created_at > NOW() - INTERVAL '24 hours';
    
    -- Calculate risk score
    IF recent_logins > 10 THEN risk_score := risk_score + 30; END IF;
    IF rapid_actions > 50 THEN risk_score := risk_score + 25; END IF;
    IF unusual_locations > 3 THEN risk_score := risk_score + 20; END IF;
    
    -- Flag as suspicious if risk score is high
    IF risk_score >= 50 THEN
        is_suspicious := TRUE;
        
        -- Log security event
        INSERT INTO security_events (
            event_type, severity, user_id, description, details, risk_score
        ) VALUES (
            'suspicious_behavior', 'MEDIUM', user_uuid,
            'Automated detection of suspicious user behavior',
            jsonb_build_object(
                'recent_logins', recent_logins,
                'rapid_actions', rapid_actions,
                'unusual_locations', unusual_locations,
                'calculated_risk_score', risk_score
            ),
            risk_score
        );
    END IF;
    
    RETURN is_suspicious;
END;
$$ LANGUAGE plpgsql;

-- Function to generate AI training data from user interactions
CREATE OR REPLACE FUNCTION generate_ai_training_data()
RETURNS INTEGER AS $$
DECLARE
    training_records_created INTEGER := 0;
    conversation_record RECORD;
BEGIN
    -- Generate training data from high-quality conversations
    FOR conversation_record IN
        SELECT 
            ac.content as input_data,
            ac.content as expected_output,
            ac.feedback_rating,
            ac.ai_model_used,
            ac.confidence_score,
            ac.emotion_detected,
            ac.topics_extracted
        FROM ai_conversations ac
        WHERE ac.feedback_rating >= 4
        AND ac.confidence_score >= 0.8
        AND ac.created_at > NOW() - INTERVAL '7 days'
        AND NOT EXISTS (
            SELECT 1 FROM ai_training_data atd 
            WHERE atd.input_data = ac.content
        )
    LOOP
        INSERT INTO ai_training_data (
            dataset_name,
            data_type,
            input_data,
            expected_output,
            quality_score,
            model_version,
            metadata
        ) VALUES (
            'conversation_feedback',
            'conversation',
            conversation_record.input_data,
            conversation_record.expected_output,
            conversation_record.feedback_rating / 5.0,
            conversation_record.ai_model_used,
            jsonb_build_object(
                'confidence_score', conversation_record.confidence_score,
                'emotion_detected', conversation_record.emotion_detected,
                'topics_extracted', conversation_record.topics_extracted
            )
        );
        
        training_records_created := training_records_created + 1;
    END LOOP;
    
    RETURN training_records_created;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic updates

-- Trigger to update user stats when learning analytics are added
CREATE OR REPLACE FUNCTION update_user_stats_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Update user learning statistics
    UPDATE users SET
        total_learning_time = total_learning_time + COALESCE(NEW.time_spent_seconds, 0),
        articles_read = CASE 
            WHEN NEW.action_type = 'complete' AND 
                 EXISTS(SELECT 1 FROM content_items WHERE id = NEW.content_id AND content_type = 'article')
            THEN articles_read + 1 
            ELSE articles_read 
        END,
        games_completed = CASE 
            WHEN NEW.action_type = 'complete' AND 
                 EXISTS(SELECT 1 FROM content_items WHERE id = NEW.content_id AND content_type = 'game')
            THEN games_completed + 1 
            ELSE games_completed 
        END,
        updated_at = NOW()
    WHERE id = NEW.user_id;
    
    -- Update content engagement metrics asynchronously
    PERFORM update_content_engagement_metrics(NEW.content_id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_stats
    AFTER INSERT ON user_learning_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats_trigger();

-- Trigger to update content view counts
CREATE OR REPLACE FUNCTION update_content_stats_trigger()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE content_items SET
        view_count = CASE WHEN NEW.action_type = 'view' THEN view_count + 1 ELSE view_count END,
        like_count = CASE WHEN NEW.action_type = 'like' THEN like_count + 1 ELSE like_count END,
        share_count = CASE WHEN NEW.action_type = 'share' THEN share_count + 1 ELSE share_count END,
        bookmark_count = CASE WHEN NEW.action_type = 'bookmark' THEN bookmark_count + 1 ELSE bookmark_count END,
        completion_count = CASE WHEN NEW.action_type = 'complete' THEN completion_count + 1 ELSE completion_count END,
        updated_at = NOW()
    WHERE id = NEW.content_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_content_stats
    AFTER INSERT ON user_learning_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_content_stats_trigger();

-- Trigger to automatically generate AI training data
CREATE OR REPLACE FUNCTION auto_generate_training_data_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- Only process high-quality conversations with feedback
    IF NEW.feedback_rating >= 4 AND NEW.confidence_score >= 0.8 THEN
        INSERT INTO ai_training_data (
            dataset_name,
            data_type,
            input_data,
            expected_output,
            quality_score,
            model_version,
            metadata
        ) VALUES (
            'auto_generated_feedback',
            'conversation',
            NEW.content,
            NEW.content,
            NEW.feedback_rating / 5.0,
            NEW.ai_model_used,
            jsonb_build_object(
                'confidence_score', NEW.confidence_score,
                'emotion_detected', NEW.emotion_detected,
                'sentiment_score', NEW.sentiment_score,
                'topics_extracted', NEW.topics_extracted,
                'auto_generated', true
            )
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_generate_training_data
    AFTER UPDATE OF feedback_rating ON ai_conversations
    FOR EACH ROW
    WHEN (NEW.feedback_rating IS NOT NULL AND OLD.feedback_rating IS NULL)
    EXECUTE FUNCTION auto_generate_training_data_trigger();

-- Create views for common queries

-- View for user dashboard statistics
CREATE VIEW user_dashboard_stats AS
SELECT 
    u.id,
    u.username,
    u.full_name,
    u.total_points,
    u.current_streak,
    u.achievements_count,
    u.total_learning_time,
    calculate_user_engagement_score(u.id) as engagement_score,
    COUNT(DISTINCT ula.content_id) as content_interacted,
    COUNT(DISTINCT CASE WHEN ula.completion_percentage >= 80 THEN ula.content_id END) as content_completed,
    AVG(ula.satisfaction_rating) as avg_satisfaction,
    RANK() OVER (ORDER BY u.total_points DESC) as points_rank,
    RANK() OVER (ORDER BY u.current_streak DESC) as streak_rank
FROM users u
LEFT JOIN user_learning_analytics ula ON u.id = ula.user_id
WHERE u.is_active = true
GROUP BY u.id, u.username, u.full_name, u.total_points, u.current_streak, u.achievements_count, u.total_learning_time;

-- View for content performance metrics
CREATE VIEW content_performance_metrics AS
SELECT 
    ci.id,
    ci.title,
    ci.content_type,
    ci.difficulty_level,
    ci.view_count,
    ci.like_count,
    ci.share_count,
    ci.completion_count,
    ci.average_rating,
    ci.engagement_score,
    COUNT(DISTINCT ula.user_id) as unique_users,
    AVG(ula.time_spent_seconds) as avg_time_spent,
    AVG(ula.completion_percentage) as avg_completion_rate,
    AVG(ula.satisfaction_rating) as avg_user_satisfaction,
    COUNT(CASE WHEN ula.completion_percentage >= 80 THEN 1 END) * 100.0 / NULLIF(COUNT(*), 0) as completion_rate_percent
FROM content_items ci
LEFT JOIN user_learning_analytics ula ON ci.id = ula.content_id
WHERE ci.status = 'published'
GROUP BY ci.id, ci.title, ci.content_type, ci.difficulty_level, ci.view_count, 
         ci.like_count, ci.share_count, ci.completion_count, ci.average_rating, ci.engagement_score;

-- View for AI model performance summary
CREATE VIEW ai_model_performance_summary AS
SELECT 
    model_name,
    model_type,
    AVG(accuracy_score) as avg_accuracy,
    AVG(response_time_ms) as avg_response_time,
    AVG(user_satisfaction_avg) as avg_user_satisfaction,
    SUM(inference_count) as total_inferences,
    SUM(success_count) as total_successes,
    SUM(failure_count) as total_failures,
    (SUM(success_count) * 100.0 / NULLIF(SUM(inference_count), 0)) as success_rate,
    MAX(last_training_date) as last_training_date,
    COUNT(*) as version_count
FROM ai_model_performance
WHERE status = 'active'
GROUP BY model_name, model_type;

-- Create materialized views for heavy analytical queries

-- Materialized view for daily analytics
CREATE MATERIALIZED VIEW daily_analytics AS
SELECT 
    DATE(created_at) as date,
    COUNT(DISTINCT user_id) as daily_active_users,
    COUNT(*) as total_events,
    COUNT(DISTINCT session_id) as unique_sessions,
    AVG(EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))) as avg_session_duration,
    COUNT(CASE WHEN event_name = 'page_view' THEN 1 END) as page_views,
    COUNT(CASE WHEN event_name = 'content_interaction' THEN 1 END) as content_interactions,
    COUNT(CASE WHEN event_name = 'ai_conversation' THEN 1 END) as ai_conversations,
    COUNT(CASE WHEN event_name = 'video_generation' THEN 1 END) as video_generations
FROM analytics_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Create unique index on materialized view
CREATE UNIQUE INDEX idx_daily_analytics_date ON daily_analytics(date);

-- Materialized view for content recommendations cache
CREATE MATERIALIZED VIEW content_recommendations_cache AS
SELECT 
    ci.id as content_id,
    ci.title,
    ci.content_type,
    ci.difficulty_level,
    ci.category,
    ci.tags,
    ci.average_rating,
    ci.engagement_score,
    ci.view_count,
    ci.content_vector,
    COUNT(DISTINCT ula.user_id) as interaction_count,
    AVG(ula.satisfaction_rating) as avg_satisfaction,
    AVG(ula.completion_percentage) as avg_completion
FROM content_items ci
LEFT JOIN user_learning_analytics ula ON ci.id = ula.content_id
WHERE ci.status = 'published'
GROUP BY ci.id, ci.title, ci.content_type, ci.difficulty_level, ci.category, 
         ci.tags, ci.average_rating, ci.engagement_score, ci.view_count, ci.content_vector;

-- Create index on materialized view
CREATE INDEX idx_content_recommendations_cache_vector ON content_recommendations_cache USING ivfflat (content_vector vector_cosine_ops);
CREATE INDEX idx_content_recommendations_cache_type ON content_recommendations_cache(content_type, difficulty_level);
CREATE INDEX idx_content_recommendations_cache_engagement ON content_recommendations_cache(engagement_score DESC, avg_satisfaction DESC);

-- Create refresh functions for materialized views
CREATE OR REPLACE FUNCTION refresh_daily_analytics()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_analytics;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION refresh_content_recommendations_cache()
RETURNS VOID AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY content_recommendations_cache;
END;
$$ LANGUAGE plpgsql;

-- Create scheduled jobs (using pg_cron extension if available)
-- SELECT cron.schedule('refresh-daily-analytics', '0 1 * * *', 'SELECT refresh_daily_analytics();');
-- SELECT cron.schedule('refresh-recommendations-cache', '*/30 * * * *', 'SELECT refresh_content_recommendations_cache();');

-- Create database maintenance procedures
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Delete system logs older than 90 days
    DELETE FROM system_logs 
    WHERE created_at < NOW() - INTERVAL '90 days'
    AND level NOT IN ('ERROR', 'FATAL');
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Delete analytics events older than 1 year
    DELETE FROM analytics_events 
    WHERE created_at < NOW() - INTERVAL '1 year';
    
    -- Delete resolved security events older than 6 months
    DELETE FROM security_events 
    WHERE created_at < NOW() - INTERVAL '6 months'
    AND is_resolved = true;
    
    -- Vacuum and analyze affected tables
    VACUUM ANALYZE system_logs;
    VACUUM ANALYZE analytics_events;
    VACUUM ANALYZE security_events;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create database health check function
CREATE OR REPLACE FUNCTION database_health_check()
RETURNS TABLE(
    check_name TEXT,
    status TEXT,
    details TEXT,
    recommendation TEXT
) AS $$
BEGIN
    -- Check table sizes
    RETURN QUERY
    SELECT 
        'table_sizes'::TEXT,
        CASE WHEN pg_total_relation_size('analytics_events') > 10737418240 THEN 'WARNING' ELSE 'OK' END,
        'Analytics events table size: ' || pg_size_pretty(pg_total_relation_size('analytics_events')),
        CASE WHEN pg_total_relation_size('analytics_events') > 10737418240 
             THEN 'Consider partitioning or archiving old data' 
             ELSE 'Table size is acceptable' END;
    
    -- Check index usage
    RETURN QUERY
    SELECT 
        'index_usage'::TEXT,
        CASE WHEN COUNT(*) > 0 THEN 'WARNING' ELSE 'OK' END,
        'Unused indexes found: ' || COUNT(*)::TEXT,
        CASE WHEN COUNT(*) > 0 
             THEN 'Review and drop unused indexes to improve performance' 
             ELSE 'All indexes are being used' END
    FROM pg_stat_user_indexes 
    WHERE idx_scan = 0 AND schemaname = 'public';
    
    -- Check for long-running queries
    RETURN QUERY
    SELECT 
        'long_running_queries'::TEXT,
        CASE WHEN COUNT(*) > 0 THEN 'WARNING' ELSE 'OK' END,
        'Long-running queries: ' || COUNT(*)::TEXT,
        CASE WHEN COUNT(*) > 0 
             THEN 'Investigate and optimize slow queries' 
             ELSE 'No long-running queries detected' END
    FROM pg_stat_activity 
    WHERE state = 'active' 
    AND query_start < NOW() - INTERVAL '5 minutes'
    AND query NOT LIKE '%pg_stat_activity%';
    
    -- Check connection count
    RETURN QUERY
    SELECT 
        'connection_count'::TEXT,
        CASE WHEN COUNT(*) > 80 THEN 'WARNING' ELSE 'OK' END,
        'Active connections: ' || COUNT(*)::TEXT,
        CASE WHEN COUNT(*) > 80 
             THEN 'Consider connection pooling or increasing max_connections' 
             ELSE 'Connection count is healthy' END
    FROM pg_stat_activity;
END;
$$ LANGUAGE plpgsql;

-- Grant appropriate permissions
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT, UPDATE ON user_learning_analytics TO authenticated;
GRANT INSERT, UPDATE ON ai_conversations TO authenticated;
GRANT INSERT ON analytics_events TO authenticated;
GRANT INSERT ON search_analytics TO authenticated;
GRANT SELECT ON user_dashboard_stats TO authenticated;
GRANT SELECT ON content_performance_metrics TO authenticated;
GRANT SELECT ON ai_model_performance_summary TO authenticated;

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_learning_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_own_data ON users FOR ALL USING (auth.uid() = id);
CREATE POLICY user_analytics_own_data ON user_learning_analytics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY ai_conversations_own_data ON ai_conversations FOR ALL USING (auth.uid() = user_id);
CREATE POLICY user_achievements_own_data ON user_achievements FOR ALL USING (auth.uid() = user_id);
CREATE POLICY notifications_own_data ON notifications FOR ALL USING (auth.uid() = user_id);
CREATE POLICY orders_own_data ON orders FOR ALL USING (auth.uid() = user_id);

-- Content is publicly readable but only authors can modify
CREATE POLICY content_public_read ON content_items FOR SELECT USING (status = 'published' OR auth.uid() = author_id);
CREATE POLICY content_author_write ON content_items FOR ALL USING (auth.uid() = author_id);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Enhanced user profiles with advanced learning analytics and AI preferences';
COMMENT ON TABLE content_items IS 'Comprehensive content management with AI features and engagement tracking';
COMMENT ON TABLE ai_conversations IS 'Advanced AI conversation logging with emotion detection and feedback';
COMMENT ON TABLE user_learning_analytics IS 'Detailed learning behavior tracking and analytics';
COMMENT ON TABLE ai_model_performance IS 'AI model performance monitoring and optimization data';
COMMENT ON TABLE pharaonic_videos IS 'AI-generated pharaonic video tracking with quality metrics';
COMMENT ON TABLE achievements IS 'Gamification system with advanced achievement tracking';
COMMENT ON TABLE user_achievements IS 'User progress tracking for achievements and milestones';
COMMENT ON TABLE orders IS 'Enhanced e-commerce with cryptocurrency payment support';
COMMENT ON TABLE notifications IS 'Advanced notification system with personalization';
COMMENT ON TABLE ai_training_data IS 'Machine learning training data collection and management';
COMMENT ON TABLE analytics_events IS 'Comprehensive user behavior and system analytics';
COMMENT ON TABLE search_analytics IS 'Search behavior analysis and optimization data';
COMMENT ON TABLE content_recommendations IS 'AI-powered content recommendation tracking';
COMMENT ON TABLE user_ai_preferences IS 'User preferences for AI interactions and personalization';
COMMENT ON TABLE system_logs IS 'System monitoring and debugging logs';
COMMENT ON TABLE security_events IS 'Security monitoring and threat detection logs';

-- Create database statistics and monitoring
CREATE OR REPLACE FUNCTION get_database_statistics()
RETURNS TABLE(
    table_name TEXT,
    row_count BIGINT,
    table_size TEXT,
    index_size TEXT,
    total_size TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        schemaname||'.'||tablename as table_name,
        n_tup_ins - n_tup_del as row_count,
        pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
        pg_size_pretty(pg_indexes_size(schemaname||'.'||tablename)) as index_size,
        pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size
    FROM pg_stat_user_tables
    ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
END;
$$ LANGUAGE plpgsql;

-- Final database optimization
ANALYZE;
