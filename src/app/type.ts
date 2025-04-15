// social
export type User = {
  id: number;
  email?: string | null;
  name?: string | null;
  password?: string | null;
  provider?: string | null;
  accountId?: string | null;
  avatarUrl?: File | null | undefined | string;
  createdAt?: Date;
};

export type Review = {
  id: string;
  userId: number;
  user: {
    id: number | null | undefined;
    name: string | null | undefined;
    avatarUrl: File | null | undefined | string;
  };
  typeOfReviews: string;
  topic: string;
  messages: string;
  createdAt: Date;
};
// socalMediaData
export type SocialMediaPost = {
  id: string;
  caption?: string;
  media_type: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  likeCount: number;
  commentsCount: number;
  comments?: SocialMediaComment[];
};

export type SocialMediaComment = {
  id: string;
  text: string;
  username: string;
  timestamp: string;
};
// socalMediaData

// auth
export type Register = {
  email: string;
  name: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

// auth
export function isRegister(data: Login | Register): data is Register {
  return "name" in data;
}

export type PostData = {
  month: string;
  posts: number;
  likes: number;
};

export type EngagementData = {
  month: string;
  engagement: number;
};

export type CardProps = {
  title: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  headerBgColor: string;
  titleColor: string;
};

export type TabContentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export type PromptAI = {
  result: string;
  customPrompt: string;
};
