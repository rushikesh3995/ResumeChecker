import jsPDF from "jspdf";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import ScoreCard from "../../componants/ScoreCard";
import StrengthCard from "../../componants/StrengthCard";
import WeaknessCard from "../../componants/WeaknessCard";
import KeywordCard from "../../componants/KeywordCard";
import SuggestionCard from "../../componants/SuggestionCard";
import styles from "./Dashboard.module.css";

const formatDate = (value) => {
  if (!value) return "Recently analyzed";
  const date = typeof value?.toDate === "function"
    ? value.toDate()
    : value instanceof Date
      ? value
      : value?._seconds
        ? new Date(value._seconds * 1000)
        : new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently analyzed";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

function Dashboard() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [userName, setUserName] = useState("there");
  const [totalAnalyses, setTotalAnalyses] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/login");
        return;
      }

      setLoading(true);
      try {
        const userSnapshot = await getDoc(doc(db, "users", user.uid));
        if (userSnapshot.exists()) {
          const profile = userSnapshot.data();
          setUserName(profile.name || user.displayName || user.email?.split("@")[0] || "there");
          setTotalAnalyses(Number(profile.resumeCount) || 0);
        } else {
          setUserName(user.displayName || user.email?.split("@")[0] || "there");
          setTotalAnalyses(0);
        }

        const historyRef = collection(db, "users", user.uid, "history");
        const historyQuery = query(historyRef, orderBy("createdAt", "desc"), limit(10));
        const snapshot = await getDocs(historyQuery);
        const records = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
        setHistory(records);
        setTotalAnalyses((current) => Math.max(current, records.length));
        setAnalysis(records[0] || null);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
        setHistory([]);
        setAnalysis(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const averageScore = useMemo(() => {
    const scores = history
      .map((item) => Number(item.atsScore))
      .filter((score) => Number.isFinite(score));
    if (!scores.length) return 0;
    return Math.round(scores.reduce((total, score) => total + score, 0) / scores.length);
  }, [history]);

  const downloadReport = () => {
    if (!analysis) return;
    const pdf = new jsPDF();
    let y = 20;
    pdf.setFontSize(20);
    pdf.text("Resume ATS Report", 20, y);
    y += 18;
    pdf.setFontSize(14);
    pdf.text(`ATS Score: ${analysis.atsScore ?? 0}%`, 20, y);
    y += 16;

    const addSection = (heading, items = []) => {
      if (y > 260) { pdf.addPage(); y = 20; }
      pdf.setFontSize(13);
      pdf.text(heading, 20, y);
      y += 9;
      pdf.setFontSize(10);
      items.forEach((item) => {
        const lines = pdf.splitTextToSize(`• ${String(item)}`, 165);
        if (y + lines.length * 6 > 280) { pdf.addPage(); y = 20; }
        pdf.text(lines, 24, y);
        y += lines.length * 6 + 2;
      });
      y += 5;
    };

    addSection("Strengths", analysis.strengths || []);
    addSection("Areas to improve", analysis.weaknesses || []);
    addSection("Missing keywords", analysis.missingKeywords || []);
    addSection("Suggestions", analysis.suggestions || []);
    pdf.save("ResumeChecker-ATS-Report.pdf");
  };

  if (loading) {
    return <div className={styles.loading}><div className={styles.loader} /><p>Preparing your workspace...</p></div>;
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sideBrand}><span className={styles.brandMark}>R</span><span>Resume<span>Checker</span></span></div>
        <p className={styles.sideLabel}>WORKSPACE</p>
        <nav className={styles.sideNav} aria-label="Dashboard navigation">
          <button className={`${styles.navItem} ${styles.navActive}`} onClick={() => navigate("/dashboard")}><span>▦</span> Overview</button>
          <button className={styles.navItem} onClick={() => navigate("/upload")}><span>＋</span> Analyze resume</button>
          <button className={styles.navItem} onClick={() => navigate("/history")}><span>◷</span> My reports</button>
          <button className={styles.navItem} onClick={() => navigate("/improve")}><span>✧</span> Resume improver</button>
          <button className={styles.navItem} onClick={() => navigate("/mock-interview")}><span>✦</span> AI Mock Interview</button>
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.helpCard}><span className={styles.helpIcon}>✦</span><strong>Make your next move</strong><p>Small resume improvements can make a big difference.</p><button onClick={() => navigate("/upload")}>Analyze a resume <span>→</span></button></div>
          <button className={styles.homeLink} onClick={() => navigate("/")}>← Back to website</button>
        </div>
      </aside>

      <section className={styles.main}>
        <div className={styles.topLine}>
          <div><span className={styles.breadcrumb}>Workspace</span><span className={styles.breadcrumbSep}>/</span><strong>Overview</strong></div>
          <button className={styles.topAction} onClick={() => navigate("/upload")}><span>＋</span> New analysis</button>
        </div>

        <header className={styles.welcome}>
          <div>
            <p className={styles.eyebrow}>YOUR RESUME WORKSPACE</p>
            <h1>Welcome back, {userName} <span>✦</span></h1>
            <p>Track your resume performance and get ready for your next opportunity.</p>
          </div>
          <div className={styles.welcomeArt} aria-hidden="true"><span className={styles.artCircle}>✓</span><span className={styles.artSpark}>✦</span><span className={styles.artLine} /></div>
        </header>

        <section className={styles.statsGrid} aria-label="Resume statistics">
          <article className={styles.statCard}><div className={styles.statTop}><span>Total analyses</span><span className={styles.statIcon}>▤</span></div><strong>{totalAnalyses}</strong><small>Total resume checks completed</small></article>
          <article className={styles.statCard}><div className={styles.statTop}><span>Average ATS score</span><span className={`${styles.statIcon} ${styles.blueIcon}`}>◎</span></div><strong>{history.length ? `${averageScore}%` : "—"}</strong><small>{history.length ? "Across your latest reports" : "Analyze a resume to get started"}</small></article>
          <article className={styles.statCard}><div className={styles.statTop}><span>Latest score</span><span className={`${styles.statIcon} ${styles.greenIcon}`}>↗</span></div><strong>{analysis?.atsScore != null ? `${analysis.atsScore}%` : "—"}</strong><small>{analysis ? formatDate(analysis.createdAt) : "No analysis yet"}</small></article>
        </section>

        <section className={styles.contentGrid}>
          <div className={styles.primaryColumn}>
            <article className={styles.latestPanel}>
              <div className={styles.panelHeading}><div><p className={styles.eyebrow}>LATEST RESULT</p><h2>Your resume snapshot</h2></div>{analysis && <button className={styles.textButton} onClick={() => navigate("/history")}>View all reports →</button>}</div>
              {analysis ? (
                <>
                  <div className={styles.latestContent}>
                    <div className={styles.scoreWrap}><ScoreCard score={Number(analysis.atsScore) || 0} /></div>
                    <div className={styles.resultSummary}><span className={styles.resultPill}>AI RESUME ANALYSIS</span><h3>{Number(analysis.atsScore) >= 75 ? "You're off to a strong start" : "Your resume has room to improve"}</h3><p>{Number(analysis.atsScore) >= 75 ? "Your resume is showing good ATS potential. Review the suggestions below to make it even stronger." : "Focus on the improvement areas identified in your report to strengthen your resume for applicant tracking systems."}</p><div className={styles.resultMeta}><span>◷ {formatDate(analysis.createdAt)}</span><span>•</span><span>Latest report</span></div><button className={styles.primaryButton} onClick={() => navigate("/history")}>Explore full report <span>→</span></button></div>
                  </div>
                </>
              ) : (
                <div className={styles.emptyState}><div className={styles.emptyIcon}>▤</div><h3>Your first resume analysis starts here</h3><p>Upload your resume to get an ATS score, missing keywords and AI-powered improvement suggestions.</p><button className={styles.primaryButton} onClick={() => navigate("/upload")}>Analyze my resume <span>→</span></button></div>
              )}
            </article>

            {analysis && <div className={styles.reportGrid}><div className={styles.reportCard}><StrengthCard strengths={analysis.strengths || []} /></div><div className={styles.reportCard}><WeaknessCard weaknesses={analysis.weaknesses || []} /></div><div className={`${styles.reportCard} ${styles.wideReport}`}><KeywordCard keywords={analysis.missingKeywords || []} /></div><div className={`${styles.reportCard} ${styles.wideReport}`}><SuggestionCard suggestions={analysis.suggestions || []} /></div></div>}
          </div>

          <aside className={styles.rightColumn}>
            <article className={styles.quickPanel}><div className={styles.panelHeading}><div><p className={styles.eyebrow}>QUICK ACTIONS</p><h2>What would you like to do?</h2></div></div><button className={styles.actionRow} onClick={() => navigate("/upload")}><span className={styles.actionIcon}>↑</span><span><strong>Analyze a resume</strong><small>Get your ATS score and feedback</small></span><b>→</b></button><button className={styles.actionRow} onClick={() => navigate("/improve")}><span className={`${styles.actionIcon} ${styles.actionPurple}`}>✧</span><span><strong>Improve my resume</strong><small>Get AI-powered suggestions</small></span><b>→</b></button><button className={styles.actionRow} onClick={() => navigate("/mock-interview")}><span className={`${styles.actionIcon} ${styles.actionPurple}`}>✦</span><span><strong>Practice an AI interview</strong><small>Prepare for your target developer role</small></span><b>→</b></button><button className={styles.actionRow} onClick={() => navigate("/history")}><span className={`${styles.actionIcon} ${styles.actionGreen}`}>◷</span><span><strong>View report history</strong><small>Review your previous analyses</small></span><b>→</b></button>{analysis && <button className={styles.downloadLink} onClick={downloadReport}>↓ Download latest ATS report</button>}</article>

            <article className={styles.activityPanel}><div className={styles.panelHeading}><div><p className={styles.eyebrow}>RECENT ACTIVITY</p><h2>Recent reports</h2></div><button className={styles.textButton} onClick={() => navigate("/history")}>See all</button></div>{history.length ? <div className={styles.activityList}>{history.slice(0, 4).map((item) => <div className={styles.activityItem} key={item.id}><span className={styles.fileIcon}>PDF</span><span className={styles.activityDetails}><strong>Resume analysis</strong><small>{formatDate(item.createdAt)}</small></span><span className={styles.activityScore}>{item.atsScore ?? 0}%</span></div>)}</div> : <p className={styles.noActivity}>Your completed analyses will appear here.</p>}</article>

            <article className={styles.tipsPanel}><span className={styles.tipStar}>✦</span><p className={styles.eyebrow}>QUICK TIP</p><h2>Tailor your resume to each role</h2><p>Compare your resume with the job description and include relevant skills and keywords where they accurately reflect your experience.</p><button onClick={() => navigate("/upload")}>Try resume analysis →</button></article>
          </aside>
        </section>

        {analysis && <div className={styles.reportFooter}><span>Want a copy of your latest results?</span><button onClick={downloadReport}>↓ Download ATS report</button></div>}
      </section>
    </main>
  );
}

export default Dashboard;
