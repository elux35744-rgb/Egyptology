-- إضافة فهارس نهائية لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_messages_user_created ON messages(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at DESC) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_user_progress_updated ON user_progress(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_training_status ON ai_training_sessions(status, created_at DESC);

-- إضافة إحصائيات للتطبيق
INSERT INTO app_settings (key, value, description) VALUES
('app_version', '1.0.0', 'إصدار التطبيق الحالي'),
('launch_date', CURRENT_DATE::text, 'تاريخ إطلاق التطبيق'),
('total_features', '25', 'عدد الميزات المتاحة'),
('supported_languages', '3', 'عدد اللغات المدعومة')
ON CONFLICT (key) DO UPDATE SET 
  value = EXCLUDED.value,
  updated_at = CURRENT_TIMESTAMP;

-- تحديث إحصائيات المحتوى
UPDATE app_settings SET value = (
  SELECT COUNT(*)::text FROM hieroglyphic_dictionary
) WHERE key = 'total_hieroglyphs';

UPDATE app_settings SET value = (
  SELECT COUNT(*)::text FROM educational_videos
) WHERE key = 'total_videos';

UPDATE app_settings SET value = (
  SELECT COUNT(*)::text FROM archaeological_sites
) WHERE key = 'total_sites';
