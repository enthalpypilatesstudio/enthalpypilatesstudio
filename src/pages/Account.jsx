import React, { useState } from 'react';

export default function Account({ navigate }) {
  const [activeTab, setActiveTab] = useState('overview');

  const upcomingBookings = [
    {
      id: 'ENT-2026-9041',
      className: 'Foundation Reformer',
      date: 'Today, Nov 10',
      time: '08:15 AM',
      instructor: 'Ananya Roy',
      room: 'Room 1 · Reformer #04',
      status: 'confirmed',
      canCancelFree: true
    },
    {
      id: 'ENT-2026-9048',
      className: 'Reformer Flow',
      date: 'Thu, Nov 12',
      time: '07:00 AM',
      instructor: 'Devika Menon',
      room: 'Room 1 · Reformer #08',
      status: 'confirmed',
      canCancelFree: true
    }
  ];

  return (
    <div className="wrap sec animate-fade">
      {/* Account Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '36px'
      }}>
        <div>
          <div className="eyebrow">Member Portal</div>
          <h1 className="heading-lg" style={{ margin: '4px 0' }}>Priya Sharma</h1>
          <div style={{ fontSize: '13px', color: 'var(--cocoa)' }}>
            +91 98450 12345 · 10-Class Pack (7 credits remaining)
          </div>
        </div>

        <button
          onClick={() => navigate('timetable')}
          className="btn btn-primary"
          style={{ padding: '12px 24px', fontSize: '12px' }}
        >
          + Book Another Session
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '12px',
        borderBottom: '1px solid var(--line)',
        marginBottom: '32px',
        overflowX: 'auto'
      }}>
        {['overview', 'bookings', 'membership', 'profile'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '14px',
              fontWeight: activeTab === tab ? '700' : '600',
              color: activeTab === tab ? 'var(--espresso)' : 'var(--cocoa)',
              padding: '12px 18px',
              cursor: 'pointer',
              borderBottom: `2px solid ${activeTab === tab ? 'var(--espresso)' : 'transparent'}`,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'overview' ? 'Overview & QR' : tab === 'bookings' ? 'My Bookings' : tab === 'membership' ? 'Packs & Invoices' : 'Profile & Health'}
          </button>
        ))}
      </div>

      {/* ── TAB 1: OVERVIEW ── */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
          {/* Next Session Card */}
          <div className="card-paper" style={{ background: '#FFF' }}>
            <span className="badge" style={{ marginBottom: '12px' }}>Next Up Today</span>
            <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>
              Foundation Reformer
            </h2>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--cocoa)', marginBottom: '6px' }}>
              Today, Nov 10 · 08:15 AM (50 min)
            </div>
            <div style={{ fontSize: '13px', color: '#777', marginBottom: '20px' }}>
              Instructor: <strong>Ananya Roy</strong> · Room 1 (Reformer #04)
            </div>

            <div style={{
              background: 'var(--paper)',
              padding: '14px 18px',
              borderRadius: '8px',
              fontSize: '12px',
              color: '#3A6B4C',
              fontWeight: '600',
              marginBottom: '20px'
            }}>
              ✓ Free cancellation open until 08:15 PM yesterday. Front desk arrival open from 07:45 AM.
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => alert('Calendar (.ics) invite downloaded')}
                className="btn btn-secondary"
                style={{ flex: 1, padding: '10px', fontSize: '12px' }}
              >
                Add to Calendar
              </button>
              <button
                onClick={() => alert('Directions sent to WhatsApp')}
                className="btn btn-subtle"
                style={{ flex: 1, padding: '10px', fontSize: '12px' }}
              >
                Get Directions
              </button>
            </div>
          </div>

          {/* Studio Check-in QR Scanner */}
          <div className="card-paper" style={{ background: 'var(--espresso)', color: 'var(--linen)', textAlign: 'center' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--camel)', marginBottom: '12px' }}>
              Studio Door Scanner
            </div>
            <h3 style={{ fontSize: '22px', fontFamily: 'var(--serif)', marginBottom: '16px', color: 'var(--linen)' }}>
              Check-In QR Code
            </h3>

            {/* Simulated QR Box */}
            <div style={{
              width: '180px',
              height: '180px',
              background: '#FFF',
              borderRadius: '12px',
              margin: '0 auto 18px auto',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)'
            }}>
              <svg width="150" height="150" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#fff" />
                <path d="M10 10h30v30h-30z M15 15v20h20v-20z M20 20h10v10h-10z M60 10h30v30h-30z M65 15v20h20v-20z M70 20h10v10h-10z M10 60h30v30h-30z M15 65v20h20v-20z M20 70h10v10h-10z M50 15h5v5h-5z M50 25h5v5h-5z M60 50h10v10h-10z M80 50h10v10h-10z M50 60h5v15h-5z M70 70h10v10h-10z M80 80h10v10h-10z" fill="#4A342A" />
              </svg>
            </div>

            <div style={{ fontSize: '13px', color: 'rgba(245, 241, 234, 0.75)' }}>
              Hold screen under desk iPad scanner upon studio entry.
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: MY BOOKINGS ── */}
      {activeTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {upcomingBookings.map(b => (
            <div
              key={b.id}
              className="card-paper"
              style={{
                background: '#FFF',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--espresso)' }}>{b.className}</div>
                <div style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>Ref: #{b.id}</div>
              </div>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '700' }}>{b.date} · {b.time}</div>
                <div style={{ fontSize: '13px', color: 'var(--cocoa)' }}>Instructor: {b.instructor}</div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#3A6B4C', fontWeight: '700' }}>● Confirmed</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{b.room}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={() => alert('Class cancelled. 1 Credit returned to your ledger.')}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  Cancel Class
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 3: MEMBERSHIP & LEDGER ── */}
      {activeTab === 'membership' && (
        <div className="card-paper" style={{ background: '#FFF' }}>
          <h2 style={{ fontSize: '22px', fontFamily: 'var(--serif)', marginBottom: '16px' }}>Active Pack Ledger</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <div>
              <div style={{ fontWeight: '700' }}>10-Class Studio Pack</div>
              <div style={{ fontSize: '12px', color: '#777' }}>Purchased on Oct 24, 2026 · Valid until Jan 22, 2027</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--espresso)' }}>7 Credits Left</div>
              <div style={{ fontSize: '12px', color: '#3A6B4C' }}>Active</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
            <div>
              <div style={{ fontWeight: '700' }}>GST Tax Invoice #INV-2627-8910</div>
              <div style={{ fontSize: '12px', color: '#777' }}>Amount: ₹17,000 (CGST ₹1,296.61 + SGST ₹1,296.61)</div>
            </div>
            <button
              onClick={() => alert('GST Tax Invoice PDF downloaded.')}
              className="btn btn-subtle"
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              Download PDF Invoice
            </button>
          </div>
        </div>
      )}

      {/* ── TAB 4: PROFILE & HEALTH ── */}
      {activeTab === 'profile' && (
        <div className="card-paper" style={{ background: '#FFF', maxWidth: '640px' }}>
          <h2 style={{ fontSize: '22px', fontFamily: 'var(--serif)', marginBottom: '16px' }}>Health Declaration &amp; Waiver</h2>
          <p style={{ fontSize: '13px', color: 'var(--cocoa)', marginBottom: '24px' }}>
            Instructors review injury declarations before every session to calibrate spring tension and provide tactile modifications.
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Declared Conditions / Injuries</label>
            <textarea
              defaultValue="Neck tension around C5; mild lower back sensitivity when in full spinal flexion."
              rows={3}
              style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px', fontFamily: 'var(--sans)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Emergency Contact</label>
            <input
              type="text"
              defaultValue="Aditya Sharma · +91 99000 12345 (Spouse)"
              style={{ width: '100%', padding: '12px', border: '1px solid var(--line)', borderRadius: '8px', fontSize: '14px' }}
            />
          </div>

          <button onClick={() => alert('Health profile updated successfully.')} className="btn btn-primary">
            Save Health Profile
          </button>
        </div>
      )}
    </div>
  );
}

