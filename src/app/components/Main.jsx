"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { fetchPosts, getImages } from "../services/postsService";

const Main = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
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

    loadPosts();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between">
      {posts.map((post) => (
        <Card key={post.id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image={post.attributes.imageUrl}
            alt="cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.attributes.title}
            </Typography>
            <Typography variant="body3" color="secondary">
              {new Date(post.attributes.created).toLocaleString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body2" color="dark" sx={{ my: 2 }}>
              {post.attributes.content}
            </Typography>
          </CardContent>
          <Link href={`/post/${post.id}`}></Link>
        </Card>
      ))}
    </div>
  );
};

export default Main;