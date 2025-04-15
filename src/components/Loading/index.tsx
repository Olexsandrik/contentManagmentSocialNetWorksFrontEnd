import React from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  isLoading: boolean;
};

export const Loading = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="flex items-center justify-center h-screen">
      <BeatLoader color="white" loading={isLoading} />
    </div>
  );
};
