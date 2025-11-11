-- إدراج البيانات الأولية لتطبيق علم المصريات
-- Initial Data Seeding for Egyptology App

-- إدراج التحديات الأولية
INSERT INTO challenges (title, description, category, difficulty_level, questions, reward_points, reward_pi, time_limit, is_daily) VALUES
('تحدي الآلهة المصرية اليومي', 'اختبر معرفتك بآلهة مصر القديمة', 'gods', 2, '[
  {
    "question": "من هو إله الشمس في الديانة المصرية القديمة؟",
    "options": ["رع", "أنوبيس", "حورس", "تحوت"],
    "correct": 0,
    "explanation": "رع هو إله الشمس الرئيسي في الديانة المصرية القديمة"
  },
  {
    "question": "ما هو رمز الإلهة إيزيس؟",
    "options": ["الصقر", "العقرب", "العرش", "الثعبان"],
    "correct": 2,
    "explanation": "العرش هو الرمز المقدس للإلهة إيزيس"
  },
  {
    "question": "من هو إله الموتى والتحنيط؟",
    "options": ["أوزوريس", "أنوبيس", "سوبك", "خنوم"],
    "correct": 1,
    "explanation": "أنوبيس هو إله الموتى والتحنيط برأس الكلب"
  }
]', 50, 0.5, 300, true),

('تحدي الفراعنة العظام', 'تعرف على أشهر فراعنة مصر', 'pharaohs', 3, '[
  {
    "question": "من هو الفرعون الذي بنى الهرم الأكبر؟",
    "options": ["خوفو", "خفرع", "منكاورع", "زوسر"],
    "correct": 0,
    "explanation": "الملك خوفو هو باني الهرم الأكبر في الجيزة"
  },
  {
    "question": "كم سنة حكمت الملكة حتشبسوت؟",
    "options": ["15 سنة", "22 سنة", "30 سنة", "18 سنة"],
    "correct": 1,
    "explanation": "حكمت الملكة حتشبسوت لمدة 22 سنة تقريباً"
  }
]', 75, 1.0, 400, false),

('تحدي الهيروغليفية للمبتدئين', 'تعلم أساسيات الكتابة الهيروغليفية', 'hieroglyphs', 1, '[
  {
    "question": "ما معنى هذا الرمز 𓂀؟",
    "options": ["ماء", "رجل", "امرأة", "طائر"],
    "correct": 1,
    "explanation": "هذا الرمز يعني رجل في الهيروغليفية"
  },
  {
    "question": "كم عدد أنواع الرموز الهيروغليفية الرئيسية؟",
    "options": ["2", "3", "4", "5"],
    "correct": 1,
    "explanation": "هناك 3 أنواع رئيسية: الأبجدية، المقطعية، والتصويرية"
  }
]', 30, 0.3, 200, false);

-- إدراج المسارات التعليمية
INSERT INTO learning_paths (title, description, category, difficulty_level, estimated_duration, lessons, rewards, is_premium) VALUES
('مسار ملوك مصر العظام', 'رحلة شاملة عبر تاريخ الفراعنة العظام', 'kings', 2, 180, '[
  {
    "id": 1,
    "title": "الأسرات المبكرة ونارمر",
    "content": "تعرف على بداية الحضارة المصرية وتوحيد القطرين",
    "duration": 20,
    "type": "video_text"
  },
  {
    "id": 2,
    "title": "عصر بناة الأهرام",
    "content": "خوفو وخفرع ومنكاورع وعجائب الجيزة",
    "duration": 25,
    "type": "interactive"
  },
  {
    "id": 3,
    "title": "الدولة الوسطى وأمنمحات",
    "content": "عصر الاستقرار والازدهار الثقافي",
    "duration": 20,
    "type": "video_text"
  },
  {
    "id": 4,
    "title": "الإمبراطورية الجديدة",
    "content": "تحتمس الثالث ورمسيس الثاني وأخناتون",
    "duration": 30,
    "type": "interactive"
  },
  {
    "id": 5,
    "title": "الملكات الحاكمات",
    "content": "حتشبسوت ونفرتيتي وكليوباترا",
    "duration": 25,
    "type": "video_text"
  }
]', '{"points": 200, "pi": 2.0, "badge": "ملك الملوك", "certificate": true}', false),

