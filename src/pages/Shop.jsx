import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productsApi } from '../services/api';

const Shop = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Determine category from the route path (e.g., /sarees, /suits)
  const categoryPath = location.pathname.substring(1);
  const displayTitle = categoryPath.toUpperCase();

  useEffect(() => {
    // For now, load all available products.
    // In the future, this can be filtered by category if the backend supports it.
    productsApi.getAvailable()
      .then(data => {
        // Mock filtering purely for display purposes based on URL 
        // if they don't have categories in the DB yet
        if (categoryPath === 'sarees' || categoryPath === 'suits') {
          // If the DB has everything together, we just display it.
          setProducts(data);
        } else {
          setProducts(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categoryPath]);

  return (
    <div style={{ backgroundColor: 'var(--bg-ivory)', minHeight: '100vh', padding: '60px 40px' }}>

      {/* Editorial Header */}
      <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
        <h4 className="gold-caption" style={{ marginBottom: '16px' }}>Collection</h4>
        <h1 className="mega-title" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>{displayTitle}</h1>
        <div style={{
          width: '60px',
          height: '2px',
          backgroundColor: 'var(--muted-gold)',
          margin: '32px auto'
        }} />
        <p style={{ fontFamily: 'Lora', opacity: 0.8, fontSize: '1.1rem' }}>
          Explore our exclusive range of {categoryPath}. Meticulously crafted using traditional methods to honor the rich legacy and rituals of India.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'Playfair Display', fontSize: '2rem' }}>
          Curating the collection...
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '60px 40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} style={{ display: 'block' }}>
              <div style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#fff', marginBottom: '24px' }} className="arch-container gold-border">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '500px', backgroundColor: 'rgba(212, 175, 55, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Playfair Display', color: 'var(--muted-gold)' }}>No Image Provided</span>
                  </div>
                )}
                {/* Subtle Hover Overlay */}
                <div style={{
                  position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.05)',
                  transition: 'background 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0
                }} className="hover-overlay">
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', marginBottom: '8px', color: 'var(--text-charcoal)' }}>
                  {product.name}
                </h3>
                <p style={{ fontFamily: 'Lora', color: 'var(--sindoor-red)', fontWeight: '500', fontSize: '1.1rem' }}>
                  ₹{product.price}
                </p>
              </div>
            </Link>
          ))}
          {products.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0', opacity: 0.6 }}>
              <p style={{ fontSize: '1.2rem' }}>The atelier is currently preparing new masterpieces. Please check back later.</p>
            </div>
          )}
        </div>
      )}

      {/* Internal Hover styling */}
      <style>{`
        a:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>

    </div>
  );
};

export default Shop;
