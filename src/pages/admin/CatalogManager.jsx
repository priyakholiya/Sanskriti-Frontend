import React, { useState, useEffect } from 'react';
import { productsApi, variantsApi } from '../../services/api';
import { uploadImage, saveProductImage } from '../../services/cloudinary';
import { Plus, Image as ImageIcon, Check } from 'lucide-react';

const CatalogManager = ({ title = "Catalog" }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [sizes, setSizes] = useState({ S: false, M: false, L: false, XL: false, XXL: false });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const isSaree = title.toLowerCase().includes('saree');
  const categoryCode = isSaree ? 'SAREE' : 'SUIT';

  const loadProducts = () => {
    setLoading(true);
    productsApi.getAll()
      .then(data => {
        // Filter by category so Saree / Suits pages are separate in Admin
        setProducts(data.filter(p => p.category === categoryCode));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadProducts(); }, [title]);

  const handleSizeToggle = (size) => {
    setSizes(prev => ({ ...prev, [size]: !prev[size] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      
      const product = await productsApi.create({ 
        name, 
        description, 
        price: parseFloat(price),
        category: categoryCode 
      });
      
      // Only create distinct sizes if it's a SUIT
      if (!isSaree) {
        for (const [size, isSelected] of Object.entries(sizes)) {
          if (isSelected) {
            await variantsApi.create({ productId: product.id, size });
          }
        }
      }

      if (imageFile) {
        const imageUrl = await uploadImage(imageFile);
        await saveProductImage(product.id, imageUrl, 'FRONT');
      }

      setName('');
      setDescription('');
      setPrice('');
      setSizes({ S: false, M: false, L: false, XL: false, XXL: false });
      setImageFile(null);
      loadProducts();
      
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
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

  if (loading && products.length === 0) return <div style={{ padding: '40px', fontFamily: 'Playfair Display' }}><h2>Curating {title}...</h2></div>;

  return (
    <div style={{ padding: '40px', maxWidth: '1600px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h4 className="gold-caption">Management</h4>
        <h1 className="mega-title" style={{ fontSize: '3rem', color: 'var(--sindoor-red)' }}>{title}</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px' }}>
        
        {/* Left Col: Upload Form */}
        <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid var(--border-gold)' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', marginBottom: '32px' }}>Add New Masterpiece</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <label style={labelStyle}>Title</label>
              <input required value={name} onChange={e => setName(e.target.value)} 
                     style={inputStyle} placeholder="e.g. Crimson Banarasi Silk Saree" />
            </div>

            <div>
              <label style={labelStyle}>Description</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)}
                        style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} 
                        placeholder="Handwoven in Varanasi using pure gold threads..." />
            </div>

            <div>
              <label style={labelStyle}>Price (₹)</label>
              <input required type="number" value={price} onChange={e => setPrice(e.target.value)}
                     style={inputStyle} placeholder="15999" />
            </div>

            {!isSaree && (
              <div>
                <label style={labelStyle}>Available Customizes/Sizes</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {Object.keys(sizes).map(size => (
                    <button type="button" key={size} onClick={() => handleSizeToggle(size)}
                      style={{
                        padding: '12px 24px', 
                        border: '1px solid var(--border-gold)', 
                        fontFamily: 'Lora',
                        background: sizes[size] ? 'var(--sindoor-red)' : 'transparent',
                        color: sizes[size] ? 'var(--bg-ivory)' : 'var(--text-charcoal)',
                        transition: 'all 0.3s ease'
                      }}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label style={labelStyle}>Primary Photography</label>
              <div style={{ 
                border: '1px dashed var(--muted-gold)', padding: '40px', textAlign: 'center', cursor: 'pointer',
                background: imageFile ? 'rgba(212, 175, 55, 0.05)' : 'transparent',
                transition: 'background 0.3s'
              }}>
                <input type="file" accept="image/*" id="img-upload" style={{ display: 'none' }}
                       onChange={e => setImageFile(e.target.files[0])} />
                <label htmlFor="img-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', color: 'var(--muted-gold)' }}>
                  {imageFile ? <Check size={32} /> : <ImageIcon size={32} />}
                  <span style={{ fontFamily: 'Lora', fontSize: '1rem' }}>
                    {imageFile ? imageFile.name : 'Click to Upload High-Res Image'}
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" disabled={uploading} className="btn-primary" style={{ marginTop: '24px', width: '100%' }}>
              {uploading ? 'Curating via Cloudinary...' : 'Add to Catalog'}
            </button>
          </form>
        </div>

        {/* Right Col: Collection List */}
        <div style={{ backgroundColor: '#fff', padding: '40px', border: '1px solid var(--border-gold)' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem' }}>Current Collection</h2>
            <span style={{ fontFamily: 'Lora', color: 'var(--sindoor-red)' }}>{products.length} Masterpieces</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {products.map(product => (
              <div key={product.id} style={{ display: 'flex', gap: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(26,26,26,0.05)' }}>
                
                {/* Image Thumb */}
                <div style={{ width: '120px', height: '160px', backgroundColor: 'rgba(212,175,55,0.1)', flexShrink: 0, overflow: 'hidden' }}>
                  {product.images?.[0] ? (
                    <img src={product.images[0].imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                     <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <ImageIcon color="var(--border-gold)" />
                     </div>
                  )}
                </div>
                
                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', marginBottom: '8px' }}>{product.name}</h3>
                    <span style={{ fontFamily: 'Lora', color: 'var(--sindoor-red)', fontSize: '1.2rem' }}>₹{product.price}</span>
                  </div>
                  
                  <p style={{ fontFamily: 'Lora', opacity: 0.8, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {product.variants?.map(v => (
                      <span key={v.id} title={`SKU: ${v.sku}`} style={{ 
                        padding: '4px 12px', 
                        border: '1px solid var(--border-gold)',
                        fontFamily: 'Lora',
                        fontSize: '0.85rem',
                        backgroundColor: v.stock === 0 ? 'rgba(0,0,0,0.03)' : 'var(--bg-ivory)',
                        color: v.stock === 0 ? 'gray' : 'var(--text-charcoal)' 
                      }}>
                        {v.size} ({v.stock} left)
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
            {products.length === 0 && (
              <p style={{ fontFamily: 'Lora', opacity: 0.6, textAlign: 'center', padding: '60px 0' }}>The royal collection is currently empty.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CatalogManager;
