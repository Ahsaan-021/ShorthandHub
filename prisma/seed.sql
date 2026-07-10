-- ============================================================
-- COMPREHENSIVE PITMAN SHORTHAND SEED DATA
-- All 24 Consonants, Vowels, Diphthongs, Key Words, Exercises
-- ============================================================

-- Categories (Stroke Groups)
INSERT INTO "Category" (id, name, slug) VALUES
  ('cat-straight-down', 'Straight Downward Strokes', 'straight-downward'),
  ('cat-straight-up', 'Straight Upward Strokes', 'straight-upward'),
  ('cat-curved', 'Curved Strokes', 'curved'),
  ('cat-vowels', 'Vowels and Diphthongs', 'vowels'),
  ('cat-hooks-circles', 'Hooks, Circles and Loops', 'hooks-circles'),
  ('cat-phrasing', 'Phrasing and Contractions', 'phrasing')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- DICTIONARY — All 24 Basic Consonant Strokes
-- outline field uses: | (light straight), || (heavy straight),
-- / (light upward), // (heavy upward),
-- ~ (light curve), ~~ (heavy curve)
-- . (dot), o (circle)
-- ============================================================

-- GROUP 1: STRAIGHT DOWNWARD STROKES (P B T D CH J K G)
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-p', 'P', 'p-stroke', 'Voiceless explosive — as in "pie"', 'P', 'Light downward straight stroke. Top to bottom. Thin line.', 'PITMAN', 'P'),
('dic-b', 'B', 'b-stroke', 'Voiced explosive — as in "buy"', 'B', 'Heavy downward straight stroke. Thick line version of P.', 'PITMAN', 'B'),
('dic-t', 'T', 't-stroke', 'Voiceless dental — as in "tie"', 't', 'Light downward straight stroke. Same as P but different position.', 'PITMAN', 'T'),
('dic-d', 'D', 'd-stroke', 'Voiced dental — as in "die"', 'd', 'Heavy downward straight stroke. Thick version of T.', 'PITMAN', 'D'),
('dic-ch', 'CH', 'ch-stroke', 'Voiceless affricate — as in "cheap"', 'CH', 'Light downward straight stroke. Written same direction as P/T.', 'PITMAN', 'CH'),
('dic-j', 'J', 'j-stroke', 'Voiced affricate — as in "jeep"', 'J', 'Heavy downward straight stroke. Thick version of CH.', 'PITMAN', 'J'),
('dic-k', 'K', 'k-stroke', 'Voiceless velar — as in "key"', 'K', 'Light downward straight stroke. Light tick.', 'PITMAN', 'K'),
('dic-g', 'G', 'g-stroke', 'Voiced velar — as in "go"', 'G', 'Heavy downward straight stroke. Thick version of K.', 'PITMAN', 'G')
ON CONFLICT (slug) DO NOTHING;

-- GROUP 2: STRAIGHT UPWARD STROKES (F V TH DH S Z SH ZH)
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-f', 'F', 'f-stroke', 'Voiceless labiodental — as in "fee"', 'F', 'Light upward straight stroke. Bottom to top.', 'PITMAN', 'F'),
('dic-v', 'V', 'v-stroke', 'Voiced labiodental — as in "vee"', 'V', 'Heavy upward straight stroke. Thick version of F.', 'PITMAN', 'V'),
('dic-th', 'TH', 'th-stroke', 'Voiceless dental — as in "thin"', 'TH', 'Light upward straight stroke. Distinct from F direction.', 'PITMAN', 'TH'),
('dic-dh', 'DH', 'dh-stroke', 'Voiced dental — as in "the"', 'DH', 'Heavy upward straight stroke. Thick version of TH.', 'PITMAN', 'DH'),
('dic-s', 'S', 's-stroke', 'Voiceless sibilant — as in "see"', 'S', 'Light upward curved stroke. Written upward.', 'PITMAN', 'S'),
('dic-z', 'Z', 'z-stroke', 'Voiced sibilant — as in "zoo"', 'Z', 'Heavy upward curved stroke. Thick version of S.', 'PITMAN', 'Z'),
('dic-sh', 'SH', 'sh-stroke', 'Voiceless palatal — as in "ship"', 'SH', 'Light upward stroke. Distinct shape from S.', 'PITMAN', 'SH'),
('dic-zh', 'ZH', 'zh-stroke', 'Voiced palatal — as in "measure"', 'ZH', 'Heavy upward stroke. Thick version of SH.', 'PITMAN', 'ZH')
ON CONFLICT (slug) DO NOTHING;

