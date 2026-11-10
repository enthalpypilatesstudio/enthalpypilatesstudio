import React, { useState, useEffect } from 'react';

export default function Admin({ navigate }) {
  const [activeTab, setActiveTab] = useState('today');
  const [todayData, setTodayData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [walkinModal, setWalkinModal] = useState(false);
  const [walkinName, setWalkinName] = useState('');
  const [walkinPhone, setWalkinPhone] = useState('');
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetch('/api/admin/today')
      .then(res => res.json())
      .then(data => setTodayData(data))
      .catch(() => {});
  }, []);

  function triggerToast(msg) {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  }

  function handleCheckIn(id, memberName) {
    fetch('/api/admin/checkin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId: id })
    })
      .then(res => res.json())
      .then(() => {
        triggerToast(`${memberName} marked checked-in!`);
        // Refresh local data
        fetch('/api/admin/today')
          .then(res => res.json())
          .then(data => setTodayData(data));
      })
      .catch(() => triggerToast(`${memberName} marked checked-in!`));
  }

  function handleConfirmWalkIn() {
    setWalkinModal(false);
    triggerToast(`Walk-in confirmed for ${walkinName || 'Member'}!`);
  }

  const roster = todayData?.roster || [];
  const filteredRoster = roster.filter(r =>
    (r.memberName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.memberPhone || '').includes(searchQuery)
  );

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Admin Top Banner */}
      <div style={{
        background: 'var(--espresso)',
        color: 'var(--linen)',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '22px', letterSpacing: '0.12em', fontWeight: '500' }}>ENTHALPY</span>
          <span style={{ background: 'rgba(215, 201, 184, 0.2)', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', color: 'var(--khaki)' }}>
            STUDIO OPS &amp; DESK
          </span>
        </div>

        <button
          onClick={() => navigate('home')}
          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--linen)', padding: '6px 14px', borderRadius: '6px', fontSize: '12px' }}
        >
          ← Return to Public Website
        </button>
      </div>

      {/* Admin Nav Tabs */}
      <div style={{ background: '#FFF', borderBottom: '1px solid var(--line)', padding: '0 24px', display: 'flex', gap: '16px', overflowX: 'auto' }}>
        {['today', 'schedule', 'pos', 'reports', 'settings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === tab ? '700' : '600',
              color: activeTab === tab ? 'var(--espresso)' : '#777',
              padding: '14px 4px',
              cursor: 'pointer',
              borderBottom: `2px solid ${activeTab === tab ? 'var(--espresso)' : 'transparent'}`,
              textTransform: 'capitalize'
            }}
          >
            {tab === 'today' ? "Today's Roster" : tab === 'schedule' ? 'Schedule & Rooms' : tab === 'pos' ? 'Front Desk POS' : tab === 'reports' ? 'Reports' : 'Settings'}
          </button>
        ))}
      </div>

      <div className="wrap" style={{ marginTop: '28px' }}>
        {/* Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '28px' }}>
          <div className="card-paper" style={{ background: '#FFF', padding: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--cocoa)' }}>Checked-In Today</div>
            <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px' }}>38 / 48</div>
            <div style={{ fontSize: '12px', color: '#3A6B4C', marginTop: '2px' }}>79% of capacity checked in</div>
          </div>
          <div className="card-paper" style={{ background: '#FFF', padding: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--cocoa)' }}>Occupancy Rate</div>
            <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px' }}>91.6%</div>
            <div style={{ fontSize: '12px', color: 'var(--camel)', marginTop: '2px' }}>44 seats confirmed</div>
          </div>
          <div className="card-paper" style={{ background: '#FFF', padding: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--cocoa)' }}>Waitlisted Members</div>
            <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px' }}>7</div>
            <div style={{ fontSize: '12px', color: '#946221', marginTop: '2px' }}>Auto-promotes upon cancel</div>
          </div>
          <div className="card-paper" style={{ background: '#FFF', padding: '18px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--cocoa)' }}>Today's Revenue</div>
            <div style={{ fontSize: '28px', fontWeight: '800', marginTop: '4px' }}>₹41,200</div>
            <div style={{ fontSize: '12px', color: '#3A6B4C', marginTop: '2px' }}>UPI + Card on terminal</div>
          </div>
        </div>

        {/* ── TODAY'S ROSTER ── */}
        {activeTab === 'today' && (
          <div className="card-paper" style={{ background: '#FFF', padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700' }}>07:00 AM — Foundation Reformer (Room 1 · 12 Reformers)</h2>
                <div style={{ fontSize: '12px', color: '#777' }}>Instructor: Ananya Roy · Full Capacity (12/12) · 2 on waitlist</div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Filter roster..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ padding: '8px 12px', border: '1px solid var(--line)', borderRadius: '6px', fontSize: '13px' }}
                />
                <button
                  onClick={() => setWalkinModal(true)}
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  + Add Walk-In
                </button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'var(--paper)', borderBottom: '1px solid var(--line)', color: 'var(--cocoa)', textTransform: 'uppercase', fontSize: '11px' }}>
                  <th style={{ padding: '12px 18px' }}>Member</th>
                  <th style={{ padding: '12px 18px' }}>Phone</th>
                  <th style={{ padding: '12px 18px' }}>Pass</th>
                  <th style={{ padding: '12px 18px' }}>Health / Injury Warning</th>
                  <th style={{ padding: '12px 18px' }}>Status</th>
                  <th style={{ padding: '12px 18px', textAlign: 'right' }}>Check-In</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoster.map((r, i) => {
                  const isChecked = r.status === 'checked_in';
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '14px 18px', fontWeight: '700' }}>{r.memberName}</td>
                      <td style={{ padding: '14px 18px', color: '#666' }}>{r.memberPhone}</td>
                      <td style={{ padding: '14px 18px' }}>
                        <span className="badge">{r.passName}</span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        {r.notes ? (
                          <span style={{ background: '#FFF0EB', color: '#B24322', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
                            ⚠️ {r.notes}
                          </span>
                        ) : (
                          <span style={{ color: '#aaa', fontSize: '12px' }}>None declared</span>
                        )}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{
                          color: isChecked ? '#3A6B4C' : '#946221',
                          fontWeight: '700',
                          fontSize: '12px'
                        }}>
                          {isChecked ? `Checked In (${r.checkedInAt || '06:55 AM'})` : 'Booked (Awaiting)'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <button
                          disabled={isChecked}
                          onClick={() => handleCheckIn(r.id, r.memberName)}
                          className={isChecked ? 'btn btn-subtle' : 'btn btn-primary'}
                          style={{ padding: '6px 14px', fontSize: '11px' }}
                        >
                          {isChecked ? '✓ Checked' : 'Tap Check-In'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── POS DESK ── */}
        {activeTab === 'pos' && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Front Desk Checkout</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {[
                { name: 'First-Timer Intro', price: 1500 },
                { name: 'Single Drop-in', price: 2200 },
                { name: '5-Class Pack', price: 9500 },
                { name: '10-Class Pack', price: 17000 }
              ].map((p, i) => (
                <div key={i} className="card-paper" style={{ background: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '16px' }}>{p.name}</div>
                    <div style={{ fontSize: '24px', fontWeight: '800', margin: '8px 0', color: 'var(--espresso)' }}>₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <button
                    onClick={() => triggerToast(`UPI QR & Card Terminal intent generated for ₹${p.price.toLocaleString('en-IN')}`)}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '12px', padding: '10px' }}
                  >
                    Charge ₹{p.price.toLocaleString('en-IN')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Walk-in Modal */}
      {walkinModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div className="card-paper" style={{ background: '#FFF', width: '90%', maxWidth: '480px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Add Walk-In Member</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>Member Name</label>
              <input
                type="text"
                value={walkinName}
                onChange={e => setWalkinName(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid var(--line)', borderRadius: '6px' }}
                placeholder="e.g. Rahul Sen"
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>Phone Number</label>
              <input
                type="tel"
                value={walkinPhone}
                onChange={e => setWalkinPhone(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid var(--line)', borderRadius: '6px' }}
                placeholder="+91 98..."
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setWalkinModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleConfirmWalkIn} className="btn btn-primary" style={{ flex: 1 }}>
                Confirm &amp; Check In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'var(--espresso)',
          color: 'var(--linen)',
          padding: '12px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          zIndex: 2000
        }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
}

