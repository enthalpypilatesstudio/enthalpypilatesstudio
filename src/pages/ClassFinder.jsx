import React, { useState } from 'react';

export default function ClassFinder({ navigate }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'experience',
      title: 'How much Reformer Pilates have you practiced?',
      options: [
        { label: 'Never, or just starting out', val: 'new', note: 'Best suited for fundamentals and machine mechanics.' },
        { label: 'A few sessions (under 10 classes)', val: 'some', note: 'Familiar with footbar and springs, building confidence.' },
        { label: 'Regular practitioner (6+ months)', val: 'regular', note: 'Solid carriage control, ready for athletic load.' }
      ]
    },
    {
      id: 'goal',
      title: 'What is your primary physical intention?',
      options: [
        { label: 'Decompress from desk work & restore posture', val: 'posture', note: 'Spinal lengthening, shoulder opening, deep pelvic floor.' },
        { label: 'Full-body muscle tone & fluid coordination', val: 'flow', note: 'High repetition, steady tempo, continuous movement.' },
        { label: 'Heavy muscular resistance, glute burn & sweat', val: 'strength', note: 'Higher spring loads, standing lunge sequences, athletic power.' },
        { label: 'Recovering from a specific joint/back injury', val: 'rehab', note: 'Modified range of motion, tailored spring tension.' }
      ]
    },
    {
      id: 'pace',
      title: 'What class atmosphere resonates with you?',
      options: [
        { label: 'Calm, methodical, and heavily coached', val: 'calm' },
        { label: 'Rhythmic, music-driven, continuous flow', val: 'music' },
        { label: 'Fast-paced, challenging, and high-energy', val: 'dynamic' }
      ]
    },
    {
      id: 'schedule',
      title: 'When do you prefer to move?',
      options: [
        { label: 'Morning energizer (07:00 – 09:30 AM)', val: 'am' },
        { label: 'Midday reset (11:00 AM – 02:00 PM)', val: 'noon' },
        { label: 'Evening decompression (05:00 – 07:30 PM)', val: 'pm' }
      ]
    }
  ];

  function handleSelect(val) {
    const qId = questions[step].id;
    const nextAnswers = { ...answers, [qId]: val };
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Results state
    }
  }

  function getRecommendation() {
    if (answers.experience === 'new' || answers.goal === 'rehab') {
      return {
        name: 'Foundation Reformer',
        level: 'Foundation · 50 min',
        desc: 'Based on your experience and goals, Foundation Reformer gives you precise machine instruction, spring safety, and essential pelvic stability.',
        slug: 'foundation-reformer'
      };
    }
    if (answers.goal === 'strength' || answers.pace === 'dynamic') {
      return {
        name: 'Dynamic Reformer',
        level: 'Intermediate · 55 min',
        desc: 'You want high muscle engagement and athletic pacing. Dynamic Reformer challenges endurance with standing series and heavier springs.',
        slug: 'dynamic-reformer'
      };
    }
    return {
      name: 'Reformer Flow',
      level: 'All Levels · 50 min',
      desc: 'The quintessential ENTHALPY class. Seamless transitions, rhythmic breath cues, and full-body postural alignment.',
      slug: 'reformer-flow'
    };
  }

  const isCompleted = step >= questions.length;
  const recommendation = isCompleted ? getRecommendation() : null;

  return (
    <div className="wrap sec animate-fade" style={{ maxWidth: '720px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="eyebrow">Personalized Studio Match</div>
        <h1 className="heading-lg">Find Your Ideal Session</h1>
        <p className="lead-p" style={{ margin: '0 auto' }}>
          Answer 4 quick questions to receive a tailored class recommendation matching your experience and anatomy.
        </p>
      </div>

      {!isCompleted ? (
        <div className="card-paper" style={{ background: '#FFF' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--cocoa)',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}>
            <span>Question {step + 1} of {questions.length}</span>
            <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
          </div>

          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '24px', color: 'var(--espresso)' }}>
            {questions[step].title}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {questions[step].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSelect(opt.val)}
                style={{
                  background: 'var(--paper)',
                  border: '1px solid var(--line)',
                  borderRadius: '10px',
                  padding: '18px 22px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--camel)';
                  e.currentTarget.style.background = '#FFF';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.background = 'var(--paper)';
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--espresso)' }}>
                  {opt.label}
                </span>
                {opt.note && (
                  <span style={{ fontSize: '13px', color: 'var(--cocoa)' }}>
                    {opt.note}
                  </span>
                )}
              </button>
            ))}
          </div>

          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '13px',
                color: 'var(--cocoa)',
                marginTop: '20px',
                cursor: 'pointer'
              }}
            >
              ← Back to previous question
            </button>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="card-paper" style={{ background: '#FFF', textAlign: 'center', padding: '48px 36px' }}>
          <span className="badge" style={{ marginBottom: '14px' }}>Recommended Match</span>
          <h2 className="heading-lg" style={{ marginBottom: '8px' }}>{recommendation.name}</h2>
          <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--camel)', marginBottom: '20px' }}>
            {recommendation.level}
          </div>
          <p style={{ fontSize: '16px', color: 'var(--cocoa)', lineHeight: '1.65', marginBottom: '32px', maxWidth: '540px', marginInline: 'auto' }}>
            {recommendation.desc}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('timetable')}
              className="btn btn-primary"
            >
              View Available Times on Timetable →
            </button>
            <button
              onClick={() => { setStep(0); setAnswers({}); }}
              className="btn btn-secondary"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