-- GROUP 3: CURVED STROKES (L R M N NG NK W Y H)
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-l', 'L', 'l-stroke', 'Lateral approximant — as in "lie"', '~', 'Light clockwise curve. Written downward.', 'PITMAN', 'L'),
('dic-r', 'R', 'r-stroke', 'Approximant — as in "ray"', '~~', 'Heavy anticlockwise curve. Thick version.', 'PITMAN', 'R'),
('dic-m', 'M', 'm-stroke', 'Voiced bilabial nasal — as in "me"', 'M', 'Heavy clockwise curve. Written downward.', 'PITMAN', 'M'),
('dic-n', 'N', 'n-stroke', 'Voiced alveolar nasal — as in "no"', 'N', 'Light clockwise curve. Lighter version of M.', 'PITMAN', 'N'),
('dic-ng', 'NG', 'ng-stroke', 'Velar nasal — as in "sing"', '~', 'Light curved stroke. Distinct hook shape.', 'PITMAN', 'NG'),
('dic-nk', 'NK', 'nk-stroke', 'Velar nasal + K — as in "sink"', '~', 'Heavy version of NG stroke.', 'PITMAN', 'NK'),
('dic-w', 'W', 'w-stroke', 'Labiovelar approximant — as in "we"', 'W', 'Light curved stroke. Written with distinct hook.', 'PITMAN', 'W'),
('dic-y', 'Y', 'y-stroke', 'Palatal approximant — as in "yes"', 'Y', 'Light curved tick. Small stroke.', 'PITMAN', 'Y'),
('dic-h', 'H', 'h-stroke', 'Glottal fricative — as in "he"', 'H', 'Light dot. Placed before the following vowel.', 'PITMAN', 'H')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- VOWELS (Short, Long, Diphthongs)
-- ============================================================
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-vowel-a-short', 'ă (short a)', 'short-a', 'Short vowel — as in "cat"', '.', 'Light dot at first-place position (above/beginning of stroke).', 'PITMAN', 'ă'),
('dic-vowel-a-long', 'ā (long a)', 'long-a', 'Long vowel — as in "palm"', '..', 'Heavy dot at first-place position.', 'PITMAN', 'ā'),
('dic-vowel-e-short', 'ĕ (short e)', 'short-e', 'Short vowel — as in "bet"', '.', 'Light dot at second-place position (level with stroke).', 'PITMAN', 'ĕ'),
('dic-vowel-e-long', 'ē (long e)', 'long-e', 'Long vowel — as in "see"', '..', 'Heavy dot at second-place position.', 'PITMAN', 'ē'),
('dic-vowel-i-short', 'ĭ (short i)', 'short-i', 'Short vowel — as in "sit"', '.', 'Light dot at third-place position (below/end of stroke).', 'PITMAN', 'ĭ'),
('dic-vowel-i-long', 'ī (long i)', 'long-i', 'Long vowel — as in "ite"', '..', 'Heavy dot at third-place position.', 'PITMAN', 'ī'),
('dic-vowel-o-short', 'ŏ (short o)', 'short-o', 'Short vowel — as in "hot"', '-', 'Light dash at first-place position.', 'PITMAN', 'ŏ'),
('dic-vowel-o-long', 'ō (long o)', 'long-o', 'Long vowel — as in "go"', '--', 'Heavy dash at first-place position.', 'PITMAN', 'ō'),
('dic-vowel-u-short', 'ŭ (short u)', 'short-u', 'Short vowel — as in "cut"', '-', 'Light dash at second-place position.', 'PITMAN', 'ŭ'),
('dic-vowel-u-long', 'ū (long u)', 'long-u', 'Long vowel — as in "food"', '--', 'Heavy dash at third-place position.', 'PITMAN', 'ū'),
('dic-diph-i', 'I (diphthong)', 'diphthong-i', 'Diphthong — as in "eye"', 'I', 'Downward hook. First-place position.', 'PITMAN', 'ī'),
('dic-diph-ow', 'OW (diphthong)', 'diphthong-ow', 'Diphthong — as in "cow"', 'OW', 'Upward hook. Second-place position.', 'PITMAN', 'ow'),
('dic-diph-oi', 'OI (diphthong)', 'diphthong-oi', 'Diphthong — as in "boy"', 'OI', 'Combined hook. Third-place position.', 'PITMAN', 'oi')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- COMMON WORDS WITH PROPER PITMAN OUTLINES
-- ============================================================
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-the', 'the', 'the', 'Definite article', 'DH', 'TH heavy upward — standard contraction.', 'PITMAN', 'thē'),
('dic-and', 'and', 'and', 'Conjunction', 'N', 'Dot N — standard contraction for "and".', 'PITMAN', 'ănd'),
('dic-to', 'to', 'to', 'Preposition (direction)', 'T', 'Upward T — standard contraction.', 'PITMAN', 'tō'),
('dic-of', 'of', 'of', 'Preposition (possession)', 'F', 'F heavy upward — contraction for "of".', 'PITMAN', 'ŏv'),
('dic-in', 'in', 'in', 'Preposition (position)', 'N', 'N light upward curve — contraction.', 'PITMAN', 'ĭn'),
('dic-that', 'that', 'that', 'Demonstrative/conjunction', 'TH D', 'TH heavy upward + halved D.', 'PITMAN', 'thăt'),
('dic-have', 'have', 'have', 'Auxiliary verb', 'H V', 'H dot + V heavy upward.', 'PITMAN', 'hăv'),
('dic-it', 'it', 'it', 'Third-person pronoun', 't', 'T light tick with first-place dot I.', 'PITMAN', 'ĭt'),
('dic-for', 'for', 'for', 'Preposition (purpose)', 'F', 'F heavy upward — contraction.', 'PITMAN', 'fôr'),
('dic-with', 'with', 'with', 'Preposition (accompaniment)', 'W', 'W upward hook — contraction.', 'PITMAN', 'wĭth'),
('dic-this', 'this', 'this', 'Demonstrative pronoun', 'DH S', 'DH heavy + S circle.', 'PITMAN', 'thĭs'),
('dic-will', 'will', 'will', 'Auxiliary verb (future)', 'L', 'L clockwise curve — contraction.', 'PITMAN', 'wĭl'),
('dic-be', 'be', 'be', 'Verb (to exist)', 'B', 'B heavy downward stroke.', 'PITMAN', 'bē'),
('dic-can', 'can', 'can', 'Modal verb (ability)', 'K N', 'K light downward + N curve.', 'PITMAN', 'kăn'),
('dic-do', 'do', 'do', 'Verb (to perform)', 'D', 'D heavy downward stroke.', 'PITMAN', 'dō'),
('dic-go', 'go', 'go', 'Verb (to move)', 'G', 'G heavy downward stroke.', 'PITMAN', 'gō'),
('dic-up', 'up', 'up', 'Preposition (direction)', 'P', 'P light downward stroke.', 'PITMAN', 'ŭp'),
('dic-down', 'down', 'down', 'Preposition (direction)', 'D N', 'D heavy + N curve.', 'PITMAN', 'down'),
('dic-what', 'what', 'what', 'Interrogative pronoun', 'W T', 'W hook + halved T.', 'PITMAN', 'wŏt'),
('dic-which', 'which', 'which', 'Interrogative determiner', 'W CH', 'W hook + CH light downward.', 'PITMAN', 'wĭch')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- HOOKS, CIRCLES AND LOOPS
-- ============================================================
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-r-hook', 'R-hook', 'r-hook', 'R-hook on straight strokes — PR, BR, TR, DR, KR, GR', 'PR', 'Hook on the R-curve side of stroke. Clockwise hook.', 'PITMAN', 'R'),
('dic-l-hook', 'L-hook', 'l-hook', 'L-hook on straight strokes — PL, BL, KL, GL', 'PL', 'Hook on the L side of stroke. Anticlockwise hook.', 'PITMAN', 'L'),
('dic-s-circle', 'S-circle', 's-circle', 'S-circle — initial S or final S on any stroke', 'S', 'Small circle. Initial S clockwise, final S anticlockwise.', 'PITMAN', 'S'),
('dic-sw-loop', 'SW-loop', 'sw-loop', 'SW-loop — larger than S-circle for SW sound', 'SW', 'Large initial loop. Distinguish from S-circle by size.', 'PITMAN', 'SW'),
('dic-st-loop', 'ST-loop', 'st-loop', 'ST-loop — on opposite side of stroke from S-circle', 'ST', 'Small loop on the opposite side. Distinguish carefully.', 'PITMAN', 'ST'),
('dic-str-loop', 'STR-loop', 'str-loop', 'STR-loop — larger loop for initial STR', 'STR', 'Large loop on opposite side for STR blends.', 'PITMAN', 'STR')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PHRASING — Common Phrase Outlines
-- ============================================================
INSERT INTO "Dictionary" (id, word, slug, meaning, outline, rule, course_type, pronunciation) VALUES
('dic-i-am', 'I am', 'i-am', 'Phrase — join I vowel + M', 'I M', 'I diphthong + M curve without lifting.', 'PITMAN', 'ī ăm'),
('dic-i-have', 'I have', 'i-have', 'Phrase — join I vowel + have', 'I V', 'I diphthong + V heavy upward.', 'PITMAN', 'ī hăv'),
('dic-i-will', 'I will', 'i-will', 'Phrase — join I + will', 'I L', 'I diphthong + L curve continuously.', 'PITMAN', 'ī wĭl'),
('dic-you-are', 'you are', 'you-are', 'Phrase — Y + R continuous', 'Y R', 'Y light curve + R heavy curve without pen lift.', 'PITMAN', 'yō ār'),
('dic-we-are', 'we are', 'we-are', 'Phrase — W + R continuous', 'W R', 'W hook + R curve in one motion.', 'PITMAN', 'wē ār'),
('dic-they-are', 'they are', 'they-are', 'Phrase — DH + R continuous', 'DH R', 'DH heavy + R curve without lifting.', 'PITMAN', 'thā ār')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- LESSONS — Comprehensive Stroke-by-Stroke
-- ============================================================

