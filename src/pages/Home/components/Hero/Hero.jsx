




// import styles from "./Hero.module.css";
// // import Button from "../../../../components/ui/Button/Button";
// import Button from "../../../../componants/ui/Button/Button";

// function Hero() {
//   return (
//     <section className={styles.hero}>
//       <div className={styles.left}>
//         <span className={styles.badge}>
//           🚀 AI Powered Resume Analyzer
//         </span>

//         <h1>
//           Get Your Resume ATS Score
//           <span> Instantly</span>
//         </h1>

//         <p>
//           Upload your resume and receive an ATS score,
//           AI-powered suggestions, keyword analysis,
//           and resume improvement tips.
//         </p>

//         <div className={styles.buttons}>
//           <Button text="Get Started" />
//           <Button text="Upload Resume" />
//         </div>
//       </div>

//       <div className={styles.card}>
//     <h3>ATS Score</h3>

//     <h1>92%</h1>

//     <p>Excellent Resume</p>

//     <div className={styles.progress}>

//         <div className={styles.progressItem}>
//             <div className={styles.progressTop}>
//                 <span>Keywords</span>
//                 <span>95%</span>
//             </div>

//             <div className={styles.progressBar}>
//                 <div
//                     className={styles.progressFill}
//                     style={{ width: "95%" }}
//                 />
//             </div>
//         </div>

//         <div className={styles.progressItem}>
//             <div className={styles.progressTop}>
//                 <span>Formatting</span>
//                 <span>98%</span>
//             </div>

//             <div className={styles.progressBar}>
//                 <div
//                     className={styles.progressFill}
//                     style={{ width: "98%" }}
//                 />
//             </div>
//         </div>

//     </div>
// </div>
//     </section>
//   );
// }

// export default Hero;























import styles from "./Hero.module.css";
import Button from "../../../../componants/ui/Button/Button";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.badge}>
          🚀 AI Powered Resume Analyzer
        </span>

        <h1>
          Get Your Resume ATS Score
          <span> Instantly</span>
        </h1>

        <p>
          Upload your resume and receive an ATS score,
          AI-powered suggestions, keyword analysis,
          and resume improvement tips.
        </p>

        <div className={styles.buttons}>
          <Button
            text="Get Started"
            onClick={() => navigate("/login")}
          />

          <Button
            text="Upload Resume"
            onClick={() => navigate("/upload")}
          />
        </div>
      </div>

      <div className={styles.card}>
        <h3>ATS Score</h3>

        <h1>92%</h1>

        <p>Excellent Resume</p>

        <div className={styles.progress}>
          <div className={styles.progressItem}>
            <div className={styles.progressTop}>
              <span>Keywords</span>
              <span>95%</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "95%" }}
              />
            </div>
          </div>

          <div className={styles.progressItem}>
            <div className={styles.progressTop}>
              <span>Formatting</span>
              <span>98%</span>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: "98%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;