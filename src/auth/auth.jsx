import { cognitoAuthConfig } from "../auth/cognitoAuthConfig";

export const getUserRoles = () => {
  const cognitoTokenKey = `oidc.user:${cognitoAuthConfig.authority}:${cognitoAuthConfig.client_id}`;
  const storedUserData = sessionStorage.getItem(cognitoTokenKey);

  if (!storedUserData) return [];

  try {
    const userData = JSON.parse(storedUserData);
    return userData?.profile?.["cognito:groups"] || [];
  } catch (error) {
    console.error("Error parsing Cognito user data:", error);
    return [];
  }
};

export const hasAdminRole = () => {
  const roles = getUserRoles();
  return roles.includes("admin");
};