/* Silverback Fitness — site script
 *
 * FACTS (keep page text and JSON-LD in step with these):
 *   Business: Silverback Fitness, private one-on-one personal training studio
 *   Focus: rehab training for lower back and knee pain; form and technique
 *   Voice: always "we" / "us". Never name the trainer anywhere on the site (owner's request).
 *   Instagram: @aliisilverrback
 *   Phone: 647-893-1442   Email: shahinalii@yahoo.com
 *   Area: Greater Toronto Area (exact studio address: to confirm with the owner)
 *   Partner: Bulldog Nutrition, code SILVERBACK
 */

/* ---------- settings to fill in later ---------- */
// Paste the Behold feed ID (or the full https://feeds.behold.so/... URL) here.
// Until it's set, the Instagram section shows the saved posts already in the page.
const BEHOLD_FEED_ID = '';
const FEED_COUNT = 8;
// Optional form service (Formspree, Web3Forms, a Worker...). Empty = opens the visitor's email app.
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'shahinalii@yahoo.com';
const CONTACT_PHONE = '647-893-1442';

document.documentElement.classList.add('js');
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------- header, dock, spine rail ---------- */
const topBar = $('[data-top]'), dock = $('.dock'), verts = $$('.spine span');
function onScroll() {
  const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  topBar.classList.toggle('scrolled', y > 30);
  if (dock) dock.classList.toggle('show', y > innerHeight * 0.6);
  const p = max > 0 ? y / max : 0;
  verts.forEach((v, i) => v.classList.toggle('on', y > 40 && p >= i / verts.length));
}
addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- reveal on scroll ---------- */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }) : null;
$$('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

/* ---------- where does it hurt? ---------- */
const tabs = $$('[data-tab]'), anat = $('.anat');
function pick(name, focus) {
  tabs.forEach(t => {
    const on = t.dataset.tab === name;
    t.setAttribute('aria-selected', on);
    t.tabIndex = on ? 0 : -1;
    $('#' + t.getAttribute('aria-controls')).hidden = !on;
    if (on && focus) t.focus();
  });
  // light up the spine, the knee, or both ("lift right" covers both)
  const lit = z => name === 'lift' || name === z;
  $$('[data-zone]', anat).forEach(g => g.classList.toggle('on', lit(g.dataset.zone)));
  $$('[data-cap]', anat).forEach(c => c.classList.toggle('on', lit(c.dataset.cap)));
}
tabs.forEach((t, i) => {
  t.addEventListener('click', () => pick(t.dataset.tab));
  t.addEventListener('keydown', e => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (d) { e.preventDefault(); pick(tabs[(i + d + tabs.length) % tabs.length].dataset.tab, true); }
  });
});
if (tabs.length) pick('back');

/* "Book a back session" etc. preselect the form */
$$('[data-prefill]').forEach(a => a.addEventListener('click', () => {
  const sel = $('[data-contact-form] [name=area]');
  if (sel) sel.value = a.dataset.prefill;
}));

/* ---------- Instagram feed (Behold) ---------- */
const caption = p => (p.prunedCaption || p.caption || '').replace(/\s+/g, ' ').trim();
const imgOf = p => p.sizes?.medium?.mediaUrl || p.thumbnailUrl || p.mediaUrl || '';
const feedId = BEHOLD_FEED_ID.trim().replace(/^https?:\/\/feeds\.behold\.so\//, '');
if (feedId) {
  fetch('https://feeds.behold.so/' + encodeURIComponent(feedId))
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const posts = (Array.isArray(data) ? data : data.posts || []).filter(p => p.permalink && imgOf(p)).slice(0, FEED_COUNT);
      if (!posts.length) return;
      $('[data-feed-list]').innerHTML = posts.map(p => {
        const cap = caption(p);
        const vid = /video|reel/i.test(p.mediaType || '') || p.isReel;
        return `<li><a class="ig-tile${vid ? '' : ' photo'}" href="${esc(p.permalink)}" target="_blank" rel="noopener"><img src="${esc(imgOf(p))}" alt="${esc(cap ? cap.slice(0, 110) : 'Instagram post by @aliisilverrback')}" loading="lazy"><span class="ig-cap">${esc(cap.slice(0, 120))}</span></a></li>`;
      }).join('');
    })
    .catch(() => { /* keep the saved posts */ });
}

/* ---------- contact form ---------- */
const form = $('[data-contact-form]');
if (form) form.addEventListener('submit', async e => {
  e.preventDefault();
  const f = form.elements, st = $('[data-form-status]', form);
  const say = (msg, cls = '') => { st.textContent = msg; st.className = 'form-status ' + cls; };
  const data = { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), area: f.area.value, howlong: f.howlong.value, message: f.message.value.trim() };
  if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || !data.message) return say('Please add your name, a valid email and what you want to get back to.', 'bad');
  if (FORM_ENDPOINT) {
    say('Sending…');
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
      if (!r.ok) throw 0;
      form.reset();
      return say('Sent. We’ll be in touch soon.', 'ok');
    } catch (_) { return say(`Sending failed. Please call or text ${CONTACT_PHONE} or email ${CONTACT_EMAIL}.`, 'bad'); }
  }
  const body = `Name: ${data.name}\nPhone: ${data.phone || '-'}\nEmail: ${data.email}\nArea: ${data.area}\nHow long: ${data.howlong}\n\n${data.message}`;
  location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Training enquiry: ' + data.area)}&body=${encodeURIComponent(body)}`;
  say('Your email app should open with the message ready to send. Nothing happened? Call or text ' + CONTACT_PHONE + '.', 'ok');
});

const yr = $('[data-year]');
if (yr) yr.textContent = new Date().getFullYear();
