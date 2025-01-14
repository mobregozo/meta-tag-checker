export type MetaTag = {
  name: string;
  content: string;
};

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

