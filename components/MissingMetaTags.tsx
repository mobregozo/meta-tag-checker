import { checkMissingMetaTags, MetaTag } from '../utils/metaFetcher';

export default function MissingMetaTags({ metaTags }: { metaTags: MetaTag[] }) {
  const missingTags = checkMissingMetaTags(metaTags);

  return (
    <div className="bg-gray-800 border-l-4 border-yellow-500 text-yellow-100 p-4 mb-4 rounded">
      <h2 className="font-bold mb-2">Missing Meta Tags:</h2>
      {missingTags.length > 0 ? (
        <ul className="list-disc list-inside">
          {missingTags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : (
        <p>All required meta tags are present!</p>
      )}
    </div>
  );
}

