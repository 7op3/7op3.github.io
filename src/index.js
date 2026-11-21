const CACHE_TTL = 30;

const respond = (data, jsonHeaders, ctx, cache, cacheKey) => {
  const body = JSON.stringify(data);
  ctx.waitUntil(cache.put(cacheKey, new Response(body, {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': `public, max-age=${CACHE_TTL}` }
  })));
  return new Response(body, {
    headers: { ...jsonHeaders, 'Cache-Control': `public, max-age=${CACHE_TTL}` }
  });
};

export default {
  async fetch(request, env, ctx) {
    // CORS configuration - restrict to specific origins
    const allowedOrigins = [
      'https://seven.oops.wtf',
      'https://7op3.github.io',
      'http://localhost:4000',
      'http://127.0.0.1:4000',
      'http://localhost:8080',
      'http://127.0.0.1:8080'
    ];

    const origin = request.headers.get('Origin');
    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : 'https://seven.oops.wtf',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Only allow GET requests
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const jsonHeaders = { ...corsHeaders, 'Content-Type': 'application/json' };

    if (env.RATE_LIMITER) {
      const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
      const { success } = await env.RATE_LIMITER.limit({ key: `lastfm:${clientIP}` });
      if (!success) {
        return new Response(JSON.stringify({ available: false }), {
          status: 429,
          headers: { ...jsonHeaders, 'Retry-After': '60' }
        });
      }
    }

    // Shared edge cache so repeated GETs don't each spend the owner's Last.fm quota.
    const cache = caches.default;
    const cacheKey = new Request(new URL('/__lastfm-recent', request.url).toString());
    const cached = await cache.match(cacheKey);
    if (cached) {
      return new Response(cached.body, {
        headers: { ...jsonHeaders, 'Cache-Control': `public, max-age=${CACHE_TTL}` }
      });
    }

    const apiKey = env.LASTFM_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ available: false }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const params = new URLSearchParams({
      method: 'user.getrecenttracks',
      user: 'ropeburns',
      api_key: apiKey,
      format: 'json',
      limit: '1'
    });

    try {
      const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
        headers: {
          'User-Agent': '7op3-personal-site/1.0'
        }
      });

      if (!response.ok) throw new Error(`Last.fm returned ${response.status}`);

      const payload = await response.json();
      if (payload.error) throw new Error(payload.message || 'Last.fm returned an error.');

      const tracks = payload.recenttracks?.track;
      const track = Array.isArray(tracks) ? tracks[0] : tracks;

      if (!track || !track.name || !track.artist) {
        return respond({ available: false }, jsonHeaders, ctx, cache, cacheKey);
      }

      const artist = track.artist?.['#text'] || track.artist?.name || '';
      const images = Array.isArray(track?.image) ? track.image : [];
      const image = images.find(item => item.size === 'extralarge' && item['#text'])
        || images.find(item => item.size === 'large' && item['#text'])
        || images.find(item => item['#text']);

      const data = {
        available: true,
        nowPlaying: track['@attr']?.nowplaying === 'true',
        name: track.name,
        artist,
        album: track.album?.['#text'] || '',
        image: image?.['#text'] || '',
        url: track.url || 'https://www.last.fm/user/ropeburns',
        timestamp: track.date?.uts || ''
      };

      return respond(data, jsonHeaders, ctx, cache, cacheKey);
    } catch (error) {
      console.error('Last.fm proxy error:', error);
      return respond({ available: false }, jsonHeaders, ctx, cache, cacheKey);
    }
  }
}