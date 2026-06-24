import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../api/client";
import { getUserRole } from "../utils/auth";

function CreateAppPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const role = getUserRole();

  // Parse jobId from URL query parameters (e.g., /applications/new?jobId=1)
  const query = new URLSearchParams(location.search);
  const jobId = query.get("jobId");

  useEffect(() => {
    if (role === "admin") return;
    
    if (!jobId) {
      setError("No job selected. Please choose a job to apply.");
      return;
    }

    setFetchLoading(true);
    client
      .get(`/jobs/${jobId}`)
      .then((res) => {
        setJob(res.data);
      })
      .catch((err) => {
        setError("Failed to fetch job details. The job may no longer exist.");
      })
      .finally(() => {
        setFetchLoading(false);
      });
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId) return;

    if (aboutMe.trim().length < 20) {
      setError("'Tell me about yourself' must be at least 20 characters long.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("job_id", parseInt(jobId, 10));
      formData.append("cover_letter", aboutMe);
      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      await client.post("/applications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Your application has been submitted successfully!");
      setTimeout(() => {
        navigate("/applications");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit application. Have you already applied?");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="sma-empty-state">
        <p>Loading job details...</p>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <div className="sma-empty-state">
        <p>Administrators cannot apply for jobs.</p>
        <button className="sma-btn sma-btn-primary" onClick={() => navigate(-1)} style={{ marginTop: '16px' }}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2 className="sma-auth-title" style={{ textAlign: 'left' }}>Submit Application</h2>
      <p className="sma-auth-subtitle" style={{ textAlign: 'left' }}>Express your interest in this position.</p>

      {error && <div className="sma-alert sma-alert-error">{error}</div>}
      {success && <div className="sma-alert sma-alert-success">{success}</div>}

      {job && (
        <div style={{ marginBottom: "24px", padding: "16px", backgroundColor: "var(--accent-bg)", border: '1px solid var(--accent-border)', borderRadius: "12px" }}>
          <h3 style={{ margin: 0, color: "var(--accent)" }}>{job.title}</h3>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", fontWeight: 500 }}>
            🏢 {job.company} &bull; 📍 {job.location}
          </p>
        </div>
      )}

      {jobId && (
        <form onSubmit={handleSubmit} className="sma-form">
          <div className="sma-form-group">
            <label className="sma-label" htmlFor="about_me">
              Tell me about yourself
            </label>
            <textarea
              id="about_me"
              className="sma-input"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Briefly tell the employer about your background, skills, and why you are a great fit..."
              required
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text)", marginTop: '4px' }}>
              <span>Min. 20 characters Required</span>
              <span style={{ fontWeight: 600, color: aboutMe.length < 20 ? '#ff4d4d' : '#2ed573' }}>
                {aboutMe.length} characters
              </span>
            </div>
          </div>

          <div className="sma-form-group" style={{ marginTop: '16px' }}>
            <label className="sma-label" htmlFor="resume_upload">
              Upload Resume/Cover Letter (Required)
            </label>
            <input
              type="file"
              id="resume_upload"
              className="sma-input"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0] || null)}
              style={{ padding: '10px' }}
              required
            />
            <p style={{ margin: '6px 0 0 0', fontSize: '11.5px', color: 'var(--text)', opacity: 0.8, lineHeight: '1.4' }}>
              💡 <strong>ATS Formatting Tip:</strong> For accurate AI match scoring, upload a standard single-column PDF or DOCX file. Avoid placing text inside tables, text boxes, headers/footers, or using scanned/image-only PDFs.
            </p>
          </div>

          <div className="btn-group" style={{ marginTop: '24px' }}>
            <button
              type="submit"
              className="sma-btn sma-btn-primary"
              style={{ flex: 2 }}
              disabled={loading || aboutMe.length < 20 || !resumeFile}
            >
              {loading ? "Submitting..." : "Send Application"}
            </button>
            <button
              type="button"
              className="sma-btn sma-btn-secondary"
              style={{ flex: 1 }}
              onClick={() => navigate(`/jobs/${jobId}`)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {!jobId && (
        <button className="sma-btn sma-btn-primary sma-btn-full" onClick={() => navigate("/jobs")}>
          Browse Jobs
        </button>
      )}
    </div>
  );
}

export default CreateAppPage;