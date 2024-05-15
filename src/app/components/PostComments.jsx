import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchCommentsForPost } from "../../app/services/commentsService";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("Usuario Anónimo");

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchCommentsForPost(postId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [postId]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const storedUsername = sessionStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const author = {
      id: sessionStorage.getItem("userId"),
      name: username,
      email: sessionStorage.getItem("email"),
    };

    const response = await fetch(
      `http://localhost:1337/api/comments/api::post.post:${postId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          postId,
          content: newComment,
          author,
        }),
      },
    );

    const data = await response.json();
    setComments([...comments, data]);
    setNewComment("");
  };

  return (
    <Box>
      {comments.map((comment) => (
        <Box key={comment.id}>
          <Typography variant="subtitle1">{comment.author.name}</Typography>
          <Typography variant="body1">
            {new Date(comment.createdAt).toLocaleString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>

          <Typography variant="body1">{comment.content}</Typography>
        </Box>
      ))}
      {sessionStorage.getItem("token") ? (
        <form onSubmit={handleCommentSubmit}>
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            label="Comentar"
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Publicar
          </Button>
        </form>
      ) : null}
    </Box>
  );
};

export default PostComments;
