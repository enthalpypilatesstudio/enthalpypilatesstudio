import React from 'react';

export default function Footer({ navigate }) {
  return (
    <footer style={{
      background: 'var(--espresso)',
      color: 'var(--linen)',
      paddingTop: 'clamp(64px, 8vw, 110px)',
      paddingBottom: '40px',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="wrap">
        {/* Navigation Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '64px'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--camel)',
              marginBottom: '18px'
            }}>
              Practice
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'rgba(245, 241, 234, 0.8)' }}>
              <span onClick={() => navigate('classes')} style={{ cursor: 'pointer' }}>Classes Overview</span>
              <span onClick={() => navigate('timetable')} style={{ cursor: 'pointer' }}>Timetable &amp; Schedule</span>
              <span onClick={() => navigate('class-finder')} style={{ cursor: 'pointer' }}>Class Finder Quiz</span>
              <span onClick={() => navigate('new-here')} style={{ cursor: 'pointer' }}>New to Reformer</span>
              <span onClick={() => navigate('pricing')} style={{ cursor: 'pointer' }}>Pricing &amp; Packs</span>
              <span onClick={() => navigate('memberships')} style={{ cursor: 'pointer' }}>Memberships</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--camel)',
              marginBottom: '18px'
            }}>
              Studio
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'rgba(245, 241, 234, 0.8)' }}>
              <span onClick={() => navigate('about')} style={{ cursor: 'pointer' }}>About ENTHALPY</span>
              <span onClick={() => navigate('philosophy')} style={{ cursor: 'pointer' }}>Our Philosophy</span>
              <span onClick={() => navigate('instructors')} style={{ cursor: 'pointer' }}>Instructors Team</span>
              <span onClick={() => navigate('studio')} style={{ cursor: 'pointer' }}>The Studio Space</span>
              <span onClick={() => navigate('gallery')} style={{ cursor: 'pointer' }}>Photo Gallery</span>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--camel)',
              marginBottom: '18px'
            }}>
              Journal &amp; Help
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: 'rgba(245, 241, 234, 0.8)' }}>
              <span onClick={() => navigate('journal')} style={{ cursor: 'pointer' }}>Journal Articles</span>
              <span onClick={() => navigate('why-the-reformer-uses-springs')} style={{ cursor: 'pointer' }}>Spring Physics &amp; Resistance</span>
              <span onClick={() => navigate('faq')} style={{ cursor: 'pointer' }}>Questions &amp; FAQ</span>
              <span onClick={() => navigate('contact')} style={{ cursor: 'pointer' }}>Contact &amp; Location</span>
              <span onClick={() => navigate('cancellation-policy')} style={{ cursor: 'pointer' }}>Cancellation Policy</span>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--camel)',
              marginBottom: '18px'
            }}>
              Studio Location
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7', color: 'rgba(245, 241, 234, 0.75)' }}>
              Defence Colony, New Delhi<br />
              (Full address announced prior to opening)<br />
              <span style={{ color: 'var(--khaki)' }}>Daily: 06:30 AM – 09:00 PM</span><br />
              WhatsApp: +91 95899 92237 · admin@enthalpypilatesstudio.com
            </div>
            <div style={{ marginTop: '16px' }}>
              <button
                onClick={() => navigate('admin')}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  color: 'var(--khaki)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600'
                }}
              >
                Staff Admin Login →
              </button>
            </div>
          </div>
        </div>

        {/* Giant Serif Wordmark */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '48px',
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(54px, 13vw, 160px)',
            letterSpacing: '0.15em',
            lineHeight: '0.9',
            fontWeight: '400',
            textTransform: 'uppercase',
            color: 'var(--linen)',
            opacity: 0.95
          }}>
            ENTHALPY
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginTop: '32px',
            fontSize: '12px',
            color: 'rgba(245, 241, 234, 0.6)'
          }}>
            <span>© 2026 ENTHALPY Reformer Pilates &amp; Movement Studio. All rights reserved.</span>
            <span>Movement is the science of energy, balance and transformation.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

