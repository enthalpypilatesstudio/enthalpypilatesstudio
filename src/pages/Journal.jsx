import React, { useState } from 'react';

export default function Journal({ navigate }) {
  const [springExpansion, setSpringExpansion] = useState(50); // 0 to 100%

  return (
    <div className="wrap sec animate-fade" style={{ maxWidth: '820px' }}>
      <div style={{ marginBottom: '40px' }}>
        <div className="eyebrow">The Science of Movement</div>
        <h1 className="heading-lg">Why the Reformer Uses Springs</h1>
        <div style={{ fontSize: '13px', color: 'var(--camel)', fontWeight: '600', marginTop: '6px' }}>
          By Ananya Roy · 6 min read · Biomechanics
        </div>
      </div>

      <div className="card-paper" style={{ background: '#FFF', padding: '36px', marginBottom: '40px' }}>
        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--espresso)', marginBottom: '24px' }}>
          Traditional gym resistance relies on dead weights (gravity). When lifting a dumbbell, the peak mechanical challenge occurs at dead-angles, while the stabilizing joint is often subjected to sudden shear forces.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--espresso)', marginBottom: '32px' }}>
          Pilates reformer springs follow Hooke’s Law: <em>F = -k·x</em>. Resistance increases smoothly as the spring elongates, providing maximum loading precisely at the point of peak muscular contraction, while providing supportive assistance at full joint extension.
        </p>

        {/* Interactive Physics Simulation */}
        <div style={{
          background: 'var(--paper)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid var(--line)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cocoa)' }}>
              Interactive Spring Elongation
            </span>
            <span style={{ fontSize: '14px', fontWeight: '800', color: 'var(--espresso)' }}>
              Carriage Travel: {springExpansion}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={springExpansion}
            onChange={e => setSpringExpansion(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--espresso)', cursor: 'pointer', marginBottom: '20px' }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Reformer Spring Load</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#3A6B4C' }}>
                {(4 + (springExpansion * 0.22)).toFixed(1)} kg
              </div>
              <div style={{ fontSize: '11px', color: 'var(--cocoa)', marginTop: '4px' }}>
                Progressive tension protecting joint capsule
              </div>
            </div>

            <div style={{ background: '#FFF', padding: '16px', borderRadius: '8px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Standard Dead Weight</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#777' }}>
                15.0 kg
              </div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                Fixed gravitational weight (high inertial jerk)
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--espresso)' }}>
          This is why reformer Pilates builds long, lean, eccentric muscular length without joint wear or inflammation. You decelerate load on the way in, firing the deep stabilizing stabilizers that machines ignore.
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={() => navigate('classes')} className="btn btn-primary">
          Experience Reformer Classes →
        </button>
      </div>
    </div>
  );
}

