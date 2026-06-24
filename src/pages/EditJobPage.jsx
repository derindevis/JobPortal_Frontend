import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

function EditJobPage() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    deadline: "",
    active: true,
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    client
      .get(`/jobs/${id}`)
      .then((res) => {
        const data = res.data;
        if (data.deadline && data.deadline.includes("T")) {
          data.deadline = data.deadline.split("T")[0];
        }
        setForm(res.data);
        setFetchLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch job details.");
        setFetchLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await client.put(`/jobs/${id}`, form);
      navigate("/jobs");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading)
    return <div className="sma-empty-state">Loading job details...</div>;

  return (
    <div className="form-container" style={{ maxWidth: "800px" }}>
      <h2 className="sma-auth-title" style={{ textAlign: "left" }}>
        Edit Opportunity
      </h2>
      <p className="sma-auth-subtitle" style={{ textAlign: "left" }}>
        Update the details for this job listing.
      </p>

      {error && <div className="sma-alert sma-alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="sma-form">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div className="sma-form-group">
            <label className="sma-label">Job Title</label>
            <input
              name="title"
              className="sma-input"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">Company Name</label>
            <input
              name="company"
              className="sma-input"
              value={form.company}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div className="sma-form-group">
            <label className="sma-label">Location</label>
            <input
              name="location"
              className="sma-input"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="sma-form-group">
            <label className="sma-label">Salary Range</label>
            <input
              name="salary"
              className="sma-input"
              value={form.salary || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <div className="sma-form-group">
            <label className="sma-label">
              Application Deadline (YYYY-MM-DD)
            </label>
            <input
              name="deadline"
              className="sma-input"
              type="date"
              value={form.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="sma-form-group"
            style={{ flexDirection: "row", alignItems: "center", gap: "12px" }}
          >
            <input
              name="active"
              type="checkbox"
              style={{ width: "auto" }}
              checked={form.active}
              onChange={handleChange}
            />
            <label className="sma-label">Listing is Active</label>
          </div>
        </div>

        <div className="sma-form-group">
          <label className="sma-label">Job Description</label>
          <textarea
            name="description"
            className="sma-input"
            value={form.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="btn-group" style={{ marginTop: "20px" }}>
          <button
            type="submit"
            className="sma-btn sma-btn-primary"
            disabled={loading}
            style={{ flex: 2 }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className="sma-btn sma-btn-secondary"
            onClick={() => navigate("/jobs")}
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditJobPage;
