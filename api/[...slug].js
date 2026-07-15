let jobs = [
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
  },
  {
    id: '9', title: 'AI Dataset for Local Language Curator', department: 'Research', location: 'Remote',
    type: 'part-time, on-schedule', salaryRange: '$50 - $100 / dataset (1500 words and above)',
    description: 'We are recruiting 8,000 individuals for a massive project to help Artificial Intelligence truly understand local languages. Most AI models today struggle with the nuances of dialects, correct pronunciation, and local humor. Our mission is to build a high-quality knowledge base that teaches AI how to communicate naturally including how translate and transcribe across various fields. As a contributor, you will help bridge the gap between technology and local culture. No prior experience is required; we provide all the necessary training to teach you how to gather and format data effectively. This is your chance to be part of a historic movement to humanize AI while earning competitive pay for your local expertise.',
    responsibilities: ['Data Gathering: Collect local vocabulary, proverbs, and industry-specific terms (e.g., healthcare, farming, or tech)', 'Phonetics & Humor: Document local pronunciations, accents, and the nuances of regional humor/sarcasm', 'AI Formatting: Organize raw language into structured data sets that AI models can process', 'Mandatory Training: Join our WhatsApp Training Channel for step-by-step guides and live tutorials'],
    requirements: ['Native Fluency: A "street-level" mastery of your local language, including formal and informal dialects', 'Cultural Insight: A strong understanding of local jokes, social norms, and cultural references', 'Willingness to Learn: You must be able to strictly follow our formatting guidelines after completing the training', 'Attention to Detail: Precision in spelling and pronunciation documentation is critical', 'Basic Tech Skills: Comfort with typing, saving files, and uploading documents'],
    howToApply: 'Skip the resume! Join our Official Training Section on our WhatsApp Channel to start learning and earning immediately.https://whatsapp.com/channel/0029VbDKf3G9Gv7S3Dm9Cv0m ',
    applyLink: 'https://whatsapp.com/channel/0029VbDKf3G9Gv7S3Dm9Cv0m',
    status: 'open', createdAt: '2026-07-15T10:00:00Z', updatedAt: '2026-07-15T10:00:00Z'
  }
];

function json(res, status, data) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.status(status).json(data);
}

export default function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  const slug = req.query.slug || [];
  const id = slug.length > 1 ? slug[1] : null;

  if (!id) {
    if (req.method === 'GET') return json(res, 200, jobs);
    if (req.method === 'POST') {
      const now = new Date().toISOString();
      const job = {
        ...req.body,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
        createdAt: now,
        updatedAt: now,
      };
      jobs.unshift(job);
      return json(res, 201, job);
    }
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (req.method === 'GET') {
    const job = jobs.find((j) => j.id === id);
    if (!job) return json(res, 404, { error: 'Not found' });
    return json(res, 200, job);
  }

  if (req.method === 'PUT') {
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx === -1) return json(res, 404, { error: 'Not found' });
    jobs[idx] = { ...jobs[idx], ...req.body, updatedAt: new Date().toISOString() };
    return json(res, 200, jobs[idx]);
  }

  if (req.method === 'DELETE') {
    const idx = jobs.findIndex((j) => j.id === id);
    if (idx === -1) return json(res, 404, { error: 'Not found' });
    jobs.splice(idx, 1);
    return json(res, 200, { ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
