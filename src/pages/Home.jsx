import React from 'react';
import { Link } from 'react-router-dom';
import SilkHero from '../components/layout/SilkHero';

const Home = () => {
  return (
    <div>
      {/* Interactive Silk Touch Hero */}
      <SilkHero />

      {/* The Archways Section - Categories simplified to Sarees & Suits */}
      <section style={{ padding: '120px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Ornate Mahal Title */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h4 className="gold-caption" style={{ marginBottom: '16px' }}>Curated</h4>
          <h2 className="section-title">A Journey Through Tradition</h2>
          <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--muted-gold)', margin: '24px auto' }} />
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '80px',
        }}>
          
          {/* Saree Arch */}
          <div style={{ textAlign: 'center' }}>
            <div className="arch-container gold-border" style={{ height: '600px', marginBottom: '32px' }}>
              <img src="/images/saree.png" alt="Royal Saree Detail" />
            </div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--sindoor-red)' }}>Sarees</h3>
            <p style={{ fontFamily: 'Lora', opacity: 0.8, marginBottom: '24px', padding: '0 20px' }}>
              Drapes of pure mulberry silk intricately woven with gold Zari by the master artisans of India.
            </p>
            <Link to="/sarees" className="gold-caption" style={{ textDecoration: 'underline', color: 'var(--text-charcoal)' }}>Explore Sarees</Link>
          </div>

          {/* Suits Arch */}
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <div className="arch-container gold-border" style={{ height: '600px', marginBottom: '32px' }}>
               <img src="/images/suit.png" alt="Royal Anarkali Suit Detail" />
            </div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'var(--sindoor-red)' }}>Suits</h3>
            <p style={{ fontFamily: 'Lora', opacity: 0.8, marginBottom: '24px', padding: '0 20px' }}>
              Regal silhouettes adorned with pearls and majestic threadwork, reminiscent of Mughal architecture.
            </p>
            <Link to="/suits" className="gold-caption" style={{ textDecoration: 'underline', color: 'var(--text-charcoal)' }}>Explore Suits</Link>
          </div>

        </div>
      </section>

      {/* Editorial Split Section - Mahal Design */}
      <section style={{ display: 'flex', flexWrap: 'wrap', backgroundColor: '#1a1a1a', color: 'var(--bg-ivory)' }}>
        <div style={{ flex: '1 1 50%', minHeight: '600px', position: 'relative' }}>
          <img 
            src="/images/saree.png" 
            alt="Craftsmanship" 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
        </div>
        <div style={{ flex: '1 1 50%', padding: '120px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 className="gold-caption" style={{ marginBottom: '24px' }}>The Palace Courtyard</h4>
          <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '32px' }}>Woven in the Looms of History</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9, maxWidth: '500px', fontFamily: 'Lora', lineHeight: '1.8' }}>
            Our exclusive boutique pieces travel directly from the master weavers of India to your collection. 
            Each zari motif tells a tale, crafted over painstaking hours utilizing techniques preserved since the royal eras.
          </p>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
