---
layout: home
title: Home
---

# Hi, I'm Amelia 👋

Welcome to my little corner of the internet.

## About me

I'm a developer and creative enthusiast who enjoys building things on the web. When I'm not coding, you can usually find me watching anime, reading manga, or discovering new music. This site is my personal space to share what I'm working on, what I'm enjoying, and where you can find me around the internet.

## What's here

- [Socials](/socials) — where to find me around the web
- [Recommendations](/recs) — sites, tools, and other things I think are worth your time
- [Projects](/projects) — things I've built
- [Contact](/contact) — how to get in touch
- [AniList](/anilist) — my anime and manga collection

## Latest activity

<div class="latest-activity">
  {%- assign anilist = site.data.anilist %}
  {%- if anilist and anilist.data %}
    <div class="activity-section">
      <h3>Currently Watching</h3>
      {%- assign anime = anilist.data.anime %}
      {%- if anime and anime.lists.size > 0 %}
        {%- assign watching = anime.lists | where_exp: "item", "item.name == 'Watching'" | first %}
        {%- if watching and watching.entries.size > 0 %}
          {%- for entry in watching.entries limit: 3 %}
            {%- if entry.status == 'CURRENT' %}
              {%- assign m = entry.media %}
              {%- if m %}
              <div class="activity-item">
                <span class="activity-title"><a href="https://www.anilist.co/media/{{ m.id }}">{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}</a></span>
                <span class="activity-progress">{{ entry.progress }} / {{ m.episodes | default: '?' }}</span>
              </div>
              {%- endif %}
            {%- endif %}
          {%- endfor %}
        {%- else %}
          <p class="activity-empty">Not currently watching anything</p>
        {%- endif %}
      {%- else %}
        <p class="activity-empty">No anime data available</p>
      {%- endif %}
    </div>

    <div class="activity-section">
      <h3>Currently Reading</h3>
      {%- assign manga = anilist.data.manga %}
      {%- if manga and manga.lists.size > 0 %}
        {%- assign reading = manga.lists | where_exp: "item", "item.name == 'Reading'" | first %}
        {%- if reading and reading.entries.size > 0 %}
          {%- for entry in reading.entries limit: 3 %}
            {%- if entry.status == 'CURRENT' %}
              {%- assign m = entry.media %}
              {%- if m %}
              <div class="activity-item">
                <span class="activity-title"><a href="https://www.anilist.co/media/{{ m.id }}">{{ m.title.romaji | default: m.title.english | default: 'Unknown' }}</a></span>
                <span class="activity-progress">{{ entry.progress }} / {{ m.chapters | default: '?' }}</span>
              </div>
              {%- endif %}
            {%- endif %}
          {%- endfor %}
        {%- else %}
          <p class="activity-empty">Not currently reading anything</p>
        {%- endif %}
      {%- else %}
        <p class="activity-empty">No manga data available</p>
      {%- endif %}
    </div>
  {%- else %}
    <p class="activity-empty">AniList data is currently unavailable. Please check back later.</p>
  {%- endif %}
</div>

It's still a work in progress, but a much tidier one than before. Thanks for
stopping by.