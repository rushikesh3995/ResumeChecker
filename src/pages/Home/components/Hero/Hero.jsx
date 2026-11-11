import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.copy}>
            <div className={styles.eyebrow}>
              <span className={styles.spark}>✦</span>
              AI-POWERED RESUME OPTIMIZATION
            </div>

            <h1>
              Make your resume
              <span> stand out.</span>
            </h1>

            <p className={styles.description}>
              Get an instant ATS score, discover missing keywords, and receive
              practical AI recommendations to make your next career move with confidence.
            </p>

            <div className={styles.actions}>
              <button className={styles.primaryButton} onClick={() => navigate("/register")}>
                Analyze my resume <span>→</span>
              </button>
              <button className={styles.secondaryButton} onClick={() => navigate("/login")}>
                Sign in
              </button>
            </div>

            <div className={styles.trustLine}>
              <span className={styles.check}>✓</span>
              Quick analysis
              <span className={styles.dot}>•</span>
              AI-powered feedback
              <span className={styles.dot}>•</span>
              Easy-to-follow insights
            </div>
          </div>

          <div className={styles.visual}>
            <div className={styles.glow} />
            <div className={styles.reportCard}>
              <div className={styles.reportHeader}>
                <div>
                  <span className={styles.reportEyebrow}>RESUME REPORT</span>
                  <h2>Your resume health</h2>
                </div>
                <span className={styles.status}>● Analysis complete</span>
              </div>

              <div className={styles.scoreArea}>
                <div className={styles.scoreRing}>
                  <div className={styles.scoreInner}>
                    <strong>86</strong>
                    <span>out of 100</span>
                  </div>
                </div>
                <div className={styles.scoreText}>
                  <span className={styles.scoreLabel}>YOUR ATS SCORE</span>
                  <h3>Great potential!</h3>
                  <p>A few improvements can make your resume even stronger.</p>
                </div>
              </div>

              <div className={styles.divider} />
              <div className={styles.metricHeading}>
                <strong>Resume insights</strong>
                <span>Sample report</span>
              </div>

              <div className={styles.metric}>
                <div className={styles.metricTop}><span>Keyword match</span><b>92%</b></div>
                <div className={styles.track}><span style={{ width: "92%" }} /></div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricTop}><span>Formatting</span><b>88%</b></div>
                <div className={styles.track}><span style={{ width: "88%" }} /></div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricTop}><span>Experience details</span><b>76%</b></div>
                <div className={styles.track}><span style={{ width: "76%" }} /></div>
              </div>

              <div className={styles.tip}>
                <span className={styles.tipIcon}>✦</span>
                <div><b>AI suggestion</b><p>Add measurable results to your work experience.</p></div>
              </div>
            </div>
            <div className={styles.floatingTag}><span>✓</span> Clear, actionable feedback</div>
          </div>
        </div>
      </section>

      <section className={styles.benefits}>
        <div className={styles.benefit}><span>01</span><div><b>Upload your resume</b><p>Start with your existing PDF or DOCX resume.</p></div></div>
        <div className={styles.benefit}><span>02</span><div><b>Get your ATS insights</b><p>Understand strengths, gaps, and keywords.</p></div></div>
        <div className={styles.benefit}><span>03</span><div><b>Improve with AI</b><p>Use clear suggestions to strengthen your profile.</p></div></div>
      </section>
    </>
  );
}

export default Hero;
