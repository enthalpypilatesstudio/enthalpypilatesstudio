import React, { useState, useEffect } from 'react';

export default function SeatHoldTimer({ initialSeconds = 600, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onExpire) onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isUrgent = secondsLeft < 120;

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      background: isUrgent ? '#FDF0EC' : 'var(--paper)',
      border: `1px solid ${isUrgent ? '#E06B4D' : 'var(--line)'}`,
      padding: '6px 14px',
      borderRadius: '9999px',
      fontSize: '13px',
      fontWeight: '600',
      color: isUrgent ? '#B24322' : 'var(--espresso)',
      transition: 'all 0.3s'
    }}>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: isUrgent ? '#B24322' : '#3A6B4C',
        display: 'inline-block'
      }} />
      <span>Seat locked for: <strong style={{ fontFamily: 'monospace', fontSize: '14px' }}>{timeString}</strong></span>
    </div>
  );
}

