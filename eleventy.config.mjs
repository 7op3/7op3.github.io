import pluginRss from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Site data (replaces Jekyll's _config.yml globals)
  eleventyConfig.addGlobalData("site", {
    title: "Amelia",
    description:
      "Personal website of Amelia (7op3) — links, recommendations, and the occasional work in progress.",
    author: "Amelia",
    url: "https://seven.oops.wtf",
    socials: [
      { name: "YouTube", url: "https://youtube.com/@7op3" },
      { name: "Twitter / X", url: "https://twitter.com/shockhorrors" },
      { name: "Last.fm", url: "https://www.last.fm/user/ropeburns" },
      { name: "GitHub", url: "https://github.com/7op3" },
      { name: "AniList", url: "https://anilist.co/user/warps" },
    ],
  });

  // Build timestamp (replaces Jekyll's site.time)
  const now = new Date();
  eleventyConfig.addGlobalData("build", {
    time: now,
    year: now.getFullYear(),
  });

  // No posts yet — feed renders empty until the first post lands
  eleventyConfig.addCollection("posts", () => []);

  // Static assets (CSS, JS, favicons)
  eleventyConfig.addPassthroughCopy({ "site/assets": "assets" });

  // Jekyll filter shims for Liquid
  eleventyConfig.addFilter("relativeUrl", (path) => {
    if (!path) return path;
    return path.startsWith("/") ? path : `/${path}`;
  });

  // Jekyll's `where_exp` for simple equality lookups: arr | first_where: "name", "Watching"
  eleventyConfig.addFilter("first_where", (arr, key, value) => {
    if (!Array.isArray(arr)) return null;
    return arr.find((item) => item && item[key] === value) || null;
  });

  eleventyConfig.addFilter("jsonify", (obj) => JSON.stringify(obj));

  return {
    dir: {
      input: "site",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["liquid", "md"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
  };
}
