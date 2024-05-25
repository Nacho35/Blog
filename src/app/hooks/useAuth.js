import { useEffect, useState } from "react";

export const useAuth = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(
          Buffer.from(token.split(".")[1], "base64").toString(),
        );
        setUsername(decodedToken.username);
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    }
  }, []);

  return username;
};
