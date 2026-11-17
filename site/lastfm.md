---
layout: page.liquid
title: Last.fm
permalink: /lastfm/
---

My listening history from <a href="{{ lastfm.profileUrl }}">Last.fm</a>, refreshed every 6 hours.

<div class="anilist-controls">
  <div class="anilist-filters">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="artists">Artists</button>
    <button class="filter-btn" data-filter="albums">Albums</button>
    <button class="filter-btn" data-filter="tracks">Tracks</button>
    <button class="filter-btn" data-filter="recent">Recent</button>
  </div>
  <div class="anilist-stats" id="lastfm-stats">
    <span class="stat-item">Loading stats...</span>
  </div>
</div>

<div id="lastfm-media" aria-label="Last.fm listening data">
  {%- assign has_data = false -%}
  {%- if lastfm -%}
    {%- if lastfm.topArtists.size > 0 or lastfm.topAlbums.size > 0 or lastfm.topTracks.size > 0 or lastfm.recentTracks.size > 0 -%}
      {%- assign has_data = true -%}
    {%- endif -%}
  {%- endif -%}

  {%- if has_data %}
    {%- if lastfm.topArtists.size > 0 %}
      <h3 class="anilist-section-title">Top Artists</h3>
      <div class="anilist-list lastfm-list" data-type="artists">
        {%- for artist in lastfm.topArtists %}
          {%- capture meta %}{{ artist.plays | number_format }} plays{% endcapture %}
          {%- include "lastfm-item.liquid", item: artist, meta: meta -%}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if lastfm.topAlbums.size > 0 %}
      <h3 class="anilist-section-title">Top Albums</h3>
      <div class="anilist-list lastfm-list" data-type="albums">
        {%- for album in lastfm.topAlbums %}
          {%- capture meta %}by {{ album.artist }} · {{ album.plays | number_format }} plays{% endcapture %}
          {%- include "lastfm-item.liquid", item: album, meta: meta -%}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if lastfm.topTracks.size > 0 %}
      <h3 class="anilist-section-title">Top Tracks</h3>
      <div class="anilist-list lastfm-list" data-type="tracks">
        {%- for track in lastfm.topTracks %}
          {%- capture meta %}{{ track.artist }} · {{ track.plays | number_format }} plays{% endcapture %}
          {%- include "lastfm-item.liquid", item: track, meta: meta -%}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if lastfm.recentTracks.size > 0 %}
      <h3 class="anilist-section-title">Recently Played</h3>
      <div class="anilist-list lastfm-list" data-type="recent">
        {%- for track in lastfm.recentTracks %}
          {%- capture meta %}{{ track.artist }}{% if track.album %} — {{ track.album }}{% endif %}{% endcapture %}
          {%- capture submeta %}{{ track.date }}{% endcapture %}
          {%- include "lastfm-item.liquid", item: track, meta: meta, submeta: submeta -%}
        {%- endfor %}
      </div>
    {%- endif %}
  {%- else %}
    <p class="anilist-empty">Last.fm data is currently unavailable. It refreshes every 6 hours.</p>
  {%- endif %}
</div>

<script>
(function () {
  function calculateStats() {
    try {
      const lastfmData = {{ lastfm | jsonify | default: "null" }};
      const statsContainer = document.getElementById('lastfm-stats');
      if (!statsContainer) return;
      if (!lastfmData || !lastfmData.topArtists) {
        statsContainer.innerHTML = '<span class="stat-item">Stats unavailable</span>';
        return;
      }

      const parts = [];
      const playcount = lastfmData.stats && lastfmData.stats.playcount;
      if (playcount) {
        parts.push(`<span class="stat-item"><strong>${Number(playcount).toLocaleString()}</strong> scrobbles</span>`);
      }

      const counts = [
        [lastfmData.topArtists.length, 'artists'],
        [lastfmData.topAlbums.length, 'albums'],
        [lastfmData.topTracks.length, 'tracks'],
        [lastfmData.recentTracks.length, 'recent']
      ].filter(function (entry) { return entry[0] > 0; })
       .map(function (entry) { return `${entry[0]} ${entry[1]}`; })
       .join(' · ');
      if (counts) parts.push(`<span class="stat-item">${counts}</span>`);

      if (lastfmData.fetchedAt) {
        const fetched = new Date(lastfmData.fetchedAt);
        if (!isNaN(fetched)) {
          parts.push(`<span class="stat-item">updated ${fetched.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>`);
        }
      }

      statsContainer.innerHTML = parts.length ? parts.join('') : '<span class="stat-item">No data yet</span>';
    } catch (error) {
      console.error('Error calculating Last.fm stats:', error);
      const statsContainer = document.getElementById('lastfm-stats');
      if (statsContainer) {
        statsContainer.innerHTML = '<span class="stat-item">Stats unavailable</span>';
      }
    }
  }

  function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allLists = document.querySelectorAll('.lastfm-list');
    const allTitles = document.querySelectorAll('#lastfm-media .anilist-section-title');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        filterButtons.forEach(function (btn) { btn.classList.remove('active'); });
        this.classList.add('active');

        allLists.forEach(function (list) {
          const listType = list.getAttribute('data-type');
          list.style.display = (filter === 'all' || listType === filter) ? 'block' : 'none';
        });

        allTitles.forEach(function (title) {
          const nextElement = title.nextElementSibling;
          if (nextElement && nextElement.classList.contains('lastfm-list')) {
            const listType = nextElement.getAttribute('data-type');
            title.style.display = (filter === 'all' || listType === filter) ? 'block' : 'none';
          }
        });
      });
    });
  }

  calculateStats();
  setupFilters();
})();
</script>
