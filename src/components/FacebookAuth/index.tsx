import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const FacebookAuth = () => {
  const navigate = useNavigate();

  return (
    <Button as="a" href="http://localhost:3000/server/login/facebook">
      Увійти через Facebook
    </Button>
  );
};
