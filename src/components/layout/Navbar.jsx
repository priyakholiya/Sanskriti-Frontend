import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBackground = (isHome && !isScrolled && !isMenuOpen) ? 'transparent' : 'var(--bg-ivory)';
  const navColor = 'var(--text-charcoal)';

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 'var(--nav-height)',
        padding: '0 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: navBackground,
        color: navColor,
        transition: 'all 0.5s ease',
        zIndex: 100,
        borderBottom: (!isHome || isScrolled) ? '1px solid var(--border-light)' : 'none'
      }}>
        
        <div style={{ flex: 1, display: 'flex', gap: '30px', alignItems: 'center' }} className="desktop-only">
          <Link to="/sarees" style={{ color: navColor, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>Sarees</Link>
          <Link to="/suits" style={{ color: navColor, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>Suits</Link>
          <Link to="/about" style={{ color: navColor, fontSize: '0.9rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }}>About</Link>
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <Link to="/" style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '2.5rem', 
            letterSpacing: '0.05em' 
          }}>
            Sanskriti
          </Link>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '30px' }}>
          <Link to="/admin" target="_blank" rel="noopener noreferrer" style={{ color: navColor, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }} className="desktop-only">Admin</Link>
          <Link to="/checkout" style={{ color: navColor, display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
            <span style={{ fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Cart</span>
            <div style={{ position: 'relative' }}>
              <ShoppingBag size={24} strokeWidth={1} />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: 'var(--sindoor-red)',
                  color: 'white',
                  fontSize: '0.7rem',
                  padding: '2px 6px',
                  borderRadius: '50%',
                  fontFamily: 'Lora'
                }}>
                  {cartCount}
                </span>
              )}
            </div>
          </Link>
          <button onClick={() => setIsMenuOpen(true)} className="mobile-only" style={{ color: navColor }}>
            <Menu size={28} strokeWidth={1} />
          </button>
        </div>

      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>

      {/* Fullscreen Overlay Menu */}
      {isMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--bg-ivory)',
          color: 'var(--text-charcoal)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            height: 'var(--nav-height)',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={32} strokeWidth={1} />
            </button>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', letterSpacing: '0.05em' }}>
              Sanskriti
            </Link>
            <div style={{ width: '32px' }} /> {/* spacer */}
          </div>

          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '40px'
          }}>
            <Link to="/" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'Playfair Display', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--text-charcoal)' }}>Home</Link>
            <Link to="/sarees" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'Playfair Display', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--text-charcoal)' }}>Sarees</Link>
            <Link to="/suits" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'Playfair Display', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--text-charcoal)' }}>Suits</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'Playfair Display', fontSize: '3rem', letterSpacing: '0.05em', color: 'var(--text-charcoal)' }}>About</Link>
            <Link to="/admin" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', letterSpacing: '0.05em', color: 'var(--sindoor-red)', marginTop: '20px' }}>Admin</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
