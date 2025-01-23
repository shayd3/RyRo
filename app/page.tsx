import ShortenUrlForm from '@/components/ShortenUrlForm';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          RyRo
        </h1>
        <ShortenUrlForm />
      </div>
    </main>
  );
}
