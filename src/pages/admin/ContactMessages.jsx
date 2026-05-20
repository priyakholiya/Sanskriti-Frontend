import React, { useEffect, useState } from 'react';
import { Mail, CheckCircle, Clock } from 'lucide-react';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('https://sanskriti-backend-lhnj.onrender.com/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`https://sanskriti-backend-lhnj.onrender.com/api/contact/${id}/read`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m));
      }
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h4 className="gold-caption" style={{ marginBottom: '8px' }}>Admin Center</h4>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem' }}>Customer Inquiries</h1>
      </div>

      {loading ? (
        <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'Lora' }}>Retrieving scrolls...</div>
      ) : (
        <div style={{ display: 'grid', gap: '24px' }}>
          {messages.map(msg => (
            <div 
              key={msg.id} 
              style={{ 
                backgroundColor: '#fff', 
                padding: '30px', 
                border: '1px solid var(--border-gold)',
                position: 'relative',
                opacity: msg.isRead ? 0.7 : 1,
                borderLeft: msg.isRead ? '1px solid var(--border-gold)' : '5px solid var(--sindoor-red)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '1.4rem', marginBottom: '4px' }}>{msg.subject || 'No Subject'}</h3>
                  <p style={{ fontFamily: 'Lora', color: 'var(--text-charcoal)', fontWeight: 600 }}>{msg.name} <span style={{ fontWeight: 400, opacity: 0.6 }}>({msg.email})</span></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.5, fontSize: '0.85rem', marginBottom: '10px' }}>
                      <Clock size={14} /> {new Date(msg.createdAt).toLocaleDateString()}
                   </div>
                   {!msg.isRead && (
                     <button 
                        onClick={() => markAsRead(msg.id)}
                        style={{ backgroundColor: 'var(--mehendi-green)', color: '#fff', border: 'none', padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                     >
                       <CheckCircle size={14} /> Mark as Read
                     </button>
                   )}
                </div>
              </div>
              <p style={{ fontFamily: 'Lora', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{msg.message}</p>
            </div>
          ))}

          {messages.length === 0 && (
            <div style={{ textAlign: 'center', padding: '100px', opacity: 0.5, border: '1px dashed var(--border-gold)' }}>
              <Mail size={48} style={{ marginBottom: '20px' }} />
              <p style={{ fontFamily: 'Lora', fontSize: '1.2rem' }}>No inquiries in the vault yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
