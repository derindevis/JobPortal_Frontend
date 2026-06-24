import { useState, useEffect, useCallback } from 'react';
import client from '../api/client';
import { getUserRole } from '../utils/auth';

const STATUS_OPTIONS = ['Applied', 'Shortlisted', 'Interviewed', 'Rejected'];

export default function ApplicationList() {
  const [apps, setApps] = useState([]);
  const [jobsMap, setJobsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterJob, setFilterJob] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");

  const role = getUserRole();

  const fetchApps = useCallback(() => {
    setLoading(true);
    const endpoint = "/applications/me";
    
    Promise.all([
      client.get(endpoint),
      client.get("/jobs")
    ])
    .then(([appsRes, jobsRes]) => {
      setApps(appsRes.data);
      const map = {};
      jobsRes.data.forEach(j => {
        map[j.id] = j;
      });
      setJobsMap(map);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, [role]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const updateStatus = async (id, status) => {
    try {
      await client.put(`/applications/${id}`, { status });
      // Update local state to reflect change immediately
      setApps(apps.map(app => app.id === id ? { ...app, status } : app));
    } catch (err) {
      alert('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to withdraw/delete this application?")) {
      try {
        await client.delete(`/applications/${id}`);
        setApps(apps.filter(app => app.id !== id));
      } catch (err) {
        alert('Failed to delete application. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'var(--accent)';
      case 'Shortlisted': return '#2ed573';
      case 'Interviewed': return '#ffa502';
      case 'Rejected': return '#ff4d4d';
      default: return 'var(--text)';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Applied': return 'sma-badge-status badge-applied';
      case 'Shortlisted': return 'sma-badge-status badge-shortlisted';
      case 'Interviewed': return 'sma-badge-status badge-interviewed';
      case 'Rejected': return 'sma-badge-status badge-rejected';
      default: return 'sma-badge-status';
    }
  };

  // Filter and sort applications
  const processedApps = apps
    .filter(app => {
      if (filterJob && app.job_id.toString() !== filterJob) return false;
      if (filterStatus && app.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "score_desc") {
        return (b.ai_score ?? 0) - (a.ai_score ?? 0);
      }
      if (sortBy === "score_asc") {
        return (a.ai_score ?? 0) - (b.ai_score ?? 0);
      }
      if (sortBy === "date_desc") {
        return new Date(b.applied_at) - new Date(a.applied_at);
      }
      if (sortBy === "date_asc") {
        return new Date(a.applied_at) - new Date(b.applied_at);
      }
      return 0;
    });

  return (
    <section className="sma-section">
      <div className="sma-section-header">
        <div>
          <h2 className="sma-section-title">{role === "admin" ? "Management Dashboard" : "My Applications"}</h2>
          <p className="sma-section-subtitle">Review status of jobs applied</p>
        </div>
        <span className="sma-student-count">{processedApps.length} Shown / {apps.length} Total</span>
      </div>

      {/* Filter and Sort Bar */}
      {!loading && apps.length > 0 && (
        <div className="filter-bar">
          <div className="filter-group">
            <label htmlFor="filter-job">Job Title</label>
            <select 
              id="filter-job"
              className="sma-select" 
              value={filterJob} 
              onChange={(e) => setFilterJob(e.target.value)}
            >
              <option value="">All Jobs</option>
              {Object.values(jobsMap).map(j => (
                <option key={j.id} value={j.id}>{j.title} ({j.company})</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="filter-status">Status</label>
            <select 
              id="filter-status"
              className="sma-select" 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="sort-by">Sort By</label>
            <select 
              id="sort-by"
              className="sma-select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Default</option>
              {role === "admin" && <option value="score_desc">AI Score: High to Low</option>}
              {role === "admin" && <option value="score_asc">AI Score: Low to High</option>}
              <option value="date_desc">Applied Date: Newest First</option>
              <option value="date_asc">Applied Date: Oldest First</option>
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <div className="sma-empty-state">Loading applications...</div>
      ) : processedApps.length === 0 ? (
        <div className="sma-empty-state">No applications found matching your criteria.</div>
      ) : (
        <div className="sma-student-grid">
          {processedApps.map((app) => (
            <div key={app.id} className="sma-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Application #{app.id}
                </span>
                <span style={{ fontSize: '12.5px', color: 'var(--text)', fontWeight: 500 }}>
                  📅 {new Date(app.applied_at).toLocaleDateString()}
                </span>
              </div>
              
              <div style={{ margin: '4px 0' }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>
                  {jobsMap[app.job_id]?.title || `Job ID: ${app.job_id}`}
                </h3>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                  🏢 {jobsMap[app.job_id]?.company || "Unknown Company"}
                </p>
                {role === "admin" && (
                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: 'var(--text)', opacity: 0.8 }}>
                    <strong>Applicant ID:</strong> {app.user_id}
                  </p>
                )}
              </div>

              <div style={{ background: 'var(--code-bg)', padding: '14px', borderRadius: '10px', fontSize: '14px' }}>
                <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--text-h)' }}>About Me:</strong>
                <p style={{ margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: 'var(--text)' }}>
                  {app.cover_letter}
                </p>
              </div>

              {/* Recruiter AI evaluation details */}
              {role === "admin" && app.ai_reasoning && (
                <div className="ai-eval-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '18px' }}>🤖</span>
                    <strong style={{ color: 'var(--text-h)' }}>AI Match Score:</strong>
                    {app.ai_score !== null && app.ai_score !== undefined ? (
                      <span style={{
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '13px',
                        color: '#fff',
                        backgroundColor: app.ai_score >= 80 ? '#2ed573' : (app.ai_score >= 50 ? '#ffa502' : '#ff4d4d')
                      }}>
                        {app.ai_score}%
                      </span>
                    ) : (
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>N/A</span>
                    )}
                  </div>
                  <strong style={{ display: 'block', fontSize: '13.5px', color: 'var(--text-h)', marginBottom: '2px' }}>AI Reasoning:</strong>
                  <p style={{ margin: '0', fontStyle: 'italic', color: 'var(--text)', fontSize: '13.5px' }}>
                    "{app.ai_reasoning}"
                  </p>
                </div>
              )}

              {/* Download Resume Link for Admins */}
              {role === "admin" && app.resume_path && (
                <div style={{ marginTop: '4px' }}>
                  <a 
                    href={`${client.defaults.baseURL || "http://localhost:8000"}/${app.resume_path}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="sma-btn sma-btn-secondary"
                    style={{ textDecoration: 'none', display: 'inline-flex', width: '100%', boxSizing: 'border-box', justifyContent: 'center' }}
                  >
                    📄 Download Candidate Resume
                  </a>
                </div>
              )}

              <div className="sma-status-control" style={{ borderTop: 'none', padding: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                  <span className={getStatusBadgeClass(app.status)}>
                    {app.status}
                  </span>
                  {role === "admin" && (
                    <select 
                      className="sma-select"
                      style={{ padding: '6px 10px', fontSize: '13.5px', flex: 1, height: '36px' }}
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}
                </div>
                <button 
                  className="sma-btn sma-btn-logout" 
                  style={{ padding: '8px 14px', fontSize: '13px', height: '36px' }}
                  onClick={() => handleDelete(app.id)}
                >
                  {role === "admin" ? "Delete" : "Withdraw"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}