import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingBag, Box, Activity, Mail, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {

  return (
    <aside className={`sidebar-container ${isOpen ? 'open' : ''}`} style={{ backgroundColor: 'var(--bg-ivory)' }}>
      <div style={{ padding: '40px 24px', borderBottom: '1px solid var(--border-gold)', backgroundColor: 'var(--mehendi-green)' }}>
        <h1 style={{ fontFamily: 'Playfair Display', color: 'var(--muted-gold)', fontSize: '2rem' }}>Sanskriti Admin</h1>
        <button className="mobile-only" onClick={() => setIsOpen(false)} style={{ color: 'var(--bg-ivory)' }}>
          <X size={24} />
        </button>
      </div>

      <nav style={{ padding: '32px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p className="gold-caption" style={{ marginBottom: '16px' }}>The Admin</p>

        <NavLink to="/admin" end className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
           <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        
        <NavLink to="/admin/sarees" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
           <ShoppingBag size={20} /> Saree Catalog
        </NavLink>
        
        <NavLink to="/admin/suits" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
           <Box size={20} /> Suits Catalog
        </NavLink>

        <NavLink to="/admin/inventory" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
           <Activity size={20} /> Inventory Vault
        </NavLink>

        <NavLink to="/admin/orders" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
           <Users size={20} /> Orders
        </NavLink>

        <NavLink to="/admin/messages" className={({isActive}) => `nav-link ${isActive ? 'active' : ''}`}>
           <Mail size={20} /> Messages
        </NavLink>
      </nav>


      <style>{`
        .sidebar-container {
          width: 280px;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          border-right: 1px solid var(--border-gold);
          background-color: var(--bg-ivory);
          transition: transform 0.3s ease;
        }
        @media (max-width: 768px) {
          .sidebar-container {
            position: fixed;
            left: 0;
            z-index: 100;
            transform: translateX(-100%);
          }
          .sidebar-container.open {
            transform: translateX(0);
          }
          .mobile-only {
            display: flex !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          text-transform: uppercase;
          font-family: 'Lora', serif;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
          color: var(--text-charcoal);
          border-radius: 4px;
        }
        .nav-link:hover {
          background: rgba(212, 175, 55, 0.1);
          color: var(--sindoor-red);
        }
        .nav-link.active {
          background: var(--mehendi-green);
          color: var(--muted-gold);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
