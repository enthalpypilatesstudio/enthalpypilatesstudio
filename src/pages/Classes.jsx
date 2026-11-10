import React, { useState } from 'react';

export default function Classes({ navigate, onSelectSession }) {
  const [activeLevel, setActiveLevel] = useState('all');

  const classList = [
    {
      id: 'foundation',
      name: 'Foundation Reformer',
      level: 'Foundation',
      duration: '50 min',
      tag: 'Recommended First Class',
      desc: 'Learn the machine, breathing mechanics, and the five essential classical reformer exercises.',
      details: 'Your starting point on the reformer. We break down carriage glide, spring tensions, footbar alignment, and neutral spine. Coached with patience in groups capped at 12 reformers.',
      focus: ['Breathing Dynamics', 'Neutral Spine & Pelvic Stability', 'Footwork & Carriage Control'],
      springs: '1 Blue, 1 Red (moderate assistance)'
    },
    {
      id: 'flow',
      name: 'Reformer Flow',
      level: 'All Levels',
      duration: '50 min',
      tag: 'Signature Studio Class',
      desc: 'A seamless, full-body sequence connecting classical principles with dynamic tempo.',
      details: 'Continuous flow connecting short box, long box, elephant, and kneeling arm series. Seamless transitions that challenge endurance, coordination, and postural alignment.',
      focus: ['Core Integration', 'Spinal Articulation', 'Continuous Rhythmic Flow'],
      springs: '2 Red, 1 Blue'
    },
    {
      id: 'dynamic',
      name: 'Dynamic Reformer',
      level: 'Intermediate',
      duration: '55 min',
      tag: 'Athletic Conditioning',
      desc: 'Heavier springs, longer isometric holds, standing series, and higher muscular load.',
      details: 'High-energy reformer training. Integrates split lunges, side splits, jumpboard cardio bursts, and deep core contractions to elevate heart rate while preserving technical form.',
      focus: ['Muscular Endurance', 'Glute Activation', 'Power & Standing Stability'],
      springs: 'Variable progressions'
    },
    {
      id: 'advanced',
      name: 'Advanced Reformer',
      level: 'Advanced',
      duration: '55 min',
      tag: 'Mastery & Control',
      desc: 'Complex classical sequences: Tendon Stretch, Snake, Teaser on the box, and Control Balance.',
      details: 'Demanding work requiring full shoulder girdle stability, high core strength, and acute body awareness. Strict prerequisites apply to ensure joint safety.',
      focus: ['High-Leverage Balance', 'Precision Transitions', 'Full Body Inversion'],
      springs: 'Minimal spring support (maximum core control)'
    },
    {
      id: 'private',
      name: 'Private Studio Session',
      level: 'Personalized 1:1',
      duration: '60 min',
      tag: 'Bespoke Assessment',
      desc: 'Custom one-on-one session built around specific injuries, goals, or athletic tuning.',
      details: 'Dedicated private suite with Cadillac, Wunda Chair, Spine Corrector, and Reformer. Full postural assessment, tailored programming, and hands-on tactile feedback.',
      focus: ['Injury Rehabilitation', 'Athletic Fine-Tuning', 'Prenatal & Postnatal Care'],
      springs: 'Tailored per client'
    }
  ];

  const filtered = activeLevel === 'all'
    ? classList
    : classList.filter(c => c.level.toLowerCase().includes(activeLevel.toLowerCase()));

  return (
    <div className="wrap sec animate-fade">
      <div style={{ maxWidth: '820px', marginBottom: '40px' }}>
        <div className="eyebrow">Studio Repertoire</div>
        <h1 className="heading-lg">Classes &amp; Repertoire</h1>
        <p className="lead-p">
          All classes are taught on premium Balanced Body Allegro 2 reformers, strictly capped at 12 members per session so every individual receives hands-on tactile coaching.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
        {['all', 'foundation', 'all levels', 'intermediate', 'advanced'].map(lvl => (
          <button
            key={lvl}
            onClick={() => setActiveLevel(lvl)}
            style={{
              padding: '8px 18px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '600',
              textTransform: 'capitalize',
              background: activeLevel === lvl ? 'var(--espresso)' : 'var(--paper)',
              color: activeLevel === lvl ? 'var(--linen)' : 'var(--espresso)',
              border: `1px solid ${activeLevel === lvl ? 'var(--espresso)' : 'var(--line)'}`
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Class Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {filtered.map(cls => (
          <div
            key={cls.id}
            className="card-paper"
            style={{
              background: '#FFF',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="badge" style={{ marginBottom: '10px' }}>{cls.level} · {cls.duration}</span>
              <h2 style={{ fontSize: '26px', fontFamily: 'var(--serif)', marginBottom: '10px', color: 'var(--espresso)' }}>
                {cls.name}
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--cocoa)', lineHeight: '1.65', marginBottom: '16px' }}>
                {cls.details}
              </p>
              <div style={{ fontSize: '13px', color: '#777' }}>
                Spring Tension: <strong>{cls.springs}</strong>
              </div>
            </div>

            <div style={{
              background: 'var(--paper)',
              borderRadius: '10px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%'
            }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--camel)', marginBottom: '8px' }}>
                  Target Movement Focus
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', fontSize: '13px', color: 'var(--espresso)', lineHeight: '1.8' }}>
                  {cls.focus.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'var(--camel)', fontWeight: 'bold' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => navigate('timetable')}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '10px 18px', fontSize: '12px' }}
                >
                  Book on Timetable
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

