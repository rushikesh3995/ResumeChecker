import { useState } from "react";
import styles from "./Payment.module.css";
import qr from "../../assets/paymentQR.png";
import { auth } from "../../firebase/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const API_BASE = "http://localhost:5000/api";
const ENV_API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const API_BASE = `${ENV_API_URL.replace(/\/+$/, "").replace(/\/api$/i, "")}/api`;

function Payment() {
  const [image, setImage] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload your payment screenshot.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      setSubmitting(true);

      const token = await user.getIdToken();

      const formData = new FormData();
      formData.append("screenshot", image);

      await axios.post(`${API_BASE}/payment/submit`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(
        "Payment submitted successfully! Your upgrade will be activated once an admin verifies your payment."
      );
      navigate("/dashboard");
    } catch (error) {
      console.error("Payment submission error:", error);
      if (error.response) {
        alert(error.response.data.error || "Payment submission failed.");
      } else {
        alert("Server not responding. Please make sure the backend is running.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className={styles.badge}>👑 PREMIUM PLAN</span>

        <h1>Upgrade to Premium</h1>

        <p className={styles.subtitle}>
          Pay only <strong>₹99</strong> once and unlock all premium
          ResumeChecker AI features.
        </p>

        <div className={styles.price}>₹99</div>

        {/* QR Section */}
        <div className={styles.qrSection}>
          <img
            src={qr}
            alt="Payment QR"
            className={styles.qr}
            onClick={() => setShowQR(true)}
          />

          <h3>Scan & Pay</h3>

          <p>Google Pay • PhonePe • Paytm • Any UPI App</p>

          <p className={styles.clickText}>
            📲 Click the QR Code to enlarge
          </p>

          <div className={styles.upi}>
            <span>UPI ID</span>
            <strong>resumechecker@upi</strong>
          </div>
        </div>

        {/* Premium Features */}
        <div className={styles.features}>
          <h2>Premium Benefits</h2>

          <ul>
            <li>✅ Unlimited ATS Resume Checks</li>
            <li>✅ AI Resume Builder</li>
            <li>✅ Resume vs Job Match</li>
            <li>✅ Advanced AI Suggestions</li>
            <li>✅ Download ATS PDF Report</li>
            <li>✅ Priority Support</li>
          </ul>
        </div>

        {/* Upload Screenshot */}
        <div className={styles.uploadSection}>
          <label>Upload Payment Screenshot</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          {image && (
            <div className={styles.fileName}>
              📷 {image.name}
            </div>
          )}
        </div>

        <button
          className={styles.button}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit For Verification"}
        </button>

        <p className={styles.note}>
          ⏳ Verification usually takes 5–15 minutes. Your premium
          plan will be activated after admin approval.
        </p>
      </div>
{showQR && (
  <div
    className={styles.modal}
    onClick={() => setShowQR(false)}
  >
    <div
      className={styles.modalContent}
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={qr}
        alt="Large QR"
        className={styles.bigQR}
      />

      <h3 className={styles.scanTitle}>
        Scan using any UPI App
      </h3>

      <p className={styles.scanText}>
        After completing the payment, click <b>Done Payment</b>
        and upload your payment screenshot.
      </p>

      <div className={styles.modalButtons}>
        <button
          className={styles.backBtn}
          onClick={() => setShowQR(false)}
        >
          ⬅ Back
        </button>

        <button
          className={styles.doneBtn}
          onClick={() => {
            setShowQR(false);

            document
              .querySelector("#uploadSection")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          }}
        >
          ✅ Done Payment
        </button>
      </div>
    </div>
  </div>
)}
        </div>
      
  );
}

export default Payment;