# CHIME 2026 — six-present development preview

A standalone wrapping and animation study built on the original crimson present. This is a development prototype; the previous CHIME calendar remains on Google Sites.

## Preview

Open `index.html` in a modern browser. No server, build step, dependencies, or internet connection is needed.

1. Compare the six wrapped-gift thumbnails, then select one for the larger view.
2. Click or tap the gift to unwrap it. Keyboard: Tab to the gift and press Enter or Space.
3. Choose **Reset wrapping** to restore the wrapped state, then unwrap again.
4. Switch designs at any point, including during opening. Each selection starts fully wrapped.

The preview is silent and reveals a neutral study card. There is no calendar, daily unlocking, or music-link management. Reduced-motion preferences provide an immediate reveal. Keyboard focus moves to Reset after a keyboard-triggered reveal; pointer interactions do not move focus.

## Design studies

- **Crimson botanical:** original keepsake proportions, burgundy foil botanical paper, broad golden satin and generous loops.
- **Woodland parcel:** low, wide ivory paper box, branch motif, matte paper reflections, asymmetrical forest woven bow, pine sprig and gift tag.
- **Midnight stars:** tall, narrow blue lustre box, silver stars and a restrained, slender silver silk bow.
- **Sugarplum hatbox:** round construction with elliptical lid, fluted plum paper, gilt rims, an embossed label and a four-loop wine velvet rosette.
- **The long way home:** long, flat folded kraft parcel, diagonal hairline stripes, visible envelope folds, an offset linen tie and a North Pole label. The upper wrapping peels away on the shared reveal cue.
- **Emerald treasure:** compact octagonal construction, faceted sides, inset gilt rules, a petite champagne silk bow and a bronze seal on the lid.

All materials are local SVG and Canvas artwork. The original paper detail, shadows, perspective and continuous untying curves are retained.

## Files and shared animation

- `index.html`: preview controls, shared layered SVG box and neutral reveal card.
- `style.css`: responsive preview, material treatments and shared lid/card animations.
- `script.js`: design configurations, Canvas ribbon renderer, shared opening controller, reset, selection and reduced-motion handling.

The `designs` configuration supplies paper palettes, material shading, ribbon widths, independent left/right bow shapes, and ribbon attachment coordinates. `constructions` supplies separate SVG lid, body and interior silhouettes for the round hatbox, folded parcel and octagonal box. The three original box studies retain the detailed original geometry. Decorations belong to their lids and move with them during opening.

`selectDesign()` applies a design to one shared animated present, cancels any in-flight animation and restores the wrapped state. Reset cancels the pending animation frame and removes the CSS animation classes. All six reuse the original ribbon curves and opening controller; additional rosette loops follow the same release timing. Velvet reduces the satin highlight, while woven and linen ribbons use a small cross-grain texture.

The comparison shelf uses static SVG snapshots of the actual gifts, including a raster snapshot of each Canvas bow. Snapshots are created once at startup and stay wrapped for comparison. There is one live ribbon canvas and no idle animation loop. No framework, external image, font or network request is required. These are design studies, not calendar days; future day data can refer to the design keys independently of the preview controls.

The 4.9-second sequence is shared: box wiggle; tension and first-loop release (0.38–1.53 s); collar loosening (1.32–1.90 s); remaining loop release (1.90–2.78 s); ribbon peeling and settling (2.80–3.57 s); lid lift, glow and card reveal (3.60–4.90 s). Released ribbon remains visible below the box.

This is an authored 2.5D material animation, not a physical cloth simulation. It is designed for one viewing angle. The six studies establish different constructions and personalities before any future 25-present collection or calendar integration.

Changes in this workspace are not automatically committed, pushed, or deployed.
