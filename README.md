# ENTHALPY — Reformer Pilates & Movement Platform
**Production React + Node.js Platform with Exact High-Fidelity Design**

Built strictly to the approved brand design bundles and technical build brief for **ENTHALPY** — a premium reformer Pilates studio in Defence Colony, New Delhi for men and women. Contact: +91 95899 92237 · admin@enthalpypilatesstudio.com

---

## 🏗️ Architecture & Technology Stack

* **Front-End Architecture**:
  * 32 Connected High-Fidelity Design Pages extracted from the official design bundles.
  * Native React 18.3.1 + ReactDOM + dc-runtime mounted on all pages.
  * Smooth button magnetic motion physics (`assets/5bc7e8c5-1a49-4ab0-a3b2-909d89cce637.js`).
  * Custom Editorial Typography: `Cormorant Garamond` (display serif) + `Manrope` (functional sans-serif) served locally.
  * Local high-resolution SVGs (141 assets) and studio imagery (29 assets).
  * 700+ verified inter-page links with **0 broken links**.
* **Back-End REST API Server**:
  * Node.js 24 + Express (ES Modules).
  * Concurrency-safe 10-minute reformer seat hold lock engine (`/api/holds`).
  * Member phone & SMS/WhatsApp OTP auth simulator (`/api/auth/send-otp`, `/api/auth/verify-otp`).
  * Booking engine and live roster tracking (`/api/bookings`, `/api/admin/today`, `/api/admin/checkin`).
  * Seamless clean URL routing (`/classes`, `/timetable`, `/book`, `/account`, `/admin`, etc.).

---

## 🚀 Quick Start

### Start the Server (Node.js + REST API + Website)
```bash
npm start
```
Runs at: **`http://localhost:5000`**

Visit in your browser:
* **Home Page**: `http://localhost:5000/`
* **Classes**: `http://localhost:5000/classes`
* **Foundation Reformer**: `http://localhost:5000/foundation-reformer`
* **Timetable**: `http://localhost:5000/timetable`
* **Interactive Class Finder**: `http://localhost:5000/class-finder`
* **Instructors**: `http://localhost:5000/instructors`
* **Pricing & Passes**: `http://localhost:5000/pricing`
* **Memberships**: `http://localhost:5000/memberships`
* **Cancellation Policy**: `http://localhost:5000/cancellation-policy`
* **About Enthalpy**: `http://localhost:5000/about`
* **The Studio & Amenities**: `http://localhost:5000/studio`
* **Studio Gallery**: `http://localhost:5000/gallery`
* **Journal (Spring Physics)**: `http://localhost:5000/journal`
* **Contact & Studio Directions**: `http://localhost:5000/contact`
* **Booking Step 1 (Choose Pass)**: `http://localhost:5000/book-pass`
* **Booking Step 2 (Member Login / OTP)**: `http://localhost:5000/book-login`
* **Booking Step 3 (Payment & Checkout)**: `http://localhost:5000/book-checkout`
* **Booking Step 4 (Confirmation & Pass)**: `http://localhost:5000/book-confirmed`
* **Member Account Portal**: `http://localhost:5000/account`
* **Member Bookings & Reschedule**: `http://localhost:5000/account-bookings`
* **Membership Credits & AutoPay**: `http://localhost:5000/account-membership`
* **Health Waiver & Physical Profile**: `http://localhost:5000/account-profile`
* **Front Desk Staff Admin**: `http://localhost:5000/admin`

---

## ⚡ REST API Endpoints

* `GET /api/classes` — All class levels & specs (Foundation, Flow, Strength, Advanced, Private)
* `GET /api/classes/:slug` — Individual class specifications & spring tension
* `GET /api/timetable` — 7-day timetable with live spots & waitlist counters
* `GET /api/products` — Pricing packs & recurring membership tiers
* `POST /api/holds` — Creates a 10-minute seat hold lock (`hold_xxxx`)
* `GET /api/holds/:id` — Checks remaining hold seconds
* `POST /api/bookings` — Confirms booking & generates reference (`ENT-2026-xxxx`)
* `GET /api/bookings/my` — Member upcoming & past session history
* `POST /api/auth/send-otp` — Sends 6-digit SMS OTP (dev: `123456`)
* `POST /api/auth/verify-otp` — Verifies OTP & returns member profile
* `GET /api/admin/today` — Front desk roster & live occupancy metrics
* `POST /api/admin/checkin` — Marks member checked-in with timestamp
