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
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      // Grid pattern combined with mesh gradient glow
      backgroundImage: `
        radial-gradient(circle at 50% 30%, rgba(139, 44, 245, 0.08) 0%, transparent 60%),
        radial-gradient(circle at 10% 70%, rgba(139, 44, 245, 0.03) 0%, transparent 40%),
        linear-gradient(rgba(139, 44, 245, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(139, 44, 245, 0.03) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
      backgroundPosition: '0 0, 0 0, center center, center center'
    }}>
      
      {/* Inline Styles for Premium Floating Animations */}
      <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-medium {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .floating-card-left {
          animation: float-slow 6s ease-in-out infinite;
        }
        .floating-card-right {
          animation: float-medium 7s ease-in-out infinite;
        }
        @media (max-width: 968px) {
          .floating-graphic {
            display: none !important;
          }
        }
      `}</style>

      {/* Floating Graphics Card 1 (Left Side) */}
      <div className="floating-graphic floating-card-left" style={{
        position: 'absolute',
        left: '8%',
        top: '30%',
        width: '220px',
        padding: '16px',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(139, 44, 245, 0.15)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'left',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ATS SCORE
          </span>
          <span style={{
            fontSize: '11px',
            fontWeight: 800,
            background: '#2ed573',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            96%
          </span>
        </div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-h)' }}>John Doe</h4>
        <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: 'var(--text)' }}>Senior React Developer</p>
        <div style={{ fontSize: '11px', color: '#2ed573', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>✓</span> Shortlisted for Interview
        </div>
      </div>

      {/* Floating Graphics Card 2 (Right Side) */}
      <div className="floating-graphic floating-card-right" style={{
        position: 'absolute',
        right: '8%',
        bottom: '25%',
        width: '240px',
        padding: '18px',
        background: 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(139, 44, 245, 0.15)',
        borderRadius: '16px',
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'left',
        zIndex: 2,
        pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#ffa502', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            NEW OPENING
          </span>
          <span style={{ fontSize: '12px' }}>🔥</span>
        </div>
        <h4 style={{ margin: '0 0 4px 0', fontSize: '14.5px', color: 'var(--text-h)' }}>AI Research Engineer</h4>
        <p style={{ margin: '0 0 10px 0', fontSize: '11.5px', color: 'var(--text)' }}>Cognitive Systems Ltd</p>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ fontSize: '10px', background: 'var(--code-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-h)', fontWeight: 600 }}>
            Bengaluru
          </span>
          <span style={{ fontSize: '10px', background: 'rgba(139, 44, 245, 0.08)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)', fontWeight: 600 }}>
            ₹18L - ₹25LPA
          </span>
        </div>
      </div>

      {/* Hero Content Container */}
      <div style={{ maxWidth: '680px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
        {/* Main Title */}
        <h1 style={{ 
          fontSize: '3.6rem', 
          fontWeight: 800, 
          lineHeight: 1.15, 
          letterSpacing: '-1.8px', 
          color: 'var(--text-h)',
          marginBottom: '24px'
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
          maxWidth: '560px', 
          margin: '0 auto 40px auto'
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
