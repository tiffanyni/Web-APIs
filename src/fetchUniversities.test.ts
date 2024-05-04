import assert from "assert";
import { fetchUniversities } from "./fetchUniversities.js";

describe("fetchUniversities", () => {
  it("follows type specification", () => {
    const promise = fetchUniversities("University of Massachusetts");

    return promise.then(result => {
      assert(Array.isArray(result)); // Assert the result in an array
      assert(result.every(x => typeof x === "string")); // Assert each element in the array is a string
      console.log(result);
    });
  });

  it("fetchUniversities returns empty results", () => {
    return expect(fetchUniversities("place that does not exist")).resolves.toEqual([]);
  });
});
