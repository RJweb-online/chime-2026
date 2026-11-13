# CHIME 2026 — public test calendar

The 25-day calendar shows the twelve approved presents on **days 1–12** in their original order. All twelve can be opened and replayed in the public test version. **Days 13–25** remain disabled design placeholders. The approved wrapping animations, sound, confetti and card timing are unchanged.

December 1 keeps its live Google Sheets song and Watch on YouTube button on the card face. After the confetti, the card moves forward with the button attached. Other finished days reveal their own neutral cards without borrowing December 1's song.

Public test calendar: **https://rjweb-online.github.io/chime-2026/**

## Release schedule switch

At the top of **`calendar.js`**, the single release switch is:

```js
const ENABLE_DATE_SCHEDULE = false;
```

- **`false` (current):** all twelve finished presents are unlocked on the normal public URL. No preview link or local-network address is required.
- **`true`:** each finished present unlocks on its own December date in 2026 at **00:00 Japan time**. For example, December 1 unlocks at `2026-12-01T00:00:00+09:00` and December 2 one day later. The device timezone does not change those instants. The page updates when a boundary passes, using the device clock.

When ready to distribute CHIME, change this switch to `true`, commit and push `main`, and wait for GitHub Pages to deploy. Days 13–25 remain unavailable until their designs are assigned.

Choose a day and tap the wrapped present. **Replay opening** restarts that present's full original sequence with one tap and remains available on the public page. December 1 is remembered across browser reloads and restores its opened card silently. Other days keep their opened poses during the current page session. A saved December 1 never opens a different day automatically or gives it the December 1 song. A new private browsing session starts fresh.

## Local preview

The same buildless files run locally:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Open <http://127.0.0.1:8000/> on the Mac. For the iPhone on the same Wi-Fi, the current Mac address is **http://172.22.1.46:8000/**; that address can change when reconnecting. Keep the Mac awake while using its server. The public test site does not depend on the Mac server.

Local-only toolbar controls remain available for inspecting locked and unlocked layouts:

- Locked: <http://127.0.0.1:8000/?preview=locked>
- Unlocked: <http://127.0.0.1:8000/?preview=unlocked>
- Normal calendar: <http://127.0.0.1:8000/>

Those overrides work only on loopback and private home-network IPv4 addresses. Public visitors use `ENABLE_DATE_SCHEDULE` regardless of query-string preview flags. Local **Reset this opening** clears the December 1 saved opening for the current mode; the normal and simulated preview modes use separate keys. Storage is specific to browser profile, hostname and port.

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

For a full check, open day 01, tap the present, wait for the confetti and forward card, then tap Watch. Return to the calendar and open day 02: it should start wrapped, reveal its own card and offer Replay opening. Reload to confirm December 1's saved card and fresh sheet song. Test sound on a physical phone; browser/device audio settings still apply.

Browser validation covered all twelve design selections and replay controls, full day 1/day 2 opening sequences with sound/confetti calls, the live sheet song and saved December 1 card, 320px phone and desktop layouts, and the schedule switch enabled at Japan-time boundaries while the browser used a different timezone. The schedule-on checks used a temporary served copy, leaving the release switch off in the shipped source.

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
- `calendar.js`: day-to-design data, calendar tiles, focused dialog, persistent December 1 opened state and static opened snapshots. Days 1–12 use the approved collection; days 13–25 stay unassigned. All twelve finished designs have enabled reveals while the schedule switch is off.
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

This is an authored 2.5D material animation, not a physical cloth simulation. It is designed for one viewing angle. The twelve approved designs remain available in the rendering collection; days 1–12 have temporary assignments with openable, replayable reveals in public test mode.

All twelve present designs, sounds and confetti have been manually tested and accepted by the project owner. The earlier calendar prototype browser checks covered all 25 selectable days, the twelve actual designs and their opened snapshots, placeholder state toggles, resetting, interrupted closing, focus restoration, tap targets and horizontal overflow. The same 96 checks passed at desktop width, 390 px, and 320 px with reduced motion enabled. Visual review covered the 390 px overview and the tall copper present's focused reveal. The approved rendering, animation, audio and confetti source files and assets remain unchanged. Browser checks do not replace testing on physical touch devices.

Changes in this workspace are not automatically committed, pushed, or deployed.
