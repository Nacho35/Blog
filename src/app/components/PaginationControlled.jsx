import { Pagination, Stack } from "@mui/material";

const PaginationControlled = ({ page, setPage, totalPages }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="tw-static tw-bottom-0 tw-left-0 tw-w-full">
      <div className="tw-container tw-mx-auto">
        <Stack
          sx={{
            width: "100%",
            paddingTop: "1rem",
            direction: "column",
            alignItems: "center",
          }}
          spacing={2}
        >
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default PaginationControlled;
