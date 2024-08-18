import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setIdentifier(storedEmail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
    if (response.ok) {
      try {
        const responseData = await response.json();
        sessionStorage.setItem("token", responseData.jwt);
        sessionStorage.setItem("userId", responseData.user.id);
        sessionStorage.setItem("username", responseData.user.username);
        sessionStorage.setItem("email", responseData.user.email);

        if (rememberMe) {
          localStorage.setItem("userEmail", responseData.user.email);
        }

        toast.success("¡Bienvenido!");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } catch (error) {
        toast.error("Error al iniciar sesión");
      }
    } else {
      toast.error("Credenciales incorrectas");
    }
  };

  const clearRememberMe = () => {
    localStorage.removeItem("userEmail");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Dirección de correo electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                color="primary"
              />
            }
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          <Box sx={{ textAlign: "center" }}>
            <Button
              size="small"
              onClick={clearRememberMe}
              sx={{
                my: 1,
              }}
            >
              Dejar de recordarme
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link
                href="/forgot-password"
                variant="body2"
                sx={{ cursor: "pointer" }}
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2" sx={{ cursor: "pointer" }}>
                {"¿No tienes una cuenta?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default Login;
