import type React from "react";
import { useState } from "react";
import {
  Button,
  Typography,
  IconButton,
  Avatar,
  AvatarGroup,
  Chip,
  Menu,
  MenuItem,
  Tabs,
  Tab,
  Badge,
  CardContent,
  TextField,
} from "@mui/material";
import {
  Add as AddIcon,
  MoreHoriz as MoreHorizIcon,
  ArrowUpward as ArrowUpwardIcon,
  ViewKanban as ViewKanbanIcon,
  ViewList as ViewListIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Comment as CommentIcon,
  AttachFile as AttachFileIcon,
  ChecklistRtl as ChecklistRtlIcon,
} from "@mui/icons-material";
import { Card } from "@nextui-org/react";
import { MainModal } from "../../Modal";
import { Input } from "../Input";

type User = {
  id: string;
  name: string;
  initials: string;
  color: string;
};

type TaskTag = {
  name: string;
  color: string;
};

type Task = {
  id: string;
  title: string;
  priority: "HIGH" | "MEDIUM" | "NORMAL" | "LOW";
  status: "TO_DO" | "IN_PROGRESS" | "COMPLETED";
  date: string;
  assignees: User[];
  comments: number;
  attachments: number;
  subtasks: {
    total: number;
    completed: number;
  };
  description?: string;
  tags: TaskTag[];
};

const users: User[] = [
  { id: "ai", name: "Alex Ivanov", initials: "AI", color: "#3b82f6" },
  { id: "js", name: "Jane Smith", initials: "JS", color: "#ef4444" },
  { id: "ca", name: "Codewave Asante", initials: "CA", color: "#8b5cf6" },
  { id: "ew", name: "Emily Wilson", initials: "EW", color: "#f97316" },
  { id: "jd", name: "John Doe", initials: "JD", color: "#10b981" },
];

const tags: TaskTag[] = [
  { name: "tutorial", color: "#3b82f6" },
  { name: "Website App", color: "#3b82f6" },
  { name: "Design", color: "#8b5cf6" },
  { name: "Bug Fixing", color: "#3b82f6" },
];

const taskType = [
  { color: "blue", title: "To do" },
  { color: "yellow", title: "In Progress" },
  { color: "green", title: "Completed" },
];
export const TaskManager = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-around">
        {taskType.map((item) => {
          return (
            <Card className="w-80">
              <CardContent className="flex justify-center content-center">
                <Typography
                  sx={{
                    backgroundColor: item.color,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    marginRight: 2,
                  }}
                />
                <Typography>{item.title}</Typography>
              </CardContent>
            </Card>
          );
        })}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "12px",
            textTransform: "none",
            boxShadow: 3,
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={() => setModal(true)}
        >
          Add task
        </Button>
        <MainModal
          open={modal}
          className="absolute top-40 left-0 right-0 bg-white flex justify-center content-center"
          handleClose={() => setModal(false)}
        >
          <div className="min-w-[600px] min-h-[600px] bg-white p-4">
            ADD TASK
            <input className="w-full mt-2 p-2 border rounded" />
          </div>
        </MainModal>
      </div>
    </div>
  );
};