-- L1: P + B (Lip sounds — bilabial plosives)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l1', 'P and B — The Lip Strokes', 'p-and-b-strokes', 'Master the P (light) and B (heavy) downward straight strokes. The foundation of all Pitman writing.', '## P — Light Downward Stroke\nP is a thin downward straight line. Written from top to bottom.\n\n## B — Heavy Downward Stroke\nB is a thick downward straight line. Same direction as P.\n\n## Practice Words\n- P: pie, pay, pea, paw, pie\n- B: buy, bay, bee, bow, by\n\n## Common Pairs\n- P + B as in "upbeat" — join at natural angle\n- B + P as in "subpar" — lift pen between strokes\n\n## Dictation Practice\nWrite: Pay, bee, pie, bay, up, by, pea, bow, paw, buy', 'The P and B strokes are the first two consonants you will learn. They are written in the same direction (top to bottom) but P is a thin line (light sound) while B is a thick line (heavy sound).\n\nMaster these two strokes thoroughly before moving on. Practice writing them until the motion is automatic.\n\nRemember: P is voiceless (whispered), B is voiced (with vocal cord vibration).', '1. P = thin downward straight line\n2. B = thick downward straight line\n3. Both written top to bottom\n4. P is like whispering pa\n5. B is like saying ba with voice\n6. Keep strokes exactly vertical\n7. Distinguish thickness clearly', 'BEGINNER', 'PITMAN', 'THEORY', 1, 100, true, 'cat-straight-down')
ON CONFLICT (slug) DO NOTHING;

