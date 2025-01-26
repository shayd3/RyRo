# Ryro URL Shortener

A modern, fast URL shortener built with React and Next.js, deployed on Vercel.

## Features

- Clean, minimal interface
- Fast URL shortening
- Secure and reliable
- Built with modern web technologies
- Fully responsive design

## Tech Stack

- [React](https://react.dev/) - UI Framework
- [Next.js](https://nextjs.org/) - React Framework
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type Safety
- [Vercel](https://vercel.com/) - Hosting & Deployment

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/shayd3/ryro.git
cd ryro
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

This project is deployed on Vercel. To deploy your own version, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/shayd3/ryro.git
cd ryro
```

2. Install dependencies:

```bash
pnpm install
```

3. Deploy to Vercel:

```bash
vercel
```

4. Open your deployed URL to see the result.

## Prisma Database

The database is deployed on Vercel (Via Supabase). To see the database, you can use the Vercel dashboard.

### Update Database Schema

```bash
pnpx prisma migrate dev --name <name of migration>

```

### Generate Prisma Client

```bash
pnpm prisma generate
```
