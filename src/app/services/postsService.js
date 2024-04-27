import { API_URL, STRAPI_URL } from "../config";

export async function fetchPosts(page = 1, pageSize = 6) {
  try {
    const res = await fetch(
      `${API_URL}/posts?populate=*&pagination[start]=${(page - 1) * pageSize}&pagination[limit]=${pageSize}`,
    );
    if (!res.ok) {
      throw new Error("Oops! Something went wrong");
    }
    const { data, meta } = await res.json();

    const formattedData = data.map((post) => ({
      ...post,
      attributes: {
        ...post.attributes,
        image: post.attributes.image || { data: [] },
      },
    }));

    const totalPages = Math.ceil(meta.pagination.total / pageSize);

    return { posts: formattedData, totalPages };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], totalPages: 0 };
  }
}

export async function getImages(imageData) {
  try {
    if (imageData && imageData.url) {
      return `${STRAPI_URL}${imageData.url}`;
    }
    return null;
  } catch (error) {
    console.error("Error in getImages:", error);
    return null;
  }
}
