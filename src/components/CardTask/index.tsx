import { CardContent, Typography } from "@mui/material";
import { Button, Card } from "@nextui-org/react";
import React, { useState } from "react";
import { Task } from "../../app/type";

type CardTaskProps = {
  item: Task;
};

export const CardTask = ({ item }: CardTaskProps) => {
  return (
    <Card
      key={item.id}
      className="mb-3 p-4 mt-10 h-52 flex flex-col justify-between bg-white rounded-2xl shadow-md"
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
          </div>

          <div className="text-gray-400 text-xl font-bold">...</div>
        </div>

        <div className="flex justify-between mt-4 px-1">
          <Button size="sm" variant="light" className="text-gray-600">
            remove
          </Button>
          <Button size="sm" variant="light" className="text-gray-600">
            Add desc
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
