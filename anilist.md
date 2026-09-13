---
layout: page
title: AniList
permalink: /anilist/
---

Anime and manga from my AniList profile, organized by status.

<div class="anilist-controls">
  <div class="anilist-filters">
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="anime">Anime</button>
    <button class="filter-btn" data-filter="manga">Manga</button>
  </div>
  <div class="anilist-stats" id="anilist-stats">
    <span class="stat-item">Loading stats...</span>
  </div>
</div>

<div id="anilist-media" aria-label="AniList media collection">
  {%- assign anilist = site.data.anilist %}
  {%- if anilist and anilist.data %}
    {%- assign anime = anilist.data.anime %}
    {%- assign manga = anilist.data.manga %}

    {%- if anime.lists.size == 0 and manga.lists.size == 0 %}
      <p class="anilist-empty">No AniList data available yet. It will update every 6 hours.</p>
    {%- else %}
    {%- assign completed = anime.lists | where_exp: "item", "item.name == 'Completed'" | first %}
    {%- assign watching = anime.lists | where_exp: "item", "item.name == 'Watching'" | first %}
    {%- assign paused = anime.lists | where_exp: "item", "item.name == 'Paused'" | first %}
    {%- assign dropped = anime.lists | where_exp: "item", "item.name == 'Dropped'" | first %}
    {%- assign reading = manga.lists | where_exp: "item", "item.name == 'Reading'" | first %}
    {%- assign manga_paused = manga.lists | where_exp: "item", "item.name == 'Paused'" | first %}
    {%- assign manga_dropped = manga.lists | where_exp: "item", "item.name == 'Dropped'" | first %}

    {%- if completed and completed.entries.size > 0 %}
      <h3 class="anilist-section-title">Completed</h3>
      <div class="anilist-list" data-type="anime" data-status="completed">
        {%- for entry in completed.entries %}
          {%- include anilist-item.html media=entry.media entry=entry -%}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if watching %}
      <h3 class="anilist-section-title">Watching</h3>
      <div class="anilist-list" data-type="anime" data-status="watching">
        {%- for entry in watching.entries %}
          {%- if entry.status == 'CURRENT' %}
            {%- include anilist-item.html media=entry.media entry=entry -%}
          {%- endif %}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if reading %}
      <h3 class="anilist-section-title">Reading</h3>
      <div class="anilist-list" data-type="manga" data-status="reading">
        {%- for entry in reading.entries %}
          {%- if entry.status == 'CURRENT' %}
            {%- include anilist-item.html media=entry.media entry=entry -%}
          {%- endif %}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if paused or manga_paused %}
      <h3 class="anilist-section-title">Paused</h3>
      <div class="anilist-list" data-type="mixed" data-status="paused">
        {%- if paused %}
          {%- for entry in paused.entries %}
            {%- include anilist-item.html media=entry.media entry=entry -%}
          {%- endfor %}
        {%- endif %}
        {%- if manga_paused %}
          {%- for entry in manga_paused.entries %}
            {%- include anilist-item.html media=entry.media entry=entry -%}
          {%- endfor %}
        {%- endif %}
      </div>
    {%- endif %}

    {%- if dropped or manga_dropped %}
      <h3 class="anilist-section-title">Dropped</h3>
      <div class="anilist-list" data-type="mixed" data-status="dropped">
        {%- if dropped %}
          {%- for entry in dropped.entries %}
            {%- include anilist-item.html media=entry.media entry=entry -%}
          {%- endfor %}
        {%- endif %}
        {%- if manga_dropped %}
          {%- for entry in manga_dropped.entries %}
            {%- include anilist-item.html media=entry.media entry=entry -%}
          {%- endfor %}
        {%- endif %}
      </div>
    {%- endif %}
  {%- else %}
    <p class="anilist-empty">AniList data is currently unavailable. Please check back later.</p>
  {%- endif %}
</div>

<script>
(function () {
  // Statistics calculation
  function calculateStats() {
    try {
      const anilistData = {{ site.data.anilist | jsonify }};
      if (!anilistData || !anilistData.data) {
        const statsContainer = document.getElementById('anilist-stats');
        if (statsContainer) {
          statsContainer.innerHTML = '<span class="stat-item">Stats unavailable</span>';
        }
        return;
      }

      const anime = anilistData.data.anime || {};
      const manga = anilistData.data.manga || {};

      let animeCount = 0;
      let mangaCount = 0;
      let completedAnime = 0;
      let completedManga = 0;

      if (anime.lists) {
        anime.lists.forEach(list => {
          if (list.entries) {
            list.entries.forEach(entry => {
              animeCount++;
              if (entry.status === 'COMPLETED') completedAnime++;
            });
          }
        });
      }

      if (manga.lists) {
        manga.lists.forEach(list => {
          if (list.entries) {
            list.entries.forEach(entry => {
              mangaCount++;
              if (entry.status === 'COMPLETED') completedManga++;
            });
          }
        });
      }

      const statsHtml = `
        <span class="stat-item"><strong>${animeCount}</strong> Anime</span>
        <span class="stat-item"><strong>${completedAnime}</strong> Completed</span>
        <span class="stat-item"><strong>${mangaCount}</strong> Manga</span>
        <span class="stat-item"><strong>${completedManga}</strong> Completed</span>
      `;

      const statsContainer = document.getElementById('anilist-stats');
      if (statsContainer) {
        statsContainer.innerHTML = statsHtml;
      }
    } catch (error) {
      console.error('Error calculating AniList stats:', error);
      const statsContainer = document.getElementById('anilist-stats');
      if (statsContainer) {
        statsContainer.innerHTML = '<span class="stat-item">Stats unavailable</span>';
      }
    }
  }

  // Filtering functionality
  function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allLists = document.querySelectorAll('.anilist-list');
    const allTitles = document.querySelectorAll('.anilist-section-title');

    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter lists
        allLists.forEach(list => {
          const listType = list.getAttribute('data-type');
          if (filter === 'all' || listType === filter || listType === 'mixed') {
            list.style.display = 'block';
          } else {
            list.style.display = 'none';
          }
        });

        // Filter titles
        allTitles.forEach(title => {
          const nextElement = title.nextElementSibling;
          if (nextElement && nextElement.classList.contains('anilist-list')) {
            const listType = nextElement.getAttribute('data-type');
            if (filter === 'all' || listType === filter || listType === 'mixed') {
              title.style.display = 'block';
            } else {
              title.style.display = 'none';
            }
          }
        });
      });
    });
  }

  // Initialize
  calculateStats();
  setupFilters();
})();
</script>
