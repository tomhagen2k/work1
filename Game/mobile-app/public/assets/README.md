# Asset provenance

- `scenes/c1_man_01.webp`: byte-for-byte copy of `Game/demo/canh/c1_man_01.webp`; SHA-256 `ec830ec8edce7971df413c033c453e20dd31c826ba7955399e1dbf5c5aa5e3ee`. World bounds `[-600,-250,3150,1750]` from the demo manifest. Original remains unchanged.
- `scenes/van-white.svg`: original default van geometry/colors from demo v1.5 `SKIN.svg('v0')`, expressed as a standalone SVG asset. No legacy game runtime is bundled.
- `fonts/*.woff2`: unmodified Nunito v32 font resources used by the P0 demo baseline. URLs and hashes are in `fonts/sources.json`. The accompanying `fonts/OFL.txt` retains copyright and the SIL Open Font License 1.1 from the official Google Fonts repository.

Current UI scope is Chapters 1 and 2. Only the C1L1 scene is imported for the first UI task; Chapters 3 and 4 are deferred. This directory does not establish new licensing rights over the project's original artwork.
