// import styles from "./Premium.module.css";
// import qr from "../../assets/paymentQR.png";
// import { useNavigate } from "react-router-dom";

// function Premium() 
// {
//     const navigate = useNavigate();
//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h1>🚀 Upgrade to Premium</h1>

//         <p>
//           You've used all your free resume analyses.
//         </p>

//         <div className={styles.plan}>
//           <h2>Premium Benefits</h2>

//           <ul>
//             <li>✅ Unlimited Resume Analysis</li>
//             <li>✅ AI Resume Improvement</li>
//             <li>✅ ATS Score Booster</li>
//             <li>✅ Download Improved Resume</li>
//             <li>✅ Priority AI Processing</li>
//           </ul>
//         </div>
//         <div className={styles.qrSection}>
//   <img src={qr} alt="Payment QR" className={styles.qr} />

//   <h3>Scan & Pay ₹99</h3>

//   <p>
//     After payment, send the payment screenshot to the admin for verification.
//   </p>
// </div>

//        <button
//   className={styles.button}
//   onClick={() => navigate("/payment")}
// >
//   I've Paid
// </button>
//       </div>
//     </div>
//   );
// }

// export default Premium;










import styles from "./Premium.module.css";
import qr from "../../assets/paymentQR.png";
import { useNavigate } from "react-router-dom";

function Premium() {
  const navigate = useNavigate();

  const benefits = [
    "Unlimited Resume Analysis",
    "AI-Powered Resume Improvement",
    "Advanced ATS Score Analysis",
    "Download Improved Resume",
    "Missing Keyword Detection",
    "Priority AI Processing",
    "AI-Based Mock Interview Practice",
  ];

  return (
    <main className={styles.container}>
      <section className={styles.card}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>PREMIUM MEMBERSHIP</span>

          <h1>Unlock Your Career Potential 🚀</h1>

          <p>
            Take your resume to the next level with powerful AI tools
            designed to help you stand out and get noticed.
          </p>
        </div>

        {/* Pricing */}
        <div className={styles.plan}>
          <h2>Premium Plan</h2>

          <div className={styles.price}>
            <span>₹99</span>
            <small>/ one-time payment</small>
          </div>

          <p className={styles.planDescription}>
            Get access to premium career-building features.
          </p>

          <ul>
            {benefits.map((benefit, index) => (
              <li key={index}>
                <span aria-hidden="true">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment Section */}
        <div className={styles.qrSection}>
          <h2>Complete Your Payment</h2>

          <p>
            Scan the QR code below using any UPI payment application.
          </p>

          <div className={styles.qrWrapper}>
            <img
              src={qr}
              alt="UPI payment QR code"
              className={styles.qr}
            />
          </div>

          <h3>Pay ₹99</h3>

          <p className={styles.paymentNote}>
            After completing your payment, proceed to submit
            your payment screenshot for admin verification.
          </p>
        </div>

        {/* CTA */}
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate("/payment")}
        >
          Continue to Payment Verification →
        </button>

        {/* Footer */}
        <p className={styles.footer}>
          🔒 Your premium access will be activated after payment verification.
        </p>

      </section>
    </main>
  );
}

export default Premium;
