import React, { useState } from "react";
import { MainModal } from "../../Modal";
import { Input } from "../Input";
import { Select } from "../Select";
import { Button } from "@mui/material";
import { Control, useForm } from "react-hook-form";
import { AddTask, Task } from "../../app/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddTasks as addTaskSubmit } from "../Auth/zodValidations";

export const AddTasks = ({
  modal,
  setModal,
  control,
  SelectOption,
  setDataTask,
  taskType,
  handleSubmit,
}: AddTask) => {
  const onSubmit = (data: addTaskSubmit) => {
    const addNewTask: Task = {
      id: String(Date.now()),
      userId: 999,
      name: data.name,
      createdAt: new Date(data.date).toISOString(),
      updatedAt: new Date().toISOString(),
      priority: {
        title: data.type,
        color: taskType.find((t) => t.title === data.type)?.color ?? "gray",
      },
      description: "",
    };
    setDataTask((prev) => [...prev, addNewTask]);
    setModal(false);
  };
  return (
    <MainModal
      open={modal}
      className="flex justify-center items-center"
      handleClose={() => setModal(false)}
    >
      <div className="min-w-[600px] h-auto bg-[#e0e0e0] rounded-3xl p-10 border-[3px] border-blue-400 shadow-xl">
        <h2 className="text-xl font-bold mb-10">ADD TASK</h2>

        <div className="mb-6">
          <label className="text-lg font-semibold mb-2 block">Task title</label>
          <Input
            control={control}
            name="name"
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
              name="type"
              options={SelectOption}
              placeholder="TODO"
            />
          </div>

          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Task Date</label>
            <Input
              control={control}
              name="date"
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
          <Button
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            Add Task
          </Button>
        </div>
      </div>
    </MainModal>
  );
};
