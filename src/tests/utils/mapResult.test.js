import assert from "assert";
import { mapResult } from "../../utils/helper.js";

export async function run() {
  // basic mapping
  const input = ["true 1", "true 3", "false 0", "true 2"];
  const expected = {
    first: 1,
    second: 1,
    third: 1,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  };
  const actual = mapResult(input);
  assert.deepStrictEqual(actual, expected);

  // empty input
  const actual2 = mapResult([]);
  const expected2 = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
    sixth: 0,
  };
  assert.deepStrictEqual(actual2, expected2);
}
