import React from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  isLoading: boolean;
};

export const Loading = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="fixed  flex items-center justify-center w-screen h-screen bg-black bg-opacity-50 z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <BeatLoader color="white" loading={isLoading} />
    </div>
  );
};
