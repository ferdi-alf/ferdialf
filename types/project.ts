export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isOpenSource: boolean;
}

export interface ProjectsApiData {
  items: Project[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
