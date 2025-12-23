
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  imageId: string;
  localImage?: string;
  content: string;
};

export type PressRelease = {
  slug: string;
  date: string;
  title: string;
  description: string;
  fullContent: string;
  imageId?: string;
  localImage?: string;
};
