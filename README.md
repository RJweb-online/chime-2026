# CHIME 2026 — December 1 reveal

December 1 uses the approved **Crimson botanical** present. Its existing wrapping animation, card rise, sound and confetti remain intact. After the confetti, the card moves forward with its Watch on YouTube button on the card face on both phone and desktop. The existing 25-day layout shows all twelve approved designs on days 1–12 in their original order, using temporary day assignments. Only December 1 opens; days 2–12 show their wrapped designs with “Reveal later”. Only days 13–25 use placeholders.

## Local preview

**Temporary local unlock is enabled.** The plain calendar at <http://127.0.0.1:8000/> lets you open day 01 today, without a query string. In `calendar.js`, set `temporarilyUnlockLocalDecember1` from `true` to `false` before publishing to restore the normal local date check. The temporary override applies to localhost / loopback and private home-network IPv4 addresses; other hosts still use the Japan-time unlock.

From this folder, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

For iPhone testing over the same Wi-Fi, bind the server to all interfaces instead:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

The running Wi-Fi preview is **http://172.22.1.46:8000/** (the Mac's current Wi-Fi IP; it may change when reconnecting). December 1 stays temporarily unlocked at this address. Keep the Mac awake and connected to the same Wi-Fi as the phone. The phone stores its opening separately from the Mac browser.

Open these in your browser (use the same hostname and port for remembered openings):

- Locked today: <http://127.0.0.1:8000/?preview=locked>
- Unlocked today: <http://127.0.0.1:8000/?preview=unlocked>
- Regular local calendar (temporarily unlocked): <http://127.0.0.1:8000/>

The local toolbar switches states and **Reset this opening** clears only the current mode's saved opening. The normal date and simulated previews use separate storage keys. Preview overrides and controls are accepted on localhost / loopback and private home-network IPv4 addresses. Use HTTP rather than opening the HTML file directly so browser storage behaves consistently. Stop the server with Ctrl+C.

On the unlocked page, choose **01**, then tap the wrapped gift. The original sequence plays. After the last confetti fades, the card moves forward with **Watch on YouTube** attached to its face. The button travels with the card, uses a 48px tap target, and has no separate copy below the present. The song opens in a new tab only when the button is tapped. The opening is remembered when the original sequence finishes. Reloading or revisiting then shows the opened present and the same button on the card immediately and silently. Closing the dialog before the opening finishes leaves the gift wrapped.

A new private browsing session starts wrapped. Reloading inside that private session still remembers its opening until that session closes. Local storage is specific to browser profile, hostname and port; blocked storage cannot retain openings.

With the temporary local override off, the actual unlock is **December 1, 2026 at 00:00 Japan time**, equivalent to November 30 at 15:00 UTC. The page checks the explicit `+09:00` instant, independent of the viewer's timezone, and updates automatically at the boundary. This local static site uses the device clock.

## Change the December 1 song in Google Sheets

