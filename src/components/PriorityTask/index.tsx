import { CardContent, Typography } from "@mui/material";
import { Card } from "@nextui-org/react";
import { PriorityTaskProps } from "../../app/type";

export const PriorityTask = ({ type }: PriorityTaskProps) => {
  return (
    <Card className="w-80">
      <CardContent className="flex justify-center content-center ">
        <Typography
          sx={{
            backgroundColor: type.color,
            width: 20,
            height: 20,
            borderRadius: "50%",
            marginRight: 2,
          }}
        />
        <Typography>{type.title}</Typography>
      </CardContent>
    </Card>
  );
};
