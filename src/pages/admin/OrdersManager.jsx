import React, { useState, useEffect } from 'react';
import { ordersApi } from '../../services/api';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    setLoading(true);
    ordersApi.getAll()
      .then(data => setOrders(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await ordersApi.updateStatus(id, newStatus);
      loadOrders(); 
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading && orders.length === 0) return <div style={{ padding: '40px', fontFamily: 'Playfair Display' }}><h2>Loading Royal Commissions...</h2></div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h4 className="gold-caption">Commissions</h4>
          <h1 className="mega-title" style={{ fontSize: '3rem', color: 'var(--mehendi-green)' }}>Orders & Logistics</h1>
          <p style={{ fontFamily: 'Lora', opacity: 0.8, fontSize: '1.1rem', marginTop: '16px' }}>
            Fulfillment queue for the royal clientele.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '24px' }}>
          <div style={{ textAlign: 'right', padding: '16px', border: '1px solid var(--border-gold)', backgroundColor: '#fff', minWidth: '120px' }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--sindoor-red)' }}>
              {orders.filter(o => o.status === 'PENDING').length}
            </div>
            <div style={{ fontFamily: 'Lora', fontSize: '0.85rem', color: 'gray', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Pending</div>
          </div>
          <div style={{ textAlign: 'right', padding: '16px', border: '1px solid var(--border-gold)', backgroundColor: '#fff', minWidth: '120px' }}>
            <div style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem', color: 'var(--text-charcoal)' }}>{orders.length}</div>
            <div style={{ fontFamily: 'Lora', fontSize: '0.85rem', color: 'gray', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ backgroundColor: '#fff', padding: '32px', border: '1px solid var(--border-gold)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Lora', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--muted-gold)' }}>
              <th style={{ padding: '16px', fontWeight: 'bold' }}>Order ID</th>
              <th style={{ padding: '16px', fontWeight: 'bold' }}>Client Details</th>
              <th style={{ padding: '16px', fontWeight: 'bold' }}>Selections</th>
              <th style={{ padding: '16px', fontWeight: 'bold' }}>Value</th>
              <th style={{ padding: '16px', fontWeight: 'bold' }}>Date</th>
              <th style={{ padding: '16px', fontWeight: 'bold' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
                <td style={{ padding: '16px', fontWeight: 'bold', color: 'var(--sindoor-red)' }}>#{String(order.id).padStart(5, '0')}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.customerName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'gray' }}>{order.email}</div>
                  <div style={{ fontSize: '0.85rem', color: 'gray', marginTop: '4px' }}>{order.address}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  {order.items?.map(item => (
                    <div key={item.id} style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 'bold' }}>{item.quantity}x</span> {item.productName} ({item.size})
                    </div>
                  ))}
                </td>
                <td style={{ padding: '16px', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{order.totalAmount}</td>
                <td style={{ padding: '16px', fontSize: '0.9rem', color: 'gray' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '16px' }}>
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{
                      fontFamily: 'Lora',
                      padding: '8px 16px',
                      border: '1px solid var(--border-gold)',
                      backgroundColor: order.status === 'PENDING' ? 'rgba(158, 27, 27, 0.05)' : 
                                       order.status === 'DELIVERED' ? 'var(--bg-ivory)' : '#fff',
                      color: order.status === 'PENDING' ? 'var(--sindoor-red)' : 
                             order.status === 'DELIVERED' ? 'gray' : 'var(--mehendi-green)',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      fontSize: '0.85rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </td>
              </tr>
            ))}
            
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '60px 0', color: 'gray', fontStyle: 'italic' }}>
                  No royal commissions have been placed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default OrdersManager;
