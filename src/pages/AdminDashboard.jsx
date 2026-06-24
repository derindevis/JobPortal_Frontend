import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import client from '../api/client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ jobs: 0, applications: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [jobsRes, appsRes] = await Promise.all([
          client.get('/jobs'),
          client.get('/applications/me')
        ]);
        setStats({
          jobs: jobsRes.data.length,
          applications: appsRes.data.length,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <section className="sma-section">
      <div className="sma-section-header">
        <h2 className="sma-section-title">Admin Dashboard</h2>
        <p className="sma-section-subtitle">Overview of your platform</p>
      </div>

      {loading ? (
        <div className="sma-empty-state">Loading dashboard...</div>
      ) : (
        <>
          <div className="sma-student-grid" style={{ marginBottom: '24px' }}>
            <div className="sma-card" style={{ alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
              <h3 style={{ fontSize: '36px', margin: '0 0 8px 0', color: 'var(--accent)' }}>{stats.jobs}</h3>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)' }}>Total Active Jobs</p>
            </div>
            <div className="sma-card" style={{ alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
              <h3 style={{ fontSize: '36px', margin: '0 0 8px 0', color: 'var(--accent)' }}>{stats.applications}</h3>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--text)' }}>Total Applications</p>
            </div>
          </div>

          <div className="sma-card">
            <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="sma-btn sma-btn-primary" onClick={() => navigate('/jobs/new')}>
                + Create New Job
              </button>
              <button className="sma-btn sma-btn-secondary" onClick={() => navigate('/jobs')}>
                Manage All Jobs
              </button>
              <button className="sma-btn sma-btn-secondary" onClick={() => navigate('/applications')}>
                Review Applications
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
