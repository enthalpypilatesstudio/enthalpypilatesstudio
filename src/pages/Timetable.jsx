import React, { useState, useEffect } from 'react';

export default function Timetable({ navigate, onSelectSession }) {
  const [dates, setDates] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/timetable')
      .then(res => res.json())
      .then(data => {
        if (data && data.dates) {
          setDates(data.dates);
          setSessions(data.sessions);
          setSelectedDate(data.dates[0]?.dateStr || '');
        }
        setLoading(false);
      })
      .catch(() => {
        // Fallback local dates
        const today = new Date().toISOString().split('T')[0];
        setDates([{ dateStr: today, dayName: 'Today', formattedDate: 'Nov 10' }]);
        setSelectedDate(today);
        setLoading(false);
      });
  }, []);

  const levels = ['All', 'Foundation', 'All Levels', 'Intermediate', 'Advanced'];

  const filteredSessions = sessions.filter(s => {
    const matchesDate = s.date === selectedDate;
    const matchesLevel = selectedLevel === 'All' || s.level.toLowerCase().includes(selectedLevel.toLowerCase());
    return matchesDate && matchesLevel;
  });

  return (
    <div className="wrap sec animate-fade">
      <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
        <div className="eyebrow">Studio Schedule · Defence Colony, New Delhi</div>
        <h1 className="heading-lg">Interactive Timetable</h1>
        <p className="lead-p">
          Every session is strictly capped at 12 reformers. Real-time availability updates live with active waitlists.
        </p>
      </div>

      {/* Date Strip */}
      <div style={{
        display: 'flex',
        gap: '12px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '28px'
      }}>
        {dates.map(d => {
          const isSelected = d.dateStr === selectedDate;
          return (
            <button
              key={d.dateStr}
              onClick={() => setSelectedDate(d.dateStr)}
              style={{
                background: isSelected ? 'var(--espresso)' : 'var(--paper)',
                color: isSelected ? 'var(--linen)' : 'var(--espresso)',
                border: `1px solid ${isSelected ? 'var(--espresso)' : 'var(--line)'}`,
                padding: '12px 20px',
                borderRadius: '12px',
                minWidth: '110px',
                textAlign: 'center',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.8 }}>
                {d.dayName}
              </div>
              <div style={{ fontSize: '16px', fontWeight: '700', marginTop: '2px' }}>
                {d.formattedDate}
              </div>
            </button>
          );
        })}
      </div>

      {/* Level Filters */}
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '32px'
      }}>
        {levels.map(lvl => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            style={{
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '600',
              background: selectedLevel === lvl ? 'var(--espresso)' : 'var(--paper)',
              color: selectedLevel === lvl ? 'var(--linen)' : 'var(--cocoa)',
              border: `1px solid ${selectedLevel === lvl ? 'var(--espresso)' : 'var(--line)'}`
            }}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Session Rows List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredSessions.length > 0 ? (
          filteredSessions.map(s => {
            const hasSpots = s.spotsLeft > 0;
            return (
              <div
                key={s.id}
                style={{
                  background: '#FFF',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                  padding: '24px 28px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                  alignItems: 'center',
                  boxShadow: '0 2px 6px rgba(74, 52, 42, 0.03)'
                }}
              >
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--espresso)' }}>
                    {s.time}
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>
                    {s.duration} minutes · Room 1
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--espresso)' }}>
                    {s.className}
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--cocoa)', marginTop: '2px' }}>
                    Instructor: <strong>{s.instructorName}</strong>
                  </div>
                </div>

                <div>
                  <span className="badge" style={{ marginBottom: '6px' }}>{s.level}</span>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: hasSpots ? '#3A6B4C' : '#946221',
                    marginTop: '4px'
                  }}>
                    {hasSpots ? `● ${s.spotsLeft} of 12 reformers open` : `● Class Full (${s.waitlistCount} on waitlist)`}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => {
                      if (onSelectSession) onSelectSession(s);
                      navigate('book');
                    }}
                    className={`btn ${hasSpots ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '10px 24px', fontSize: '12px' }}
                  >
                    {hasSpots ? 'Book Seat' : 'Join Waitlist'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="card-paper" style={{ textAlign: 'center', padding: '48px' }}>
            <p style={{ color: 'var(--cocoa)', fontSize: '16px' }}>
              No sessions scheduled for this level on this date. Try another day or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

