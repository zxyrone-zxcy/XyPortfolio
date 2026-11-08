import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import "../styles/loader.css";

const MIN_DISPLAY_MS = 1600;

// Full-screen "{ }" loader shown when the site first opens.
export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    let timer;

    const finish = () => {
      const remaining = Math.max(0, MIN_DISPLAY_MS - (performance.now() - startedAt));
      timer = window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader-screen"
          role="status"
          aria-label="Loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="code-loader" aria-hidden="true">
            <span>{"{"}</span>
            <span>{"}"}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
