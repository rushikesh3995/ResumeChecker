import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "../pages/Dashboard/Dashboard.module.css";

function ScoreCard({ score }) {

  let status = "";
  let color = "";

  if (score >= 90) {
    status = "Excellent Resume 🚀";
    color = "#22c55e";
  } else if (score >= 75) {
    status = "Very Good Resume ✅";
    color = "#3b82f6";
  } else if (score >= 60) {
    status = "Needs Improvement ⚠";
    color = "#f59e0b";
  } else {
    status = "Poor ATS Score ❌";
    color = "#ef4444";
  }

  return (
    <div className={styles.scoreCard}>

      <div className={styles.progressWrapper}>
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: color,
            trailColor: "#2d3748",
          })}
        />
      </div>

      <h2>ATS Score</h2>

      <h3 style={{ color }}>{status}</h3>

      <p>
        {score >= 75
          ? "Your resume is ATS friendly."
          : "Improve your resume using AI suggestions below."}
      </p>
             

    </div>
  );
}

export default ScoreCard;