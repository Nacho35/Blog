"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import PaginationControlled from "./PaginationControlled";
import { fetchPosts, getImages } from "../services/postsService";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchPosts(page, 6);
        if (!Array.isArray(response.posts)) {
          console.error("La respuesta de la API no es un array");
          return;
        }
        const postsWithImages = await Promise.all(
          response.posts.map(async (post) => {
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
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    loadPosts();
  }, [page]);

  return (
    <div className="tw-container tw-flex tw-flex-col tw-p-6 tw-items-center tw-mx-auto md:tw-grid md:tw-grid-cols-2 md:tw-gap-4 md:tw-p-6 lg:tw-grid lg:tw-grid-cols-2 lg:tw-gap-4 lg:tw-p-6 xl:tw-grid xl:tw-grid-cols-3 xl:tw-gap-4 xl:tw-p-6 tw-text-left">
      {posts.map((post) => (
        <Card
          key={post.id}
          sx={{
            maxWidth: 380,
            mt: 1,
            mb: 1,
            mx: "auto",
            backgroundColor: "shaft.main",
            border: "1px solid #fff",
            minHeight: "300px",
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={post.attributes.imageUrl}
            alt="cover"
            className="tw-object-cover"
          />
          <CardContent
            sx={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "white.main" }}
            >
              {post.attributes.title}
            </Typography>
            <Typography variant="body3" sx={{ color: "white.main" }}>
              {new Date(post.attributes.created).toLocaleString("es-ES", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Typography>
            <Typography variant="body2" sx={{ my: 2, color: "white.main" }}>
              {post.attributes.content}
            </Typography>
          </CardContent>
          <Link href={`/post/${post.id}`}></Link>
        </Card>
      ))}
      <PaginationControlled
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Main;
