import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";
import { getUserRole } from "../utils/auth";

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const role = getUserRole();

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTitle) params.title = searchTitle;
      if (searchLocation) params.location = searchLocation;
      
      const res = await client.get("/jobs", { params });
      setJobs(res.data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    } finally {
      setLoading(false);
    }
  }, [searchTitle, searchLocation]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await client.delete(`/jobs/${id}`);
        setJobs(jobs.filter((j) => j.id !== id));
      } catch (err) {
        alert("Failed to delete job.");
      }
    }
  };

  return (
    <div className="sma-section">
      <div className="sma-section-header">
        <h2 className="sma-section-title">Explore Opportunities</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          {role === "admin" && (
            <button className="sma-btn sma-btn-primary" onClick={() => navigate("/jobs/new")}>
              + Post Job
            </button>
          )}
          <span className="sma-student-count">{jobs.length} Jobs</span>
        </div>
      </div>

      <div className="sma-card" style={{ flexDirection: 'row', gap: '16px', padding: '16px' }}>
        <div className="sma-form-group" style={{ flex: 1 }}>
          <input
            type="text"
            className="sma-input"
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="sma-form-group" style={{ flex: 1 }}>
          <input
            type="text"
            className="sma-input"
            placeholder="Search by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="sma-empty-state">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="sma-empty-state">No jobs found matching your criteria.</div>
      ) : (
        <div className="sma-student-grid">
          {jobs.map((job) => (
            <div key={job.id} className="sma-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{job.title}</h3>
                  <p style={{ margin: '4px 0', fontWeight: 600, color: 'var(--accent)' }}>{job.company}</p>
                </div>
                {!job.active && (
                  <span style={{ fontSize: '12px', background: '#ff4d4d22', color: '#ff4d4d', padding: '2px 8px', borderRadius: '4px' }}>
                    Inactive
                  </span>
                )}
              </div>
              
              <div style={{ fontSize: '14px', color: 'var(--text)' }}>
                <p style={{ margin: '4px 0' }}>📍 {job.location}</p>
                <p style={{ margin: '4px 0' }}>💰 {job.salary || "Not disclosed"}</p>
                <p style={{ margin: '4px 0' }}>⏳ Deadline: {job.deadline}</p>
              </div>

              <div className="btn-group">
                <button 
                  className="sma-btn sma-btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  Details
                </button>
                {role === "admin" && (
                  <>
                    <button 
                      className="sma-btn sma-btn-secondary" 
                      onClick={() => navigate(`/jobs/${job.id}/edit`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="sma-btn sma-btn-logout" 
                      style={{ padding: '8px' }}
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobList;