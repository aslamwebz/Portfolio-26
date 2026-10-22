# Inter font assets

Inter is copyright The Inter Project Authors and is distributed under the SIL Open Font License in `OFL.txt`.

- `Inter.ttf`: bundled Inter source used by the server's social-card renderer.
- `Inter-Portfolio.woff2`: derived from Filament's bundled `inter-latin-wght-normal-DIHYUR35.woff2`; variable weights 400–700, without hinting, with Basic Latin, Latin-1, general punctuation and arrows retained. Other scripts use the CSS system-font fallback.

The web subset was produced with FontTools 4.67.0: `instantiateVariableFont(font, {'wght': (400, 700)}, inplace=True)`, followed by `subset.Subsetter` for U+0020–007E, U+00A0–00FF, U+2000–206F and U+2190–21FF, `hinting=False`, saved with `flavor='woff2'`. This is a build-time asset transformation; FontTools is not a runtime application dependency.
