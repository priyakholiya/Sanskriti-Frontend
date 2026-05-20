import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      
      {/* Mobile Top Header */}
      <div className="mobile-only" style={{ 
        height: '70px', 
        borderBottom: '1px solid var(--border-gold)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0 24px',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        backgroundColor: 'var(--mehendi-green)',
        color: 'var(--muted-gold)',
        zIndex: 50
      }}>
        <h1 style={{ fontFamily: 'Playfair Display', fontSize: '1.5rem', margin: 0, letterSpacing: '0.05em' }}>Sanskriti Admin</h1>
        <button onClick={() => setIsSidebarOpen(true)} style={{ color: 'var(--muted-gold)' }}>
          <Menu size={28} />
        </button>
      </div>

      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-ivory)' }}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Overlay when sidebar open on mobile */}
        {isSidebarOpen && (
          <div 
            className="mobile-only"
            onClick={() => setIsSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90 }} 
          />
        )}
        
        <main style={{ flex: 1, backgroundColor: 'var(--bg-ivory)', width: '100%' }}>
          <div style={{ padding: '0', height: '100%' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
