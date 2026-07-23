import styles from "../pages/Dashboard/Dashboard.module.css"

function StrengthCard({ strengths }) {
  return (
    <div className={styles.card}>
      <h2>✅ Strengths</h2>

      <ul>
        {strengths.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default StrengthCard;