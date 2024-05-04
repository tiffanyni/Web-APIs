import { fetchJSON } from "../include/fetchJSON.js";
import { URL } from "url";

export interface GeoCoord {
  lat: number;
  lon: number;
}

interface GeoObj {
  lat: string;
  lon: string;
}

export function fetchGeoCoord(query: string): Promise<GeoCoord> {
  const newURL = new URL("https://geocode.maps.co/search");
  newURL.searchParams.append("q", query);
  const myURL = newURL.toString();
  return fetchJSON<GeoCoord>(myURL)
    .then(json =>
      Array.isArray(json) && json.length > 0
        ? Promise.resolve(json[0])
        : Promise.reject(new Error("No results found for query."))
    )
    .then(firstObj => firstObj as GeoObj)
    .then(firstObj => Promise.resolve({ lat: Number.parseFloat(firstObj.lat), lon: Number.parseFloat(firstObj.lon) }));
}
