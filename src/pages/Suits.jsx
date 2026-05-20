import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsApi } from '../services/api';

const Suits = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.getAvailable()
      .then(data => setProducts(data.filter(p => p.category === 'SUIT')))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-ivory)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        height: '60vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <img src="/images/suit.png" alt="Suits Hero" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff' }}>
          <h4 className="gold-caption" style={{ color: 'var(--muted-gold)' }}>Regal Silhouettes</h4>
          <h1 className="mega-title" style={{ fontSize: '4rem' }}>Suits</h1>
        </div>
      </div>

      <div style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', fontFamily: 'Playfair Display', fontSize: '2rem' }}>Curating Suits...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '60px 40px' }}>
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="arch-container gold-border" style={{ height: '500px', marginBottom: '24px' }}>
                  {product.images?.[0] ? <img src={product.images[0].imageUrl} alt={product.name} /> : <div style={{ height: '100%', backgroundColor: '#eee' }} />}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', marginBottom: '8px' }}>{product.name}</h3>
                  <p style={{ color: 'var(--sindoor-red)', fontWeight: '500' }}>₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Suits;
