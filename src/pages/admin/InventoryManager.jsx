import React, { useState, useEffect } from 'react';
import { productsApi, inventoryApi } from '../../services/api';
import { ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';

const InventoryManager = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Stock Form State
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [action, setAction] = useState('IN'); // 'IN' or 'OUT'

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodsData, movesData] = await Promise.all([
        productsApi.getAll(),
        inventoryApi.getMovements()
      ]);
      setProducts(prodsData);
      setMovements(movesData);
      
      if (!selectedVariantId && prodsData.length > 0 && prodsData[0].variants?.length > 0) {
        setSelectedVariantId(prodsData[0].variants[0].id.toString());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { variantId: parseInt(selectedVariantId), quantity: parseInt(quantity), reason: reason || `Manual Stock ${action}` };
      
      if (action === 'IN') {
        await inventoryApi.stockIn(payload);
      } else {
        await inventoryApi.stockOut(payload);
      }
      
      setQuantity('');
      setReason('');
      loadData(); 
    } catch (err) {
      alert(err.message);
    }
  };

  const inputStyle = {
    fontFamily: 'Lora',
    padding: '12px 16px',
    border: '1px solid var(--border-gold)',
    backgroundColor: 'transparent',
    color: 'var(--text-charcoal)',
    fontSize: '1rem',
    outline: 'none',
    width: '100%'
  };

  const labelStyle = {
    fontFamily: 'Playfair Display',
    color: 'var(--muted-gold)',
    marginBottom: '8px',
    display: 'block',
    fontSize: '1.2rem'
  };

  if (loading && products.length === 0) return <div style={{ padding: '40px', fontFamily: 'Playfair Display' }}><h2>Loading Royal Vault...</h2></div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h4 className="gold-caption">Management</h4>
        <h1 className="mega-title" style={{ fontSize: '3rem', color: 'var(--mehendi-green)' }}>The Royal Vault</h1>
        <p style={{ fontFamily: 'Lora', opacity: 0.8, fontSize: '1.1rem', marginTop: '16px' }}>Stock movement, level adjustments, and logistics for the atelier.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 2fr', gap: '60px' }}>
        
        {/* Left Col: Stock Update Form & Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid var(--border-gold)' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '24px' }}>Log New Shipment or Dispatch</h2>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <button onClick={() => setAction('IN')} style={{ 
                flex: 1, padding: '12px', fontFamily: 'Playfair Display', fontSize: '1.2rem',
                border: '1px solid var(--border-gold)',
                background: action === 'IN' ? 'var(--mehendi-green)' : 'transparent', 
                color: action === 'IN' ? 'var(--bg-ivory)' : 'var(--text-charcoal)',
                transition: 'all 0.3s'
              }}>
                 Receiving IN (+)
              </button>
              <button onClick={() => setAction('OUT')} style={{ 
                flex: 1, padding: '12px', fontFamily: 'Playfair Display', fontSize: '1.2rem',
                border: '1px solid var(--border-gold)',
                background: action === 'OUT' ? 'var(--sindoor-red)' : 'transparent', 
                color: action === 'OUT' ? 'var(--bg-ivory)' : 'var(--text-charcoal)',
                transition: 'all 0.3s'
              }}>
                 Dispatch OUT (-)
              </button>
            </div>

            <form onSubmit={handleStockSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div>
                <label style={labelStyle}>Select Piece & Customization</label>
                <select required value={selectedVariantId} onChange={e => setSelectedVariantId(e.target.value)} style={inputStyle}>
                  <option value="" disabled>Choose a piece...</option>
                  {products.map(p => 
                    p.variants?.map(v => (
                      <option key={v.id} value={v.id}>{p.name} - {v.size} (Remaining: {v.stock})</option>
                    ))
                  )}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Quantity</label>
                  <input required type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} style={inputStyle} placeholder="5" />
                </div>
                <div style={{ flex: 2 }}>
                  <label style={labelStyle}>Logbook Note (Optional)</label>
                  <input type="text" value={reason} onChange={e => setReason(e.target.value)} style={inputStyle} placeholder={action === 'IN' ? "New weaver shipment" : "Damaged in transit"} />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
                Confirm Ledger {action === 'IN' ? 'Addition' : 'Deduction'}
              </button>
            </form>
          </div>

          {/* Quick Matrix */}
          <div style={{ backgroundColor: '#fff', padding: '32px', border: '1px solid var(--border-gold)' }}>
             <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.3rem', marginBottom: '24px' }}>Active Inventory Matrix</h3>
             
             <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '8px', borderBottom: '1px solid var(--border-gold)', paddingBottom: '8px', marginBottom: '16px', fontSize: '0.85rem', fontFamily: 'Lora', fontWeight: 'bold' }}>
               <div>PIECE</div>
               <div style={{textAlign: 'center'}}>S</div>
               <div style={{textAlign: 'center'}}>M</div>
               <div style={{textAlign: 'center'}}>L</div>
               <div style={{textAlign: 'center'}}>XL</div>
               <div style={{textAlign: 'center'}}>XXL</div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {products.slice(0, 5).map(product => {
                 const sizeMap = product.variants?.reduce((acc, curr) => ({ ...acc, [curr.size]: curr.stock }), {}) || {};
                 
                 return (
                   <div key={product.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '8px', fontSize: '0.85rem', fontFamily: 'Lora' }}>
                     <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
                     {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                       <div key={size} style={{
                         textAlign: 'center', 
                         backgroundColor: sizeMap[size] === undefined ? 'transparent' : (sizeMap[size] <= 5 ? (sizeMap[size] === 0 ? 'rgba(0,0,0,0.05)' : 'rgba(158, 27, 27, 0.1)') : 'rgba(27, 58, 36, 0.1)'),
                         color: sizeMap[size] === undefined ? 'transparent' : (sizeMap[size] === 0 ? 'gray' : 'var(--text-charcoal)'),
                         border: sizeMap[size] !== undefined ? '1px solid var(--border-gold)' : 'none'
                       }}>
                         {sizeMap[size] !== undefined ? sizeMap[size] : '-'}
                       </div>
                     ))}
                   </div>
                 )
               })}
             </div>
          </div>
        </div>

        {/* Right Col: Movement Log */}
        <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid var(--border-gold)', overflowY: 'auto', maxHeight: '1000px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem' }}>The Ledger</h2>
            <Activity color="var(--muted-gold)" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {movements.map((move, i) => (
              <div key={move.id} style={{ 
                display: 'flex', alignItems: 'center', gap: '24px', padding: '24px 0',
                borderBottom: i !== movements.length - 1 ? '1px solid rgba(212,175,55,0.3)' : 'none'
              }}>
                <div style={{ 
                  width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: move.type === 'IN' ? 'rgba(27, 58, 36, 0.1)' : 'rgba(158, 27, 27, 0.1)',
                  color: move.type === 'IN' ? 'var(--mehendi-green)' : 'var(--sindoor-red)',
                  borderRadius: '50%'
                }}>
                  {move.type === 'IN' ? <ArrowDownRight size={24} /> : <ArrowUpRight size={24} />}
                </div>
                
                <div style={{ flex: 1, fontFamily: 'Lora' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 'bold' }}>{move.productName} ({move.size})</span>
                    <span style={{ fontWeight: 'bold', color: move.type === 'OUT' ? 'var(--sindoor-red)' : 'var(--mehendi-green)' }}>
                      {move.type === 'IN' ? '+' : '-'}{move.quantity}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'gray' }}>
                    <span style={{ fontStyle: 'italic' }}>{move.reason}</span>
                    <span>{new Date(move.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {movements.length === 0 && (
              <p style={{ color: 'gray', textAlign: 'center', paddingTop: '40px', fontFamily: 'Lora' }}>The ledger is empty. No movements recorded.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryManager;
