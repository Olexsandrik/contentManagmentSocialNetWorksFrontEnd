export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  ToDo: ToDo[];
};

export type ToDo = {
  id: string;
  user: User;
  userId: string;
  date: Date;
  content: string;
  completed: boolean;
  createdAt: Date;
};

export type InstagramAccount = {
  idAccount: string;
  user: string;
  profileUrl: string;
  followers: number;
  following: number;
  totalLikes: number;
};
