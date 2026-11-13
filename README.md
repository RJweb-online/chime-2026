# CHIME 2026 — sheet-controlled releases

Public calendar: **https://rjweb-online.github.io/chime-2026/**

The existing layout keeps all twelve approved presents on days **1–12**. Days **13–25** remain disabled placeholders until their designs are built. The original opening animations, sound, confetti and card timing remain unchanged. Songs are now read for **all days 1–25** from the sheet.

## The sheet is the only release control

Each finished present stays disabled until its own Day row contains one valid YouTube video URL. Loading, missing, blank, invalid or duplicate rows keep the gift locked. If the sheet cannot be read, all finished gifts stay disabled. Tapping a disabled tile does nothing: it does not open a dialog, start an animation, reveal a card or display an unavailable-song message.

There is no testing bypass, testing switch, calendar-date rule or preview query-string override. Previously opened gifts must pass the same fresh sheet check after every reload. Days 13–25 remain unavailable until their designs are built, even if their song links are already present.

To release a finished gift, add its link to the sheet and refresh the calendar. Remove the link and refresh to lock it again. You do not need to change or publish any code to release songs.

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

Open <http://127.0.0.1:8000/> on the Mac. The current Wi-Fi address for an iPhone on the same network is **http://172.22.1.46:8000/**; it may change when the Mac reconnects. The public Pages URL does not depend on the Mac server. Both use only the sheet to control releases. The local toolbar can **Reset opened gifts**, which does not override sheet-controlled release rules.

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
- **09 · Copper candlelight:** a very tall, slender metallic copper tower. Oversized ivory organza loops, translucent shading and long flowing streamers provide the decoration.
- **10 · Rosewood carriage:** a tapered rose damask trunk with an antique clasp, diagonal wine velvet sash and a corner-mounted three-loop fan bow.
- **11 · Winter pantry:** a folded hexagonal oatmeal-paper parcel with visible flecks, crossed jute twine, a loose rustic tie and dried orange. Its cord renderer uses twisted-line highlights rather than satin shading.
- **12 · Peacock keepsake:** an elongated peacock-blue oval case with fine textured paper, a fitted gilt-edged lid, a CHIME plaque and an ivory silk butterfly bow.

All materials are local SVG and Canvas artwork. The original paper detail, shadows, perspective and continuous untying curves are retained.

## Files and shared animation

- `sheet-songs.js`: read-only Day / YouTube URL lookup for days 1–25, with per-day video-link validation.
- `index.html`: shared layered SVG box and reveal card.
- `calendar.js`: day-to-design data, calendar tiles, focused dialog, persistent opened-day flags and static opened snapshots. Days 1–12 use the approved collection; days 13–25 stay unassigned. Each finished design requires its own valid sheet link.
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

This is an authored 2.5D material animation, not a physical cloth simulation. It is designed for one viewing angle. The twelve approved designs remain available in the rendering collection; days 1–12 have temporary assignments with openable, replayable reveals when their sheet rows contain valid song links.

All twelve present designs, sounds and confetti have been manually tested and accepted by the project owner. The earlier calendar prototype browser checks covered all 25 selectable days, the twelve actual designs and their opened snapshots, placeholder state toggles, resetting, interrupted closing, focus restoration, tap targets and horizontal overflow. The same 96 checks passed at desktop width, 390 px, and 320 px with reduced motion enabled. Visual review covered the 390 px overview and the tall copper present's focused reveal. The approved rendering, animation, audio and confetti source files and assets remain unchanged. Browser checks do not replace testing on physical touch devices.

Changes in this workspace are not automatically committed, pushed, or deployed.
