-- Categories
INSERT INTO "Category" (id, name, slug) VALUES
  ('cat-basics', 'Basics', 'basics'),
  ('cat-consonants', 'Consonants', 'consonants'),
  ('cat-vowels', 'Vowels', 'vowels')
ON CONFLICT (slug) DO NOTHING;

-- Lessons
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l1', 'Introduction to Pitman Shorthand', 'introduction-to-pitman-shorthand', 'Learn the history, principles, and basic mechanics of Pitman shorthand.', 'Pitman shorthand was invented by Sir Isaac Pitman in 1837. It is a phonetic system where symbols represent sounds rather than letters.\n\n## Key Principles\n- **Phonetic:** You write what you hear, not how it is spelled.\n- **Light and Heavy Strokes:** Thin strokes for voiceless sounds, thick strokes for voiced sounds.\n- **Position on the Line:** Position relative to the line indicates vowel.', 'Pitman shorthand is built around simple geometric strokes. Each stroke represents a consonant sound. Vowels are dots, dashes, or small marks placed in specific positions.\n\nThickness matters: thin = voiceless (P, T, K), thick = voiced (B, D, G).', '1. Write phonetically.\n2. Light sounds = thin strokes, heavy sounds = thick strokes.\n3. Strokes written left-to-right or top-to-bottom.\n4. Position on the line indicates vowel.', 'BEGINNER', 'PITMAN', 'THEORY', 1, 100, true, 'cat-basics'),
('l2', 'Consonants: Strokes', 'consonants-strokes', 'Master the basic consonant strokes: straight lines, curves, and light/heavy variations.', 'The Pitman consonant system has 24 basic strokes:\n\n## Straight Strokes\n- P/B, T/D, CH/J, K/G (downward)\n- F/V, TH/DH, S/Z, SH/ZH (upward)\n\n## Curved Strokes\n- L (clockwise), R (anticlockwise)\n- M/N, NG, W/Y, H (dot)', 'Each consonant is a single stroke. Direction and shape must be consistent.\n\n**Group 1 — Downward:** P, B, T, D, CH, J, K, G\n**Group 2 — Upward:** F, V, TH, DH, S, Z, SH, ZH\n**Group 3 — Curved:** L, M, N, NG, R', '1. Downward strokes = top to bottom.\n2. Upward strokes = bottom to top.\n3. Curved strokes follow natural arc.\n4. Heavy strokes distinctly thicker.', 'BEGINNER', 'PITMAN', 'THEORY', 2, 100, true, 'cat-consonants'),
('l3', 'Vowels: Placement and Sounds', 'vowels-placement-and-sounds', 'Understand dots, dashes, and their placement relative to consonant strokes.', 'Pitman uses a unique vowel system:\n\n## Representation\n- **Dot** = short vowel (ă, ĕ, ĭ, ŏ, ŭ)\n- **Dash** = long vowel (ā, ē, ī, ō, ū)\n\n## Three Places\n- **First** — above/before = ă, ā, ŏ, ō\n- **Second** — level = ĕ, ē, ŭ\n- **Third** — below/after = ĭ, ī, ū\n\n## Diphthongs\nI (eye) = downward hook, OW = upward hook, OI = combined, U = small hook', 'Vowels are dots, dashes, or hooks at specific positions. Same vowel always written same way.', '1. Short = light dots, long = heavy dots/dashes.\n2. First place = beginning/above.\n3. Second place = middle/level.\n4. Third place = end/below.', 'BEGINNER', 'PITMAN', 'THEORY', 3, 100, true, 'cat-vowels'),
('l4', 'Joining Strokes', 'joining-strokes', 'Learn how to join consonant strokes together smoothly.', '## Basic Joining\nWhen two consonants follow without a vowel, join strokes directly.\n\n## Rules\n1. Same direction = join at angle.\n2. Opposite = back-to-back.\n3. Curve + straight = smooth join.\n4. Retrograde = lift pen.', 'Smooth joining is essential for speed. Practice until fluid.', 'Join at natural angles. Lift pen between complete strokes. Practice common pairs.', 'BEGINNER', 'PITMAN', 'EXERCISE', 4, 150, true, 'cat-consonants'),
('l5', 'Consonant Hooks', 'consonant-hooks', 'Explore R-hooks and L-hooks for consonant blends.', '## R-hook: hook on R-curve side (PR, BR, TR, DR)\n## L-hook: hook on L side (PL, BL, KL, GL)\n\nHooks apply to curved strokes too.', 'Hooks add R or L to a consonant without extra stroke.', 'R-hook = clockwise. L-hook = anticlockwise. Hooks at beginning of stroke.', 'INTERMEDIATE', 'PITMAN', 'THEORY', 5, 150, true, 'cat-consonants'),
('l6', 'Circles and Loops', 'circles-and-loops', 'Master S-circles, SW-loop, and ST-loop.', '## S-Circle: small circle = S/Z\n- Initial S = SP, ST, SK\n- Final S = PS, TS, KS\n\n## SW-Loop: larger initial loop\n## ST Loop: opposite side of stroke', 'Circle size matters: small = S, large = SES/SWS, small loop = ST, large loop = STR.', 'Initial S clockwise, final S anticlockwise. SW larger than S. ST on opposite side.', 'INTERMEDIATE', 'PITMAN', 'THEORY', 6, 150, true, 'cat-consonants'),
('l7', 'Halving and Doubling', 'halving-and-doubling', 'Halving adds T/D, doubling adds TR/DR/THR/DHR.', 'Halving = half length + T/D. Light halved = +T, heavy halved = +D.\n\nDoubling = double length + TR/DR/THR/DHR. Used with curved strokes.', 'Halve to add T/D. Light = T, heavy = D. Double curves for TR/DR.', 'Light halved add T. Heavy halved add D. Double curved strokes for TR/DR.', 'INTERMEDIATE', 'PITMAN', 'THEORY', 7, 150, true, 'cat-vowels'),
('l8', 'Advanced Vowel Representation', 'advanced-vowel-representation', 'Complex vowels, medial vowels, triphthongs, and omission rules.', 'Medial vowels between consonants use first consonant position. Common vowels can be omitted. Triphthongs combine diphthong + vowel marker.', 'Explicit vs implicit vowels. Experienced writers use implicit for speed.', 'First-place vowels go with first consonant. Second = level. Third = second consonant. Omit short vowels in common words.', 'ADVANCED', 'PITMAN', 'THEORY', 8, 200, true, 'cat-vowels'),
('l9', 'Phrasing and Special Contractions', 'phrasing-and-special-contractions', 'Join words without lifting pen, and standard contractions.', 'Phrasing links words: "I have" = IH, "I will" = IWL, "you are" = UR.\n\nContractions: "and" = N dot, "the" = TH dot, "to" = T upward, "for" = F heavy, "of" = O light.', 'Phrase common combinations. Maintain legibility. Learn standard contractions.', 'Phrase common word combinations. Maintain legibility. Contractions for articles, prepositions, pronouns.', 'ADVANCED', 'PITMAN', 'EXERCISE', 9, 200, true, 'cat-vowels'),
('l10', 'Speed Practice Techniques', 'speed-practice-techniques', 'Drills, dictation, and performance tracking for speed building.', 'Building speed: progressive dictation starting at 30 WPM. Drills for strokes, words, phrases.\n\nBenchmarks: Beginner 20-40, Intermediate 40-80, Advanced 80-120, Professional 120-200+ WPM.', 'Speed = stroke knowledge + muscle memory + phrasing + reading skill.', 'Practice 15-30 min daily. Accuracy first, speed follows. Review mistakes. Use timed dictation.', 'ADVANCED', 'PITMAN', 'PRACTICE', 10, 250, true, 'cat-basics')
ON CONFLICT (slug) DO NOTHING;

