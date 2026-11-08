import React, { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollAtmosphere from "./components/ScrollAtmosphere";
import Home from "./pages/Home";
import Experience from "./pages/Experiences";
import Certifications from "./pages/Certifications";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";

function RouteContent() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const curtainRef = useRef(null);

  // Curtain wipe: cover the screen, swap the page while hidden, then wipe away.
  useEffect(() => {
    const curtain = curtainRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (location.pathname === displayLocation.pathname || !curtain || reduceMotion) {
      setDisplayLocation(location);
      return undefined;
    }

    let cancelled = false;
    let controls;
    const ease = [0.76, 0, 0.24, 1];
    (async () => {
      controls = animate(curtain, { x: ["-100%", "0%"] }, { duration: 0.5, ease });
      await controls.finished.catch(() => {});
      if (cancelled) return;
      setDisplayLocation(location);
      await new Promise((resolve) => setTimeout(resolve, 80));
      if (cancelled) return;
      controls = animate(curtain, { x: ["0%", "100%"] }, { duration: 0.5, ease });
      await controls.finished.catch(() => {});
    })();

    return () => {
      cancelled = true;
      controls?.stop();
    };
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (displayLocation.hash) {
      requestAnimationFrame(() => document.querySelector(displayLocation.hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [displayLocation.pathname, displayLocation.hash]);

  return (
      <div className="site-shell">
        <ScrollAtmosphere />
        <Navbar />
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <div ref={curtainRef} className="page-curtain" aria-hidden="true" />
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <RouteContent />
    </Router>
  );
}
