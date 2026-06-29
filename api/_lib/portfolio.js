// Single source of truth for everything the assistant knows about Disha.
// Extend these arrays/objects as more data is provided. The tools in tools.js
// hand these straight to the model, so anything added here is immediately usable.

const projects = [
  {
    title: "AI Resume Builder (FitMyResume)",
    link: "https://resume-builder-v2-six.vercel.app",
    description:
      "A full stack web app that tailors your resume to any job, without lying on it. From a single master profile it matches your real experience to a job description, suggests honest improvements, flags gaps rather than fabricating them, and exports an ATS friendly one page PDF in seconds. (Disha's own resume was built with this app.)",
    technologies: ["React", "TypeScript", "Supabase", "Gemini"],
  },
  {
    title: "Crypto Wallet DApp",
    link: "https://crypto-wallet-d-app.vercel.app/",
    description:
      "A React-based decentralized application (dApp) that lets users connect their Ethereum wallet via MetaMask and interact with the blockchain from the browser, including checking the balance of any ERC20 token by contract address with real-time validity feedback.",
    technologies: ["React", "TypeScript", "Tailwind", "Ethereum"],
  },
  {
    title: "My Diary",
    link: "https://my-diary-phi.vercel.app/",
    description:
      "A CRUD application using React and Redux Toolkit for app-wide state. Users can add, edit, and delete diary entries, persisted to the browser's local storage via redux-persist. Styled with CSS Modules.",
    technologies: ["React", "Redux", "Sass"],
  },
  {
    title: "Jokes App",
    link: "https://disha-tomar.github.io/jokes/",
    description:
      "A simple web app in vanilla JavaScript that displays random jokes fetched from the JokeAPI, with an option to filter/blacklist categories.",
    technologies: ["JavaScript", "HTML5", "CSS"],
  },
  {
    title: "Natours - Tour booking Web App",
    link: "https://natours-ten-tan.vercel.app/",
    description:
      "A demo tour-booking web app built during an advanced CSS course, using Sass with variables, mixins, responsive design, media queries, and graceful degradation via @supports.",
    technologies: ["CSS", "HTML5"],
  },
];

