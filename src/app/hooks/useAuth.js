import { useEffect, useState } from "react";

export const useAuth = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = JSON.parse(
          Buffer.from(storedToken.split(".")[1], "base64").toString(),
        );
        setUsername(decodedToken.username);
        setToken(storedToken);
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    }
  }, []);

  const login = (newUsername, newToken) => {
    setUsername(newUsername);
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      try {
        setUsername("");
        setToken("");
        sessionStorage.removeItem("token");
        sessionStorage.clear();
        resolve();
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        reject(error);
      }
    });
  };

  return { username, token, login, logout };
};
