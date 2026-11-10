import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  classes,
  instructors,
  products,
  studioSettings,
  generateSessions
} from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory state
const { dates, sessions } = generateSessions();
const holds = new Map();
const bookings = [
  {
    id: 'ENT-2026-9041',
    sessionId: sessions[0].id,
    sessionDate: sessions[0].date,
    sessionTime: sessions[0].time,
    className: sessions[0].className,
    instructorName: sessions[0].instructorName,
    memberName: 'Priya Sharma',
    memberPhone: '+91 98450 12345',
    passName: '10-Class Pack',
    status: 'checked_in',
    checkedInAt: '06:52 AM',
    paymentMethod: 'Pack Credit (Balance: 7 left)',
    amountPaise: 170000,
    bookedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'ENT-2026-9042',
    sessionId: sessions[0].id,
    sessionDate: sessions[0].date,
    sessionTime: sessions[0].time,
    className: sessions[0].className,
    instructorName: sessions[0].instructorName,
    memberName: 'Rohan Mehta',
    memberPhone: '+91 98201 67890',
    passName: 'Unlimited Monthly',
    status: 'checked_in',
    checkedInAt: '06:55 AM',
    paymentMethod: 'AutoPay Mandate',
    amountPaise: 220000,
    bookedAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: 'ENT-2026-9043',
    sessionId: sessions[0].id,
    sessionDate: sessions[0].date,
    sessionTime: sessions[0].time,
    className: sessions[0].className,
    instructorName: sessions[0].instructorName,
    memberName: 'Kavita Iyer',
    memberPhone: '+91 99160 55443',
    passName: 'First-Timer Intro Offer',
    status: 'confirmed',
    paymentMethod: 'UPI (GPay / PhonePe)',
    amountPaise: 150000,
    bookedAt: new Date(Date.now() - 14400000).toISOString()
  }
];

const memberProfiles = new Map([
  ['+91 98450 12345', {
    name: 'Priya Sharma',
    phone: '+91 98450 12345',
    email: 'priya.s@example.com',
    plan: '10-Class Pack',
    creditsRemaining: 7,
    healthWaiverSigned: true,
    injuriesNote: 'Neck and C5 tension'
  }]
]);

// ── REST API ROUTES ──

// 1. Catalogue & Schedule
app.get('/api/classes', (req, res) => res.json(classes));

app.get('/api/classes/:slug', (req, res) => {
  const cls = classes.find(c => c.slug === req.params.slug);
  if (!cls) return res.status(404).json({ error: 'Class not found' });
  res.json(cls);
});

app.get('/api/instructors', (req, res) => res.json(instructors));

app.get('/api/timetable', (req, res) => {
  res.json({ dates, sessions });
});

app.get('/api/products', (req, res) => res.json(products));

app.get('/api/settings', (req, res) => res.json(studioSettings));

