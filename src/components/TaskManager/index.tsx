import { useState } from "react";
import { Button, Typography, CardContent } from "@mui/material";

import { Card } from "@nextui-org/react";
import { MainModal } from "../../Modal";
import { AddTask, Task, taskType as TypeTask } from "../../app/type";
import { PriorityTask } from "../PriorityTask";
import { CardTask } from "../CardTask";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../Select";
import { AddTasks, addTasks } from "../Auth/zodValidations";

import { zodResolver } from "@hookform/resolvers/zod";
import { AddTasks as NewTask } from "../AddTasks";
const taskType: TypeTask[] = [
  { color: "red", title: "HIGH PRIORITY" },
  { color: "orange", title: "IN PROGRESS" },
  { color: "green", title: "COMPLETED" },
];

const tasks: Task[] = [
  {
    id: "1",
    userId: 101,
    name: "Fix login error",
    createdAt: "2025-04-21T09:00:00.000Z",
    updatedAt: "2025-04-21T10:00:00.000Z",
    priority: { color: "red", title: "HIGH PRIORITY" },
    description: "",
  },
  {
    id: "2",
    userId: 102,
    name: "Create user dashboard UI",
    createdAt: "2025-04-20T15:30:00.000Z",
    updatedAt: "2025-04-20T17:00:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
    description: "",
  },
  {
    id: "3",
    userId: 103,
    name: "Write API docs",
    createdAt: "2025-04-18T11:45:00.000Z",
    updatedAt: "2025-04-19T08:20:00.000Z",
    priority: { color: "green", title: "COMPLETED" },
    description: "",
  },
  {
    id: "4",
    userId: 101,
    name: "Optimize image loading",
    createdAt: "2025-04-19T13:15:00.000Z",
    updatedAt: "2025-04-19T13:45:00.000Z",
    priority: { color: "green", title: "COMPLETED" },
    description: "",
  },
  {
    id: "5",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "red", title: "HIGH PRIORITY" },
    description: "",
  },
  {
    id: "6",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "green", title: "COMPLETED" },

    description: "Крутий опис контента",
  },
  {
    id: "7",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
    description: "",
  },
  {
    id: "8",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
    description: "",
  },
];

export const TaskManager = () => {
  const [modal, setModal] = useState(false);

  const [dataTask, setDataTask] = useState<Task[]>(tasks);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTasks>({
    mode: "onChange",
    resolver: zodResolver(addTasks),
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      type: "COMPLETED",
      date: "",
    },
  });

  const SelectOption = taskType.map((item) => {
    return {
      value: item.title,
      label: item.title,
    };
  });
  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-around">
        {taskType.map((type) => {
          const filterTask = dataTask.filter(
            (task) => task.priority.title === type.title
          );
          return (
            <div key={type.title} className="w-80 mr-10">
              <PriorityTask type={type} />

              {filterTask.map((item) => {
                return (
                  <CardTask
                    item={item}
                    control={control}
                    SelectOption={SelectOption}
                    setDataTask={setDataTask}
                    taskType={taskType}
                  />
                );
              })}
            </div>
          );
        })}
        <div>
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
        </div>
        <NewTask
          modal={modal}
          setModal={setModal}
          control={control}
          SelectOption={SelectOption}
          setDataTask={setDataTask}
          taskType={taskType}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
