import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

const bundles = [
  'ENTHALPY — Core site.html',
  'ENTHALPY — Classes & schedule.html',
  'ENTHALPY — Pricing & memberships.html',
  'ENTHALPY — About & content.html',
  'ENTHALPY — Booking flow.html',
  'ENTHALPY — Member account.html'
];

if (!fs.existsSync('assets')) fs.mkdirSync('assets', { recursive: true });

const extMap = {
  'image/svg+xml': '.svg',
  'text/javascript': '.js',
  'image/png': '.png',
  'font/woff2': '.woff2',
  'text/css': '.css'
};

const pageTitleToFilename = {
  'ENTHALPY — Home': 'index.html',
  'ENTHALPY — New Here': 'new-here.html',
  'ENTHALPY — Mobile key screens': 'mobile-key-screens.html',
  'ENTHALPY — Liquid glass exploration': 'liquid-glass-exploration.html',
  'ENTHALPY — Page not found': '404.html',
  'ENTHALPY — Classes': 'classes.html',
  'ENTHALPY — Foundation Reformer': 'foundation-reformer.html',
  'ENTHALPY — Timetable': 'timetable.html',
  'ENTHALPY — Class finder': 'class-finder.html',
  'ENTHALPY — Instructors': 'instructors.html',
  'ENTHALPY — Instructor profile': 'instructor-profile.html',
  'ENTHALPY — Pricing': 'pricing.html',
  'ENTHALPY — Memberships': 'memberships.html',
  'ENTHALPY — Cancellation policy': 'cancellation-policy.html',
  'ENTHALPY — About': 'about.html',
  'ENTHALPY — Philosophy': 'philosophy.html',
  'ENTHALPY — The studio': 'studio.html',
  'ENTHALPY — Studio gallery': 'gallery.html',
  'ENTHALPY — Journal': 'journal.html',
  'ENTHALPY — Why the reformer uses springs': 'why-the-reformer-uses-springs.html',
  'ENTHALPY — Contact': 'contact.html',
  'ENTHALPY — FAQ': 'faq.html',
  'ENTHALPY — Booking: choose a pass': 'book-pass.html',
  'ENTHALPY — Booking: log in or register': 'book-login.html',
  'ENTHALPY — Booking: payment': 'book-checkout.html',
  'ENTHALPY — Booking confirmed': 'book-confirmed.html',
  'ENTHALPY — Booking states': 'booking-states.html',
  'ENTHALPY — My account': 'account.html',
  'ENTHALPY — My bookings': 'account-bookings.html',
  'ENTHALPY — Membership and payments': 'account-membership.html',
  'ENTHALPY — Profile and health': 'account-profile.html'
};

const linkRewrites = {
  'Main.dc.html': 'index.html',
  'New-Here.dc.html': 'new-here.html',
  'Classes.dc.html': 'classes.html',
  'Class-Detail.dc.html': 'foundation-reformer.html',
  'Timetable.dc.html': 'timetable.html',
  'Class-Finder.dc.html': 'class-finder.html',
  'Instructors.dc.html': 'instructors.html',
  'Instructor-Profile.dc.html': 'instructor-profile.html',
  'Pricing.dc.html': 'pricing.html',
  'Memberships.dc.html': 'memberships.html',
  'Legal.dc.html': 'cancellation-policy.html',
  'About.dc.html': 'about.html',
  'Philosophy.dc.html': 'philosophy.html',
  'Studio.dc.html': 'studio.html',
  'Gallery.dc.html': 'gallery.html',
  'Journal.dc.html': 'journal.html',
  'Article.dc.html': 'why-the-reformer-uses-springs.html',
  'Contact.dc.html': 'contact.html',
  'FAQ.dc.html': 'faq.html',
  'Book-Pass.dc.html': 'book-pass.html',
  'Book-Login.dc.html': 'book-login.html',
  'Book-Checkout.dc.html': 'book-checkout.html',
  'Book-Confirmed.dc.html': 'book-confirmed.html',
  'Account.dc.html': 'account.html',
  'Account-Bookings.dc.html': 'account-bookings.html',
  'Account-Membership.dc.html': 'account-membership.html',
  'Account-Profile.dc.html': 'account-profile.html'
};

function resolveArtifactLink(url, linkText) {
  const text = (linkText || '').toLowerCase();
  if (url.includes('BNLp3vKbjFLATdMCWVZodc')) { // Classes & schedule
    if (text.includes('timetable') || text.includes('times') || text.includes('see times')) return 'timetable.html';
    if (text.includes('finder') || text.includes('find my class')) return 'class-finder.html';
    if (text.includes('foundation')) return 'foundation-reformer.html';
    if (text.includes('instructor')) return 'instructors.html';
    if (text.includes('book')) return 'book-pass.html';
    return 'classes.html';
  }
  if (url.includes('9ZqEjVR6xdoxEZeiWDFUgT')) { // Pricing & memberships
    if (text.includes('membership')) return 'memberships.html';
    if (text.includes('policy') || text.includes('cancellation') || text.includes('privacy')) return 'cancellation-policy.html';
    return 'pricing.html';
  }
  if (url.includes('Rg5aLCdyQNx8fCWyEsDi8Z')) { // About & content
    if (text.includes('gallery')) return 'gallery.html';
    if (text.includes('studio')) return 'studio.html';
    if (text.includes('philosophy')) return 'philosophy.html';
    if (text.includes('journal')) return 'journal.html';
    if (text.includes('contact')) return 'contact.html';
    if (text.includes('faq') || text.includes('support')) return 'faq.html';
    return 'about.html';
  }
  if (url.includes('DWQxhWd61CUnVaKps9brWu')) { // Core site
    if (text.includes('new here')) return 'new-here.html';
    return 'index.html';
  }
  if (url.includes('B5bcuXRgK7J64ifyaVt76k')) { // Booking flow
    return 'book-pass.html';
  }
  if (url.includes('99PL4hTMRTTqgJ5kgFHyfq')) { // Intro offer
    return 'pricing.html';
  }
  return url;
}

