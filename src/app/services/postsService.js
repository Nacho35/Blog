import { API_URL, STRAPI_URL } from "../config";

export async function fetchPosts() {
	const res = await fetch(`${API_URL}/posts?populate=*`);
	console.log(API_URL);
	if (!res.ok) {
		throw new Error("Oops! Something went wrong");
	}
	const { data } = await res.json();
	console.log(data);
	return data;
}

export async function getImages(imageData) {
	const imageUrl = data[0].attributes.image;
	console.log(imageUrl);
	return `${STRAPI_URL}${imageUrl}`;
}