-- L2: T + D (Tongue-tip sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l2', 'T and D — The Tongue-Tip Strokes', 't-and-d-strokes', 'Master the T (light) and D (heavy) downward straight strokes. Second pair of basic strokes.', '## T — Light Downward Stroke\nT is a thin downward straight line. Same direction as P.\n\n## D — Heavy Downward Stroke\nD is a thick downward line. The heavy counterpart of T.\n\n## Practice Words\n- T: tie, tea, too, toe, it, at\n- D: die, do, day, doe, due, add\n\n## Contrast with P/B\nT and D use the same stroke shape as P and B. The difference is the POSITION of the vowel.\n\n## Dictation\nWrite: Tie, die, tea, day, too, do, toe, doe, it, add', 'T and D are identical in shape to P and B but represent different sounds. T is light (thin), D is heavy (thick).\n\nThe skill is in distinguishing P from T — both are thin downward strokes. The vowel position tells you which consonant is intended.\n\nPractice writing T and D alongside P and B to master the distinctions.', '1. T = thin downward straight line (same as P)\n2. D = thick downward line (same as B)\n3. Direction: top to bottom\n4. T is voiceless, D is voiced\n5. Distinguish from P/B by vowel position\n6. Practice P-T-B-D sequence', 'BEGINNER', 'PITMAN', 'THEORY', 2, 100, true, 'cat-straight-down')
ON CONFLICT (slug) DO NOTHING;

-- L3: K + G (Back-of-tongue sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l3', 'K and G — The Back Tongue Strokes', 'k-and-g-strokes', 'Master the K (light) and G (heavy) downward strokes. The third pair of basic consonants.', '## K — Light Downward Stroke\nK is a thin downward straight line.\n\n## G — Heavy Downward Stroke\nG is a thick downward straight line.\n\n## Practice Words\n- K: key, car, cow, K, Kate\n- G: go, guy, gay, game, gate\n\n## Group 1 Summary\nYou now know ALL 6 downward straight strokes:\nLight: P, T, K\nHeavy: B, D, G\n\n## Dictation\nWrite: Key, go, K, guy, car, gay, cow, game, Kate, gate', 'K and G complete Group 1 of the Pitman consonants. All are downward straight lines differing only in thickness (light/heavy) and vowel position.\n\nWith P-B, T-D, and K-G you can write many English words. Practice all six together.', '1. K = thin downward stroke\n2. G = thick downward stroke\n3. All Group 1 strokes are top-to-bottom\n4. K is voiceless, G is voiced\n5. Review all 6: P-T-K (light) B-D-G (heavy)\n6. Thickness is critical for meaning', 'BEGINNER', 'PITMAN', 'THEORY', 3, 100, true, 'cat-straight-down')
ON CONFLICT (slug) DO NOTHING;

-- L4: F + V (Lip-teeth sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l4', 'F and V — The Lip-Teeth Strokes', 'f-and-v-strokes', 'Master the F (light) and V (heavy) upward straight strokes. First pair of upward Group 2 strokes.', '## F — Light Upward Stroke\nF is a thin upward straight line. Written from bottom to top.\n\n## V — Heavy Upward Stroke\nV is a thick upward straight line.\n\n## Practice Words\n- F: fee, fie, foe, F, fun\n- V: vee, vie, vow, V, van\n\n## Upward vs Downward\nUpward strokes go from bottom to top. This is different from P/B/T/D/K/G which go top to bottom.\n\n## Dictation\nWrite: Fee, vee, fie, vie, foe, vow, fun, van', 'F and V are your first UPWARD strokes. They go from bottom to top. F is light (thin), V is heavy (thick).\n\nChange of direction is important: downward strokes start at top, upward strokes start at bottom. This affects vowel placement.', '1. F = thin upward straight line\n2. V = thick upward straight line\n3. Direction: bottom to top\n4. F is voiceless (upper lip on teeth)\n5. V is voiced (vibration)\n6. Opposite direction to Group 1', 'BEGINNER', 'PITMAN', 'THEORY', 4, 100, true, 'cat-straight-up')
ON CONFLICT (slug) DO NOTHING;

-- L5: TH + DH (Tongue-through-teeth sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l5', 'TH and DH — The Tongue-Through-Teeth Strokes', 'th-and-dh-strokes', 'Master the TH (light) and DH (heavy) upward strokes. The "th" sounds of English.', '## TH — Light Upward Stroke\nTH is a thin upward line. As in "thin" or "think".\n\n## DH — Heavy Upward Stroke\nDH is a thick upward line. As in "the" or "this".\n\n## Practice Words\n- TH: thin, think, thank, thong, thud\n- DH: the, this, that, these, those\n\n## Important\nTH and DH are among the most common sounds in English. Master them well.\n\n## Dictation\nWrite: Thin, the, think, this, thank, that, thong, these, thud, those', 'TH (light) and DH (heavy) are upward straight strokes. They are essential for English shorthand because "th" is so common.\n\nNote: the word "the" is written with the DH stroke alone. "This" is DH + S-circle. These are standard contractions.', '1. TH = thin upward straight stroke\n2. DH = thick upward straight stroke\n3. Direction: bottom to top\n4. TH voiceless, DH voiced\n5. "The" = DH stroke (standard)\n6. "This" = DH + S circle', 'BEGINNER', 'PITMAN', 'THEORY', 5, 100, true, 'cat-straight-up')
ON CONFLICT (slug) DO NOTHING;

-- L6: S + Z (Hissing sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l6', 'S and Z — The Hissing Strokes', 's-and-z-strokes', 'Master the S (light) and Z (heavy) curved upward strokes. The hissing sounds.', '## S — Light Upward Curve\nS is a light upward curved stroke.\n\n## Z — Heavy Upward Curve\nZ is a heavy upward curved stroke.\n\n## Practice Words\n- S: see, say, so, sue, S, sit\n- Z: zoo, Z, zip, zone, size\n\n## S-Circle\nS can also be written as a small circle attached to other strokes (initial or final).\n\n## Dictation\nWrite: See, zoo, so, Z, sue, zip, sit, zone, size', 'S and Z are upward curved strokes. S is light, Z is heavy. They complete Group 2 (upward strokes).\n\nS is one of the most common letters in English. In addition to the S stroke, S can be written as a small circle (S-circle) attached to other strokes.', '1. S = light upward curved stroke\n2. Z = heavy upward curved stroke\n3. Direction: bottom to top\n4. S voiceless, Z voiced\n5. S can also be a small circle (S-circle)\n6. S-circle initial clockwise, final anticlockwise', 'BEGINNER', 'PITMAN', 'THEORY', 6, 100, true, 'cat-straight-up')
ON CONFLICT (slug) DO NOTHING;

-- L7: L + R (Liquid sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l7', 'L and R — The Liquid Strokes', 'l-and-r-strokes', 'Master the L (light curve) and R (heavy curve) strokes. Essential for word flow.', '## L — Light Clockwise Curve\nL is a light clockwise curve. Written downward.\n\n## R — Heavy Anticlockwise Curve\nR is a heavy anticlockwise curve. Written downward.\n\n## Practice Words\n- L: lie, lay, low, L, all, ale\n- R: ray, row, R, are, ore\n\n## Hooks\nL and R also form hooks on other consonants:\n- R-hook: PR, BR, TR, DR, KR, GR\n- L-hook: PL, BL, KL, GL\n\n## Dictation\nWrite: Lie, ray, low, row, L, R, all, are, ale, ore', 'L and R are curved downward strokes. L is light (clockwise curve), R is heavy (anticlockwise curve).\n\nThese strokes also serve as hooks attached to straight strokes to represent consonant blends like PR, BR, TR, etc.', '1. L = light clockwise curve\n2. R = heavy anticlockwise curve\n3. Both written downward\n4. L is voiced, R is voiced\n5. R-hook on straight strokes: PR, BR, TR, DR\n6. L-hook on straight strokes: PL, BL, KL, GL', 'BEGINNER', 'PITMAN', 'THEORY', 7, 100, true, 'cat-curved')
ON CONFLICT (slug) DO NOTHING;

-- L8: M + N (Nasal sounds)
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l8', 'M and N — The Nasal Strokes', 'm-and-n-strokes', 'Master the M (heavy curve) and N (light curve) nasal strokes. Very common in English.', '## M — Heavy Downward Curve\nM is a thick clockwise curve. Written downward.\n\n## N — Light Downward Curve\nN is a thin clockwise curve. Lighter version of M.\n\n## Practice Words\n- M: me, may, my, M, aim, am\n- N: no, nay, N, an, in, on\n\n## Common Endings\n- -ing: NG stroke\n- -ink: NK stroke\n\n## Dictation\nWrite: Me, no, my, nay, M, N, am, an, in, on', 'M and N are curved strokes written downward. M is heavy (thick), N is light (thin).\n\nM and N are nasal sounds — air passes through the nose. The NG stroke is related, representing the "-ing" ending.\n\n"in" and "an" are written with just the N stroke (standard contractions).', '1. M = heavy clockwise curve\n2. N = light clockwise curve\n3. Both written downward\n4. M voiced nasal, N voiced nasal\n5. NG = light curve for -ing\n6. NK = heavy curve for -nk\n7. "in", "an", "on" = N stroke only', 'BEGINNER', 'PITMAN', 'THEORY', 8, 100, true, 'cat-curved')
ON CONFLICT (slug) DO NOTHING;

-- L9: Vowels in Detail
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l9', 'Vowels — Dots, Dashes and Diphthongs', 'vowels-dots-dashes-diphthongs', 'Master all Pitman vowels: short (dots), long (dashes), and diphthongs (hooks).', '## Short Vowels (Light Dots and Dashes)\n- ă (cat): light dot, first place\n- ĕ (bet): light dot, second place\n- ĭ (sit): light dot, third place\n- ŏ (hot): light dash, first place\n- ŭ (cut): light dash, second place\n\n## Long Vowels (Heavy Dots and Dashes)\n- ā (palm): heavy dot, first place\n- ē (see): heavy dot, second place\n- ī (ite): heavy dot, third place\n- ō (go): heavy dash, first place\n- ū (food): heavy dash, third place\n\n## Diphthongs\n- I (eye): downward hook\n- OW (cow): upward hook\n- OI (boy): combined hook\n\n## Three Places\n1. First place: above/beginning of stroke\n2. Second place: level with stroke\n3. Third place: below/end of stroke', 'Pitman vowels are dots, dashes, and hooks placed in specific positions relative to consonant strokes.\n\nThe three positions (first, second, third) correspond to the beginning, middle, and end of the stroke, or positions above, at, and below the line.\n\nLong vowels are generally heavier marks than short vowels. Diphthongs are hooks written with a specific direction.', '1. Light dot = short vowel\n2. Heavy dot = long vowel\n3. Light dash = short vowel (ŏ, ŭ)\n4. Heavy dash = long vowel (ō, ū)\n5. First place = beginning/above stroke\n6. Second place = level with stroke\n7. Third place = below/end of stroke\n8. I = downward hook, OW = upward hook', 'INTERMEDIATE', 'PITMAN', 'THEORY', 9, 150, true, 'cat-vowels')
ON CONFLICT (slug) DO NOTHING;

-- L10: Joining Strokes
INSERT INTO "Lesson" (id, title, slug, description, content, theory, rules, difficulty, course_type, lesson_type, "order", xp_reward, published, category_id) VALUES
('l10', 'Joining Strokes Smoothly', 'joining-strokes-smoothly', 'Learn to join consonant strokes without awkward angles. Essential for speed.', '## Same Direction Joins\nWhen two strokes go the same direction, join at a natural angle (about 45 degrees).\n\nExamples: P+T, B+D, T+K, D+G\n\n## Opposite Direction Joins\nWhen strokes go opposite directions, place them back-to-back.\n\nExamples: P+B, T+D, K+G\n\n## Curve + Straight Joins\nCurved strokes join to straight strokes at the natural curve end.\n\nExamples: L+P, M+T, N+K, R+B\n\n## Retrograde Joining\nWhen strokes cannot join smoothly, lift the pen (retrograde).\n\n## Practice\nJoin: P-T, B-D, T-K, L-P, M-T, N-K, F-P, V-B, S-T, TH-K', 'Smooth joining is the key to speed in Pitman shorthand. Practice until the pen flows naturally from one stroke to the next.\n\nMost joins are natural — the stroke ends where the next begins. When strokes go in opposite directions, write them back-to-back with a slight angle.', '1. Same direction = join at 45°\n2. Opposite direction = back-to-back\n3. Curve + straight = join at curve end\n4. Retrograde = lift pen (avoid when possible)\n5. Practice common pairs until fluid\n6. Never sacrifice legibility for speed', 'INTERMEDIATE', 'PITMAN', 'EXERCISE', 10, 150, true, 'cat-straight-down')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- EXERCISES per lesson
-- ============================================================
INSERT INTO "Exercise" (id, lesson_id, question, answer, hint, "order") VALUES
-- L1 Exercises (P+B)
('ex-p1', 'l1', 'Write the outline for P (light sound)', 'Thin downward line from top to bottom', 'P is voiceless like whispering "pa"', 1),
('ex-p2', 'l1', 'Write the outline for B (heavy sound)', 'Thick downward line from top to bottom', 'B is voiced like saying "ba" out loud', 2),
('ex-p3', 'l1', 'Write the word "pay" using P stroke', 'P with first-place long vowel ā (heavy dash above)', 'First-place vowel goes above/beginning of stroke', 3),
('ex-p4', 'l1', 'Write the word "bee" using B stroke', 'B with second-place long vowel ē (heavy dot at level)', 'Second-place vowel is level with the stroke', 4),
('ex-p5', 'l1', 'Which stroke is heavier: P or B?', 'B is heavier (thick line), P is lighter (thin line)', 'Feel the thickness difference with your pen', 5),

-- L2 Exercises (T+D)
('ex-t1', 'l2', 'Write the outline for T', 'Thin downward straight line', 'T is same shape as P but different sound', 1),
('ex-t2', 'l2', 'Write the outline for D', 'Thick downward straight line', 'D is the voiced version of T', 2),
('ex-t3', 'l2', 'Write "tie" using T stroke', 'T with first-place long vowel ī (heavy dot)', 'Long i at first place', 3),
('ex-t4', 'l2', 'How is T different from P?', 'Same stroke shape, different sound determined by vowel position', 'Position tells you which consonant', 4),

-- L3 Exercises (K+G)
('ex-k1', 'l3', 'Write outline for K', 'Thin downward straight line', 'K is top-to-bottom like P and T', 1),
('ex-k2', 'l3', 'Write outline for G', 'Thick downward straight line', 'G is the heavy version of K', 2),
('ex-k3', 'l3', 'Write "go" using G stroke', 'G with second-place long vowel ō (heavy dash level)', 'Long o at second place', 3),
('ex-k4', 'l3', 'Name all 6 downward straight strokes', 'Light: P, T, K — Heavy: B, D, G', 'Three light, three heavy', 4),

-- L4 Exercises (F+V)
('ex-f1', 'l4', 'Write outline for F', 'Thin upward straight line', 'F goes from bottom to top', 1),
('ex-f2', 'l4', 'Write outline for V', 'Thick upward straight line', 'V is the heavy version of F', 2),
('ex-f3', 'l4', 'What direction do F and V go?', 'Upward — from bottom to top', 'Opposite to P/B/T/D/K/G', 3),

-- L5 Exercises (TH+DH)
('ex-th1', 'l5', 'Write outline for TH as in "think"', 'Thin upward straight line', 'TH is light upward', 1),
('ex-th2', 'l5', 'Write outline for DH as in "the"', 'Thick upward straight line', 'DH is heavy upward — just write DH for "the"', 2),
('ex-th3', 'l5', 'Write "this" using DH + S', 'DH heavy upward + S-circle', 'S-circle attached at the end of DH', 3),

-- L6 Exercises (S+Z)
('ex-s1', 'l6', 'Write outline for S', 'Light upward curved stroke', 'S is a curve upward', 1),
('ex-s2', 'l6', 'Write outline for Z', 'Heavy upward curved stroke', 'Z is the heavy version', 2),
('ex-s3', 'l6', 'What is the S-circle?', 'A small circle representing S, attached to other strokes', 'Initial S clockwise, final S anticlockwise', 3),

-- L7 Exercises (L+R)
('ex-l1', 'l7', 'Write outline for L', 'Light clockwise curve written downward', 'L curves like a clockwise arc', 1),
('ex-l2', 'l7', 'Write outline for R', 'Heavy anticlockwise curve written downward', 'R curves opposite to L', 2),
('ex-l3', 'l7', 'What is an R-hook?', 'Hook on the R-curve side of a straight stroke (PR, BR, TR, DR, KR, GR)', 'R-hook represents R following the consonant', 3),

-- L8 Exercises (M+N)
('ex-m1', 'l8', 'Write outline for M', 'Heavy clockwise curve downward', 'M is thick like humming "mmm"', 1),
('ex-m2', 'l8', 'Write outline for N', 'Light clockwise curve downward', 'N is thin, lighter than M', 2),
('ex-m3', 'l8', 'Write "in" using N stroke only', 'N light curve alone', '"in" is a standard N stroke contraction', 3),

-- L9 Exercises (Vowels)
('ex-v1', 'l9', 'How is short vowel ă written?', 'Light dot at first-place position (above/beginning of stroke)', 'First-place short vowel', 1),
('ex-v2', 'l9', 'How is long vowel ō written?', 'Heavy dash at first-place position', 'Long o is a heavy dash at first place', 2),
('ex-v3', 'l9', 'What are the three vowel positions?', 'First (above/beginning), Second (level), Third (below/end)', 'Three places for three sets of vowels', 3),
('ex-v4', 'l9', 'What does the I diphthong look like?', 'A downward hook', 'Like a small hook pointing down', 4),

-- L10 Exercises (Joining)
('ex-j1', 'l10', 'How do you join P and T (same direction)?', 'Join at a 45-degree natural angle', 'Same direction = natural angle', 1),
('ex-j2', 'l10', 'How do you join P and B (opposite direction)?', 'Write back-to-back', 'Opposite direction = back-to-back', 2),
('ex-j3', 'l10', 'When do you lift the pen?', 'When strokes cannot join smoothly (retrograde)', 'Lift only when necessary', 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- QUIZZES per lesson
-- ============================================================
INSERT INTO "Quiz" (id, lesson_id, question, options, correct, "order") VALUES
('qz1', 'l1', 'What direction is the P stroke written?', '["Left to right","Top to bottom","Bottom to top","Right to left"]', 1, 1),
('qz2', 'l1', 'How do you distinguish P from B?', '["P is curved, B is straight","P is thin (light), B is thick (heavy)","P is upward, B is downward","P is dotted, B is dashed"]', 1, 2),
('qz3', 'l2', 'T and D are written in which direction?', '["Bottom to top","Left to right","Top to bottom","Diagonal"]', 2, 1),
('qz4', 'l3', 'How many downward straight strokes are there?', '["4","6","8","3"]', 1, 1),
('qz5', 'l4', 'F and V are written in which direction?', '["Top to bottom","Bottom to top","Left to right","Curved"]', 1, 1),
('qz6', 'l5', 'Which stroke represents "the"?', '["T light","TH light","DH heavy","D heavy"]', 2, 1),
('qz7', 'l6', 'S can be written as a stroke or as what?', '["A dot","A dash","A small circle","A hook"]', 2, 1),
('qz8', 'l7', 'What does an R-hook represent?', '["A vowel","R following the consonant","A silent letter","A word ending"]', 1, 1),
('qz9', 'l7', 'A PL blend uses which hook?', '["R-hook","L-hook","S-circle","ST-loop"]', 1, 1),
('qz10', 'l8', 'M is what kind of stroke?', '["Light upward","Heavy clockwise curve","Light downward straight","Heavy dash"]', 1, 1),
('qz11', 'l9', 'First-place vowel is positioned where?', '["Below the stroke","Level with the stroke","Above/beginning of the stroke","At the end"]', 2, 1),
('qz12', 'l9', 'A light dot represents what kind of vowel?', '["Long vowel","Short vowel","Diphthong","Triphthong"]', 1, 2),
('qz13', 'l10', 'Same direction strokes join at what angle?', '["90 degrees","Natural angle (about 45)","180 degrees","0 degrees"]', 1, 1),
('qz14', 'l10', 'What is retrograde joining?', '["Writing backwards","Lifting the pen between unjoinable strokes","Joining at 90 degrees","Using a loop"]', 1, 2)
ON CONFLICT (id) DO NOTHING;
