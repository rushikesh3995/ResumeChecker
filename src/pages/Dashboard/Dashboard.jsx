import jsPDF from "jspdf";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";

import Header from "../../componants/Header";
import ScoreCard from "../../componants/ScoreCard";
import StrengthCard from "../../componants/StrengthCard";
import WeaknessCard from "../../componants/WeaknessCard";
import KeywordCard from "../../componants/KeywordCard";
import SuggestionCard from "../../componants/SuggestionCard";

import styles from "./Dashboard.module.css";

function Dashboard() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        // Always pull the single most recent analysis straight from
        // Firestore. This is the same data every upload already saves,
        // so it's guaranteed fresh and tied to whoever is actually
        // logged in right now - no stale/leftover data possible.
        const historyRef = collection(db, "users", user.uid, "history");
        const q = query(historyRef, orderBy("createdAt", "desc"), limit(1));
        const snap = await getDocs(q);

        if (!snap.empty) {
          setAnalysis(snap.docs[0].data());
        } else {
          setAnalysis(null);
        }
      } catch (error) {
        console.error("Failed to load latest analysis:", error);
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsub();
  }, [navigate]);

  const downloadReport = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("Resume ATS Report", 20, 20);

    pdf.setFontSize(14);
    pdf.text(`ATS Score: ${analysis.atsScore}%`, 20, 40);

    pdf.text("Strengths:", 20, 60);
    (analysis.strengths || []).forEach((item, index) => {
      pdf.text(`• ${item}`, 25, 70 + index * 10);
    });

    let y = 70 + (analysis.strengths?.length || 0) * 10 + 10;

    pdf.text("Weaknesses:", 20, y);

    (analysis.weaknesses || []).forEach((item, index) => {
      pdf.text(`• ${item}`, 25, y + 10 + index * 10);
    });

    pdf.save("ATS_Report.pdf");
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading your dashboard...</h2>
      </div>
    );
  }

  // No analysis yet at all - friendly empty state instead of a
  // confusing redirect away from the page the user actually clicked.
  if (!analysis) {
    return (
      <div className={styles.container}>
        <Header />

        <div className={styles.emptyState}>
          <h2>📄 No Resume Analyzed Yet</h2>
          <p>
            Once you upload and analyze a resume, your latest ATS report
            will always show up right here.
          </p>
          <button
            className={styles.improveBtn}
            onClick={() => navigate("/upload")}
          >
            📤 Check Your First Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.scoreSection}>
        <ScoreCard score={analysis.atsScore} />
      </div>

      <div className={styles.grid}>
        <StrengthCard strengths={analysis.strengths || []} />
        <WeaknessCard weaknesses={analysis.weaknesses || []} />
      </div>

      <KeywordCard keywords={analysis.missingKeywords || []} />

      <SuggestionCard suggestions={analysis.suggestions || []} />

      <button className={styles.downloadBtn} onClick={downloadReport}>
        📄 Download ATS Report
      </button>

      <button
        className={styles.improveBtn}
        onClick={() => navigate("/improve")}
      >
        ✨ Improve My Resume
      </button>

      <div className={styles.navButtonsRow}>
        <button className={styles.secondaryBtn} onClick={() => navigate("/")}>
          🏠 Back to Home
        </button>

        <button
          className={styles.secondaryBtn}
          onClick={() => navigate("/upload")}
        >
          📤 Check Another Resume
        </button>

        <button
          className={styles.secondaryBtn}
          onClick={() => navigate("/history")}
        >
          🕓 View History
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
