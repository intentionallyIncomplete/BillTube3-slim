import { test } from "node:test";
import assert from "node:assert/strict";

function isTrustedWorkersDev(urlStr) {
  try {
    const host = new URL(urlStr).hostname.toLowerCase();
    return host.endsWith(".workers.dev");
  } catch {
    return false;
  }
}

test("trusts workers.dev subdomains", () => {
  assert.equal(isTrustedWorkersDev("https://cytube.billtube.workers.dev/video.mp4"), true);
  assert.equal(isTrustedWorkersDev("https://empty-bar-d620.movies-storage-a.workers.dev/x"), true);
});

test("rejects non-workers hosts", () => {
  assert.equal(isTrustedWorkersDev("https://example.com/video.mp4"), false);
  assert.equal(isTrustedWorkersDev("not-a-url"), false);
});
