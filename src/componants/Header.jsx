// // import styles from "../Dashboard.module.css";
// import styles from "../pages/Dashboard/Dashboard.module.css"

// function Header() {
//   return (
//     <div className={styles.header}>
//       <h1>🚀 ATS Resume Report</h1>
//       <p>Your AI-powered resume analysis</p>
//     </div>
//   );
// }

// export default Header;
















import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "../pages/Dashboard/Dashboard.module.css";

function Header() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) return;

      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.header}>
      <h1>🚀 ATS Resume Report</h1>
      <p>Your AI-powered resume analysis</p>

      {userData && (
        <div className={styles.userInfo}>
          <h3>Welcome, {userData.name} 👋</h3>
          <p>Role: {userData.role}</p>
          <p>
            Resume Usage: {userData.resumeCount} / {userData.maxResume}
          </p>
          <p>
            Remaining Checks:{" "}
            {userData.maxResume - userData.resumeCount}
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;