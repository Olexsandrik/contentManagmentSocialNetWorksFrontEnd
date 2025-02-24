import { useNavigate } from 'react-router-dom';
import './index.css';
export const Home = () => {
  const router = useNavigate();

  return (
    <div className="container">
      <div className="container-wrapper">
        <div className="logo">CoolCompamy</div>

        <div className="nav-navigation">
          <ul className="nav-items">
            <a href="#">
              <li className="nav-item">Інструкція</li>
            </a>
            <a href="#">
              <li className="nav-item">допомога</li>
            </a>
            <a href="#">
              <li className="nav-item">підписка</li>
            </a>
          </ul>
        </div>

        <select name="language" id="">
          <option value="">Language</option>
          <option value="EN">EN</option>
          <option value="UA">UA</option>
        </select>
        <div className="auth-warapper">
          <div className="auth" onClick={() => router('/auth')}>
            Login
          </div>
        </div>
      </div>

      <div className="description">content</div>
    </div>
  );
};
