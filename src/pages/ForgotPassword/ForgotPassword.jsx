import { useState } from "react";
import { motion } from "framer-motion";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error) {
      console.error(error);

      // Firebase intentionally doesn't reveal whether an email exists,
      // to avoid leaking which addresses are registered. We show a
      // generic success message either way, except for real errors
      // like an invalid email format.
      if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        setSent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Forgot Password 🔑</h1>

        {!sent ? (
          <>
            <p>
              Enter your account email and we'll send you a link to reset
              your password.
            </p>

            <label className={styles.label}>Email Address</label>

            <input
              className={styles.input}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className={styles.button}
              onClick={handleReset}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </>
        ) : (
          <div className={styles.successBox}>
            <p>
              ✅ If an account exists for <strong>{email}</strong>, a
              password reset link has been sent. Check your inbox (and
              spam folder).
            </p>
          </div>
        )}

        <p className={styles.linkText}>
          Remembered your password? <Link to="/login">Back to Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
