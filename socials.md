---
layout: page
title: Socials
permalink: /socials/
---

Find me around the web:

{% assign categories = site.socials | map: 'category' | uniq %}
{% for category in categories %}
<div class="social-category">
  <h3>{{ category }}</h3>
  <div class="social-links">
    {% for social in site.socials %}
      {% if social.category == category %}
        <a href="{{ social.url }}" class="social-link" rel="me">
          <span class="social-icon">{{ social.icon }}</span>
          <div class="social-info">
            <span class="social-name">{{ social.name }}</span>
            {% if social.description %}
            <span class="social-description">{{ social.description }}</span>
            {% endif %}
          </div>
        </a>
      {% endif %}
    {% endfor %}
  </div>
</div>
{% endfor %}