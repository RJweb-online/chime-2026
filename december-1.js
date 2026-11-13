'use strict';
// DECEMBER 1 SONG SOURCE — edit the Day 1 row in this Google Sheet.
// Sheet1: column A = Day, column B = YouTube URL; row 1 contains headers.
// Share the spreadsheet as Anyone with the link → Viewer. CHIME never writes to it.
window.CHIME_DECEMBER_1 = Object.freeze({
  spreadsheetId: '1aoxQ8YMaAwwdBJ2q1_nhkWKNjov7l331GBV_GTV7R9M',
  sheetId: '0',
  range: 'A1:B26',
});

window.ChimeDecember1Song = Object.freeze({
  load() {
    // Google's documented responseHandler transport works across origins in Safari
    // without an API key, a signed-in Google account, or a local proxy server.
    return new Promise((resolve, reject) => {
      const config = window.CHIME_DECEMBER_1;
      const callback = '__chimeDecember1Song';
      const script = document.createElement('script');
      let timer;
      const complete = (error, url) => {
        clearTimeout(timer);
        script.remove();
        delete window[callback];
        if (error) reject(error); else resolve(url);
      };
      window[callback] = response => {
        try {
          if (response.status !== 'ok' || !Array.isArray(response.table?.rows)) {
            throw new Error('The song sheet could not be read. Check Viewer link sharing.');
          }
          const rows = response.table.rows.filter(row => Number(row.c?.[0]?.v) === 1);
          if (rows.length !== 1) throw new Error('The song sheet needs exactly one Day 1 row.');
          const url = new URL(rows[0].c?.[1]?.v);
          if (url.protocol !== 'https:' || !['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtu.be'].includes(url.hostname)) {
            throw new Error('Day 1 needs a full HTTPS YouTube URL in column B.');
          }
          complete(null, url.href);
        } catch (error) {
          complete(error);
        }
      };
      const source = new URL(`https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/gviz/tq`);
      source.search = new URLSearchParams({
        gid: config.sheetId,
        range: config.range,
        headers: '1',
        tqx: `out:json;responseHandler:${callback}`,
        // Re-read on reload instead of keeping a browser-cached song URL.
        _: String(Date.now()),
      });
      script.src = source.href;
      script.referrerPolicy = 'no-referrer';
      script.onerror = () => complete(new Error('The song sheet is unreachable. Check your connection and Viewer link sharing.'));
      timer = setTimeout(() => complete(new Error('The song sheet request timed out.')), 15000);
      document.head.append(script);
    });
  },
});
