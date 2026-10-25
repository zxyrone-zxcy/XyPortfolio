import React, { useEffect, useRef } from "react";
import { ArrowDown, Puzzle, GraduationCap, Network, Image } from "lucide-react";
import achieverImage from "../assets/achiever.png";
import groupLessonImage from "../assets/grouplesson.png";
import systemsThinkingImage from "../assets/systhink.png";

const strengths = [
  { title: "Problem solving", Icon: Puzzle, imageSrc: achieverImage },
  { title: "Continuous learning", Icon: GraduationCap, imageSrc: groupLessonImage },
  { title: "Systems thinking", Icon: Network, imageSrc: systemsThinkingImage },
];

export default function Experience() {
  const pageRef = useRef(null);

  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll(".reveal-on-scroll");
    if (!nodes?.length) return undefined;
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={pageRef}>
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
        <div className="page-width hero-content reveal-on-scroll">
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
        </div>
      </section>

      <section className="section border-y border-[var(--line)] bg-gradient-to-r from-[#101521] to-[#0c101b]">
        <div className="page-width reveal-on-scroll">
          <p className="section-label">An evolving practice</p>
          <h2 className="section-title text-[#f2f6ff]">Designed, built, and delivered.</h2>
          <div className="w-16 h-[2px] my-5 bg-gradient-to-r from-[#70adff] to-[#aa8cff]"></div>
          <p className="text-[#b1bed3] font-serif text-2xl max-w-3xl leading-snug">
            A timeline of my work in creative media, academic projects, and hands-on roles.
          </p>
        </div>
      </section>

      <section id="path" className="section">
        <div className="page-width">
          <p className="section-label reveal-on-scroll">Career &amp; academic milestones</p>
          <h2 className="section-title text-[#f2f6ff] reveal-on-scroll">My milestones and journey to my career.</h2>

          <div className="timeline mt-8">
            <article className="milestone reveal-on-scroll">
              <div className="experience-heading">
                <h3 className="text-xl font-bold text-[#f2f6ff]">Creative Officer · AWS Org JRU Chapter</h3>
                <time className="experience-date" dateTime="2026">2026–Present</time>
              </div>
              <ul className="experience-duties">
                <li>Design publication materials and visual content for chapter projects and activities.</li>
                <li>Collaborate with chapter members to communicate ideas through engaging visuals.</li>
                <li>Apply graphic design principles to keep materials clear, consistent, and visually appealing.</li>
                <li>Manage creative tasks to meet deadlines and adapt designs based on feedback.</li>
              </ul>
            </article>

            <article className="milestone reveal-on-scroll" style={{ transitionDelay: "90ms" }}>
              <div className="experience-heading">
                <h3 className="text-xl font-bold text-[#f2f6ff]">Photo Editor / Video Content Editor</h3>
                <time className="experience-date" dateTime="2025">2025–Present</time>
              </div>
              <ul className="experience-duties">
                <li>Applied composition, visual design, and color-adjustment principles to photo and video edits.</li>
                <li>Created engaging visual content to meet project requirements and deadlines.</li>
                <li>Organized and refined digital assets into clean, professional outputs.</li>
                <li>Strengthened creativity, attention to detail, and technical editing skills.</li>
              </ul>
            </article>

            <article className="milestone reveal-on-scroll" style={{ transitionDelay: "180ms" }}>
              <div className="experience-heading">
                <h3 className="text-xl font-bold text-[#f2f6ff]">Academic Milestones · Nagpayong High School</h3>
                <time className="experience-date" dateTime="2023">2023–Present</time>
              </div>
              <ul className="experience-duties">
                <li>Graduated with High Honors.</li>
                <li>Placed 3rd in the Sci-Tok Experiment in Grade 11.</li>
                <li>Earned Best STEM Research Paper in Grade 12.</li>
              </ul>
            </article>

            <article className="milestone reveal-on-scroll" style={{ transitionDelay: "270ms" }}>
              <div className="experience-heading">
                <h3 className="text-xl font-bold text-[#f2f6ff]">Barista at Frosh Tea</h3>
                <time className="experience-date" dateTime="2023-12">Dec. 2023</time>
              </div>
              <ul className="experience-duties">
                <li>Provided friendly, efficient customer service while assisting customers with orders and requests.</li>
                <li>Prepared and served beverages while maintaining a clean, organized work area.</li>
                <li>Developed communication, time management, and customer service skills through hands-on experience.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="bring" className="section bg-white/[0.014] border-y border-[var(--line)]">
        <div className="page-width grid md:grid-cols-2 gap-8 items-start">
          <div className="reveal-on-scroll">
            <p className="section-label">What I bring</p>
            <h2 className="section-title text-[#f2f6ff]">A practical way of thinking.</h2>
            <p className="text-[#aab6ca] mt-4 max-w-md leading-relaxed">
              A mindset centered on clear questions, steady improvement, and solutions that consider both the details and the wider system.
            </p>
          </div>

          <div className="experience-strengths">
            {strengths.map(({ title, Icon, imageSrc }, index) => (
              <article
                className="side-note experience-strength-card reveal-on-scroll"
                key={title}
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className="experience-strength-photo">
                  {imageSrc ? (
                    <img src={imageSrc} alt={`${title} photo`} />
                  ) : (
                    <div className="experience-strength-photo-placeholder" aria-label={`${title} photo frame`}>
                      <Image size={22} aria-hidden="true" />
                      <span>Photo frame</span>
                    </div>
                  )}
                </div>
                <div className="w-9 h-9 grid place-items-center rounded-lg bg-[#6ea8ff]/15 text-[#a8c9ff]">
                  <Icon size={19} />
                </div>
                <h3 className="text-lg font-bold text-[#eef4ff] mt-3">{title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}