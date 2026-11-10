import React from 'react';

export default function Philosophy({ navigate }) {
  const principles = [
    { num: '01', title: 'Breath', desc: 'Deep lateral thoracic breathing feeds oxygenating blood to stabilizing musculature and relieves ribcage compression.' },
    { num: '02', title: 'Centring', desc: 'Every exercise initiates from the powerhouse — the transversus abdominis, pelvic floor, and multifidus.' },
    { num: '03', title: 'Control', desc: 'No momentum. Carriage glide is governed by muscular deceleration against spring resistance in both eccentric and concentric phases.' },
    { num: '04', title: 'Concentration', desc: 'A total neural connection. Being acutely aware of limb placement, scapular depression, and spinal neutrality.' },
    { num: '05', title: 'Precision', desc: 'Few repetitions executed with immaculate alignment achieve vastly greater neurological transformation than fatigued volume.' },
    { num: '06', title: 'Flow', desc: 'Grace and continuous kinetic connection between movements, building endurance and organic agility.' }
  ];

  return (
    <div className="wrap sec animate-fade" style={{ maxWidth: '860px' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div className="eyebrow">The Method</div>
        <h1 className="heading-xl" style={{ marginBottom: '20px' }}>
          Movement as a Science
        </h1>
        <p className="lead-p" style={{ margin: '0 auto' }}>
          ENTHALPY views the human body as an integrated kinetic system. We honor Joseph Pilates' classical repertoire while incorporating contemporary exercise science and progressive loading.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px', marginBottom: '64px' }}>
        {principles.map(p => (
          <div key={p.num} className="card-paper" style={{ background: '#FFF' }}>
            <div style={{ fontSize: '28px', fontFamily: 'var(--serif)', color: 'var(--camel)', marginBottom: '8px' }}>
              {p.num}
            </div>
            <h3 style={{ fontSize: '22px', fontFamily: 'var(--serif)', marginBottom: '8px', color: 'var(--espresso)' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--cocoa)', lineHeight: '1.65' }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('classes')} className="btn btn-primary">
          Explore Our Classes →
        </button>
      </div>
    </div>
  );
}

