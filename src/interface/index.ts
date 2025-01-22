export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ProjectData {
  projectName: string;
  clientName: string;
  image: string | undefined;
  tags: string[];
  description: Record<string, unknown>;
}

export interface Project {
  _id: string;
  projectName: string;
  clientName: string;
  image: string | undefined;
  tags: string[];
  description: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}
