---
layout: page
title: AniList
permalink: /anilist/
---

Anime and manga from my AniList profile, organized by status.

<div id="anilist-media" aria-label="AniList media collection">
  {%- assign anilist = site.data.anilist %}
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
      <div class="anilist-list">
        {%- for entry in completed.entries %}
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
    {%- endif %}

    {%- if watching %}
      <h3 class="anilist-section-title">Watching</h3>
      <div class="anilist-list">
        {%- for entry in watching.entries %}
          {%- if entry.status == 'CURRENT' %}
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
          {%- endif %}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if reading %}
      <h3 class="anilist-section-title">Reading</h3>
      <div class="anilist-list">
        {%- for entry in reading.entries %}
          {%- if entry.status == 'CURRENT' %}
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
          {%- endif %}
        {%- endfor %}
      </div>
    {%- endif %}

    {%- if paused %}
      <h3 class="anilist-section-title">Paused</h3>
      <div class="anilist-list">
        {%- for entry in paused.entries %}
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
    {%- endif %}

    {%- if dropped %}
      <h3 class="anilist-section-title">Dropped</h3>
      <div class="anilist-list">
        {%- for entry in dropped.entries %}
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
    {%- endif %}

    {%- if manga_paused %}
      <h3 class="anilist-section-title">Paused</h3>
      <div class="anilist-list">
        {%- for entry in manga_paused.entries %}
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
    {%- endif %}

    {%- if manga_dropped %}
      <h3 class="anilist-section-title">Dropped</h3>
      <div class="anilist-list">
        {%- for entry in manga_dropped.entries %}
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
    {%- endif %}
  {%- endif %}
</div>
