// interface type data
export interface Post {
  guid: string;
  title: string;
  pubDate: string;
  author: string;
  link: string;
  thumbnail?: string;
  description: string;
  categories?: string[];
  content?: string;
}

export interface RSSData {
  items: Post[];
}
