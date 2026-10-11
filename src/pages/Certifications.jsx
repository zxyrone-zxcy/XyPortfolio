import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';
import computerNetCertificate from '../assets/Computer_Net_Certificate.png';
import datacomCourseCompletion from '../assets/HCIA-Datacom V1. Course Completion.png';
import '../styles/global.css';
import '../styles/responsive.css';
import '../styles/certifications.css';

const Certificates = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      id: 1,
      title: 'CompTIA IT Fundamentals+',
      issuer: 'CompTIA',
      category: 'Information Technology',
      details: 'Completed · Foundational IT knowledge and troubleshooting concepts.',
      status: 'Earned',
      link: 'https://www.credly.com/badges/f92e6647-a29a-40d0-9f2a-55f894224d12/public_url',
    },
    {
      id: 2,
      title: 'Cisco JavaScript Essentials 1 & 2',
      issuer: 'Cisco Networking Academy',
      category: 'JavaScript Development',
      details: 'Completed · JavaScript programming fundamentals and core concepts.',
      status: 'Earned',
      links: [
        { label: 'Essentials 1', url: 'https://www.credly.com/badges/f4f58d47-2a54-4cfd-9221-048608479b4d/public_url' },
        { label: 'Essentials 2', url: 'https://www.credly.com/badges/0c94dc1c-8d58-4c70-aec1-7ca91b036e8e/public_url' },
      ],
    },
    {
      id: 3,
      title: 'IT Specialist – Databases',
      issuer: 'Certiport',
      category: 'Database Management',
      details: 'Completed · Database concepts, data management, and SQL fundamentals.',
      status: 'Earned',
      link: 'https://www.credly.com/badges/284ae140-9ca6-4365-ac18-77f81311a9af/public_url',
    }
  ];

  const courseCompletions = [
    {
      id: 1,
      title: 'HCIA-Datacom V1.0 Course',
      provider: 'Huawei ICT Academy',
      details: 'Issued on 2026-10-11 · Course completion certificate.',
      status: 'Completed',
      issueDate: '2026-10-11',
      certificateCode: 'EBG20261011046564',
      courseName: 'Computer Networks Experiment',
      image: computerNetCertificate,
      alternateImage: datacomCourseCompletion,
    },
    {
      id: 2,
      title: 'Course title to be added',
      provider: 'Provider to be added',
      details: 'Completion date to be added · Additional skill-building milestone.',
      status: 'Pending',
    },
  ];

  return (
    <div className="site-shell page-shell" ref={containerRef}>
      <main className="main-content page-width">
        <section id="certificates" className="section-container cert-page">
          <header className="reveal-on-scroll section-header">
            <div className="eyebrow-row">
              <span className="section-badge">
                <Award size={15} />
                Certificates
              </span>
            </div>
            <h1 className="section-title cert-title">Professional credentials.</h1>
            <p className="section-description">
              Validated technical skills, industry-standard learning, and continuous growth across software, data, and cloud systems.
            </p>
          </header>

          <div className="cards-marquee">
            <div className="cards-track">
              {[false, true].map((isDuplicate) => (
                <div className="cards-set" key={String(isDuplicate)} aria-hidden={isDuplicate || undefined}>
                  {certifications.map((cert) => (
                    <article
                      key={cert.id}
                      className={`canva-card cert-card${isDuplicate ? '' : ' reveal-on-scroll'}`}
                    >
                      <div className="card-head">
                        <span className="status-pill">{cert.status}</span>
                      </div>

                      <div className="card-copy">
                        <h3 className="card-title">{cert.title}</h3>
                        <p className="card-subtext">{cert.issuer} · {cert.category}</p>
                        <p className="card-status">{cert.details}</p>
                      </div>

                      <div className="card-links">
                        {(cert.links ?? [{ label: 'View certificate', url: cert.link }]).map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            className="card-link"
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={isDuplicate ? -1 : undefined}
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight size={14} />
                          </a>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="course-completions" className="section-container cert-page">
          <header className="reveal-on-scroll section-header">
            <div className="eyebrow-row">
              <span className="section-badge">
                <Sparkles size={15} />
                Learning milestones
              </span>
            </div>
            <h2 className="section-title cert-title">Course completions.</h2>
            <p className="section-description">
              A consistent record of ongoing education, practical skill-building, and professional development.
            </p>
          </header>

          <div className="cards-marquee">
            <div className="cards-track">
              {[false, true].map((isDuplicate) => (
                <div className="cards-set" key={String(isDuplicate)} aria-hidden={isDuplicate || undefined}>
                  {courseCompletions.map((course) => (
                    <article
                      key={course.id}
                      className={`canva-card cert-card${isDuplicate ? '' : ' reveal-on-scroll'}`}
                    >
                      <div className="card-head">
                        <span className="status-pill muted">{course.status}</span>
                      </div>

                      {course.id === 1 && course.image ? (
                        <div className="certificate-image-frame">
                          <img src={course.image} alt="Computer Networks Certificate" className="certificate-image-preview" />
                        </div>
                      ) : null}

                      <div className="card-copy">
                        <h3 className="card-title">{course.title}</h3>
                        <p className="card-subtext">{course.provider}</p>
                        <p className="card-status">{course.details}</p>
                      </div>

                      {course.id === 1 ? (
                        <div className="card-links">
                          <a
                            href={course.image}
                            target="_blank"
                            rel="noreferrer"
                            className="card-link view-button"
                          >
                            <span>View Certificate</span>
                            <ArrowUpRight size={14} />
                          </a>
                          <a
                            href={course.alternateImage}
                            target="_blank"
                            rel="noreferrer"
                            className="card-link view-button"
                          >
                            <span>View Completion</span>
                            <ArrowUpRight size={14} />
                          </a>
                        </div>
                      ) : (
                        <span className="card-link disabled">Certificate link pending</span>
                      )}
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Certificates;
