import { Box, Button, Container, Typography } from "@mui/material";
import { Fragment } from "react";
import ProgressBar from "./ProgressBar";

const PostFull = ({ post }) => {
  if (!post) {
    return <ProgressBar />;
  }

  const imageUrl = post.attributes.image.data.attributes.url;

  return (
    <Container maxWidth="lg">
      <Box>
        <Box>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ mt: 3, textAlign: "center", fontWeight: "bold" }}
          >
            {post.attributes.title}
          </Typography>
          <Box sx={{ width: "100%", height: "auto", marginBottom: "20px" }}>
            <img
              src={`http://localhost:1337${imageUrl}`}
              alt={post.attributes.title}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
                borderRadius: "10px",
              }}
            />
          </Box>
        </Box>
        <Box>
          <Box sx={{ textTransform: "capitalize", color: "#333" }}>
            <Typography variant="body1">
              {new Date(post.attributes.created).toLocaleString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Por: {post.attributes.author}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                lineHeight: "1.6",
                fontSize: "16px",
                textAlign: "left",
              }}
            >
              {post.attributes.content.map((paragraph, index) => {
                return (
                  <Fragment key={index}>
                    {paragraph.children.map((child, childIndex) => {
                      return <p key={childIndex}>{child.text}</p>;
                    })}
                  </Fragment>
                );
              })}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          border: "1px solid #333",
          padding: "20px",
          my: "30px",
          borderRadius: "8px",
          overflow: "visible",
          maxHeight: "200px",
          wordWrap: "break-word",
          whiteSpace: "normal",
          lineHeight: "1.6",
          flexGrow: 1,
        }}
      >
        <Typography variant="body1">{post.attributes.comment}</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Responder
        </Button>
      </Box>
    </Container>
  );
};

export default PostFull;
