# CHIME 2026 — sheet-controlled releases

Public calendar: **https://rjweb-online.github.io/chime-2026/**

The existing 25-day layout preserves approved presents **1–24** and completes the collection with the **Christmas Day** gift on day **25**. The deep champagne-gold box has beveled edges, a fitted lid, embossed stars and broad cranberry velvet with a layered bow and two long tails. Songs are read for **all days 1–25** from the sheet. Every gift requires its own valid song link.

## The sheet is the only release control

Each finished present stays disabled until its own Day row contains one valid YouTube video URL. Loading, missing, blank, invalid or duplicate rows keep the gift locked. If the sheet cannot be read, all finished gifts stay disabled. Tapping a disabled tile does nothing: it does not open a dialog, start an animation, reveal a card or display an unavailable-song message.

There is no testing bypass, testing switch, calendar-date rule or preview query-string override. Previously opened gifts must pass the same fresh sheet check after every reload.

To release a finished gift, add its link to the sheet and refresh the calendar. Remove the link and refresh to lock it again. You do not need to change or publish any code to release songs.

## Review Christmas Eve and Christmas Day locally

These changes are local and unpushed. Start the fixture server:

```sh
python3 tools/preview.py --test-data --bind 0.0.0.0 --port 8000
```

| Preview | Mac | iPhone on the same Wi-Fi |
| --- | --- | --- |
| Calendar | http://127.0.0.1:8000/ | http://172.22.1.46:8000/ |
| Christmas Eve beside Christmas Day | http://127.0.0.1:8000/previews/ | http://172.22.1.46:8000/previews/ |
| First opening and replay captures | http://127.0.0.1:8000/previews/reveal-flow.html | http://172.22.1.46:8000/previews/reveal-flow.html |

The Wi-Fi address can change. Tap day **24** or **25**, then its wrapped present. Use **Replay opening** to repeat the full sequence. Use **Reset opened gifts** on the local calendar to try a fresh first opening again. Earlier comparisons remain at `previews/boxes-13-16.html`, `previews/boxes-17-20.html` and `previews/boxes-21-24.html`.

The fixture in **`preview/songs.json`** contains sample video links for day **9** and days **13–25**, with blank rows for days 1–8 and 10–12. These are sample assignments, not final songs. The server feeds them through the real sheet parser and release gate; it never edits Google Sheets and adds no public testing bypass. Edit a day’s URL in this JSON and reload to test another song or locking. Blank and invalid rows stay disabled, including for gifts already opened. To use another fixture, pass `--test-data /absolute/path/to/songs.json`.

Running without `--test-data` reads the real Google Sheet, where Christmas Day requires its own valid Day 25 row. Stop the server with Ctrl+C.

December 25 has its own finale timeline after the approved velvet bow releases:

1. At **7.05s**, crack the lid over **200ms**, exposing a bright warm-white seam.
2. Hold that cracked pose visibly still for **three full seconds**, keeping the seam lit throughout.
3. Lift smoothly over **1 second**, spreading a soft fan of light upward and outward behind the gift. The fan stays behind the box so its gold finish and embossed stars remain legible.
4. Just after the lid is fully open (**11.28s**), launch the confetti and the existing signature recording. The original lid recording starts with the main lift at **10.25s**; the original signature recording starts with the burst at **11.28s**. Fabric recordings remain on their approved bow-release cues.
5. Keep the original gentle fall and fade. Move the readable song card forward only when the last particle clears. Its 48px **Watch on YouTube** button stays on the face of the card.

The finale uses the visible reveal area: **288 pieces with 24 gold stars on desktop**, **90 pieces with 9 stars on phones**. Cranberry and ivory pieces fill the space above and to either side of the gift. Stars measure **38px across on desktop** and **24px on phones**, independent of the gift’s scaling. The desktop dialog widens to 1100px for day 25 only; the box keeps the approved scale. Other days, including December 24, retain their original 28-piece flourish, sounds and timing. The existing interior glows are retained. Reduced motion reveals immediately without the held lid animation, seam, fan or confetti.

The linked opening-review page compares December 24 and 25 at **1440 × 1000** and **390 × 844**, including both first opening and replay of the finale.

Days **09** and **22** exchange entire design keys: day 09 is now **Ivory pinstripe** (warm ivory, fine gold rules, upright red silk bow); day 22 is now **Copper candlelight** (the tall copper tower with oversized ivory organza). Each design retains its own geometry, bow, release plan, lid timing, card rise and material sound settings. Sheet lookup, lock checks, saved openings and card dates still use the calendar day. No sheet songs are moved.

Verification compares Christmas Eve and Christmas Day back-to-back on desktop and phone, including a full first opening and replay. It checks the three-second stationary hold from its actual animation keyframes and samples the live pose and seam light throughout the pause, light before the full lift, confetti starting after the fully open pose, actual particle counts and on-screen star diameters, side-to-side coverage and unchanged fall duration. It also checks saved reloads and reduced-motion replay at 320px, 390px and 1440px, sheet locking, refreshed song URLs and Watch button taps. The earlier 24 design records, SVG lid/body markup and 72 sampled ribbon frames match the captured baseline. Review images are actual browser captures; physical iPhone playback still needs listening and tapping on the device.

