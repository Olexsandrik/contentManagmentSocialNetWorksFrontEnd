import { Button } from "@nextui-org/react";
import InstagramIcon from "@mui/icons-material/Instagram";
import { BASE_FACEBOOK_URL } from "../../constants";

export const FacebookAuth = () => {
  return (
    <Button
      as="a"
      href={BASE_FACEBOOK_URL}
      startContent={<InstagramIcon />}
      className="w-full px-3 py-"
    >
      Увійти через Instagram
    </Button>
  );
};
