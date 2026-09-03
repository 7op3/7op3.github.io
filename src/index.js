addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const apiKey = event.env.LASTFM_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ available: false }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
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
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`);
    if (!response.ok) throw new Error(`Last.fm returned ${response.status}`);

    const payload = await response.json();
    if (payload.error) throw new Error(payload.message || 'Last.fm returned an error.');

    const tracks = payload.recenttracks?.track;
    const track = Array.isArray(tracks) ? tracks[0] : tracks;

    if (!track || !track.name || !track.artist) {
      return new Response(JSON.stringify({ available: false }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
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

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ available: false }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
