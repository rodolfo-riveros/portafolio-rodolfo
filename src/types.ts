export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'tools';
  level: number; // 1-100
  iconName: string; // Lucide icon identifier
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
