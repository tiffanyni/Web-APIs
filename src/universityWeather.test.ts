import assert from "assert";
import { fetchUniversityWeather, fetchUCalWeather, fetchUMassWeather } from "./universityWeather.js";

describe("fetchUniversityWeather", () => {
  it("error rejects", () => {
    return expect(fetchUniversityWeather("place that does not exist")).rejects.toEqual(
      new Error("No results found for query.")
    );
  });
  it("doesn't remove at", () => {
    return fetchUniversityWeather("University of Massachusetts")
      .then(obj => assert(obj.totalAverage))
      .catch(console.log);
  });
});

describe("fetchUCalWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUCalWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
      console.log(result);
    });
  });
});

describe("fetchUMassWeather", () => {
  it("follows type specification", () => {
    const promise = fetchUMassWeather();

    return promise.then(result => {
      assert(typeof result === "object");
      assert(Object.keys(result).every(x => typeof x === "string"));
      assert(Object.values(result).every(x => typeof x === "number"));
      console.log(result);
    });
  });
});
