// import styles from "./Pricing.module.css";
// import { motion } from "framer-motion";
// import Button from "../../../componants/ui/Button/Button";
// import { FaCheckCircle, FaCrown, FaLock } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../firebase/firebase";
// import { useNavigate } from "react-router-dom";

// function Pricing() {
//   const navigate = useNavigate();

//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "plans"));

//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         data.sort((a, b) => a.price - b.price);

//         setPlans(data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   if (loading) {
//     return (
//       <section className={styles.loadingSection}>
//         <div className={styles.loader}></div>
//         <h2>Loading Pricing Plans...</h2>
//       </section>
//     );
//   }

//   return (
//     <section className={styles.pricing}>
//       <div className={styles.heading}>
//         <span className={styles.badge}>
//           <FaCrown />
//           Pricing Plans
//         </span>

//         <h1>Choose the Perfect Plan</h1>

//         <p>
//           Start for free and upgrade whenever you're ready.
//           Unlock AI-powered resume analysis, ATS optimization,
//           and premium career tools.
//         </p>
//       </div>

//       <div className={styles.cards}>
//         {plans.map((plan, index) => (
//           <motion.div
//             key={plan.id}
//             className={`${styles.card} ${
//               plan.popular || plan.id === "premium"
//                 ? styles.popular
//                 : ""
//             }`}
//             initial={{ opacity: 0, y: 70 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{
//               duration: 0.6,
//               delay: index * 0.2,
//             }}
//             viewport={{ once: true }}
//           >
//             {(plan.popular || plan.id === "premium") && (
//               <div className={styles.popularBadge}>
//                 ⭐ Best Value
//               </div>
//             )}

//             <h2>
//               {plan.name.charAt(0).toUpperCase() +
//                 plan.name.slice(1)}
//             </h2>

//             <div className={styles.priceBox}>
//               <span className={styles.currency}>₹</span>

//               <span className={styles.amount}>
//                 {plan.price}
//               </span>

//               {plan.price !== 0 && (
//                 <span className={styles.month}>
//                   /month
//                 </span>
//               )}
//             </div>

//             <p>{plan.description}</p>

//             <ul>
//               {plan.features?.map((feature, i) => (
//                 <li key={i}>
//                   <FaCheckCircle className={styles.icon} />
//                   <span>{feature}</span>
//                 </li>
//               ))}
//             </ul>

//             <Button
//               text={
//                 plan.price === 0
//                   ? "Get Started"
//                   : "Upgrade Now"
//               }
//               onClick={() =>
//                 navigate(
//                   plan.price === 0
//                     ? "/register"
//                     : "/payment"
//                 )
//               }
//             />

//             {plan.price !== 0 && (
//               <div className={styles.secure}>
//                 <FaLock />
//                 <span>Secure Payment</span>
//               </div>
//             )}
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Pricing;












import styles from "./Pricing.module.css";
import { motion } from "framer-motion";
import Button from "../../../componants/ui/Button/Button";

import {
  FaCheckCircle,
  FaCrown,
  FaLock,
  FaExclamationCircle,
  FaSyncAlt,
} from "react-icons/fa";

import { useEffect, useState, useCallback } from "react";

import {
  collection,
  getDocsFromServer,
} from "firebase/firestore";

