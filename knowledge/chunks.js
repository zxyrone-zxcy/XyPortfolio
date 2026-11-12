// Knowledge base for the chatbot's retrieval (RAG).
// One chunk = one self-contained fact/topic. Edit/add chunks here when the site changes;
// `tags` are extra search words (synonyms) that help questions find the right chunk.
export const CHUNKS = [
  // ---------- About ----------
  {
    id: "about",
    page: "Home",
    title: "About Xyrone",
    tags: "who are you introduction bio summary background student developer xy",
    text: "Xyrone Edmund Zamudio (goes by Xy) is a BSIT student and junior web developer. He is knowledgeable in databases and does video editing with Adobe Premiere Pro. He is still learning and improving, and enjoys building things with technology. Roles listed on the site: Pubmat Designer @ AWS SBG-JRU, Junior Developer, Database Specialist.",
  },
  {
    id: "motto",
    page: "Home",
    title: "Motto and approach",
    tags: "philosophy mission goal ai approach",
    text: 'His motto: "Building systems with code, uncovering answers with data." He builds thoughtful digital systems, turns data into useful decisions, and is sharpening that craft by working with AI to design, build and ship faster and smarter.',
  },
  {
    id: "skills",
    page: "Home",
    title: "Tech stack and skills",
    tags: "skills technologies tools languages programming stack frameworks database know use",
    text: "Technologies on the site: Java, Vite, React, Oracle Database, MongoDB, Laravel, Python and Supabase. He is strongest with databases (Oracle, SQL fundamentals, MongoDB, Supabase), builds web apps with React + Vite, and edits video with Adobe Premiere Pro.",
  },
  {
    id: "math-arduino",
    page: "Home",
    title: "Math background and Arduino truck",
    tags: "hobby interests math calculus arduino hardware truck friend robot",
    text: "Before IT, Xy enjoyed solving math problems; pre-calculus and basic calculus were right up his alley. A friend and he built a small line-following truck with an Arduino, his first hands-on experience getting code and hardware to talk to each other.",
  },
  {
    id: "pressure",
    page: "Home",
    title: "Pressure of entering IT",
    tags: "challenge doubt overwhelmed learning curve mindset advice",
    text: "Entering IT brought pressure: it feels like everyone expects you to know many languages, networking and cloud right away. Xy reminds himself that math taught him to break down tough logic, and that nobody knows everything; once he accepts that, the learning curve feels like just another problem to solve.",
  },
  {
    id: "contact",
    page: "Home",
    title: "Contact and social links",
    tags: "contact reach email hire social facebook linkedin instagram cv resume download message",
    text: "Social links on the home page: LinkedIn in/xyronezamudio1018 (https://www.linkedin.com/in/xyronezamudio1018/), Instagram @zxcyrone_ (https://www.instagram.com/zxcyrone_/), Facebook (https://www.facebook.com/zxcy.1018). A downloadable CV is on the home page. Design work is posted under @zx_xyrone.",
  },

  // ---------- Education ----------
  {
    id: "edu-college",
    page: "Experience",
    title: "Education: BS Information Technology, Jose Rizal University",
    tags: "school university college degree course study bsit jru education studying",
    text: "Bachelor of Science in Information Technology at Jose Rizal University, June 2024 to present. Relevant coursework: Programming, Hardware & Software, Computer Networking and Project Management.",
  },
  {
    id: "edu-hs",
    page: "Experience",
    title: "Education: Nagpayong High School",
    tags: "high school senior stem honors award research paper sci-tok achievements graduated",
    text: "Nagpayong High School, 2022 to 2025. Graduated with High Honors. Placed 3rd in the Sci-Tok Experiment in Grade 11. Earned Best STEM Research Paper in Grade 12.",
  },

  // ---------- Experience ----------
  {
    id: "exp-aws-creative",
    page: "Experience",
    title: "Creative Officer, AWS Org JRU Chapter",
    tags: "work job experience aws creative officer organization student builder group sbg design publication",
    text: "Creative Officer at AWS Org JRU Chapter, 2026 to present. Designs publication materials and visual content for chapter projects and activities, collaborates with members to communicate ideas through engaging visuals, and manages creative tasks to meet deadlines and adapt designs based on feedback.",
  },
  {
    id: "exp-editor",
    page: "Experience",
    title: "Photo Editor / Video Content Editor",
    tags: "work job experience video editing photo premiere creative media editor",
    text: "Photo Editor / Video Content Editor in creative media, 2025 to present. Applies composition, visual design and color-adjustment principles to photo and video edits, and organizes and refines digital assets into clean, professional outputs.",
  },
  {
    id: "exp-barista",
    page: "Experience",
    title: "Barista, Frosh Tea",
    tags: "work job experience barista customer service part-time first job",
    text: "Barista at Frosh Tea, December 2023. Provided friendly, efficient customer service and prepared beverages in an organized work area, developing communication and time management skills.",
  },

  // ---------- Projects ----------
  {
    id: "proj-signwise",
    page: "Projects",
    title: "SignWise: American Sign Language",
    tags: "project asl sign language learning app web",
    text: "SignWise is a project to learn American Sign Language. Live: https://signwiseasl.vercel.app/",
  },
  {
    id: "proj-login",
    page: "Projects",
    title: "Simple Log-In System",
    tags: "project login authentication security group",
    text: "Simple Log-In System is a group project to create a reliable security system. Live: https://simple-login-system-grupo.vercel.app/",
  },
  {
    id: "proj-mockup",
    page: "Projects",
    title: "Log-In Mock Up",
    tags: "project design prototype ui ux figma interface",
    text: "Log-In Mock Up is a design prototype for a log-in interface (view the mockup image on the Projects page).",
  },
  {
    id: "proj-aws-reviewer",
    page: "Projects",
    title: "AWS-AI/ML Reviewer",
    tags: "project aws aiml machine learning exam reviewer certification mla-c01 mla c01 aif",
    text: "AWS-AI/ML Reviewer is a reviewer website for people taking the exams listed on the site as MLC-CO1 or ME1-CO2 (beta). Live: https://aws-reviewer-aimlengr.vercel.app/",
  },
  {
    id: "proj-underemployment",
    page: "Projects",
    title: "PH Underemployment Dashboard",
    tags: "project data dashboard visualization analytics philippines underemployment datasets",
    text: "PH Underemployment Dashboard visualizes underemployment datasets in the Philippines. Live: https://ph-underemployment-dashboard.vercel.app/",
  },
  {
    id: "proj-tarantech",
    page: "Projects",
    title: "TaranTech E-Portfolio",
    tags: "project eportfolio portfolio website tarantech",
    text: "TaranTech E-Portfolio is an e-portfolio website showcasing TaranTech. Live: https://tarantech-eportfolio.vercel.app/",
  },
  {
    id: "proj-pubmat",
    page: "Projects",
    title: "Pubmat (publication material) designs",
    tags: "design graphic social media poster pubmat aws sbg recruitment fireside general assembly creative",
    text: "Xy designs pubmats for AWS - SBG JRU, including event promotions and community features: a tribute to the organization's president, a concept-driven social design about curiosity, a General Assembly Fireside Chat poster, an AWS Student Builder Group Contributors feature, and a recruitment pubmat for AWS SBG JRU.",
  },

  // ---------- Certifications ----------
  {
    id: "cert-comptia",
    page: "Certifications",
    title: "CompTIA IT Fundamentals+",
    tags: "certification certificate credential comptia itf fundamentals earned badge credly",
    text: "CompTIA IT Fundamentals+ (CompTIA), earned. Foundational IT knowledge and troubleshooting concepts. Badge: https://www.credly.com/badges/f92e6647-a29a-40d0-9f2a-55f894224d12/public_url",
  },
  {
    id: "cert-cisco-js",
    page: "Certifications",
    title: "Cisco JavaScript Essentials 1 & 2",
    tags: "certification certificate credential cisco javascript js networking academy earned badge credly",
    text: "Cisco JavaScript Essentials 1 and 2 (Cisco Networking Academy), completed and earned: JavaScript programming fundamentals and core concepts. Essentials 1: https://www.credly.com/badges/f4f58d47-2a54-4cfd-9221-048608479b4d/public_url. Essentials 2: https://www.credly.com/badges/0c94dc1c-8d58-4c70-aec1-7ca91b036e8e/public_url",
  },
  {
    id: "cert-databases",
    page: "Certifications",
    title: "IT Specialist - Databases",
    tags: "certification certificate credential certiport database sql earned badge credly",
    text: "IT Specialist - Databases (Certiport), earned: database concepts, data management and SQL fundamentals. Badge: https://www.credly.com/badges/284ae140-9ca6-4365-ac18-77f81311a9af/public_url",
  },
  {
    id: "cert-huawei",
    page: "Certifications",
    title: "HCIA-Datacom V1.0 course completion (Huawei)",
    tags: "course completion huawei ict academy datacom networking networks certificate 2026",
    text: "HCIA-Datacom V1.0 Course (Huawei ICT Academy), course completion certificate issued 2026-10-11, covering Computer Networks Experiment. Certificate and completion images are on the Certifications page.",
  },

  // ---------- Blog ----------
  {
    id: "blog-curious",
    page: "Blog",
    title: "Blog: The curious young Xy",
    tags: "blog story high school growth effort teamwork technology editing programming journey",
    text: "In high school Xy discovered more about himself: growing interest in technology, working with computers, editing videos and photos, and eventually programming. He had achievements and failures, and learned that results depend on the effort he gives and that teamwork (with different priorities and responsibility levels) taught him patience and responsibility.",
  },
  {
    id: "blog-next-step",
    page: "Blog",
    title: "Blog: Doing the next step",
    tags: "blog college career path future goals interests web development software ui ux devops ai",
    text: "In college, studying IT introduced him to programming, databases and web development. He is interested in web development, software development, UI/UX design, and areas like DevOps and artificial intelligence. He is still figuring out where he wants to end up and believes it's okay not to have everything figured out.",
  },
  {
    id: "blog-failing",
    page: "Blog",
    title: "Blog: Failing is learning (Java certification)",
    tags: "blog failure failed java certification specialist pearson vue exam setback lesson",
    text: "Xy failed the Java Certification Specialist exam through Pearson VUE and was disappointed, but realized one failure is only a step in a longer journey: being a student isn't about getting everything right on the first try, and failure shows where to grow.",
  },
];