-- Exercises
INSERT INTO "Exercise" (id, lesson_id, question, answer, hint, "order") VALUES
('e1', 'l1', 'Write the stroke for P (light sound)', 'Thin downward stroke', 'P is voiceless', 1),
('e2', 'l1', 'Write the stroke for B (heavy sound)', 'Thick downward stroke', 'B is voiced counterpart of P', 2),
('e3', 'l2', 'Draw the stroke for T', 'Thin downward straight stroke', 'T is light in Group 1', 1),
('e4', 'l2', 'Draw the stroke for M', 'Thick clockwise curve', 'M is voiced nasal', 2),
('e5', 'l2', 'Stroke direction for F', 'Light upward straight stroke', 'F in upward group', 3),
('e6', 'l3', 'How is short vowel ă represented?', 'Light dot at stroke beginning', 'First-place short vowel', 1),
('e7', 'l3', 'How is long vowel ā represented?', 'Heavy dash at stroke beginning', 'Long form of first-place', 2),
('e8', 'l4', 'Join P and T', 'Downward angle join', 'Same direction strokes', 1),
('e9', 'l4', 'Join M and N for "man"', 'M curve + N curve', 'Both clockwise', 2),
('e10', 'l5', 'Write outline for PR blend', 'P stroke with R-hook', 'Same side as R curve', 1),
('e11', 'l5', 'Write outline for KL blend', 'K stroke with L-hook', 'L-hook anticlockwise', 2),
('e12', 'l6', 'Write outline for SP', 'S-circle + P stroke', 'Initial S = small circle', 1),
('e13', 'l6', 'Write ST loop on T stroke', 'T stroke + opposite side loop', 'ST = small loop', 2),
('e14', 'l7', 'Halved K', 'Shortened K = KT', 'Light halved = T', 1),
('e15', 'l7', 'Doubled M', 'Lengthened M = MTR/MDR', 'Doubled curves = TR', 2),
('e16', 'l8', 'Write "name" with medial vowel', 'N + second-place ā + M', 'Heavy dash at second place', 1),
('e17', 'l8', 'Write "beat" omitting vowel', 'B + T (no vowel)', 'Long e implicit', 2),
('e18', 'l9', 'Write phrase "I am"', 'I + M without lifting', 'Natural flow between strokes', 1),
('e19', 'l9', 'Contraction for "and"', 'N (dot)', 'Simple dot', 2),
('e20', 'l10', 'Recommended daily practice duration', '15-30 minutes daily', 'Consistency over duration', 1),
('e21', 'l10', 'Beginner target WPM range', '20-40 WPM', 'Focus on accuracy first', 2)
ON CONFLICT (id) DO NOTHING;

