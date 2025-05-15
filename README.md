# SkillMapper

A visual skill mapping and learning journey tracking application built with Next.js, React Flow, and Supabase.

## Features

- Interactive skill maps with React Flow
- Progress tracking for each skill
- Resource management (articles, videos, courses, projects)
- AI-powered learning path suggestions
- Real-time updates with Supabase
- Beautiful animations with Framer Motion

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS + ShadCN UI
- React Flow / D3.js
- Supabase (Auth + DB + Realtime)
- OpenAI API
- Framer Motion

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Set up your Supabase database with the following tables:
   - `skills` (id, name, category, progress, description, resources, dependencies, createdAt, updatedAt)
   - `resources` (id, title, url, type, description, completed)

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── skill-map/      # Skill map related components
├── lib/                # Utility functions and configurations
│   ├── supabase/       # Supabase client and helpers
│   └── openai/         # OpenAI API integration
├── types/              # TypeScript type definitions
└── styles/             # Global styles and Tailwind config
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Deployment

### Vercel Deployment

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com) and create a new project
3. Import your GitHub repository
4. Add the following environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your production URL)
5. Deploy!

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Environment Variables

Make sure to set up the following environment variables in your production environment:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=your_production_url
```

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Make sure all dependencies are installed: `npm install`
   - Clear Next.js cache: `rm -rf .next`
   - Rebuild: `npm run build`

2. **Environment Variables**
   - Verify all required environment variables are set
   - Check for typos in variable names
   - Ensure values are properly formatted

3. **Database Connection**
   - Verify Supabase URL and anon key
   - Check database permissions
   - Ensure tables are properly set up 