'use client'
import { useState } from 'react';

export default function ShortenUrlForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('/api/v1/url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.error || 'Failed to shorten');

          setShortUrl(`${window.location.origin}/${data.slug}`);
          setError('');
      } catch (err) {
        setError('Failed to shorten URL: ' + err);
      }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className='flex gap-2'>
            <input
                type='url'
                placeholder='Enter URL'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className='flex-1 rounded-lg text-black border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
            />
            <button
                type='submit'
                className='rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            >
                Shorten
            </button>
        </div>
        {error && <p className="mt-2 text-red-500">{error}</p>}

        {shortUrl && (
        <div className="mt-4">
          <p className="text-green-600">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </form>
  );
}
