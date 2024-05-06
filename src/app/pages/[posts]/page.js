import PostFull from "../../components/PostFull";
import { useRouter } from "next/router";
import { fetchPostBySlug } from "../../services/postsService";
import { useEffect, useState } from "react";

const PostPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug).then(setPost);
    }
  }, [slug]);

  if (!post) {
    router.push("/error");
    return null;
  }

  return <PostFull post={post} />;
};

export default PostPage;
