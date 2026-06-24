import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import client from "../api/client";
import { getUserRole } from "../utils/auth";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = getUserRole();

  useEffect(() => {
    setLoading(true);
    client.get(`/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="sma-empty-state">Loading job details...</div>;
  if (!job) return <div className="sma-empty-state">Job not found.</div>;

  return (
    <div className="detail-container">
      <div className="detail-header">
        <h1 style={{ marginBottom: '8px' }}>{job.title}</h1>
        <p style={{ fontSize: '20px', fontWeight: 600, color: 'var(--accent)', margin: 0 }}>
          {job.company}
        </p>
      </div>

      <div className="detail-meta">
        <div>
          <span style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 700 }}>Location</span>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>📍 {job.location}</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 700 }}>Salary</span>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>💰 {job.salary || "Not disclosed"}</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 700 }}>Deadline</span>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>⏳ {job.deadline}</span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: '12px', textTransform: 'uppercase', color: 'var(--text)', fontWeight: 700 }}>Status</span>
          <span style={{ fontSize: '16px', fontWeight: 600, color: job.active ? '#2ed573' : '#ff4d4d' }}>
            {job.active ? "● Accepting Applications" : "● Closed"}
          </span>
        </div>
      </div>

      <div className="detail-desc">
        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>Job Description</h3>
        <p>{job.description}</p>
      </div>

      <div className="btn-group" style={{ marginTop: '32px' }}>
        {role !== "admin" && (
          <button 
            className="sma-btn sma-btn-primary" 
            style={{ flex: 1, padding: '16px' }}
            onClick={() => navigate(`/applications/new?jobId=${id}`)}
            disabled={!job.active}
          >
            {job.active ? "Apply for this Position" : "No longer accepting applications"}
          </button>
        )}
        <button 
          className="sma-btn sma-btn-secondary" 
          onClick={() => navigate("/jobs")}
        >
          Back to Listings
        </button>
      </div>
    </div>
  );
}

export default JobDetail;