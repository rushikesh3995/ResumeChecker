import styles from "./HowItWorks.module.css";
import { motion } from "framer-motion";

import { MdOutlineSecurity } from "react-icons/md";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { FaRobot } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";

const steps = [
  {
    icon: <MdOutlineSecurity />,
    title: "Login with OTP",
    description: "Securely login using Firebase OTP authentication.",
  },
  {
    icon: <HiOutlineDocumentArrowUp />,
    title: "Upload Resume",
    description: "Upload your PDF or DOCX resume in one click.",
  },
  {
    icon: <FaRobot />,
    title: "AI Analysis",
    description: "Our AI analyzes formatting, keywords and ATS compatibility.",
  },
  {
    icon: <MdOutlineAnalytics />,
    title: "Get ATS Score",
    description: "Receive your ATS score with personalized suggestions.",
  },
];

function HowItWorks() {
  return (
    <section className={styles.howItWorks}>

      <h2>How ResumeChecker Works</h2>

      <p>
        Analyze your resume in just four simple steps.
      </p>

      <div className={styles.container}>

        {steps.map((step, index) => (

          <motion.div
            className={styles.card}
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
          >

            <div className={styles.icon}>
              {step.icon}
            </div>

            <div className={styles.number}>
              0{index + 1}
            </div>

            <h3>{step.title}</h3>

            <p>{step.description}</p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default HowItWorks;