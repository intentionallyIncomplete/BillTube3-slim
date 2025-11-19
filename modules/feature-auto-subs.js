// BTFW â€” ext:autosubs
// Auto-fetch subtitles from Wyzie API for current media
// External module for Channel Theme Toolkit
BTFW.define("ext:autosubs", [], async () => {
  const $ = (s, r = document) => r.querySelector(s);
  
  const WYZIE_API = 'https://sub.wyzie.ru/search';
  const TMDB_API = 'https://api.themoviedb.org/3';
  
  let currentTitle = '';
  let tmdbApiKey = null;
  let subsCache = new Map();
  let lastAddedTracks = [];
  let currentSubtitles = null;
  let player = null;
  let socket = null;
  let isFetching = false;
  let trackWatcher = null;

  function getTMDBKey() {
    try {
      const cfg = (window.BTFW_CONFIG && typeof window.BTFW_CONFIG === "object") ? window.BTFW_CONFIG : {};
      const tmdbObj = (cfg.tmdb && typeof cfg.tmdb === "object") ? cfg.tmdb : {};
      const integrations = (cfg.integrations && typeof cfg.integrations === "object") ? cfg.integrations : {};
      const intTmdb = (integrations.tmdb && typeof integrations.tmdb === "object") ? integrations.tmdb : {};
      
      const cfgKey = typeof tmdbObj.apiKey === "string" ? tmdbObj.apiKey.trim() : "";
      const intKey = typeof intTmdb.apiKey === "string" ? intTmdb.apiKey.trim() : "";
      const legacyCfg = typeof cfg.tmdbKey === "string" ? cfg.tmdbKey.trim() : "";
      
      let lsKey = "";
      try { lsKey = (localStorage.getItem("btfw:tmdb:key") || "").trim(); }
      catch(_) {}
      
      const g = v => (v == null ? "" : String(v)).trim();
      const globalKey = g(window.TMDB_API_KEY) || g(window.BTFW_TMDB_KEY) || g(window.tmdb_key) || g(window.moviedbkey);
      const bodyKey = (document.body?.dataset?.tmdbKey || "").trim();
      
      return intKey || cfgKey || legacyCfg || lsKey || globalKey || bodyKey || null;
    } catch(e) {
      return null;
    }
  }

  function shouldLoadSubtitles() {
    const mediaType = window.PLAYER?.mediaType;
    return mediaType === 'fi' || mediaType === 'gd';
  }

  function getPlayer() {
    if (player && typeof player.addRemoteTextTrack === 'function') return player;
    
    const vw = $('#videowrap');
    if (!vw) return null;
    
    const vid = vw.querySelector('video');
    if (!vid) return null;
    
    if (typeof videojs === 'function') {
      try {
        player = videojs(vid);
        return player;
      } catch(e) {}
    }
    return null;
  }

  function getSocket() {
    if (socket) return socket;
    if (window.socket && typeof window.socket.on === 'function') {
      socket = window.socket;
      return socket;
    }
    return null;
  }

  function getCurrentTitle() {
    const titleEl = $('#currenttitle');
    return titleEl ? titleEl.textContent.trim() : '';
  }

  function normalizeTitle(title) {
    return title.toLowerCase()
                .replace(/[^\w\s]/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
  }

  function cleanMovieTitle(title) {
    const unwantedWords = ['Extended', 'Director\'s Cut', 'Directors Cut', 'Unrated', 'Theatrical Cut', 'Remastered'];
    let cleanTitle = title;

    unwantedWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      cleanTitle = cleanTitle.replace(regex, '');
    });

    return cleanTitle.replace(/\s{2,}/g, ' ').trim();
  }

  function extractYearAndTitle(title) {
    const yearParenMatch = title.match(/^(.+?)\s*\((\d{4})\)\s*$/);
    if (yearParenMatch) {
      return {
        title: yearParenMatch[1].trim(),
        year: parseInt(yearParenMatch[2]),
        originalTitle: title
      };
    }
    
    const yearPlainMatch = title.match(/^(.+?)\s+(\d{4})\s*$/);
    if (yearPlainMatch) {
      return {
        title: yearPlainMatch[1].trim(),
        year: parseInt(yearPlainMatch[2]),
        originalTitle: title
      };
    }
    
    return {
      title: title.trim(),
      year: null,
      originalTitle: title
    };
  }

  function isExactTitleMatch(searchTitle, resultTitle, targetYear = null, resultYear = null) {
    const normalizedSearch = normalizeTitle(searchTitle);
    const normalizedResult = normalizeTitle(resultTitle);
    
    const titleMatch = normalizedSearch === normalizedResult || 
                      normalizedResult === normalizedSearch ||
                      normalizedResult.replace(/^(the|a|an)\s+/, '') === normalizedSearch.replace(/^(the|a|an)\s+/, '');
    
    if (!titleMatch) return false;
    
    if (targetYear && resultYear) {
      return Math.abs(targetYear - resultYear) <= 1;
    }
    
    return true;
  }

  function clearExistingTracks() {
    const p = getPlayer();
    if (!p) return;
    
    lastAddedTracks.forEach(trackEl => {
      try {
        if (trackEl && trackEl.track) {
          const src = trackEl.track.src;
          if (src && src.startsWith('blob:')) {
            URL.revokeObjectURL(src);
          }
          p.removeRemoteTextTrack(trackEl.track);
        }
      } catch(e) {}
    });
    lastAddedTracks = [];
    
    try {
      const tracks = p.remoteTextTracks();
      const toRemove = [];
      
      for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];
        if (track.src && track.src.startsWith('blob:')) {
          toRemove.push(track);
        }
      }
      
      toRemove.forEach(track => {
        try {
          URL.revokeObjectURL(track.src);
          p.removeRemoteTextTrack(track);
        } catch(e) {}
      });
    } catch(e) {}
  }

  async function searchTMDB(title, year) {
    if (!tmdbApiKey) return null;
    
    let apiUrl = `${TMDB_API}/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(title)}`;
    
    if (year) {
      apiUrl += `&primary_release_year=${year}`;
    }

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        for (const movie of data.results) {
          const movieYear = movie.release_date ? parseInt(movie.release_date.substring(0, 4)) : null;
          
          if (isExactTitleMatch(title, movie.title, year, movieYear)) {
            const extIdsResp = await fetch(`${TMDB_API}/movie/${movie.id}/external_ids?api_key=${tmdbApiKey}`);
            const extIds = await extIdsResp.json();
            return extIds.imdb_id || null;
          }
        }
        
        if (year) {
          for (const movie of data.results) {
            const movieYear = movie.release_date ? parseInt(movie.release_date.substring(0, 4)) : null;
            if (movieYear === year) {
              const extIdsResp = await fetch(`${TMDB_API}/movie/${movie.id}/external_ids?api_key=${tmdbApiKey}`);
              const extIds = await extIdsResp.json();
              return extIds.imdb_id || null;
            }
          }
        }
      }
    } catch (error) {}
    
    if (year) {
      const apiUrlNoYear = `${TMDB_API}/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(title)}`;
      
      try {
        const response = await fetch(apiUrlNoYear);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const movie = data.results[0];
          const extIdsResp = await fetch(`${TMDB_API}/movie/${movie.id}/external_ids?api_key=${tmdbApiKey}`);
          const extIds = await extIdsResp.json();
          return extIds.imdb_id || null;
        }
      } catch (error) {}
    }
    
    return null;
  }

  async function fetchSubtitles(imdbId, season, episode) {
    const sources = ['opensubtitles', 'subdl', 'all'];
    
    for (const source of sources) {
      const params = new URLSearchParams({ id: imdbId });

      if (season !== null && episode !== null) {
        params.append('season', season);
        params.append('episode', episode);
      }

      params.append('language', 'en');
      params.append('format', 'srt');
      params.append('source', source);

      const url = `${WYZIE_API}?${params}`;

      try {
        const resp = await fetch(url);
        if (!resp.ok) continue;

        const data = await resp.json();

        if (Array.isArray(data) && data.length > 0) {
          const converted = await Promise.all(
            data.slice(0, 10).map(sub => convertSrtToVtt(sub))
          );
          const filtered = converted.filter(Boolean);
          
          if (filtered.length > 0) {
            return filtered;
          }
        }
      } catch(e) {
        continue;
      }
    }

    return null;
  }

  async function convertSrtToVtt(subtitle) {
    if (!subtitle.url) return null;
    
    try {
      const srtResp = await fetch(subtitle.url);
      if (!srtResp.ok) return null;
      
      const srtText = await srtResp.text();
      const vttText = srtToVtt(srtText);
      
      const blob = new Blob([vttText], { type: 'text/vtt' });
      const vttUrl = URL.createObjectURL(blob);
      
      return {
        url: vttUrl,
        lang: 'en'
      };
    } catch(e) {
      return null;
    }
  }

  function srtToVtt(srt) {
    let vtt = 'WEBVTT\n\n';
    
    vtt += srt
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/(\d{2}):(\d{2}):(\d{2}),(\d{3})/g, '$1:$2:$3.$4')
      .replace(/^\d+\n/gm, '')
      .trim();
    
    return vtt;
  }

  function addSubtitlesToPlayer(subtitles) {
    const p = getPlayer();
    if (!p || !Array.isArray(subtitles) || subtitles.length === 0) return false;
    
    if (typeof p.addRemoteTextTrack !== 'function') return false;
    
    const existingTracks = p.remoteTextTracks();
    const hasBlobTracks = existingTracks && Array.from(existingTracks).some(t => t.src && t.src.startsWith('blob:'));
    
    if (hasBlobTracks) return false;
    
    clearExistingTracks();
    
    const added = [];
    subtitles.forEach((sub, idx) => {
      if (!sub.url) return;
      
      const label = `Sub ${idx + 1}`;
      
      try {
        const trackEl = p.addRemoteTextTrack({
          kind: 'subtitles',
          src: sub.url,
          srclang: 'en',
          label: label
        }, false);
        
        if (trackEl) added.push(trackEl);
      } catch(e) {}
    });
    
    lastAddedTracks = added;
    currentSubtitles = subtitles;
    
    return added.length > 0;
  }

  function startTrackWatcher() {
    if (trackWatcher) return;
    
    trackWatcher = setInterval(() => {
      // Check if we should still be watching based on media type
      if (!shouldLoadSubtitles()) {
        stopTrackWatcher();
        clearExistingTracks();
        return;
      }

      const p = getPlayer();
      if (!p || !currentSubtitles || currentSubtitles.length === 0) return;
      
      const existingTracks = p.remoteTextTracks();
      const hasBlobTracks = existingTracks && Array.from(existingTracks).some(t => t.src && t.src.startsWith('blob:'));
      
      if (!hasBlobTracks && lastAddedTracks.length > 0) {
        lastAddedTracks = [];
        setTimeout(() => {
          addSubtitlesToPlayer(currentSubtitles);
        }, 100);
      }
    }, 1000);
  }

  function stopTrackWatcher() {
    if (trackWatcher) {
      clearInterval(trackWatcher);
      trackWatcher = null;
    }
  }

  async function processCurrentTitle() {
    const title = getCurrentTitle();
    
    if (!title || isFetching) return;
    if (title === currentTitle) return;
    
    // Check media type before processing
    if (!shouldLoadSubtitles()) {
      currentTitle = title;
      clearExistingTracks();
      stopTrackWatcher();
      return;
    }
    
    currentTitle = title;
    isFetching = true;
    
    try {
      const p = getPlayer();
      if (!p || typeof p.addRemoteTextTrack !== 'function') return;
      
      if (subsCache.has(title)) {
        const cached = subsCache.get(title);
        if (cached) {
          const added = addSubtitlesToPlayer(cached);
          if (added) {
            startTrackWatcher();
          }
        }
        return;
      }
      
      let imdbId = null;
      let season = null;
      let episode = null;
      
      const episodeMatch = title.match(/S(\d+)E(\d+)/i);
      if (episodeMatch) {
        season = parseInt(episodeMatch[1], 10);
        episode = parseInt(episodeMatch[2], 10);
      }
      
      const { title: cleanTitle, year } = extractYearAndTitle(title);
      const finalTitle = cleanMovieTitle(cleanTitle);
      
      imdbId = await searchTMDB(finalTitle, year);
      
      if (!imdbId) {
        subsCache.set(title, null);
        return;
      }
      
      const subtitles = await fetchSubtitles(imdbId, season, episode);
      
      if (subtitles && subtitles.length > 0) {
        subsCache.set(title, subtitles);
        const added = addSubtitlesToPlayer(subtitles);
        if (added) {
          startTrackWatcher();
        }
      } else {
        subsCache.set(title, null);
      }
      
    } catch(e) {
    } finally {
      isFetching = false;
    }
  }

  function hookSocketEvents() {
    const sock = getSocket();
    if (!sock) return false;
    
    sock.on('changeMedia', (media) => {
      player = null;
      currentTitle = '';
      currentSubtitles = null;
      stopTrackWatcher();
      
      setTimeout(() => {
        player = getPlayer();
        if (player) {
          processCurrentTitle();
        }
      }, 1000);
    });
    
    return true;
  }

  function boot() {
    tmdbApiKey = getTMDBKey();
    
    if (!tmdbApiKey) {
      console.error('[autosubs] TMDB API key not configured in Theme Settings â†’ Integrations');
      return;
    }
    
    let attempts = 0;
    const maxAttempts = 20;
    
    const checkInterval = setInterval(() => {
      attempts++;
      const p = getPlayer();
      const s = getSocket();
      
      if (p && s) {
        clearInterval(checkInterval);
        clearExistingTracks();
        hookSocketEvents();
        
        // Only start if media type is correct
        if (shouldLoadSubtitles()) {
          startTrackWatcher();
          setTimeout(processCurrentTitle, 1000);
        }
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
      }
    }, 500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    setTimeout(boot, 100);
  }

  return {
    name: 'ext:autosubs',
    clearCache: () => subsCache.clear(),
    refresh: () => {
      currentTitle = '';
      processCurrentTitle();
    },
    stopWatcher: stopTrackWatcher
  };
});

(function() {
  function tryInit() {
    if (window.BTFW && typeof BTFW.init === 'function') {
      BTFW.init('ext:autosubs').catch(() => {});
    } else {
      setTimeout(tryInit, 100);
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.addEventListener('btfw:ready', tryInit);
      setTimeout(tryInit, 500);
    });
  } else {
    document.addEventListener('btfw:ready', tryInit);
    setTimeout(tryInit, 500);
  }
})();