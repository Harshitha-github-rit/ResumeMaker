import { ResumeData, TemplateId } from '../types';

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  tagline: string;
  category: 'Popular' | 'Executive' | 'Creative' | 'Modern';
  recommendedFor: string;
  badge?: string;
  colorScheme: string;
}

export const TEMPLATES_LIST: TemplateMeta[] = [
  {
    id: 'modern',
    name: 'Modern',
    tagline: 'Sleek two-column layout with sidebar and clean visual hierarchy',
    category: 'Popular',
    recommendedFor: 'Software Engineers, Tech, Product Managers',
    badge: 'Most Popular',
    colorScheme: '#2563eb'
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Standard dual-column format optimized for 99% ATS pass rate',
    category: 'Popular',
    recommendedFor: 'Corporate, Finance, Operations, Healthcare',
    badge: 'ATS Recommended',
    colorScheme: '#1e293b'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Ultra-clean layout with refined typography and generous whitespace',
    category: 'Modern',
    recommendedFor: 'Designers, Developers, Writers, Architects',
    badge: 'Clean & Sharp',
    colorScheme: '#0f172a'
  },
  {
    id: 'executive',
    name: 'Executive',
    tagline: 'Commanding header with structured leadership & achievements section',
    category: 'Executive',
    recommendedFor: 'Directors, VPs, Senior Consultants, C-Suite',
    badge: 'Leadership',
    colorScheme: '#312e81'
  },
  {
    id: 'creative',
    name: 'Creative',
    tagline: 'Distinctive styling, timeline accents, and vibrant skill chips',
    category: 'Creative',
    recommendedFor: 'UX/UI Designers, Marketers, Art Directors',
    badge: 'Standout Style',
    colorScheme: '#7c3aed'
  },
  {
    id: 'classic',
    name: 'Classic',
    tagline: 'Timeless single-column layout with elegant serif accents',
    category: 'Popular',
    recommendedFor: 'Lawyers, Academics, Government, Banking',
    badge: 'Traditional',
    colorScheme: '#1e3a8a'
  }
];

