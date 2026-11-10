import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion/react';
import { ArrowDown, Download, Facebook, Instagram, Linkedin, Code2 } from 'lucide-react';
import { FaJava } from 'react-icons/fa';
import { SiVite, SiReact, SiMongodb, SiLaravel, SiPython, SiSupabase } from 'react-icons/si';
import profilePhoto from '../assets/1x1 Picture.jpg';
import myPhotoshoot from '../assets/MyPhotoshoot.jpg';
import heroPhoto from '../assets/hero.png';
import meMyself from '../assets/MeMyself.jpg';
import cvPdf from '../assets/Zamudio,Xyrone Edmund_CV.pdf';
import SpotifyPlayer from '../components/SpotifyPlayer';
import '../styles/global.css';
import '../styles/responsive.css';

const roles = ['Pubmat Designer @AWSSBG-JRU', 'Junior Developer', 'Database Specialist'];
// react-icons has no Oracle glyph, so this draws the Oracle "O" ring mark.
const OracleIcon = ({ size = 19, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" {...props}>
    <rect x="2" y="6.5" width="20" height="11" rx="5.5" />
  </svg>
);

const technologies = [
  { name: 'Java', Icon: FaJava, style: 'technology-java' },
  { name: 'Vite', Icon: SiVite, style: 'technology-vite' },
  { name: 'React', Icon: SiReact, style: 'technology-react' },
  { name: 'Oracle Database', Icon: OracleIcon, style: 'technology-oracle' },
  { name: 'MongoDB', Icon: SiMongodb, style: 'technology-mongodb' },
  { name: 'Laravel', Icon: SiLaravel, style: 'technology-laravel' },
  { name: 'Python', Icon: SiPython, style: 'technology-python' },
  { name: 'Supabase', Icon: SiSupabase, style: 'technology-supabase' },
];

const fullName = 'Xyrone Edmund Zamudio';

const socialLinks = [
  { label: 'Facebook', subLabel: 'xyrone', href: 'https://www.facebook.com/zxcy.1018', Icon: Facebook },
  { label: 'LinkedIn', subLabel: 'in/xyronezamudio1018', href: 'https://www.linkedin.com/in/xyronezamudio1018/', Icon: Linkedin },
  { label: 'Instagram', subLabel: '@zxcyrone_', href: 'https://www.instagram.com/zxcyrone_/', Icon: Instagram },
];

const Home = () => {
  const [typedCount, setTypedCount] = useState(0);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isRoleFading, setIsRoleFading] = useState(false);
  const [isProfileFlipping, setIsProfileFlipping] = useState(false);
  const [isFrontFaceVisible, setIsFrontFaceVisible] = useState(true);
  const [flipDirection, setFlipDirection] = useState(1);
  const containerRef = useRef(null);

  // Typewriter animation for the hero name
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedCount(fullName.length);
      return undefined;
    }
    const controls = animate(0, fullName.length, {
      duration: 1.8,
      delay: 0.3,
      ease: 'linear',
      onUpdate: (value) => setTypedCount(Math.round(value)),
    });
    return () => controls.stop();
  }, []);

  // Interchangeable Role Text Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRoleFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsRoleFading(false);
      }, 500); // Match the fade-out duration
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !('IntersectionObserver' in window)) {
      containerRef.current?.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    containerRef.current.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page" ref={containerRef}>
      <main className="main-content page-width">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          {/* Animated Background Glow & Orbiting Particles */}
          <div className="hero-glow" />
          <div className="hero-particles">
            <span className="particle p1" />
            <span className="particle p2" />
            <span className="particle p3" />
            <span className="particle p4" />
          </div>

          <div className="hero-tech-layer" aria-hidden="true">
            <span className="tech-orb orb-one" />
            <span className="tech-orb orb-two" />
            <span className="tech-orb orb-three" />
            <span className="tech-line line-one" />
            <span className="tech-line line-two" />
            <span className="chip chip-one" />
            <span className="chip chip-two" />
            <span className="chip chip-three" />
          </div>

          <div className="hero-content">
            <div className="hero-header">
              <button
                type="button"
                className={`hero-avatar-button ${isProfileFlipping ? 'is-flipping' : ''} ${isFrontFaceVisible ? 'is-front-visible' : 'is-back-visible'}`}
                style={{ '--flip-direction': flipDirection }}
                aria-label="Flip profile photo"
                onClick={() => {
                  setFlipDirection((prev) => prev * -1);
                  setIsFrontFaceVisible((prev) => !prev);
                  setIsProfileFlipping(true);
                  window.setTimeout(() => setIsProfileFlipping(false), 700);
                }}
              >
                <span className="hero-avatar-face hero-avatar-front">
                  <img src={profilePhoto} alt="Xyrone Edmund Zamudio" className="hero-avatar" />
                </span>
                <span className="hero-avatar-face hero-avatar-back">
                  <img src={myPhotoshoot} alt="Xyrone Edmund Zamudio professional shoot" className="hero-avatar hero-avatar-back-image" />
                </span>
              </button>

              <div className="hero-text-block">
                <p className="hero-subtitle">SOFTWARE · DATA · SYSTEMS</p>

                <h1 className="hero-name" aria-label={fullName}>
                  <span aria-hidden="true">{fullName.slice(0, typedCount)}</span>
                  <span className="typewriter-cursor" aria-hidden="true" />
                  <span className="typewriter-rest" aria-hidden="true">{fullName.slice(typedCount)}</span>
                </h1>

                <div className="role-container">
                  <h2 className={`hero-role ${isRoleFading ? 'fade-out' : 'fade-in'}`}>
                    {roles[currentRoleIndex]}
                  </h2>
                </div>
              </div>
            </div>

            <p className="hero-description">
              I build thoughtful digital systems and turn data into useful decisions, and I'm sharpening that craft by working with AI to design, build, and ship faster and smarter.
            </p>

            <div className="hero-social">
              <div className="social-links" aria-label="Social media links">
                {socialLinks.map(({ label, subLabel, href, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon size={20} aria-hidden="true" />
                    <span className="social-label">{label}</span>
                    <small className="social-sublabel">{subLabel}</small>
                  </a>
                ))}
              </div>
            </div>

            <div className="hero-action-row">
              <a href="#approach" className="scroll-indicator" aria-label="Scroll to explore section">
                <span>SCROLL TO EXPLORE</span>
                <span className="scroll-arrow-wrap">
                  <ArrowDown size={14} className="bounce-icon" />
                </span>
              </a>
              <a className="hero-cv-link" href={cvPdf} target="_blank" rel="noopener noreferrer">
                <Download size={17} aria-hidden="true" />
                <span>View CV</span>
              </a>
            </div>
          </div>
        </section>

        {/* My Approach Section */}
        <section id="approach" className="section-container reveal-on-scroll">
          <h2 className="approach-statement reveal-on-scroll">Building systems with code, uncovering answers with data.</h2>
        </section>

        {/* About Me Section */}
        <section id="about" className="section-container reveal-on-scroll">
          <div className="about-text-content">
            <p className="section-badge">ABOUT ME</p>
            <h2 className="section-title">A little more about myself.</h2>
            <p className="section-paragraph">
              Hi, I’m Xy. I’m a BSIT student and a junior web developer. I’m pretty knowledgeable when it comes to databases, and I also do video editing using Adobe Premiere Pro. I’m still learning and improving, but I really enjoy building things and working with technology.
            </p>

            <div className="technology-stack">
              <h3 className="technology-stack-heading">
                <Code2 size={18} aria-hidden="true" />
                <span>Building using:</span>
              </h3>
              <div className="technology-marquee" role="group" aria-label="Programming languages and tools">
                <div className="technology-marquee-track">
                  {[false, true].map((isDuplicate) => (
                    <div className="technology-marquee-group" key={String(isDuplicate)} aria-hidden={isDuplicate}>
                      {technologies.map(({ name, Icon, style }) => (
                        <span className={`technology-item ${style}`} key={name}>
                          <Icon size={19} aria-hidden="true" />
                          <span>{name}</span>
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* My Dedication Section */}
        <section className="section-container grid-2 reveal-on-scroll">
          <div className="dedication-content">
            <p className="section-badge">PROFESSIONAL PROFILE</p>
            <h2 className="section-title">Hello, I am Xyrone.</h2>

            <div className="dedication-list">
              <div className="dedication-item">
                <h4>Getting Started to IT Field</h4>
                <p>Before jumping into IT, I was always the person who actually enjoyed solving math problems. Pre-calculus and basic calculus were right up my alley back in school. Beyond just working through equations on paper, I liked seeing how things worked in the physical world—at one point, a friend and I even built a small line-following truck using an Arduino, which was my first real hands-on experience getting code and hardware to talk to each other.</p>
              </div>

              <div className="dedication-item">
                <h4>The Pressure entering to the IT Field</h4>
                <p>Entering the IT field brought a lot of pressure. It feels like everyone expects you to know five different programming languages, networking, and cloud systems right out of the gate, and the sheer volume of things to learn can be pretty overwhelming. But whenever I start feeling that doubt, I remind myself of where I started. I’ve always been drawn to solving complex math problems, and tackling pre-calc and calculus taught me how to break down tough logic.</p>
              </div>

              <div className="dedication-item">
                <h4>Getting used to it.</h4>
                <p>Once I get comfortable with the fact that nobody knows everything and everybody is looking things up, the learning curve stops feeling like a wall and starts feeling like just another problem to solve</p>
              </div>
            </div>

            <p className="dedication-footer">
              Lastly, thanks to all people besides me, Without them I wouldn't have made it this far.
            </p>
          </div>

          <div className="photo-card-wrapper">
            <div className="photo-card photo-card-primary">
              <img src={heroPhoto} alt="Xyrone Edmund Zamudio professional shoot" className="profile-img" />
            </div>
            <div className="photo-card photo-card-secondary">
              <img src={meMyself} alt="Xyrone at a group learning session" className="profile-img" />
            </div>
          </div>
        </section>

        {/* Music Section */}
        <section id="music" className="section-container reveal-on-scroll">
          <h2 className="section-title">What I listen to.</h2>
          <SpotifyPlayer />
        </section>

      </main>
    </div>
  );
};

export default Home;
