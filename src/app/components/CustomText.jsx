import { Typography } from "@mui/material";

export const CustomTypography = ({ children, sx, variant }) => {
  return (
    <Typography variant={variant} sx={sx} component="div">
      {children}
    </Typography>
  );
};
