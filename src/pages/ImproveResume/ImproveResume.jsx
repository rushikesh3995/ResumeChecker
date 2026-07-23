import { useState } from "react";
import styles from "./ImproveResume.module.css";

function ImproveResume() {
  const [loading, setLoading] = useState(false);
  const [improvedResume, setImprovedResume] = useState("");

  const handleImprove = async () => {
    try {
      setLoading(true);

      const analysis = JSON.parse(
        localStorage.getItem("resumeAnalysis")
      );

      const response = await fetch("http://localhost:5000/api/improve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText: JSON.stringify(analysis),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setImprovedResume(data.improvedResume);
      } else {
        alert(data.message || "Failed to improve resume.");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>✨ AI Resume Improver</h1>

        <p>
          Let AI rewrite your resume to make it more ATS-friendly and
          recruiter-ready.
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

          {improvedResume ? (
            <pre>{improvedResume}</pre>
          ) : (
            <p>Click the button above to generate an improved resume.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImproveResume;