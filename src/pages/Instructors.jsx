import React from 'react';

export default function Instructors({ navigate }) {
  const team = [
    {
      name: 'Ananya Roy',
      role: 'Head of Pilates & Founder',
      cert: 'PMA Certified Master Instructor · BASI Comprehensive · Pre/Postnatal',
      bio: 'Trained in classical Pilates in London and contemporary dance at Trinity Laban. Ananya founded ENTHALPY to bridge anatomical science with mindful editorial movement.',
      specialisms: ['Classical Repertoire', 'Spinal Decompression & Herniation Care', 'Footwork & Pelvic Mechanics']
    },
    {
      name: 'Devika Menon',
      role: 'Senior Instructor & Flow Lead',
      cert: 'STOTT Pilates Comprehensive · B.Sc. Kinesiology',
      bio: 'Known for fluid transitions, music-driven pacing, and precise verbal cues. Devika emphasizes continuous breath rhythm and rotational core strength.',
      specialisms: ['Reformer Flow', 'Hip & Thoracic Mobility', 'Athletic Coordination']
    },
    {
      name: 'Kabir Oberoi',
      role: 'Performance & Strength Coach',
      cert: 'Polestar Pilates Certified · CSCS Strength & Conditioning',
      bio: 'Specializes in high-resistance reformer training, athletic conditioning, and injury prevention for athletes, runners, and desk professionals.',
      specialisms: ['Dynamic Reformer', 'Jumpboard Plyometrics', 'Posterior Chain Power']
    }
  ];

  return (
    <div className="wrap sec animate-fade">
      <div style={{ maxWidth: '800px', marginBottom: '48px' }}>
        <div className="eyebrow">Our Faculty</div>
        <h1 className="heading-lg">Coached by Master Instructors</h1>
        <p className="lead-p">
          Every instructor at ENTHALPY holds international comprehensive certifications (500+ hours training) across reformer, cadillac, and anatomy biomechanics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {team.map((ins, idx) => (
          <div key={idx} className="card-paper" style={{ background: '#FFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge" style={{ marginBottom: '12px' }}>{ins.role}</span>
              <h2 style={{ fontSize: '26px', fontFamily: 'var(--serif)', marginBottom: '6px' }}>{ins.name}</h2>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--camel)', marginBottom: '16px' }}>
                {ins.cert}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--cocoa)', lineHeight: '1.65', marginBottom: '20px' }}>
                {ins.bio}
              </p>

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '16px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--espresso)', marginBottom: '8px' }}>
                  Areas of Specialization
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {ins.specialisms.map((s, i) => (
                    <span key={i} style={{ fontSize: '12px', background: 'var(--paper)', padding: '4px 8px', borderRadius: '4px', color: 'var(--cocoa)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button
                onClick={() => navigate('timetable')}
                className="btn btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: '12px' }}
              >
                View Teaching Schedule →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

