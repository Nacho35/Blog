export const getAuthenticatedUsername = () => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return "Usuario Anónimo";
  }
  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  return decodedToken.username;
};
