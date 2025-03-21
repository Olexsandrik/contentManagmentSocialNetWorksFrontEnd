import { useNavigate } from "react-router-dom";

export const Home = () => {
  const router = useNavigate();

  return (
    <div className="container mx-auto">
      <div className="relative flex justify-between items-center py-4">
        <div className="text-lg font-bold">CoolCompany</div>

        <nav>
          <ul className="flex space-x-5">
            <li>
              <a href="#" className="hover:text-blue-500">
                Інструкція
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Допомога
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-500">
                Підписка
              </a>
            </li>
          </ul>
        </nav>

        <select className="border rounded px-2 py-1 text-sm">
          <option value="">Language</option>
          <option value="EN">EN</option>
          <option value="UA">UA</option>
        </select>

        <div className="flex items-center">
          <button
            className="ml-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router("/auth")}
          >
            Login
          </button>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg">
        content
      </div>
    </div>
  );
};
