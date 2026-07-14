import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'data', 'jobs.json');
const PORT = process.env.PORT || 3001;

const SEED = [
  {
    id: '1', title: 'Machine Learning Engineer', department: 'Engineering', location: 'Remote',
    type: 'full-time', salaryRange: '$150k - $220k',
    description: 'Design and implement ML models that power our core AI platform. You will work closely with the research team to productionize state-of-the-art models.',
    requirements: ['5+ years of experience in machine learning', 'Strong proficiency in Python, PyTorch or TensorFlow', 'Experience with large-scale distributed systems', 'Published research in ML is a plus', 'MS or PhD in Computer Science or related field'],
    responsibilities: ['Design, train, and deploy ML models at scale', 'Optimize model performance and inference latency', 'Collaborate with product and research teams', 'Build and maintain ML pipelines', 'Mentor junior engineers'],
    howToApply: 'Send your resume and a brief description of your most impactful ML project to careers@loseyourip.com with subject line "ML Engineer Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-01T10:00:00Z', updatedAt: '2026-07-01T10:00:00Z'
  },
  {
    id: '2', title: 'Senior NLP Researcher', department: 'Research', location: 'San Francisco, CA',
    type: 'full-time', salaryRange: '$170k - $250k',
    description: 'Push the boundaries of natural language processing. Lead research initiatives that directly shape our product roadmap.',
    requirements: ['PhD in NLP, Computational Linguistics, or related field', '3+ years post-PhD research experience', 'Top-tier publications (ACL, EMNLP, NeurIPS, ICML)', 'Deep expertise in transformer architectures', 'Experience with LLM fine-tuning and alignment'],
    responsibilities: ['Lead NLP research projects from conception to deployment', 'Publish papers at top-tier venues', 'Develop novel approaches to language understanding', 'Collaborate with engineering to productionize research', 'Represent Loseyourip at conferences and workshops'],
    howToApply: 'Apply at careers@loseyourip.com with your CV, publication list, and a research statement. Subject: "NLP Researcher Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-02T10:00:00Z', updatedAt: '2026-07-02T10:00:00Z'
  },
  {
    id: '3', title: 'AI Product Manager', department: 'Product', location: 'New York, NY',
    type: 'full-time', salaryRange: '$140k - $200k',
    description: 'Bridge the gap between cutting-edge AI research and real-world products. Define the roadmap for our flagship AI tools.',
    requirements: ['5+ years of product management experience', 'Experience with AI/ML products', 'Strong technical background or CS degree', 'Excellent communication and stakeholder management', 'Data-driven decision making skills'],
    responsibilities: ['Define product vision and strategy for AI tools', 'Work with engineering and research teams', 'Conduct user research and analyze product metrics', 'Prioritize features based on impact and feasibility', 'Drive go-to-market strategy for new features'],
    howToApply: 'Email careers@loseyourip.com with your resume and a brief product teardown of an AI product you admire. Subject: "PM Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-03T10:00:00Z', updatedAt: '2026-07-03T10:00:00Z'
  },
  {
    id: '4', title: 'Data Engineer', department: 'Engineering', location: 'Remote',
    type: 'full-time', salaryRange: '$130k - $190k',
    description: 'Build and maintain the data infrastructure that powers our AI models. Ensure our data pipelines are reliable, scalable, and efficient.',
    requirements: ['4+ years in data engineering', 'Expertise in Python, SQL, and Spark', 'Experience with cloud platforms (AWS/GCP)', 'Knowledge of data warehousing solutions', 'Familiarity with ML data pipelines'],
    responsibilities: ['Design and maintain ETL/ELT pipelines', 'Ensure data quality and reliability', 'Optimize data storage and query performance', 'Build data monitoring and alerting systems', 'Collaborate with ML engineers on feature stores'],
    howToApply: 'Send your resume and a GitHub profile to careers@loseyourip.com. Subject: "Data Engineer Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-04T10:00:00Z', updatedAt: '2026-07-04T10:00:00Z'
  },
  {
    id: '5', title: 'Frontend Engineer', department: 'Engineering', location: 'Remote',
    type: 'full-time', salaryRange: '$120k - $180k',
    description: 'Craft beautiful, performant interfaces for our AI platform. Work on the intersection of design and cutting-edge technology.',
    requirements: ['3+ years of frontend development', 'Expert in React and TypeScript', 'Experience with modern CSS and design systems', 'Understanding of web performance optimization', 'Interest in AI/ML products'],
    responsibilities: ['Build and maintain React-based web applications', 'Implement responsive, accessible UI components', 'Collaborate with designers on UX improvements', 'Optimize frontend performance', 'Contribute to the internal component library'],
    howToApply: 'Apply at careers@loseyourip.com with your portfolio or GitHub. Subject: "Frontend Engineer Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-05T10:00:00Z', updatedAt: '2026-07-05T10:00:00Z'
  },
  {
    id: '6', title: 'DevOps Engineer', department: 'Infrastructure', location: 'Austin, TX',
    type: 'full-time', salaryRange: '$140k - $200k',
    description: 'Scale our AI infrastructure to serve millions. Build the backbone that keeps our models running in production.',
    requirements: ['4+ years in DevOps/SRE roles', 'Expertise in Kubernetes and Docker', 'Experience with CI/CD pipelines (GitHub Actions, Jenkins)', 'Strong knowledge of AWS or GCP', 'Experience with GPU cluster management is a plus'],
    responsibilities: ['Manage and optimize cloud infrastructure', 'Build and maintain CI/CD pipelines', 'Monitor system health and respond to incidents', 'Automate deployment and scaling processes', 'Improve system reliability and reduce downtime'],
    howToApply: 'Email careers@loseyourip.com with your resume. Subject: "DevOps Engineer Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-06T10:00:00Z', updatedAt: '2026-07-06T10:00:00Z'
  },
  {
    id: '7', title: 'AI Ethics Intern', department: 'Research', location: 'San Francisco, CA',
    type: 'internship', salaryRange: '$40/hr',
    description: 'Help us ensure our AI systems are fair, transparent, and ethical. Join our AI ethics team for a 6-month internship.',
    requirements: ['Currently pursuing a degree in Ethics, Philosophy, CS, or related field', 'Understanding of AI ethics concepts', 'Strong writing and analytical skills', 'Familiarity with responsible AI frameworks'],
    responsibilities: ['Conduct bias audits on AI models', 'Research emerging AI ethics frameworks', 'Draft internal guidelines and documentation', 'Present findings to the team', 'Support compliance with AI regulations'],
    howToApply: 'Send your resume and a short essay on AI ethics to careers@loseyourip.com. Subject: "AI Ethics Intern Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-07T10:00:00Z', updatedAt: '2026-07-07T10:00:00Z'
  },
  {
    id: '8', title: 'Technical Writer', department: 'Content', location: 'Remote',
    type: 'contract', salaryRange: '$90k - $130k',
    description: 'Create world-class documentation for our AI platform. Make complex technical concepts accessible to developers worldwide.',
    requirements: ['3+ years of technical writing experience', 'Experience writing developer documentation', 'Ability to understand and explain complex technical concepts', 'Familiarity with AI/ML concepts', 'Proficiency with docs-as-code workflows'],
    responsibilities: ['Write and maintain API documentation', 'Create tutorials and getting-started guides', 'Work with engineers to document new features', 'Improve documentation structure and discoverability', 'Gather feedback from developer community'],
    howToApply: 'Email careers@loseyourip.com with your writing samples. Subject: "Technical Writer Application".',
    applyLink: '', status: 'open', createdAt: '2026-07-08T10:00:00Z', updatedAt: '2026-07-08T10:00:00Z'
  }
];

