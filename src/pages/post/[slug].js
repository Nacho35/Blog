import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PostFull from "../../app/components/PostFull";
import { fetchPostBySlug } from "../../app/services/postsService";

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug)
        .then(setPost)
        .catch(() => setError(true));
    }
  }, [slug]);

  if (error) {
    return <div>Error al cargar el post.</div>;
  }

  return post ? <PostFull post={post} /> : null;
};

export default PostPage;
