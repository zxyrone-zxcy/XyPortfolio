import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, X } from 'lucide-react';
import signWiseImage from '../assets/SignWiseASL.png';
import simpleLoginImage from '../assets/simple-log-in-system.png';
import mockupLoginImage from '../assets/MockUpLogInDesign.png';
import profilePhoto from '../assets/1x1 Picture.jpg';
import PUBMAT1 from '../assets/AwardeeToSpeirs.png';
import PUBMAT2 from '../assets/FindOutWhatIf.png';
import PUBMAT3 from '../assets/Fireside.png';
import PUBMAT4 from '../assets/TechContributors.png';

const Projects = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [selectedSocialIndex, setSelectedSocialIndex] = useState(0);
  const [isMockupZoomOpen, setIsMockupZoomOpen] = useState(false);
  const swipeStartRef = useRef(null);
  const suppressSwipeClickRef = useRef(false);

  const projects = [
    { id: 1, title: 'SignWise: American Sign Language', description: 'A project to learn American Sign Language for People.', image: signWiseImage, url: 'https://github.com/zxyrone-zxcy/signwiseasl' },
    { id: 2, title: 'Simple Log-In System', description: 'A group project to create a reliable security system.', image: simpleLoginImage, url: 'https://github.com/zxyrone-zxcy/login-system-grupo-main' },
    { id: 3, title: 'Log-In Mock Up', description: 'A design prototype for log-in interface.', image: mockupLoginImage, imageFit: 'contain', url: null, zoomable: true },
  ];

  const socialDesigns = [
    {
      id: 1,
      username: '@zx_xyrone',
      location: 'Creative portfolio',
      mainImage: PUBMAT1,
      caption: 'I did this to honour my friend who is our president on the organization.',
    },
    {
      id: 2,
      username: '@zx_xyrone',
      location: 'Creative portfolio',
      mainImage: PUBMAT2,
      caption: 'A concept-driven social design exploring curiosity, tone, and visual storytelling.',
    },
    {
      id: 3,
      username: '@zx_xyrone',
      location: 'Creative portfolio',
      mainImage: PUBMAT3,
      caption: 'Pubmat design for a General Assembly Fireside Chat Event.',
    },
    {
      id: 4,
      username: '@zx_xyrone',
      location: 'Creative portfolio',
      mainImage: PUBMAT4,
      caption: 'AWS- Student Builder Group Contributors.',
    },
  ];

  useEffect(() => {
    if (!isMockupZoomOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMockupZoomOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMockupZoomOpen]);

  const handleCardClick = (index) => {
    const project = projects[index];
    if (index !== selectedIndex % projects.length) {
      setSelectedIndex(index);
      return;
    }

    if (project.url) {
      window.location.assign(project.url);
    } else if (project.zoomable) {
      setIsMockupZoomOpen(true);
    }
  };

  const moveSelection = (direction) => {
    setSelectedIndex((currentIndex) => (currentIndex + direction + projects.length) % projects.length);
  };

  const moveSocialSelection = (direction) => {
    setSelectedSocialIndex((currentIndex) => (currentIndex + direction + socialDesigns.length) % socialDesigns.length);
  };

  const startCarouselSwipe = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
    suppressSwipeClickRef.current = false;
  };

  const endCarouselSwipe = (event, setSelection, itemCount) => {
    const start = swipeStartRef.current;
    if (!start) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    swipeStartRef.current = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    suppressSwipeClickRef.current = true;
    setSelection((currentIndex) => (currentIndex + (deltaX < 0 ? 1 : -1) + itemCount) % itemCount);
  };

  const cancelCarouselSwipe = () => {
    swipeStartRef.current = null;
  };

  const suppressSwipeClick = (event) => {
    if (!suppressSwipeClickRef.current || event.detail === 0) return;
    event.preventDefault();
    event.stopPropagation();
    suppressSwipeClickRef.current = false;
  };

  return (
    <main className="projects-page">
      <section id="projects" className="section project-section-fixed" aria-labelledby="projects-heading">
        <div className="page-width">
          <header className="portfolio-section-header projects-header">
            <div className="portfolio-section-heading">
              <p className="portfolio-section-kicker">Selected Work / 01</p>
              <h1 id="projects-heading" className="portfolio-section-title">Projects</h1>
            </div>
            <p className="portfolio-section-description">
              Software projects and interface explorations built around useful tools and clear interaction.
            </p>
          </header>

          <div className="projects-carousel-wrap">
            <div className="carousel-controls projects-carousel-controls" aria-label="Project carousel controls">
              <span className="carousel-position" aria-live="polite" aria-atomic="true">
                {String((selectedIndex % projects.length) + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
              <div className="carousel-button-group">
                <button type="button" aria-label="Previous project" onClick={() => moveSelection(-1)}>
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Next project" onClick={() => moveSelection(1)}>
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div
              className="project-stack"
              role="region"
              aria-roledescription="carousel"
              aria-label="Projects"
              onPointerDown={startCarouselSwipe}
              onPointerUp={(event) => endCarouselSwipe(event, setSelectedIndex, projects.length)}
              onPointerCancel={cancelCarouselSwipe}
              onClickCapture={suppressSwipeClick}
            >
              {projects.map((project, index) => {
                let relativePosition = (index - selectedIndex + projects.length) % projects.length;
                if (relativePosition > Math.floor(projects.length / 2)) {
                  relativePosition -= projects.length;
                }
                const distance = Math.abs(relativePosition);

                return (
                  <article
                    key={project.id}
                    className={`canva-card stack-card ${distance === 0 ? 'is-active' : ''}`}
                    style={{
                      '--card-x': `${relativePosition * 9.2}rem`,
                      '--card-y': `${distance * 8}px`,
                      '--card-rotation': `${relativePosition * -8}deg`,
                      '--card-scale': Math.max(.58, 1 - distance * .12),
                      '--card-opacity': Math.max(.34, 1 - distance * .2),
                      zIndex: projects.length - distance,
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={distance === 0}
                    aria-label={`Select ${project.title}`}
                    onClick={() => handleCardClick(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(index);
                      }
                    }}
                  >
                    <span className="project-card-art" aria-hidden="true">
                      <img className={project.imageFit === 'contain' ? 'is-contained' : ''} src={project.image} alt="" />
                    </span>
                    <div className="project-card-copy">
                      <h2>{project.title}</h2>
                      <p>{project.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pubmat-section" aria-labelledby="pubmat-heading">
        <div className="page-width">
          <header className="portfolio-section-header pubmat-header">
            <div className="portfolio-section-heading">
              <p className="portfolio-section-kicker">Visual Design / 02</p>
              <h2 id="pubmat-heading" className="portfolio-section-title">Pubmat Design</h2>
            </div>
            <p className="portfolio-section-description">
              Pubmat designs created for AWS - SBG JRU, including event promotions and community features.
            </p>
          </header>

          <div className="pubmat-instagram-carousel" aria-label="Pubmat social media carousel">
            <div className="carousel-controls social-carousel-controls" aria-label="Pubmat carousel controls">
              <span className="carousel-position" aria-live="polite" aria-atomic="true">
                {String(selectedSocialIndex + 1).padStart(2, '0')} / {String(socialDesigns.length).padStart(2, '0')}
              </span>
              <div className="carousel-button-group">
                <button type="button" aria-label="Previous pubmat post" onClick={() => moveSocialSelection(-1)}>
                  <ChevronLeft size={19} aria-hidden="true" />
                </button>
                <button type="button" aria-label="Next pubmat post" onClick={() => moveSocialSelection(1)}>
                  <ChevronRight size={19} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              className="pubmat-social-stack"
              role="region"
              aria-roledescription="carousel"
              aria-label="Pubmat posts"
              onPointerDown={startCarouselSwipe}
              onPointerUp={(event) => endCarouselSwipe(event, setSelectedSocialIndex, socialDesigns.length)}
              onPointerCancel={cancelCarouselSwipe}
              onClickCapture={suppressSwipeClick}
            >
              {socialDesigns.map((design, index) => {
                let relativePosition = (index - selectedSocialIndex + socialDesigns.length) % socialDesigns.length;
                if (relativePosition > Math.floor(socialDesigns.length / 2)) {
                  relativePosition -= socialDesigns.length;
                }
                const distance = Math.abs(relativePosition);

                return (
                  <article
                    key={design.id}
                    className={`social-post-card ${distance === 0 ? 'is-active' : ''}`}
                    style={{
                      '--social-x': `${relativePosition * 9.2}rem`,
                      '--social-y': `${distance * 10}px`,
                      '--social-rotation': `${relativePosition * -7}deg`,
                      '--social-scale': Math.max(.66, 1 - distance * .12),
                      '--social-opacity': Math.max(.34, 1 - distance * .18),
                      zIndex: socialDesigns.length - distance,
                    }}
                    aria-label={`Open post ${design.username}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      if (distance !== 0) {
                        setSelectedSocialIndex(index);
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        if (distance !== 0) {
                          setSelectedSocialIndex(index);
                        }
                      }
                    }}
                  >
                    <div className="social-post-header">
                      <div className="social-user-group">
                        <span className="social-avatar" style={{ backgroundImage: `url(${profilePhoto})` }} aria-hidden="true" />
                        <div className="social-user-meta">
                          <span className="social-user-name">{design.username}</span>
                          <small>{design.location}</small>
                        </div>
                      </div>
                      <button type="button" className="social-more-button" aria-label="More options for this post">
                        <MoreHorizontal size={18} aria-hidden="true" />
                      </button>
                    </div>

                    <div className="social-post-media">
                      <div className="social-main-image">
                        <img src={design.mainImage} alt={design.caption} />
                      </div>
                    </div>

                    <div className="social-post-actions" aria-label="Post actions">
                      <span className="social-action social-like" aria-hidden="true">❤</span>
                      <span className="social-action social-comment" aria-hidden="true">◌</span>
                      <span className="social-action social-share" aria-hidden="true">↗</span>
                    </div>

                    <p className="social-caption">
                      <strong>{design.username}</strong> {design.caption}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {isMockupZoomOpen && (
        <div
          className="project-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Log-In Mock Up image"
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsMockupZoomOpen(false);
          }}
        >
          <button
            className="project-image-viewer-close"
            type="button"
            aria-label="Close image viewer"
            autoFocus
            onClick={() => setIsMockupZoomOpen(false)}
          >
            <X size={22} aria-hidden="true" />
          </button>
          <img src={mockupLoginImage} alt="Log-In Mock Up design" />
        </div>
      )}

    </main>
  );
};

export default Projects;