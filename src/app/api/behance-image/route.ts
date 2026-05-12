import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  if (!url) {
    return NextResponse.json({ error: 'url param required' }, { status: 400 });
  }

  // microlink.io: renders pages with a real headless browser, extracts og:image
  // Free tier: 50 req/day — plenty for a portfolio admin
  try {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=true`;
    const res = await fetch(apiUrl, {
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) throw new Error(`microlink ${res.status}`);

    const data = await res.json();

    if (data.status === 'success') {
      const image =
        data.data?.image?.url ||
        data.data?.screenshot?.url ||
        null;

      if (image) return NextResponse.json({ image });
    }
  } catch (err) {
    console.error('microlink error:', err);
  }

  return NextResponse.json({ error: 'No se pudo obtener la imagen' }, { status: 404 });
}
