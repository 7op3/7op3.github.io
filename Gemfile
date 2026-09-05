source "https://rubygems.org"

# Jekyll core
gem "jekyll", "~> 3.10"

# Directly require plugins used by the site.
group :jekyll_plugins do
  gem "jekyll-seo-tag"
  gem "jekyll-feed"
end

# Syntax highlighting
gem "rouge", "~> 3.0"

# Ruby 3.4+ ships erb as a bundled gem; declare it so Jekyll 3.x can load it.
gem "erb"
gem "base64"
gem "bigdecimal"
gem "webrick"

# Markdown parser
gem "kramdown"
gem "kramdown-parser-gfm"

# Windows and JRuby do not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
