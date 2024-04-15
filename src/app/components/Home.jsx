"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "flowbite-react";
import { fetchPosts, getImages } from "../services/postsService";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPosts();
        const postsWithImages = await Promise.all(
          data.map(async (post) => {
            const imageUrl = post.attributes.image.data.attributes.url
              ? await getImages({
                  url: post.attributes.image.data.attributes.url,
                })
              : null;
            return {
              ...post,
              attributes: {
                ...post.attributes,
                imageUrl,
              },
            };
          }),
        );
        setPosts(postsWithImages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col m-auto p-4 lg:flex-row lg:flex lg:justify-between">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 my-5 m-auto"
          renderImage={() => (
            <img
              className="w-full h-64 object-cover"
              src={post.attributes.imageUrl}
              alt="cover"
            />
          )}
        >
          <Link href={`/post/${post.id}`}>
            <div className="m-auto flex-grow">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-pretty">
                {post.attributes.title}
              </h5>
            </div>
            <div className="flex-grow">
              <p className="text-sm font-normal text-yellow-700 dark:text-gray-400 my-4 capitalize">
                {new Date(post.attributes.created).toLocaleString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="flex-grow">
              <p className="font-normal text-balance text-gray-700 dark:text-gray-400">
                {post.attributes.content}
              </p>
            </div>
          </Link>
        </Card>
      ))}
    </main>
  );
};

export default Home;
