import { fetchCurrentTemperature } from "./fetchCurrentTemperature.js";
import { fetchUniversities } from "./fetchUniversities.js";
import { fetchGeoCoord } from "./fetchGeoCoord.js";
export interface AverageTemperatureResults {
  totalAverage: number;
  [key: string]: number;
}

function average(arr: number[]): number {
  return arr.reduce((acc, e) => acc + e, 0) / arr.length;
}

export function fetchUniversityWeather(
  universityQuery: string,
  transformName?: (s: string) => string
): Promise<AverageTemperatureResults> {
  // TODO

  async function helper() {
    const universities: string[] = await fetchUniversities(universityQuery);
    if (universities.length === 0) {
      return Promise.reject(new Error("No results found for query."));
    }
    //if undefined, return uni - else return transformName(uni)
    const universities2 = universities.map(uni => (transformName === undefined ? uni : transformName(uni)));
    //creates promise array (each resolves to geoCoord)
    const LocProm = universities2.map(uni => fetchGeoCoord(uni));
    //resolves
    const LocArray = await Promise.all(LocProm);
    //creates promise array (each resolves to curr temp)
    const tempProm = LocArray.map(loc => fetchCurrentTemperature(loc));
    //resolves
    const tempArray = await Promise.all(tempProm);
    //maps average temp of arrays
    const avgTemp = tempArray.map(temp => average(temp.temperature_2m));
    //finds total average of all temps
    const totalAverage = average(avgTemp);
    //creates obj to return
    const obj: AverageTemperatureResults = { totalAverage: totalAverage };
    //adds the name of each uni as key and value of temp to obj
    for (let i = 0; i < universities.length; i++) {
      obj[universities[i]] = avgTemp[i];
    }
    return obj;
  }

  return helper();
}

//helper for umass and ucal functions
function removeAt(univ: string): string {
  return univ.replace("at ", "");
}

export function fetchUMassWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of Massachusetts", removeAt);
}

export function fetchUCalWeather(): Promise<AverageTemperatureResults> {
  // TODO
  return fetchUniversityWeather("University of California", removeAt);
}
