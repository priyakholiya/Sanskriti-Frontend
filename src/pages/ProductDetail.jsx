import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';
import { useCart } from '../context/CartContext';
import { ChevronLeft, Plus, Minus, ShoppingBag } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    productsApi.getById(id)
      .then(data => {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'Playfair Display', fontSize: '2rem' }}>Curating Details...</div>;
  if (!product) return <div style={{ padding: '100px', textAlign: 'center' }}>Masterpiece not found.</div>;

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setToastMessage('Please select a size first.');
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    addToCart(product, selectedVariant, quantity);
    setToastMessage('Added to your collection.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-ivory)', minHeight: '100vh', padding: '140px 40px 80px' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', color: 'var(--muted-gold)' }}>
        <ChevronLeft size={20} /> Back to Collection
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Image Gallery */}
        <div className="arch-container gold-border" style={{ height: '700px' }}>
          {product.images?.[0] ? (
            <img src={product.images[0].imageUrl} alt={product.name} />
          ) : (
            <div style={{ height: '100%', backgroundColor: '#eee' }} />
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '20px 0' }}>
          <h4 className="gold-caption" style={{ marginBottom: '16px' }}>{product.category}</h4>
          <h1 className="mega-title" style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: '1.1' }}>{product.name}</h1>
          <p style={{ fontSize: '1.8rem', color: 'var(--sindoor-red)', fontFamily: 'Lora', marginBottom: '32px' }}>₹{product.price.toLocaleString()}</p>
          
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '32px', marginBottom: '40px' }}>
            <p style={{ fontFamily: 'Lora', fontSize: '1.1rem', color: 'var(--text-charcoal)', opacity: 0.8, whiteSpace: 'pre-wrap' }}>
              {product.description}
            </p>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <label style={{ display: 'block', fontFamily: 'Playfair Display', fontSize: '1.2rem', marginBottom: '16px' }}>
                {product.category === 'SAREE' ? 'Standard Size' : 'Select Size'}
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {product.variants.map(v => (
                  <button 
                    key={v.id} 
                    onClick={() => setSelectedVariant(v)}
                    disabled={v.stock === 0}
                    style={{
                      padding: '12px 24px',
                      border: '1px solid var(--border-gold)',
                      backgroundColor: selectedVariant?.id === v.id ? 'var(--mehendi-green)' : 'transparent',
                      color: selectedVariant?.id === v.id ? 'var(--muted-gold)' : 'var(--text-charcoal)',
                      opacity: v.stock === 0 ? 0.3 : 1,
                      fontFamily: 'Lora'
                    }}
                  >
                    {v.size} {v.stock === 0 && '(Out of Stock)'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-gold)', height: '56px' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q-1))} style={{ padding: '0 16px' }}><Minus size={18} /></button>
              <span style={{ padding: '0 8px', minWidth: '40px', textAlign: 'center', fontFamily: 'Lora' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q+1)} style={{ padding: '0 16px' }}><Plus size={18} /></button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              className="btn-primary" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', height: '56px' }}
            >
              <ShoppingBag size={20} /> Add to Collection
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div style={{
        position: 'fixed',
        bottom: toastMessage ? '40px' : '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'var(--text-charcoal)',
        color: 'var(--bg-ivory)',
        padding: '16px 32px',
        fontFamily: 'Lora',
        fontSize: '1.1rem',
        zIndex: 1000,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        transition: 'bottom 0.3s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        pointerEvents: 'none'
      }}>
        {toastMessage && toastMessage.includes('Added') ? <ShoppingBag size={20} color="var(--muted-gold)" /> : null}
        {toastMessage}
      </div>
    </div>
  );
};

export default ProductDetail;
