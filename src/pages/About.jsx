import React, { useState } from 'react';
import { productsApi } from '../services/api';

const About = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      // We'll add this to productsApi or create a new contactApi
      const response = await fetch('https://sanskriti-backend-lhnj.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-ivory)', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <section style={{ height: '70vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src="/images/saree.png" alt="Traditional Loom" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: '#fff', padding: '0 20px' }}>
          <h4 className="gold-caption" style={{ color: 'var(--muted-gold)' }}>The Heart of Sanskriti</h4>
          <h1 className="mega-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>Our Legacy</h1>
        </div>
      </section>

      {/* Philosophy Section */}
      <section style={{ padding: '120px 40px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2 className="section-title" style={{ marginBottom: '40px' }}>Why We Weave</h2>
        <p style={{ fontSize: '1.4rem', fontFamily: 'Playfair Display', lineHeight: '1.8', color: 'var(--text-charcoal)', marginBottom: '60px' }}>
          In the rapid pulse of the modern world, the ancient rhythm of the handloom remains a sanctuary. 
          Sanskriti was born not just as a boutique, but as a preservation movement. 
          We believe that a garment is more than fabric—it is a vessel of culture, a legacy of a thousand weavers, 
          and a participant in your most sacred rituals.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', textAlign: 'left' }}>
          <div>
            <h4 className="gold-caption" style={{ marginBottom: '16px' }}>The Artisan</h4>
            <p style={{ fontFamily: 'Lora', opacity: 0.8, lineHeight: '1.7' }}>
              We work directly with master artisans in Banaras, Kanchipuram, and Bengal. 
              By removing intermediaries, we ensure that the soul of the loom is respected and the weaver is honored.
            </p>
          </div>
          <div>
            <h4 className="gold-caption" style={{ marginBottom: '16px' }}>The Ritual</h4>
            <p style={{ fontFamily: 'Lora', opacity: 0.8, lineHeight: '1.7' }}>
              Indian culture is built on rituals—from the morning lamp to the grand wedding fire. 
              Our drapes are crafted to be part of these moments, gaining character with every generation they are passed down to.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Break */}
      <section style={{ height: '500px', backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         <div style={{ textAlign: 'center', color: 'var(--bg-ivory)', padding: '40px' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '24px' }}>"Every thread is a prayer, every motif a memory."</h2>
            <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--muted-gold)', margin: '0 auto' }} />
         </div>
      </section>

      {/* Contact Section */}
      <section style={{ padding: '120px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h4 className="gold-caption" style={{ marginBottom: '16px' }}>Contact Us</h4>
          <h2 className="section-title">Seek Counsel</h2>
          <p style={{ fontFamily: 'Lora', opacity: 0.7 }}>Have a question about our collections or craftsmanship? Our curators are here to assist.</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <input 
              type="text" 
              placeholder="Name" 
              required
              style={inputStyle}
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="Email" 
              required
              style={inputStyle}
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <input 
            type="text" 
            placeholder="Subject" 
            style={inputStyle}
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          />
          <textarea 
            placeholder="Your Message" 
            rows="5" 
            required
            style={{...inputStyle, resize: 'none'}}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
          
          <button 
            type="submit" 
            disabled={status.loading}
            style={{
              backgroundColor: 'var(--mehendi-green)',
              color: 'var(--bg-ivory)',
              padding: '18px',
              border: 'none',
              fontFamily: 'Playfair Display',
              fontSize: '1.2rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>

          {status.success && <p style={{ color: 'green', textAlign: 'center', fontFamily: 'Lora' }}>Your message has been sent to the vault. We will reach out soon.</p>}
          {status.error && <p style={{ color: 'var(--sindoor-red)', textAlign: 'center', fontFamily: 'Lora' }}>{status.error}</p>}
        </form>
      </section>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '15px 0',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border-gold)',
  fontFamily: 'Lora',
  fontSize: '1rem',
  outline: 'none'
};

export default About;
