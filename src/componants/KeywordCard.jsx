import styles from "../pages/Dashboard/Dashboard.module.css"
 

function KeywordCard({ keywords }) {
  return (
    <div className={styles.card}>
      <h2>🔑 Missing Keywords</h2>

      <div className={styles.keywordContainer}>
        {keywords.map((item, index) => (
          <span key={index} className={styles.keyword}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default KeywordCard;