import styles from "../pages/Dashboard/Dashboard.module.css";

function SuggestionCard({ suggestions }) {
  return (
    <div className={styles.card}>
      <h2>💡 Suggestions</h2>

      <ul>
        {suggestions.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SuggestionCard;