const reactHeadSnippet = `
<script src="assets/2c7f4c9f-b29e-4897-a1dd-907e285e1842.js"></script>
<script src="assets/4a7bb0fb-ef5f-40ef-99af-b54dacd45b96.js"></script>
`.trim();

const generatedPages = [];

// Track all known dc-runtimes
const knownDcRuntimes = new Set();
const assetFiles = fs.readdirSync('assets');
for (const f of assetFiles) {
  if (f.endsWith('.js')) {
    const code = fs.readFileSync(path.join('assets', f), 'utf8');
    if (code.includes('GENERATED from dc-runtime')) {
      knownDcRuntimes.add(f.replace('.js', ''));
    }
  }
}

for (const bundle of bundles) {
  if (!fs.existsSync(bundle)) {
    console.log('Skipping missing bundle:', bundle);
    continue;
  }
  const content = fs.readFileSync(bundle, 'utf8');
  const manifestMatch = [...content.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)][1];
  const manifest = JSON.parse(manifestMatch[1]);

  for (const [id, entry] of Object.entries(manifest)) {
    if (entry.mime === 'text/html') {
      let buf = Buffer.from(entry.data, 'base64');
      if (entry.compressed) buf = zlib.gunzipSync(buf);
      const innerHtml = buf.toString('utf8');
      const innerScripts = [...innerHtml.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
      if (innerScripts.length < 5) continue;

      try {
        const innerManifest = JSON.parse(innerScripts[1][1]);
        let template = JSON.parse(innerScripts[4][1]);
        const titleM = /<title>(.*?)<\/title>/i.exec(template);
        const pageTitle = titleM ? titleM[1].trim() : id;
        const targetFilename = pageTitleToFilename[pageTitle] || (pageTitle.replace(/[^a-zA-Z0-9]/g, '_') + '.html');

        // Extract assets
        for (const [aid, asset] of Object.entries(innerManifest)) {
          const ext = extMap[asset.mime] || '.bin';
          const filename = aid + ext;
          const filePath = path.join('assets', filename);
          if (!fs.existsSync(filePath)) {
            let assetBuf = Buffer.from(asset.data, 'base64');
            if (asset.compressed) assetBuf = zlib.gunzipSync(assetBuf);
            fs.writeFileSync(filePath, assetBuf);
          }
          template = template.split(aid).join('assets/' + filename);
        }

        // Inject React & ReactDOM before dc-runtime
        // We find the dc-runtime script tag in this template
        let runtimeInjected = false;
        for (const runtimeId of knownDcRuntimes) {
          const targetStr = `<script src="assets/${runtimeId}.js"></script>`;
          if (template.includes(targetStr)) {
            template = template.replace(targetStr, `${reactHeadSnippet}\n${targetStr}`);
            runtimeInjected = true;
            break;
          }
        }
        if (!runtimeInjected) {
          // Fallback: inject right after <head>
          template = template.replace('<head>', `<head>\n${reactHeadSnippet}`);
        }

        // Rewrite known relative link filenames
        for (const [oldHref, newHref] of Object.entries(linkRewrites)) {
          template = template.split(`href="${oldHref}"`).join(`href="${newHref}"`);
          template = template.split(`href='${oldHref}'`).join(`href='${newHref}'`);
        }

        // Rewrite artifact links
        template = template.replace(/<a([^>]*?)href="(https:\/\/claude\.ai\/artifact\/[^"]+)"([^>]*?)>([\s\S]*?)<\/a>/gi, (match, p1, url, p2, inner) => {
          const resolved = resolveArtifactLink(url, inner);
          return `<a${p1}href="${resolved}"${p2}>${inner}</a>`;
        });

        // Ensure key CTA links point to correct pages
        template = template.replace(/<a([^>]*?)>Log in<\/a>/gi, '<a$1 href="account.html">Log in</a>');
        template = template.replace(/<a([^>]*?)>BOOK A CLASS<\/a>/gi, '<a$1 href="book-pass.html">BOOK A CLASS</a>');
        template = template.replace(/<a([^>]*?)>Book a class<\/a>/gi, '<a$1 href="book-pass.html">Book a class</a>');
        template = template.replace(/<a([^>]*?)>BOOK NOW<\/a>/gi, '<a$1 href="book-pass.html">BOOK NOW</a>');
        template = template.replace(/<a([^>]*?)>Book now<\/a>/gi, '<a$1 href="book-pass.html">Book now</a>');

        // Save page
        fs.writeFileSync(targetFilename, template, 'utf8');

        // If it's Home, also save as static-home.html backup
        if (targetFilename === 'index.html') {
          fs.writeFileSync('static-home.html', template, 'utf8');
        }

        generatedPages.push({
          title: pageTitle,
          file: targetFilename,
          size: template.length
        });
      } catch (err) {
        console.error('Error processing page', id, err.message);
      }
    }
  }
}

console.log(`\nSuccessfully processed and generated ${generatedPages.length} website pages:`);
generatedPages.forEach(p => {
  console.log(`  - ${p.file.padEnd(32)} | ${(p.size / 1024).toFixed(1)} KB | ${p.title}`);
});

