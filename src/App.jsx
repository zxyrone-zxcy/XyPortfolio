import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import ScrollAtmosphere from "./components/ScrollAtmosphere";
import Chatbot from "./components/Chatbot";
import Home from "./pages/Home";
import Experience from "./pages/Experiences";
import Certifications from "./pages/Certifications";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

function RouteContent() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <Loader />
      <div className="site-shell">
        <ScrollAtmosphere />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
      <Chatbot />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <RouteContent />
    </Router>
  );
}
