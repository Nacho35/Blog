import { API_URL, STRAPI_URL } from "../config";

export async function fetchPosts() {
	try {
		const res = await fetch(`${API_URL}/posts?populate=*`);
		if (!res.ok) {
			throw new Error("Oops! Something went wrong");
		}
		const { data } = await res.json();

		const formattedData = data.map((post) => ({
			...post,
			attributes: {
				...post.attributes,
				image: post.attributes.image || { data: [] },
			},
		}));

		// console.log(formattedData);
		return formattedData;
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function getImages(imageData) {
	try {
		// console.log("Data received:", imageData);
		if (imageData && imageData.url) {
			return `${STRAPI_URL}${imageData.url}`;
		}
		return null;
	} catch (error) {
		console.error("Error in getImages:", error);
		return null;
	}
}
