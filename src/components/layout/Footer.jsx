import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--mehendi-green)',
      color: 'var(--bg-ivory)',
      padding: '80px 40px 40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '60px',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        paddingBottom: '60px'
      }}>
        
        <div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: 'var(--muted-gold)', marginBottom: '24px' }}>Sanskriti</h2>
          <p style={{ opacity: 0.8, maxWidth: '300px' }}>
            Weaving the threads of our ancient heritage into modern luxury. Each garment is a tribute to the rituals of India.
          </p>
        </div>

        <div>
          <h4 className="gold-caption" style={{ marginBottom: '24px' }}>Collections</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link to="/sarees" style={{ opacity: 0.8 }}>Sarees</Link>
            <Link to="/suits" style={{ opacity: 0.8 }}>Suits</Link>
          </div>
        </div>

        <div>
          <h4 className="gold-caption" style={{ marginBottom: '24px' }}>The Studio</h4>
          <p style={{ opacity: 0.8, marginBottom: '24px' }}>
            Subscribe to receive tales of craftsmanship and exclusive access to new collections.
          </p>
          <div style={{ display: 'flex', borderBottom: '1px solid var(--muted-gold)' }}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--bg-ivory)',
                padding: '12px 0',
                outline: 'none',
                fontFamily: 'Lora',
                fontSize: '1rem'
              }}
            />
            <button style={{ 
              color: 'var(--muted-gold)', 
              fontFamily: 'Playfair Display',
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>Subscribe</button>
          </div>
        </div>

      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '40px auto 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.5,
        fontSize: '0.85rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Sanskriti Heritage Indian Wear. All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
