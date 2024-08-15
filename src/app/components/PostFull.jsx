import { Box, Container, Typography } from "@mui/material";
import { Fragment } from "react";
import { CustomTypography } from "./CustomText";
import PostComments from "./PostComments";
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
            <CustomTypography
              variant="body2"
              sx={{
                mt: 2,
                lineHeight: "1.6",
                fontSize: "16px",
                textAlign: "left",
                fontWeight: "semi-bold",
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
            </CustomTypography>
          </Box>
        </Box>
      </Box>
      <Box>
        <PostComments postId={post.id} />
      </Box>
    </Container>
  );
};

export default PostFull;
