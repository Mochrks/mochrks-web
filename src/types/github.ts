export interface GitHubProject {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export interface MappedProject {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  img?: string;
}