// 2. Booking Engine: Seat Hold Lock
app.post('/api/holds', (req, res) => {
  const { sessionId, passId, memberPhone, memberName } = req.body;
  const session = sessions.find(s => s.id === sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  const now = Date.now();
  let activeHoldsCount = 0;
  for (const [hId, hold] of holds) {
    if (hold.sessionId === sessionId && hold.expiresAt > now) {
      activeHoldsCount++;
    }
  }

  const effectiveSpots = Math.max(0, session.capacity - session.booked - activeHoldsCount);
  if (effectiveSpots <= 0) {
    return res.status(409).json({
      error: 'This class has just filled up. Would you like to join the waitlist?',
      waitlistAvailable: true
    });
  }

  const holdId = `hold_${Math.random().toString(36).substring(2, 10)}`;
  const ttlMs = studioSettings.seatHoldTtlMinutes * 60 * 1000;
  const expiresAt = now + ttlMs;

  const newHold = {
    id: holdId,
    sessionId,
    passId,
    memberPhone: memberPhone || '',
    memberName: memberName || '',
    expiresAt,
    ttlSeconds: studioSettings.seatHoldTtlMinutes * 60
  };

  holds.set(holdId, newHold);

  res.json({
    success: true,
    hold: newHold,
    session: {
      id: session.id,
      className: session.className,
      date: session.date,
      time: session.time,
      instructor: session.instructorName
    }
  });
});

app.get('/api/holds/:id', (req, res) => {
  const hold = holds.get(req.params.id);
  if (!hold) return res.status(404).json({ error: 'Hold expired or not found' });

  const remainingMs = hold.expiresAt - Date.now();
  if (remainingMs <= 0) {
    holds.delete(req.params.id);
    return res.status(410).json({ error: 'Seat hold expired' });
  }

  res.json({
    valid: true,
    remainingSeconds: Math.ceil(remainingMs / 1000),
    hold
  });
});

// 3. Confirm Booking
app.post('/api/bookings', (req, res) => {
  const { holdId, memberName, memberPhone, paymentMethod, passName } = req.body;

  let session;
  if (holdId) {
    const hold = holds.get(holdId);
    if (hold) {
      session = sessions.find(s => s.id === hold.sessionId);
      holds.delete(holdId);
    }
  }

  if (!session && req.body.sessionId) {
    session = sessions.find(s => s.id === req.body.sessionId);
  }

  if (!session) {
    return res.status(400).json({ error: 'Invalid session or expired hold' });
  }

  session.booked = Math.min(session.capacity, session.booked + 1);
  session.spotsLeft = Math.max(0, session.capacity - session.booked);
  session.isFull = session.spotsLeft === 0;

  const bookingId = `ENT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const booking = {
    id: bookingId,
    sessionId: session.id,
    sessionDate: session.date,
    sessionTime: session.time,
    className: session.className,
    instructorName: session.instructorName,
    memberName: memberName || 'Valued Member',
    memberPhone: memberPhone || '+91 98450 00000',
    passName: passName || 'Single Class Drop-in',
    status: 'confirmed',
    paymentMethod: paymentMethod || 'UPI (Instant Confirmation)',
    amountPaise: 220000,
    bookedAt: new Date().toISOString()
  };

  bookings.unshift(booking);

  if (memberPhone && !memberProfiles.has(memberPhone)) {
    memberProfiles.set(memberPhone, {
      name: memberName,
      phone: memberPhone,
      plan: passName,
      creditsRemaining: 1,
      healthWaiverSigned: true
    });
  }

  res.json({
    success: true,
    booking,
    invoiceNumber: `INV-2627-${Math.floor(1000 + Math.random() * 9000)}`,
    gstin: studioSettings.gstin,
    whatsappConfirmed: true
  });
});

// 4. Member Bookings
app.get('/api/bookings/my', (req, res) => {
  const phone = req.query.phone || '+91 98450 12345';
  const myBookings = bookings.filter(b => b.memberPhone === phone || !phone);
  res.json(myBookings.length > 0 ? myBookings : bookings.slice(0, 3));
});

// 5. Auth / OTP
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone required' });
  res.json({
    success: true,
    message: 'OTP sent via SMS (use 123456 for testing)',
    otpDev: '123456'
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp, name } = req.body;
  if (otp !== '123456' && otp !== '111111') {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  let profile = memberProfiles.get(phone);
  if (!profile) {
    profile = {
      name: name || 'Member',
      phone,
      plan: 'Core 8 Monthly',
      creditsRemaining: 6,
      healthWaiverSigned: true
    };
    memberProfiles.set(phone, profile);
  }

  res.json({
    success: true,
    token: `token_${phone.replace(/\D/g, '')}`,
    profile
  });
});

// 6. Admin Ops
app.get('/api/admin/today', (req, res) => {
  res.json({
    todaySessions: sessions.slice(0, 4),
    roster: bookings,
    stats: {
      checkInCount: bookings.filter(b => b.status === 'checked_in').length,
      totalCapacity: 48,
      occupancyPercent: 91.6,
      todayRevenue: 41200
    }
  });
});

app.post('/api/admin/checkin', (req, res) => {
  const { bookingId } = req.body;
  const b = bookings.find(item => item.id === bookingId);
  if (!b) return res.status(404).json({ error: 'Booking not found' });

  const now = new Date();
  b.status = 'checked_in';
  b.checkedInAt = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  res.json({ success: true, booking: b });
});

// ── STATIC ASSETS & WEBSITE PAGES ──
const rootPath = path.join(__dirname, '..');
const assetsPath = path.join(rootPath, 'assets');

// Serve assets folder
app.use('/assets', express.static(assetsPath, {
  maxAge: '1d',
  immutable: true
}));

// Clean URL route map
const cleanRoutes = {
  '/': 'index.html',
  '/new-here': 'new-here.html',
  '/classes': 'classes.html',
  '/foundation-reformer': 'foundation-reformer.html',
  '/timetable': 'timetable.html',
  '/class-finder': 'class-finder.html',
  '/instructors': 'instructors.html',
  '/instructor-profile': 'instructor-profile.html',
  '/pricing': 'pricing.html',
  '/memberships': 'memberships.html',
  '/cancellation-policy': 'cancellation-policy.html',
  '/about': 'about.html',
  '/philosophy': 'philosophy.html',
  '/studio': 'studio.html',
  '/gallery': 'gallery.html',
  '/journal': 'journal.html',
  '/why-the-reformer-uses-springs': 'why-the-reformer-uses-springs.html',
  '/contact': 'contact.html',
  '/faq': 'faq.html',
  '/book': 'book-pass.html',
  '/book-pass': 'book-pass.html',
  '/book-login': 'book-login.html',
  '/book-checkout': 'book-checkout.html',
  '/book-confirmed': 'book-confirmed.html',
  '/booking-states': 'booking-states.html',
  '/account': 'account.html',
  '/account-bookings': 'account-bookings.html',
  '/account-membership': 'account-membership.html',
  '/account-profile': 'account-profile.html',
  '/admin': 'admin.html'
};

for (const [routePath, filename] of Object.entries(cleanRoutes)) {
  app.get(routePath, (req, res) => {
    res.sendFile(path.join(rootPath, filename));
  });
}

// Serve root directory for direct .html requests
app.use(express.static(rootPath));

// Fallback 404 / HTML handler
app.use((req, res) => {
  const potentialHtml = path.join(rootPath, req.path.replace(/^\//, '') + '.html');
  if (fs.existsSync(potentialHtml)) {
    return res.sendFile(potentialHtml);
  }
  res.status(404).sendFile(path.join(rootPath, '404.html'));
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ENTHALPY REST API & Node.js Server`);
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log(`======================================================\n`);
});
