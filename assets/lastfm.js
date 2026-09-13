(function () {
  var widget = document.getElementById('lastfm-track');
  if (!widget) return;

  var intervalId = null;
  var retryCount = 0;
  var maxRetries = 3;

  function textElement(tag, className, text) {
    var element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function showMessage(className, text, isRetryable) {
    widget.replaceChildren(textElement('p', className, text));
    if (isRetryable && retryCount < maxRetries) {
      var retryBtn = document.createElement('button');
      retryBtn.className = 'listening-retry';
      retryBtn.textContent = 'Retry';
      retryBtn.addEventListener('click', function () {
        retryCount++;
        fetchTrack();
      });
      widget.appendChild(retryBtn);
    }
  }

  function showLoading() {
    widget.replaceChildren(textElement('p', 'listening-loading', 'Loading latest track...'));
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
      art.onerror = function () {
        this.style.display = 'none';
        var fallback = textElement('div', 'listening-art listening-art-empty', 'LP');
        this.parentNode.insertBefore(fallback, this);
      };
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

  function fetchTrack() {
    showLoading();

    fetch('https://lastfm-proxy.unkwngly28.workers.dev/api/lastfm', { cache: 'no-store', credentials: 'omit' })
      .then(function (response) {
        if (!response.ok) throw new Error('Listening data is unavailable.');
        return response.json();
      })
      .then(function (track) {
        if (!track.available || !track.name || !track.artist) {
          showMessage('listening-empty', 'No recent scrobbles to show right now.', false);
          return;
        }
        retryCount = 0; // Reset retry count on success
        renderTrack(track);
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(fetchTrack, track.nowPlaying ? 30000 : 120000);
      })
      .catch(function (error) {
        console.error('Last.fm fetch error:', error);
        showMessage('listening-empty', 'Listening data is unavailable right now.', true);
      });
  }

  fetchTrack();
})();