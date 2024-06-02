import { API_URL } from "../config";

export async function fetchCommentsForPost(postId) {
  try {
    const response = await fetch(
      `${API_URL}/comments/api::post.post:${postId}`,
    );
    if (!response.ok) {
      throw new Error(`Error fetching comments: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    return [];
  }
}

// TODO: Revisar porque falla el delete y el update

export const fetchDeleteComment = async (postId, commentId) => {
  try {
    const response = await fetch(
      `${API_URL}/comments/api::post.post${postId}/comment/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Error deleting comment: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    return null;
  }
};

export const fetchUpdateComment = async (
  postId,
  commentId,
  content,
  authorId,
) => {
  try {
    const response = await fetch(
      `${API_URL}/comments/api::post.post${postId}/comment/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          author: {
            id: authorId,
          },
          content: content,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Error updating comment: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar el comentario:", error);
  }
};
