import styles from "./Testimonials.module.css";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    review:
      "ResumeChecker increased my ATS score from 58% to 91%. The suggestions were incredibly useful.",
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    review:
      "The AI resume analysis helped me improve my resume and get more interview calls.",
  },
  {
    name: "Aman Verma",
    role: "Full Stack Developer",
    review:
      "Beautiful UI, easy to use, and definitely worth upgrading to Premium.",
  },
];

function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <h2>What Our Users Say</h2>

      <p>
        Thousands of students and professionals trust ResumeChecker.
      </p>

      <div className={styles.grid}>
        {testimonials.map((item, index) => (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <p className={styles.review}>
              "{item.review}"
            </p>

            <div className={styles.user}>
              <div className={styles.avatar}>
                {item.name.charAt(0)}
              </div>

              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;