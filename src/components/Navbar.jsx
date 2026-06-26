import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ currentPage, setCurrentPage, setSelectedCategory }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Exhibition', page: 'home' },
    { label: 'Collection', page: 'collection' },
    { label: 'Workspace Builder', page: 'builder' },
    { label: 'Workspace Solutions', page: 'solutions' },
    { label: 'Projects', page: 'projects' },
    { label: 'AI Planner', page: 'planner' },
    { label: 'About Us', page: 'about' },
    { label: 'Latest', page: 'latest' }
  ];

  const handleNavClick = (page) => {
    if (page === 'collection' && setSelectedCategory) {
      setSelectedCategory('All');
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed White/Glass Header */}
      <header className={`premium-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container-premium" style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'var(--transition-fast)'
        }}>
          
          {/* Brand Logo */}
          <div 
            onClick={() => { setCurrentPage('home'); setIsMobileMenuOpen(false); }}
            className="logo-container"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Left Bars - Resized to match height of the letter "E" in ERGO */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '2px', 
                justifyContent: 'center', 
                height: '14px' 
              }}>
                <span style={{ width: '9px', height: '1.5px', backgroundColor: '#E23744', borderRadius: '1px' }}></span>
                <span style={{ width: '9px', height: '1.5px', backgroundColor: '#E23744', borderRadius: '1px' }}></span>
                <span style={{ width: '9px', height: '1.5px', backgroundColor: '#E23744', borderRadius: '1px' }}></span>
              </div>
              
              {/* Text Logo */}
              <span className="logo-text-wrap">
                ERGO
                <span style={{ color: '#111111', marginLeft: '2px' }}>
                  SPACE
                </span>
                <span style={{ 
                  fontSize: '0.5rem', 
                  fontWeight: 400, 
                  verticalAlign: 'super', 
                  marginLeft: '2px',
                  color: '#111111'
                }}>®</span>
              </span>
            </div>
            
            {/* Tagline */}
            <span className="logo-tagline">
              PLEASURE AT WORK
            </span>
          </div>

          {/* Desktop Navigation Redesign */}
          <nav style={{ display: 'none' }} className="desktop-nav-styles">
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => handleNavClick(item.page)}
                    className={`nav-link-btn ${currentPage === item.page ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              color: 'var(--text-primary)'
            }}
            className="mobile-nav-toggle-styles"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      <style>{`
        @media (min-width: 769px) {
          .desktop-nav-styles {
            display: block !important;
          }
          .mobile-nav-toggle-styles {
            display: none !important;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'var(--bg-primary)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <ul style={{ 
            listStyle: 'none', 
            textAlign: 'center', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem' 
          }}>
            {navItems.map((item) => (
              <li key={item.page}>
                <button
                  onClick={() => {
                    handleNavClick(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    fontSize: '2rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                    cursor: 'pointer',
                    color: currentPage === item.page ? 'var(--accent)' : 'var(--text-primary)',
                    border: 'none',
                    outline: 'none'
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
