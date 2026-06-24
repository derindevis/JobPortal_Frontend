import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";

function CreateJobPage() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await client.post("/jobs", form);
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create job. Check date format (YYYY-MM-DD).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container" style={{ maxWidth: '800px' }}>
      <h2 className="sma-auth-title" style={{ textAlign: 'left' }}>Post New Opportunity</h2>
      <p className="sma-auth-subtitle" style={{ textAlign: 'left' }}>Fill in the details to list a new job opening.</p>

      {error && <div className="sma-alert sma-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="sma-form">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="sma-form-group">
            <label className="sma-label">Job Title</label>
            <input
              name="title"
              className="sma-input"
              placeholder="e.g. Senior Frontend Engineer"
              onChange={handleChange}
              required
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">Company Name</label>
            <input
              name="company"
              className="sma-input"
              placeholder="e.g. TechCorp"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="sma-form-group">
            <label className="sma-label">Location</label>
            <input
              name="location"
              className="sma-input"
              placeholder="e.g. Remote, NY"
              onChange={handleChange}
              required
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">Salary Range</label>
            <input
              name="salary"
              className="sma-input"
              placeholder="e.g. $120k - $150k"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sma-form-group">
          <label className="sma-label">Application Deadline (YYYY-MM-DD)</label>
          <input
            name="deadline"
            className="sma-input"
            type="date"
            onChange={handleChange}
            required
          />
        </div>

        <div className="sma-form-group">
          <label className="sma-label">Job Description</label>
          <textarea
            name="description"
            className="sma-input"
            placeholder="Describe the role, requirements, and responsibilities..."
            onChange={handleChange}
            required
          />
        </div>

        <div className="btn-group" style={{ marginTop: '20px' }}>
          <button type="submit" className="sma-btn sma-btn-primary" disabled={loading} style={{ flex: 2 }}>
            {loading ? "Posting..." : "Publish Job Listing"}
          </button>
          <button type="button" className="sma-btn sma-btn-secondary" onClick={() => navigate("/jobs")} style={{ flex: 1 }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateJobPage;
