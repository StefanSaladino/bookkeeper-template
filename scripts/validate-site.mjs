import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const basePath = "/bookkeeper-template/";
const pagesOrigin = "https://stefansaladino.github.io/bookkeeper-template";
const pages = [
  "index.html",
  "privacy/index.html",
  "resources/monthly-bookkeeping-checklist/index.html",
  "resources/five-numbers-to-review/index.html",
  "resources/catch-up-bookkeeping-guide/index.html",
  "404.html",
];
const failures = [];

function routeToFile(route) {
  const clean = route.split("#")[0].split("?")[0];
  if (!clean.startsWith(basePath)) return null;
  const relative = clean.slice(basePath.length);
  if (!relative) return "index.html";
  if (relative.endsWith("/")) return relative + "index.html";
  return relative;
}

for (const page of pages) {
  const html = readFileSync(join(root, page), "utf8");
  const h1Count = (html.match(/<h1[ >]/g) || []).length;
  if (h1Count !== 1) failures.push(`${page}: expected one h1, found ${h1Count}`);
  if (html.includes("https://www.northledger.ca")) failures.push(`${page}: old placeholder origin remains`);

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(match[1]); } catch { failures.push(`${page}: invalid JSON-LD`); }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(target)) continue;
    if (target.startsWith("/") && !target.startsWith(basePath)) {
      failures.push(`${page}: root-absolute path escapes repository: ${target}`);
      continue;
    }
    const localFile = routeToFile(target);
    if (localFile && !existsSync(join(root, localFile))) failures.push(`${page}: missing ${target}`);
  }
}

const home = readFileSync(join(root, "index.html"), "utf8");
const resourceLinks = [...home.matchAll(/class="article-card reveal" href="([^"]+)/g)].map((match) => match[1]);
if (resourceLinks.length !== 3 || resourceLinks.some((link) => !link.startsWith(basePath + "resources/"))) {
  failures.push("Homepage resource cards do not resolve to the three article pages");
}

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
if ((sitemap.match(/<url>/g) || []).length !== 5) failures.push("Sitemap must contain five URLs");
const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!robots.includes(pagesOrigin + "/sitemap.xml")) {
  failures.push("robots.txt does not reference the GitHub Pages sitemap");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${pages.length} HTML pages, five sitemap URLs, structured data, and repository-subpath links.`);
