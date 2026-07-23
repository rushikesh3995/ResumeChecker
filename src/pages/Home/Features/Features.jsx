// import styles from "./Features.module.css";
// import styles from "./Features.module.css";
import styles from "./Features.module.css";

const features = [
  {
    icon: "📊",
    title: "ATS Score",
    description: "Get a real-time ATS score for your resume."
  },
  {
    icon: "🤖",
    title: "AI Resume Builder",
    description: "Generate professional resumes in minutes."
  },
  {
    icon: "🔑",
    title: "Keyword Analysis",
    description: "Improve your resume with ATS-friendly keywords."
  },
  {
    icon: "💡",
    title: "Resume Tips",
    description: "Receive AI-powered suggestions to improve your resume."
  },
  {
    icon: "📄",
    title: "Job Match",
    description: "Compare your resume with a job description."
  },
  {
    icon: "📥",
    title: "Download Report",
    description: "Download your ATS analysis report as a PDF."
  }
];

function Features() {
  return (
    <section className={styles.features}>
      <h2>Why Choose ResumeChecker?</h2>

      <p>
        Everything you need to build an ATS-friendly resume.
      </p>

      <div className={styles.grid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.card}>

            <div className={styles.icon}>
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;