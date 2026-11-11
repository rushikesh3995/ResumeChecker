
import { useState } from "react";
import styles from "./ImproveResume.module.css";

// API configuration
const ENV_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API_BASE = `${ENV_API_URL.replace(/\/+$/, "").replace(/\/api$/i, "")}/api`;

function ImproveResume() {
  const [loading, setLoading] = useState(false);
  const [improvedResume, setImprovedResume] = useState("");

  const handleImprove = async () => {
    try {
      setLoading(true);
      setImprovedResume("");

      // Get resume analysis from localStorage
      const storedAnalysis = localStorage.getItem("resumeAnalysis");

      if (!storedAnalysis) {
        alert("Please analyze your resume first.");
        return;
      }

      const analysis = JSON.parse(storedAnalysis);

      if (!analysis) {
        alert("Resume analysis data is empty.");
        return;
      }

      // Convert analysis into text
      const resumeText =
        typeof analysis === "string"
          ? analysis
          : JSON.stringify(analysis, null, 2);

      // Call backend API
      const response = await fetch(`${API_BASE}/improve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
        }),
      });

      // Handle API response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to improve resume.");
      }

      if (data.success && data.improvedResume) {
        setImprovedResume(data.improvedResume);
      } else {
        throw new Error(data.message || "Resume improvement failed.");
      }
    } catch (error) {
      console.error("Resume Improvement Error:", error);
      alert(error.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>✨ AI Resume Improver</h1>

        <p>
          Let AI rewrite your resume to make it more ATS-friendly
          and recruiter-ready.
        </p>

        <button
          className={styles.button}
          onClick={handleImprove}
          disabled={loading}
        >
          {loading ? "Improving Resume..." : "Improve Resume"}
        </button>

        <div className={styles.result}>
          <h2>Improved Resume</h2>

          {loading ? (
            <p>AI is improving your resume. Please wait...</p>
          ) : improvedResume ? (
            <>
              <pre>{improvedResume}</pre>

              <button
                className={styles.button}
                onClick={() =>
                  navigator.clipboard.writeText(improvedResume)
                }
              >
                Copy Improved Resume
              </button>
            </>
          ) : (
            <p>
              Click the button above to generate an improved resume.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImproveResume;
