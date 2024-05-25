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

// TODO: Implementar la lógica de edicion y eliminacion de comentarios
