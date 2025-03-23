import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    auth.signinRedirect();
  };

  const handleLogoutClick = async () => {
    await auth.removeUser();

    const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
    const logoutUri = import.meta.env.VITE_COGNITO_LOGOUT_URI;
    const cognitoDomain = import.meta.env.VITE_COGNITO_DOMAIN;

    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const handleTitleClick = () => {
    navigate("/");
  };

  return (
    <header className="user-header">
      <h2 className="header-title" onClick={handleTitleClick} >
        Ahimmoyak
      </h2>
      {auth.isAuthenticated ? (
        <span className="login-text" onClick={handleLogoutClick}>
          로그아웃
        </span>
      ) : (
        <span className="login-text" onClick={handleLoginClick}>
          로그인
        </span>
      )}
    </header>
  );
};

export default Header;
