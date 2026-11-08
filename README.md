# Silverback Fitness — website

Website for **Silverback Fitness**, a private, one-on-one personal training studio focused on lower back and knee pain (Instagram [@aliisilverrback](https://www.instagram.com/aliisilverrback/)).

Live: https://alisilverback.ca/ (Cloudflare Worker "silverback-fitness"). The GitHub Pages copy at https://jdix22.github.io/silverback-fitness/ points its canonical at the .ca.

**Voice rule (owner's request):** never name the trainer anywhere on the site. All copy speaks as "we" / "us".

Everything on the page comes from his Instagram bio, his post captions and the contact details Jordan supplied. Nothing is invented: there are no made-up reviews, prices, credentials or years in business.

## What's on the page

- **Hero**: his logo (background removed for the dark design), a brushed-silver "saddle" stroke, call and book buttons.
- **Where does it hurt?**: tabs for lower back, knees, or "just want to lift right". A silver spine and knee diagram lights up the chosen area. Each tab's book link pre-selects that area in the form.
- **The Silverback method**: Assess, Rebuild, Load, Lead.
- **Why "Silverback"?**: the gorilla idea, kept short: the silverback leads and protects the troop, and the silver is earned.
- **About us**: the "quit a day job and opened the studio at 25" story, linked to the reel.
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

## Open questions for the owner

1. **Name**: settled. No personal name on the site; "we" / "us" throughout.
2. **Studio location**: the city or address. The site says "Greater Toronto Area" and "address sent when you book" for now. A real city helps Google and AI search a lot.
3. **Credentials**: any personal training certifications (CSEP, NASM, CanFitPro, kinesiology degree)? They'd go in the About section and the structured data.
4. **Prices and packages**: single sessions, packs, online coaching? Is there a free first consult?
5. **Hours**: by appointment only, or set hours?
6. **One-on-one only**: does he also run small groups or online programs?
7. **Client results and testimonials**: permission to put 3–4 of them (with first names and photos) directly on the site. This is the biggest trust boost available.
8. **Mission line**: his bio says "without the use of modern medicine". The site quotes only "To inspire a generation of lifters" to stay clear of health-claim trouble. Is that OK?
9. **Booking**: does he use a booking app (Calendly, Square, Mindbody)? It can be embedded.
10. **Domain**: settled, alisilverback.ca.
11. **Photos**: a few clean photos of the studio and of him coaching (no text on them) would replace the reel stills.

## Launch (done 2026-11-07)

- noindex removed (kept on `404.html`); canonical, og, JSON-LD, `robots.txt` and `sitemap.xml` point at https://alisilverback.ca/.
- Still to do once confirmed: studio address and hours on the page and in the JSON-LD; the owner sets up a Google Business Profile with the same name, phone and category ("Personal trainer").
- Redeploy after any change: `wrangler deploy` in this folder (git push only updates the GitHub Pages copy). Bump `?v=` on the CSS/JS links each time.

## Files

- `index.html`: the page. `404.html`: not-found page.
- `assets/css/site.css`, `assets/js/site.js` (Behold and form settings at the top).
- `assets/img/`: logo, header mark, Instagram stills. `assets/og.png`: social preview.
- `_src/`: logo cutouts and the cards used to make the social image and icons (not published by GitHub Pages).
- Local preview: server "silverback-fitness" on port 8815.

Website designed by [jdix.ca](https://jdix.ca).
