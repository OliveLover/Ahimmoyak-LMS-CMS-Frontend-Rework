import { useNavigate } from "react-router-dom";
import "./Navi.css";

const Navi = () => {
  const navigate = useNavigate();
  
  const handleGovClick = () => {
    navigate(`/courses/gov/01`);
  };

  const handleNcsClick = () => {
    navigate(`/courses/ncs/01`);
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div className="collapse navbar-collapse w-100" id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex justify-content-center w-100">
            <a className="nav-link" onClick={handleGovClick}>
              법정의무교육
            </a>
            <a className="nav-link" onClick={handleNcsClick}>
              직무능력향상과정
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navi;
