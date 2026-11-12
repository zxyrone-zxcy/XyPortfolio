import React, { useEffect, useRef } from 'react';
import computerNetCertificate from '../assets/certifications/Computer_Net_Certificate.png';
import datacomCourseCompletion from '../assets/certifications/HCIA-Datacom V1. Course Completion.png';
import comptiaBadge from '../assets/certifications/badges/comptia-itf.png';
import ciscoJs1Badge from '../assets/certifications/badges/cisco-js1.png';
import ciscoJs2Badge from '../assets/certifications/badges/cisco-js2.png';
import databasesBadge from '../assets/certifications/badges/its-databases.png';
import SectionHeader from '../components/SectionHeader';
import '../styles/global.css';
import '../styles/responsive.css';
import '../styles/certifications.css';

// Dates are YYYY-MM-DD. `expires: null` = the credential doesn't expire.
// Credential dates come from each Credly badge page; course dates from the certificates.
const credentials = [
  {
    title: 'CompTIA IT Fundamentals+',
    image: comptiaBadge,
    status: 'Earned',
    issued: '2024-12-05',
    expires: null,
    url: 'https://www.credly.com/badges/f92e6647-a29a-40d0-9f2a-55f894224d12/public_url',
  },
  {
    title: 'Cisco JavaScript Essentials 1',
    image: ciscoJs1Badge,
    status: 'Earned',
    issued: '2026-07-23',
    expires: null,
    url: 'https://www.credly.com/badges/f4f58d47-2a54-4cfd-9221-048608479b4d/public_url',
  },
  {
    title: 'Cisco JavaScript Essentials 2',
    image: ciscoJs2Badge,
    status: 'Earned',
    issued: '2026-07-23',
    expires: null,
    url: 'https://www.credly.com/badges/0c94dc1c-8d58-4c70-aec1-7ca91b036e8e/public_url',
  },
  {
    title: 'IT Specialist – Databases',
    image: databasesBadge,
    status: 'Earned',
    issued: '2026-05-06',
    expires: '2031-05-06',
    url: 'https://www.credly.com/badges/284ae140-9ca6-4365-ac18-77f81311a9af/public_url',
  },
];

const courses = [
  {
    title: 'Computer Networks Experiment – Huawei ICT Academy',
    image: computerNetCertificate,
    status: 'Completed',
    issued: '2026-09-09',
    expires: null,
    url: computerNetCertificate,
  },
  {
    title: 'HCIA-Datacom V1.0 Course – Huawei ICT Academy',
    image: datacomCourseCompletion,
    status: 'Completed',
    issued: '2026-10-11',
    expires: null,
    url: datacomCourseCompletion,
  },
];

const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// One item layout shared by both sections, so credentials and courses line up identically.
function CredentialItem({ title, image, status, issued, expires, url }) {
  return (
    <li className="credential reveal-on-scroll">
      <a className="credential-media" href={url} target="_blank" rel="noreferrer" aria-label={`${title} (opens in a new tab)`}>
        <img src={image} alt={title} loading="lazy" />
      </a>
      <p className="credential-status">{status}</p>
      <dl className="credential-dates">
        <div>
          <dt>Issued</dt>
          <dd><time dateTime={issued}>{formatDate(issued)}</time></dd>
        </div>
        <div>
          <dt>Expires</dt>
          <dd>{expires ? <time dateTime={expires}>{formatDate(expires)}</time> : 'No expiration'}</dd>
        </div>
      </dl>
    </li>
  );
}

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

  return (
    <div className="page-shell" ref={containerRef}>
      <main className="page-width">
        <section id="certificates" className="section-container page-intro cert-page">
          <SectionHeader
            as="h1"
            className="reveal-on-scroll"
            index="01"
            label="Certificates"
            title="Professional credentials."
            description="Validated technical skills, industry-standard learning, and continuous growth across software, data, and cloud systems."
          />
          <ul className="credential-grid">
            {credentials.map((item) => <CredentialItem key={item.title} {...item} />)}
          </ul>
        </section>

        <section id="course-completions" className="section-container cert-page">
          <SectionHeader
            className="reveal-on-scroll"
            index="02"
            label="Courses"
            title="Course completions."
            description="A consistent record of ongoing education, practical skill-building, and professional development."
          />
          <ul className="credential-grid">
            {courses.map((item) => <CredentialItem key={item.title} {...item} />)}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Certificates;
