import { useLocation } from "react-router-dom";

const UserLoginCallback = () => {
  const location = useLocation();
  console.log(location.search);

  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // OIDC 인증 코드

  return (
    <div>
      <h1>로그인 처리 중...</h1>
      <p>인증 코드: {code}</p>
    </div>
  );
};

export default UserLoginCallback;