-- Quizzes
INSERT INTO "Quiz" (id, lesson_id, question, options, correct, "order") VALUES
('q1', 'l1', 'Who invented Pitman shorthand?', '["John Gregg","Isaac Pitman","James Teeline","Samuel Pepys"]', 1, 1),
('q2', 'l1', 'How are light and heavy sounds differentiated?', '["Pen color","Stroke thickness","Stroke direction","Stroke length"]', 1, 2),
('q3', 'l2', 'How many basic consonant strokes in Pitman?', '["12","18","24","30"]', 2, 1),
('q4', 'l2', 'Direction of upward strokes?', '["Left to right","Right to left","Top to bottom","Bottom to top"]', 3, 2),
('q5', 'l3', 'A light dot represents what kind of vowel?', '["Long vowel","Short vowel","Diphthong","Triphthong"]', 1, 1),
('q6', 'l3', 'Where is third-place vowel written?', '["Above stroke","Below/after stroke","Level with stroke","45 degree angle"]', 1, 2),
('q7', 'l4', 'When joining same-direction strokes, what angle?', '["90 degrees","Natural angle","30 degrees","Any angle"]', 1, 1),
('q8', 'l4', 'What is retrograde joining?', '["Sharp angle join","Writing backwards","Lifting between strokes","Loop join"]', 1, 2),
('q9', 'l5', 'R-hook on which side of stroke?', '["Opposite of R curve","Same side as R curve","End of stroke","Middle of stroke"]', 1, 1),
('q10', 'l5', 'What do hooks represent?', '["Vowels","Syllables","Consonant blends","Word endings"]', 2, 2),
('q11', 'l6', 'Small circle at stroke beginning represents?', '["A vowel","S sound","ST cluster","SW sound"]', 1, 1),
('q12', 'l6', 'How does SW-loop differ from S-circle?', '["It is larger","Opposite side","Different shape","Different color"]', 0, 2),
('q13', 'l7', 'Halving a light stroke adds which consonant?', '["S","T","R","N"]', 1, 1),
('q14', 'l7', 'Doubling is applied to what stroke type?', '["Straight","Curved","Dots","Upward only"]', 1, 2),
('q15', 'l8', 'First-place medial vowel is?', '["Above second stroke","Below first stroke","Above first stroke","Level with second"]', 2, 1),
('q16', 'l8', 'When to omit medial vowel?', '["Never","Always","When recognizable from context","Only proper nouns"]', 2, 2),
('q17', 'l9', 'What is phrasing?', '["Joining words without lifting","Alphabetical order","Abbreviating","Using diphthongs"]', 0, 1),
('q18', 'l9', 'Dot N represents which contraction?', '["Not","New","And","No"]', 2, 2),
('q19', 'l10', 'Recommended daily practice?', '["5-10 min","15-30 min","1-2 hours","3-4 hours"]', 1, 1),
('q20', 'l10', 'When to focus on speed?', '["Day one","After accuracy","After one year","Never"]', 1, 2)
ON CONFLICT (id) DO NOTHING;

