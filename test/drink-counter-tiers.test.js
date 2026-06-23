import test from "node:test";
import assert from "node:assert/strict";

function tierForCount(n) {
  if (n <= 0) return "sober";
  if (n < 5) return "warm";
  if (n < 10) return "flush";
  if (n < 25) return "droopy";
  if (n < 40) return "sick";
  return "hungover";
}

test("drink tier thresholds", () => {
  assert.equal(tierForCount(0), "sober");
  assert.equal(tierForCount(4), "warm");
  assert.equal(tierForCount(5), "flush");
  assert.equal(tierForCount(10), "droopy");
  assert.equal(tierForCount(25), "sick");
  assert.equal(tierForCount(40), "hungover");
});
