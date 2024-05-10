import { Button, TextField } from "@mui/material";
import { useState } from "react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Error al registrarse");
      }

      const data = await response.json();
      console.log(data); // Aquí puedes manejar la respuesta, por ejemplo, redirigir al usuario a otra página o mostrar un mensaje de éxito
    } catch (error) {
      console.error(error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Correo Electrónico"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Nombre de Usuario"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        fullWidth
        margin="normal"
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px" }}
      >
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;
