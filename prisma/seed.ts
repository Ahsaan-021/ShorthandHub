import { PrismaClient, Difficulty, CourseType, LessonType, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ── Categories ────────────────────────────────────────────
  const categories = await Promise.all(
    [
      { name: "Basics", slug: "basics" },
      { name: "Consonants", slug: "consonants" },
      { name: "Vowels", slug: "vowels" },
    ].map((cat) =>
      prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      })
    )
  );

  // ── Lessons ────────────────────────────────────────────────
  const lessonsData = [
    {
      title: "Introduction to Pitman Shorthand",
      slug: "introduction-to-pitman-shorthand",
      description:
        "Learn the history, principles, and basic mechanics of Pitman shorthand — including stroke thickness, light and heavy sounds, and writing position.",
      content: `Pitman shorthand was invented by Sir Isaac Pitman in 1837. It is a phonetic system where symbols represent sounds rather than letters.\n\n## Key Principles\n\n- **Phonetic:** You write what you hear, not how it is spelled.\n- **Light and Heavy Strokes:** Thin strokes for voiceless consonants ("light" sounds), thick strokes for voiced consonants ("heavy" sounds).\n- **Position on the Line:** The position of a stroke relative to the line indicates which vowel is implied.\n\n## The Writing Line\n\nImagine a ruled line. Strokes are written:\n- **On** the line (first-place vowels)\n- **Through** the line (second-place vowels)\n- **Above** the line (third-place vowels)`,
      theory: `Pitman shorthand is built around a set of simple geometric strokes: straight lines and curves. Each stroke represents a consonant sound. Vowels are represented by dots, dashes, or other small marks placed in specific positions relative to the consonant strokes.\n\nThickness matters: a thin stroke represents a light (voiceless) sound like P, T, K; a thick stroke of the same shape represents the corresponding heavy (voiced) sound like B, D, G.`,
      rules: `1. Write phonetically — ignore spelling, write sounds.\n2. Light sounds use thin strokes, heavy sounds use thick strokes.\n3. Strokes are written from left to right (or top to bottom for upright strokes).\n4. Position on the line indicates the vowel.`,
      difficulty: "BEGINNER" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 1,
      xpReward: 100,
      published: true,
      categoryId: categories[0].id,
    },
    {
      title: "Consonants: Strokes",
      slug: "consonants-strokes",
      description:
        "Master the basic consonant strokes of Pitman shorthand: straight lines, curves, and their light/heavy variations.",
      content: `The Pitman consonant system has 24 basic strokes:\n\n## Straight Strokes\n- **P / B** — downward stroke (light / heavy)\n- **T / D** — downward stroke (light / heavy)\n- **CH / J** — downward stroke (light / heavy)\n- **K / G** — downward stroke (light / heavy)\n- **F / V** — upward stroke (light / heavy)\n- **TH / DH** — upward stroke (light / heavy)\n- **S / Z** — upward stroke (light / heavy)\n- **SH / ZH** — upward stroke (light / heavy)\n\n## Curved Strokes\n- **L** — clockwise curve\n- **R** — anticlockwise curve\n- **M / N** — clockwise curve (heavy / light)\n- **NG** — anticlockwise curve\n- **W / Y** — quick joiners\n- **H** — dot (placed before or after a stroke)`,
      theory: `Each consonant is represented by a single stroke. The direction and shape of the stroke must be consistent. Practice drawing each stroke until it becomes automatic.\n\n**Group 1 — Downward Straight Strokes:** P, B, T, D, CH, J, K, G\n**Group 2 — Upward Straight Strokes:** F, V, TH, DH, S, Z, SH, ZH\n**Group 3 — Curved Strokes:** L, M, N, NG, R\n\nMemorize the stroke for each sound — this is the foundation of all Pitman shorthand writing.`,
      rules: `1. Downward strokes are written from top to bottom.\n2. Upward strokes are written from bottom to top.\n3. Curved strokes follow their natural arc direction.\n4. Heavy strokes must be distinctly thicker than light strokes.`,
     5: "BEGINNER" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 2,
      xpReward: 100,
      published: true,
      categoryId: categories[1].id,
    },
    {
      title: "Vowels: Placement and Sounds",
      slug: "vowels-placement-and-sounds",
      description:
        "Understand the vowel system — dots, dashes, and their placement relative to consonant strokes.",
      content: `Pitman shorthand uses a unique vowel system:\n\n## Vowel Representation\n- **Dot** = short vowel (ă, ĕ, ĭ, ŏ, ŭ)\n- **Dashed dot (small dash)** = long vowel (ā, ē, ī, ō, ū)\n\n## Three Places\n- **First Place** — above/before the stroke = ă, ā, ŏ, ō\n- **Second Place** — level with the stroke = ĕ, ē, ŭ, ō (alternate)\n- **Third Place** — below/after the stroke = ĭ, ī, ū\n\n## Diphthongs\n- I (eye) = large downward hook\n- OW (cow) = large upward hook\n- OI (boy) = combined hook\n- U (you) = small hook`,
      theory: `Vowels are written as dots, dashes, or hooks placed at specific positions. The same vowel sound is always written the same way.\n\nFirst-place vowels are written at the beginning of the stroke (or above). Second-place vowels are written in the middle of the stroke (or level). Third-place vowels are written at the end of the stroke (or below).`,
      rules: `1. Short vowels are light dots; long vowels are heavy dots or dashes.\n2. First place = beginning / above the stroke.\n3. Second place = middle / level with the stroke.\n4. Third place = end / below the stroke.\n5. Diphthongs have their own distinct hook shapes.`,
     5: "BEGINNER" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 3,
      xpReward: 100,
      published: true,
      categoryId: categories[2].id,
    },
    {
      title: "Joining Strokes",
      slug: "joining-strokes",
      description:
        "Learn how to join consonant strokes together to form words. Understand the rules for smooth transitions.",
      content: `## Basic Joining\n\nWhen two consonants follow each other without an intervening vowel, their strokes are joined directly.\n\n## Joining Rules\n1. **Same direction:** If both strokes go in the same direction, join them at an angle.\n2. **Opposite direction:** If strokes go opposite directions, write them back-to-back.\n3. **Curve junction:** When a curve meets a straight line, write them smoothly without lifting the pen.\n4. **Retrograde:** When joining requires writing backwards, lift the pen and write the second stroke separately.\n\n### Examples\n- "PT" — downward P joined to downward T\n- "PL" — P joined to clockwise L\n- "TR" — T joined to anticlockwise R`,
      theory: `Smooth joining is essential for speed. Practice joining pairs of strokes until the motion becomes fluid. The pen should rarely leave the page.\n\nKey principle: always write in the direction of the stroke. Never reverse direction mid-stroke unless the system explicitly allows it (as with R and L hooks).`,
      rules: `1. Join at natural angles — don't force an unnatural connection.\n2. Lifting the pen is allowed between complete strokes.\n3. Practice common two-letter combinations until they flow.\n4. The angle of joining determines whether a vowel is present.`,
     5: "BEGINNER" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "EXERCISE" as LessonType,
      order: 4,
      xpReward: 150,
      published: true,
      categoryId: categories[1].id,
    },
    {
      title: "Consonant Hooks",
      slug: "consonant-hooks",
      description:
        "Explore R-hooks and L-hooks — small additions to consonant strokes that represent R and L sounds.",
      content: `## Hook Principles\nA small hook added to a stroke changes the sound:\n- **R-hook:** A hook on the same side as the R curve turns the stroke into an R-blend (e.g., PR, BR, TR, DR).\n- **L-hook:** A hook on the L side turns the stroke into an L-blend (e.g., PL, BL, KL, GL).\n\n### R-Hooks\n- P + R = PR (hook on the P stroke)\n- T + R = TR (hook on the T stroke)\n- K + R = KR\n\n### L-Hooks\n- P + L = PL (hook on the L side)\n- K + L = KL\n- G + L = GL\n\nHooks also apply to curved strokes and upward strokes with specific rules.`,
      rules: `1. An R-hook is a small clockwise hook.\n2. An L-hook is a small anticlockwise hook.\n3. Hooks are written at the beginning of the stroke.\n4. Hooks do not add a vowel — they represent consonant blends.\n5. N hook (NS) and F/V hook are advanced forms.`,
      difficulty: "INTERMEDIATE" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 5,
      xpReward: 150,
      published: true,
      categoryId: categories[1].id,
    },
    {
      title: "Circles and Loops",
      slug: "circles-and-loops",
      description:
        "Master S-circles, SW-loop, and the ST-loop — small circular additions that represent consonant clusters.",
      content: `## The S-Circle\nA small circle represents S (or Z):\n- **Initial S:** Circle at the beginning of a stroke = S + stroke (e.g., SP, ST, SK)\n- **Final S:** Circle at the end of a stroke = stroke + S (e.g., PS, TS, KS)\n\n## The SW-Loop\nA slightly larger loop at the beginning represents SW:\n- SW + stroke (e.g., SWP, SWT, SWK)\n\n## The ST Loop\nA small loop represents ST:\n- Written on the opposite side of the consonant stroke\n\n## Size Matters\n- Small circle = S / Z\n- Large circle = SES / SWS (depending on position)\n- Small loop = ST / STR\n- Large loop = STR (full cluster)`,
      rules: `1. S-circle is the size of the vowel dot (small).\n2. Initial S is written clockwise; final S is written anticlockwise.\n3. The SW-loop is larger than the S-circle.\n4. The ST loop is written on the opposite side of the stroke from the S-circle.\n5. Loops and circles can be combined with hooks.`,
      difficulty: "INTERMEDIATE" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 6,
      xpReward: 150,
      published: true,
      categoryId: categories[1].id,
    },
    {
      title: "Halving and Doubling",
      slug: "halving-and-doubling",
      description:
        "Learn how halving a stroke adds T/D and doubling adds TR/DR/THR/DHR.",
      content: `## Halving Principle\n**Halving** a stroke (writing it half the normal length) adds T or D:\n- P (halved) = PT or PD\n- K (halved) = KT or KD\n- M (halved) = MT or MD\n\n### Light vs Heavy\n- **Light strokes** halved = T added\n- **Heavy strokes** halved = D added\n\n## Doubling Principle\n**Doubling a stroke** (writing it twice the normal length) adds TR, DR, THR, or DHR:\n- P (doubled) = PTR, PDR\n- K (doubled) = KTR, KDR\n\nDoubling is typically used with curved strokes (L, M, N, R, F, V, etc.) more than straight ones.`,
      rules: `1. Halve a stroke to add T or D.\n2. Light halved strokes add T; heavy halved strokes add D.\n3. Double a curved stroke to add TR/DR/THR/DHR.\n4. Halving takes priority over vowel placement — position the vowel in the remaining space.\n5. Do not halve strokes shorter than a certain minimum — readability suffers.`,
      difficulty: "INTERMEDIATE" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 7,
      xpReward: 150,
      published: true,
      categoryId: categories[2].id,
    },
    {
      title: "Advanced Vowel Representation",
      slug: "advanced-vowel-representation",
      description:
        "Detailed techniques for representing complex vowel sounds including medial vowels, triphthongs, and vowel omission.",
      content: `## Medial Vowels\nWhen a vowel occurs between two consonants, it is placed in the position corresponding to the first consonant:\n- First-place medial = above the first stroke\n- Second-place medial = level with the first stroke\n- Third-place medial = below the first stroke\n\n## Vowel Omission\nFrequently occurring medial vowels can be omitted for speed:\n- The short vowel may be omitted if the word is recognizable from consonant context alone.\n- Unstressed vowels are often dropped entirely.\n\n## Triphthongs\nThree vowel sounds in a single syllable combine:\n- The diphthong sign plus a vowel marker\n\n## Nasalization\nSpecial marks indicate nasalized vowels (common in French loanwords and certain dialects).`,
      theory: `Advanced vowel theory distinguishes between "explicit" vowels (written in full) and "implicit" vowels (understood from context). Experienced writers rely increasingly on implicit vowels for speed.\n\nThe rule of thumb: when in doubt, write the vowel. Write it explicitly for the first occurrence of an unfamiliar word, then omit it once the word is established in context.`,
      rules: `1. First-place vowels go with the first consonant's position.\n2. Second-place vowels are level.\n3. Third-place vowels go with the second consonant.\n4. Omit short vowels in common words.\n5. Always write diphthongs and triphthongs explicitly.`,
      difficulty: "ADVANCED" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "THEORY" as LessonType,
      order: 8,
      xpReward: 200,
      published: true,
      categoryId: categories[2].id,
    },
    {
      title: "Phrasing and Special Contractions",
      slug: "phrasing-and-special-contractions",
      description:
        "Master phrasing — joining two or more words together without lifting the pen — and standard shorthand contractions.",
      content: `## Phrasing\nPhrasing links words together into a single shorthand outline for speed:\n- "I have" → IH (joined)\n- "I will" → IWL\n- "You are" → UR\n- "We have been" → WH B (joined)\n\n## Principles of Phrasing\n1. Words are joined where there is a natural flow between strokes.\n2. Hooks and circles can bridge between words.\n3. Common phrases have standardized forms.\n\n## Standard Contractions\n- "and" → N (dot)\n- "of" → F (light upward stroke)\n- "the" → TH (dot before/after)\n- "to" → T (upward)\n- "for" → F (heavy upward)\n- "with" → W (heavy)\n- "which" → WH (light)`,
      rules: `1. Phrase for common word combinations — do not phrase every group of words.\n2. Maintain legibility — if a phrase is ambiguous, write words separately.\n3. Learn the standard contractions — they appear frequently in all shorthand material.\n4. Contractions are typically used for articles, prepositions, pronouns, and auxiliary verbs.`,
      difficulty: "ADVANCED" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "EXERCISE" as LessonType,
      order: 9,
      xpReward: 200,
      published: true,
      categoryId: categories[2].id,
    },
    {
      title: "Speed Practice Techniques",
      slug: "speed-practice-techniques",
      description:
        "Proven techniques for building shorthand writing speed — drills, dictation practice, and performance tracking.",
      content: `## Building Speed\n### Progressive Dictation\nStart at a comfortable speed (e.g., 30 WPM) and increase gradually:\n1. **Repetition phase:** Write the same passage 3-5 times\n2. **Incremental phase:** Increase speed by 5 WPM each session\n3. **Endurance phase:** Practice for longer durations (20-30 min)\n\n### Drills\n- **Stroke drills:** Repeatedly write specific stroke combinations.\n- **Word drills:** High-frequency words written at speed.\n- **Phrase drills:** Common phrases practiced until fluid.\n\n### Technique\n1. Hold the pen correctly — relaxed grip.\n2. Write in a steady rhythm.\n3. Lift the pen only when necessary.\n4. Keep the writing compact and consistent.\n5. Review notes critically — identify weak strokes.\n\n### Benchmark Targets\n- **Beginner:** 20-40 WPM\n- **Intermediate:** 40-80 WPM\n- **Advanced:** 80-120 WPM\n- **Professional:** 120-200+ WPM`,
      rules: `1. Practice daily — 15-30 minutes is more effective than 2 hours weekly.\n2. Focus on accuracy first, speed follows.\n3. Always review what you wrote — learn from mistakes.\n4. Aim for consistent stroke quality, not just speed.\n5. Use timed dictation to measure progress objectively.`,
      theory: `Speed in shorthand is a combination of:\n- Stroke knowledge (no hesitation)\n- Muscle memory (automatic writing)\n- Phrasing (grouping words)\n- Reading skill (quick transcription)\n\nWork on each component separately, then combine them. A shorthand speed building session should be structured: warm-up (dates, numbers), drills (strokes, hooks), dictation (progressive speed), and cool-down (review).`,
      difficulty: "ADVANCED" as Difficulty,
      courseType: "PITMAN" as CourseType,
      lessonType: "PRACTICE" as LessonType,
      order: 10,
      xpReward: 250,
      published: true,
      categoryId: categories[0].id,
    },
  ];

  // Fix the duplicate key issue (we used "5" as key instead of "difficulty")
  lessonsData[1].difficulty = "BEGINNER" as Difficulty;
  lessonsData[2].difficulty = "BEGINNER" as Difficulty;
  lessonsData[3].difficulty = "BEGINNER" as Difficulty;
  lessonsData[4].difficulty = "INTERMEDIATE" as Difficulty;
  lessonsData[5].difficulty = "INTERMEDIATE" as Difficulty;
  lessonsData[6].difficulty = "INTERMEDIATE" as Difficulty;
  lessonsData[7].difficulty = "ADVANCED" as Difficulty;
  lessonsData[8].difficulty = "ADVANCED" as Difficulty;
  lessonsData[9].difficulty = "ADVANCED" as Difficulty;

  const lessons = await Promise.all(
    lessonsData.map((data) =>
      prisma.lesson.upsert({
        where: { slug: data.slug },
        update: {},
        create: {
          title: data.title,
          slug: data.slug,
          description: data.description,
          content: data.content,
          theory: data.theory ?? null,
          rules: data.rules ?? null,
          difficulty: data.difficulty,
          courseType: data.courseType,
          lessonType: data.lessonType,
          order: data.order,
          xpReward: data.xpReward,
          published: data.published,
          categoryId: data.categoryId,
        },
      })
    )
  );

  // ── Exercises ──────────────────────────────────────────────
  const exercisesData = [
    // Lesson 1 exercises
    { lessonSlug: "introduction-to-pitman-shorthand", question: "Write the stroke for P (light sound)", answer: "Thin downward stroke", hint: "P is a voiceless sound", order: 1 },
    { lessonSlug: "introduction-to-pitman-shorthand", question: "Write the stroke for B (heavy sound)", answer: "Thick downward stroke", hint: "B is the voiced counterpart of P", order: 2 },
    // Lesson 2 exercises
    { lessonSlug: "consonants-strokes", question: "Draw the stroke for T", answer: "Thin downward straight stroke", hint: "T is a light sound in Group 1", order: 1 },
    { lessonSlug: "consonants-strokes", question: "Draw the stroke for the consonant 'M'", answer: "Thick clockwise curve", hint: "M is a voiced nasal sound", order: 2 },
    { lessonSlug: "consonants-strokes", question: "Identify the stroke direction for 'F'", answer: "Light upward straight stroke", hint: "F is in the upward group", order: 3 },
    // Lesson 3 exercises
    { lessonSlug: "vowels-placement-and-sounds", question: "How is the short vowel 'ă' represented?", answer: "Light dot placed at the beginning of the stroke", hint: "It's a first-place short vowel", order: 1 },
    { lessonSlug: "vowels-placement-and-sounds", question: "How is the long vowel 'ā' represented?", answer: "Heavy dash at the beginning of the stroke", hint: "It is the long form of first-place", order: 2 },
    // Lesson 4 exercises
    { lessonSlug: "joining-strokes", question: "Join the strokes for P and T in sequence", answer: "Downward angle join from P thin stroke to T thin stroke", hint: "Both strokes go in the same direction", order: 1 },
    { lessonSlug: "joining-strokes", question: "Join strokes for M and N to form the word 'man'", answer: "M thick curve joined to N thin curve", hint: "Both are clockwise curves", order: 2 },
    // Lesson 5 exercises
    { lessonSlug: "consonant-hooks", question: "Write the outline for the blend 'PR'", answer: "P stroke with clockwise R-hook", hint: "Add the hook on the same side as the R curve", order: 1 },
    { lessonSlug: "consonant-hooks", question: "Write the outline for the blend 'KL'", answer: "K stroke with anticlockwise L-hook", hint: "L-hook is anticlockwise", order: 2 },
    // Lesson 6 exercises
    { lessonSlug: "circles-and-loops", question: "Write the outline for the word 'sp' (as in 'spin')", answer: "S-circle joined to P stroke", hint: "Initial S is a small circle", order: 1 },
    { lessonSlug: "circles-and-loops", question: "Write the ST loop on the T stroke", answer: "T stroke with ST loop on the opposite side from S-circle", hint: "ST is a small loop", order: 2 },
    // Lesson 7 exercises
    { lessonSlug: "halving-and-doubling", question: "Write the halved form of K", answer: "Shortened K stroke = KT", hint: "Light halved stroke adds T", order: 1 },
    { lessonSlug: "halving-and-doubling", question: "Write the doubled form of M", answer: "Lengthened M stroke = MTR/MDR", hint: "Doubled curved strokes add TR", order: 2 },
    // Lesson 8 exercises
    { lessonSlug: "advanced-vowel-representation", question: "Write the outline for 'name' with explicit medial vowel", answer: "N stroke + second-place long A + M stroke", hint: "The vowel 'ā' is a heavy dash at the second place", order: 1 },
    { lessonSlug: "advanced-vowel-representation", question: "Write the outline for 'beat' with vowel omission", answer: "B stroke + T stroke (vowel omitted)", hint: "The long 'e' is implicit in context", order: 2 },
    { lessonSlug: "advanced-vowel-representation", question: "Write the triphthong for 'fire'", answer: "F stroke + diphthong hook for 'I' + R stroke", hint: "Triphthongs combine a diphthong sign plus vowel markers", order: 3 },
    // Lesson 9 exercises
    { lessonSlug: "phrasing-and-special-contractions", question: "Write the phrase 'I am' as a joined outline", answer: "I stroke joined to M stroke without lifting the pen", hint: "There is a natural flow between the two strokes", order: 1 },
    { lessonSlug: "phrasing-and-special-contractions", question: "Write the standard contraction for 'and'", answer: "N (dot)", hint: "It is a simple dot", order: 2 },
    // Lesson 10 exercises
    { lessonSlug: "speed-practice-techniques", question: "Describe the recommended daily practice duration", answer: "15-30 minutes daily", hint: "Consistency is more important than duration", order: 1 },
    { lessonSlug: "speed-practice-techniques", question: "What is the beginner target WPM range?", answer: "20-40 WPM", hint: "Focus on accuracy first", order: 2 },
    { lessonSlug: "speed-practice-techniques", question: "Name three components of shorthand speed", answer: "Stroke knowledge, muscle memory, phrasing", hint: "Also includes reading skill", order: 3 },
  ];

  for (const ex of exercisesData) {
    const lesson = lessons.find((l) => l.slug === ex.lessonSlug);
    if (!lesson) continue;
    await prisma.exercise.create({
      data: {
        lessonId: lesson.id,
        question: ex.question,
        answer: ex.answer,
        hint: ex.hint,
        order: ex.order,
      },
    });
  }

  // ── Quizzes ────────────────────────────────────────────────
  const quizzesData = [
    // Lesson 1 quizzes
    { lessonSlug: "introduction-to-pitman-shorthand", question: "Who invented Pitman shorthand?", options: ["John Gregg", "Isaac Pitman", "James Teeline", "Samuel Pepys"], correct: 1, order: 1 },
    { lessonSlug: "introduction-to-pitman-shorthand", question: "How are light and heavy sounds differentiated?", options: ["Pen color", "Stroke thickness", "Stroke direction", "Stroke length"], correct: 1, order: 2 },
    // Lesson 2 quizzes
    { lessonSlug: "consonants-strokes", question: "How many basic consonant strokes are there in Pitman?", options: ["12", "18", "24", "30"], correct: 2, order: 1 },
    { lessonSlug: "consonants-strokes", question: "Which direction do upward strokes go?", options: ["Left to right", "Right to left", "Top to bottom", "Bottom to top"], correct: 3, order: 2 },
    // Lesson 3 quizzes
    { lessonSlug: "vowels-placement-and-sounds", question: "A light dot represents what kind of vowel?", options: ["Long vowel", "Short vowel", "Diphthong", "Triphthong"], correct: 1, order: 1 },
    { lessonSlug: "vowels-placement-and-sounds", question: "Where is a third-place vowel written?", options: ["Above the stroke", "Below the stroke", "Level with the stroke", "At a 45-degree angle"], correct: 1, order: 2 },
    // Lesson 4 quizzes
    { lessonSlug: "joining-strokes", question: "When joining two strokes that go in the same direction, what angle should you use?", options: ["90 degrees", "Natural angle matching the strokes", "30 degrees", "Any angle"], correct: 1, order: 1 },
    { lessonSlug: "joining-strokes", question: "What is retrograde joining?", options: ["Joining at a sharp angle", "Writing backwards between strokes", "Lifting the pen between strokes", "Joining with a loop"], correct: 2, order: 2 },
    // Lesson 5 quizzes
    { lessonSlug: "consonant-hooks", question: "An R-hook is written on which side of the stroke?", options: ["Opposite side of the R curve", "Same side as the R curve", "At the end of the stroke", "In the middle of the stroke"], correct: 1, order: 1 },
    { lessonSlug: "consonant-hooks", question: "What do hooks represent?", options: ["Vowels", "Syllables", "Consonant blends", "Word endings"], correct: 2, order: 2 },
    // Lesson 6 quizzes
    { lessonSlug: "circles-and-loops", question: "What does a small circle at the beginning of a stroke represent?", options: ["A vowel", "The S sound", "The ST cluster", "The SW sound"], correct: 1, order: 1 },
    { lessonSlug: "circles-and-loops", question: "How does the SW-loop differ from the S-circle?", options: ["It is larger", "It is written on the opposite side", "It is a different shape", "It is a different color"], correct: 0, order: 2 },
    // Lesson 7 quizzes
    { lessonSlug: "halving-and-doubling", question: "Halving a light stroke adds which consonant?", options: ["S", "T", "R", "N"], correct: 1, order: 1 },
    { lessonSlug: "halving-and-doubling", question: "Doubling is typically applied to what type of stroke?", options: ["Straight strokes", "Curved strokes", "Dots", "Upward strokes only"], correct: 1, order: 2 },
    // Lesson 8 quizzes
    { lessonSlug: "advanced-vowel-representation", question: "In a medial vowel between two consonants, where is a first-place vowel written?", options: ["Above the second stroke", "Below the first stroke", "Above the first stroke", "Level with the second stroke"], correct: 2, order: 1 },
    { lessonSlug: "advanced-vowel-representation", question: "When should a medial vowel be omitted for speed?", options: ["Never", "Always", "When the word is recognizable from context", "Only in proper nouns"], correct: 2, order: 2 },
    // Lesson 9 quizzes
    { lessonSlug: "phrasing-and-special-contractions", question: "What is phrasing in Pitman shorthand?", options: ["Joining two or more words without lifting the pen", "Writing words in alphabetical order", "Abbreviating words to single letters", "Using exclusively diphthong signs"], correct: 0, order: 1 },
    { lessonSlug: "phrasing-and-special-contractions", question: "Which word does the dot 'N' represent as a contraction?", options: ["Not", "New", "And", "No"], correct: 2, order: 2 },
    // Lesson 10 quizzes
    { lessonSlug: "speed-practice-techniques", question: "What is the recommended daily practice duration?", options: ["5-10 minutes", "15-30 minutes", "1-2 hours", "3-4 hours"], correct: 1, order: 1 },
    { lessonSlug: "speed-practice-techniques", question: "At what stage of practice should you focus on speed?", options: ["From day one", "After achieving accuracy", "After one year", "Speed is never the focus"], correct: 1, order: 2 },
  ];

  for (const q of quizzesData) {
    const lesson = lessons.find((l) => l.slug === q.lessonSlug);
    if (!lesson) continue;
    await prisma.quiz.create({
      data: {
        lessonId: lesson.id,
        question: q.question,
        options: q.options as unknown as string[],
        correct: q.correct,
        order: q.order,
      },
    });
  }

  // ── Dictionary Entries ──────────────────────────────────────
  const dictionaryData = [
    { word: "the", slug: "the", meaning: "Definite article", outline: "Dot (placed before or after the stroke depending on context)", rule: "The is represented by a small dot placed in the appropriate vowel position relative to the adjacent consonant.", courseType: "PITMAN" as CourseType },
    { word: "and", slug: "and", meaning: "Conjunction", outline: "N (dot)", rule: "Contraction — written as a small dot representing N.", courseType: "PITMAN" as CourseType },
    { word: "to", slug: "to", meaning: "Preposition indicating direction", outline: "T (upward stroke)", rule: "Upward T stroke used as a standard contraction.", courseType: "PITMAN" as CourseType },
    { word: "of", slug: "of", meaning: "Preposition indicating possession", outline: "O (light upward stroke)", rule: "Light upward stroke representing the sound 'of'.", courseType: "PITMAN" as CourseType },
    { word: "in", slug: "in", meaning: "Preposition indicating position", outline: "N (light upward curve)", rule: "The consonant 'N' written as a light upward curve in shorthand.", courseType: "PITMAN" as CourseType },
    { word: "that", slug: "that", meaning: "Demonstrative pronoun or conjunction", outline: "TH (upward stroke) + T (halved downward stroke)", rule: "TH upward heavy stroke followed by a halved T.", courseType: "PITMAN" as CourseType },
    { word: "have", slug: "have", meaning: "Auxiliary verb indicating possession", outline: "H (dot) + V (heavy upward stroke)", rule: "H dot followed by V heavy upward stroke.", courseType: "PITMAN" as CourseType },
    { word: "it", slug: "it", meaning: "Third-person singular pronoun", outline: "I (short vowel dot) positioned before T stroke", rule: "Short vowel 'i' represented as a light dot before the T stroke.", courseType: "PITMAN" as CourseType },
    { word: "for", slug: "for", meaning: "Preposition indicating purpose", outline: "F (heavy upward stroke)", rule: "Contraction — F heavy upward stroke.", courseType: "PITMAN" as CourseType },
    { word: "with", slug: "with", meaning: "Preposition indicating accompaniment", outline: "W (heavy stroke)", rule: "Contraction — W heavy stroke.", courseType: "PITMAN" as CourseType },
  ];

  for (const entry of dictionaryData) {
    await prisma.dictionary.upsert({
      where: { slug: entry.slug },
      update: {},
      create: entry,
    });
  }

  // ── Blog Posts ──────────────────────────────────────────────
  const blogData = [
    {
      title: "Why Learn Pitman Shorthand in the Digital Age?",
      slug: "why-learn-pitman-shorthand",
      excerpt: "Discover how Pitman shorthand remains relevant for journalists, court reporters, and note-takers in the modern world.",
      content: `# Why Learn Pitman Shorthand in the Digital Age?

In an era of voice typing and AI transcription, you might wonder: is shorthand still relevant? The answer is a resounding yes.

## Speed and Efficiency

Professional court reporters can reach speeds of 200+ WPM using Pitman shorthand — far exceeding the average typing speed of 40 WPM. No voice recognition system is 100% accurate in noisy environments like courtrooms or press conferences.

## Cognitive Benefits

Learning shorthand improves your listening skills, memory, and ability to process information in real-time. It's a mental workout that sharpens focus.

## Professional Demand

Court reporters, transcriptionists, journalists, and medical transcribers remain in high demand. Shorthand certification is a differentiator in these fields.

## No Batteries Required

Shorthand works with just a pen and paper — no internet, no batteries, no software updates. It's the ultimate backup for any professional note-taker.

Join ShorthandHub and start your journey today!`,
      coverImage: "/images/blog/pitman-digital-age.jpg",
      readingTime: 4,
      published: true,
      featured: true,
      authorName: "ShorthandHub Team",
      tags: ["pitman", "shorthand", "career tips"],
      categoryId: categories[0].id,
    },
    {
      title: "10 Tips to Double Your Shorthand Speed in 30 Days",
      slug: "double-shorthand-speed-30-days",
      excerpt:
        "A structured 30-day plan with proven drills and techniques to help you double your shorthand writing speed.",
      content: `## 10 Tips to Double Your Shorthand Speed in 30 Days

### Week 1: Foundation Review

1. Revisit stroke shapes and ensure every stroke is drawn correctly.
2. Practice consonant pairs for 10 minutes daily.
3. Test yourself on stroke names and vowel positions.

### Week 2: Phrase Building

4. Learn 20 common phrases and practice writing them continuously.
5. Eliminate unnecessary pen lifts.
6. Use contractions wherever possible.

### Week 3: Dictation Drills

7. Start dictation at 40 WPM for 5-minute sessions.
8. Increase speed by 5 WPM every session.
9. Transcribe immediately after writing.

### Week 4: Review and Refine

10. Identify your slow spots — specific strokes or combinations where you hesitate — and drill them.

By the end of 30 days, you should see a significant improvement in both speed and confidence. Consistency is key!`,
      coverImage: "/images/blog/speed-tips.jpg",
      readingTime: 5,
      published: true,
      featured: false,
      authorName: "Sarah Johnson",
      tags: ["speed building", "pitman", "practice tips"],
      categoryId: categories[0].id,
    },
    {
      title: "Comparing Pitman, Gregg, and Teeline Shorthand",
      slug: "comparing-pitman-gregg-teeline",
      excerpt:
        "An in-depth comparison of the three major shorthand systems to help you choose the right one for your needs.",
      content: `## Comparing Pitman, Gregg, and Teeline Shorthand

Choosing a shorthand system is a big decision. Here's how the three major systems compare.

| Feature | Pitman | Gregg | Teeline |
|---------|--------|-------|---------|
| Founded | 1837 | 1888 | 1968 |
| Base | Phonetic (consonant strokes + vowel marks) | Phonetic (cursive, flowing strokes) | Simplified alphabet-based |
| Speed ceiling | 200+ WPM | 200+ WPM | 100-150 WPM |
| Learning curve | Steep (thickness, position rules) | Moderate (smooth curves) | Gentler (closer to alphabet) |
| Best for | Professionals, court reporters | Those who prefer cursive | Journalists, students |

### Which One Should You Learn?

**Pitman** — Best for professional court reporters and those who want the highest possible speed ceiling. Requires more practice but rewards with unmatched speed.

**Gregg** — Ideal if you find cursive writing natural. The system flows, making it easier on the hand for long sessions.

**Teeline** — The fastest to learn (can be mastered in weeks). It's the standard for journalism education in the UK.

At ShorthandHub, we support all three systems. Start with the one that matches your goals!`,
      coverImage: "/images/blog/comparison.jpg",
      readingTime: 6,
      published: true,
      featured: true,
      authorName: "ShorthandHub Team",
      tags: ["pitman", "gregg", "teeline", "comparison", "shorthand"],
      categoryId: categories[0].id,
    },
  ];

  for (const post of blogData) {
    await prisma.blog.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  // ── Admin User ──────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin123!", 12);
  await prisma.user.upsert({
    where: { email: "admin@shorthandhub.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@shorthandhub.com",
      password: hashedPassword,
      role: "ADMIN" as UserRole,
      emailVerified: new Date(),
    },
  });

  // ── Achievements ────────────────────────────────────────────
  const achievementsData = [
    {
      title: "First Lesson",
      description: "Complete your very first lesson",
      icon: "BookOpen",
      xpReward: 50,
      criteria: { type: "lesson_count", value: 1 },
    },
    {
      title: "Speed Demon",
      description: "Reach 60 WPM in a practice session",
      icon: "Zap",
      xpReward: 100,
      criteria: { type: "wpm", value: 60 },
    },
    {
      title: "Streak Master",
      description: "Maintain a 7-day learning streak",
      icon: "Flame",
      xpReward: 150,
      criteria: { type: "streak", value: 7 },
    },
    {
      title: "Knowledge Seeker",
      description: "Complete 10 lessons",
      icon: "GraduationCap",
      xpReward: 200,
      criteria: { type: "lesson_complete_count", value: 10 },
    },
  ];

  for (const achievement of achievementsData) {
    await prisma.achievement.upsert({
      where: { id: achievement.title },
      update: {},
      create: {
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        xpReward: achievement.xpReward,
        criteria: achievement.criteria,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });