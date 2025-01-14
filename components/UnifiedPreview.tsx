import Image from 'next/image';
import { MetaTag } from '../utils/metaFetcher';

export default function UnifiedPreview({ metaTags }: { metaTags: MetaTag[] }) {
  const getMetaContent = (name: string) => 
    metaTags.find(tag => tag.name === name || tag.name === `og:${name}` || tag.name === `twitter:${name}`)?.content || '';

  const title = getMetaContent('title');
  const description = getMetaContent('description');
  const image = getMetaContent('image');

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg mb-4 bg-gray-800 border-gray-700">
      <div className="bg-gray-700 p-4">
        <h3 className="font-bold text-lg mb-2 text-white">Social Media Preview</h3>
      </div>
      {image && (
        <div className="relative h-48">
          <Image 
            src={image} 
            alt="Preview image" 
            layout="fill" 
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = '/dark-placeholder-image.jpg';
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h4 className="font-bold text-xl mb-2 text-white">{title || 'No title available'}</h4>
        <p className="text-gray-300 text-base">{description || 'No description available'}</p>
      </div>
    </div>
  );
}

