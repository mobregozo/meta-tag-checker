import Image from 'next/image';
import { MetaTag } from '../utils/metaChecker';

type PreviewProps = {
  metaTags: MetaTag[];
  platform: 'twitter' | 'facebook' | 'linkedin';
};

export default function SocialPreview({ metaTags, platform }: PreviewProps) {
  const getMetaContent = (name: string) => 
    metaTags.find(tag => tag.name === name)?.content || '';

  const title = getMetaContent(`${platform}:title`) || getMetaContent('og:title') || getMetaContent('title');
  const description = getMetaContent(`${platform}:description`) || getMetaContent('og:description') || getMetaContent('description');
  const image = getMetaContent(`${platform}:image`) || getMetaContent('og:image');

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg max-w-md mb-4">
      <div className="bg-gray-100 p-4">
        <h3 className="font-bold text-lg mb-2">{platform.charAt(0).toUpperCase() + platform.slice(1)} Preview</h3>
      </div>
      {image && (
        <div className="relative h-48">
          <Image src={image} alt="Preview image" layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="p-4">
        <h4 className="font-bold text-xl mb-2">{title}</h4>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
    </div>
  );
}

