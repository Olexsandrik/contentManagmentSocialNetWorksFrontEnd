import { useState } from "react";
import { Button } from "@mui/material";
import type { Task, taskType as TypeTask } from "../../app/type";
import { PriorityTask } from "../PriorityTask";
import { CardTask } from "../CardTask";
import { useForm } from "react-hook-form";
import { type AddTasks, addTasks } from "../Auth/zodValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTasks as NewTask } from "../AddTasks";
import { usePostTask } from "../../hooks/usePostTask";

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
    desc: "Coolest  Task",
  },
  {
    id: "2",
    userId: 102,
    name: "Create user dashboard UI",
    createdAt: "2025-04-20T15:30:00.000Z",
    updatedAt: "2025-04-20T17:00:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
    desc: "",
  },
  {
    id: "3",
    userId: 103,
    name: "Write API docs",
    createdAt: "2025-04-18T11:45:00.000Z",
    updatedAt: "2025-04-19T08:20:00.000Z",
    priority: { color: "green", title: "COMPLETED" },
    desc: "",
  },
  {
    id: "4",
    userId: 101,
    name: "Optimize image loading",
    createdAt: "2025-04-19T13:15:00.000Z",
    updatedAt: "2025-04-19T13:45:00.000Z",
    priority: { color: "green", title: "COMPLETED" },
    desc: "",
  },
  {
    id: "5",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "red", title: "HIGH PRIORITY" },
    desc: "",
  },
  {
    id: "6",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "green", title: "COMPLETED" },
    desc: "Крутий опис контента",
  },
  {
    id: "7",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
    desc: "",
  },
  {
    id: "8",
    userId: 104,
    name: "Update environment variables",
    createdAt: "2025-04-20T08:00:00.000Z",
    updatedAt: "2025-04-20T08:10:00.000Z",
    priority: { color: "orange", title: "IN PROGRESS" },
    desc: "",
  },
];

export const TaskManager = () => {
  const { submitReview, task, isLoading, error, setTask } =
    usePostTask("server/todo");

  const [modal, setModal] = useState(false);
  const [dataTask, setDataTask] = useState<Task[]>(tasks);

  const { control, handleSubmit, getValues, setValue, reset } =
    useForm<AddTasks>({
      mode: "onChange",
      resolver: zodResolver(addTasks),
      reValidateMode: "onBlur",
      defaultValues: {
        name: "",
        type: "COMPLETED",
        date: "",
        desc: "",
      },
    });

  const SelectOption = taskType.map((item) => {
    return {
      value: item.title,
      label: item.title,
    };
  });

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="md:hidden fixed bottom-4 right-4 z-10">
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

      <div className="flex flex-col md:flex-row md:justify-around gap-6 md:gap-4">
        {taskType.map((type) => {
          const filterTask = dataTask.filter(
            (task) => task.priority.title === type.title
          );
          return (
            <div key={type.title} className="w-full md:w-80 md:mr-4">
              <PriorityTask type={type} />
              <div className="mt-3 space-y-3">
                {filterTask.map((item) => (
                  <CardTask
                    key={item.id}
                    item={item}
                    control={control}
                    SelectOption={SelectOption}
                    setDataTask={setDataTask}
                    taskType={taskType}
                    getValues={getValues}
                    handleSubmit={handleSubmit}
                    reset={reset}
                    setValue={setValue}
                  />
                ))}
                {filterTask.length === 0 && (
                  <div className="text-gray-400 text-center py-4 border border-dashed border-gray-300 rounded-lg">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="hidden md:block">
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
  );
};
