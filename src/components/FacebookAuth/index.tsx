import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_FACEBOOK_URL } from "../../constants";
export const FacebookAuth = () => {
  return (
    <Button as="a" href={BASE_FACEBOOK_URL}>
      Увійти через Facebook
    </Button>
  );
};
