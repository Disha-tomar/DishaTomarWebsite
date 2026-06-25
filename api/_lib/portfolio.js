// Single source of truth for everything the assistant knows about Disha.
// Extend these arrays/objects as more data is provided.

const projects = [
  {
    title: "AI Resume Builder (FitMyResume)",
    link: "https://resume-builder-v2-six.vercel.app",
    description:
      "A full stack web app that tailors your resume to any job, without lying on it. From a single master profile it matches your real experience to a job description, suggests honest improvements, flags gaps rather than fabricating them, and exports an ATS friendly one page PDF in seconds.",
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
    "AI Engineer and Full Stack Developer with 4+ years turning vague ideas and messy spreadsheets into software people enjoy using. Started in frontend, then moved deep into backend and AI, and now owns the full stack: architecture, infrastructure, database, API, and UI. Builds with AI (Claude Code, Cursor, the Claude API) as much as building AI.",
  current: {
    role: "Senior Software Engineer",
    company: "Alucor",
    location: "Dubai, UAE",
  },
  history: [
    "Senior Software Engineer at Alucor (Dubai) — owns the full delivery pipeline: architecture, infrastructure, database, API, and frontend.",
    "Earlier frontend-focused roles, including a few years at Korn Ferry, before expanding into backend and AI.",
  ],
};

const skills = [
  {
    group: "Frontend & UI",
    items: [
      "ReactJs", "Angular", "Redux", "Nextjs", "JavaScript", "TypeScript",
      "HTML", "CSS", "Sass", "Tailwind", "Material UI", "D3.js", "Handlebars", "Electron",
    ],
  },
  {
    group: "Backend, Data & AI",
    items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "MongoDb", "Kafka", "Claude / LLM", "Cursor"],
  },
  {
    group: "DevOps & Tooling",
    items: ["AWS", "Docker", "Git", "GitHub", "Webpack", "NPM", "Postman"],
  },
];

const contact = {
  name: "Disha Tomar",
  email: "dishatomariitkgp@gmail.com",
  location: "Dubai, UAE",
  linkedin: "https://www.linkedin.com/in/disha-tomar-714541100/",
  github: "https://github.com/Disha-tomar",
};

module.exports = { projects, experience, skills, contact };
