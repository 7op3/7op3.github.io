---
layout: page
title: Recommendations
permalink: /recs/
---

Not a master list. This is a small, rotating shelf for things I think are worth
passing along right now. It can be a game, a show, a site, a tool, or anything
else that has caught my attention.

<div id="anilist-currently-watching" aria-label="Currently watching">
  <p class="anilist-empty">Loading current shows...</p>
</div>

<div class="recommendations" aria-label="Current recommendations">
  <div class="recommendations-empty">
    <p class="recommendations-label">Current shelf</p>
    <p>Between obsessions at the moment. Check back when something earns a spot.</p>
  </div>
</div>

<script>
(function () {
  var widget = document.getElementById('anilist-currently-watching');
  if (!widget) return;
  fetch('https://anilist-proxy.unkwngly28.workers.dev/api/anilist', { cache: 'no-store', credentials: 'omit' })
    .then(function (r) { return r.json(); })
    .then(function (data) {
      if (!data.data || !data.data.anime) { widget.innerHTML = ''; return; }
      var entries = data.data.anime.lists || [];
      var current = [];
      entries.forEach(function (l) { l.entries.forEach(function (e) { if (e.status === 'CURRENT') current.push(e); }); });
      if (!current.length) { widget.innerHTML = ''; return; }
      var html = '<p class="anilist-current-label">Currently Watching</p><div class="anilist-current-list">';
      current.forEach(function (e) {
        var m = e.media;
        if (!m || !m.title) return;
        var t = m.title.romaji || m.title.english || 'Unknown';
        html += '<div class="anilist-current-item"><span class="anilist-current-title"><a href="https://www.anilist.co/media/' + m.id + '">' + t + '</a></span><span class="anilist-current-status">' + e.progress + '/' + (m.episodes || '?') + '</span></div>';
      });
      html += '</div>';
      widget.innerHTML = html;
    })
    .catch(function () { widget.innerHTML = ''; });
})();
</script>

<!--
  Keep this page small. When adding an item, replace the empty state above with:

  <article class="recommendation">
    <p class="recommendation-type">Game</p>
    <h2><a href="https://example.com">Title</a></h2>
    <p>A short note about why it is worth your time.</p>
  </article>
-->
