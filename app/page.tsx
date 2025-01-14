'use client'

import { useState } from 'react';
import MissingMetaTags from '../components/MissingMetaTags';
import UnifiedPreview from '../components/UnifiedPreview';
import { fetchMetadata, MetaTag } from '../utils/metaFetcher';
import Spinner from '../components/Spinner';

export default function Home() {
  const [metaTags, setMetaTags] = useState<MetaTag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const urlInput = formData.get('url') as string;
    const url = urlInput.startsWith('http://') || urlInput.startsWith('https://') ? urlInput : `https://${urlInput}`;

    if (!url) {
      setError('URL is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tags = await fetchMetadata(url);
      setMetaTags(tags);
    } catch (err) {
      setError('Failed to fetch metadata. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Meta Tag Checker</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="flex mb-8 relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
            https://
          </span>
          <input
            type="text"
            name="url"
            placeholder="example.com"
            required
            className="flex-grow p-2 pl-20 border rounded-l bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-r hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center min-w-[80px]" disabled={isLoading}>
            {isLoading ? <Spinner /> : 'Check'}
          </button>
        </div>
      </form>
      {error && (
        <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 mb-4 w-full max-w-md">
          {error}
        </div>
      )}
      {metaTags.length > 0 && (
        <div className="w-full max-w-md">
          <MissingMetaTags metaTags={metaTags} />
          <UnifiedPreview metaTags={metaTags} />
        </div>
      )}
    </main>
  );
}

