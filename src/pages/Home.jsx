import React, { useState, useEffect } from 'react';

export default function Home({ navigate, onSelectSession }) {
  const [heroSlide, setHeroSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const heroSlides = [
    {
      eyebrow: 'Reformer Pilates · Bengaluru',
      title: 'Movement. Energy. Transformation.',
      desc: 'A calm, architectural sanctuary engineered for the science of Pilates. 12 Balanced Body Allegro 2 reformers, lime-washed walls, and master-level coaching.',
      cta: 'Book an Intro Class',
      action: () => navigate('new-here')
    },
    {
      eyebrow: 'The Studio Philosophy',
      title: 'Strength without strain. Balance without rigidity.',
      desc: 'Progressive spring resistance rises through your range of motion — creating long, lean muscular alignment, core stability, and post-workday decompression.',
      cta: 'Explore Our Method',
      action: () => navigate('philosophy')
    },
    {
      eyebrow: 'New to the Reformer?',
      title: 'Your first class, made completely simple.',
      desc: 'Small groups capped at 12 members. Your instructor walks you through machine setup, straps, and breathing mechanics with zero intimidation.',
      cta: 'Claim Intro Offer — ₹1,500',
      action: () => navigate('pricing')
    },
    {
      eyebrow: 'Daily Timetable',
      title: 'Every session capped at 12 reformers.',
      desc: 'From 07:00 AM Foundation Reformer to 07:30 PM Reformer Flow, find sessions that match your body and rhythm.',
      cta: 'View Live Timetable',
      action: () => navigate('timetable')
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, heroSlides.length]);

  const activeSlide = heroSlides[heroSlide];

  const quickSessions = [
    { time: '07:00 AM', name: 'Foundation Reformer', level: 'Beginner', instructor: 'Ananya Roy', spots: 2 },
    { time: '08:15 AM', name: 'Reformer Flow', level: 'All Levels', instructor: 'Devika Menon', spots: 3 },
    { time: '09:30 AM', name: 'Dynamic Reformer', level: 'Intermediate', instructor: 'Kabir Oberoi', spots: 0, waitlist: 2 },
    { time: '05:00 PM', name: 'Foundation Reformer', level: 'Beginner', instructor: 'Devika Menon', spots: 4 }
  ];

  return (
    <div>
      {/* Hero Section with Slider */}
      <section style={{
        background: 'var(--espresso)',
        color: 'var(--linen)',
        paddingTop: 'clamp(64px, 10vw, 120px)',
        paddingBottom: 'clamp(64px, 10vw, 130px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '820px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(215, 201, 184, 0.15)',
              color: 'var(--khaki)',
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '20px'
            }}>
              {activeSlide.eyebrow}
            </div>

            <h1 className="heading-xl" style={{ color: 'var(--linen)', marginBottom: '24px' }}>
              {activeSlide.title}
            </h1>

            <p style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: '1.65',
              color: 'rgba(245, 241, 234, 0.85)',
              marginBottom: '36px',
              maxWidth: '680px'
            }}>
              {activeSlide.desc}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={activeSlide.action}
                className="btn btn-primary"
                style={{
                  background: 'var(--linen)',
                  color: 'var(--espresso)',
                  fontSize: '13px'
                }}
              >
                {activeSlide.cta} →
              </button>
              <button
                onClick={() => navigate('class-finder')}
                className="btn btn-secondary"
                style={{
                  borderColor: 'rgba(245, 241, 234, 0.4)',
                  color: 'var(--linen)',
                  fontSize: '13px'
                }}
              >
                Find My Class Quiz (1 min)
              </button>
            </div>
          </div>

          {/* Slider Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginTop: '56px'
          }}>
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroSlide(idx)}
                style={{
                  width: idx === heroSlide ? '36px' : '10px',
                  height: '4px',
                  borderRadius: '2px',
                  background: idx === heroSlide ? 'var(--linen)' : 'rgba(245, 241, 234, 0.25)',
                  border: 'none',
                  transition: 'all 0.3s'
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
            <span
              onClick={() => setIsPaused(!isPaused)}
              style={{
                marginLeft: '12px',
                fontSize: '11px',
                color: 'var(--khaki)',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              {isPaused ? '▶ Resume' : '❚❚ Pause'}
            </span>
          </div>
        </div>
      </section>

      {/* Live Today Schedule Bar */}
      <section style={{
        background: 'var(--paper)',
        borderBottom: '1px solid var(--line)',
        padding: '32px 0'
      }}>
        <div className="wrap">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div>
              <div className="eyebrow" style={{ margin: 0 }}>Live · Today at the Studio</div>
              <h2 className="heading-md" style={{ margin: '4px 0 0 0' }}>Next Available Sessions</h2>
            </div>
            <button
              onClick={() => navigate('timetable')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--espresso)',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Full 7-Day Timetable →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            {quickSessions.map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FFF',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(74, 52, 42, 0.03)'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--cocoa)' }}>{s.time}</span>
                    <span className="badge">{s.level}</span>
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--espresso)', marginBottom: '4px' }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#777', marginBottom: '14px' }}>
                    Instructor: {s.instructor}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--line)'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: s.spots > 0 ? '#3A6B4C' : '#946221' }}>
                    {s.spots > 0 ? `${s.spots} spots left` : `Waitlist (${s.waitlist})`}
                  </span>
                  <button
                    onClick={() => {
                      if (onSelectSession) onSelectSession(s);
                      navigate('book');
                    }}
                    className="btn btn-primary"
                    style={{ padding: '6px 14px', fontSize: '11px' }}
                  >
                    {s.spots > 0 ? 'Book' : 'Join Waitlist'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Manifesto Section */}
      <section className="sec wrap" style={{ textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="eyebrow">Our Philosophy</div>
          <h2 className="heading-lg" style={{ marginBottom: '24px' }}>
            “Movement is not an afterthought.<br />It is the science of human enthalpy.”
          </h2>
          <p className="lead-p" style={{ margin: '0 auto 32px auto' }}>
            In physics, enthalpy is the total heat and energy of a thermodynamic system. In Pilates, it is the transformation that occurs when breath, core engagement, and resistance converge.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button onClick={() => navigate('philosophy')} className="btn btn-secondary">
              Read Our 6 Classical Principles
            </button>
          </div>
        </div>
      </section>

      {/* Classes Overview Rail */}
      <section className="sec" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div className="eyebrow">Four Ways onto the Reformer</div>
              <h2 className="heading-lg">Progressive Studio Classes</h2>
            </div>
            <button onClick={() => navigate('classes')} className="btn btn-secondary">
              View All Class Guides →
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px'
          }}>
            <div className="card-paper" style={{ background: '#FFF' }}>
              <span className="badge" style={{ marginBottom: '12px' }}>Level 1 · 50 min</span>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>Foundation Reformer</h3>
              <p style={{ fontSize: '14px', color: 'var(--cocoa)', marginBottom: '18px', lineHeight: '1.6' }}>
                Carriage control, spring tensions, and the five fundamental classical movements. Coached with patience.
              </p>
              <button onClick={() => navigate('classes')} className="btn btn-subtle" style={{ width: '100%' }}>
                Explore Details
              </button>
            </div>

            <div className="card-paper" style={{ background: '#FFF' }}>
              <span className="badge" style={{ marginBottom: '12px' }}>All Levels · 50 min</span>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>Reformer Flow</h3>
              <p style={{ fontSize: '14px', color: 'var(--cocoa)', marginBottom: '18px', lineHeight: '1.6' }}>
                Rhythmic, full-body sequence connecting classical series with fluid transitions and core endurance.
              </p>
              <button onClick={() => navigate('classes')} className="btn btn-subtle" style={{ width: '100%' }}>
                Explore Details
              </button>
            </div>

            <div className="card-paper" style={{ background: '#FFF' }}>
              <span className="badge" style={{ marginBottom: '12px' }}>Intermediate · 55 min</span>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>Dynamic Reformer</h3>
              <p style={{ fontSize: '14px', color: 'var(--cocoa)', marginBottom: '18px', lineHeight: '1.6' }}>
                Heavier springs, longer isometric holds, standing series, and athletic pacing for strength.
              </p>
              <button onClick={() => navigate('classes')} className="btn btn-subtle" style={{ width: '100%' }}>
                Explore Details
              </button>
            </div>

            <div className="card-paper" style={{ background: '#FFF' }}>
              <span className="badge" style={{ marginBottom: '12px' }}>Advanced · 55 min</span>
              <h3 style={{ fontSize: '20px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>Advanced Reformer</h3>
              <p style={{ fontSize: '14px', color: 'var(--cocoa)', marginBottom: '18px', lineHeight: '1.6' }}>
                Complex transitions: Snake, Tendon Stretch, and Control Balance. Full shoulder and pelvic mastery required.
              </p>
              <button onClick={() => navigate('classes')} className="btn btn-subtle" style={{ width: '100%' }}>
                Explore Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Offer Callout */}
      <section className="sec wrap">
        <div style={{
          background: 'var(--espresso)',
          color: 'var(--linen)',
          borderRadius: '16px',
          padding: 'clamp(40px, 6vw, 72px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          <div>
            <span style={{
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              color: 'var(--camel)',
              display: 'block',
              marginBottom: '12px'
            }}>
              First-Time Members
            </span>
            <h2 className="heading-lg" style={{ color: 'var(--linen)', marginBottom: '16px' }}>
              Intro Class — ₹1,500
            </h2>
            <p style={{ color: 'rgba(245, 241, 234, 0.85)', fontSize: '16px', lineHeight: '1.6' }}>
              Experience your first reformer class with Ananya or Devika. Includes personal machine alignment, grip sock consult, and post-class goal review.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '42px', fontFamily: 'var(--serif)', fontWeight: '700', marginBottom: '8px' }}>
              ₹1,500
            </div>
            <div style={{ fontSize: '13px', color: 'var(--khaki)', marginBottom: '24px' }}>
              Inclusive of 18% GST · Valid 14 Days
            </div>
            <button
              onClick={() => navigate('pricing')}
              className="btn btn-primary"
              style={{ background: 'var(--linen)', color: 'var(--espresso)', width: '100%', maxWidth: '280px' }}
            >
              Claim the Offer →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

