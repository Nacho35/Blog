import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo.png";

const Banner = () => {
  return (
    <Container maxWidth="xs">
      <Box>
        <Box className="tw-h-[5vh] tw-bg-transparent"></Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ textAlign: "center" }}
          >
            <Image
              src={logo}
              alt="logo"
              priority
              className="tw-max-w-full tw-max-h-full tw-object-cover tw-object-center"
            />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Banner;
