import React, { useState } from 'react';
import SeatHoldTimer from '../components/SeatHoldTimer';

export default function BookingFlow({ session, navigate }) {
  const [step, setStep] = useState(2); // Start on Step 2 (Choose Pass) as per board 22
  const [selectedPass, setSelectedPass] = useState('intro');
  const [phone, setPhone] = useState('+91 98450 12345');
  const [otp, setOtp] = useState('123456');
  const [otpSent, setOtpSent] = useState(false);
  const [memberName, setMemberName] = useState('Priya Sharma');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Default fallback session if none preselected
  const currentSession = session || {
    id: 'sess-101',
    className: 'Foundation Reformer',
    level: 'Foundation · 50 min',
    date: 'Today, Nov 10',
    time: '08:15 AM',
    instructorName: 'Ananya Roy',
    spotsLeft: 3
  };

  const passes = [
    {
      id: 'intro',
      title: 'First-Timer Intro Offer',
      price: 1500,
      badge: 'Recommended for First Class',
      desc: 'Includes personal machine setup and coach consult. Valid 14 days.'
    },
    {
      id: 'single',
      title: 'Single Class Drop-in',
      price: 2200,
      desc: 'Flexible single session valid for any group class on the timetable.'
    },
    {
      id: 'pack5',
      title: '5-Class Pack',
      price: 9500,
      pricePerClass: 1900,
      desc: 'Save ₹1,500. Valid 60 days across all class levels.'
    },
    {
      id: 'pack10',
      title: '10-Class Pack',
      price: 17000,
      popular: true,
      pricePerClass: 1700,
      desc: 'Save ₹5,000. Valid 90 days. Most popular studio pack.'
    }
  ];

  const activePass = passes.find(p => p.id === selectedPass) || passes[0];

  function handleSendOtp() {
    setOtpSent(true);
  }

  function handleVerifyOtp() {
    setStep(4); // Move to checkout
  }

  function handlePayment() {
    setIsProcessing(true);
    setTimeout(() => {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSession.id,
          memberName,
          memberPhone: phone,
          paymentMethod: paymentMethod === 'upi' ? 'UPI (GPay / PhonePe)' : 'Credit Card',
          passName: activePass.title
        })
      })
        .then(res => res.json())
        .then(data => {
          setIsProcessing(false);
          setConfirmedBooking(data.booking || {
            id: 'ENT-2026-9045',
            className: currentSession.className,
            time: currentSession.time,
            date: currentSession.date,
            instructorName: currentSession.instructorName
          });
          setStep(5); // Confirmed screen
        })
        .catch(() => {
          setIsProcessing(false);
          setConfirmedBooking({
            id: 'ENT-2026-9045',
            className: currentSession.className,
            time: currentSession.time,
            date: currentSession.date,
            instructorName: currentSession.instructorName
          });
          setStep(5);
        });
    }, 1200);
  }

  return (
    <div className="wrap sec animate-fade" style={{ maxWidth: '820px' }}>
      {/* Step Indicator Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '700', color: 'var(--cocoa)' }}>
          <span style={{ color: step >= 1 ? 'var(--espresso)' : '#aaa' }}>1. Session</span>
          <span>›</span>
          <span style={{ color: step >= 2 ? 'var(--espresso)' : '#aaa' }}>2. Pass</span>
          <span>›</span>
          <span style={{ color: step >= 3 ? 'var(--espresso)' : '#aaa' }}>3. Login/OTP</span>
          <span>›</span>
          <span style={{ color: step >= 4 ? 'var(--espresso)' : '#aaa' }}>4. Checkout</span>
          <span>›</span>
          <span style={{ color: step >= 5 ? 'var(--espresso)' : '#aaa' }}>5. Confirmed</span>
        </div>

        {step < 5 && <SeatHoldTimer initialSeconds={600} />}
      </div>

      {/* Selected Session Pill */}
      <div style={{
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        borderRadius: '12px',
        padding: '16px 22px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--camel)', fontWeight: '700' }}>
            Holding Seat For:
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--espresso)' }}>
            {currentSession.className} · {currentSession.time}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--cocoa)' }}>
            {currentSession.date} · Instructor: <strong>{currentSession.instructorName}</strong>
          </div>
        </div>
        <button
          onClick={() => navigate('timetable')}
          style={{ background: 'none', border: 'none', color: 'var(--cocoa)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Change session
        </button>
      </div>

      {/* ── STEP 2: CHOOSE PASS ── */}
      {step === 2 && (
        <div className="card-paper" style={{ background: '#FFF' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>
            Choose a Pass or Membership
          </h2>
          <p style={{ color: 'var(--cocoa)', fontSize: '14px', marginBottom: '24px' }}>
            Select how you would like to book this seat. New members save with the First-Timer offer.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
            {passes.map(p => {
              const isSelected = selectedPass === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPass(p.id)}
                  style={{
                    background: isSelected ? 'var(--paper)' : '#FFF',
                    border: `2px solid ${isSelected ? 'var(--espresso)' : 'var(--line)'}`,
                    borderRadius: '12px',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <div>
                    {p.badge && (
                      <span className="badge" style={{ marginBottom: '6px' }}>{p.badge}</span>
                    )}
                    <div style={{ fontSize: '17px', fontWeight: '700', color: 'var(--espresso)' }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#777', marginTop: '2px' }}>
                      {p.desc}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--espresso)' }}>
                      ₹{p.price.toLocaleString('en-IN')}
                    </div>
                    {p.pricePerClass && (
                      <div style={{ fontSize: '11px', color: 'var(--cocoa)' }}>
                        ₹{p.pricePerClass} / class
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setStep(3)}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px' }}
          >
            Continue with {activePass.title} (₹{activePass.price.toLocaleString('en-IN')}) →
          </button>
        </div>
      )}

      {/* ── STEP 3: LOGIN / OTP REGISTER ── */}
      {step === 3 && (
        <div className="card-paper" style={{ background: '#FFF', maxWidth: '520px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>
            Verify Your Mobile Number
          </h2>
          <p style={{ color: 'var(--cocoa)', fontSize: '14px', marginBottom: '24px' }}>
            Enter your mobile number to attach your booking and receive instant WhatsApp confirmation.
          </p>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Full Name</label>
            <input
              type="text"
              value={memberName}
              onChange={e => setMemberName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                fontSize: '15px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Mobile Phone</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid var(--line)',
                  borderRadius: '8px',
                  fontSize: '15px'
                }}
              />
              <button
                onClick={handleSendOtp}
                className="btn btn-secondary"
                style={{ padding: '10px 16px', fontSize: '12px' }}
              >
                {otpSent ? 'Resend' : 'Send OTP'}
              </button>
            </div>
          </div>

          {otpSent && (
            <div style={{ marginBottom: '24px' }} className="animate-fade">
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>
                6-Digit Verification Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--espresso)',
                  borderRadius: '8px',
                  fontSize: '18px',
                  letterSpacing: '0.25em',
                  textAlign: 'center'
                }}
              />
              <div style={{ fontSize: '12px', color: '#3A6B4C', marginTop: '6px' }}>
                ✓ Code sent via SMS. Development bypass: <strong>123456</strong>
              </div>
            </div>
          )}

          <button
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            className="btn btn-primary"
            style={{ width: '100%', padding: '15px' }}
          >
            {otpSent ? 'Verify & Proceed to Payment →' : 'Send Verification OTP'}
          </button>
        </div>
      )}

      {/* ── STEP 4: PAYMENT CHECKOUT ── */}
      {step === 4 && (
        <div className="card-paper" style={{ background: '#FFF' }}>
          <h2 style={{ fontSize: '24px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>
            Payment Checkout
          </h2>
          <p style={{ color: 'var(--cocoa)', fontSize: '14px', marginBottom: '24px' }}>
            Secured via Razorpay payment rails. Card and bank details are end-to-end encrypted.
          </p>

          <div style={{
            background: 'var(--paper)',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700' }}>{activePass.title}</div>
              <div style={{ fontSize: '12px', color: '#777' }}>Includes 18% GST (CGST 9% + SGST 9%)</div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--espresso)' }}>
              ₹{activePass.price.toLocaleString('en-IN')}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '12px' }}>
              Select Payment Method
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div
                onClick={() => setPaymentMethod('upi')}
                style={{
                  border: `2px solid ${paymentMethod === 'upi' ? 'var(--espresso)' : 'var(--line)'}`,
                  borderRadius: '10px',
                  padding: '16px',
                  cursor: 'pointer',
                  background: paymentMethod === 'upi' ? 'var(--paper)' : '#FFF'
                }}
              >
                <div style={{ fontWeight: '700', marginBottom: '4px' }}>UPI (Instant QR &amp; Apps)</div>
                <div style={{ fontSize: '12px', color: '#777' }}>GPay, PhonePe, Paytm, CRED</div>
              </div>

              <div
                onClick={() => setPaymentMethod('card')}
                style={{
                  border: `2px solid ${paymentMethod === 'card' ? 'var(--espresso)' : 'var(--line)'}`,
                  borderRadius: '10px',
                  padding: '16px',
                  cursor: 'pointer',
                  background: paymentMethod === 'card' ? 'var(--paper)' : '#FFF'
                }}
              >
                <div style={{ fontWeight: '700', marginBottom: '4px' }}>Credit / Debit Card</div>
                <div style={{ fontSize: '12px', color: '#777' }}>Visa, MasterCard, Amex, RuPay</div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px', fontSize: '14px' }}
          >
            {isProcessing ? 'Processing Secure Payment…' : `Pay ₹${activePass.price.toLocaleString('en-IN')} & Confirm Seat`}
          </button>
        </div>
      )}

      {/* ── STEP 5: BOOKING CONFIRMED ── */}
      {step === 5 && (
        <div className="card-paper" style={{ background: '#FFF', textAlign: 'center', padding: '48px 32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: '#EDF5F0',
            color: '#3A6B4C',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
            margin: '0 auto 20px auto'
          }}>
            ✓
          </div>

          <span className="badge" style={{ marginBottom: '12px', background: '#EDF5F0', color: '#3A6B4C' }}>
            Confirmed · Ref #{confirmedBooking?.id || 'ENT-2026-9045'}
          </span>

          <h2 className="heading-lg" style={{ marginBottom: '8px' }}>
            Your Reformer Seat is Booked
          </h2>
          <p style={{ color: 'var(--cocoa)', fontSize: '16px', marginBottom: '28px' }}>
            Confirmation and digital tax invoice sent to <strong>{phone}</strong> via WhatsApp and SMS.
          </p>

          <div style={{
            background: 'var(--paper)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '520px',
            margin: '0 auto 32px auto',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#777', fontSize: '13px' }}>Class:</span>
              <strong style={{ fontSize: '14px' }}>{currentSession.className}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#777', fontSize: '13px' }}>Date &amp; Time:</span>
              <strong style={{ fontSize: '14px' }}>{currentSession.date} · {currentSession.time}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#777', fontSize: '13px' }}>Instructor:</span>
              <strong style={{ fontSize: '14px' }}>{currentSession.instructorName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: '#777', fontSize: '13px' }}>Studio Location:</span>
              <span style={{ fontSize: '13px', textAlign: 'right' }}>Room 1 · 12th Main, Koramangala</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
              <span style={{ color: '#777', fontSize: '13px' }}>Cancellation Policy:</span>
              <span style={{ fontSize: '12px', color: '#3A6B4C', fontWeight: '700' }}>Free cancel until 12h before start</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('account')}
              className="btn btn-primary"
            >
              Go to Member Portal (/account) →
            </button>
            <button
              onClick={() => navigate('timetable')}
              className="btn btn-secondary"
            >
              View Timetable
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