import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch pricing plans from Firebase
  const fetchPlans = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      console.log("Fetching pricing plans...");

      // Fetch fresh data directly from Firestore server
      const snapshot = await getDocsFromServer(
        collection(db, "plans")
      );

      console.log("Firebase documents found:", snapshot.size);

      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();

        console.log("------------------------");
        console.log("Plan ID:", doc.id);
        console.log("Plan Name:", docData.name);
        console.log("Plan Price:", docData.price);
        console.log("Complete Plan:", docData);

        return {
          id: doc.id,
          ...docData,
          price: Number(docData.price),
        };
      });

      console.log("FINAL PRICING DATA:", data);

      // Sort plans by price
      data.sort((a, b) => a.price - b.price);

      setPlans(data);

    } catch (err) {
      console.error("Pricing fetch error:", err);

      if (
        err.code === "permission-denied" ||
        err.code === "firestore/permission-denied"
      ) {
        setError(
          "Unable to access pricing plans. Please check your Firebase Firestore security rules."
        );
      } else {
        setError(
          err.message ||
          "Unable to load pricing plans. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  }, []);

  // Load plans when component mounts
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  // Handle plan selection
  const handlePlanSelection = (plan) => {
    console.log("Selected Plan:", plan);

    const price = Number(plan.price);

    if (price === 0) {
      navigate("/register");
    } else {
      navigate("/payment", {
        state: {
          selectedPlan: {
            ...plan,
            price,
          },
        },
      });
    }
  };

  // Loading screen
  if (loading) {
    return (
      <section className={styles.loadingSection}>
        <div className={styles.loader}></div>

        <h2>Loading Pricing Plans...</h2>

        <p>
          Please wait while we fetch the latest plans.
        </p>
      </section>
    );
  }

  // Error screen
  if (error) {
    return (
      <section className={styles.pricing}>
        <div className={styles.errorState}>
          <FaExclamationCircle />

          <h2>Something went wrong</h2>

          <p>{error}</p>

          <button
            className={styles.retryButton}
            onClick={fetchPlans}
          >
            <FaSyncAlt /> Try Again
          </button>
        </div>
      </section>
    );
  }

  // Empty plans screen
  if (plans.length === 0) {
    return (
      <section className={styles.pricing}>
        <div className={styles.emptyState}>
          <FaCrown />

          <h2>No Pricing Plans Available</h2>

          <p>
            Our pricing plans are being updated.
            Please check back soon.
          </p>

          <button
            className={styles.retryButton}
            onClick={fetchPlans}
          >
            <FaSyncAlt /> Refresh Plans
          </button>
        </div>
      </section>
    );
  }

  // Pricing page
  return (
    <section className={styles.pricing}>

      {/* Heading */}
      <div className={styles.heading}>

        <span className={styles.badge}>
          <FaCrown />
          Pricing Plans
        </span>

        <h1>
          Choose the <span>Perfect Plan</span>
        </h1>

        <p>
          Start for free and upgrade whenever you're ready.
          Unlock AI-powered resume analysis, ATS optimization,
          and premium career tools.
        </p>

      </div>

      {/* Pricing Cards */}
      <div className={styles.cards}>

        {plans.map((plan, index) => {

          const name = plan.name || "Standard";

          const price = Number(plan.price);

          const features = Array.isArray(plan.features)
            ? plan.features
            : [];

          const isPopular =
            plan.popular === true ||
            plan.id === "premium";

          return (

            <motion.div
              key={plan.id}
              className={`${styles.card} ${
                isPopular ? styles.popular : ""
              }`}

              initial={{
                opacity: 0,
                y: 35,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}

              viewport={{
                once: true,
              }}
            >

              {/* Popular Badge */}
              {isPopular && (
                <div className={styles.popularBadge}>
                  <FaCrown /> Best Value
                </div>
              )}

              {/* Plan Name */}
              <h2>
                {name.charAt(0).toUpperCase() +
                  name.slice(1)}
              </h2>

              {/* Price */}
              <div className={styles.priceBox}>

                <span className={styles.currency}>
                  ₹
                </span>

                <span className={styles.amount}>
                  {price.toLocaleString("en-IN")}
                </span>

                {price > 0 && (
                  <span className={styles.month}>
                    /month
                  </span>
                )}

              </div>

              {/* Description */}
              <p className={styles.description}>
                {plan.description ||
                  "Get access to our resume improvement tools."}
              </p>

              {/* Features */}
              <ul>

                {features.map((feature, i) => (

                  <li key={i}>

                    <FaCheckCircle
                      className={styles.icon}
                    />

                    <span>{feature}</span>

                  </li>

                ))}

              </ul>

              {/* Button */}
              <div className={styles.cardAction}>

                <Button
                  text={
                    price === 0
                      ? "Get Started"
                      : "Upgrade Now"
                  }

                  onClick={() =>
                    handlePlanSelection(plan)
                  }
                />

              </div>

              {/* Secure Payment */}
              {price > 0 && (

                <div className={styles.secure}>

                  <FaLock />

                  <span>Secure Payment</span>

                </div>

              )}

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}

export default Pricing;