function loadJobs() {
  if (!existsSync(DATA_FILE)) {
    writeFileSync(DATA_FILE, JSON.stringify(SEED, null, 2));
    return SEED;
  }
  return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
}

function saveJobs(jobs) {
  writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => resolve(body ? JSON.parse(body) : {}));
  });
}

const server = createServer(async (req, res) => {
  const { method, url } = req;
  const path = url.split('?')[0];

  if (method === 'OPTIONS') return sendJson(res, 204, null);

  if (path === '/api/jobs' && method === 'GET') {
    return sendJson(res, 200, loadJobs());
  }

  if (path === '/api/jobs' && method === 'POST') {
    const data = await readBody(req);
    const jobs = loadJobs();
    const now = new Date().toISOString();
    const job = {
      ...data,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
      createdAt: now,
      updatedAt: now,
    };
    jobs.unshift(job);
    saveJobs(jobs);
    return sendJson(res, 201, job);
  }

  const putMatch = path.match(/^\/api\/jobs\/([^/]+)$/);
  if (putMatch && method === 'PUT') {
    const id = putMatch[1];
    const updates = await readBody(req);
    const jobs = loadJobs();
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx === -1) return sendJson(res, 404, { error: 'Not found' });
    jobs[idx] = { ...jobs[idx], ...updates, updatedAt: new Date().toISOString() };
    saveJobs(jobs);
    return sendJson(res, 200, jobs[idx]);
  }

  const delMatch = path.match(/^\/api\/jobs\/([^/]+)$/);
  if (delMatch && method === 'DELETE') {
    const id = delMatch[1];
    const jobs = loadJobs();
    const filtered = jobs.filter((j) => j.id !== id);
    if (filtered.length === jobs.length) return sendJson(res, 404, { error: 'Not found' });
    saveJobs(filtered);
    return sendJson(res, 200, { ok: true });
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
