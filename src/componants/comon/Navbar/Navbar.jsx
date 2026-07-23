import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import styles from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUserData(null);
        setCheckingAuth(false);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserData({ uid: user.uid, ...snap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsub();
  }, [location.pathname]); // re-check on route change so a fresh login/logout reflects immediately

  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);

    // Clear per-session data so the next login (possibly a different
    // account on this same browser) never sees stale info.
    localStorage.removeItem("resumeAnalysis");
    localStorage.removeItem("userData");

    navigate("/login");
  };

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.logo}
        onClick={() => goTo("/")}
        style={{ cursor: "pointer" }}
      >
        ResumeChecker
      </div>

      <ul
        className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}
      >
        <li onClick={() => goTo("/")}>Home</li>

        {userData && (
          <>
            <li onClick={() => goTo("/dashboard")}>Dashboard</li>
            <li onClick={() => goTo("/upload")}>Upload</li>
            <li onClick={() => goTo("/history")}>History</li>
          </>
        )}

        {userData?.role === "admin" && (
          <li onClick={() => goTo("/admin")}>Admin</li>
        )}

        {!checkingAuth && !userData && (
          <>
            <li onClick={() => goTo("/login")}>Login</li>
            <li onClick={() => goTo("/register")}>Register</li>
          </>
        )}

        {userData && (
          <li className={styles.userBadge}>
            👤 {userData.name || userData.email}
            <span className={styles.roleTag}>{userData.role}</span>
          </li>
        )}

        {userData && (
          <li onClick={handleLogout} className={styles.logoutLink}>
            Logout
          </li>
        )}
      </ul>

      <div
        className={styles.menuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;
