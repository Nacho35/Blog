import { Pagination, Stack } from "@mui/material";

const PaginationControlled = ({ page, setPage, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack
      sx={{
        backgroundColor: "light.main",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: "8px",
      }}
      spacing={2}
    >
      <Pagination count={totalPages} page={page} onChange={handleChange} />
    </Stack>
  );
};

export default PaginationControlled;
