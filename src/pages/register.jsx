import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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

      if (response.ok) {
        toast.success("Registro exitoso Ahora puedes iniciar sesión.");
        setTimeout(() => {
          router.push("/login");
        }, 4000);
      } else {
        const errorData = await response.json();
        toast.error(
          `Hubo un error durante el registro: ${errorData.message || "Por favor, inténtalo de nuevo."}`,
        );
      }
    } catch (error) {
      toast.error(
        "Hubo un error durante el registro. Por favor, inténtalo de nuevo.",
      );
    }
  };

  return (
    <Container
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #333",
          backgroundColor: "#F0EADA",
          maxWidth: "500px",
          maxHeight: "500px",
          py: 5,
          margin: "auto",
        }}
      >
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontWeight: "600",
                mb: 2,
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Blog Codigo & Cafe
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto, sans-serif",
                mb: 2,
              }}
            >
              Crea una cuenta gratis o
              <Link sx={{ ml: 1 }} href="http://localhost:3000/login">
                inicia sesión
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "80%",
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
              onClick={handleSubmit}
            >
              Registrarse
            </Button>
            <Toaster position="top-center" reverseOrder={false} />
          </Box>
        </FormControl>
      </Container>
    </Container>
  );
};

export default RegisterForm;
