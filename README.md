# HEROines Inc. — About & Events

An About page with a featured-story hero slideshow and an Events page built on
the same frame. Plain HTML/CSS plus a small vanilla JavaScript enhancement — no
build step or frameworks.

## Files

```
index.html            About page — featured hero + about band
events.html           Events page — static banner + event list
styles.css            styling shared by both pages
hero-slideshow.js     slide data, navigation and autoplay (About page only)
images/hero.jpg       original first-slide photograph
images/community.jpg  community slide photograph
images/workshop.jpg   workshop slide photograph
```

## Run it

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

## How the design is built

The page is one framed *strip* (`.page`, 1300 px max) sitting on the blush page
background, made of two stacked blocks:

1. **Hero** (`.hero`, 664 px tall) — a peach pane on the left and a photo pane on
   the right. The About page overlays the featured story and slideshow controls;
   the Events page has a static event banner. Photographs use `object-fit: cover`.
   The navigation and vertical **Donate** button sit over both panes.
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
| `--hero-ink`| `#57232b`| readable story copy on peach   |

Font: **Avenir Next** when available (with the same 400/700/800 weights) and
**Nunito Sans** from Google Fonts as the closest free substitute, so the page looks
right everywhere. `Arial`/`Helvetica` are the final fallbacks.

## About hero slideshow

The three slides in `hero-slideshow.js` each define a label, eyebrow, title,
description, local image, descriptive alt text and destination link. To edit or
add a slide, update that array; use `\n` in titles where you want a desktop line
break. Keep the first entry in sync with the HTML in `index.html`: its copy and
photo render even if JavaScript is unavailable.

The slideshow changes image and copy together, preloads the additional images,
and advances every seven seconds. Visitors can use Previous/Next, numbered
slide buttons, and Pause/Play. Manual selection pauses autoplay until Play is
pressed. Autoplay pauses while the hero is hovered, focused or in a hidden
tab; an explicit Play press resumes it even while that button has focus.
Reduced-motion preferences turn autoplay and visual transitions off;
controls remain available. Only user-initiated slide changes are announced to
screen readers.

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

The framed desktop layout stacks below `1180 px`: navigation, story copy,
slideshow controls, donate button, photograph, then the About band (with its
accent column kept as a colour band). Below `520 px` the type and controls scale
down further.

The events page follows the same breakpoints: the banner stacks under the nav, each
event becomes a two-column row (date chip + copy) with the button on its own line,
and the Signature and host bands turn into single-column blocks.
