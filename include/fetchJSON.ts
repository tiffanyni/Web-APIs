import fetch from "cross-fetch";
import fs from "fs";

interface CacheEntry {
  ttl: number;
  value: any;
}

const CACHE_PATH = "./include/cache.json";
const HOUR = 1000 * 60 * 60;

const cache: Record<string, CacheEntry> = fs.existsSync(CACHE_PATH)
  ? JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"))
  : {};

export function fetchJSON<T = any>(url: string): Promise<T> {
  if (url in cache && Date.now() < cache[url].ttl) {
    return Promise.resolve(cache[url].value);
  }

  return fetch(url)
    .then(res => (res.ok ? res.json() : Promise.reject(`Received status code ${res.status}: ${res.statusText}`)))
    .then(json => {
      cache[url] = {
        ttl: Date.now() + HOUR,
        value: json,
      };

      return json;
    });
}

process.on("beforeExit", () => {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
});
