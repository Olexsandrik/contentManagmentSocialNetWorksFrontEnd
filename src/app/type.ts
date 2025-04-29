import { DebouncedFunc } from "lodash";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
import { AddTasks } from "../components/Auth/zodValidations";
import { SelectChangeEvent } from "@mui/material";

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
  mediaType: string;
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

export type messageData = {
  role: "user" | "assistant";
  content: string;
};

export type UserSettings = {
  avatarUrl?: string | File | null;
  avatarFile?: File | null | undefined;
  name?: string | null;
  email?: string | null;
  provider?: "facebook" | "ticktock";
};

export type InputProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  control?: Control<any>;
  required?: string;
  endContent?: React.JSX.Element;
  className?: string;
  value?: string;
  textFields?: Boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
};

export type AddReview = {
  typeOfReviews: string;
  topic: string;
  messages: string;
  createdAt?: Date;
};
export type SelectProps = {
  name: string;
  control: Control<any>;
  onChange?: (value: SelectChangeEvent) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
};

//tasks
export type taskType = {
  title: string;
  color: string;
};
export type Task = {
  id: string;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  priority: {
    color: string;
    title: "HIGH PRIORITY" | "IN PROGRESS" | "COMPLETED";
  };
  description: string;
};

export type PriorityTaskProps = {
  type: taskType;
};
export type CardTaskProps = {
  item: Task;
};
export type AddTask = {
  modal: boolean;
  setModal: (e: boolean) => void;
  control: Control<AddTasks>;
  SelectOption: { value: string; label: string }[];
  setDataTask: Dispatch<SetStateAction<Task[]>>;
  taskType: taskType[];
  handleSubmit: any;
};
//tasks
