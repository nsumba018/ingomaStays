# Ingoma Homes — Next.js frontend

Desktop site for Ingoma Homes, a Rwandan hospitality company operating two
serviced apartment buildings in Kigali: **Keza Apartments** (Kicukiro) and
**Liza Apartments** (Nyarugenge). Ported from the `Ingoma Stays Desktop.dc.html`
design in the *Ingoma Stays mobile prototype* Claude Design project.

## Running

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start
```

## Layout

```
app/
  layout.tsx        DM Sans + DM Serif Display via next/font, global CSS
  page.tsx          mounts <IngomaApp currency="USD" />
  globals.css       reset, keyframes, hover utilities
lib/
  types.ts          Building / Unit / State types
  data.ts           the two buildings, their 19 units each, galleries, reviews
  images.ts         img() tag-based photo resolver, ph() placeholder generator
  store.tsx         IngomaProvider — all state and every derived value
  css.ts            s() CSS-string → React style object
components/
  IngomaApp.tsx     provider + screen switch
  Nav.tsx           sticky header, publishes its height as --hdr
  Footer.tsx
  BookingModal.tsx  5-step reservation flow + confirmation
  GalleryLightbox.tsx
  screens/          Home, Homes, Destinations, Experiences, About,
                    Contact, Saved, Dashboard, Detail
public/assets/      69 photos (19 Keza interiors, hero, 49 stock)
```

## How it works

**Screens, not routes.** The design is a single-surface prototype: `state.screen`
selects which screen renders, and every nav action goes through the store. There
is one route (`/`). Moving a screen to its own URL later means lifting that one
field into the router.

**State lives in one place.** `lib/store.tsx` holds the `State` object and a
`derive()` function that turns it into every value the screens read — labels,
prices, computed styles and click handlers. Screens are presentational: they read
from `useIngoma()` and render. This mirrors how the design source was written and
keeps pricing and availability logic in a single file.

**Availability is date-driven.** Each of the 19 units per building carries booked
day-ranges. Changing check-in/check-out re-resolves occupancy, which flows through
to the unit grid, the "N of 19 units free" summary, the filter counts and the
total. The cheapest available unit is auto-selected.

**Styling.** Static styling is kept as the design's original CSS text and parsed
by `s()` in `lib/css.ts` (cached per unique string). Dynamic styles that depend on
state are plain objects, exactly as in the source. Hover treatments — which the
design expressed as `style-hover` attributes — are the `hv-*`, `zoom*` and `lift*`
classes in `globals.css`.

**Fonts.** Loaded with `next/font/google` and exposed as CSS variables. Body text
inherits DM Sans; headings opt into DM Serif Display with `className="serif"`.

## Notes

- The design is fixed-width desktop (`min-width: 1280px`), carried over as-is.
  There is no mobile breakpoint yet.
- Liza's interior photography has not been shot. Those slots render the hatched
  "photo coming soon" placeholder from `ph()`, as designed.
- Map pins on the Our Homes screen are positioned by percentage over an
  OpenStreetMap embed and are approximate until street addresses are confirmed.
- Forms (contact, newsletter, payment, message composer) are presentational —
  no submit handlers are wired to a backend.
