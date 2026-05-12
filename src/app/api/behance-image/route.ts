import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'url param required' }, { status: 400 });
  }

  // Strategy 1: Extract gallery ID and hit Behance's undocumented JSON endpoint
  const galleryMatch = url.match(/behance\.net\/gallery\/(\d+)/);
  if (galleryMatch) {
    const projectId = galleryMatch[1];
    try {
      const image = await fetchFromBehanceJson(projectId);
      if (image) return NextResponse.json({ image });
    } catch {
      // fall through to HTML scrape
    }
  }

  // Strategy 2: Scrape the HTML page with browser-like headers
  try {
    const image = await fetchFromHtml(url);
    if (image) return NextResponse.json({ image });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Fetch failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json({ error: 'No image found' }, { status: 404 });
}

async function fetchFromBehanceJson(projectId: string): Promise<string | null> {
  // Behance exposes project data via their internal API (no auth needed for public projects)
  const endpoints = [
    `https://www.behance.net/v2/projects/${projectId}?client_id=MSyBebMq37CzYKjPVb5PBTnKMtTPLBqr`,
    `https://api.behance.net/v2/projects/${projectId}?api_key=MSyBebMq37CzYKjPVb5PBTnKMtTPLBqr`,
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(5000),
        redirect: 'follow',
      });
      if (!res.ok) continue;
      const data = await res.json();
      const covers = data?.project?.covers;
      if (covers) {
        return covers['808'] || covers['404'] || covers['230'] || covers['115'] || null;
      }
    } catch {
      continue;
    }
  }
  return null;
}

async function fetchFromHtml(url: string): Promise<string | null> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'Sec-CH-UA': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
      'Sec-CH-UA-Mobile': '?0',
      'Sec-CH-UA-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const html = await res.text();

  // og:image
  const ogMatch =
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (ogMatch) return ogMatch[1];

  // twitter:image
  const twMatch =
    html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ||
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i);
  if (twMatch) return twMatch[1];

  // Behance CDN image in JSON-LD or script tags
  const cdnMatch = html.match(/mir-s3-cdn-cf\.behance\.net\/projects\/[^"'\s]+/);
  if (cdnMatch) return `https://${cdnMatch[0]}`;

  return null;
}
