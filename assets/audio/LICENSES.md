# CHIME opening sounds — sources and licences

These are excerpts of existing sound recordings, not synthesized fabric noise.
The runtime applies quiet gain envelopes and a few reusable EQ/playback-rate
variations. They suggest material differences; these are not separate recordings
of satin, velvet, organza and jute.

## Fabric foley: slide.wav, fall.wav, dry.wav

- Work: **Fabric Rustling** by **Iochi Glaucus**, 8 March 2022.
- Source: <https://opengameart.org/content/fabric-rustling>
- Original file: <https://opengameart.org/sites/default/files/rustling.ogg>
- Licence: **CC0 1.0** — <https://creativecommons.org/publicdomain/zero/1.0/>
- The author describes a leg-warmer recording made with an AT2020 microphone,
  already compressed and noise-reduced.
- Edits: mono, 22,050 Hz / 16-bit PCM; DC removal, short cosine fades, peak
  normalisation to 0.6. Source excerpts: slide 0.70–1.75 s; fall 11.35–12.25 s;
  dry 13.13–14.23 s.
- Original SHA-256: `897C0937041AFDF3581427B80A7546F99D219D0008E12FF5500C2AFDFA4B7A1E`.

## Lid: lid.wav

- Work: **Wooden box lid opening and closing** by **Benjamin152**, 31 October 2018.
- Source: <https://freesound.org/people/Benjamin152/sounds/445149/>
- Downloaded recording: the author's HQ MP3 preview,
  <https://cdn.freesound.org/previews/445/445149_9224153-hq.mp3>.
- Licence: **Creative Commons Attribution 3.0 Unported** —
  <https://creativecommons.org/licenses/by/3.0/>.
- Attribution: “Wooden box lid opening and closing” by Benjamin152, Freesound,
  licensed CC BY 3.0. Edited for CHIME 2026. No endorsement is implied.
- Edits: excerpt 1.05–1.61 s; mono, 22,050 Hz / 16-bit PCM; DC removal,
  16 ms fade-in and 140 ms fade-out; peak normalisation to 0.4. Playback adds
  gentle filtering and attenuation. This is wood-on-wood lid foley, not a
  cardboard tearing recording.
- Original SHA-256: `A64999EC02A9E0B234A14BBE2AE35AD2D96146C0B42783F2C559487D19739D51`.

## Legacy reveal: chime.wav (retained, no longer played)

- Work: **bell_ding2.wav**, from **Bell dings/chimes** by **PWL**, 21 January 2016.
- Source: <https://opengameart.org/content/bell-dingschimes>
- Original file: <https://opengameart.org/sites/default/files/bell_ding2.wav>
- Licence: **CC0 1.0** — <https://creativecommons.org/publicdomain/zero/1.0/>
- Edits: excerpt 0.015–1.165 s; mono, 22,050 Hz / 16-bit PCM; DC removal,
  4 ms fade-in and 150 ms fade-out; peak normalisation to 0.5.
- Original SHA-256: `E4A764A1E0A6284F5A5EC80CAF3D44C76D3FF8DB17DDAB8B42ABB6B143E83529`.

`samples.js` embeds these exact five edited WAV files as base64 so opening
`index.html` directly from disk also works, without cross-origin fetches.
Keep this attribution file with the assets when copying or publishing the site.
The edited lid excerpt remains available under CC BY 3.0; the other edited
recordings retain their CC0 dedication. Code licensing is separate.

## Current signature reveal: ivan_luzan-christmas-and-new-year-logo-181244.mp3

Supplied by the project owner as the CHIME 2026 signature reveal sound.
Copied byte for byte from `ivan_luzan-christmas-and-new-year-logo-181244.mp3`, without
trimming, resynthesis, EQ or playback-rate changes. Runtime gain is 0.24
through the existing 0.8 master gain. The full recording plays at the card
reveal, including its natural decay. Reset, design switching or hiding the
page still cancels playback. No third-party licence is inferred for this
supplied recording. Its exact bytes are also embedded in `samples.js` for
direct-from-disk previews.
