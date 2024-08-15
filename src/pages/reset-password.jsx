import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { code } = router.query;

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    if (!code) {
      toast.error("No se encontró el token de restablecimiento.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:1337/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            password: newPassword,
            passwordConfirmation: confirmPassword,
          }),
        },
      );

      if (response.ok) {
        toast.success("Contraseña cambiada con éxito");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      toast.error("Error al cambiar la contraseña");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ my: 8, textAlign: "center" }}>
        <Typography
          variant="h4"
          color={"primary.main"}
          fontWeight={"bold"}
          gutterBottom
        >
          Restablecer Contraseña
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="new-password"
          label="Nueva Contraseña"
          name="newPassword"
          type="password"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirm-password"
          label="Confirmar Contraseña"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleChangePassword}
          sx={{ mt: 3, mb: 2 }}
        >
          Cambiar Contraseña
        </Button>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default ResetPassword;
