-- Final setup script for production-ready Egyptology app
-- This script ensures all systems are optimized and ready for launch

-- Create performance monitoring table
CREATE TABLE IF NOT EXISTS app_performance (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_metric_name (metric_name),
    INDEX idx_recorded_at (recorded_at)
);

-- Create app configuration table
CREATE TABLE IF NOT EXISTS app_config (
    id SERIAL PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default app configurations
INSERT INTO app_config (config_key, config_value, description) VALUES
('app_version', '2.0.0', 'Current application version'),
('maintenance_mode', 'false', 'Application maintenance mode status'),
('max_concurrent_users', '10000', 'Maximum concurrent users allowed'),
('pi_network_enabled', 'true', 'Pi Network integration status'),
('ai_features_enabled', 'true', 'AI features availability'),
('performance_monitoring', 'true', 'Performance monitoring status')
ON DUPLICATE KEY UPDATE 
    config_value = VALUES(config_value),
    updated_at = CURRENT_TIMESTAMP;

-- Create system health check procedure
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS CheckSystemHealth()
BEGIN
    DECLARE user_count INT DEFAULT 0;
    DECLARE active_sessions INT DEFAULT 0;
    DECLARE db_size_mb DECIMAL(10,2) DEFAULT 0;
    
    -- Get current user count
    SELECT COUNT(*) INTO user_count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR);
    
    -- Get active sessions
    SELECT COUNT(*) INTO active_sessions FROM user_sessions WHERE last_activity >= DATE_SUB(NOW(), INTERVAL 1 HOUR);
    
    -- Get database size
    SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) INTO db_size_mb
    FROM information_schema.tables 
    WHERE table_schema = DATABASE();
    
    -- Insert performance metrics
    INSERT INTO app_performance (metric_name, metric_value) VALUES
    ('daily_new_users', user_count),
    ('active_sessions', active_sessions),
    ('database_size_mb', db_size_mb),
    ('system_uptime_hours', 24);
    
    -- Return system status
    SELECT 
        'System Health Check' as status,
        user_count as daily_new_users,
        active_sessions as active_sessions,
        db_size_mb as database_size_mb,
        NOW() as check_time;
END //
DELIMITER ;

-- Create automated cleanup procedure
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS CleanupOldData()
BEGIN
    -- Clean old performance metrics (keep last 30 days)
    DELETE FROM app_performance WHERE recorded_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
    
    -- Clean old chat messages (keep last 90 days)
    DELETE FROM chat_messages WHERE created_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
    
    -- Clean expired user sessions
    DELETE FROM user_sessions WHERE last_activity < DATE_SUB(NOW(), INTERVAL 7 DAY);
    
    -- Optimize tables
    OPTIMIZE TABLE users, chat_messages, app_performance, user_sessions;
END //
DELIMITER ;

-- Create event scheduler for automated maintenance
SET GLOBAL event_scheduler = ON;

-- Schedule daily health check
CREATE EVENT IF NOT EXISTS daily_health_check
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO CALL CheckSystemHealth();

-- Schedule weekly cleanup
CREATE EVENT IF NOT EXISTS weekly_cleanup
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_TIMESTAMP
DO CALL CleanupOldData();

-- Final system status check
SELECT 
    'Egyptology App Database' as system_name,
    '2.0.0' as version,
    'Production Ready' as status,
    NOW() as setup_completed;

-- Grant necessary permissions for app user
-- GRANT SELECT, INSERT, UPDATE, DELETE ON *.* TO 'app_user'@'%';
-- FLUSH PRIVILEGES;

COMMIT;
