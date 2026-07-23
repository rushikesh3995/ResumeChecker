import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import FAQ from "../../componants/FAQ/FAQ";
import Footer from "../../componants/Footer/Footer";
import Testimonials from "../../componants/Testimonials/Testimonials";
import Button from "../../componants/ui/Button/Button";
import Hero from "./components/Hero/Hero";
import Features from "./Features/Features";
import HowItWorks from "./HowItWorks/HowItWorks";
import Pricing from "./Pricing/Pricing";

function Home() {
  const location = useLocation();

  // If we navigated here with a target section (e.g. from the footer/navbar
  // while on another page), scroll to it once the page has rendered.
  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  return (
    <>
      <Hero/>
      <div id="features"><Features/></div>
      <div id="how-it-works"><HowItWorks/></div>
      <div id="pricing"><Pricing/></div>
      <Testimonials/>
      <div id="faq"><FAQ/></div>
      <Footer/>
    </>
  );
}

export default Home;