---
layout: page
title: AniList
permalink: /anilist/
---

Anime and manga from my AniList profile, organized by status.

<div id="anilist-media" aria-label="AniList media collection">
  {%- assign anilist = site.anilist %}
  {%- assign anime = anilist.data.anime %}
  {%- assign manga = anilist.data.manga %}

  {%- if anime.lists.size == 0 and manga.lists.size == 0 %}
    <p class="anilist-empty">No AniList data available yet. It will update every 6 hours.</p>
  {%- else %}
    {%- for list in anime.lists %}
      <h3 class="anilist-section-title">{{ list.name }}</h3>
      <div class="anilist-list">
        {%- for entry in list.entries %}
          {%- assign m = entry.media %}
          {%- if m %}
          <article class="anilist-item">
            {%- if m.coverImage and m.coverImage.large %}
              <img class="anilist-item-art" src="{{ m.coverImage.large }}" alt="{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}" width="48" height="48" loading="lazy">
            {%- else %}
              <div class="anilist-item-art anilist-item-art-empty">LP</div>
            {%- endif %}
            <div class="anilist-item-details">
              <p class="anilist-item-title"><a href="https://www.anilist.co/media/{{ m.id }}">{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}</a></p>
              <p class="anilist-item-meta">{{ entry.status | capitalize }}{% if entry.score %} | Score: {{ entry.score }}{% endif %}{% if entry.progress %} | {{ entry.progress }}{% endif %}</p>
              {%- if m.description %}
                <p class="anilist-item-desc">{{ m.description | strip_html | truncate: 150 }}</p>
              {%- endif %}
            </div>
          </article>
          {%- endif %}
        {%- endfor %}
      </div>
    {%- endfor %}

    {%- for list in manga.lists %}
      <h3 class="anilist-section-title">{{ list.name }}</h3>
      <div class="anilist-list">
        {%- for entry in list.entries %}
          {%- assign m = entry.media %}
          {%- if m %}
          <article class="anilist-item">
            {%- if m.coverImage and m.coverImage.large %}
              <img class="anilist-item-art" src="{{ m.coverImage.large }}" alt="{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}" width="48" height="48" loading="lazy">
            {%- else %}
              <div class="anilist-item-art anilist-item-art-empty">LP</div>
            {%- endif %}
            <div class="anilist-item-details">
              <p class="anilist-item-title"><a href="https://www.anilist.co/media/{{ m.id }}">{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}</a></p>
              <p class="anilist-item-meta">{{ entry.status | capitalize }}{% if entry.score %} | Score: {{ entry.score }}{% endif %}{% if entry.progress %} | {{ entry.progress }}{% endif %}</p>
              {%- if m.description %}
                <p class="anilist-item-desc">{{ m.description | strip_html | truncate: 150 }}</p>
              {%- endif %}
            </div>
          </article>
          {%- endif %}
        {%- endfor %}
      </div>
    {%- endfor %}
  {%- endif %}
</div>
