---
layout: page
title: Recommendations
permalink: /recs/
---

Not a master list. This is a small, rotating shelf for things I think are worth
passing along right now. It can be a game, a show, a site, a tool, or anything
else that has caught my attention.

<div id="anilist-currently-watching" aria-label="Currently watching">
  {%- assign anilist = site.anilist %}
  {%- assign anime = anilist.data.anime %}
  {%- if anime.lists.size > 0 %}
    {%- assign current = false %}
    {%- for list in anime.lists %}
      {%- if list.name == 'Watching' %}
        {%- assign current = true %}
        <p class="anilist-current-label">Currently Watching</p>
        <div class="anilist-current-list">
          {%- for entry in list.entries %}
            {%- if entry.status == 'CURRENT' %}
              {%- assign m = entry.media %}
              {%- if m %}
              <div class="anilist-current-item">
                <span class="anilist-current-title"><a href="https://www.anilist.co/media/{{ m.id }}">{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}</a></span>
                <span class="anilist-current-status">{{ entry.progress }} / {{ m.episodes | default: '?' }}</span>
              </div>
              {%- endif %}
            {%- endif %}
          {%- endfor %}
        </div>
      {%- endif %}
    {%- endfor %}
    {%- if current == false %}
      <p class="anilist-empty">No currently watching titles.</p>
    {%- endif %}
  {%- else %}
    <p class="anilist-empty">No AniList data available yet.</p>
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