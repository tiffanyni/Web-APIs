import assert from "assert";
import { fetchGeoCoord } from "./fetchGeoCoord.js";

describe("fetchGeoCoord", () => {
  it("follows type specification", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");
    return promise.then(result => {
      assert(typeof result === "object"); //  Assert the result is an object
      assert(typeof result.lon === "number"); // Assert that the lon value is a number
      assert(typeof result.lat === "number"); // Assert that the lat value is a number
      assert(Object.keys(result).length === 2); // Assert there are only two keys in the object
    });
  });

  it("returns a rejected promise from for invalid url", () => {
    return expect(fetchGeoCoord("ahrhjangdkanianguie")).rejects.toEqual(new Error("No results found for query."));
  });

  it("returns the correct lat and lon values", () => {
    const promise = fetchGeoCoord("University of Massachusetts Amherst");
    return promise.then(result => {
      assert(result.lat === 42.3869382);
      assert(result.lon === -72.52991477067445);
    });
  });
});
