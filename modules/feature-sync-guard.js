BTFW.define('feature:syncGuard', [], async () => {
  function hasActiveMedia() {
    const p = window.PLAYER;
    return !!(p && (p.mediaId || p.mediaType));
  }

  function playbackResyncIfNeeded() {
    if (!hasActiveMedia() || !window.socket) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        window.BTFW._playbackResyncDone = true;
        resolve();
      };
      const timer = setTimeout(finish, 2000);
      try {
        socket.once('changeMedia', () => {
          clearTimeout(timer);
          finish();
        });
        socket.emit('playerReady');
      } catch (_) {
        clearTimeout(timer);
        finish();
      }
    });
  }

  return {
    name: 'feature:syncGuard',
    playbackResyncIfNeeded,
    hasActiveMedia
  };
});
