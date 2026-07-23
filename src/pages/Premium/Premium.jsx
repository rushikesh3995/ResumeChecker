import styles from "./Premium.module.css";
import qr from "../../assets/paymentQR.png";
import { useNavigate } from "react-router-dom";

function Premium() 
{
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>🚀 Upgrade to Premium</h1>

        <p>
          You've used all your free resume analyses.
        </p>

        <div className={styles.plan}>
          <h2>Premium Benefits</h2>

          <ul>
            <li>✅ Unlimited Resume Analysis</li>
            <li>✅ AI Resume Improvement</li>
            <li>✅ ATS Score Booster</li>
            <li>✅ Download Improved Resume</li>
            <li>✅ Priority AI Processing</li>
          </ul>
        </div>
        <div className={styles.qrSection}>
  <img src={qr} alt="Payment QR" className={styles.qr} />

  <h3>Scan & Pay ₹99</h3>

  <p>
    After payment, send the payment screenshot to the admin for verification.
  </p>
</div>

       <button
  className={styles.button}
  onClick={() => navigate("/payment")}
>
  I've Paid
</button>
      </div>
    </div>
  );
}

export default Premium;