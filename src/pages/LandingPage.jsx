import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 'calc(100vh - var(--header-height) - 120px)', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      padding: '40px 20px' 
    }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>
          Welcome to the <span>Job Portal</span>
        </h1>
        <p className="hero-subtitle" style={{ fontSize: '1.2rem', marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          Apply to active job openings, upload your resume for automatic evaluation, and track application progress in one streamlined platform.
        </p>
        <div className="hero-cta" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button 
            className="sma-btn sma-btn-primary" 
            style={{ padding: '14px 28px', fontSize: '15px' }}
            onClick={() => navigate(token ? '/jobs' : '/login')}
          >
            {token ? "Browse Job Openings" : "Login"}
          </button>
          {!token && (
            <button 
              className="sma-btn sma-btn-secondary" 
              style={{ padding: '14px 28px', fontSize: '15px' }}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
