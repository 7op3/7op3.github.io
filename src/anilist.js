export default {
  async fetch(request, env) {
    const cacheKey = 'anilist-media';
    const cacheTtl = 6 * 60 * 60;

    try {
      const cached = await env.ANILIST_CACHE.get(cacheKey, { type: 'json' });
      const cachedAt = await env.ANILIST_CACHE.get('anilist-media-timestamp', { type: 'text' });
      const now = Math.floor(Date.now() / 1000);

      if (cached && cachedAt && (now - parseInt(cachedAt)) < cacheTtl) {
        return jsonResponse(cached);
      }

      const query = `{
        anime: MediaListCollection(userName: "warps", type: ANIME, status_in: [CURRENT, COMPLETED, PAUSED, DROPPED, REPEATING]) {
          lists {
            name
            entries {
              status
              progress
              score
              startedAt { year month day }
              completedAt { year month day }
              media {
                id
                title { romaji english native }
                status
                episodes
                chapters
                description
                coverImage { large }
                genres
                averageScore
                trending
              }
            }
          }
        }
        manga: MediaListCollection(userName: "warps", type: MANGA, status_in: [CURRENT, COMPLETED, PAUSED, DROPPED, REPEATING]) {
          lists {
            name
            entries {
              status
              progress
              score
              startedAt { year month day }
              completedAt { year month day }
              media {
                id
                title { romaji english native }
                status
                episodes
                chapters
                description
                coverImage { large }
                genres
                averageScore
                trending
              }
            }
          }
        }
      }`;

      const response = await fetch('https://graphql.anilist.co', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        if (cached) return jsonResponse(cached);
        return jsonResponse({ error: 'AniList API unavailable', available: false }, 503);
      }

      const payload = await response.json();
      if (payload.errors) {
        if (cached) return jsonResponse(cached);
        return jsonResponse({ error: payload.errors[0].message, available: false }, 503);
      }

      await env.ANILIST_CACHE.put(cacheKey, JSON.stringify(payload), { expirationTtl: cacheTtl });
      await env.ANILIST_CACHE.put('anilist-media-timestamp', String(now), { expirationTtl: cacheTtl });

      return jsonResponse(payload);
    } catch (error) {
      try {
        const cached = await env.ANILIST_CACHE.get(cacheKey, { type: 'json' });
        if (cached) return jsonResponse(cached);
      } catch (_) {}
      return jsonResponse({ error: 'AniList data unavailable', available: false }, 503);
    }
  }
}

function jsonResponse(data, status) {
  status = status || 200;
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
    status: status
  });
}