import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import { addDataForValue, Task, taskType } from "../../app/type";
import { MoreHorizontal, MoreVertical } from "lucide-react";

import { Select } from "../Select";
import { Input } from "../Input";
import { Button } from "@nextui-org/react";
import { MainModal } from "../../Modal";
import {
  Control,
  UseFormGetValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { AddTasks } from "../Auth/zodValidations";
import { usePatchPriority } from "../../servers/usePatchPriority";
import { usePatchDesc } from "../../servers/usePatchDesc";
import { useDeleteTask } from "../../servers/useDeleteTask";
import { useUpdateTasks } from "../../servers/useUpdateTasks";

export type CardTaskProps = {
  item: Task;
  control: Control<AddTasks>;
  SelectOption: { value: string; label: string }[];
  setDataTask: React.Dispatch<React.SetStateAction<Task[]>>;
  getValues: UseFormGetValues<any>;
  taskType: any;
  handleSubmit: UseFormHandleSubmit<any>;
  reset: any;
  setValue: any;
  PriorityMeta: any;
};

export const CardTask = ({
  item,
  control,
  SelectOption,
  setTasks,
  getValues,
  handleSubmit,
  reset,
  setValue,
  PriorityMeta,
}: any) => {
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { submitUpdateData } = useUpdateTasks(`server/todo/${item.id}`);
  const { onChangeDesc } = usePatchDesc(`server/todo/${item.id}/desc`);
  const { onChangePriority } = usePatchPriority(
    `server/todo/${item.id}/priority`
  );
  const { handlerDeleteTask } = useDeleteTask(`server/todo/${item.id}`);

  const onSubmitEdit = async (data: any) => {
    const { name, date, type, desc } = data;
    const updatedTask = {
      name,
      date,
      priority: type,
      desc,
    };
    setTasks((prev: any) => {
      return prev.map((it: any) => {
        return it.id === item.id ? updatedTask : it;
      });
    });
    await submitUpdateData(updatedTask);

    reset();
    setEdit(false);
  };
  const handleChangeType = (e: SelectChangeEvent) => {
    const newTitle = e.target.value as string;

    const isValid = SelectOption.some((item: any) => item.label === newTitle);
    console.log(isValid, newTitle);
    if (isValid) {
      setTasks((prev: Task[]) =>
        prev.map((t) =>
          t.id === item.id
            ? {
                ...t,
                priority: newTitle,
              }
            : t
        )
      );

      onChangePriority({ priority: newTitle });
      reset();
    }
  };

  const handleSaveDesc = (data: any) => {
    const { desc } = data;
    setTasks((prev: any[]) => [
      ...prev.map((it) => {
        return it.id === item.id
          ? {
              ...it,
              desc: desc,
            }
          : it;
      }),
    ]);

    onChangeDesc({ desc: desc });

    setIsEditingDesc(false);
    setValue("desc", "");
  };

  const handlerRemoveTask = async () => {
    setTasks((prev: Task[]) => prev.filter((it) => it.id !== item.id));
    await handlerDeleteTask(item.id);
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      key={item.id}
      className="mb-4 mt-4 h-auto flex flex-col justify-between bg-white rounded-xl shadow-lg transition-all hover:shadow-xl"
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%" },
        border: "1px solid #e0e0e0",
        overflow: "visible",
      }}
    >
      <CardContent className="flex flex-col justify-between h-full p-4 sm:p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            <div className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: PriorityMeta[item.priority].color }}
              />
              <Typography
                variant="subtitle2"
                style={{
                  color: PriorityMeta[item.priority].color,
                  fontWeight: 600,
                }}
              >
                {item.priority}
              </Typography>
            </div>

            <Typography
              variant="caption"
              className="text-gray-500 block"
              sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
            >
              {new Date(item.date).toLocaleDateString("en-GB")}
            </Typography>

            <Typography
              variant="body1"
              className="border-b border-gray-200 pt-2 pb-2 text-base font-medium text-black"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem" },
                wordBreak: "break-word",
              }}
            >
              {item.name}
            </Typography>
          </div>

          <IconButton
            onClick={handleMenuClick}
            className="text-gray-400 hover:text-gray-600"
            sx={{ padding: { xs: "4px", sm: "8px" } }}
          >
            <MoreHorizontal size={20} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: { borderRadius: "8px", minWidth: "120px" },
            }}
          >
            <MenuItem onClick={handlerRemoveTask} sx={{ fontSize: "0.9rem" }}>
              Видалити
            </MenuItem>
            <MenuItem onClick={() => setEdit(true)} sx={{ fontSize: "0.9rem" }}>
              Редагувати
            </MenuItem>
          </Menu>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 bg-gray-50 rounded-lg p-3 gap-2">
          <Select
            control={control}
            name="typeOfTask"
            options={SelectOption}
            placeholder="change process"
            onChange={(e: SelectChangeEvent) => handleChangeType(e)}
            className="max-w-full sm:max-w-[150px] h-[40px]"
          />

          <Button
            size="sm"
            variant="light"
            className="text-gray-600 text-center mt-2 sm:mt-0"
            onClick={() => setIsEditingDesc(true)}
          >
            Add desc
          </Button>
        </div>

        {isEditingDesc ? (
          <div className="mt-4">
            <Input
              name="desc"
              control={control}
              placeholder="Введіть опис.."
              label="description"
              textFields={true}
              size={2}
            />

            <div className="flex gap-2 justify-end mt-3">
              <Button
                type="button"
                size="sm"
                className="h-8"
                onClick={() => setIsEditingDesc(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8"
                onClick={handleSubmit(handleSaveDesc)}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 min-h-[40px]">
            {item.desc ? (
              <Typography
                sx={{
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  lineHeight: 1.5,
                  color: "#555",
                  wordBreak: "break-word",
                }}
              >
                {item.desc}
              </Typography>
            ) : null}
          </div>
        )}
      </CardContent>

      {edit ? (
        <MainModal
          open={edit}
          handleClose={() => setEdit(false)}
          className="flex justify-center items-center"
        >
          <div className="w-full max-w-[600px] h-auto bg-[#f8f9fa] rounded-2xl p-5 sm:p-8 border-[2px] border-blue-400 shadow-xl">
            <div className="mb-5">
              <label className="text-lg font-semibold mb-2 block">
                Edit Task
              </label>
              <Input
                control={control}
                name="name"
                label="Task title"
                placeholder="Text field data"
                className="w-full"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mb-6">
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

              <div className="flex-1 mt-4 sm:mt-0">
                <label className="text-sm font-medium mb-2 block">
                  Task Date
                </label>
                <Input
                  control={control}
                  name="date"
                  type="date"
                  placeholder="Select date"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
              <Button
                onClick={() => setEdit(false)}
                className="order-2 sm:order-1"
              >
                Close
              </Button>
              <Button
                type="submit"
                className="order-1 sm:order-2"
                onClick={handleSubmit(onSubmitEdit)}
              >
                Edit Task
              </Button>
            </div>
          </div>
        </MainModal>
      ) : null}
    </Card>
  );
};
