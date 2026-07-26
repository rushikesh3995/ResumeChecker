





const API_BASE = import.meta.env.VITE_API_BASE_URL;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UploadResume.module.css";

import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    try {
      setLoading(true);

      // Check logged in user
      const currentUser = auth.currentUser;

      if (!currentUser) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      // Get user document
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        alert("User data not found.");
        return;
      }

      const userData = userSnap.data();

      // Check resume limit
      if (userData.resumeCount >= userData.maxResume) {
        alert(
          `Resume limit reached!\n\nUsed: ${userData.resumeCount}/${userData.maxResume}`
        );
        return;
      }

      // Upload Resume
      const formData = new FormData();
      formData.append("resume", file);

      // const response = await axios.post(
      //   "http://localhost:5000/api/upload",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      const token = await auth.currentUser.getIdToken();

const response = await axios.post(
  "${API_BASE}/api/upload",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);

      console.log(response.data);

      // Save AI Analysis
      localStorage.setItem(
        "resumeAnalysis",
        JSON.stringify(response.data.analysis)
      );

      // Increase Resume Count
      await updateDoc(userRef, {
        resumeCount: increment(1),
      });

      alert("Resume analyzed successfully!");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.error || "Resume upload failed.");
      } else {
        alert("Server not responding.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Upload Your Resume</h1>

        <p>
          Upload your PDF or DOCX resume and get an AI-powered ATS analysis.
        </p>

        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        />

        {file && (
          <div className={styles.fileInfo}>
            <h3>Selected Resume</h3>

            <p>
              <strong>Name:</strong> {file.name}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <button
          className={styles.button}
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Analyze Resume"}
        </button>
      </div>
    </div>
  );
}

export default UploadResume;
