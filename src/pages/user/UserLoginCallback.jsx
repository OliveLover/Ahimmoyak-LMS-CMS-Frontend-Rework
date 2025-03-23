import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useLocation, useNavigate } from "react-router-dom";

function UserLoginCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");

  useEffect(() => {
    if (!auth.user) return;

    const userGroups = auth.user?.profile?.["cognito:groups"];

    if (userGroups && userGroups.includes("admin")) {
      navigate("/admin");
    } else {
      navigate("/");
    }

  }, [auth.user, code, navigate])

  return null;
};

export default UserLoginCallback;