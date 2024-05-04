// TODO - Now its your turn to make the working example! :)
/*
This program takes in the user's preferred weather (lowest temp to highest temp) and their preferred college 
systems (University of California's, University of Massachusetts', etc) and returns a list of potential
matches of specific universities within those systems. It would be a tool for people trying to narrow down 
the schools they are applying to by considering their preferences. 

Note: If the university does not exist or the API throws an error, the API does not return anything from that 
university - We recommend using University of California :)
*/
import { fetchUniversityWeather, AverageTemperatureResults } from "./universityWeather.js";

interface univTemp {
  uni: string;
  avgTemp: number;
}
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
async function main() {
  const lowTemp = parseFloat(await rl.question("What is the lowest temperature you are willing to live in? \n"));
  const highTemp = parseFloat(await rl.question("What is the highest temperature you are willing to live in? \n"));
  const size = parseFloat(await rl.question("What number of university systems do you wish to enter? \n"));
  const universities = [];
  for (let i = 0; i < size; i++) {
    const uni = await rl.question("Enter a valid university system: \n");
    universities.push(uni);
  }
  const universities_temp_obj = await Promise.allSettled(universities.map(uni => fetchUniversityWeather(uni)));
  const universities_temp: AverageTemperatureResults[] = [];
  universities_temp_obj.reduce((acc, e) => {
    if (e.status === "fulfilled") {
      acc.push(e.value);
    }
    return acc;
  }, universities_temp);
  if (universities_temp.length === 0) {
    console.log("Enter valid Universities : \n");
    return;
  }
  const goodUniversities: univTemp[] = []; //will contain unis in user's preferred climate range
  universities_temp.reduce((acc, avgTempResult) => {
    const univs: string[] = Object.keys(avgTempResult).filter(prop => prop !== "totalAverage");
    univs.forEach(uni => {
      if (avgTempResult[uni] <= highTemp && avgTempResult[uni] >= lowTemp) {
        acc.push({ uni: uni, avgTemp: avgTempResult[uni] });
      }
    });
    return acc;
  }, goodUniversities);
  if (goodUniversities.length === 0) {
    console.log("Oops! No universities match your picks - broaden your preference range!");
    return;
  }
  console.log("Here is the list of universities that match your preferences: \n");
  console.log(goodUniversities);
  rl.close();
}
main();
