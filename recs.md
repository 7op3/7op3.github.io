---
layout: page
title: Recommendations
permalink: /recs/
---

Not a master list. This is a small, rotating shelf for things I think are worth
passing along right now. It can be a game, a show, a site, a tool, or anything
else that has caught my attention.

<div id="anilist-currently-watching" aria-label="Currently watching">
  {%- assign anilist = site.data.anilist %}
  {%- if anilist and anilist.data %}
    {%- assign anime = anilist.data.anime %}
    {%- if anime and anime.lists.size > 0 %}
    {%- assign current = false %}
    {%- for list in anime.lists %}
      {%- if list.name == 'Watching' %}
        {%- assign current = true %}
        <p class="anilist-current-label">Currently Watching</p>
        <div class="anilist-current-list">
          {%- for entry in list.entries %}
            {%- if entry.status == 'CURRENT' %}
              {%- include anilist-current-item.html media=entry.media entry=entry progress_type="episodes" -%}
            {%- endif %}
          {%- endfor %}
        </div>
      {%- endif %}
    {%- endfor %}
    {%- if current == false %}
      <p class="anilist-empty">No currently watching titles.</p>
    {%- endif %}
  {%- else %}
    <p class="anilist-empty">No anime data available.</p>
  {%- endif %}
  {%- else %}
    <p class="anilist-empty">AniList data is currently unavailable.</p>
  {%- endif %}
</div>

<div id="anilist-currently-reading" aria-label="Currently reading">
  {%- if anilist and anilist.data %}
    {%- assign manga = anilist.data.manga %}
    {%- if manga and manga.lists.size > 0 %}
    {%- assign reading = false %}
    {%- for list in manga.lists %}
      {%- if list.name == 'Reading' %}
        {%- assign reading = true %}
        <p class="anilist-current-label">Currently Reading</p>
        <div class="anilist-current-list">
          {%- for entry in list.entries %}
            {%- if entry.status == 'CURRENT' %}
              {%- include anilist-current-item.html media=entry.media entry=entry progress_type="chapters" -%}
            {%- endif %}
          {%- endfor %}
        </div>
      {%- endif %}
    {%- endfor %}
    {%- if reading == false %}
      <p class="anilist-empty">No currently reading manga.</p>
    {%- endif %}
  {%- else %}
    <p class="anilist-empty">No manga data available.</p>
  {%- endif %}
  {%- else %}
    <p class="anilist-empty">AniList data is currently unavailable.</p>
  {%- endif %}
</div>

<div class="recommendations" aria-label="Current recommendations">
  <div class="recommendations-empty">
    <p class="recommendations-label">Current shelf</p>
    <p>Between obsessions at the moment. Check back when something earns a spot.</p>
  </div>
</div>

<!--
  Keep this page small. When adding an item, replace the empty state above with:

  <article class="recommendation">
    <p class="recommendation-type">Game</p>
    <h2><a href="https://example.com">Title</a></h2>
    <p>A short note about why it is worth your time.</p>
  </article>
-->