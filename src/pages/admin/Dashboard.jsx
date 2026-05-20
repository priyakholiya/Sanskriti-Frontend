import React, { useEffect, useState } from 'react';
import { dashboardApi } from '../../services/api';
import { Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Re-using dashboard API
    dashboardApi?.getStats()
      .then(data => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h4 className="gold-caption">Overview</h4>
        <h1 className="mega-title" style={{ fontSize: '3.5rem', color: 'var(--sindoor-red)' }}>Dashboard</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
        <div style={{ background: '#fff', padding: '32px', border: '1px solid var(--border-gold)' }}>
          <p className="gold-caption">Products</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 500 }}>{stats?.totalProducts || 0}</span>
            <Package size={40} color="var(--muted-gold)" />
          </div>
        </div>

        <div style={{ background: '#fff', padding: '32px', border: '1px solid var(--border-gold)' }}>
          <p className="gold-caption">Orders</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 500 }}>{stats?.totalOrders || 0}</span>
            <ShoppingBag size={40} color="var(--muted-gold)" />
          </div>
        </div>

        <div style={{ background: 'var(--text-charcoal)', padding: '32px', color: 'var(--bg-ivory)' }}>
          <p className="gold-caption" style={{ color: 'var(--muted-gold)' }}>Revenue</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 500 }}>₹{stats?.totalRevenue || 0}</span>
            <TrendingUp size={40} color="var(--muted-gold)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