CHIME reads the linked [CHIME 2026 sheet](https://docs.google.com/spreadsheets/d/1aoxQ8YMaAwwdBJ2q1_nhkWKNjov7l331GBV_GTV7R9M/edit) on every calendar load. The verified layout is **Sheet1**, gid **0**:

| Cell | Value |
| --- | --- |
| A1 | Day |
| B1 | YouTube URL |
| A2 | 1 |
| B2 | Your full HTTPS YouTube link |

To change the song, edit **Sheet1!B2**, keep **A2 = 1**, wait for Google Sheets to save, then reload Safari. The saved-opened gift also picks up the fresh sheet URL. No JavaScript edit is needed for a song change. There must be exactly one Day 1 row in A2:B26.

### Read access with editing reserved for you

1. Open the spreadsheet and click **Share**.
2. Under **General access**, select **Anyone with the link**.
3. Set that access to **Viewer**, then click **Done**.
4. Under **People with access**, keep yourself as Owner and remove or downgrade any other Editors if you want to be the sole editor.

This enables a read-only song feed without requiring visitors to sign in. Anyone who has the sheet link can view its contents; CHIME receives no edit credentials and never writes to the sheet. These are the [Google sharing roles](https://support.google.com/drive/answer/2494822), and Google documents [anonymous spreadsheet reads for Viewer link sharing](https://developers.google.com/chart/interactive/docs/spreadsheets#authorization). The user enabled Viewer link sharing, and the live day 1 row was read successfully during setup. Other existing editors were not changed or independently verified.

`december-1.js` now contains only the sheet connection and read-only loader: spreadsheet ID, gid and bounded range A1:B26. It uses Google's responseHandler transport so the same static server works on an iPhone over Wi-Fi without API keys or a proxy. The song is not cached in local storage. Google may briefly delay new values; reload after the sheet has saved.

The present opens on its original schedule while the song loads separately. The button remains part of the forward card after confetti. On a slow connection it shows a loading message; an inaccessible sheet or invalid/missing day 1 URL shows a retry-by-reloading message instead of an obsolete song. Only a valid HTTPS YouTube link can become a Watch button. No YouTube embed or autoplay is used.

For a full check: reset the unlocked preview, tap to unwrap, tap the song button, return and reload, then open the same preview URL in a new private window. Verify the locked preview cannot open. Local toolbar controls also let you inspect the final pose without waiting or reset the wrapping. Test sound on your phone; browser/device audio settings still apply.

Browser validation confirmed all 25 tiles, twelve distinct approved designs on days 1–12, placeholders only on days 13–25, and disabled reveals on days 2–25. It also covered emulated phone touch, the original 3.85-second card cue and 4.9-second opening, sound/confetti invocation, 390px and 320px layouts, desktop, saved reloads, a fresh private context, reduced motion, blocked storage, and both sides of midnight Japan time in a different browser timezone. A follow-up browser check used the supplied December 1 URL, verified the phone Watch button opens it in a new tab, and confirmed the same URL after reload. Physical-device audio and YouTube playback still need a listening check.

The temporary-unlock pass was tested from the exact regular URL `http://127.0.0.1:8000/`, without a preview query: day 01 was enabled, all twelve designs remained visible, the full opening and original sound/confetti calls ran, the phone card appeared, no song tab opened during the reveal, and tapping Watch opened the configured URL. Reload restored the opened gift and link.

The card-button pass was verified on first opening and saved reloads: the only song button stays inside the forward card, remains hidden during confetti, and opens the configured URL when tapped. Checks covered 390px and 320px phone layouts, desktop first opening and reload, and reduced motion.

The sheet integration was tested at the Wi-Fi calendar URL against the real Viewer-shared sheet. Fresh openings and saved reloads used the exact current B2 URL, and card taps opened it. Additional browser checks covered delayed responses, invalid/missing/duplicate day 1 rows, access failures and network failures without changing any sheet values.

All work stays local: nothing has been committed, pushed or deployed.

## Design studies

- **Crimson botanical:** original keepsake proportions, burgundy foil botanical paper, broad golden satin and generous loops.
- **Woodland parcel:** low, wide ivory paper box, branch motif, matte paper reflections, asymmetrical forest woven bow, pine sprig and gift tag.
- **Midnight stars:** tall, narrow blue lustre box, silver stars and a restrained, slender silver silk bow.
- **Sugarplum hatbox:** round construction with elliptical lid, fluted plum paper, gilt rims, an embossed label and a four-loop wine velvet rosette.
- **The long way home:** long, flat folded kraft parcel, diagonal hairline stripes, visible envelope folds, an offset linen tie and a North Pole label. The upper wrapping peels away on the shared reveal cue.
- **Emerald treasure:** compact octagonal construction, faceted sides, inset gilt rules, a petite champagne silk bow and a bronze seal on the lid.
- **07 · A winter story:** a book-shaped navy cloth parcel with page edges and gilt spine details. Narrow burgundy tape closes in a minimal crossed knot, with no bow loops.
- **08 · Frost & fold:** a flat square parcel in icy embossed snow-crystal paper, crossed blue grosgrain bands, a wide flat tailored bow and short notched tails.
- **09 · Copper candlelight:** a very tall, slender metallic copper tower. Oversized ivory organza loops, translucent shading and long flowing streamers provide the decoration.
- **10 · Rosewood carriage:** a tapered rose damask trunk with an antique clasp, diagonal wine velvet sash and a corner-mounted three-loop fan bow.
- **11 · Winter pantry:** a folded hexagonal oatmeal-paper parcel with visible flecks, crossed jute twine, a loose rustic tie and dried orange. Its cord renderer uses twisted-line highlights rather than satin shading.
- **12 · Peacock keepsake:** an elongated peacock-blue oval case with fine textured paper, a fitted gilt-edged lid, a CHIME plaque and an ivory silk butterfly bow.

All materials are local SVG and Canvas artwork. The original paper detail, shadows, perspective and continuous untying curves are retained.

## Files and shared animation

- `december-1.js`: the sheet connection and read-only December 1 song loader. Edit the song in Sheet1!B2.
- `index.html`: shared layered SVG box and reveal card.
- `calendar.js`: day-to-design data, calendar tiles, focused dialog, persistent December 1 opened state and static opened snapshots. Days 1–12 use the approved collection; days 13–25 stay unassigned. Only December 1 has an enabled reveal.
- `calendar.css`: compact calendar layout and dialog styling, separate from the approved stage animation rules.
- `style.css`: responsive preview, material treatments and shared lid/card animations.
- `script.js`: design configurations, Canvas ribbon renderer, shared opening controller, reset, selection and reduced-motion handling.
- `studies.js`: the six additional constructions, material patterns and authored ribbon arrangements; extends the original collection and starts the preview after both scripts load.
- `audio.js`: optional recorded-sound playback, material-specific filtering, cue scheduling and cancellation. Audio failures do not block the animation.
- `confetti.js`: a reusable 28-piece Canvas flourish at the card reveal. Small muted festive shapes lift gently, drift downward and fade by the signature recording's end. It uses the audio playback cue and decoded duration, with an eight-second fallback when audio is unavailable. Reset, switching designs and hiding the page clear the overlay; reduced motion disables it. The overlay runs only during the flourish and does not change the present animation duration.
- `assets/audio/samples.js`: the five edited WAV recordings and supplied signature MP3 embedded as base64 for playback directly from disk, without fetching files.
- `assets/audio/slide.wav`, `fall.wav`, `dry.wav`, `lid.wav` and `chime.wav`: the edited recordings retained alongside the embedded playback copy.
- `assets/audio/LICENSES.md`: recording sources, attribution, licences and editing details. Keep this file with the audio assets when copying or publishing the preview.

The `designs` configuration supplies paper palettes, material shading, ribbon widths, independent left/right bow shapes, and ribbon attachment coordinates. `constructions` supplies separate SVG lid, body and interior silhouettes for the round hatbox, folded parcel and octagonal box. The three original box studies retain the detailed original geometry. Decorations belong to their lids and move with them during opening.

`selectDesign()` applies a design to one shared animated present, cancels any in-flight animation and restores the wrapped state. Reset cancels the pending animation frame and removes the CSS animation classes. The approved first six retain their original geometry, ribbon curves and material settings. Velvet reduces the satin highlight, while woven and linen ribbons use a small cross-grain texture.

Studies 07–12 retain their authored `arrangements`, materials and silhouettes. `releasePlans` links their bands, bights, collars and tails into continuous visible strands. Additional cross-bands remain complete belts. A tail takes up slack, the collar loosens, and bights release through the knot in sequence. Material withdrawn from the loops and wrap feeds into the tail using an arc-length budget; widths and texture stay attached to the material. The wrapping band remains held until the bow releases, then slides over an edge. Released folds relax near the base without being interpolated into an unrelated floor pose. Tangents and sheet normals are recomputed after deformation.

The simple knot, tailored bow, oversized organza, corner fan, twine and butterfly bow have separate release cues. Their total durations are 5.7, 7.2, 8.0, 7.7, 7.3 and 7.5 seconds respectively. Each lid waits until after its ribbon has settled; the card follows 250 ms later. The shared controller reads the selected design's duration, and reduced motion still reveals immediately. The book cover retains its lift angle, the copper tower's card rises farther to clear its tall front, and Peacock keepsake uses its own oval-lid lift.

The fabric sounds use shared recordings with gain, EQ and playback-rate variations to suggest different materials. Lid foley accompanies the lid lift; the signature reveal recording starts with the card reveal 250 ms later and plays to its natural end. Playback uses one reusable AudioContext and stops when the page is hidden. The fabric recordings and legacy unused chime are CC0; the lid recording is CC BY 3.0 with attribution in `assets/audio/LICENSES.md`.

The current signature sound is `assets/audio/ivan_luzan-christmas-and-new-year-logo-181244.mp3`, supplied by the project owner and copied unchanged. Its exact bytes are also embedded in `samples.js` for offline previews. It plays at a quiet gain without trimming, EQ or playback-rate changes, including in reduced-motion mode. Resetting or switching designs still cancels playback. No third-party licence is inferred for the supplied recording.

The calendar overview uses static SVG snapshots of the actual gifts, including a raster snapshot of each Canvas bow. Wrapped snapshots are created once at startup; opened snapshots are captured from the final pose as days are opened. There is one live ribbon canvas and no idle animation loop. No framework, external image or font is required. Only the live song lookup requires a Google Sheets network request. Calendar day data refers to design keys independently of the approved rendering system.

Studies 01–06 keep their original 4.9-second sequence: box wiggle; tension and first-loop release (0.38–1.53 s); collar loosening (1.32–1.90 s); remaining loop release (1.90–2.78 s); ribbon peeling and settling (2.80–3.57 s); lid lift, glow and card reveal (3.60–4.90 s). Released ribbon remains visible below every gift.

This is an authored 2.5D material animation, not a physical cloth simulation. It is designed for one viewing angle. The twelve approved designs remain available in the rendering collection; days 1–12 have temporary assignments and only December 1 has an enabled reveal.

All twelve present designs, sounds and confetti have been manually tested and accepted by the project owner. The earlier calendar prototype browser checks covered all 25 selectable days, the twelve actual designs and their opened snapshots, placeholder state toggles, resetting, interrupted closing, focus restoration, tap targets and horizontal overflow. The same 96 checks passed at desktop width, 390 px, and 320 px with reduced motion enabled. Visual review covered the 390 px overview and the tall copper present's focused reveal. The approved rendering, animation, audio and confetti source files and assets remain unchanged. Browser checks do not replace testing on physical touch devices.

Changes in this workspace are not automatically committed, pushed, or deployed.
