# Design

"Production, live": a dark, rich portfolio whose hero shows the product working. Recorded from the built site (`app/globals.css`).

## Color

| Token | Dark (default) | Light | Role |
|---|---|---|---|
| `--bg` | #070d0b | #f4f7f5 | Page ground |
| `--bg-glow` | #0f3b31 | #d4efe4 | Radial glow, top right |
| `--surface` | #0d1714 | #ffffff | Architecture steps |
| `--fg` | #e9f3ef | #0b1a15 | Text |
| `--muted` | #9fb7ad | #4f625a | Secondary text |
| `--line` | #1f3a32 | #d3ded9 | Hairlines, chip borders |
| `--accent` | #4cc7a5 | #0b7a62 | Headline second line, CTAs, status, org names |

Theme: saved choice, else system preference, applied before paint by an inline script; toggle in the nav. The phone mockup stays dark in both themes.

## Type

- Display: Bricolage Grotesque 600–800 (hero 44–84px, -0.035em; section titles 32–48px).
- Body: Geist 16px / 1.6; secondary 13.5–15px.

## Layout

- 1200px container, 16px gutter (40px from 760px). Sticky translucent nav.
- Hero: 1.2fr copy / 0.8fr phone from 980px, stacked below. Phone 600px tall (460px under 980px), tilted 2.5°.
- Projects are full-width rows split by hairlines (300px name column from 900px), never a card grid.

## Components

- Buttons 50px tall, 12px radius: primary filled accent, ghost hairline.
- Chips: 13px, 8px radius, hairline border.
- Architecture: 2-column grid of steps inside a 14px-radius hairline frame, opened by a text toggle with a rotating chevron.
- Timeline: left hairline with dots; current roles filled with accent.

## Motion

- One authored moment: the phone conversation loops (typing dots, bubbles rising with a slight blur), off under reduced motion.
- Architecture reveals with a clip-path wipe; language change cross-fades with a short blur. Status dot pings.
