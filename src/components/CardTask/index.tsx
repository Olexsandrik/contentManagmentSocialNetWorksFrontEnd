import {
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { Button, Card } from "@nextui-org/react";
import React, { useState } from "react";
import { CardTaskProps, Task } from "../../app/type";
import { MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
import { EditTask } from "../EditTask";
import { Select } from "../Select";
//CardTaskProps
export const CardTask = ({
  item,
  control,
  SelectOption,
  setDataTask,
  dataTask,
}: any) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeType = (e: SelectChangeEvent) => {
    const newTitle = e.target.value as string;
    setDataTask((prev: Task[]) => {
      return prev.map((t) => {
        return t.id === item.id
          ? {
              ...t,
              priority: {
                ...t.priority,
                title: newTitle,
              },
            }
          : t;
      });
    });
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("Редагувати", item);
    setEdit(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    console.log("Видалити", item);
    handleMenuClose();
  };

  const handleAddDesc = () => {
    console.log("Додати опис", item);
    handleMenuClose();
  };

  return (
    <Card
      key={item.id}
      className="mb-3 p-4 mt-10 h-64 flex flex-col justify-between bg-white rounded-2xl shadow-md"
    >
      <CardContent className="flex flex-col justify-between h-full p-0">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.priority.color }}
              />
              <Typography
                variant="subtitle2"
                style={{ color: item.priority.color }}
              >
                {item.priority.title}
              </Typography>
            </div>

            <Typography variant="caption" className="text-gray-500">
              {new Date(item.updatedAt).toLocaleDateString("en-GB")}
            </Typography>

            <Typography
              variant="body1"
              className="border-b border-gray-300 pt-2 text-base font-medium text-black"
            >
              {item.name}
            </Typography>
            <Typography className="mt-5 text-cyan-800" fontSize="14px">
              {item.description}
            </Typography>
          </div>

          <IconButton onClick={handleMenuClick} className="text-gray-400">
            <MoreHorizontalIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleDelete}>Видалити</MenuItem>
            <MenuItem onClick={handleAddDesc}>Додати опис</MenuItem>
          </Menu>
        </div>

        <label className="text-sm font-medium mb-2 block">Task Stage:</label>
        <Select
          control={control}
          name="typeOfTask"
          options={SelectOption}
          placeholder="change process"
          onChange={(e: SelectChangeEvent) => handleChangeType(e)}
        />
        <div className="flex justify-between mt-4 px-1">
          <Button size="sm" variant="light" className="text-gray-600">
            Add desc
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