export const DEFAULT_RESUME: ResumeData = {
  id: 'resume-demo-1',
  title: 'Alex Rivera — Senior Software Engineer',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Alex Rivera',
    professionalTitle: 'Senior Full Stack Software Engineer',
    email: 'alex.rivera@example.com',
    phone: '+1 (555) 382-9012',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexrivera-dev',
    portfolio: 'alexrivera.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  summary: 'Results-driven Senior Full Stack Engineer with 7+ years of experience designing and scaling distributed web applications and cloud architectures. Proven track record of reducing latency by 42% and driving engineering velocity for hyper-growth SaaS platforms serving 2M+ active users.',
  experience: [
    {
      id: 'exp-1',
      jobTitle: 'Lead Full Stack Engineer',
      company: 'Vanguard Cloud Technologies',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      isCurrent: true,
      description: '• Architected and migrated monolithic core services to event-driven microservices using React, TypeScript, Node.js, and Kafka, handling 50M+ daily events.\n• Spearheaded the developer tooling initiative, reducing CI/CD build deployment cycle times from 28 minutes to 4.5 minutes.\n• Mentored a team of 9 software engineers through pair programming, structured architectural RFCs, and code review standards.'
    },
    {
      id: 'exp-2',
      jobTitle: 'Senior Software Engineer',
      company: 'Aura Analytics Systems',
      location: 'Austin, TX',
      startDate: '2019-06',
      endDate: '2022-02',
      isCurrent: false,
      description: '• Engineered high-performance real-time data visualization dashboards processing 100k data points/sec with WebSockets and WebGL.\n• Optimized database query execution plans in PostgreSQL and Redis cache layers, decreasing p99 query latency by 45%.\n• Collaborated cross-functionally with Product and UX teams to launch 4 flagship enterprise analytics modules.'
    },
    {
      id: 'exp-3',
      jobTitle: 'Software Engineer',
      company: 'Nexus Digital Labs',
      location: 'Seattle, WA',
      startDate: '2017-08',
      endDate: '2019-05',
      isCurrent: false,
      description: '• Developed responsive client-facing web applications using React, Redux, and modern RESTful APIs.\n• Implemented automated end-to-end testing with Cypress and Jest, improving overall code coverage from 55% to 92%.\n• Resolved 120+ mission-critical production bugs across billing and authentication subsystems.'
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2013-09',
      endDate: '2017-05',
      gpaOrHonors: 'Summa Cum Laude (GPA 3.92/4.0)',
      description: 'Coursework in Distributed Systems, Algorithms, Cloud Computing, Database Internals, and Computer Security.'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'TypeScript / JavaScript', level: 'Expert', category: 'Languages' },
    { id: 'sk-2', name: 'React & Next.js', level: 'Expert', category: 'Frontend' },
    { id: 'sk-3', name: 'Node.js & Express', level: 'Expert', category: 'Backend' },
    { id: 'sk-4', name: 'PostgreSQL & Redis', level: 'Advanced', category: 'Databases' },
    { id: 'sk-5', name: 'AWS & Docker / Kubernetes', level: 'Advanced', category: 'DevOps & Cloud' },
    { id: 'sk-6', name: 'GraphQL & REST APIs', level: 'Expert', category: 'Architecture' },
    { id: 'sk-7', name: 'System Design & Distributed Systems', level: 'Advanced', category: 'Engineering' },
    { id: 'sk-8', name: 'Tailwind CSS & UI/UX', level: 'Advanced', category: 'Frontend' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'PulseFlow — Distributed Workflow Orchestrator',
      role: 'Creator & Maintainer',
      link: 'github.com/alexrivera/pulseflow',
      technologies: 'Go, TypeScript, Redis, gRPC',
      startDate: '2023',
      endDate: 'Present',
      description: 'Open-source distributed task orchestrator with over 2,400 GitHub stars. Provides zero-dependency job scheduling and fault-tolerant event pipelines.'
    },
    {
      id: 'proj-2',
      name: 'OmniMetrics — Developer Performance Analyzer',
      role: 'Lead Developer',
      link: 'omni-metrics.io',
      technologies: 'React, Node.js, ClickHouse, Docker',
      startDate: '2021',
      endDate: '2022',
      description: 'Built a lightweight telemetry ingestion engine tracking developer workflow bottlenecks and DORA metrics for 15+ early-stage startups.'
    }
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      issueDate: '2023-08',
      credentialUrl: 'aws.amazon.com/verify/10928374'
    },
    {
      id: 'cert-2',
      name: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'Linux Foundation / CNCF',
      issueDate: '2022-11'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Fluent' },
    { id: 'lang-3', name: 'German', proficiency: 'Conversational' }
  ],
  achievements: [
    {
      id: 'ach-1',
      title: 'Top Innovation Award 2023',
      organization: 'Vanguard Cloud',
      year: '2023',
      description: 'Recognized company-wide for creating the automated latency debugger that resolved $1.2M in annual downtime.'
    },
    {
      id: 'ach-2',
      title: '1st Place Winner — Silicon Valley Hackathon',
      organization: 'SV Tech Consortium',
      year: '2021',
      description: 'Built a collaborative peer-to-peer code review terminal in 36 hours among 200 competing teams.'
    }
  ],
  hobbies: ['Open Source Contributing', 'Long-Distance Trail Running', 'Landscape Photography', 'Mechanical Keyboards'],
  customization: {
    template: 'modern',
    accentColor: '#2563eb',
    fontFamily: 'font-sans',
    fontSize: 'normal',
    spacing: 'normal',
    margins: 'normal',
    headingStyle: 'uppercase',
    showPhoto: true,
    activeSections: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'achievements', 'hobbies']
  }
};

