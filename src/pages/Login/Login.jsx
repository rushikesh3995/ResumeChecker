










import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Email Login
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        localStorage.setItem(
          "userData",
          JSON.stringify(userSnap.data())
        );
      }

      // Clear any leftover resume analysis from a previous session/user
      // on this browser, so this login doesn't show stale data.
      localStorage.removeItem("resumeAnalysis");

      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      const uid = result.user.uid;
      const userRef = doc(db, "users", uid);

      const userSnap = await getDoc(userRef);

      // Create Firestore document if first Google login
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          role: "user",
          resumeCount: 0,
          maxResume: 2,
          createdAt: serverTimestamp(),
        });

        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: result.user.displayName,
            email: result.user.email,
            role: "user",
            resumeCount: 0,
            maxResume: 2,
          })
        );
      } else {
        localStorage.setItem(
          "userData",
          JSON.stringify(userSnap.data())
        );
      }

      // Clear any leftover resume analysis from a previous session/user
      // on this browser, so this login doesn't show stale data.
      localStorage.removeItem("resumeAnalysis");

      alert("Google Login Successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Welcome Back 👋</h1>

        <p>
          Login to continue using <strong>ResumeChecker</strong>
        </p>

        <label className={styles.label}>Email Address</label>

<input
  className={styles.input}
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<label className={styles.label}>Password</label>

<input
  className={styles.input}
  type="password"
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <button
          className={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className={styles.linkText} style={{ marginBottom: "10px" }}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p className={styles.linkText}>
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

        <button
          className={styles.button}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
}

export default Login;