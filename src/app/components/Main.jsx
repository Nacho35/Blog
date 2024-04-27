"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
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
        <Link
          href={`/post/${post.id}`}
          key={post.id}
          className="tw-no-underline"
        >
          <Card
            sx={{
              maxWidth: 380,
              height: "500px",
              mt: 1,
              mb: 1,
              mx: "auto",
              backgroundColor: "shaft.main",
              border: "1px solid #fff",
            }}
          >
            <CardActionArea style={{ padding: 0 }}>
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
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  lineHeight: "1.5",
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
                <Typography
                  variant="body3"
                  sx={{ color: "danger.main", textTransform: "capitalize" }}
                >
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
            </CardActionArea>
          </Card>
        </Link>
      ))}
      <div className="tw-flex-grow-0 tw-pt-20"></div>
      <div className="tw-fixed tw-bottom-0 tw-left-0 tw-right-0 tw-z-50 tw-bg-muted tw-flex tw-justify-center tw-items-center">
        <PaginationControlled
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default Main;