export const PRODUCT_MANAGER_RESUME: ResumeData = {
  id: 'resume-demo-2',
  title: 'Elena Vance — Senior Product Manager',
  updatedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  createdAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
  personalInfo: {
    fullName: 'Elena Vance',
    professionalTitle: 'Principal Product Manager',
    email: 'elena.vance@example.com',
    phone: '+1 (555) 491-7720',
    location: 'New York, NY',
    linkedin: 'linkedin.com/in/elenavance-pm',
    portfolio: 'elenavance.co',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
  },
  summary: 'Strategic Product Leader with 8+ years guiding cross-functional teams from 0-to-1 discovery to enterprise scale. Spearheaded product expansion generating $18M in ARR, improving user retention by 28%, and driving customer-centric roadmaps across FinTech and SaaS domains.',
  experience: [
    {
      id: 'pm-1',
      jobTitle: 'Principal Product Manager',
      company: 'Apex Global Financial',
      location: 'New York, NY',
      startDate: '2021-04',
      endDate: '',
      isCurrent: true,
      description: '• Own the end-to-end vision, strategy, and execution for the flagship B2B payment gateway used by 45,000+ commercial merchants.\n• Increased checkout conversion rates by 19.4% through iterative multivariate A/B testing and biometric auth integration.\n• Lead 3 squad leads, 18 engineers, and 4 product designers in quarterly OKR planning and continuous discovery.'
    },
    {
      id: 'pm-2',
      jobTitle: 'Senior Product Manager',
      company: 'Luminary Commerce',
      location: 'Boston, MA',
      startDate: '2018-02',
      endDate: '2021-03',
      isCurrent: false,
      description: '• Launched multi-currency automated invoicing engine, scaling adoption to 12 international territories within 9 months.\n• Reduced customer churn from 4.2% to 2.1% by implementing predictive account health diagnostics and automated customer recovery workflows.'
    }
  ],
  education: [
    {
      id: 'pm-edu-1',
      degree: 'Master of Business Administration (MBA)',
      institution: 'Columbia Business School',
      location: 'New York, NY',
      startDate: '2016-09',
      endDate: '2018-05',
      gpaOrHonors: 'Dean’s Honors List',
      description: 'Specialization in Technology Strategy & Venture Management.'
    },
    {
      id: 'pm-edu-2',
      degree: 'B.A. in Economics & Data Science',
      institution: 'Cornell University',
      location: 'Ithaca, NY',
      startDate: '2012-09',
      endDate: '2016-05',
      gpaOrHonors: 'Magna Cum Laude'
    }
  ],
  skills: [
    { id: 'pm-sk-1', name: 'Product Strategy & Vision', level: 'Expert', category: 'Strategy' },
    { id: 'pm-sk-2', name: 'A/B Testing & User Analytics (Mixpanel, Amplitude)', level: 'Expert', category: 'Analytics' },
    { id: 'pm-sk-3', name: 'Cross-Functional Team Leadership', level: 'Expert', category: 'Leadership' },
    { id: 'pm-sk-4', name: 'Agile / Scrum / OKRs', level: 'Expert', category: 'Process' },
    { id: 'pm-sk-5', name: 'SQL & Data Modeling', level: 'Advanced', category: 'Technical' },
    { id: 'pm-sk-6', name: 'User Research & Prototyping (Figma)', level: 'Advanced', category: 'Design' }
  ],
  projects: [
    {
      id: 'pm-proj-1',
      name: 'OneClick Merchant Onboarding',
      role: 'Product Lead',
      description: 'Revamped verification pipeline reducing time-to-first-transaction from 4 business days to under 12 minutes.'
    }
  ],
  certifications: [
    {
      id: 'pm-cert-1',
      name: 'Pragmatic Certified Product Master (PMC-III)',
      issuer: 'Pragmatic Institute',
      issueDate: '2021-05'
    }
  ],
  languages: [
    { id: 'pm-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'pm-lang-2', name: 'French', proficiency: 'Professional' }
  ],
  achievements: [
    {
      id: 'pm-ach-1',
      title: 'Product Excellence of the Year',
      organization: 'Apex FinTech',
      year: '2022',
      description: 'Awarded for exceptional revenue contribution from the new international billing suite.'
    }
  ],
  hobbies: ['Marathon Training', 'Chess', 'Angel Investing in EdTech'],
  customization: {
    template: 'executive',
    accentColor: '#312e81',
    fontFamily: 'font-inter',
    fontSize: 'normal',
    spacing: 'normal',
    margins: 'normal',
    headingStyle: 'bar',
    showPhoto: true,
    activeSections: ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'achievements', 'hobbies']
  }
};

