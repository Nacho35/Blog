import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-hot-toast";

const ChangePassword = ({ resetToken }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrors("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, code: resetToken }),
        },
      );
      if (response.ok) {
        toast.success("Contraseña cambiada con éxito");
      } else {
        const errorData = await response.json();
        setErrors(errorData.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      setErrors("Error al cambiar la contraseña");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography
        component="h1"
        variant="h5"
        sx={{
          textAlign: "center",
          mt: 3,
          mb: 2,
          fontWeight: "bold",
          fontSize: "24px",
          color: "primary.main",
          textTransform: "capitalize",
          letterSpacing: "2px",
          cursor: "default",
        }}
      >
        restablecer contraseña
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="new-password"
          label="Nueva contraseña"
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
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Cambiar contraseña
        </Button>
      </Box>
    </Container>
  );
};

export default ChangePassword;
