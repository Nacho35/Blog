import { Pagination } from "@mui/material";

const PaginationControlled = ({ page, setPage, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        showFirstButton
        showLastButton
        variant="outlined"
      />
    </div>
  );
};

export default PaginationControlled;
