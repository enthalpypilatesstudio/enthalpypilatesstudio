import React, { useState } from 'react';

export default function Navbar({ currentRoute, navigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Classes', route: 'classes' },
    { label: 'Timetable', route: 'timetable' },
    { label: 'New Here', route: 'new-here' },
    { label: 'Pricing', route: 'pricing' },
    { label: 'Instructors', route: 'instructors' },
    { label: 'Studio', route: 'studio' },
    { label: 'Journal', route: 'journal' }
  ];

  function handleNav(route) {
    navigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(245, 241, 234, 0.94)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--line)',
      transition: 'all 0.25s'
    }}>
      <div className="wrap" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('home')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <span style={{
            fontFamily: 'var(--serif)',
            fontSize: '28px',
            letterSpacing: '0.18em',
            fontWeight: '500',
            textTransform: 'uppercase',
            color: 'var(--espresso)'
          }}>
            ENTHALPY
          </span>
          <span style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--camel)',
            fontWeight: '700',
            borderLeft: '1px solid var(--khaki)',
            paddingLeft: '10px'
          }}>
            PILATES
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '28px',
          '@media (min-width: 992px)': { display: 'flex' }
        }} className="desktop-nav">
          {navLinks.map(link => {
            const isActive = currentRoute === link.route;
            return (
              <span
                key={link.route}
                onClick={() => handleNav(link.route)}
                style={{
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '600',
                  color: isActive ? 'var(--espresso)' : 'var(--cocoa)',
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--espresso)',
                    borderRadius: '2px'
                  }} />
                )}
              </span>
            );
          })}
        </nav>

        {/* Right CTA Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            onClick={() => handleNav('account')}
            style={{
              fontSize: '13px',
              fontWeight: '600',
              color: 'var(--cocoa)',
              cursor: 'pointer',
              display: 'none',
              '@media (min-width: 768px)': { display: 'inline' }
            }}
            className="desk-link"
          >
            My Account
          </span>

          <button
            onClick={() => handleNav('book')}
            className="btn btn-primary"
            style={{ padding: '11px 22px', fontSize: '12px' }}
          >
            Book a Class
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
            aria-label="Toggle Navigation"
            className="mobile-toggle"
          >
            <span style={{ width: '22px', height: '2px', background: 'var(--espresso)', transition: 'all 0.2s' }} />
            <span style={{ width: '22px', height: '2px', background: 'var(--espresso)', transition: 'all 0.2s' }} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--paper)',
          borderTop: '1px solid var(--line)',
          padding: '24px var(--pad)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}>
          {navLinks.map(link => (
            <div
              key={link.route}
              onClick={() => handleNav(link.route)}
              style={{
                fontSize: '18px',
                fontFamily: 'var(--serif)',
                fontWeight: currentRoute === link.route ? '700' : '500',
                color: 'var(--espresso)',
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: '1px solid rgba(215, 201, 184, 0.4)'
              }}
            >
              {link.label}
            </div>
          ))}
          <div
            onClick={() => handleNav('account')}
            style={{
              fontSize: '18px',
              fontFamily: 'var(--serif)',
              fontWeight: '600',
              color: 'var(--cocoa)',
              cursor: 'pointer',
              padding: '6px 0'
            }}
          >
            Member Portal (/account)
          </div>
          <div
            onClick={() => handleNav('admin')}
            style={{
              fontSize: '14px',
              fontWeight: '600',
              color: 'var(--camel)',
              cursor: 'pointer',
              paddingTop: '8px'
            }}
          >
            Studio Staff Admin →
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
        @media (min-width: 768px) {
          .desk-link { display: inline !important; }
        }
      `}</style>
    </header>
  );
}

