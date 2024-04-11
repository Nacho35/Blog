"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPosts, getImages } from "../services/postsService";

const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await fetchPosts();
				const postsWithImages = data.map((post) => ({
					...post,
					attributes: {
						...post.attributes,
						imageUrl: getImages(post.attributes.image),
					},
				}));
				setPosts(postsWithImages);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			{posts.map((post, id) => {
				const { title, content, imageUrl } = post.attributes;
				return (
					<Link key={id} href={`/post/${id}`}>
						<a>
							<img src={imageUrl} alt="cover" />
							<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
								{title}
							</h5>
							<p className="font-normal text-gray-700 dark:text-gray-400">
								{content}
							</p>
						</a>
					</Link>
				);
			})}
		</main>
	);
};

export default Home;
