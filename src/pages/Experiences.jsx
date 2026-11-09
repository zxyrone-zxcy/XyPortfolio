import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Briefcase, GraduationCap } from "lucide-react";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const columns = [
  {
    key: "education",
    title: "Education",
    Icon: GraduationCap,
    items: [
      {
        title: "Bachelor of Science in Information Technology",
        org: "Jose Rizal University",
        date: "June 2024–Present",
        notes: [
          "Relevant coursework in Programming, Hardware & Software, Computer Networking, and Project Management.",
        ],
      },
      {
        title: "Nagpayong High School",
        org: "Academic milestones",
        date: "2022–2025",
        notes: [
          "Graduated with High Honors.",
          "Placed 3rd in the Sci-Tok Experiment in Grade 11.",
          "Earned Best STEM Research Paper in Grade 12.",
        ],
      },
    ],
  },
  {
    key: "experience",
    title: "Experience",
    Icon: Briefcase,
    items: [
      {
        title: "Creative Officer",
        org: "AWS Org JRU Chapter",
        date: "2026–Present",
        notes: [
          "Design publication materials and visual content for chapter projects and activities.",
          "Collaborate with chapter members to communicate ideas through engaging visuals.",
          "Manage creative tasks to meet deadlines and adapt designs based on feedback.",
        ],
      },
      {
        title: "Photo Editor / Video Content Editor",
        org: "Creative media",
        date: "2025–Present",
        notes: [
          "Applied composition, visual design, and color-adjustment principles to photo and video edits.",
          "Organized and refined digital assets into clean, professional outputs.",
        ],
      },
      {
        title: "Barista",
        org: "Frosh Tea",
        date: "Dec. 2023",
        notes: [
          "Provided friendly, efficient customer service and prepared beverages in an organized work area.",
          "Developed communication and time management skills through hands-on experience.",
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <main>
      <section id="top" className="hero experience-hero" aria-labelledby="page-title">
        <div className="experience-tech-bg" aria-hidden="true">
          <span className="experience-orbit experience-orbit-one" />
          <span className="experience-orbit experience-orbit-two" />
          <span className="experience-circuit experience-circuit-one" />
          <span className="experience-circuit experience-circuit-two" />
          <span className="experience-node experience-node-one" />
          <span className="experience-node experience-node-two" />
          <span className="experience-node experience-node-three" />
        </div>
        <motion.div className="page-width hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <h1 id="page-title" className="hero-title text-[#f2f6ff]">
            Experiences
          </h1>
          <p className="hero-copy">
            A focused view of growth through software development, data analysis, and practical problem solving.
          </p>
          <a className="hero-action" href="#path">
            <span>Explore the path</span>
            <ArrowDown size={17} />
          </a>
        </motion.div>
      </section>

      <section className="section border-y border-[var(--line)] bg-gradient-to-r from-[#101521] to-[#0c101b]">
        <motion.div className="page-width" {...reveal()}>
          <p className="section-label">An evolving practice</p>
          <h2 className="section-title text-[#f2f6ff]">Designed, built, and delivered.</h2>
          <div className="w-16 h-[2px] my-5 bg-gradient-to-r from-[#70adff] to-[#aa8cff]"></div>
          <p className="text-[#b1bed3] font-serif text-2xl max-w-3xl leading-snug">
            A timeline of my work in creative media, academic projects, and hands-on roles.
          </p>
        </motion.div>
      </section>

      <section id="path" className="section">
        <div className="page-width">
          <motion.p className="section-label" {...reveal()}>Career &amp; academic milestones</motion.p>
          <motion.h2 className="section-title text-[#f2f6ff]" {...reveal(0.1)}>My milestones and journey to my career.</motion.h2>

          <div className="exp-columns">
            {columns.map(({ key, title, Icon, items }, colIndex) => (
              <motion.div className={`exp-col exp-col-${key}`} key={key} {...reveal(colIndex * 0.12)}>
                <h3 className="exp-col-heading">
                  <Icon size={22} aria-hidden="true" />
                  <span>{title}</span>
                </h3>
                <ol className="exp-list">
                  {items.map((item, i) => (
                    <li className={`exp-item${i === 0 ? " is-current" : ""}`} key={item.title}>
                      <div className="exp-item-head">
                        <h4>{item.title}</h4>
                        <time className="exp-item-date">{item.date}</time>
                      </div>
                      <p className="exp-item-org">{item.org}</p>
                      <ul className="exp-item-notes">
                        {item.notes.map((note) => (
                          <li key={note}>{note}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}