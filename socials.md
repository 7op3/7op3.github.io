---
layout: page
title: Socials
permalink: /socials/
---

Find me around the web:

{% for social in site.socials %}
- [{{ social.name }}]({{ social.url }})
{% endfor %}