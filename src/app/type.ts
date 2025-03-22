// social
export type User = {
  id: number;
  email?: string | null;
  name?: string | null;
  password?: string | null;
  provider?: string | null;
  accountId?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  ToDo?: ToDo[];
  info?: Info | null;
  infoData?: InfoDataSocial[];
};

export type InfoDataSocial = {
  id: number;
  userId: number;
  user?: User;
  provider: string;
  followersCount: number;
  mediaCount: number;
  likesCount: number;
  engagementRate?: number | null;
  profileUsername: string;
  profilePictureUrl: string;
  createdAt: Date;
};

export type ToDo = {
  id: number;
  userId: number;
  user?: User;
  date: Date;
  content: string;
  completed: boolean;
  createdAt: Date;
  chatGptId?: number | null;
  chatGpt?: ChatGPT | null;
};

export type ChatGPT = {
  id: number;
  content: string;
  todos?: ToDo[];
};

export type Info = {
  id: number;
  userId: number;
  user?: User;
  platform: string;
  username: string;
  followers: number;
  following: number;
  bio?: string | null;
  profilePicture?: string | null;
  mediaCount: number;
};

// Social
export type Register = {
  email: string;
  name: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};
export function isRegister(data: Login | Register): data is Register {
  return "name" in data;
}
