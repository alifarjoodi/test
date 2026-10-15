# HEROines Inc. — About & Events

A pixel-focused rebuild of the supplied About-page design plus an Events page
built on the same frame — all in **plain HTML + CSS** (no JavaScript, no build
step, no frameworks).

## Files

```
index.html      About page — hero block + about band
events.html     Events page — the same hero block + the event list
styles.css      all styling, shared by both pages, design tokens at the top
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
| `--accent`| `#8a0c0c`| navbar hover + events page      |

Font: **Avenir Next** when available (with the same 400/700/800 weights) and
**Nunito Sans** from Google Fonts as the closest free substitute, so the page looks
right everywhere. `Arial`/`Helvetica` are the final fallbacks.

## Navbar hover

The nav links are wrapped as `.nav__link > .nav__label` so the hover animation has
two independent parts:

1. **Colour** — the label and the brand settle into the accent red **`#8A0C0C`**
   over `.34s` (`--dur` / `--ease` tokens, one shared easing everywhere).
2. **Motion** — the label opens up a hair (`letter-spacing: .5px`) and lifts `1px`,
   while a 2 px rule sweeps out **from the centre** (`transform: scaleX(0 → 1)`).

The active item, which is already black, also swings to `#8A0C0C` on hover. Links
that sit over the photograph (`.nav__item--photo`) draw their rule in white so it
stays visible; everything else draws it in the accent red. `:focus-visible` runs the
same animation for keyboard users, and `prefers-reduced-motion: reduce` switches the
transitions off.

## Events page

`events.html` reuses the About page's frame — same `.page` strip, same 664 px hero
block, same navigation, headline and vertical **Donate** button — so the two pages
read as one site. What changes:

- the flat hero pane is **pink** instead of peach, and the headline is replaced by
  a banner (eyebrow, `Events`, lede and a row of stat numbers);
- the band under the hero is the **event list** instead of the about columns;
- it closes with a **Signature series** band (pink vertical title / white list /
  orange accent column — the about band's three-column rhythm) and a
  `#8A0C0C` host call-to-action band.

Hover behaviour carries over from the navbar: the event row opens its padding, a
red rule scales in down its left edge, the date chip fills with `#8A0C0C`, the title
turns red and the pill button inverts to red-on-white.

## Responsive behaviour

The single fixed-width layout is the design; below `1024 px` the same content
re-flows into one column, keeping the reading order — navigation, headline, donate,
photograph, then the about band (with its accent column kept as a colour band).
Below `520 px` the type scales down a little further.

The events page follows the same breakpoints: the banner stacks under the nav, each
event becomes a two-column row (date chip + copy) with the button on its own line,
and the Signature and host bands turn into single-column blocks.
