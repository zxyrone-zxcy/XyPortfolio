import React from "react";
import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import jruLogo from "../assets/experience/jru-logo.png";
import nagpayongLogo from "../assets/experience/nagpayong-hs-logo.png";

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
        logo: jruLogo,
        logoAlt: "Jose Rizal University seal",
        date: "June 2024–Present",
        notes: [
          "Relevant coursework in Programming, Hardware & Software, Computer Networking, and Project Management.",
        ],
      },
      {
        title: "Nagpayong High School",
        org: "Academic milestones",
        logo: nagpayongLogo,
        logoAlt: "Nagpayong High School logo",
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
      <section id="path" className="section-container page-intro">
        <div className="page-width">
          <motion.div {...reveal()}>
            <SectionHeader
              as="h1"
              index="01"
              label="Experience"
              title="Milestones and the journey so far."
              description="A timeline of my work in creative media, academic projects, and hands-on roles."
            />
          </motion.div>

          <div className="exp-columns">
            {columns.map(({ key, title, Icon, items }, colIndex) => (
              <motion.div className={`exp-col exp-col-${key}`} key={key} {...reveal(colIndex * 0.12)}>
                <h3 className="exp-col-heading">
                  <Icon size={22} aria-hidden="true" />
                  <span>{title}</span>
                </h3>
                <ol className="exp-list">
                  {items.map((item, i) => (
                    <li className={`exp-item${i === 0 ? " is-current" : ""}${item.logo ? " has-logo" : ""}`} key={item.title}>
                      {item.logo && (
                        <img className="exp-item-logo" src={item.logo} alt={item.logoAlt} width="52" height="52" loading="lazy" />
                      )}
                      <div className="exp-item-content">
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
                      </div>
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