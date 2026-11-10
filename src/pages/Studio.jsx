import React from 'react';

export default function Studio({ navigate }) {
  const amenities = [
    { title: '12 Balanced Body Allegro 2 Reformers', desc: 'World-standard studio reformers with signature carbon springs, seamless carriage gliding, and infinitely adjustable footbars.' },
    { title: 'Private Shower & Dressing Suites', desc: 'Private rainfall showers, complimentary plush organic towels, and botanical haircare & body wash products.' },
    { title: 'Keyless Digital Lockers', desc: 'Individual lockers with built-in device charging ports and spacious hangers for work attire.' },
    { title: 'Filtered Hydration & Tea Bar', desc: 'Chilled reverse-osmosis electrolyte water and post-session botanical herbal infusions.' },
    { title: 'Acoustic Architecture', desc: 'Treated sound insulation, warm indirect dimmable lighting, and lime-plastered walls to foster deep mental focus.' }
  ];

  return (
    <div className="wrap sec animate-fade">
      <div style={{ maxWidth: '820px', marginBottom: '44px' }}>
        <div className="eyebrow">The Studio Environment</div>
        <h1 className="heading-lg">Sanctuary Built for Movement</h1>
        <p className="lead-p">
          Located in central Koramangala, ENTHALPY was designed from the ground up as an antidote to frantic gym environments. Calm light, oak timber floors, and breathable space.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        {amenities.map((item, idx) => (
          <div key={idx} className="card-paper" style={{ background: '#FFF' }}>
            <span className="badge" style={{ marginBottom: '12px' }}>0{idx + 1} Amenity</span>
            <h3 style={{ fontSize: '18px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--cocoa)', lineHeight: '1.6' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('timetable')} className="btn btn-primary">
          View Timetable &amp; Book →
        </button>
      </div>
    </div>
  );
}

