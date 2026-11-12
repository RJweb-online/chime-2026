# CHIME 2026 — twelve-present development preview

A standalone wrapping and animation study built on the original crimson present. This is a development prototype; the previous CHIME calendar remains on Google Sites.

## Preview

Open `index.html` in a modern browser. No server, build step, dependencies, or internet connection is needed.

1. Compare the twelve wrapped-gift thumbnails, then select one for the larger view.
2. Click or tap the gift to unwrap it. Keyboard: Tab to the gift and press Enter or Space.
3. Choose **Reset wrapping** to restore the wrapped state, then unwrap again.
4. Switch designs at any point, including during opening. Each selection starts fully wrapped.
5. Use **View selected present** and **Compare all twelve** to move between the shelf and the larger study. The shelf spans multiple rows; it does not shrink the gifts to fit a single screen.

The preview reveals a neutral study card, accompanied by quiet recorded fabric movement, a lid-opening sound and a reveal chime. Sound starts only after an unwrap gesture; resetting or switching designs cancels the previous sounds. Reduced-motion preferences provide an immediate reveal with only the signature reveal recording. Keyboard focus moves to Reset after a keyboard-triggered reveal; pointer interactions do not move focus. There is no calendar, daily unlocking, or music-link management.

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

- `index.html`: preview controls, shared layered SVG box and neutral reveal card.
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

The comparison shelf uses static SVG snapshots of the actual gifts, including a raster snapshot of each Canvas bow. Snapshots are created once at startup and stay wrapped for comparison. There is one live ribbon canvas and no idle animation loop. No framework, external image, font or network request is required. These are design studies, not calendar days; future day data can refer to the design keys independently of the preview controls.

Studies 01–06 keep their original 4.9-second sequence: box wiggle; tension and first-loop release (0.38–1.53 s); collar loosening (1.32–1.90 s); remaining loop release (1.90–2.78 s); ribbon peeling and settling (2.80–3.57 s); lid lift, glow and card reveal (3.60–4.90 s). Released ribbon remains visible below every gift.

This is an authored 2.5D material animation, not a physical cloth simulation. It is designed for one viewing angle. The twelve studies establish different constructions and personalities before any future 25-present collection or calendar integration.

All twelve current designs have been manually tested and accepted by the project owner. Further automated browser testing was intentionally skipped for this final documentation review. Earlier development validation notes predate the final Peacock keepsake and sound changes and should not be treated as a fresh automated verification of the current version.

Changes in this workspace are not automatically committed, pushed, or deployed.
