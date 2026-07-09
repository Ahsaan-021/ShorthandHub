# ShorthandHub

Master Pitman, Gregg, and Teeline shorthand with interactive lessons, AI-powered learning, and real practice exercises.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (Base UI)
- **Animation:** Framer Motion
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Authentication:** NextAuth v5 (Auth.js) with Prisma adapter
- **AI:** OpenAI API (GPT-4) — integrated for explanations and recommendations
- **Email:** SMTP (Nodemailer via Resend-compatible setup)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts
- **Carousel:** Embla Carousel
- **Deployment:** Vercel

## Features

- **Interactive Lessons** — Step-by-step theory lessons with stroke animations, exercises, and inline quizzes
- **AI-Powered Learning** — Get instant explanations, personalized recommendations, and mistake analysis (coming soon)
- **Progress Tracking** — XP, streaks, accuracy, WPM tracking with detailed analytics and achievement badges
- **Practice Mode** — Timed drills, dictation exercises, and daily challenges to build muscle memory
- **Dictionary** — Search Pitman shorthand outlines with pronunciation guides and rule explanations
- **Multiple Systems** — Pitman (available now), Gregg and Teeline (coming soon)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Supabase)

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/shorthandhub.git
cd shorthandhub

# Copy environment variables and fill in your values
cp .env.example .env

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to your database
npx prisma db push

# Seed the database (optional, creates sample data)
npx prisma db seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
shorthandhub/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── (auth)/            # Login, register, forgot-password
│   │   ├── (dashboard)/       # Dashboard, settings
│   │   ├── blog/              # Blog pages
│   │   ├── contact/           # Contact form
│   │   ├── courses/           # Course listing and lesson pages
│   │   ├── dictionary/        # Dictionary search
│   │   ├── practice/          # Practice mode
│   │   └── pricing/           # Pricing page
│   ├── components/            # Reusable UI components
│   │   ├── ui/                # shadcn/ui primitives
│   │   └── ...                # Feature-specific components
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDebounce.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useProgress.ts
│   │   └── useTimer.ts
│   ├── lib/                   # Utility functions and config
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── constants.ts       # App-wide constants
│   │   ├── db.ts              # Prisma client singleton
│   │   ├── seo.ts             # SEO helpers
│   │   ├── supabase.ts        # Supabase client
│   │   └── utils.ts           # cn() and other helpers
│   ├── services/              # Business logic services
│   │   ├── ai.ts              # AI service (OpenAI)
│   │   ├── cache.ts           # Caching utilities
│   │   └── email.ts           # Email service
│   ├── middleware.ts          # Next.js middleware
│   └── types/                 # Shared TypeScript types
│       ├── index.ts
│       └── next-auth.d.ts
├── public/                    # Public assets (favicon, images)
├── .env.example               # Environment variable template
├── components.json            # shadcn/ui configuration
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

## Available Scripts

| Script                 | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start development server           |
| `npm run build`        | Build for production               |
| `npm run start`        | Start production server            |
| `npm run lint`         | Run ESLint                         |
| `npx prisma generate`  | Generate Prisma client             |
| `npx prisma db push`   | Push schema to database             |
| `npx prisma db seed`   | Seed database with sample data     |

## Environment Variables

| Variable                          | Description                         | Required |
| --------------------------------- | ----------------------------------- | -------- |
| `DATABASE_URL`                    | PostgreSQL connection string         | Yes      |
| `DIRECT_URL`                      | Direct database connection (bypasses pgBouncer) | Yes |
| `AUTH_SECRET`                     | NextAuth encryption secret           | Yes      |
| `AUTH_URL`                        | Application base URL                 | Yes      |
| `NEXT_PUBLIC_SUPABASE_URL`        | Supabase project URL                 | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Supabase anonymous key               | Yes      |
| `SUPABASE_SERVICE_ROLE_KEY`       | Supabase service role key            | Yes      |
| `AI_API_KEY`                      | OpenAI API key (for AI features)     | No       |
| `AI_MODEL`                        | OpenAI model name                    | No       |
| `NEXT_PUBLIC_APP_URL`            | Public-facing app URL                | Yes      |
| `NEXT_PUBLIC_APP_NAME`           | App display name                     | No       |
| `NEXT_PUBLIC_APP_DESCRIPTION`    | App meta description                 | No       |
| `SMTP_HOST` / `SMTP_PORT` / etc. | SMTP credentials (for email)         | No       |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID`| Vercel analytics ID                  | No       |

Generate `AUTH_SECRET` with:

```bash
openssl rand -base64 32
```

## Deployment

This project is designed to deploy seamlessly on [Vercel](https://vercel.com).

1. Push your repository to GitHub
2. Import the project into Vercel
3. Set all environment variables in the Vercel dashboard
4. Deploy

Make sure your database is accessible from Vercel's network (or use Supabase with connection pooling).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)