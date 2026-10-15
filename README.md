# HEROines Inc. — About page

A pixel-focused rebuild of the supplied About-page design, in **plain HTML + CSS**
(no JavaScript, no build step, no frameworks).

## Files

```
index.html      markup for the hero block + about band
styles.css      all styling, design tokens at the top
images/hero.jpg the hero photograph
```

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

## How the design is built

The page is one framed *strip* (`.page`, 1300 px max) sitting on the blush page
background, made of two stacked blocks:

1. **Hero** (`.hero`, 664 px tall) — a two-column grid: an empty peach pane on the
   left and the photograph on the right. The photograph is `object-fit: cover`, so it
   never distorts at other widths. Absolutely positioned over both panes are the main
   navigation, the headline and the vertical **Donate** button.
2. **About band** (`.about`, 701 px tall) — a three-column grid whose middle column
   carries the copy; `min-height` plus centred flex content puts the copy on the
   design's optical centre line.

Colour and type values were sampled from the reference artwork and live in `:root`:

| token    | value     | used for                        |
| -------- | --------- | ------------------------------- |
| `--bg`   | `#fed7cc` | page background                 |
| `--peach`| `#ffbeb0` | hero pane                       |
| `--pink` | `#fec3d7` | about — left column             |
| `--orange`| `#f77a5c`| about — right accent column     |

Font: **Avenir Next** when available (with the same 400/700/800 weights) and
**Nunito Sans** from Google Fonts as the closest free substitute, so the page looks
right everywhere. `Arial`/`Helvetica` are the final fallbacks.

## Responsive behaviour

The single fixed-width layout is the design; below `1024 px` the same content
re-flows into one column, keeping the reading order — navigation, headline, donate,
photograph, then the about band (with its accent column kept as a colour band).
Below `520 px` the type scales down a little further.
