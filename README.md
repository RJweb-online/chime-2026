# CHIME 2026 — single present prototype

A standalone Christmas gift-opening study. No build tools, packages, backend, or calendar functionality.

## Preview

Open `index.html` directly in a modern browser (Chrome, Edge, Firefox, or Safari). Everything visual works offline. Internet access is needed only when you choose to open YouTube.

1. Click or tap the gift, or Tab to it and press Enter/Space.
2. Watch the 4.9-second sequence: wiggle, unfolding silk bow, slipping ribbon, lifting lid, golden light, and rising song card.
3. Choose **Play on YouTube** to open Nat King Cole's *The Christmas Song* in a new tab.
4. Choose **Wrap it up & replay** to restart the sequence. Try it several times.
5. Resize the browser or test on a phone. Enable your system's reduced-motion preference to see the immediate reveal alternative.

The prototype is intentionally silent. It does not autoplay music or load external fonts, images, or scripts.

## Files

- `index.html`: page, layered SVG gift, and song link.
- `style.css`: responsive presentation, materials, and staged motion.
- `script.js`: one-click sequence, continuous ribbon surfaces and staged bow geometry, replay, keyboard focus, and reduced-motion support.

To change the song, edit the card text, link URL, and link accessibility label in `index.html`. Ribbon geometry and timing are in `script.js`; lid and reveal timing are in `style.css`. The sequence finishes at 4900 ms.

## Ribbon animation

The bow is drawn as two continuous visible runs of the same ribbon, joined behind the box. Cubic centerlines are sampled into broad satin surfaces with matching edges and highlights. The knot collar is part of the ribbon itself, repainted over the underpassing strand to show the crossing.

- 0–0.38 s: subtle box wiggle.
- 0.38–0.83 s: the right end takes up slack and becomes taut.
- 0.83–1.53 s: the left bight contracts while the pulled end lengthens.
- 1.32–1.90 s: the collar loosens into a visibly open curve.
- 1.90–2.78 s: the remaining bight and collar straighten into the other end.
- 2.80–3.57 s: the untied wrap peels away and settles below the gift, remaining visible.
- 3.60–4.90 s: the lid lifts, light and sparkles emerge, and the song card rises.

This is an authored 2.5D illusion, not a cloth simulation: it does not solve exact ribbon length, friction, or self-collision. SVG keeps it lightweight and crisp at this fixed viewing angle. For physically accurate twisting and knot contact from multiple angles, the next step would be a Blender ribbon/cloth animation rendered to video, or a baked 3D ribbon mesh played through WebGL. Those approaches would add assets and complexity.

This directory can later be served directly by GitHub Pages. Nothing has been committed or published as part of this prototype.
