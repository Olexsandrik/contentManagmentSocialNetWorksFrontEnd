import React, { useState } from "react";
import { CardTaskProps, Task } from "../../app/type";
import { MainModal } from "../../Modal";
import { Input } from "../Input";
import { useForm } from "react-hook-form";
import { Select } from "../Select";
import { Button } from "@mui/material";

export const EditTask = (item: CardTaskProps, SelectOption: any) => {
  const [modal, setModal] = useState(false);

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
  return (
    <MainModal
      open={modal}
      className="flex justify-center items-center"
      handleClose={() => setModal(false)}
    >
      <div className="min-w-[500px] h-auto bg-[#e0e0e0] rounded p-10 border-[3px] border-blue-400 shadow-xl">
        <h2 className="text-xl font-bold mb-10">ADD TASK</h2>

        <div className="mb-6">
          <label className="text-lg font-semibold mb-2 block">Edit Task</label>
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
            <label className="text-sm font-medium mb-2 block">Task Date</label>
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
  );
};