const experience = {
  summary:
    "AI Engineer and Full Stack Developer with 4+ years building scalable web applications with React, Angular, Next.js, Node.js, and FastAPI. Comfortable owning delivery end to end — architecture, CI/CD on AWS, database, API, and polished user-centric interfaces — and ships production AI-powered features (not just AI-assisted coding) using the Anthropic Claude API, Claude Code, and Cursor daily.",
  current: {
    role: "Senior Software Engineer",
    company: "Alucor Limited",
    location: "Dubai, UAE",
  },
  history: [
    {
      role: "Senior Software Engineer",
      company: "Alucor Limited",
      location: "Dubai, UAE",
      period: "Oct 2025 — Present",
      highlights: [
        "Sole engineer designing, building, and deploying a production Document Management System (DMS) for large-scale construction documentation — full ownership across frontend, backend, data, AI features, and infrastructure.",
        "Shipped a full-stack DMS with Next.js 14 (App Router, React Server Components, TypeScript) and FastAPI: structured document numbering, revision/version control, and multi-step workflow-driven lifecycle management that replaced error-prone Excel processes.",
        "Built a feature-modular React frontend with React Query, react-hook-form + Zod for type-safe forms, and a shadcn/ui + Tailwind design system, delivering responsive, accessible (ARIA/WCAG) interfaces.",
        "Designed a layered FastAPI backend (router, service, CRUD, SQLModel) over PostgreSQL with Alembic migrations, strong referential integrity, and a pluggable storage abstraction (Local, S3, Azure Blob, Alfresco ECM) with versioned files, metadata indexing, and full audit logging.",
        "Engineered an AI document-intelligence pipeline: background workers convert PDFs/Word docs to Markdown, fall back to local OCR (RapidOCR/ONNX) for scanned files at zero cloud cost, and generate summaries via the Anthropic Claude API — making thousands of legacy documents searchable.",
        "Implemented enterprise auth with Keycloak (RBAC + ABAC for fine-grained, context-aware access control), containerized the multi-service stack with Docker/Docker Compose, and built CI/CD with AWS (EC2, App Runner) and CloudWatch monitoring.",
      ],
    },
    {
      role: "Software Engineer II",
      company: "Korn Ferry (Korn Ferry Digital)",
      location: "Remote — India",
      period: "Jun 2023 — Sep 2025",
      highlights: [
        "Led frontend development for a micro-frontend assessment platform across both React and Angular (16+) applications.",
        "Integrated an AI-powered proctoring service into the React/TypeScript frontend, enabling seamless exam monitoring and cutting unauthorized activity by 30%.",
        "Optimized a modular Angular + TypeScript build to allow live updates from shared libraries via Webpack and path mapping, reducing rebuild time by 94%.",
        "Improved React accessibility with semantic HTML and ARIA, raising Lighthouse accessibility scores by 25% and meeting WCAG guidelines.",
        "Built complex, math-driven graph components with Handlebars templates in collaboration with the data science team, turning statistical models into interactive visualizations.",
        "Maintained comprehensive Jest + React Testing Library suites (80%+ coverage); optimized AWS Lambda (Node upgrade) for 30% smaller bundles and 25% faster load; drove code reviews and technical interviews.",
      ],
    },
    {
      role: "Senior Software Developer",
      company: "Unvoid Tech Studio Pvt Ltd",
      location: "Remote — India",
      period: "Mar 2023 — May 2023",
      highlights: [
        "Led frontend for an accounting platform (React, Redux, Tailwind, Material UI), partnering with backend on REST API integration.",
        "Built and deployed the company marketing website with Next.js and GSAP.",
        "Mentored the frontend team on modern frameworks, code quality, and best practices.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Wiztric Technologies Pvt Ltd",
      location: "Bengaluru — India",
      period: "May 2022 — Feb 2023",
      highlights: [
        "Single-handedly built and deployed the MVP of a desktop SCADA system interface (React, Material UI, Python/Flask, HTML5/CSS3, Electron), reducing manual intervention in electrical substation automation by 40%.",
        "Implemented real-time data visualization with WebSocket, Ngx-charts, and Plotly.js.",
      ],
    },
    {
      role: "Assistant Town Planner",
      company: "Directorate of Local Bodies",
      location: "Jaipur, India",
      period: "May 2017 — May 2022",
      highlights: [
        "A non-technical role as an architect and town planner. Built strong problem-solving skills here before transitioning into tech to pursue a passion for software development.",
      ],
    },
  ],
  education: [
    {
      degree: "Master's Degree",
      school: "Indian Institute of Technology (IIT) Kharagpur, India",
      gpa: "8.18",
      period: "Jul 2015 — May 2017",
    },
    {
      degree: "Bachelor's Degree",
      school: "Malaviya National Institute of Technology (MNIT) Jaipur, India",
      gpa: "8.16",
      period: "Jul 2009 — May 2014",
    },
  ],
};

const skills = [
  {
    group: "Frontend & UI",
    items: [
      "JavaScript (ES6+)", "TypeScript", "React", "Angular (16+)", "Next.js",
      "React Server Components", "Redux", "HTML5 & CSS3", "Responsive Design",
      "Modern CSS Architecture", "Tailwind", "Material UI", "D3.js",
      "Handlebars (HBS)", "Accessibility (ARIA / WCAG)", "Electron",
    ],
  },
  {
    group: "Backend, Data & AI",
    items: [
      "Node.js", "Python", "FastAPI", "PostgreSQL", "SQLModel / SQLAlchemy",
      "MongoDB", "REST APIs", "Web security (CORS, CSP, JWT)", "RBAC / ABAC",
      "Secure coding practices", "Kafka",
    ],
  },
  {
    group: "AI / ML",
    items: [
      "LLM integration (Anthropic Claude API, Gemini)", "Production AI features",
      "OCR (RapidOCR / ONNX)", "Document parsing", "Claude Code", "Cursor",
    ],
  },
  {
    group: "Testing",
    items: ["Jest", "React Testing Library"],
  },
  {
    group: "DevOps & Tooling",
    items: [
      "AWS (EC2, App Runner, Lambda, CloudWatch)", "Docker & Docker Compose",
      "CI/CD", "Git", "GitHub", "Webpack", "NPM", "Jira", "Keycloak",
    ],
  },
  {
    group: "CS Fundamentals",
    items: ["Data Structures & Algorithms", "Browser internals (event loop, rendering, memory)"],
  },
];

const contact = {
  name: "Disha Tomar",
  title: "Software Engineer (Full-Stack / AI)",
  email: "dishatomariitkgp@gmail.com",
  phone: "+971 504127637",
  location: "Dubai, UAE",
  linkedin: "https://www.linkedin.com/in/disha-tomar-714541100/",
  github: "https://github.com/Disha-tomar",
};

const personal = {
  background:
    "Before software, Disha spent about five years as an architect and Assistant Town Planner in Jaipur, India, then transitioned into tech to pursue her passion for building software. She holds a Master's from IIT Kharagpur (GPA 8.18) and a Bachelor's from MNIT Jaipur (GPA 8.16), and is now based in Dubai, UAE.",
  funFacts: [
    "Pivoted careers from architecture / town planning into software engineering.",
    "IIT Kharagpur alum.",
    "Built the very resume that describes her using her own AI Resume Builder app.",
  ],
  // TODO (Disha): add your hobbies and interests here, e.g. "Hiking", "Sketching".
  hobbies: [],
  interests: [],
};

module.exports = { projects, experience, skills, contact, personal };
