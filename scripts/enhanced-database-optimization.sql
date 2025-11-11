-- Enhanced Database Optimization Script
-- Performance tuning, indexing strategies, and maintenance procedures

-- Enable query performance monitoring
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT pg_stat_statements_reset();

-- Create advanced composite indexes for complex queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_engagement_composite 
ON users(is_active, subscription_type, learning_level, total_points DESC, last_active_at DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_content_discovery_composite 
ON content_items(status, content_type, difficulty_level, featured DESC, trending DESC, average_rating DESC, view_count DESC);

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_learning_analytics
