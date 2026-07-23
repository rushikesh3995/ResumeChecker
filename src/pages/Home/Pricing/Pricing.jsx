import styles from "./Pricing.module.css";
import { motion } from "framer-motion";
import Button from "../../../componants/ui/Button/Button";
import { FaCheckCircle, FaCrown, FaLock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const snapshot = await getDocs(collection(db, "plans"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort((a, b) => a.price - b.price);

        setPlans(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section className={styles.loadingSection}>
        <div className={styles.loader}></div>
        <h2>Loading Pricing Plans...</h2>
      </section>
    );
  }

  return (
    <section className={styles.pricing}>
      <div className={styles.heading}>
        <span className={styles.badge}>
          <FaCrown />
          Pricing Plans
        </span>

        <h1>Choose the Perfect Plan</h1>

        <p>
          Start for free and upgrade whenever you're ready.
          Unlock AI-powered resume analysis, ATS optimization,
          and premium career tools.
        </p>
      </div>

      <div className={styles.cards}>
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`${styles.card} ${
              plan.popular || plan.id === "premium"
                ? styles.popular
                : ""
            }`}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
            }}
            viewport={{ once: true }}
          >
            {(plan.popular || plan.id === "premium") && (
              <div className={styles.popularBadge}>
                ⭐ Best Value
              </div>
            )}

            <h2>
              {plan.name.charAt(0).toUpperCase() +
                plan.name.slice(1)}
            </h2>

            <div className={styles.priceBox}>
              <span className={styles.currency}>₹</span>

              <span className={styles.amount}>
                {plan.price}
              </span>

              {plan.price !== 0 && (
                <span className={styles.month}>
                  /month
                </span>
              )}
            </div>

            <p>{plan.description}</p>

            <ul>
              {plan.features?.map((feature, i) => (
                <li key={i}>
                  <FaCheckCircle className={styles.icon} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              text={
                plan.price === 0
                  ? "Get Started"
                  : "Upgrade Now"
              }
              onClick={() =>
                navigate(
                  plan.price === 0
                    ? "/register"
                    : "/payment"
                )
              }
            />

            {plan.price !== 0 && (
              <div className={styles.secure}>
                <FaLock />
                <span>Secure Payment</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Pricing;