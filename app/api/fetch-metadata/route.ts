import { NextResponse } from 'next/server';
import { load } from 'cheerio';

export async function POST(request: Request) {
  const { url } = await request.json();
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const $ = load(html);
    
    const metaTags = [];
    
    $('meta').each((_, elem) => {
      const name = $(elem).attr('name') || $(elem).attr('property');
      const content = $(elem).attr('content');
      if (name && content) {
        metaTags.push({ name, content });
      }
    });
    
    const title = $('title').text();
    if (title) {
      metaTags.push({ name: 'title', content: title });
    }
    
    return NextResponse.json({ metaTags });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Failed to fetch metadata. Please check the URL and try again.' }, { status: 500 });
  }
}

