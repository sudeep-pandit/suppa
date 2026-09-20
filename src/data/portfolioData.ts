export interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  demo: string;
}

export interface TimelineEntry {
  title: string; // organization or institution
  subtitle: string; // role or degree
  date: string;
  description: string;
  website: string;
  initials: string;
}

export interface WritingEntry {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  link: string;
}

export const projects: Project[] = [
  {
    number: "01",
    category: "SaaS / Education",
    title: "School Management System",
    description:
      "A comprehensive platform for managing student records, attendance, and academic reporting. Built with a focus on clean UX and reliable data handling.",
    tags: ["PostgreSQL", "JavaScript", "ERP", "UI/UX"],
    link: "#",
    demo: "#",
  },
  {
    number: "02",
    category: "NGO / Social Impact",
    title: "Lifeline Achham",
    description:
      "A digital initiative supporting community health and education in rural Nepal. Focused on accessibility and low-bandwidth environments.",
    tags: ["Web", "Accessibility", "Community"],
    link: "#",
    demo: "#",
  },
  {
    number: "03",
    category: "Media / Publishing",
    title: "News Media Platform",
    description:
      "A modern publishing platform for independent journalism. Features a clean reading experience and efficient content workflow.",
    tags: ["TypeScript", "Node.js", "CMS"],
    link: "#",
    demo: "#",
  },
  {
    number: "04",
    category: "AI / ML",
    title: "AI-powered Applications",
    description:
      "A collection of experiments applying machine learning to real-world problems — from text summarization to intelligent search.",
    tags: ["Python", "ML", "APIs"],
    link: "#",
    demo: "#",
  },
];

export const experiences: TimelineEntry[] = [
  {
    title: "Your Company",
    subtitle: "Your Role",
    date: "2025 — Present",
    description:
      "Description of your responsibilities and contributions. Replace this with your actual experience.",
    website: "#",
    initials: "YC",
  },
  {
    title: "Previous Organization",
    subtitle: "Your Previous Role",
    date: "2024 — 2025",
    description:
      "A brief description of what you worked on and what you learned. Keep it honest and specific.",
    website: "#",
    initials: "PO",
  },
];

export const education: TimelineEntry[] = [
  {
    title: "Coventry University",
    subtitle: "BSc Computer Science with AI",
    date: "2026 — Present",
    description:
      "Studying core computer science foundations alongside specialised artificial intelligence modules — covering machine learning, data structures, algorithms, intelligent systems, and software engineering. Developing both theoretical understanding and practical skills to build AI-driven applications.",
    website: "https://www.coventry.ac.uk/",
    initials: "CU",
  },
  {
    title: "Prasadi Academy",
    subtitle: "High School — Science",
    date: "2022 — 2024",
    description:
      "Built a strong foundation in mathematics, physics, and computer science. Developed early programming skills and a genuine curiosity for how technology works — the starting point of my journey into computer science.",
    website: "https://prasadi.edu.np",
    initials: "PA",
  },
];

export const writings: WritingEntry[] = [
  {
    category: "Technology",
    date: "2026",
    title: "Learning AI in the age of AI-assisted development",
    excerpt:
      "Thoughts on learning computer science while artificial intelligence rapidly changes software development.",
    link: "#",
  },
  {
    category: "Journey",
    date: "2025",
    title: "My journey into Computer Science",
    excerpt: "From early curiosity to building my first projects — a personal reflection on finding my path.",
    link: "#",
  },
  {
    category: "Building",
    date: "2025",
    title: "Building useful software for real-world problems",
    excerpt: "Why the most meaningful projects often start with listening rather than coding.",
    link: "#",
  },
];

export const skillGroups: { title: string; skills: string[] }[] = [
  {
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
  },
  {
    title: "Development",
    skills: ["Git", "GitHub", "PostgreSQL", "REST APIs", "Linux"],
  },
  {
    title: "AI / ML",
    skills: ["Artificial Intelligence", "Machine Learning", "Data Analysis", "AI APIs"],
  },
];
