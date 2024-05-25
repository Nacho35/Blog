"use client";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const router = useRouter();
  const username = useAuth();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

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
            href="#app-bar-with-responsive-menu"
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
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
              sx={{
                "&.MuiSvgIcon-root": {
                  fontSize: "2.5rem",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!username
                ? [
                    <MenuItem key="login" onClick={handleLogin}>
                      <Typography textAlign="center">Iniciar sesión</Typography>
                    </MenuItem>,
                    <MenuItem key="register" onClick={handleRegister}>
                      <Typography textAlign="center">Registrarse</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="username" onClick={() => {}}>
                      <Typography textAlign="center">{username}</Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {!username ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mx: 1 }}
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ mx: 1 }}
                  onClick={handleRegister}
                >
                  Registrarse
                </Button>
              </>
            ) : (
              <Typography>{username}</Typography>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

// TODO: Agregar cambio de menu para usuarios logueados
