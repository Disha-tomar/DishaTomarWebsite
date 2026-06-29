const { projects, experience, skills, contact, personal } = require("./portfolio");

const toolDefinitions = [
  {
    type: "function",
    function: {
      name: "getProjects",
      description: "Get the list of Disha's software projects with titles, links, descriptions, and technologies used.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getExperience",
      description: "Get a summary of Disha's professional experience: current role, company, location, and work history.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getSkills",
      description: "Get Disha's technical skills, grouped by area (frontend, backend/AI, devops).",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getContact",
      description: "Get Disha's contact details: email, phone, location, LinkedIn, and GitHub.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "getPersonal",
      description: "Get personal details about Disha beyond her work: her background and career story, education, fun facts, hobbies, and interests.",
      parameters: { type: "object", properties: {} },
    },
  },
];

const handlers = {
  getProjects: () => projects,
  getExperience: () => experience,
  getSkills: () => skills,
  getContact: () => contact,
  getPersonal: () => personal,
};

function executeTool(name) {
  const handler = handlers[name];
  if (!handler) {
    throw new Error(`Unknown tool: ${name}`);
  }
  return JSON.stringify(handler());
}

module.exports = { toolDefinitions, executeTool };
