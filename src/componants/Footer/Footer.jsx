import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scrolls to a section on the Home page. If we're on a different page,
  // navigate to Home first and pass along which section to scroll to.
  const goToSection = (sectionId) => {
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const goHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* Brand */}

        <div>
          <h2>ResumeChecker</h2>

          <p>
            AI-powered ATS Resume Checker that helps
            job seekers improve their resumes and
            increase interview opportunities.
          </p>

          <div className={styles.socials}>
            <FaGithub />
            <FaLinkedin />
            <FaEnvelope />
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3>Quick Links</h3>

          <ul>
            <li onClick={goHome}>Home</li>
            <li onClick={() => goToSection("how-it-works")}>How It Works</li>
            <li onClick={() => goToSection("features")}>Features</li>
            <li onClick={() => goToSection("pricing")}>Pricing</li>
            <li onClick={() => goToSection("faq")}>FAQ</li>
          </ul>
        </div>

        {/* Resources */}

        <div>
          <h3>Resources</h3>

          <ul>
            <li onClick={() => goToSection("how-it-works")}>ATS Guide</li>
            <li onClick={() => navigate("/improve")}>Resume Tips</li>
            <li onClick={() => alert("Privacy Policy page coming soon.")}>Privacy Policy</li>
            <li onClick={() => alert("Terms & Conditions page coming soon.")}>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3>Contact</h3>

          <ul>
            <li>📧 support@resumechecker.com</li>
            <li>📍 Pune, Maharashtra</li>
          </ul>
        </div>

      </div>

      <div className={styles.bottom}>
        © 2026 ResumeChecker. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
