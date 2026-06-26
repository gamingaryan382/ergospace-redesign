import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, WORKSPACE_SETUPS, VISUAL_REVIEWS } from '../data/products';
import { 
  Check, Star, ShieldCheck, Truck, RefreshCw, ChevronDown, Plus, Minus, ArrowRight, Video, Camera, Compass, X, FileText 
} from 'lucide-react';

export default function ProductPage({ productId, setCurrentPage }) {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  // Gallery Active State: 'video' | '360' | 0 | 1 | 2 | 'mesh_closeup' | 'wood_closeup'
  const [activeMedia, setActiveMedia] = useState('video');
  const [zoomLevel, setZoomLevel] = useState(1);

  // 360 rotation degree angle state
  const [rotationAngle, setRotationAngle] = useState(0);

  // Configurations selection
  const [selectedFinish, setSelectedFinish] = useState('Matte Obsidian');
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Sticky Buy Bar display state
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroRef = useRef(null);

  // FAQ state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // B2B Enquiry Modal States
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: '', company: '', email: '', phone: '', quantity: '10', message: '' });
  const [brochureStatus, setBrochureStatus] = useState(''); // '', 'loading', 'downloaded'

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
    setTimeout(() => {
      setIsEnquiryModalOpen(false);
      setEnquirySubmitted(false);
      setEnquiryForm({ name: '', company: '', email: '', phone: '', quantity: '10', message: '' });
    }, 2500);
  };

  const triggerBrochureDownload = () => {
    setBrochureStatus('loading');
    setTimeout(() => {
      setBrochureStatus('downloaded');
      setTimeout(() => setBrochureStatus(''), 3000);
    }, 1200);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const heroHeight = heroRef.current.offsetHeight;
      if (window.scrollY > heroHeight - 100) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find client setups featuring this product
  const productSetups = WORKSPACE_SETUPS.filter((setup) => setup.products.includes(product.id));

  // Find related products to recommend
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      
      {/* PRODUCT STAGE & BUY PANEL */}
      <section ref={heroRef} style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
        <div className="container-premium" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '4rem',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Re-sequenced Media Gallery with 360-degree support */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Main Stage Display */}
            <div style={{
              width: '100%',
              height: 'clamp(280px, 50vw, 480px)',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: '1000px'
            }}>
              {activeMedia === 'video' ? (
                <video 
                  src={product.video} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : activeMedia === '360' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%', height: '100%', justifyContent: 'center', padding: '2rem' }}>
                  <img 
                    src={product.image} 
                    alt="360 rotation model" 
                    style={{ 
                      height: '75%', 
                      objectFit: 'contain',
                      transform: `rotateY(${rotationAngle}deg)`,
                      transition: 'transform 0.1s ease-out'
                    }} 
                  />
                  <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                    <input 
                      type="range"
                      min="0"
                      max="360"
                      value={rotationAngle}
                      onChange={(e) => setRotationAngle(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent)' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Compass size={12} />
                      <span>Drag slider to rotate workspace (Angle: {rotationAngle}°)</span>
                    </span>
                  </div>
                </div>
              ) : activeMedia === 'mesh_closeup' ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=800&q=80" alt="Mesh Closeup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                    Burmese Elastomeric Suspension Mesh
                  </div>
                </div>
              ) : activeMedia === 'wood_closeup' ? (
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                  <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80" alt="Wood Closeup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', backgroundColor: 'var(--bg-dark)', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                    Hand-Selected Solid American Oak Grain
                  </div>
                </div>
              ) : (
                <img 
                  src={product.images[activeMedia]} 
                  alt={product.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transform: `scale(${zoomLevel})`,
                    transition: 'transform 0.3s ease-out',
                    cursor: 'zoom-in'
                  }}
                  onClick={() => setZoomLevel(prev => prev === 1 ? 1.6 : 1)}
                />
              )}

              {/* Tag indicator */}
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', backgroundColor: 'rgba(10,10,10,0.8)', color: 'white', fontSize: '0.65rem', padding: '4px 10px', borderRadius: '2px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {activeMedia === 'video' ? <><Video size={10} /><span>AUTOPLAY CINEMATIC</span></> : activeMedia === '360' ? <><Compass size={10} /><span>360 VIEW SHOWER</span></> : <><Camera size={10} /><span>HD DETAIL VIEW</span></>}
              </div>
            </div>

            {/* Thumbnails Navigation (Video, 360, Images, Closeups) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '0.75rem' }}>
              <button 
                onClick={() => { setActiveMedia('video'); setZoomLevel(1); }}
                style={{ height: '70px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: activeMedia === 'video' ? '2px solid var(--accent)' : '1px solid var(--border-color)', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
              >
                <video src={product.video} muted style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: 'rgba(0,0,0,0.2)' }}><Video size={14} /></div>
              </button>

              <button 
                onClick={() => { setActiveMedia('360'); setZoomLevel(1); }}
                style={{ height: '70px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: activeMedia === '360' ? '2px solid var(--accent)' : '1px solid var(--border-color)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-primary)' }}>
                  <Compass size={16} />
                  <span style={{ fontSize: '0.6rem', fontWeight: 600 }}>360°</span>
                </div>
              </button>

              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveMedia(idx); setZoomLevel(1); }}
                  style={{ height: '70px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: activeMedia === idx ? '2px solid var(--accent)' : '1px solid var(--border-color)', cursor: 'pointer', overflow: 'hidden' }}
                >
                  <img src={img} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}

              {product.category === 'Ergonomic Chairs' && (
                <button 
                  onClick={() => { setActiveMedia('mesh_closeup'); setZoomLevel(1); }}
                  style={{ height: '70px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: activeMedia === 'mesh_closeup' ? '2px solid var(--accent)' : '1px solid var(--border-color)', cursor: 'pointer', overflow: 'hidden' }}
                >
                  <img src="https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=80&q=80" alt="mesh thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              )}

              {['Height Adjustable Desks', 'Executive Tables', 'Conference Furniture'].includes(product.category) && (
                <button 
                  onClick={() => { setActiveMedia('wood_closeup'); setZoomLevel(1); }}
                  style={{ height: '70px', backgroundColor: 'var(--bg-secondary)', borderRadius: '4px', border: activeMedia === 'wood_closeup' ? '2px solid var(--accent)' : '1px solid var(--border-color)', cursor: 'pointer', overflow: 'hidden' }}
                >
                  <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=80&q=80" alt="wood thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Specifications Buying panel */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              ErgoSpace Premium
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontFamily: 'var(--font-display)', fontWeight: 600, margin: '0.5rem 0 1rem 0', lineHeight: 1.1 }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', color: 'var(--accent)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="var(--accent)" stroke="none" />)}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>{product.rating}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>({product.reviewsCount} verified reviews)</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6, marginBottom: '2rem' }}>
              {product.tagline}
            </p>

            {/* Select finish */}
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Select finish: <span style={{ color: 'var(--text-primary)' }}>{selectedFinish}</span>
              </h4>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Matte Obsidian', 'Graphite Silver', 'Champagne Gold'].map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedFinish(finish)}
                    style={{
                      border: selectedFinish === finish ? '2px solid var(--accent)' : '1px solid var(--border-color)',
                      backgroundColor: selectedFinish === finish ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '4px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Calculations & B2B enquiry actions */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span style={{ fontSize: '1rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
                *Starting price for individual unit. Volumes qualify for wholesale enterprise pricing.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => setIsEnquiryModalOpen(true)} 
                    className="btn-primary" 
                    style={{ flex: 1, padding: '1.2rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                  >
                    <span>Request Quote</span>
                  </button>
                  <button 
                    onClick={() => setIsEnquiryModalOpen(true)} 
                    style={{ 
                      flex: 1, 
                      padding: '1.2rem', 
                      backgroundColor: 'transparent',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      transition: 'var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                  >
                    Enquire Now
                  </button>
                </div>
                
                <button 
                  onClick={triggerBrochureDownload}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  }}
                >
                  <FileText size={16} />
                  <span>
                    {brochureStatus === 'loading' && 'Preparing brochure...'}
                    {brochureStatus === 'downloaded' && '✓ Catalogue Downloaded'}
                    {brochureStatus === '' && 'Download Product Brochure'}
                  </span>
                </button>
              </div>
            </div>

            {/* Trust highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <ShieldCheck size={18} style={{ color: 'var(--accent)' }} />
                <span>12 Year Warranty</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <Truck size={18} style={{ color: 'var(--accent)' }} />
                <span>Free Assembly</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
                <RefreshCw size={18} style={{ color: 'var(--accent)' }} />
                <span>30-Day Home Trial</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPARISON MATRIX (ErgoSpace vs Budget office seating) */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container-premium" style={{ maxWidth: '850px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="editorial-title" style={{ fontSize: '2.5rem' }}>The Calibrated Comparison</h2>
            <p className="editorial-subtitle" style={{ margin: '0 auto' }}>Explore how ErgoSpace structural choices compare to generic department chairs.</p>
          </div>

          <div style={{ overflowX: 'auto', width: '100%', marginBottom: '1rem' }}>
            <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-dark)', color: 'white' }}>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: 600 }}>Features</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: 600, color: 'var(--accent-light)' }}>ErgoSpace Calibrations</th>
                <th style={{ padding: '1.25rem', textAlign: 'left', fontWeight: 600, opacity: 0.6 }}>Standard Office Chairs</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600 }}>Lumbar Matrix Support</td>
                <td style={{ padding: '1.25rem', color: 'var(--accent)', fontWeight: 500 }}>Adaptive dynamic spine nodes</td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)' }}>Fixed static foam pad</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600 }}>Lift cylinder</td>
                <td style={{ padding: '1.25rem', color: 'var(--accent)', fontWeight: 500 }}>German engineered Class-4</td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)' }}>Standard utility Class-2</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600 }}>Structural Frame</td>
                <td style={{ padding: '1.25rem', color: 'var(--accent)', fontWeight: 500 }}>Die-cast polished aluminum</td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)' }}>Molded PVC plastic</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1.25rem', fontWeight: 600 }}>Guarantee Period</td>
                <td style={{ padding: '1.25rem', color: 'var(--accent)', fontWeight: 500 }}>12 Years Structural Warranty</td>
                <td style={{ padding: '1.25rem', color: 'var(--text-secondary)' }}>1 Year Limited Store Warranty</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </section>

      {/* DETAILED MATERIAL CLOSEUPS STORYTELLING */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-premium">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Materials Integrity
            </span>
            <h2 className="editorial-title" style={{ fontSize: '3rem', marginTop: '0.5rem' }}>
              Crafted Without Compromise
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem' }}>
            <div>
              <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img src="https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?auto=format&fit=crop&w=600&q=80" alt="Mesh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Elastomeric Suspension Mesh</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>
                Custom woven structural mesh distributes body pressure points cleanly, promoting blood oxygenation cycles and preventing tailbone strain.
              </p>
            </div>

            <div>
              <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', marginBottom: '1.5rem' }}>
                <img src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=600&q=80" alt="Wood" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Burmese Hardwood Grain</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>
                Selected sustainably sourced hardwoods hand-rubbed in organic oils. Highlights natural grain structures that anchor digital environments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WORKSPACE SETUP INSPIRATION */}
      {productSetups.length > 0 && (
        <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <div className="container-premium">
            <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Setup Inspiration
              </span>
              <h2 className="editorial-title" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
                Shop Setup Integrations
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {productSetups.map((setup) => (
                <div 
                  key={setup.id}
                  style={{ backgroundColor: 'var(--bg-primary)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)' }}
                >
                  <img src={setup.image} alt={setup.title} style={{ width: '100%', height: 'clamp(180px, 30vw, 240px)', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600 }}>{setup.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Designed by {setup.creator}</p>
                    </div>
                    <button onClick={() => setCurrentPage('home')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>
                      <span>View Setup</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED WORKSPACE COMPLEMENTS */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="container-premium">
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600 }}>Complete Your Workspace</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Add matching components configured for this posture model.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {relatedProducts.map((p) => (
              <div 
                key={p.id}
                onClick={() => {
                  setSelectedFinish('Matte Obsidian');
                  setActiveMedia('video');
                  setCurrentPage('collection'); // redirect
                }}
                style={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '6px', border: '1px solid var(--border-color)', padding: '1.5rem', cursor: 'pointer' }}
              >
                <img src={p.image} alt={p.name} style={{ width: '100%', height: 'clamp(150px, 25vw, 200px)', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600 }}>{p.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--accent)' }}>₹{p.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: '0.75rem', textDecoration: 'underline' }}>Configure</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVISED FAQ SECTION */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container-premium" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="editorial-title" style={{ fontSize: '2.5rem' }}>Frequently Answered</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {product.faq.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} style={{ backgroundColor: 'var(--bg-primary)', borderRadius: '6px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    style={{ width: '100%', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 500 }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.5rem 1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', fontWeight: 300 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STICKY ADD TO CART BAR */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        boxShadow: '0 -10px 40px rgba(0,0,0,0.06)',
        zIndex: 998,
        transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: '1rem 0'
      }}>
        <div className="container-premium" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={product.image} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>{product.name}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Finish: {selectedFinish}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            <button onClick={() => setIsEnquiryModalOpen(true)} className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.85rem' }}>
              <span>Request Quote</span>
            </button>
          </div>
        </div>
      </div>

      {/* B2B Enquiry Modal Overlay */}
      {isEnquiryModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setIsEnquiryModalOpen(false)}>
          <div style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: 'clamp(1.25rem, 5vw, 3rem)',
            width: '100%',
            maxWidth: '550px',
            position: 'relative',
            boxShadow: 'var(--shadow-premium)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }} onClick={(e) => e.stopPropagation()}>
            
            <button 
              onClick={() => setIsEnquiryModalOpen(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}
            >
              <X size={20} />
            </button>

            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Corporate Solutions
              </span>
              <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-display)', fontWeight: 600, marginTop: '0.25rem' }}>
                Request a Custom Quote
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Configure {product.name} for your organization. Our consultants will respond within 2 business hours.
              </p>
            </div>

            {enquirySubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '3rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(235, 10, 30, 0.1)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Check size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 600, fontFamily: 'var(--font-display)' }}>Enquiry Received</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                    Thank you. A premium workspace specialist will reach out shortly.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Your Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={enquiryForm.name} 
                    onChange={e => setEnquiryForm({...enquiryForm, name: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div className="responsive-two-column-grid" style={{ gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Company Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={enquiryForm.company} 
                      onChange={e => setEnquiryForm({...enquiryForm, company: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Est. Quantity *</label>
                    <input 
                      type="number" 
                      required 
                      min="1"
                      value={enquiryForm.quantity} 
                      onChange={e => setEnquiryForm({...enquiryForm, quantity: e.target.value})}
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Work Email *</label>
                  <input 
                    type="email" 
                    required 
                    value={enquiryForm.email} 
                    onChange={e => setEnquiryForm({...enquiryForm, email: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Contact Number *</label>
                  <input 
                    type="tel" 
                    required 
                    value={enquiryForm.phone} 
                    onChange={e => setEnquiryForm({...enquiryForm, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Additional Requirements</label>
                  <textarea 
                    rows="3"
                    value={enquiryForm.message} 
                    onChange={e => setEnquiryForm({...enquiryForm, message: e.target.value})}
                    placeholder={`e.g. Need specific logo branding on upholstery, custom height cylinders, or matching office storage.`}
                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', outline: 'none', resize: 'none' }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '0.85rem', marginTop: '0.5rem', cursor: 'pointer' }}>
                  Submit Request
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
