import styles from "../pages/Dashboard/Dashboard.module.css"

function WeaknessCard({ weaknesses }) {
  return (
    <div className={styles.card}>
      <h2>❌ Weaknesses</h2>

      <ul>
        {weaknesses.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default WeaknessCard;