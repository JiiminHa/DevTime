export interface TechStack {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechStackSearchResponse {
  results: TechStack[];
}

export interface TechStackCreateResponse {
  message: string;
  techStack: TechStack;
}
