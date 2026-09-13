export interface Project {
  id: string;
  title: string;
  liveUrl: string;
  description?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  createdAt?: any;
}

export interface ClientMessage {
  id?: string;
  name: string;
  email: string;
  serviceType: string;
  message: string;
  createdAt?: any;
  status: 'new' | 'read';
}

export interface Recommendation {
  id?: string;
  name: string;
  role: string;
  company?: string;
  rating: number;
  message: string;
  createdAt?: any;
  avatarColor?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    icon: string;
    highlight?: boolean;
  }[];
}
