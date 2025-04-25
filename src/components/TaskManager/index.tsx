import { useState } from "react";
import { Button, Typography, CardContent } from "@mui/material";

import { Card } from "@nextui-org/react";
import { MainModal } from "../../Modal";
import { Task, taskType as TypeTask } from "../../app/type";
import { PriorityTask } from "../PriorityTask";
import { CardTask } from "../CardTask";
import { useForm } from "react-hook-form";
import { Input } from "../Input";
import { Select } from "../Select";

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
  },
  {
    id: "2",
    userId: 102,
    name: "Create user dashboard UI",
    createdAt: "2025-04-20T15:30:00.000Z",
    updatedAt: "2025-04-20T17:00:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
  },
  {
    id: "3",
    userId: 103,
    name: "Write API docs",
    createdAt: "2025-04-18T11:45:00.000Z",
    updatedAt: "2025-04-19T08:20:00.000Z",
    priority: { color: "green", title: "COMPLETED" },
  },
  {
    id: "4",
    userId: 101,
    name: "Optimize image loading",
    createdAt: "2025-04-19T13:15:00.000Z",
    updatedAt: "2025-04-19T13:45:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
  },
  {
    id: "5",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
  },
  {
    id: "6",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
  },
  {
    id: "7",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
  },
  {
    id: "8",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
  },
];

export const TaskManager = () => {
  const [modal, setModal] = useState(false);

  const [dataStore, setDataStore] = useState<TypeTask[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
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
          const filterTask = tasks.filter(
            (task) => task.priority.title === type.title
          );
          return (
            <div key={type.title} className="w-80 mr-10">
              <PriorityTask type={type} />

              {filterTask.map((item) => {
                return <CardTask item={item} />;
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
      </div>

      <MainModal
        open={modal}
        className="flex justify-center items-center"
        handleClose={() => setModal(false)}
      >
        <div className="min-w-[600px] h-auto bg-[#e0e0e0] rounded-3xl p-10 border-[3px] border-blue-400 shadow-xl">
          <h2 className="text-xl font-bold mb-10">ADD TASK</h2>

          <div className="mb-6">
            <label className="text-lg font-semibold mb-2 block">
              Task title
            </label>
            <Input
              control={control}
              name="topics"
              label="Task title"
              placeholder="Text field data"
              className="w-full"
            />
          </div>

          <div className="flex justify-between gap-6 mb-10">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Task Stage:
              </label>
              <Select
                control={control}
                name="typeOfTask"
                options={SelectOption}
                placeholder="TODO"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Task Date
              </label>
              <Input
                control={control}
                name="taskDate"
                type="date"
                placeholder="Select date"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex justify-between mt-10">
            <Button variant="contained" onClick={() => setModal(false)}>
              Close
            </Button>
            <Button variant="contained" type="submit">
              Add Task
            </Button>
          </div>
        </div>
      </MainModal>
    </div>
  );
};
