import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Facebook, Instagram, Linkedin, Code2, Coffee, Zap, Atom, Database, Leaf, Braces } from 'lucide-react';
import profilePhoto from '../assets/1x1 Picture.jpg';
import myPhotoshoot from '../assets/MyPhotoshoot.jpg';
import heroPhoto from '../assets/hero.png';
import paraBangPhoto from '../assets/NaParaBang.png';
import '../styles/global.css';
import '../styles/responsive.css';

const roles = ['Pubmat Designer @AWSSBG-JRU', 'Junior Developer', 'Database Specialist'];
const technologies = [
  { name: 'Java', Icon: Coffee, style: 'technology-java' },
  { name: 'Vite', Icon: Zap, style: 'technology-vite' },
  { name: 'React', Icon: Atom, style: 'technology-react' },
  { name: 'Oracle Database', Icon: Database, style: 'technology-oracle' },
  { name: 'MongoDB', Icon: Leaf, style: 'technology-mongodb' },
  { name: 'Laravel', Icon: Braces, style: 'technology-laravel' },
  { name: 'Python', Icon: Braces, style: 'technology-python' },
];

const Home = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isRoleFading, setIsRoleFading] = useState(false);
  const [isProfileFlipping, setIsProfileFlipping] = useState(false);
  const [isFrontFaceVisible, setIsFrontFaceVisible] = useState(true);
  const [flipDirection, setFlipDirection] = useState(1);
  const containerRef = useRef(null);

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

                <h1 className="hero-name">
                  Xyrone Edmund Zamudio
                </h1>

                <div className="role-container">
                  <h2 className={`hero-role ${isRoleFading ? 'fade-out' : 'fade-in'}`}>
                    {roles[currentRoleIndex]}
                  </h2>
                </div>
              </div>
            </div>

            <p className="hero-description">
              I build thoughtful, digital systems and turn data into useful decisions—one clear, considered solution at a time.
            </p>

            <a href="#approach" className="scroll-indicator" aria-label="Scroll to explore section">
              <span>SCROLL TO EXPLORE</span>
              <span className="scroll-arrow-wrap">
                <ArrowDown size={14} className="bounce-icon" />
              </span>
            </a>
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
              Lastly, Thank you for my special someone, you made me feel determined.
            </p>
          </div>

          <div className="photo-card-wrapper">
            <div className="photo-card photo-card-primary">
              <img src={heroPhoto} alt="Xyrone Edmund Zamudio professional shoot" className="profile-img" />
            </div>
            <div className="photo-card photo-card-secondary">
              <img src={paraBangPhoto} alt="Xyrone at a group learning session" className="profile-img" />
            </div>
          </div>
        </section>

        {/* Social Links Section */}
        <section id="social-links" className="section-container reveal-on-scroll">
          <p className="section-badge">CONNECT</p>
          <h2 className="section-title">Find me online.</h2>
          <div className="social-links" aria-label="Social media links">
            <a href="https://www.facebook.com/zxcyro" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook">
              <Facebook size={20} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/xyronezamudio1018/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <Linkedin size={20} aria-hidden="true" />
            </a>
            <a href="https://www.instagram.com/zxcyrone_/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram">
              <Instagram size={20} aria-hidden="true" />
            </a>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Home;
