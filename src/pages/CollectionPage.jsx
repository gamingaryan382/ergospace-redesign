import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { 
  SlidersHorizontal, ChevronDown, Check, X, ArrowRight, Eye, ShoppingCart, Info 
} from 'lucide-react';

export default function CollectionPage({ setCurrentPage, setSelectedProductId }) {
  
  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(60000);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Quick Preview State
  const [previewProduct, setPreviewProduct] = useState(null);

  // Comparison State
  const [compareList, setCompareList] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  const categories = ['All', 'Lounge Chairs', 'Glitter Series', 'Leatherite Chairs', 'Work From Home Chairs', 'Gaming Chair'];

  // Handle Comparison Select
  const handleCompareToggle = (product) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert("You can compare a maximum of 3 products.");
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  // Filter & Sort Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else {
      matchesCategory = product.category === selectedCategory;
    }
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.rating - a.rating; // default popular
  });

  const selectProduct = (id) => {
    setSelectedProductId(id);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '1.5rem', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <div className="container-premium">
        
        {/* Page Title Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ErgoSpace Catalog
          </span>
          <h1 className="editorial-title" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            The Active Collection
          </h1>
          <p className="editorial-subtitle">
            Premium office installations engineered to optimize postures, support long focus blocks, and elevate workspace aesthetics.
          </p>
        </div>

        {/* Filter Toolbar controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.5rem',
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Categories Tab list */}
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? 'var(--bg-dark)' : 'var(--bg-secondary)',
                  color: selectedCategory === cat ? 'white' : 'var(--text-primary)',
                  padding: '0.6rem 1.5rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-display)',
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filter Trigger & Sort dropdown */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                padding: '0.6rem 1.25rem',
                borderRadius: '4px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 500,
                color: showFilters ? 'var(--accent)' : 'var(--text-primary)'
              }}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '0.5rem' }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  paddingRight: '1rem'
                }}
              >
                <option value="popular">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Expandable Filter Panel drawer */}
        {showFilters && (
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '2rem',
            marginBottom: '3rem',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--accent)' }}>
                  Max Budget
                </h4>
                <input 
                  type="range" 
                  min="3000" 
                  max="60000" 
                  step="2000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--accent)' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500 }}>
                  <span>₹3,000</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '1rem', color: 'var(--accent)' }}>
                  Ergo Guarantees
                </h4>
                <ul style={{ listStyle: 'none', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} /> White Glove Installation</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} /> 30-Day Risk-Free Trial</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={14} /> Up to 12 Years Warranty</li>
                </ul>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setMaxPrice(60000);
                    setSelectedCategory('All');
                  }}
                  style={{
                    background: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    textDecoration: 'underline',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Catalog Grid list */}
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '6rem 0', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.25rem', fontWeight: 300, marginBottom: '1rem' }}>No products match your filter parameters.</p>
            <button className="btn-primary" onClick={() => setMaxPrice(60000)}>Reset Budget Limit</button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '6rem'
          }}>
            {filteredProducts.map((product) => {
              const inComparison = compareList.some((p) => p.id === product.id);
              
              return (
                <div 
                  key={product.id} 
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'var(--transition-smooth)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                  onClick={() => selectProduct(product.id)}
                >
                  
                  {/* Image container */}
                  <div 
                    className="image-zoom-container" 
                    style={{ 
                      height: '280px', 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderRadius: '4px',
                      marginBottom: '1.5rem' 
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="image-zoom-img" 
                    />
                    
                    {/* Floating Quick View overlay button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewProduct(product);
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-medium)',
                        zIndex: 3
                      }}
                    >
                      <Eye size={18} strokeWidth={1.5} />
                    </button>
                  </div>

                  {/* Text Spec details */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {product.category}
                      </span>
                      
                      {/* Compare Checkbox */}
                      <label 
                        onClick={(e) => e.stopPropagation()} 
                        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500 }}
                      >
                        <input 
                          type="checkbox"
                          checked={inComparison}
                          onChange={() => handleCompareToggle(product)}
                          style={{ accentColor: 'var(--accent)' }}
                        />
                        <span>Compare</span>
                      </label>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                      {product.name}
                    </h3>
                    
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 300, minHeight: '40px' }}>
                      {product.tagline}
                    </p>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '1.25rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textDecoration: 'line-through', marginRight: '0.5rem' }}>
                          ₹{product.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span style={{ fontSize: '1.25rem', fontWeight: 600, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProductId(product.id);
                          setCurrentPage('product');
                        }}
                        className="btn-primary"
                        style={{
                          padding: '0.65rem 1.25rem',
                          fontSize: '0.8rem',
                          borderRadius: '4px'
                        }}
                      >
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Floating Bottom Comparison Bar */}
      {compareList.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--bg-dark)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-premium)',
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
          zIndex: 999,
          animation: 'revealUp 0.3s forwards',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 400 }}>
            Comparing <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{compareList.length}</span> of 3 products
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {compareList.map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                <span>{p.name.split(' ')[0]}</span>
                <button 
                  onClick={() => handleCompareToggle(p)}
                  style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => setShowComparisonModal(true)}
              className="btn-primary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', backgroundColor: 'var(--accent)', color: 'white' }}
            >
              <span>Compare Spec Matrix</span>
            </button>
            <button 
              onClick={() => setCompareList([])}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Product Comparison Matrix Modal Overlay */}
      {showComparisonModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1005,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setShowComparisonModal(false)}>
          
          <div style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: 'clamp(1.25rem, 5vw, 3rem)',
            width: '100%',
            maxWidth: '850px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: 'var(--shadow-premium)'
          }} onClick={(e) => e.stopPropagation()}>
            
            <h3 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: '2rem' }}>
              Product Comparison Matrix
            </h3>

            {/* Table Wrapper for horizontal scroll support */}
            <div style={{ overflowX: 'auto', width: '100%', marginBottom: '1rem' }}>
              <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem', width: '25%', color: 'var(--text-secondary)', fontWeight: 500 }}>Specs</th>
                    {compareList.map((p) => (
                      <th key={p.id} style={{ padding: '1rem', width: '25%', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Price</td>
                    {compareList.map((p) => (
                      <td key={p.id} style={{ padding: '1rem', fontWeight: 600, color: 'var(--accent)' }}>
                        ₹{p.price.toLocaleString('en-IN')}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Dynamically extract specs and populate */}
                  {Object.keys(compareList[0]?.specs || {}).map((specKey) => (
                    <tr key={specKey} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{specKey}</td>
                      {compareList.map((p) => (
                        <td key={p.id} style={{ padding: '1rem', fontWeight: 300, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                          {p.specs[specKey] || 'N/A'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setShowComparisonModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal Overlay */}
      {previewProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 1002,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setPreviewProduct(null)}>
          
          <div style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            padding: 'clamp(1.25rem, 5vw, 3rem)',
            width: '100%',
            maxWidth: '750px',
            position: 'relative',
            boxShadow: 'var(--shadow-premium)',
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Left Preview Image */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <img 
                src={previewProduct.image} 
                alt={previewProduct.name} 
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)' }}
              />
            </div>

            {/* Right Spec briefing */}
            <div style={{ flex: 1, minWidth: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase' }}>
                  Quick Preview
                </span>
                <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', fontWeight: 600, margin: '0.5rem 0' }}>
                  {previewProduct.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: 300 }}>
                  {previewProduct.tagline}
                </p>

                {/* Core feature points */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                  {previewProduct.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <Check size={14} style={{ color: 'var(--accent)' }} />
                      <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{feat.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'var(--font-display)' }}>
                  ₹{previewProduct.price.toLocaleString('en-IN')}
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button 
                    onClick={() => {
                      setSelectedProductId(previewProduct.id);
                      setCurrentPage('product');
                      setPreviewProduct(null);
                    }}
                    className="btn-primary" 
                    style={{ flex: 1 }}
                  >
                    <span>Request Quote</span>
                  </button>
                  <button 
                    onClick={() => selectProduct(previewProduct.id)}
                    className="btn-secondary" 
                    style={{ flex: 1 }}
                  >
                    <span>Full Specs</span>
                  </button>
                </div>
              </div>

            </div>

            <button
              onClick={() => setPreviewProduct(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
