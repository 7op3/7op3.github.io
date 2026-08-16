source "https://rubygems.org"

# Use the github-pages gem so local builds match GitHub Pages exactly.
gem "github-pages", group: :jekyll_plugins

# Directly require plugins used by the site.
group :jekyll_plugins do
  gem "jekyll-seo-tag"
end

# Ruby 3.4+ ships erb as a bundled gem; declare it so Jekyll 3.x can load it.
gem "erb"

# Windows and JRuby do not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows.
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]
