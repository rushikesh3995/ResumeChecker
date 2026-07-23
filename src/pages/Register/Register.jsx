// import { useState } from "react";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth, db } from "../../firebase/firebase";
// import { doc, setDoc } from "firebase/firestore";
// // import { db } from "../../firebase/firebase";

// function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     if (!name || !email || !password) {
//       alert("Please fill all fields.");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );

//       await updateProfile(userCredential.user, {
//         displayName: name,
//       });

//       await setDoc(doc(db, "users", userCredential.user.uid), {
//   name: name,
//   email: email,
//   role: "user",
//   resumeCount: 0,
//   maxResume: 1,
//   createdAt: new Date().toISOString(),
// });
//       alert("Account Created Successfully!");

//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   return (
//     <div style={{ padding: "40px", maxWidth: "400px", margin: "auto" }}>
//       <h1>Create Account</h1>

//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
//       />

//       <button
//         onClick={handleRegister}
//         style={{
//           width: "100%",
//           padding: "12px",
//           cursor: "pointer",
//         }}
//       >
//         Create Account
//       </button>
//     </div>
//   );
// }

// export default Register;


















// import styles from "./Register.module.css";
import styles from "./Register.module.css";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase/firebase";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      // Create Firebase Authentication User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Save user to Firestore
      // await setDoc(doc(db, "users", userCredential.user.uid), {
      //   name,
      //   email,
      //   role: "user",
      //   resumeCount: 0,
      //   maxResume: 2,
      //   createdAt: serverTimestamp(),
      // });

      await setDoc(doc(db, "users", userCredential.user.uid), {
  name,
  email,

  role: "user",

  plan: "free",

  paymentStatus: false,

  resumeCount: 0,

  maxResume: 2,

  createdAt: serverTimestamp(),
});
      alert("Account Created Successfully!");

      localStorage.removeItem("resumeAnalysis");
      navigate("/upload");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
return (
  <div className={styles.registerPage}>

    {/* Left Side */}
    <div className={styles.leftSection}>
      <div className={styles.overlay}>
        <h1>ResumeChecker AI</h1>

        <h2>Land Your Dream Job</h2>

        <p>
          Create your free account and analyze your resume with AI-powered ATS
          scoring, resume tips, keyword analysis, and professional suggestions.
        </p>
      </div>
    </div>

    {/* Right Side */}
    <div className={styles.rightSection}>

      <div className={styles.registerCard}>

        <h2>Create Account</h2>

        <p>Start your journey today.</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div className={styles.loginLink}>
          Already have an account?
          <span onClick={() => navigate("/login")}> Login</span>
        </div>

      </div>

    </div>

  </div>
);
  
}

export default Register;