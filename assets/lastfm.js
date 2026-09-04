(function () {
  var widget = document.getElementById('lastfm-track');
  if (!widget) { console.log('lastfm: widget not found'); return; }
  console.log('lastfm: widget found, fetching');

  function textElement(tag, className, text) {
    var element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function showMessage(className, text) {
    widget.replaceChildren(textElement('p', className, text));
  }

  function renderTrack(track) {
    var row = document.createElement('div');
    row.className = 'listening-track';

    if (track.image) {
      var art = document.createElement('img');
      art.className = 'listening-art';
      art.src = track.image;
      art.alt = 'Album artwork for ' + (track.album || track.name);
      art.width = 64;
      art.height = 64;
      art.loading = 'lazy';
      row.appendChild(art);
    } else {
      row.appendChild(textElement('div', 'listening-art listening-art-empty', 'LP'));
    }

    var details = document.createElement('div');
    details.className = 'listening-details';
    details.appendChild(textElement('p', 'listening-status', track.nowPlaying ? 'Now playing' : 'Last played'));

    var name = document.createElement('a');
    name.className = 'listening-name';
    name.href = track.url || 'https://www.last.fm/user/ropeburns';
    name.textContent = track.name;
    details.appendChild(name);
    details.appendChild(textElement('p', 'listening-artist', track.artist));

    if (track.album) details.appendChild(textElement('p', 'listening-album', track.album));
    row.appendChild(details);
    widget.replaceChildren(row);
  }

  fetch('https://lastfm-proxy.unkwngly28.workers.dev/api/lastfm', { cache: 'no-store', credentials: 'omit' })
    .then(function (response) {
      console.log('lastfm: response status', response.status);
      if (!response.ok) throw new Error('Listening data is unavailable.');
      return response.json();
    })
    .then(function (track) {
      console.log('lastfm: track data', track);
      if (!track.available || !track.name || !track.artist) {
        showMessage('listening-empty', 'No recent scrobbles to show right now.');
        return;
      }
      renderTrack(track);
    })
    .catch(function (e) {
      console.log('lastfm: error', e);
      showMessage('listening-empty', 'Listening data is unavailable right now.');
    });
})();