('مسار آلهة مصر القديمة', 'استكشف عالم الآلهة المصرية الغامض', 'gods', 2, 150, '[
  {
    "id": 1,
    "title": "آلهة الخلق الأولى",
    "content": "آتوم ونون وأسطورة الخلق الهليوبوليتانية",
    "duration": 20,
    "type": "video_text"
  },
  {
    "id": 2,
    "title": "التاسوع المقدس",
    "content": "رع وشو وتفنوت وجب ونوت",
    "duration": 25,
    "type": "interactive"
  },
  {
    "id": 3,
    "title": "أوزوريس وإيزيس",
    "content": "أسطورة الموت والبعث",
    "duration": 20,
    "type": "video_text"
  },
  {
    "id": 4,
    "title": "آلهة الحياة اليومية",
    "content": "بس وتاورت وخنوم",
    "duration": 15,
    "type": "interactive"
  }
]', '{"points": 150, "pi": 1.5, "badge": "حامي الآلهة", "certificate": true}', false);

-- إدراج المواقع الأثرية
INSERT INTO archaeological_sites (name, name_ar, description, description_ar, location_lat, location_lng, governorate, period, images, virtual_tour_url, historical_significance) VALUES
('Great Pyramid of Giza', 'الهرم الأكبر بالجيزة', 'The largest and oldest of the Giza pyramid complex', 'أكبر وأقدم أهرامات الجيزة، إحدى عجائب الدنيا السبع القديمة', 29.9792345, 31.1342019, 'الجيزة', 'الدولة القديمة', '["pyramid1.jpg", "pyramid2.jpg", "pyramid3.jpg"]', 'https://virtualtour.giza.com', 'إحدى عجائب الدنيا السبع القديمة الوحيدة الباقية'),

('Valley of the Kings', 'وادي الملوك', 'Royal burial ground for pharaohs of the New Kingdom', 'المقبرة الملكية لفراعنة الدولة الحديثة في الأقصر', 25.7402, 32.6014, 'الأقصر', 'الدولة الحديثة', '["valley1.jpg", "valley2.jpg"]', 'https://virtualtour.valleyofkings.com', 'يضم مقابر أشهر الفراعنة مثل توت عنخ آمون ورمسيس الثاني'),

('Karnak Temple', 'معبد الكرنك', 'Largest ancient religious site in the world', 'أكبر موقع ديني قديم في العالم', 25.7188, 32.6573, 'الأقصر', 'الدولة الوسطى والحديثة', '["karnak1.jpg", "karnak2.jpg", "karnak3.jpg"]', 'https://virtualtour.karnak.com', 'مجمع معابد ضخم مخصص للإله آمون رع'),

('Abu Simbel', 'أبو سمبل', 'Rock temples built by Ramesses II', 'معابد منحوتة في الصخر بناها رمسيس الثاني', 22.3372, 31.6258, 'أسوان', 'الدولة الحديثة', '["abusimbel1.jpg", "abusimbel2.jpg"]', 'https://virtualtour.abusimbel.com', 'معبد رمسيس الثاني ونفرتاري المنقول لإنقاذه من السد العالي');

-- إدراج قاموس الهيروغليفية
INSERT INTO hieroglyphs (symbol, transliteration, meaning_en, meaning_ar, category, pronunciation, examples, image_url) VALUES
('𓂀', 'tp', 'man, person', 'رجل، شخص', 'determinative', 'tep', '["𓂀𓈖 - man", "𓂀𓏏 - person"]', '/hieroglyphs/man.png'),
('𓊃', 'pr', 'house', 'بيت، منزل', 'ideogram', 'per', '["𓊃𓏏 - house", "𓊃𓈖 - houses"]', '/hieroglyphs/house.png'),
('𓇳', 'ra', 'sun, Ra', 'شمس، رع', 'ideogram', 'ra', '["𓇳𓏺 - Ra", "𓇳𓈖 - sun"]', '/hieroglyphs/sun.png'),
('𓈖', 'n', 'of, to', 'من، إلى', 'alphabet', 'en', '["𓈖𓏏 - of", "𓈖𓂋 - to"]', '/hieroglyphs/n.png'),
('𓄿', 'a', 'vulture', 'نسر', 'alphabet', 'ah', '["𓄿𓈖 - an", "𓄿𓏏 - at"]', '/hieroglyphs/vulture.png');

-- إدراج الفيديوهات التعليمية
INSERT INTO educational_videos (title, title_ar, description, description_ar, video_url, thumbnail_url, duration, category, instructor) VALUES
('Introduction to Ancient Egypt', 'مقدمة في مصر القديمة', 'A comprehensive overview of ancient Egyptian civilization', 'نظرة شاملة على الحضارة المصرية القديمة', 'https://video.example.com/intro-egypt', '/thumbnails/intro-egypt.jpg', 1800, 'history', 'د. أحمد فخري'),
('Hieroglyphic Writing System', 'نظام الكتابة الهيروغليفية', 'Learn the basics of reading hieroglyphs', 'تعلم أساسيات قراءة الهيروغليفية', 'https://video.example.com/hieroglyphs', '/thumbnails/hieroglyphs.jpg', 2400, 'language', 'د. سليم حسن'),
('Building the Pyramids', 'بناء الأهرامات', 'How the ancient Egyptians built these wonders', 'كيف بنى المصريون القدماء هذه العجائب', 'https://video.example.com/pyramids', '/thumbnails/pyramids.jpg', 2100, 'architecture', 'د. زاهي حواس');

