import test from "node:test";
import assert from "node:assert/strict";

function hasMotdContent(html = "") {
  return Boolean(String(html).trim());
}

test("motd content detection", () => {
  assert.equal(hasMotdContent(""), false);
  assert.equal(hasMotdContent("   "), false);
  assert.equal(hasMotdContent("<p>Welcome</p>"), true);
});