-- Dictionary
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type) VALUES
('d1', 'the', 'the', 'Definite article', 'Dot (placed before or after the stroke)', 'Small dot in appropriate vowel position.', 'PITMAN'),
('d2', 'and', 'and', 'Conjunction', 'N (dot)', 'Contraction — small dot for N.', 'PITMAN'),
('d3', 'to', 'to', 'Preposition (direction)', 'T (upward stroke)', 'Upward T as standard contraction.', 'PITMAN'),
('d4', 'of', 'of', 'Preposition (possession)', 'O (light upward stroke)', 'Light upward for sound of.', 'PITMAN'),
('d5', 'in', 'in', 'Preposition (position)', 'N (light upward curve)', 'N as light upward curve.', 'PITMAN'),
('d6', 'that', 'that', 'Demonstrative/conjunction', 'TH upward + halved T', 'TH heavy upward + halved T.', 'PITMAN'),
('d7', 'have', 'have', 'Auxiliary verb', 'H dot + V upward', 'H dot + V heavy upward.', 'PITMAN'),
('d8', 'it', 'it', 'Third-person pronoun', 'I dot before T stroke', 'Short vowel i + T.', 'PITMAN'),
('d9', 'for', 'for', 'Preposition (purpose)', 'F (heavy upward)', 'Contraction — F heavy upward.', 'PITMAN'),
('d10', 'with', 'with', 'Preposition (accompaniment)', 'W (heavy stroke)', 'Contraction — W heavy.', 'PITMAN')
ON CONFLICT (slug) DO NOTHING;

-- Blog posts
INSERT INTO "Blog" (id, title, slug, excerpt, content, reading_time, published, featured, author_name, tags, category_id) VALUES
('b1', 'Why Learn Pitman Shorthand in the Digital Age?', 'why-learn-pitman-shorthand', 'Why Pitman shorthand remains relevant for professionals.', '# Why Learn Pitman Shorthand in the Digital Age?\n\nProfessional court reporters reach 200+ WPM using Pitman — far above 40 WPM typing. No voice AI is 100% accurate in noisy courtrooms.\n\n## Cognitive Benefits\nLearning shorthand improves listening, memory, and real-time processing.\n\n## Professional Demand\nCourt reporters, journalists, and transcribers remain in high demand.\n\n## No Batteries Required\nShorthand works with just pen and paper — the ultimate backup.', 4, true, true, 'ShorthandHub Team', '["pitman","shorthand","career tips"]', 'cat-basics'),
('b2', '10 Tips to Double Your Shorthand Speed in 30 Days', 'double-shorthand-speed-30-days', '30-day plan with drills to double your speed.', '## 10 Tips to Double Speed in 30 Days\n\n### Week 1: Foundation\nRevisit strokes, practice consonant pairs, test yourself.\n\n### Week 2: Phrasing\nLearn 20 common phrases, eliminate pen lifts.\n\n### Week 3: Dictation\nStart at 40 WPM, increase 5 WPM per session.\n\n### Week 4: Review\nFind and drill your weak spots.', 5, true, false, 'Sarah Johnson', '["speed building","pitman","practice tips"]', 'cat-basics'),
('b3', 'Comparing Pitman, Gregg, and Teeline Shorthand', 'comparing-pitman-gregg-teeline', 'Which shorthand system is right for you?', '## Comparing Pitman, Gregg, and Teeline\n\n**Pitman** — 1837, phonetic, 200+ WPM, steep curve, best for professionals.\n**Gregg** — 1888, cursive, 200+ WPM, moderate, good for long sessions.\n**Teeline** — 1968, alphabet-based, 100-150 WPM, gentle, best for journalists.\n\nAt ShorthandHub we support all three!', 6, true, true, 'ShorthandHub Team', '["pitman","gregg","teeline","comparison"]', 'cat-basics')
ON CONFLICT (slug) DO NOTHING;

-- Admin user (password: Admin123!)
INSERT INTO "User" (id, name, email, password, role, email_verified) VALUES
('admin-user', 'Admin', 'admin@shorthandhub.com', '$2a$12$LJ3m4ys3Lg3YOCwDg/3OiO7rxs2RcJh8Yh5nGxVpFfBvWBdKqV6eO', 'ADMIN', NOW())
ON CONFLICT (email) DO NOTHING;

-- Achievements
INSERT INTO "Achievement" (id, title, description, icon, xp_reward, criteria) VALUES
('ach-1', 'First Lesson', 'Complete your very first lesson', 'BookOpen', 50, '{"type":"lesson_count","value":1}'),
('ach-2', 'Speed Demon', 'Reach 60 WPM in a practice session', 'Zap', 100, '{"type":"wpm","value":60}'),
('ach-3', 'Streak Master', 'Maintain a 7-day learning streak', 'Flame', 150, '{"type":"streak","value":7}'),
('ach-4', 'Knowledge Seeker', 'Complete 10 lessons', 'GraduationCap', 200, '{"type":"lesson_complete_count","value":10}')
ON CONFLICT (id) DO NOTHING;