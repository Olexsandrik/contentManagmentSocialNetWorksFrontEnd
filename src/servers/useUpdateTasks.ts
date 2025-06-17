import { useState } from "react";
import { BASE_URL } from "../constants";

export const useUpdateTasks = (mainUrl: string) => {
  const submitUpdateData = async (update: any) => {
    const res = await fetch(`${BASE_URL}/${mainUrl}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(update),
    });

    if (!res.ok) {
      new Error("Error response");
    }

    return true;
  };

  return { submitUpdateData };
};
