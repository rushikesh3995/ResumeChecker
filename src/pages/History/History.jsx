import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import styles from "./History.module.css";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "users", user.uid, "history"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHistory(data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Resume History</h1>

      {history.length === 0 ? (
        <p>No Resume History Found.</p>
      ) : (
        history.map((item, index) => (
          <div key={item.id} className={styles.card}>
            <h2>Resume #{index + 1}</h2>

            <p>
              <strong>ATS Score:</strong> {item.atsScore}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {item.createdAt?.toDate().toLocaleString()}
            </p>

            <h3>Strengths</h3>

            <ul>
              {item.strengths?.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <h3>Weaknesses</h3>

            <ul>
              {item.weaknesses?.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default History;