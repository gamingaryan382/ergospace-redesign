import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, WORKSPACE_SETUPS, B2B_CLIENTS, VISUAL_REVIEWS, PORTFOLIO_PROJECTS } from '../data/products';
import { 
  ArrowRight, Play, Eye, ArrowLeft, Heart, Check, HelpCircle, 
  MapPin, ShieldCheck, Award, MessageSquareCode, Calendar, Clock, Sparkles, Star
} from 'lucide-react';

const LATEST_ARTICLES = [
  {
    id: 1,
    title: 'Gurugram Factory Scale-up: 1,00,000 Sq. Ft. of Ergonomic Precision',
    excerpt: 'Under Tirupati Workspace Solutions Pvt Ltd, our state-of-the-art manufacturing facility in Gurgaon is expanding capacity to support massive corporate upgrades nationwide.',
    category: 'Manufacturing',
    date: 'June 18, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'The Art of Adaptation: Customization Ideologies in Office Design',
    excerpt: 'How our flexible design team collaborates with leading enterprises to build workspaces that evolve along with team sizes and operational cycles.',
    category: 'Design Philosophy',
    date: 'May 24, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Demystifying Certifications: Why ISO, BIFMA & GREEN GUARD Matter',
    excerpt: 'A comprehensive review of what makes ErgoSpace systems premium: from zero-VOC sustainable wood coatings to weight load durability certifications.',
    category: 'Ergonomics Science',
    date: 'May 02, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    title: 'Now Open: The Noida Urbtech Trade Center Showroom',
    excerpt: 'Experience 9,000 square feet of curated executive cabins, modular workstations, and dynamic lounge chairs live in the heart of Sector 132.',
    category: 'Corporate',
    date: 'April 15, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
  }
];

