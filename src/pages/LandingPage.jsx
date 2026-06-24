import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - var(--header-height) - 64px)' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          The Next-Gen AI <span>Applicant Tracking System</span>
        </h1>
        <p className="hero-subtitle">
          Instantly evaluate PDF and DOCX resumes using Gemini talent intelligence. Grade candidates, identify skill alignment, and shortlist the top 1% automatically.
        </p>
        <div className="hero-cta">
          <button 
            className="sma-btn sma-btn-primary" 
            style={{ padding: '16px 32px', fontSize: '16px' }}
            onClick={() => navigate(token ? '/jobs' : '/login')}
          >
            {token ? "Browse Job Openings" : "Get Started Now"}
          </button>
          {!token && (
            <button 
              className="sma-btn sma-btn-secondary" 
              style={{ padding: '16px 32px', fontSize: '16px' }}
              onClick={() => navigate('/register')}
            >
              Create Account
            </button>
          )}
        </div>

        {/* Live Interactive Mockup Card */}
        <div className="hero-mockup" style={{ padding: '24px', textAlign: 'left', maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              RECRUITER REVIEW DEMO
            </span>
            <span style={{ fontSize: '13px', color: 'var(--text)', opacity: 0.8 }}>
              📅 Live Simulator
            </span>
          </div>

          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>Senior AI Engineer</h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
            🏢 Cognitive Systems Ltd
          </p>

          <div style={{ background: 'var(--code-bg)', padding: '12px 16px', borderRadius: '8px', fontSize: '13.5px', marginBottom: '16px' }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Candidate Professional Summary:</strong>
            <p style={{ margin: 0, opacity: 0.9 }}>
              "Built enterprise-grade machine learning pipelines. 5 years experience with Python, PyTorch, LLMs, and vector databases."
            </p>
          </div>

          <div className="ai-eval-box" style={{ margin: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ fontSize: '18px' }}>🤖</span>
              <strong style={{ color: 'var(--text-h)' }}>AI Match Score:</strong>
              <span style={{
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '13px',
                color: '#fff',
                backgroundColor: '#2ed573'
              }}>
                96%
              </span>
            </div>
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--text-h)', marginBottom: '2px' }}>AI Reasoning:</strong>
            <p style={{ margin: '0', fontStyle: 'italic', color: 'var(--text)', fontSize: '13px' }}>
              "The candidate has exceptionally strong alignment with the job description. They have hands-on experience deploying LLM pipelines and optimizing training workloads in PyTorch."
            </p>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-container">
        <div className="stat-card">
          <span className="stat-number">Gemini 3.1</span>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>Talent Intelligence Model</p>
        </div>
        <div className="stat-card">
          <span className="stat-number">&lt; 2s</span>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>Resume Evaluation Time</p>
        </div>
        <div className="stat-card">
          <span className="stat-number">99.8%</span>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '14px' }}>Fake Document Detection</p>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="features-section">
        <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Designed for Modern Recruitment</h2>
        <p style={{ color: 'var(--text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
          Streamline your hiring process and eliminate manual screening fatigue.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">📁</span>
            <h4>Multi-Format Parsing</h4>
            <p style={{ fontSize: '14px', margin: '8px 0 0 0', opacity: 0.9 }}>
              Supports PDF and Word (DOCX) files. Automatically extracts formatted text, projects, and work history.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h4>Anti-Cheating Guard</h4>
            <p style={{ fontSize: '14px', margin: '8px 0 0 0', opacity: 0.9 }}>
              Instantly flags study notes, textbooks, and random documentation, assigning them a 0% score to avoid fraud.
            </p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h4>Rank & Shortlist</h4>
            <p style={{ fontSize: '14px', margin: '8px 0 0 0', opacity: 0.9 }}>
              Filter and sort all incoming candidates dynamically based on their AI match score to prioritize top applicants.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sma-footer">
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Job Portal ATS. Powered by Gemini 3.1 Flash-Lite.</p>
      </footer>
    </div>
  );
}
