'use strict';
// SONG RELEASE SOURCE — Sheet1: Day and YouTube URL, with headers in row 1.
// Edit the sheet to release songs. Share as Anyone with the link → Viewer.
window.CHIME_SONG_SHEET = Object.freeze({
  spreadsheetId: '1aoxQ8YMaAwwdBJ2q1_nhkWKNjov7l331GBV_GTV7R9M',
  sheetId: '0',
  range: 'A1:B26',
});

window.ChimeSongs = (() => {
  function youtubeUrl(value) {
    if (typeof value !== 'string') return '';
    try {
      const url = new URL(value.trim());
      if (url.protocol !== 'https:' || url.port || url.username || url.password) return '';
      const id = '[A-Za-z0-9_-]{11}';
      if (url.hostname === 'youtu.be') {
        return new RegExp(`^/${id}/?$`).test(url.pathname) ? url.href : '';
      }
      if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com'].includes(url.hostname)) return '';
      if (/^\/watch\/?$/.test(url.pathname)) {
        return new RegExp(`^${id}$`).test(url.searchParams.get('v') || '') ? url.href : '';
      }
      return new RegExp(`^/(?:shorts|live|embed)/${id}/?$`).test(url.pathname) ? url.href : '';
    } catch {
      return '';
    }
  }

  function readSongs(response) {
    if (response?.status !== 'ok' || !Array.isArray(response.table?.rows) || !Array.isArray(response.table.cols)) {
      throw new Error('The song sheet could not be read. Check Viewer link sharing.');
    }
    const labels = response.table.cols.map(column => (column.label || '').toLowerCase().replace(/[^a-z]/g, ''));
    const dayColumn = labels.indexOf('day'), urlColumn = labels.indexOf('youtubeurl');
    if (dayColumn < 0 || urlColumn < 0) throw new Error('The song sheet needs Day and YouTube URL headers.');
    const songs = new Map(), seen = new Set();
    for (const row of response.table.rows) {
      const day = Number(row.c?.[dayColumn]?.v);
      if (!Number.isInteger(day) || day < 1 || day > 25) continue;
      if (seen.has(day)) {
        // Ambiguous rows never release a song, even if one has a valid link.
        songs.delete(day);
        continue;
      }
      seen.add(day);
      const url = youtubeUrl(row.c?.[urlColumn]?.v);
      if (url) songs.set(day, url);
    }
    return songs;
  }

  function load() {
    // Google's responseHandler transport supports Safari across origins without
    // API keys, Google sign-in, a proxy, or any write access to the spreadsheet.
    return new Promise((resolve, reject) => {
      const config = window.CHIME_SONG_SHEET;
      const callback = '__chimeSheetSongs';
      const script = document.createElement('script');
      let timer, settled = false;
      const complete = (error, songs) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.remove();
        delete window[callback];
        if (error) reject(error); else resolve(songs);
      };
      window[callback] = response => {
        try { complete(null, readSongs(response)); }
        catch (error) { complete(error); }
      };
      const source = new URL(`https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/gviz/tq`);
      source.search = new URLSearchParams({
        gid: config.sheetId, range: config.range, headers: '1',
        tqx: `out:json;responseHandler:${callback}`,
        // Always re-read on reload; opened gifts never cache their old song URL.
        _: String(Date.now()),
      });
      script.src = source.href;
      script.referrerPolicy = 'no-referrer';
      script.onerror = () => complete(new Error('The song sheet is unreachable.'));
      script.onload = () => {
        if (!settled) complete(new Error('The song sheet returned an unreadable response.'));
      };
      timer = setTimeout(() => complete(new Error('The song sheet request timed out.')), 15000);
      document.head.append(script);
    });
  }
  return Object.freeze({load});
})();