export default function Homepage({ setCurrentPage, setSelectedProductId, setActiveCaseStudyId, setSelectedCategory }) {
  
  // Posture calibration state removed.

  // Section 6 Before/After Slider State
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDraggingSlider || !sliderRef.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    };

    const handleEnd = () => {
      setIsDraggingSlider(false);
    };

    if (isDraggingSlider) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDraggingSlider]);

  // Section 9 B2B Consultation Modal
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);
  const [b2bFormData, setB2bFormData] = useState({ name: '', company: '', size: '10-50', email: '', phone: '' });
  const [b2bSubmitted, setB2bSubmitted] = useState(false);

  const handleB2BSubmit = (e) => {
    e.preventDefault();
    setB2bSubmitted(true);
    setTimeout(() => {
      setIsB2BModalOpen(false);
      setB2bSubmitted(false);
      setB2bFormData({ name: '', company: '', size: '10-50', email: '', phone: '' });
    }, 2500);
  };

  const selectProduct = (id) => {
    setSelectedProductId(id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // B2B Partner client logos wall specifications
  const clientLogosList = [
    {
      id: 'razorpay',
      name: 'Razorpay',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.5 3H11.5L4.5 15H11.5L9.5 21L19.5 3Z" fill="#0052FF" stroke="#0052FF" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'zomato',
      name: 'Zomato',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#E23744" />
        </svg>
      )
    },
    {
      id: 'groww',
      name: 'Groww',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 18h3.5V8H4v10zm6 0h3.5V4h-3.5v14zm6 0h3.5v-7H16v7z" fill="#00D09C" />
        </svg>
      )
    },
    {
      id: 'razorpay',
      name: 'CRED',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 'zomato',
      name: 'Swiggy',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FC8019" />
          <path d="M12 8V12L14 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'groww',
      name: 'Paytm',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#00BAF2" />
          <path d="M8 12h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 8v8" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'razorpay',
      name: 'Flipkart',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" fill="#2874F0" />
          <path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  // Infinite Scroll Hero Gallery Images
  const heroImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', // Executive Office
    'https://images.unsplash.com/photo-1612372606404-0ab33e7187ee?auto=format&fit=crop&w=600&q=80', // Ergonomic Chair
    'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=600&q=80', // Sit-stand Desk
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80', // Conference Room
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80', // Luxury Workstation
    'https://images.unsplash.com/photo-1593642532400-2682810df593?auto=format&fit=crop&w=600&q=80'  // Home Office Setup
  ];
  const scrollGallery = [...heroImages, ...heroImages];

  // Catalogue categories with verified, premium images
  const catalogueCategories = [
    { name: 'Lounge Chairs', image: '/lounge_chairs.png', key: 'Lounge Chairs' },
    { name: 'Glitter Series', image: '/glitter_chairs.png', key: 'Glitter Series' },
    { name: 'Leatherite Chairs', image: '/leatherite_chairs.png', key: 'Leatherite Chairs' },
    { name: 'Work From Home Chairs', image: '/wfh_chairs.png', key: 'Work From Home Chairs' },
    { name: 'Gaming Chair', image: '/gaming_chair.png', key: 'Gaming Chair' }
  ];

  return (
    <div style={{ position: 'relative' }}>
      
      {/* SECTION 1 — HERO GALLERY */}
      <section style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '10.5rem', // header bottom (96px) + 72px (4.5rem) spacing
        overflow: 'hidden',
        backgroundColor: 'var(--bg-secondary)'
      }}>
        {/* Infinite Scrolling Horizontal Marquee */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'max-content',
          height: '100%',
          display: 'flex',
          zIndex: 1,
          animation: 'loopMarquee 80s linear infinite'
        }}>
          {scrollGallery.map((imgUrl, idx) => (
            <div 
              key={idx} 
              style={{
                width: '400px',
                height: '100%',
                flexShrink: 0,
                padding: '0 0.5rem',
                opacity: 0.75 // Highly visible workspace imagery
              }}
            >
              <img 
                src={imgUrl} 
                alt="Workspace preview gallery" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  filter: 'contrast(92%) saturate(90%)' // Crisp quality
                }} 
              />
            </div>
          ))}
        </div>

        {/* Ambient Overlay - very subtle */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(244, 243, 239, 0.1)',
          zIndex: 2
        }} />

        {/* Hero Content Panel (Clean Editorial Layout) */}
        <div className="container-premium" style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
          maxWidth: '850px', // clean architectural layout width
          padding: '2.5rem 2rem 3.5rem 2rem',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.5) 55%, transparent 85%)',
          animation: 'fadeInHero 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <span style={{
            fontSize: '0.85rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            India's Most Trusted Office Architect
          </span>
          
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '4.75rem',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: '#1D1D1D',
            margin: '0 0 1.25rem 0'
          }}>
            India's Premium <br />Workspace Partner
          </h1>

          <p style={{
            fontSize: '1.3rem',
            fontWeight: 400,
            color: '#4A4A4A',
            maxWidth: '680px',
            lineHeight: 1.7,
            margin: '0 0 2.25rem 0'
          }}>
            Designing ergonomic workspaces that improve comfort, productivity, and organizational performance. Trusted by India's industry leaders.
          </p>

          <div style={{
            display: 'flex',
            gap: '2.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button 
              onClick={() => { if (setSelectedCategory) setSelectedCategory('All'); setCurrentPage('collection'); }} 
              className="btn-primary"
              style={{
                backgroundColor: 'var(--accent)',
                color: 'white',
                border: 'none',
                boxShadow: '0 10px 25px rgba(226, 55, 68, 0.2)',
                borderRadius: '8px',
                padding: '1.1rem 2.8rem',
                fontSize: '0.95rem'
              }}
            >
              <span>Explore Catalogue</span>
            </button>
            <button 
              onClick={() => {
                const projSection = document.getElementById('built-spaces');
                if (projSection) projSection.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary"
              style={{
                backgroundColor: 'white',
                borderColor: '#1D1D1D',
                color: '#1D1D1D',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                borderRadius: '8px',
                padding: '1.1rem 2.8rem',
                fontSize: '0.95rem'
              }}
            >
              <span>View Projects</span>
            </button>
          </div>
        </div>

        {/* Scroll indicator bar */}
        <div style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'rgba(250, 249, 246, 0.5)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase'
        }}>
          <span>Explore Architecture</span>
          <div style={{
            width: '1px',
            height: '40px',
            backgroundColor: 'rgba(250, 249, 246, 0.2)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '50%',
              backgroundColor: 'var(--accent)',
              animation: 'scrollBarAnim 2.5s infinite linear'
            }}></div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — TRUSTED BY INDUSTRY LEADERS */}
      <section style={{ 
        backgroundColor: 'var(--bg-primary)', 
        padding: '5rem 0',
        borderBottom: '1px solid var(--border-color)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <h4 style={{
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-tertiary)'
          }}>
            Trusted By Industry Leaders
          </h4>

          {/* Marquee scrolling ticker with Angled Glass Cards */}
          <div style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            padding: '0.5rem 0'
          }} className="logo-marquee-container">
            <div style={{
              display: 'flex',
              gap: '2.5rem',
              width: 'max-content',
              animation: 'marqueeLogo 55s linear infinite'
            }} className="logo-ticker-row">
              {[...clientLogosList, ...clientLogosList, ...clientLogosList, ...clientLogosList].map((client, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveCaseStudyId(client.id)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '1.25rem 3.5rem',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'skewX(-12deg)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                    minWidth: '220px'
                  }}
                  className="angled-logo-card"
                >
                  <div style={{
                    transform: 'skewX(12deg)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    width: '100%',
                    justifyContent: 'center'
                  }}>
                    {client.icon}
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em',
                      opacity: 0.85
                    }}>
                      {client.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .logo-marquee-container:hover .logo-ticker-row {
            animation-play-state: paused;
          }
          .angled-logo-card:hover {
            border: 1px solid var(--accent) !important;
            background: rgba(181, 142, 88, 0.08) !important;
            transform: skewX(-12deg) translateY(-6px) !important;
            box-shadow: 0 10px 40px rgba(181, 142, 88, 0.15) !important;
          }
          .angled-logo-card:hover span {
            color: var(--accent) !important;
            opacity: 1 !important;
          }
        `}</style>
      </section>

      {/* SECTION 3 — HAWORTH-INSPIRED BRAND STORY */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '8rem 0',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '900px',
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase'
          }}>
            Workspace Expertise
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3.5rem',
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            margin: 0
          }}>
            Building Better Workspaces <br />Since Day One
          </h2>
          <p style={{
            fontSize: '1.45rem',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: '820px'
          }}>
            ErgoSpace is more than a furniture supplier. We help businesses create workspaces that improve productivity, comfort, collaboration, and employee wellbeing. From executive cabins to enterprise offices, every solution is designed around how people work best.
          </p>
        </div>
      </section>

      {/* SECTION: LATEST FROM ERGO SPACE (EMBEDDED) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-premium">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Updates & Insights
              </span>
              <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: 0 }}>
                Latest from Ergo Space
              </h2>
            </div>
            
            <button 
              onClick={() => { setCurrentPage('latest'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className="btn-secondary" 
              style={{ padding: '0.8rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>View All News</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3rem'
          }}>
            {LATEST_ARTICLES.slice(0, 3).map((art) => (
              <article 
                key={art.id}
                onClick={() => { setCurrentPage('latest'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
                className="article-card-hover"
              >
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} 
                    className="art-img"
                  />
                  <span style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    backgroundColor: 'var(--accent)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '4px 8px',
                    borderRadius: '2px'
                  }}>
                    {art.category}
                  </span>
                </div>

                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {art.date}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {art.readTime}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.45rem', fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: '1.25', color: 'var(--text-primary)' }}>
                    {art.title}
                  </h3>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.6 }}>
                    {art.excerpt}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      fontSize: '0.85rem',
                      color: 'var(--accent)',
                      fontWeight: 600
                    }}>
                      <span>Read Article</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .article-card-hover {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s;
          }
          .article-card-hover:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-premium);
          }
          .article-card-hover:hover .art-img {
            transform: scale(1.04);
          }
        `}</style>
      </section>

      {/* Posture lab section completely removed */}

      {/* SECTION 4 — CATALOGUE EXPLORATION GRID */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container-premium">
          <div style={{ marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Product Catalogue
            </span>
            <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: 0 }}>
              The ErgoSpace Systems
            </h2>
          </div>

          {/* Capsule Card Grid Layout for all 5 Cards */}
          <div className="categories-layout-grid">
            {catalogueCategories.slice(0, 4).map((cat, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setCurrentPage('collection');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="capsule-category-card grid-span-2"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="capsule-img"
                />
              </div>
            ))}

            <div
              onClick={() => {
                setSelectedCategory(catalogueCategories[4].key);
                setCurrentPage('collection');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="capsule-category-card grid-centered"
            >
              <img 
                src={catalogueCategories[4].image} 
                alt={catalogueCategories[4].name} 
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="capsule-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — BEFORE/AFTER TRANSFORMATION WITH CLIP-PATH */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-premium">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Postural Re-Calibration
              </span>
              <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '1rem', lineHeight: '1.1' }}>
                Workspace transformation
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 300, lineHeight: '1.7', marginBottom: '2rem' }}>
                Drag the center handle horizontally to compare a traditional cluttered, uncalibrated environment with an optimized, clean ErgoSpace setup.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '2rem'
              }}>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--accent)' }}>60% Less</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Cable clutter visible</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>35% Lower</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Spinal pressure loads</div>
                </div>
              </div>
            </div>

            {/* Fixed Before/After slider with clipPath & absolute divider line */}
            <div 
              ref={sliderRef}
              style={{
                position: 'relative',
                width: '100%',
                height: '420px',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'ew-resize',
                boxShadow: 'var(--shadow-premium)',
                userSelect: 'none'
              }}
              onMouseDown={() => setIsDraggingSlider(true)}
              onTouchStart={() => setIsDraggingSlider(true)}
            >
              {/* After: Clean Premium Setup (Base Layer) */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <img 
                  src="/after_setup.png" 
                  alt="Premium ErgoSpace standing desk and luxury ergonomic chair setup" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', backgroundColor: 'var(--accent)', color: 'white', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '2px', fontWeight: 600 }}>
                  AFTER: PREMIUM ERGOSPACE UPGRADE
                </span>
              </div>

              {/* Before: Cluttered Setup (Clipped Layer) */}
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                zIndex: 2, 
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`
              }}>
                <img 
                  src="/before_setup.png" 
                  alt="Cluttered low-quality office setup with uncomfortable table and chair" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <span style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', backgroundColor: 'rgba(239, 68, 68, 0.85)', color: 'white', fontSize: '0.75rem', padding: '4px 10px', borderRadius: '2px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  BEFORE: POOR-QUALITY BASIC SETUP
                </span>
              </div>

              {/* Separate absolute divider line aligned to clip boundary */}
              <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${sliderPosition}%`,
                width: '2px',
                backgroundColor: 'white',
                boxShadow: '0 0 8px rgba(0,0,0,0.4)',
                zIndex: 3,
                transform: 'translateX(-50%)'
              }} />

              {/* Knob handle */}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: `${sliderPosition}%`, 
                transform: 'translate(-50%, -50%)', 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: 'white', 
                border: '2px solid var(--accent)', 
                boxShadow: 'var(--shadow-premium)', 
                zIndex: 4, 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                pointerEvents: 'none' 
              }}>
                <div style={{ display: 'flex', gap: '3px' }}>
                   <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></span>
                   <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent)' }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROJECTS SHOWCASE */}
      <section id="built-spaces" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container-premium">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Corporate Portfolio
              </span>
              <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: 0 }}>
                Spaces We've Built
              </h2>
            </div>
            
            <button onClick={() => { if (setSelectedCategory) setSelectedCategory('All'); setCurrentPage('collection'); }} className="btn-secondary" style={{ padding: '0.8rem 1.5rem' }}>
              <span>Browse Products</span>
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '3rem'
          }}>
            {PORTFOLIO_PROJECTS.slice(0, 6).map((proj) => (
              <div 
                key={proj.id}
                onClick={() => {
                  const client = B2B_CLIENTS.find(c => c.name.toLowerCase() === proj.client.toLowerCase());
                  if (client) setActiveCaseStudyId(client.id);
                }}
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-subtle)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
                className="project-card-hover"
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} className="proj-img" />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase' }}>{proj.category}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{proj.location}</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.5rem' }}>
                    {proj.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300, lineHeight: 1.6 }}>
                    {proj.description.slice(0, 100)}...
                  </p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600, marginTop: '1.25rem' }}>
                    <span>Read case study</span> <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button 
              onClick={() => { 
                setCurrentPage('projects'); 
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
              }} 
              className="btn-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <span>View All Projects</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <style>{`
          .project-card-hover:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-premium);
          }
          .project-card-hover:hover .proj-img {
            transform: scale(1.04);
          }
        `}</style>
      </section>

      {/* SECTION 7 — REVISED VISUAL REVIEWS (INFINITE SCROLLING TICKER) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
        <div className="container-premium" style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Social Proof
          </span>
          <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: 0 }}>
            The Review Ticker
          </h2>
        </div>

        {/* Endless scrolling reviews marquee */}
        <div style={{ width: '100%', overflow: 'hidden', position: 'relative' }} className="reviews-marquee-container">
          <div style={{
            display: 'flex',
            gap: '2.5rem',
            width: 'max-content',
            animation: 'marqueeReviews 120s linear infinite'
          }} className="reviews-ticker-row">
            {[...VISUAL_REVIEWS, ...VISUAL_REVIEWS].map((rev, idx) => (
              <div 
                key={idx}
                style={{
                  width: '380px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  padding: '2rem',
                  boxShadow: 'var(--shadow-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', color: 'var(--accent)' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="var(--accent)" stroke="none" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)' }}>5/5 Rating</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontWeight: 300, fontStyle: 'italic', minHeight: '60px' }}>
                  "{rev.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                  <img src={rev.avatar} alt={rev.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 600 }}>{rev.name}</h4>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{rev.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .reviews-marquee-container:hover .reviews-ticker-row {
            animation-play-state: paused;
          }
          @keyframes marqueeReviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* SECTION 8 — ABOUT US & OUR FOUNDER PREVIEW */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-premium">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Story Text */}
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Our Heritage
              </span>
              <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
                About Us & Our Founder
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 300, lineHeight: '1.7', marginBottom: '2rem' }}>
                Founded in 2004 by Mr. Prashant Garg as a small trading house, ErgoSpace (Tirupati Workspace Solutions Pvt Ltd) has grown into one of India's most respected office furniture solution providers, backed by a 1,00,000 sq. ft. state-of-the-art manufacturing facility in Gurugram.
              </p>
              <div style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Design & Adaptability:</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>We aim to fuse distinctive looks with ergonomics, supported by an in-house team of professional industry designers.</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Pan-India Support:</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>With showrooms in Noida and sales/service offices nationwide, we have executed over 5,000 projects successfully.</p>
                </div>
              </div>
              <button 
                onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="btn-primary"
              >
                <span>Read Our Story</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Founder Portrait Card */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
              }}>
                <img 
                  src="/prashant_garg.png" 
                  alt="Mr. Prashant Garg" 
                  style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }}
                />
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>Mr. Prashant Garg</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founder & Managing Director</span>
                </div>
              </div>
              
              <blockquote style={{ 
                fontSize: '1rem', 
                color: 'var(--text-secondary)', 
                fontStyle: 'italic', 
                lineHeight: '1.6', 
                fontWeight: 300,
                borderLeft: '2px solid var(--accent)',
                paddingLeft: '1rem',
                margin: 0
              }}>
                "Our friendly and flexible design team ensures that your space can evolve with the needs of your business. Adaptability, versatility, and customization are the rock-solid ideologies on which we stand."
              </blockquote>
              
              <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                <span><strong>Gurugram</strong><br/>Manufacturing Hub</span>
                <span><strong>Noida</strong><br/>Corporate Showroom</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 — CORPORATE SOLUTIONS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container-premium">
          <div style={{
            backgroundColor: 'var(--bg-alternate)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '5rem 4rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            boxShadow: 'var(--shadow-premium)'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                ErgoSpace B2B
              </span>
              <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '1rem', lineHeight: '1.1' }}>
                Corporate Solutions
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: 300, lineHeight: '1.7', marginBottom: '2rem' }}>
                Equip your startup office, corporate headquarters, or co-working space with ErgoSpace systems. We provide spatial layouts, customized finishes, and turnkey commercial logistics.
              </p>
              
              <button 
                onClick={() => setIsB2BModalOpen(true)}
                className="btn-primary"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80" 
                alt="Corporate Office" 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=400&q=80" 
                alt="Corporate Office 2" 
                style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', transform: 'translateY(1.5rem)' }}
              />
            </div>
          </div>
        </div>

        {/* Corporate Modal */}
        {isB2BModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }} onClick={() => setIsB2BModalOpen(false)}>
            <div style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              padding: '3rem',
              width: '100%',
              maxWidth: '520px',
              position: 'relative',
              boxShadow: 'var(--shadow-premium)'
            }} onClick={(e) => e.stopPropagation()}>
              
              <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '0.5rem' }}>
                Corporate Workspace Design
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem', fontWeight: 300 }}>
                Submit details about your workspace upgrade. An architectural consultant will contact you within 24 hours.
              </p>

              {b2bSubmitted ? (
                <div style={{ padding: '2rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(181, 142, 88, 0.15)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContext: 'center' }}>
                    <Check size={28} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Consultation Scheduled</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 300 }}>We have received your briefing. Prepare for space calibration.</p>
                </div>
              ) : (
                <form onSubmit={handleB2BSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={b2bFormData.name}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, name: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Company</label>
                      <input 
                        type="text" 
                        required
                        value={b2bFormData.company}
                        onChange={(e) => setB2bFormData({ ...b2bFormData, company: e.target.value })}
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Workspace Size</label>
                    <select 
                      value={b2bFormData.size}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, size: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}
                    >
                      <option value="10-50">10 to 50 Workstations</option>
                      <option value="50-200">50 to 200 Workstations</option>
                      <option value="200+">200+ Workstations</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Corporate Email</label>
                    <input 
                      type="email" 
                      required
                      value={b2bFormData.email}
                      onChange={(e) => setB2bFormData({ ...b2bFormData, email: e.target.value })}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                    <span>Request Callback</span>
                  </button>
                </form>
              )}

              <button onClick={() => setIsB2BModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 10 Removed - Replaced globally by Footer Contact CTA */}

      <style>{`
        @keyframes loopMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeLogo {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollBarAnim {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(-100%); }
        }
      `}</style>
    </div>
  );
}
