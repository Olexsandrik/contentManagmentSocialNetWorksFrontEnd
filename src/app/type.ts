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
