import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: 'calc(100vh - var(--header-height) - 64px)', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      padding: '80px 24px',
      boxSizing: 'border-box',
      background: 'radial-gradient(circle at 70% 20%, rgba(139, 44, 245, 0.05) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(139, 44, 245, 0.02) 0%, transparent 50%)',
      width: '100%'
    }}>
      {/* Hero Content Container */}
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        {/* Decorative Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(139, 44, 245, 0.08)',
          border: '1px solid rgba(139, 44, 245, 0.15)',
          padding: '6px 16px',
          borderRadius: '30px',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--accent)',
          marginBottom: '28px',
          letterSpacing: '0.2px'
        }}>
          ✨ AI-Powered Recruitment Platform
        </div>

        {/* Main Title */}
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: 800, 
          lineHeight: 1.15, 
          letterSpacing: '-1.5px', 
          color: 'var(--text-h)',
          marginBottom: '20px'
        }}>
          Welcome to the <span style={{
            background: 'linear-gradient(135deg, var(--accent), var(--accent-light))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Job Portal</span>
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: '1.6', 
          color: 'var(--text)', 
          opacity: 0.85, 
          maxWidth: '580px', 
          margin: '0 auto 36px auto'
        }}>
          Apply to active job openings, upload your resume for automated AI screening, and track your application status in one simple, modern interface.
        </p>

        {/* Call to Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button 
            className="sma-btn sma-btn-primary" 
            style={{ padding: '14px 32px', fontSize: '15px', borderRadius: '10px' }}
            onClick={() => navigate(token ? '/jobs' : '/login')}
          >
            {token ? "Browse Job Openings" : "Login to Your Account"}
          </button>
          {!token && (
            <button 
              className="sma-btn sma-btn-secondary" 
              style={{ padding: '14px 32px', fontSize: '15px', borderRadius: '10px' }}
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
