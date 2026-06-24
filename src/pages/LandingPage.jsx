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
      padding: '40px 24px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      // Grid pattern combined with mesh gradient glow
      backgroundImage: `
        radial-gradient(circle at 50% 30%, rgba(139, 44, 245, 0.07) 0%, transparent 60%),
        radial-gradient(circle at 10% 70%, rgba(139, 44, 245, 0.02) 0%, transparent 40%),
        linear-gradient(rgba(139, 44, 245, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(139, 44, 245, 0.02) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px',
      backgroundPosition: '0 0, 0 0, center center, center center'
    }}>
      
      {/* Responsive and Animation Styles */}
      <style>{`
        @keyframes float-left {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-right {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .floating-card-left {
          animation: float-left 6s ease-in-out infinite;
        }
        .floating-card-right {
          animation: float-right 7s ease-in-out infinite;
        }
        @media (max-width: 992px) {
          .floating-graphic {
            display: none !important;
          }
          .landing-grid-container {
            justify-content: center !important;
          }
        }
      `}</style>

      {/* Grid Container for Layout Alignment */}
      <div className="landing-grid-container" style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '40px',
        zIndex: 2
      }}>
        
        {/* Left Floating Graphic (Candidate Badge) */}
        <div className="floating-graphic floating-card-left" style={{
          flex: '0 0 210px',
          padding: '16px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'left',
          pointerEvents: 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ATS Score
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
          <p style={{ margin: '0 0 10px 0', fontSize: '11px', color: 'var(--text)' }}>Senior React Developer</p>
          <div style={{ fontSize: '11px', color: '#2ed573', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>✓</span> Shortlisted for Interview
          </div>
        </div>

        {/* Center Hero content */}
        <div style={{ flex: '1', maxWidth: '520px', padding: '0 10px' }}>
          {/* Main Title */}
          <h1 style={{ 
            fontSize: '3.4rem', 
            fontWeight: 800, 
            lineHeight: 1.15, 
            letterSpacing: '-1.8px', 
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
            fontSize: '1.15rem', 
            lineHeight: '1.6', 
            color: 'var(--text)', 
            opacity: 0.85, 
            marginBottom: '36px'
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

        {/* Right Floating Graphic (Job Badge) */}
        <div className="floating-graphic floating-card-right" style={{
          flex: '0 0 230px',
          padding: '18px',
          background: 'var(--card-bg)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          textAlign: 'left',
          pointerEvents: 'none'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '10px', fontWeight: 800, color: '#ffa502', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              New Opening
            </span>
            <span style={{ fontSize: '12px' }}>🔥</span>
          </div>
          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--text-h)' }}>AI Research Engineer</h4>
          <p style={{ margin: '0 0 12px 0', fontSize: '11px', color: 'var(--text)' }}>Cognitive Systems Ltd</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '10px', background: 'var(--code-bg)', padding: '2px 8px', borderRadius: '4px', color: 'var(--text-h)', fontWeight: 600 }}>
              Bengaluru
            </span>
            <span style={{ fontSize: '10px', background: 'rgba(139, 44, 245, 0.08)', padding: '2px 8px', borderRadius: '4px', color: 'var(--accent)', fontWeight: 600 }}>
              ₹18L - ₹25LPA
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