-- إدراج المنتجات في المتجر
INSERT INTO products (name, name_ar, description, description_ar, category, price_pi, images, digital_content, is_unlimited_stock) VALUES
('Premium Hieroglyph Dictionary', 'قاموس الهيروغليفية المتقدم', 'Complete digital dictionary with over 5000 hieroglyphs', 'قاموس رقمي شامل يحتوي على أكثر من 5000 رمز هيروغليفي', 'digital', 10.00, '["dict1.jpg", "dict2.jpg"]', '{"type": "pdf", "pages": 500, "interactive": true}', true),
('Virtual Reality Temple Tour', 'جولة المعابد بالواقع الافتراضي', 'Immersive VR experience of ancient Egyptian temples', 'تجربة غامرة بالواقع الافتراضي لمعابد مصر القديمة', 'digital', 25.00, '["vr1.jpg", "vr2.jpg"]', '{"type": "vr_app", "temples": 12, "duration": "unlimited"}', true),
('Ancient Egypt Course Certificate', 'شهادة دورة مصر القديمة', 'Official certificate upon course completion', 'شهادة رسمية عند إتمام الدورة التعليمية', 'digital', 50.00, '["cert1.jpg"]', '{"type": "certificate", "accredited": true}', true),
('Papyrus Art Kit', 'طقم فن البردي', 'Traditional papyrus making and painting kit', 'طقم تقليدي لصنع ورسم البردي', 'physical', 75.00, '["papyrus1.jpg", "papyrus2.jpg"]', null, false);

-- إدراج الجلسات المباشرة
INSERT INTO live_sessions (title, title_ar, description, description_ar, expert_name, expert_bio, scheduled_at, duration_minutes, max_participants, entry_fee_pi) VALUES
('Secrets of the Pharaohs', 'أسرار الفراعنة', 'Live discussion about the mysteries of ancient Egyptian rulers', 'نقاش مباشر حول أسرار حكام مصر القديمة', 'د. زاهي حواس', 'عالم آثار مصري مشهور عالمياً', '2024-02-15 19:00:00+00', 90, 200, 5.00),
('Decoding Hieroglyphs', 'فك رموز الهيروغليفية', 'Interactive session on reading ancient Egyptian texts', 'جلسة تفاعلية حول قراءة النصوص المصرية القديمة', 'د. جوان فليتشر', 'خبيرة في علم المصريات من جامعة يورك', '2024-02-20 18:00:00+00', 75, 150, 3.00);

-- إدراج الإنجازات والشارات
INSERT INTO achievements (name, name_ar, description, description_ar, icon_url, category, criteria, reward_points, reward_pi) VALUES
('First Steps', 'الخطوات الأولى', 'Complete your first challenge', 'أكمل أول تحدي لك', '/badges/first-steps.png', 'beginner', '{"challenges_completed": 1}', 10, 0.1),
('Knowledge Seeker', 'باحث المعرفة', 'Complete 10 challenges', 'أكمل 10 تحديات', '/badges/knowledge-seeker.png', 'progress', '{"challenges_completed": 10}', 100, 1.0),
('Pharaoh Expert', 'خبير الفراعنة', 'Complete the Kings learning path', 'أكمل مسار تعلم الملوك', '/badges/pharaoh-expert.png', 'mastery', '{"learning_paths_completed": ["kings"]}', 200, 2.0),
('Community Leader', 'قائد المجتمع', 'Help 50 other users', 'ساعد 50 مستخدم آخر', '/badges/community-leader.png', 'social', '{"users_helped": 50}', 500, 5.0);

-- إدراج المسابقات
INSERT INTO competitions (title, description, type, start_date, end_date, rules, prizes, max_participants, entry_fee_pi) VALUES
('Ancient Egypt Photo Contest', 'مسابقة صور مصر القديمة', 'photo', '2024-02-01 00:00:00+00', '2024-02-28 23:59:59+00', '{"max_photos": 3, "theme": "ancient_egypt", "original_only": true}', '{"first": {"pi": 100, "badge": "Photo Master"}, "second": {"pi": 50}, "third": {"pi": 25}}', 500, 2.00),
('Hieroglyph Translation Challenge', 'تحدي ترجمة الهيروغليفية', 'quiz', '2024-03-01 00:00:00+00', '2024-03-07 23:59:59+00', '{"time_limit": 1800, "questions": 50, "difficulty": "advanced"}', '{"first": {"pi": 200, "certificate": true}, "second": {"pi": 100}, "third": {"pi": 50}}', 1000, 5.00);
