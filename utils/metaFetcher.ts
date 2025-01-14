export type MetaTag = {
  name: string;
  content: string;
};

export async function fetchMetadata(url: string): Promise<MetaTag[]> {
  // Ensure the URL has a protocol
  const fullUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;

  const response = await fetch('/api/fetch-metadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: fullUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch metadata');
  }

  const data = await response.json();
  return data.metaTags;
}

export function checkMissingMetaTags(metaTags: MetaTag[]): string[] {
  const requiredTags = [
    'title',
    'description',
    'og:title',
    'og:description',
    'og:image',
    'twitter:card',
    'twitter:title',
    'twitter:description',
    'twitter:image'
  ];

  const presentTags = metaTags.map(tag => tag.name);
  return requiredTags.filter(tag => !presentTags.includes(tag));
}

