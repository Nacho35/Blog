import { Box, Button, Container, TextField } from "@mui/material";
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
    <Container
      maxWidth="false"
      sx={{
        backgroundImage: "url(/palms.jpg)",
        objectFit: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
            textTransform: "capitalize",
          }}
        >
          ¡Bienvenido! crea tu cuenta
        </h2>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "50%",
            }}
          >
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
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            width="50%"
            sx={{ marginTop: "20px" }}
          >
            Registrarse
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default RegisterForm;
