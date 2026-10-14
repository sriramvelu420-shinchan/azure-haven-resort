# Azure Haven Resort

A responsive, single-page marketing website for a fictional tropical coastal luxury resort, built with **React + Vite** and **plain CSS** (no Tailwind, no component libraries).

> **Demo / portfolio project.** The booking form validates input, shows a confirmation message and confirms an **enquiry** — it does not talk to any booking backend, take payment, or hold a room.

---

## Theme

Tropical Coastal Luxury, using one consistent five-colour palette:

| Role          | Hex       | Used for                                             |
| ------------- | --------- | ---------------------------------------------------- |
| Ocean blue    | `#123B50` | Headings, dark buttons, body text, footer            |
| Turquoise     | `#20B8AA` | Accents, eyebrow labels, focus rings, hover states   |
| Warm sand     | `#F5E8D0` | Alternating section background, chips, mobile hover  |
| Sunset coral  | `#FF8066` | Primary call-to-action buttons, form error states    |
| White         | `#FFFFFF` | Cards, form surface, text on dark backgrounds        |

Headings use **Cormorant Garamond** (elegant serif); body text uses **Inter** (clean sans-serif). Both load from Google Fonts in `index.html`.

---

## Getting started

Requires **Node.js 18+** (built and tested on Node 24).

```bash
npm install
npm run dev
```

Then open the printed URL — by default <http://localhost:5173> (the dev server opens it for you).

### Other commands

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

### Windows note

If PowerShell blocks `npm` with a *"running scripts is disabled on this system"* error, use the `.cmd` shim instead:

```powershell
npm.cmd install
npm.cmd run dev
```

---

## Project structure

```
.
├── index.html          # HTML shell, meta tags, fonts, favicon
├── package.json
├── vite.config.js
└── src
    ├── main.jsx        # React entry point
    ├── App.jsx         # All components + content data
    └── App.css         # Complete stylesheet (design tokens → responsive rules)
```

Three source files, as requested — `App.jsx`, `App.css` and `main.jsx`.

---

## Page sections

1. **Navigation bar** — logo mark + wordmark, section links, "Book Now" button. Transparent over the hero, fades to a solid blurred bar on scroll. Collapses to an accessible dropdown menu on tablet/mobile.
2. **Hero** — full-width resort photograph with a directional gradient overlay, headline, supporting text, two calls to action and a "Discover" scroll cue.
3. **Introduction** — the resort's story, a layered image treatment, four key stats and a general manager's sign-off.
4. **Feature cards** — Oceanfront Living, Coastal Wellness and Bayview Dining, each a photo card with an overhanging icon badge.
5. **Room gallery** — six rooms/suites/villas with photograph, description, amenity chips, nightly price and a booking link that pre-fills the enquiry form.
6. **Booking enquiry** — validated form with check-in/check-out dates, guest selectors, room choice and an optional message, alongside contact details.
7. **Footer** — brand, two link columns, contact details and a legal row.

---

## How the code is organised

`App.jsx` keeps a **single source of truth** in plain JavaScript arrays near the top of the file:

- `NAV_LINKS` — navigation items
- `RESORT_STATS` — introduction statistics
- `HERO_HIGHLIGHTS` — hero bullet list
- `FEATURES` — the three feature cards
- `ROOMS` — the room gallery **and** the enquiry form's room dropdown

Components render from that data and are split by section, so each piece is small and easy to reason about:

`Navbar` · `Hero` · `Introduction` · `Features` / `FeatureCard` · `Rooms` / `RoomCard` · `BookingEnquiry` · `Footer`, plus small helpers (`SectionHeading`, `Icon`, `FieldError`).

### Adding or changing a room

Edit the `ROOMS` array in `src/App.jsx`:

```js
{
  id: "oceanfront-suite",
  name: "Oceanfront Suite",
  image: "https://images.unsplash.com/photo-...",
  alt: "Description for screen readers",
  price: 680,                 // shown as "From $680 / night"
  size: "68 m²",
  guests: "2 guests",
  view: "Ocean view",
  description: "One or two sentences about the room.",
}
```

The gallery grid, the "Book this room" links and the form dropdown all update automatically.

### Changing the palette

Every colour, radius, shadow and font is a CSS custom property in the `:root` block at the top of `src/App.css`. Change the five brand values there and the whole site follows.

---

## Form validation

`validateEnquiry()` checks the enquiry before it is accepted:

- **Name** — required, at least 2 characters
- **Email** — required, must look like an address
- **Phone** — optional, but must be a plausible number if given
- **Check-in** — required, cannot be in the past (`min` is today)
- **Check-out** — required, must be after check-in
- **Room** — required

Problems are shown inline under each field, wired up with `aria-invalid` / `aria-describedby` and `role="alert"`, and focus jumps to the first invalid field. On success the form is replaced by a confirmation panel that restates the dates, guest count and room — and states plainly that **no reservation exists until the reservations team confirms it in writing**.

---

## Accessibility & motion

- Skip-to-content link, semantic landmarks (`header` / `main` / `nav` / `footer`) and `aria-label`s on each nav region.
- Visible focus rings on all interactive elements.
- The mobile menu button exposes `aria-expanded` / `aria-controls` and closes on `Escape`.
- Decorative icons are `aria-hidden`.
- Smooth in-page scrolling via CSS, with `scroll-margin-top` so the fixed navbar never covers a heading.
- Sections fade up on scroll using `IntersectionObserver`, with a no-JavaScript fallback and a full `prefers-reduced-motion` override.

## Responsive behaviour

Breakpoints at **1080px**, **980px**, **720px** and **540px**. The room grid uses `auto-fit`/`minmax`, so it reflows fluidly; the intro, booking and footer layouts restack; and hero/feature typography scales with `clamp()`.

---

## Photography

Images are hot-linked from [Unsplash](https://unsplash.com) for demonstration purposes. Each is wrapped in a gradient or coloured container so a failed request degrades gracefully instead of leaving a blank gap. For production, download and self-host the images you have rights to, and replace the URLs in `src/App.jsx`.
