import { fetchJSON } from "../include/fetchJSON.js";
import { URL } from "url";

interface University {
  name: string;
}

export function fetchUniversities(query: string): Promise<string[]> {
  // TODO
  const newURL = new URL("http://universities.hipolabs.com/search");
  newURL.searchParams.append("name", query); //appends the query passed in to the url

  return fetchJSON<University[]>(newURL.toString()).then(data => {
    return data.map((university: University) => university.name);
  });
}