## Release or replace songs in Google Sheets

CHIME reads the existing [CHIME 2026 sheet](https://docs.google.com/spreadsheets/d/1aoxQ8YMaAwwdBJ2q1_nhkWKNjov7l331GBV_GTV7R9M/edit) whenever the calendar loads. The source is **Sheet1**, gid **0**, range **A1:B26**:

| Column | Header | Contents |
| --- | --- | --- |
| A | Day | A number from 1 to 25, once per day |
| B | YouTube URL | That day's full HTTPS YouTube video link, or blank to keep it unreleased |

Keep the header row and one row for each day you want to release within rows 2–26. The Day value determines the gift; row order does not. To release day 2, enter `2` in its Day cell and its song URL in the same row's YouTube URL cell. Wait for Sheets to save, then refresh CHIME. Removing that URL locks the gift again after refresh.

For the current day 1 row, edit **B2** and keep **A2 = 1**. To replace any day's song, replace its URL and refresh the calendar. The revealed card always uses that day's fresh sheet URL, including for visitors who already opened the gift. URLs are never saved in browser storage. Google can briefly delay updated values; reload after the sheet has saved.

Accepted links are HTTPS YouTube video links such as `https://youtu.be/VIDEO_ID` and `https://www.youtube.com/watch?v=VIDEO_ID`; Shorts, live and embed video URLs are also supported. Video IDs must have the normal 11-character format. Homepages, channels, playlist-only URLs, other domains, malformed IDs and non-HTTPS links do not release a gift. This validates link format; YouTube controls video availability and playback.

### Read access while keeping editing to yourself

1. Open the spreadsheet and click **Share**.
2. Under **General access**, choose **Anyone with the link → Viewer → Done**.
3. Under **People with access**, keep yourself as Owner and remove or downgrade other Editors if you want to be the sole editor.

Anyone with the sheet link can view it. CHIME receives no edit credentials and never writes to the sheet. See [Google's sharing instructions](https://support.google.com/drive/answer/2494822) and [anonymous spreadsheet access documentation](https://developers.google.com/chart/interactive/docs/spreadsheets#authorization).

## Open, replay and reload

Select an available day and tap its wrapped present. After the original confetti fades, the card moves forward with its **Watch on YouTube** button attached. The song opens in a new tab only when that button is tapped. The phone button has a 48px tap target. **Replay opening** restarts the original sequence with one tap.

Opened-day flags are saved for all gifts in the same browser. On reload, the most recently opened gift restores its card silently only after its fresh sheet row is verified. A changed URL appears on that card without replaying the gift. Blank or invalid rows still lock previously opened gifts after refresh. Existing December 1 visitors' saved openings are migrated. A fresh private browser session starts wrapped.

## Local preview

Run from this folder:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open <http://127.0.0.1:8000/> on the Mac. For an iPhone on the same Wi-Fi, use the Mac's current Wi-Fi IPv4 address with port 8000. The public Pages URL does not depend on the Mac server. Both use only the sheet to control releases. The local toolbar can **Reset opened gifts**, which does not override sheet-controlled release rules.

Browser checks cover loading-state taps, valid and blank sheet rows, invalid links, old preview query strings, replacing a link on an already-opened card, and relocking after a link is removed. Controlled sheet-feed responses test changes without editing live sheet values. The live sheet is also read directly for linked and blank days.

## Design studies

- **Crimson botanical:** original keepsake proportions, burgundy foil botanical paper, broad golden satin and generous loops.
- **Woodland parcel:** low, wide ivory paper box, branch motif, matte paper reflections, asymmetrical forest woven bow, pine sprig and gift tag.
- **Midnight stars:** tall, narrow blue lustre box, silver stars and a restrained, slender silver silk bow.
- **Sugarplum hatbox:** round construction with elliptical lid, fluted plum paper, gilt rims, an embossed label and a four-loop wine velvet rosette.
- **The long way home:** long, flat folded kraft parcel, diagonal hairline stripes, visible envelope folds, an offset linen tie and a North Pole label. The upper wrapping peels away on the shared reveal cue.
- **Emerald treasure:** compact octagonal construction, faceted sides, inset gilt rules, a petite champagne silk bow and a bronze seal on the lid.
- **07 · A winter story:** a book-shaped navy cloth parcel with page edges and gilt spine details. Narrow burgundy tape closes in a minimal crossed knot, with no bow loops.
- **08 · Frost & fold:** a flat square parcel in icy embossed snow-crystal paper, crossed blue grosgrain bands, a wide flat tailored bow and short notched tails.
- **09 · Ivory pinstripe:** a tall square in warm ivory with fine gold rules, a fitted lid and a small upright red silk bow at the front edge.
- **10 · Rosewood carriage:** a tapered rose damask trunk with an antique clasp, diagonal wine velvet sash and a corner-mounted three-loop fan bow.
- **11 · Winter pantry:** a folded hexagonal oatmeal-paper parcel with visible flecks, crossed jute twine, a loose rustic tie and dried orange. Its cord renderer uses twisted-line highlights rather than satin shading.
- **12 · Peacock keepsake:** an elongated peacock-blue oval case with fine textured paper, a fitted gilt-edged lid, a CHIME plaque and an ivory silk butterfly bow.

- **13 · Burgundy keepsake:** a deep square burgundy box with a fitted lid, broad ivory satin cross-ribbon and a generous centered bow.
- **14 · Forest jewel case:** a slim rectangular forest-green box with a fitted lid, fine champagne silk and a small corner bow.
- **15 · Midnight octagon:** a true eight-sided midnight-blue box with a fitted lid, silver ribbon and a sculpted, layered double-loop bow.
- **16 · Cranberry round:** a low round cranberry box with a close-fitting circular lid, wide blush satin and an asymmetrical bow.
- **17 · Ivory hatbox:** a tall ivory cylinder with a fitted round lid, narrow cranberry silk and a small upright bow.
- **18 · Glacier linen:** a shallow linen-textured glacier-blue square, wide pearl ribbon and a flat diagonal corner bow.
- **19 · Plum tiered case:** a deep dark-plum rectangle, stepped fitted lid, twin fine antique-gold bands and a compact double bow.
- **20 · Evergreen hexagon:** a cream six-sided box with subtle sprigs, deep green grosgrain and a loose bow with long draped tails.

- **21 · Mulberry velvet:** a wide low rectangle, subtle velvet nap, fitted lid and broad copper satin with one long tail.
- **22 · Copper candlelight:** a very tall, slender metallic copper tower. Oversized ivory organza loops, translucent shading and long flowing streamers provide the decoration.
- **23 · Evergreen oval:** a shallow deep-green oval, fitted brushed-brass rim, wide cream silk and a low flat bow.
- **24 · Christmas Eve:** a deep clipped-corner midnight-blue box, softly beveled fitted lid, restrained silver foil and six layered silver-blue bow loops.

- **25 · Christmas Day:** a deep champagne-gold rectangle with softly beveled edges, a fitted lid, embossed stars, broad cranberry velvet and six layered bow loops with two long tails.

All materials are local SVG and Canvas artwork. The original paper detail, shadows, perspective and continuous untying curves are retained.

## Files and shared animation

- `sheet-songs.js`: read-only Day / YouTube URL lookup for days 1–25, with per-day video-link validation.
- `index.html`: shared layered SVG box and reveal card.
- `calendar.js`: day-to-design data, calendar tiles, focused dialog, persistent opened-day flags and static opened snapshots. Days 09 and 22 exchange ivory pinstripe and copper candlelight; all other assignments stay fixed, including Christmas Day on 25. Each finished design requires its own valid sheet link.
- `calendar.css`: compact calendar layout and dialog styling, separate from the approved stage animation rules.
- `style.css`: responsive preview, material treatments and shared lid/card animations.
- `script.js`: design configurations, Canvas ribbon renderer, shared opening controller, reset, selection and reduced-motion handling.
- `studies.js`: the additional constructions, material patterns and authored ribbon arrangements; extends the original collection and starts the preview after both scripts load.
- `audio.js`: optional recorded-sound playback, material-specific filtering, cue scheduling and cancellation. Audio failures do not block the animation.
- `confetti.js`: a reusable 28-piece Canvas flourish; Christmas Day uses 90 pieces on phones and 288 on desktop, with responsive gold-star sizes and an overlay spanning the visible reveal area. Small muted festive shapes lift gently, drift downward and fade by the signature recording's end. It uses the audio playback cue and decoded duration, with an eight-second fallback when audio is unavailable. Reset, switching designs and hiding the page clear the overlay; reduced motion disables it. The overlay runs only during the flourish. December 25 starts its burst and signature sound after its staged lid has fully opened; the shared completion event still controls the forward card.
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

This is an authored 2.5D material animation, not a physical cloth simulation. It is designed for one viewing angle. All 25 designs remain intact; only the day 09/22 assignments are exchanged. Each day requires its own valid sheet row.

All twelve present designs, sounds and confetti have been manually tested and accepted by the project owner. The earlier calendar prototype browser checks covered all 25 selectable days, the twelve actual designs and their opened snapshots, placeholder state toggles, resetting, interrupted closing, focus restoration, tap targets and horizontal overflow. The same 96 checks passed at desktop width, 390 px, and 320 px with reduced motion enabled. Visual review covered the 390 px overview and the tall copper present's focused reveal. The original rendering/controller, audio, confetti and sound assets remain unchanged. New constructions extend studies.js and add design-scoped rules to style.css; the first twenty-four models and sampled ribbon frames match the captured baseline. Browser checks do not replace testing on physical touch devices.

Changes in this workspace are not automatically committed, pushed, or deployed.
