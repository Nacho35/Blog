"use client";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { fetchPosts, getImages } from "../services/postsService";
import PaginationControlled from "./PaginationControlled";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        gap: 2,
      }}
    >
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Link href={`/post/${post.attributes.slug}`}>
              <Card
                sx={{
                  maxWidth: 400,
                  height: "500px",
                  mt: 1,
                  mb: 1,
                  mx: "auto",
                  backgroundColor: "white.main",
                }}
                uuid={post.attributes.uuid}
              >
                <CardActionArea style={{ padding: 0 }}>
                  <CardMedia
                    component="img"
                    image={post.attributes.imageUrl}
                    alt="cover"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
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
                      sx={{ color: "dark.main" }}
                    >
                      {post.attributes.title}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{ color: "shaft.main", textTransform: "capitalize" }}
                    >
                      {new Date(post.attributes.created).toLocaleString(
                        "es-ES",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        my: 2,
                        color: "shaft.main",
                        fontSize: "16px",
                        lineHeight: "1.5",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {post.attributes.content.map((paragraph, index) => {
                        return (
                          <Fragment key={index}>
                            {paragraph.children.map((child, childIndex) => {
                              return (
                                <Fragment key={childIndex}>
                                  {child.text}
                                </Fragment>
                              );
                            })}
                          </Fragment>
                        );
                      })}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          maxWidth: "md",
          py: 2,
        }}
      >
        <PaginationControlled
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Box>
    </Box>
  );
};

export default Main;
