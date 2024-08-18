/* eslint-disable no-shadow */
"use client";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { logout } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await toast.promise(logout(), {
        loading: "Procesando...",
        success: "Sesión cerrada",
        error: "Error al cerrar sesión",
      });
      setTimeout(() => {
        setIsAuthenticated(false);
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const AuthButtons = ({ isAuthenticated, isLoading }) => (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : !isAuthenticated ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            m: 1.5,
            gap: 3,
            fontWeight: "semi-bold",
          }}
        >
          <Button variant="contained" color="secondary" onClick={handleLogin}>
            Iniciar sesión
          </Button>
          <Button variant="contained" color="info" onClick={handleRegister}>
            Registrarse
          </Button>
        </Box>
      ) : (
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ m: 1.5, textWrap: "nowrap", fontWeight: "semi-bold" }}
        >
          Cerrar sesión
        </Button>
      )}
    </>
  );

  return (
    <AppBar
      position="absolute"
      className="tw-bg-transparent tw-border-none tw-bg-opacity-0 tw-shadow-none"
      sx={{ border: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              justifyContent: "flex-start",
              alignItems: "center",
              border: "2px solid #000",
              padding: "5px 10px",
            }}
            className="tw-text-black"
          >
            C&C <LocalCafeIcon sx={{ ml: 1 }} />
          </Typography>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: "column",
              justifyContent: "end",
              backgroundColor: "transparent",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
              sx={{ "&.MuiSvgIcon-root": { fontSize: "2.5rem" } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" }, padding: 0 }}
            >
              <AuthButtons
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              />
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <AuthButtons isAuthenticated={isAuthenticated} />
          </Box>
        </Toolbar>
      </Container>
      <Toaster position="top-center" reverseOrder={false} />
    </AppBar>
  );
};

export default Header;
