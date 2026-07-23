import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import styles from "./FAQ.module.css";

const faqData = [
  {
    question: "How many free ATS checks do I get?",
    answer: "You can analyze one resume for free. Upgrade to Premium for unlimited ATS analysis."
  },
  {
    question: "Which file formats are supported?",
    answer: "We support PDF and DOCX resume files."
  },
  {
    question: "Is my resume stored securely?",
    answer: "Yes. Your resume is securely stored and only used for ATS analysis."
  },
  {
    question: "What do I get with Premium?",
    answer: "Unlimited ATS checks, AI Resume Builder, Resume Tips, Job Match and downloadable reports."
  }
];

function FAQ() {

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (

    <section className={styles.faq}>

      <h2>Frequently Asked Questions</h2>

      <p>
        Everything you need to know about ResumeChecker.
      </p>

      <div className={styles.container}>

        {faqData.map((item, index) => (

          <motion.div
            key={index}
            className={styles.item}
            initial={{opacity:0,y:50}}
            whileInView={{opacity:1,y:0}}
            transition={{delay:index*0.1}}
            viewport={{once:true}}
          >

            <button
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >

              {item.question}

              <FaChevronDown
                className={`${styles.icon} ${
                  openIndex === index ? styles.rotate : ""
                }`}
              />

            </button>

            <AnimatePresence>

              {openIndex === index && (

                <motion.div
                  initial={{height:0,opacity:0}}
                  animate={{height:"auto",opacity:1}}
                  exit={{height:0,opacity:0}}
                  transition={{duration:0.3}}
                  className={styles.answer}
                >

                  <p>{item.answer}</p>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        ))}

      </div>

    </section>

  );

}

export default FAQ;