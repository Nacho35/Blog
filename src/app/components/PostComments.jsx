import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { fetchCommentsForPost } from "../../app/services/commentsService";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchCommentsForPost(postId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("No hay un token de autenticación válido.");
      return;
    }

    const commentData = {
      postId,
      content: newComment,
      author: {
        id: sessionStorage.getItem("userId"),
        name: sessionStorage.getItem("username"),
        email: sessionStorage.getItem("email"),
      },
    };

    try {
      const response = await fetch(
        `http://localhost:1337/api/comments/api::post.post:${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          body: JSON.stringify(commentData),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        setComments([...comments, responseData]);
        setNewComment("");
      }
      toast.success("¡Comentario publicado exitosamente!");
    } catch (error) {
      toast.error(`Ocurrió un error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 2, mb: 2, border: "2px solid #333" }}>
        <Typography variant="h6">Comentarios:</Typography>
        {comments.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ marginTop: "20px" }}>
            ¡Au, sin comentarios por el momento!
          </Typography>
        ) : (
          comments.map((comment) => (
            <Box
              key={comment.id}
              sx={{
                display: "flex",
                alignItems: "left",
                flexDirection: "column",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "info.main",
                }}
              >
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  variant="subtitle1"
                >
                  {comment.author.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ marginLeft: "8px", color: "info.main" }}
                >
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "right", marginTop: "10px" }}
              >
                <Typography variant="body1">{comment.content}</Typography>
              </Box>
              {sessionStorage.getItem("token") && (
                <>
                  <Button variant="text">Editar</Button>
                  <Button variant="text" color="error">
                    Eliminar
                  </Button>
                </>
              )}
            </Box>
          ))
        )}
      </Paper>
      {sessionStorage.getItem("token") ? (
        <form onSubmit={handleCommentSubmit}>
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            label="Comentar"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            Publicar
          </Button>
          <Toaster position="top-center" reverseOrder={false} />
        </form>
      ) : null}
    </Container>
  );
};

export default PostComments;
// TODO: Mejorar la UI de los comentarios
