import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const SilkHero = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 'calc(-1 * var(--nav-height))',
        backgroundColor: 'var(--bg-ivory)',
        overflow: 'hidden',
        cursor: 'crosshair'
      }}
    >
      {/* Base Layer - Solid Ivory Cream */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'var(--bg-ivory)'
      }} />

      {/* The Silk Sheen Ripple Effect mapped to Mouse Pos */}
      <div style={{
        position: 'absolute',
        inset: -200,
        background: `radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(212, 175, 55, 0.15) 0%, rgba(250, 248, 245, 0) 100%)`,
        transition: 'background 0.1s ease',
        transform: `scale(1.05)`,
        pointerEvents: 'none'
      }} />

      {/* Slowly undulating background wave using CSS animation to mimic silk in the wind */}
      <div className="silk-wave" style={{
        position: 'absolute',
        inset: -100,
        background: 'linear-gradient(45deg, rgba(212, 175, 55, 0.05) 0%, rgba(158, 27, 27, 0.05) 100%)',
        backgroundSize: '400% 400%',
        pointerEvents: 'none',
        opacity: 0.8
      }} />

      <div className="fade-in" style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'var(--text-charcoal)', pointerEvents: 'none' }}>
        <h4 className="gold-caption" style={{ marginBottom: '24px' }}>The Spring Archive</h4>
        <h1 className="mega-title" style={{ marginBottom: '40px', color: 'var(--sindoor-red)' }}>Royal Radiance</h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 40px', fontFamily: 'Lora', fontSize: '1.2rem', opacity: 0.9 }}>
          Intricate hand-woven embroideries crafted for the modern palace.
        </p>
        <div style={{ pointerEvents: 'auto' }}>
          <Link to="/sarees" className="btn-outline" style={{ borderColor: 'var(--sindoor-red)', color: 'var(--sindoor-red)', marginRight: '16px' }}>
            Sarees
          </Link>
          <Link to="/suits" className="btn-outline" style={{ borderColor: 'var(--text-charcoal)', color: 'var(--text-charcoal)' }}>
            Suits
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes waveAnimate {
          0% { background-position: 0% 50%; transform: rotate(0deg) scale(1); }
          50% { background-position: 100% 50%; transform: rotate(1deg) scale(1.02); }
          100% { background-position: 0% 50%; transform: rotate(0deg) scale(1); }
        }
        .silk-wave {
          animation: waveAnimate 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default SilkHero;
