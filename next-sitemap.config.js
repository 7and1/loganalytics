/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://loganalytics.org";
const formatsRaw = fs.readFileSync("./data/formats.ts", "utf8");
const formatSlugs = Array.from(formatsRaw.matchAll(/slug:\s*"([^"]+)"/g)).map((match) => match[1]);

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    const priority = path === "/" ? 1.0 : 0.7;
    return {
      loc: path,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async () =>
    formatSlugs.map((slug) => ({
      loc: `${siteUrl}/format/${slug}`,
      changefreq: "monthly",
      priority: 0.6,
    })),
};
