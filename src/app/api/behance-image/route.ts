import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'url param required' }, { status: 400 });
  }

  // Strategy 1: allorigins proxy (bypasses IP blocks - uses their own IP pool)
  try {
    const image = await fetchViaAllOrigins(url);
    if (image) return NextResponse.json({ image });
  } catch {
    // fall through
  }

  // Strategy 2: htmlapi.com proxy
  try {
    const image = await fetchViaHtmlApi(url);
    if (image) return NextResponse.json({ image });
  } catch {
    // fall through
  }

  return NextResponse.json({ error: 'No se pudo obtener la imagen de Behance' }, { status: 404 });
}

async function fetchViaAllOrigins(url: string): Promise<string | null> {
  const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxyUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`allorigins ${res.status}`);
  const html = await res.text();
  return extractOgImage(html);
}

async function fetchViaHtmlApi(url: string): Promise<string | null> {
  const proxyUrl = `https://htmlapi.com/api/html?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxyUrl, {
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`htmlapi ${res.status}`);
  const html = await res.text();
  return extractOgImage(html);
}

function extractOgImage(html: string): string | null {
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

  // Behance CDN direct URL in source
  const cdnMatch = html.match(/(https:\/\/mir-s3-cdn-cf\.behance\.net\/projects\/[^"'\s,]+)/);
  if (cdnMatch) return cdnMatch[1];

  return null;
}
