# Golden Hive Capital — public site

A public marketing/marketplace site for Golden Hive Capital's rental properties. Static React + Vite site,
no login, no database — properties live in a JSON file and photos live in plain folders.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. Edits to anything in `src/` hot-reload automatically.

To build for production:

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy anywhere that serves static files (Netlify, Vercel,
Cloudflare Pages, S3 + CloudFront, your existing host for goldenhivecapital.com, etc). `npm run preview` lets
you sanity-check the production build locally before deploying.

## Adding or editing a property

Everything about a property lives in `src/data/properties.json` as one object per property. To add a new
one, copy an existing entry and update the fields. A few notes on the fields that aren't self-explanatory:

- `id` — used in the URL (`/listings/<id>`) and as the photo folder name. Lowercase, hyphenated, no spaces.
- `status` — `"available"` or `"leased"`. Leased properties still show on the Listings page (filterable) as
  a quiet bit of portfolio proof — remove the entry entirely if you'd rather it disappear once leased.
- `address.street` / `address.showStreetPublicly` — the exact street address is hidden by default
  (`showStreetPublicly: false`). Flip it to `true` per-property if you're fine publishing the exact address
  before someone inquires.
- `construction.type` — must be one of `"concrete-block"`, `"masonry"`, or `"steel-frame"` — these map to the
  hexagon badge icon and label in `src/lib/constructionMeta.js`. Add a new type there if you acquire a
  property with a different qualifying construction method.
- `utilities.landlordPays` / `utilities.tenantPays` — arrays of utility names. The site shows whatever you
  actually cover (e.g. "Water, Sewer, Trash included") rather than a blanket "all utilities included" claim —
  don't add anything here that isn't true for this specific property, since it's a public-facing promise.
- `availableDate` — ISO date string (`"2026-10-01"`), shown on the detail page. Omit it if a property is
  available immediately or the date isn't firm yet.
- `leaseTerms` — optional object for the full lease policy (minimum lease length, deposit, pet/smoking policy,
  maintenance responsibilities, application requirements, etc). Shown in full on the detail page when present;
  just omit the object entirely for a property where you'd rather keep that out of the public page and only
  share terms once someone inquires. See `LEASE_TERM_LABELS` in `src/pages/PropertyDetail.jsx` for the exact
  keys it knows how to display.
- `featured` / `sortOrder` — `featured: true` properties (up to 3) show on the homepage; `sortOrder` controls
  display order on the Listings page.
- `location.streetViewEmbedUrl` — see below.

### Adding photos

Drop photos into `public/properties/<id>/`, named `cover.jpg` for the card/hero image and anything for the
rest of the gallery (`01.jpg`, `02.jpg`, ...), then reference those paths in `media.coverImage` and
`media.gallery`. Folders for the three sample properties already exist and are empty — until you add real
photos, the site shows a tasteful gradient placeholder with a "photo coming soon" tag instead of a broken
image, so nothing looks broken in the meantime.

### Getting a free Street View embed URL

This uses the free Google Maps embed (no API key, no billing account — different from the paid Street View
Static API):

1. Open [Google Maps](https://www.google.com/maps) and search the property's address.
2. Drag the little orange pegman onto the street in front of the property to enter Street View.
3. Click **Share or embed image** → **Embed a map** tab.
4. Copy the `src="..."` URL out of the `<iframe>` code Google gives you.
5. Paste just that URL into `location.streetViewEmbedUrl` for the property.

If you leave it blank, the detail page shows a small note instead of a broken embed.

## Contact form

Forms post to [Web3Forms](https://web3forms.com) — chosen over Formspree because it doesn't require
verifying each form endpoint by email before it'll accept submissions, which matters for a single-page-app
contact form. The free tier is generous for a site this size.

1. Get a free access key at web3forms.com (just an email address, no domain verification required to start).
2. Copy `.env.example` to `.env` and paste your key in:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your-real-key-here
   ```
3. Restart `npm run dev` after adding the key (Vite only reads `.env` on startup).

This key is meant to be exposed in client-side code — Web3Forms's anti-spam protection lives on their end,
not in keeping the key secret. `.env` is gitignored regardless, so it won't get committed.

If you'd rather use Formspree instead, the only change needed is in `src/components/InquiryForm.jsx`: swap
the `fetch` URL for `https://formspree.io/f/<your-form-id>` and drop the `access_key` field — Formspree
identifies the form by the URL itself.

## Deploying (domain registered at GoDaddy, hosted elsewhere)

`_redirects` (for Netlify) and `vercel.json` (for Vercel) are already in this project, so client-side routed
pages like `/listings/maple-grove-duplex` resolve correctly instead of 404ing on either host.

1. Push this project to a GitHub (or GitLab) repo.
2. Create a free account on [Netlify](https://netlify.com) or [Vercel](https://vercel.com), and connect that
   repo. Both auto-detect a Vite project — build command `npm run build`, publish directory `dist`.
3. Once it deploys, you'll get a free subdomain (like `golden-hive.netlify.app`) — check the live site there
   before touching the real domain.
4. In the host's dashboard, add `goldenhivecapital.com` as a custom domain. It'll give you DNS records to add
   (usually an A record and/or a CNAME for `www`).
5. Log into GoDaddy → **My Products** → **DNS** for the domain, and add those records there. The domain stays
   registered at GoDaddy; you're only changing where its DNS points.
6. DNS changes can take anywhere from a few minutes to a few hours to propagate. The host will show the
   domain as verified (and auto-provision free HTTPS) once it sees the new records.

Both hosts also support dragging a built `dist/` folder straight into their dashboard for a one-off deploy
without git, if you want to see it live before setting up the repo-connected version.

## Project structure

```
src/
  components/      Header, Footer, ListingCard, HexBadge, StatusPill, InquiryForm
  components/icons Construction-type icon glyphs
  data/             properties.json — the entire property database
  lib/               constructionMeta.js — maps construction type → label + icon
  pages/             Home, Listings, PropertyDetail, About, Contact
  assets/             logo-mark.svg (hex + monogram), logo-full.png (full lockup)
public/
  properties/<id>/    photo folders, one per property
```

## Design tokens

Colors, fonts, and the hexagon badge clip-path live in `tailwind.config.js` and `src/index.css` as the
single source of truth — change a value once there and it updates everywhere. The gold gradient
(`#F7E7A6 → #D6BC63 → #A8862C`) and Cinzel/EB Garamond pairing match the existing brand assets exactly.
