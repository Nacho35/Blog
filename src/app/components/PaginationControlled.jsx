import { Typography, Pagination, Stack } from "@mui/material";

const PaginationControlled = ({ page, setPage, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack
      sx={{
        pt: 6,
        color: "white.main",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      spacing={2}
    >
      <Typography>Página: {page}</Typography>
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationControlled;
