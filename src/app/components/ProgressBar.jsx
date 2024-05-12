import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      );
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={2} direction="row">
        <CircularProgress variant="determinate" value={25} />
        <CircularProgress variant="determinate" value={50} />
        <CircularProgress variant="determinate" value={75} />
        <CircularProgress variant="determinate" value={100} />
        <CircularProgress variant="determinate" value={progress} />
      </Stack>
    </Box>
  );
};

export default ProgressBar;
