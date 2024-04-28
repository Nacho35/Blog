import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../assets/logo.png";

const Banner = () => {
  return (
    <Container maxWidth="auto" className="tw-w-full tw-px-0">
      <Box sx={{ width: "100%", position: "relative" }}>
        <Box className="tw-object-cover tw-object-center tw-bg-no-repeat tw-w-full tw-h-[60vh] md:tw-h-[55vh] lg:tw-h-[50vh] tw-bg-tertiary"></Box>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white.main",
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
