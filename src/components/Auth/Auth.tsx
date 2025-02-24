import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { Login } from './Login';
import { Register } from './Register';
import './index.css';
import { useState } from 'react';

export const Auth = () => {
  const [selected, setSelected] = useState('login');

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <Card>
          <CardBody className="container-card">
            <Tabs
              fullWidth
              size="md"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as string)}
              className="Tabs"
            >
              <Tab key="login" title="Вхід">
                <Login setSelected={setSelected} />
              </Tab>
              <Tab key="sign-up" title="Регестрація">
                <Register setSelected={setSelected} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
