(function () {
  var container = document.getElementById('anilist-media');
  if (!container) return;
  container.innerHTML = '<p class="anilist-empty">Loading AniList data...</p>';

  function textElement(tag, className, text) {
    var element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  }

  function renderMediaList(type, data) {
    if (!data || !data.data || !data.data[type]) return '';
    var collection = data.data[type];
    if (!collection || !collection.lists) return '';

    var html = '<h3 class="anilist-section-title">' + type.charAt(0).toUpperCase() + type.slice(1) + '</h3>';
    html += '<div class="anilist-list">';

    collection.lists.forEach(function (list) {
      html += '<div class="anilist-list-group">';
      html += '<h4 class="anilist-list-name">' + list.name + '</h4>';
      html += '<div class="anilist-items">';

      list.entries.forEach(function (entry) {
        var media = entry.media;
        if (!media || !media.title) return;
        var title = media.title.romaji || media.title.english || 'Unknown';
        var imageUrl = media.coverImage ? media.coverImage.large : '';
        var statusText = entry.status.charAt(0).toUpperCase() + entry.status.slice(1);
        var score = entry.score ? 'Score: ' + entry.score : '';
        var progress = entry.progress ? 'Progress: ' + entry.progress : '';

        html += '<article class="anilist-item">';
        if (imageUrl) {
          html += '<img class="anilist-item-art" src="' + imageUrl + '" alt="' + title + '" width="48" height="48" loading="lazy">';
        } else {
          html += '<div class="anilist-item-art anilist-item-art-empty">LP</div>';
        }
        html += '<div class="anilist-item-details">';
        html += '<p class="anilist-item-title"><a href="https://www.anilist.co/media/' + media.id + '">' + title + '</a></p>';
        html += '<p class="anilist-item-meta">' + statusText + (score ? ' | ' + score : '') + (progress ? ' | ' + progress : '') + '</p>';
        if (media.description) {
          var desc = media.description.replace(/<[^>]*>/g, '').substring(0, 150);
          html += '<p class="anilist-item-desc">' + desc + '</p>';
        }
        html += '</div></article>';
      });

      html += '</div></div>';
    });

    html += '</div>';
    return html;
  }

  function fetchAnilist() {
    fetch('https://anilist-proxy.unkwngly28.workers.dev/api/anilist', { cache: 'no-store', credentials: 'omit' })
      .then(function (response) {
        if (!response.ok) throw new Error('AniList data unavailable.');
        return response.json();
      })
      .then(function (data) {
        if (data.error || !data.data) {
          container.innerHTML = '<p class="anilist-empty">AniList data is unavailable right now.</p>';
          return;
        }
        var html = renderMediaList('anime', data);
        html += renderMediaList('manga', data);
        container.innerHTML = html || '<p class="anilist-empty">No media found.</p>';
      })
      .catch(function () {
        container.innerHTML = '<p class="anilist-empty">AniList data is unavailable right now.</p>';
      });
  }

  fetchAnilist();
  setInterval(fetchAnilist, 120000);
})();