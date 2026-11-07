# Silverback Fitness — website prototype

Client prototype for **Silverback Fitness**: Ali's private, one-on-one personal training studio focused on lower back and knee pain (Instagram [@aliisilverrback](https://www.instagram.com/aliisilverrback/)).

Live preview: https://jdix22.github.io/silverback-fitness/

Everything on the page comes from his Instagram bio, his post captions and the contact details Jordan supplied. Nothing is invented: there are no made-up reviews, prices, credentials or years in business.

## What's on the page

- **Hero**: his logo (background removed for the dark design), a brushed-silver "saddle" stroke, call and book buttons.
- **Where does it hurt?**: tabs for lower back, knees, or "just want to lift right". A silver spine and knee diagram lights up the chosen area. Each tab's book link pre-selects that area in the form.
- **The Silverback method**: Assess, Rebuild, Load, Lead.
- **Why "Silverback"?**: the gorilla idea, kept short: the silverback leads and protects the troop, and the silver is earned.
- **About Ali**: his "quit my day job and opened my own gym at 25" story, linked to his reel.
- **Results**: links to his Client Results and Testimonials highlights, plus the Bulldog Nutrition code SILVERBACK.
- **FAQ**, **Instagram feed** (8 posts), **contact form**, footer.
- Silverback touches throughout: a vertebrae scroll rail on wide screens that lights up silver as you scroll, "Join the troop on Instagram", "the silver is earned."

## Instagram feed (Behold)

The feed currently shows 8 of his recent reels saved into the site as placeholders. To make it live:

1. Create a free Behold.so feed connected to @aliisilverrback (JSON feed type).
2. Open `assets/js/site.js` and paste the feed ID (or the whole `https://feeds.behold.so/...` link) into `BEHOLD_FEED_ID`.
3. Bump `?v=2` on the CSS/JS links in `index.html` and push.

If the feed ever fails to load, the saved posts stay on the page.

## Contact form

The form opens the visitor's email app with the message filled in, addressed to shahinalii@yahoo.com. To have it send directly, put a form service URL (Formspree, Web3Forms or a Worker) into `FORM_ENDPOINT` in `assets/js/site.js`.

## Questions for Ali before launch

1. **Name**: is "Ali" how he wants to appear? (The email suggests Shahin Ali.) Any surname or nickname?
2. **Studio location**: the city or address. The site says "Greater Toronto Area" and "address sent when you book" for now. A real city helps Google and AI search a lot.
3. **Credentials**: any personal training certifications (CSEP, NASM, CanFitPro, kinesiology degree)? They'd go in the About section and the structured data.
4. **Prices and packages**: single sessions, packs, online coaching? Is there a free first consult?
5. **Hours**: by appointment only, or set hours?
6. **One-on-one only**: does he also run small groups or online programs?
7. **Client results and testimonials**: permission to put 3–4 of them (with first names and photos) directly on the site. This is the biggest trust boost available.
8. **Mission line**: his bio says "without the use of modern medicine". The site quotes only "To inspire a generation of lifters" to stay clear of health-claim trouble. Is that OK?
9. **Booking**: does he use a booking app (Calendly, Square, Mindbody)? It can be embedded.
10. **Domain**: e.g. silverbackfitness.ca, if he wants one.
11. **Photos**: a few clean photos of the studio and of him coaching (no text on them) would replace the reel stills.

## Launch checklist

- Remove `<meta name="robots" content="noindex">` from `index.html` (keep it on `404.html`).
- Point canonical, og:url, og:image, JSON-LD URLs, `robots.txt` and `sitemap.xml` at the real domain.
- Add the studio address and hours to the page and the JSON-LD once he confirms them.
- Ali sets up a Google Business Profile with the same name, phone and category ("Personal trainer").

## Files

- `index.html`: the page. `404.html`: not-found page.
- `assets/css/site.css`, `assets/js/site.js` (Behold and form settings at the top).
- `assets/img/`: logo, header mark, Instagram stills. `assets/og.png`: social preview.
- `_src/`: logo cutouts and the cards used to make the social image and icons (not published by GitHub Pages).
- Local preview: server "silverback-fitness" on port 8815.

Website designed by [jdix.ca](https://jdix.ca).
