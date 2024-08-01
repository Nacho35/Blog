/* eslint-disable no-shadow */
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
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
import {
  fetchCommentsForPost,
  fetchDeleteComment,
  fetchUpdateComment,
} from "../../app/services/commentsService";

const PostComments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchCommentsForPost(postId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (event, commentId, postId) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      toast.error("No hay un token de autenticación válido.");
      return;
    }
    const userId = sessionStorage.getItem("userId");
    const username = sessionStorage.getItem("username");
    const email = sessionStorage.getItem("email");

    if (!userId || !username || !email) {
      toast.error("Faltan datos del usuario.");
      return;
    }

    const commentData = {
      postId,
      content: newComment,
      author: {
        id: userId,
        name: username,
        email: email,
      },
    };

    if (commentId) {
      // Actualiza comentario existente
      try {
        const updatedComment = await fetchUpdateComment(
          postId,
          commentId,
          newComment,
          userId,
        );
        if (updatedComment) {
          const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
              return { ...comment, content: newComment };
            }
            return comment;
          });
          setComments(updatedComments);
          setNewComment("");
          setEditingComment(null);
          toast.success("Comentario actualizado exitosamente!");
        }
      } catch (error) {
        toast.error(`Ocurrió un error: ${error.message}`);
      }
    } else {
      // Publica nuevo comentario
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
          toast.success("¡Comentario publicado!");
        }
      } catch (error) {
        toast.error(`Ocurrió un error: ${error.message}`);
      }
    }
  };

  const handleDeleteClick = async (postId, commentId, authorId) => {
    try {
      const deletedComment = await fetchDeleteComment(
        postId,
        commentId,
        authorId,
      );
      if (deletedComment) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId,
        );
        setComments(updatedComments);
        toast.success("Comentario eliminado!");
      }
    } catch (error) {
      toast.error("Ocurrió un error al intentar eliminar el comentario");
    }
  };

  return (
    <Container maxWidth="sx">
      <Paper elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #ddd" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Comentarios:
        </Typography>
        {comments.length === 0 ? (
          <Typography variant="body1" align="center" sx={{ marginTop: "20px" }}>
            ¡Au, sin comentarios por el momento!
          </Typography>
        ) : (
          <Box
            sx={{
              width: "100%",
              marginBottom: "2rem",
              margin: "0 auto",
            }}
          >
            {comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
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
                  sx={{
                    display: "flex",
                    alignItems: "right",
                    marginTop: "10px",
                    justifyContent: "space-between",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CommentRoundedIcon sx={{ marginRight: "10px" }} />
                    <Typography variant="body1">{comment.content}</Typography>
                  </Box>
                  {sessionStorage.getItem("token") &&
                    Number(comment.author.id) ===
                      Number(sessionStorage.getItem("userId")) && (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "end",
                        }}
                      >
                        <Button
                          variant="text"
                          onClick={() => {
                            setNewComment(comment.content);
                            setEditingComment(comment.id);
                          }}
                        >
                          <ModeEditOutlineRoundedIcon />
                        </Button>
                        <Button
                          variant="text"
                          color="error"
                          onClick={() =>
                            handleDeleteClick(
                              postId,
                              comment.id,
                              comment.author.id,
                            )
                          }
                        >
                          <DeleteRoundedIcon />
                        </Button>
                      </Box>
                    )}
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Paper>
      {sessionStorage.getItem("token") ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleCommentSubmit(event, editingComment, postId);
          }}
        >
          <TextField
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            label="Comentar"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{ marginBottom: "1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
          >
            {editingComment ? "Editar" : "Publicar"}
          </Button>
          <Toaster position="top-center" reverseOrder={false} />
        </form>
      ) : null}
    </Container>
  );
};

export default PostComments;