export const FRESHER_RESUME: ResumeData = {
  id: 'resume-demo-fresher',
  title: 'Priya Sharma — Entry-Level Software Engineer (Fresher)',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  personalInfo: {
    fullName: 'Priya Sharma',
    professionalTitle: 'Entry-Level Software Engineer / CS Graduate',
    email: 'priya.sharma@example.com',
    phone: '+1 (555) 246-8109',
    location: 'Austin, TX',
    linkedin: 'linkedin.com/in/priya-sharma-dev',
    portfolio: 'priyasharma.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
  },
  summary: 'High-achieving Computer Science graduate (GPA 3.92/4.0) with hands-on proficiency in React, TypeScript, Python, and cloud fundamentals. Built full-stack applications serving active campus users and won 1st place in regional hackathon. Eager to leverage strong problem-solving skills and modern software engineering best practices in a fast-paced development team.',
  experience: [
    {
      id: 'fresh-exp-1',
      jobTitle: 'Software Engineering Intern',
      company: 'Catalyst Software Labs',
      location: 'Austin, TX',
      startDate: '2023-05',
      endDate: '2023-08',
      isCurrent: false,
      description: '• Developed responsive React UI components and integrated REST APIs with Node.js, improving page load speed by 25%.\n• Implemented unit tests using Jest and React Testing Library, achieving 88% test coverage for the onboarding flow.\n• Participated in agile sprint ceremonies, daily standups, and bi-weekly sprint reviews.'
    },
    {
      id: 'fresh-exp-2',
      jobTitle: 'Undergraduate Teaching Assistant (CS 101 & Data Structures)',
      company: 'University School of Computing',
      location: 'Austin, TX',
      startDate: '2022-09',
      endDate: '2023-05',
      isCurrent: false,
      description: '• Conducted weekly lab sessions and code reviews for 65+ students in Python, C++, and Object-Oriented Programming.\n• Assisted professors in grading programming assignments, debugging student code, and explaining algorithmic complexity (Big-O).'
    }
  ],
  education: [
    {
      id: 'fresh-edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'State University School of Engineering',
      location: 'Austin, TX',
      startDate: '2020-09',
      endDate: '2024-05',
      gpaOrHonors: 'Summa Cum Laude (GPA 3.92 / 4.0) • Dean\'s Honor List (All Semesters)',
      description: 'Relevant Coursework: Data Structures & Algorithms, Database Management Systems (SQL), Web Systems, Operating Systems, Machine Learning Fundamentals, Cloud Computing.'
    }
  ],
  skills: [
    { id: 'fsk-1', name: 'TypeScript / JavaScript', level: 'Advanced', category: 'Languages' },
    { id: 'fsk-2', name: 'Python & C++', level: 'Advanced', category: 'Languages' },
    { id: 'fsk-3', name: 'React & Tailwind CSS', level: 'Advanced', category: 'Frontend' },
    { id: 'fsk-4', name: 'Node.js & Express', level: 'Intermediate', category: 'Backend' },
    { id: 'fsk-5', name: 'PostgreSQL & MongoDB', level: 'Intermediate', category: 'Databases' },
    { id: 'fsk-6', name: 'Git, GitHub & Docker', level: 'Advanced', category: 'DevOps' },
    { id: 'fsk-7', name: 'Data Structures & Algorithms', level: 'Expert', category: 'Core CS' },
    { id: 'fsk-8', name: 'RESTful API Design', level: 'Advanced', category: 'Architecture' }
  ],
  projects: [
    {
      id: 'fresh-proj-1',
      name: 'UniCollab — Real-time Student Study Platform',
      role: 'Full-Stack Developer',
      link: 'github.com/priyasharma/unicollab',
      technologies: 'React, Node.js, Socket.io, Tailwind CSS, PostgreSQL',
      startDate: '2023-09',
      endDate: '2024-02',
      description: 'Built a collaborative peer study application with real-time markdown notes, chat channels, and whiteboard sharing. Adopted by 600+ university students.'
    },
    {
      id: 'fresh-proj-2',
      name: 'SmartExpense — AI Receipt Analyzer & Budget Tracker',
      role: 'Sole Developer',
      link: 'github.com/priyasharma/smartexpense',
      technologies: 'Python, FastAPI, React, Tesseract OCR, SQLite',
      startDate: '2023-01',
      endDate: '2023-04',
      description: 'Automated receipt parsing and expense categorization using OCR and machine learning heuristics. Processed 1,200+ test receipts with 96% accuracy.'
    },
    {
      id: 'fresh-proj-3',
      name: 'Algorithm Visualizer Web App',
      role: 'Creator',
      link: 'github.com/priyasharma/algo-visualizer',
      technologies: 'TypeScript, React, HTML5 Canvas',
      startDate: '2022-10',
      endDate: '2022-12',
      description: 'Interactive educational visualization of sorting algorithms (QuickSort, MergeSort) and pathfinding algorithms (Dijkstra, A*).'
    }
  ],
  certifications: [
    {
      id: 'fresh-cert-1',
      name: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      issueDate: '2023-11',
      credentialUrl: 'aws.amazon.com/verification'
    },
    {
      id: 'fresh-cert-2',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera / Meta',
      issueDate: '2023-06'
    },
    {
      id: 'fresh-cert-3',
      name: 'HackerRank Problem Solving (Gold Badge - 5 Stars)',
      issuer: 'HackerRank',
      issueDate: '2023-02'
    }
  ],
  languages: [
    { id: 'fresh-lang-1', name: 'English', proficiency: 'Native' },
    { id: 'fresh-lang-2', name: 'Spanish', proficiency: 'Professional' },
    { id: 'fresh-lang-3', name: 'Hindi', proficiency: 'Fluent' }
  ],
  achievements: [
    {
      id: 'fresh-ach-1',
      title: '1st Place Winner — HackAustin 2023',
      organization: 'Austin Tech Collegiate League',
      year: '2023',
      description: 'Built a crowd-sourced campus emergency assistance app in 24 hours among 85 university teams.'
    },
    {
      id: 'fresh-ach-2',
      title: 'Academic Excellence & Merit Scholarship',
      organization: 'State University Foundation',
      year: '2020-2024',
      description: 'Awarded 4-year tuition merit scholarship for maintaining top 2% academic rank in the department.'
    },
    {
      id: 'fresh-ach-3',
      title: 'LeetCode 500+ Questions Solved',
      organization: 'LeetCode',
      year: '2023',
      description: 'Top 8% global contest rating (1,850+), specializing in Dynamic Programming and Graph Algorithms.'
    }
  ],
  hobbies: ['Competitive Programming', 'Robotics Club Mentor', 'Classical Guitar', 'Badminton'],
  customization: {
    template: 'modern',
    accentColor: '#2563eb',
    fontFamily: 'font-sans',
    fontSize: 'normal',
    spacing: 'normal',
    margins: 'normal',
    headingStyle: 'uppercase',
    showPhoto: true,
    activeSections: ['summary', 'education', 'skills', 'projects', 'experience', 'certifications', 'achievements', 'languages', 'hobbies']
  }
};

export const SAMPLE_RESUMES: ResumeData[] = [
  DEFAULT_RESUME,
  PRODUCT_MANAGER_RESUME,
  FRESHER_RESUME
];

