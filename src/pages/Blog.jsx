import React, { useEffect, useRef } from 'react';
import SectionHeader from '../components/SectionHeader';
import '../styles/blog.css';

const posts = [
  {
    category: 'Wanting to learn something',
    title: 'The curious young Xy',
    excerpt: `As I entered high school, I slowly discovered more about myself. I became more interested in technology and started exploring different things. I enjoyed working with computers, editing videos and photos, and eventually learning how programming worked. School also became an important part of my growth. I experienced achievements that made me proud, but I also experienced failures and difficulties that taught me that success does not always come easily.
One of the things I learned during those years was the importance of effort. Whether it was a school project, research paper, science activity, or working with other people, I learned that the result often depends on how much effort I am willing to give. I also learned that working with other people is not always easy. There are times when people have different priorities, opinions, and levels of responsibility. These experiences helped me become more patient and responsible.`,
  },
  {
    category: 'Becoming Who I Want to Be',
    title: 'Doing the next step',
    excerpt: `When I entered college, things became more serious. I started taking my future more seriously as well. Studying Information Technology introduced me to programming, databases, web development, and different areas of technology. At first, I thought I already knew what I wanted to become. But as I continued learning, I realized that there are many paths I can take.

  I became interested in web development, software development, UI/UX design, and even areas such as DevOps and artificial intelligence. I am still figuring out exactly where I want to end up, but I have learned that it is okay not to have everything figured out immediately. What matters is that I continue learning and improving.`,
  },
  {
    category: 'Failing is learning',
    title: 'A stepping stone to success and growth',
    excerpt: `I also experienced moments in college that made me question myself. One of them was when I took the Java Certification Specialist examination through Pearson VUE. I failed the certification, and at that time, I was really disappointed. I felt sad and worried that I would not be able to advance to the next step. For a while, the result made me feel like maybe I was not good enough at programming.

  However, as I look back at that experience, I realize that failing the certification did not mean that I had to stop. It was only one failure in a much longer journey. Instead of allowing that result to define me, I learned that I still had more to study and improve. It reminded me that being a student is not about getting everything right on the first try. Sometimes, failure shows us where we still need to grow.`,
  },
];

export default function Blog() {
  const pageRef = useRef(null);
  useEffect(() => {
    const nodes = pageRef.current?.querySelectorAll('.reveal-on-scroll');
    if (!nodes?.length) return undefined;
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return (
    <main className="blog-page page-width" ref={pageRef}>
      <SectionHeader
        as="h1"
        index="01"
        label="Blog"
        title="Blogs, in progress."
        description="A journal about learning and growth."
      />
      <ol className="blog-list" aria-label="Blog posts">
        {posts.map((post, index) => (
          <li key={post.title}>
            <article className="blog-entry reveal-on-scroll">
              <div className="blog-entry-meta">
                <span className="blog-entry-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="blog-entry-category">{post.category}</span>
              </div>
              <div className="blog-entry-body">
                <h2>{post.title}</h2>
                {post.excerpt.split(/\n\s*\n|\n/).map((para) => para.trim()).filter(Boolean).map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
      <p className="blog-note">More writing will appear here as projects and ideas take shape.</p>
    </main>
  );
}
