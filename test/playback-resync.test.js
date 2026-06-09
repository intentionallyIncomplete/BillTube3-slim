import assert from "node:assert/strict";
import { describe, it, before, beforeEach, afterEach, mock } from "node:test";

describe("playback resync", () => {
  let api;
  let originalWindow;
  let originalSocket;
  let capturedEmit;
  let capturedOnce;

  before(async () => {
    let factory;
    global.BTFW = { define: (_, __, f) => { factory = f; } };
    await import("../modules/feature-sync-guard.js");
    api = await factory({});
  });

  beforeEach(() => {
    originalWindow = global.window;
    originalSocket = global.socket;
    capturedEmit = null;
    capturedOnce = null;
    const socket = {
      once: (event, fn) => { capturedOnce = { event, fn }; },
      emit: (event) => { capturedEmit = event; },
      connected: true
    };
    global.socket = socket;
    global.window = { BTFW: {}, socket };
  });

  afterEach(() => {
    global.window = originalWindow;
    global.socket = originalSocket;
    mock.timers.reset();
  });

  it("test_no_mediaId_then_noop", async () => {
    global.window.PLAYER = { mediaType: null };
    const p = api.playbackResyncIfNeeded();
    assert.equal(capturedEmit, null);
    await p;
    assert.equal(global.window.BTFW._playbackResyncDone, undefined);
  });

  it("test_has_mediaId_emits_once", async () => {
    global.window.PLAYER = { mediaId: "abc" };
    const p = api.playbackResyncIfNeeded();
    assert.equal(capturedEmit, "playerReady");
    assert.equal(capturedOnce.event, "changeMedia");
    capturedOnce.fn();
    await p;
    assert.equal(global.window.BTFW._playbackResyncDone, true);
  });

  it("test_timeout_resolves_and_sets_flag", async () => {
    mock.timers.enable({ apis: ["setTimeout"] });
    global.window.PLAYER = { mediaId: "xyz" };
    const p = api.playbackResyncIfNeeded();
    assert.equal(capturedEmit, "playerReady");
    mock.timers.tick(2000);
    await p;
    assert.equal(global.window.BTFW._playbackResyncDone, true);
  });
});
