import { Card, CardBody } from "@nextui-org/react";

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Cool Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardBody>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold mt-2">1,234</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-semibold mt-2">$12,345</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold mt-2">12</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div>
                    <p className="text-sm">New user registered</p>
                    <p className="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {[
                { label: "Completed Tasks", value: "24/36" },
                { label: "Open Tickets", value: "5" },
                { label: "Team Members", value: "12" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                >
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
