import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ordersApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, Truck, CheckCircle, Minus, Plus, Trash2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    try {
      setLoading(true);
      const orderPayload = {
        ...formData,
        items: cartItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }))
      };

      await ordersApi.create(orderPayload);
      setOrdered(true);
      clearCart();
    } catch (error) {
      alert('Order failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-ivory)', padding: '40px' }}>
        <CheckCircle size={80} color="var(--mehendi-green)" style={{ marginBottom: '24px' }} />
        <h1 className="mega-title" style={{ fontSize: '3rem', marginBottom: '16px' }}>Your Order is Placed</h1>
        <p style={{ fontFamily: 'Lora', fontSize: '1.2rem', opacity: 0.7, marginBottom: '40px', textAlign: 'center' }}>
          Thank you for choosing Sanskriti. Our master weavers are preparing your collection.
        </p>
        <button onClick={() => navigate('/')} className="btn-primary">Return to Place</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-ivory)', minHeight: '100vh', padding: '140px 40px 80px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px' }}>

        {/* Left: Shipping Form */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', marginBottom: '40px' }}>Place Delivery Details</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label className="gold-caption" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
                <input required name="customerName" value={formData.customerName} onChange={handleChange} style={inputStyle} placeholder="Enter Name" />
              </div>
              <div>
                <label className="gold-caption" style={{ display: 'block', marginBottom: '8px' }}>Phone</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} style={inputStyle} placeholder="Enter Contact No." />
              </div>
            </div>

            <div>
              <label className="gold-caption" style={{ display: 'block', marginBottom: '8px' }}>Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="Enter Email" />
            </div>

            <div>
              <label className="gold-caption" style={{ display: 'block', marginBottom: '8px' }}>Shipping Arches</label>
              <textarea required name="address" value={formData.address} onChange={handleChange} style={{ ...inputStyle, minHeight: '120px' }} placeholder="Enter Address" />
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '16px' }}>Payment Method</h3>
              <div style={{ padding: '24px', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#fff' }}>
                <CreditCard size={24} color="var(--muted-gold)" />
                <span style={{ fontFamily: 'Lora' }}>Cash on Delivery</span>
              </div>
            </div>

            <button type="submit" disabled={loading || cartItems.length === 0} className="btn-primary" style={{ marginTop: '32px', width: '100%', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <ShoppingBag size={20} /> {loading ? 'Processing...' : 'Place My Order'}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid var(--border-gold)', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', marginBottom: '32px' }}>Your Collection</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {cartItems.map(item => (
              <div key={item.variantId} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ width: '60px', height: '80px', backgroundColor: 'var(--bg-ivory)' }}>
                  {item.imageUrl && <img src={item.imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</p>
                      <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Size: {item.size}</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => removeFromCart(item.variantId)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sindoor-red)', padding: '4px' }}
                      title="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border-gold)', padding: '4px 8px' }}>
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 500, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p style={{ color: 'var(--sindoor-red)', fontSize: '0.9rem', fontWeight: 600 }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && <p style={{ textAlign: 'center', opacity: 0.5 }}>Your cart is empty.</p>}
          </div>

          <div style={{ borderTop: '1px solid var(--border-gold)', paddingTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', opacity: 0.7 }}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', opacity: 0.7 }}>
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 500 }}>
              <span style={{ fontFamily: 'Playfair Display' }}>Total</span>
              <span style={{ color: 'var(--sindoor-red)' }}>₹{cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '16px',
  border: '1px solid var(--border-gold)',
  backgroundColor: 'transparent',
  fontFamily: 'Lora',
  fontSize: '1rem',
  outline: 'none'
};

export default Checkout;
