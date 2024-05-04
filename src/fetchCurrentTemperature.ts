import { fetchJSON } from "../include/fetchJSON.js";
import { GeoCoord } from "./fetchGeoCoord.js";

interface TemperatureReading {
  time: string[];
  temperature_2m: number[];
}

export function fetchCurrentTemperature(coords: GeoCoord): Promise<TemperatureReading> {
  // TODO
  const searchURL = new URL("https://api.open-meteo.com/v1/forecast");
  searchURL.searchParams.append("latitude", coords.lat.toString());
  searchURL.searchParams.append("longitude", coords.lon.toString());
  searchURL.searchParams.append("hourly", "temperature_2m");
  searchURL.searchParams.append("temperature_unit", "fahrenheit");
  return fetchJSON<{ hourly: TemperatureReading }>(searchURL.toString()).then(json => ({
    time: json.hourly.time,
    temperature_2m: json.hourly.temperature_2m,
  }));
}
