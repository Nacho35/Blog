const PostFull = ({ post }) => {
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        src={post.attributes.image.data.attributes.url}
        alt={post.attributes.title}
        width={500}
        height={300}
      />
      <h1>{post.attributes.title}</h1>
      <h5>{post.attributes.createdAt}</h5>
      <p>{post.attributes.content}</p>
      <h3>{post.attributes.author}</h3>
    </div>
  );
};

export default PostFull;
