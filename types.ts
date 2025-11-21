export interface Project {
  id: string;
  title: string;
  titleAm: string;
  description: string;
  descriptionAm: string;
  techStack: string[];
  image: string;
  demoLink?: string;
  githubLink?: string;
  category: 'Frontend' | 'Fullstack' | 'AI' | 'Automation';
}

export interface Experience {
  id: string;
  role: string;
  roleAm: string;
  company: string;
  period: string;
  periodAm: string;
  description: string[];
  descriptionAm: string[];
}

export interface SkillCategory {
  title: string;
  titleAm: string;
  skills: string[];
}

export type Language = 'en' | 'am';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isTyping?: boolean;
}
