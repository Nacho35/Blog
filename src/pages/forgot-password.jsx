/* eslint-disable no-shadow */
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendResetPasswordRequest = async () => {
    if (!validateEmail(email)) {
      toast.error("Por favor ingrese un email válido.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:1337/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      if (response.ok) {
        toast.success(
          "Se ha enviado un correo electrónico para restablecer su contraseña",
        );
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Error al enviar el correo electrónico",
        );
      }
    } catch (error) {
      toast.error("Error al enviar el correo electrónico");
    }
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          color={"primary.main"}
          fontWeight={"bold"}
          gutterBottom
        >
          Olvidé mi contraseña
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Correo Electrónico"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={sendResetPasswordRequest}
          sx={{ mt: 3, mb: 2 }}
        >
          Enviar Solicitud
        </Button>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default ForgotPassword;
