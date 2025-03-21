import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { Login } from "./Login";
import { Register } from "./Register";
import { useState } from "react";

export const Auth = () => {
  const [selected, setSelected] = useState("login");

  return (
    <div className="fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[750px]">
      <Tabs
        fullWidth
        size="md"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key as string)}
        className="w-full"
      >
        <Tab key="login" title="Вхід">
          <Login setSelected={setSelected} />
        </Tab>
        <Tab key="sign-up" title="Реєстрація">
          <Register setSelected={setSelected} />
        </Tab>
      </Tabs>
    </div>
  );
};
