import React, { useState } from 'react';

export default function Pricing({ navigate }) {
  const [billingType, setBillingType] = useState('packs');

  const packs = [
    {
      id: 'intro',
      title: 'First-Timer Intro Offer',
      price: 1500,
      credits: '1 Class',
      validity: '14 Days',
      badge: 'New Members Only',
      desc: 'One 50-minute reformer class with complete machine onboarding and form consultation.',
      features: ['Personal carriage & spring calibration', 'Grip sock consultation', 'Full access to showers & amenities']
    },
    {
      id: 'single',
      title: 'Single Class Drop-in',
      price: 2200,
      credits: '1 Class',
      validity: '30 Days',
      desc: 'Complete flexibility. Drop into any group session on the timetable without commitment.',
      features: ['Valid for all class levels', 'Free cancellation up to 12h before', 'No recurring auto-debit']
    },
    {
      id: 'pack5',
      title: '5-Class Pack',
      price: 9500,
      credits: '5 Classes',
      pricePerClass: '₹1,900 / class',
      validity: '60 Days',
      desc: 'Save ₹1,500. Perfect for training 1 to 2 times weekly with flexibility.',
      features: ['Save ₹1,500 on drop-in rates', 'Valid 60 days from first use', 'Sharable with spouse/partner']
    },
    {
      id: 'pack10',
      title: '10-Class Pack',
      price: 17000,
      popular: true,
      credits: '10 Classes',
      pricePerClass: '₹1,700 / class',
      validity: '90 Days',
      desc: 'Our most popular option. Save ₹5,000 and establish consistent weekly practice.',
      features: ['Save ₹5,000 on drop-in rates', 'Valid 90 days from first use', 'Priority waitlist promotion', 'Sharable with partner']
    }
  ];

  const memberships = [
    {
      id: 'core8',
      title: 'Core 8 Membership',
      price: 13600,
      interval: 'per month',
      credits: '8 Classes / month',
      pricePerClass: '₹1,700 / class',
      desc: '2 sessions per week. Priority booking window and guaranteed reformer spots.',
      features: ['8 sessions every calendar month', '14-day advance booking window', '2 weeks freeze allowance per year', 'Auto-renews via UPI AutoPay or Card']
    },
    {
      id: 'unlimited',
      title: 'Unlimited Practice',
      price: 22000,
      interval: 'per month',
      popular: true,
      credits: 'Unlimited Classes',
      desc: 'Train without limits. For daily practitioners dedicated to complete physical transformation.',
      features: ['Unlimited group classes across timetable', '14-day priority booking window', '4 weeks freeze allowance per year', '2 complimentary guest passes / month', '15% off private studio sessions']
    }
  ];

  return (
    <div className="wrap sec animate-fade">
      <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: '44px' }}>
        <div className="eyebrow">Clear, Transparent Pricing</div>
        <h1 className="heading-lg">Packs &amp; Memberships</h1>
        <p className="lead-p" style={{ margin: '0 auto 28px auto' }}>
          All passes include full access to reformers, shower suites, lockers, and towels. No sign-up fees or hidden costs. Prices include 18% GST.
        </p>

        {/* Toggle */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--paper)',
          padding: '4px',
          borderRadius: '9999px',
          border: '1px solid var(--line)'
        }}>
          <button
            onClick={() => setBillingType('packs')}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              background: billingType === 'packs' ? 'var(--espresso)' : 'transparent',
              color: billingType === 'packs' ? 'var(--linen)' : 'var(--cocoa)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Class Packs &amp; Drop-in
          </button>
          <button
            onClick={() => setBillingType('memberships')}
            style={{
              padding: '10px 24px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              background: billingType === 'memberships' ? 'var(--espresso)' : 'transparent',
              color: billingType === 'memberships' ? 'var(--linen)' : 'var(--cocoa)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Monthly Memberships
          </button>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        alignItems: 'stretch'
      }}>
        {(billingType === 'packs' ? packs : memberships).map(item => (
          <div
            key={item.id}
            className="card-paper"
            style={{
              background: item.popular ? 'var(--espresso)' : '#FFF',
              color: item.popular ? 'var(--linen)' : 'var(--espresso)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {item.badge && (
                <span className="badge" style={{ marginBottom: '12px' }}>{item.badge}</span>
              )}
              {item.popular && (
                <span style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'var(--camel)',
                  color: 'var(--espresso)',
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em'
                }}>
                  Most Popular
                </span>
              )}

              <h3 style={{ fontSize: '22px', fontFamily: 'var(--serif)', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '13px',
                color: item.popular ? 'rgba(245, 241, 234, 0.8)' : 'var(--cocoa)',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {item.desc}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--sans)' }}>
                  ₹{item.price.toLocaleString('en-IN')}
                  {item.interval && <span style={{ fontSize: '14px', fontWeight: '500', opacity: 0.8 }}> /{item.interval}</span>}
                </div>
                {item.pricePerClass && (
                  <div style={{ fontSize: '12px', color: item.popular ? 'var(--khaki)' : 'var(--camel)', marginTop: '2px' }}>
                    {item.pricePerClass} · Validity: {item.validity || '30 days'}
                  </div>
                )}
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', fontSize: '13px', lineHeight: '2' }}>
                {item.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: item.popular ? 'var(--camel)' : '#3A6B4C', fontWeight: 'bold' }}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => navigate('book')}
              className={`btn ${item.popular ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                width: '100%',
                background: item.popular ? 'var(--linen)' : 'var(--espresso)',
                color: item.popular ? 'var(--espresso)' : 'var(--linen)'
              }}
            >
              Choose Pass →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

