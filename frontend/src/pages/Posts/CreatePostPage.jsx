import React, { useContext } from "react";
import CreatePostForm from "../../components/Post/CreatePostForm.jsx";
import PostAddContext from "../../contexts/postAddContext/PostAddContext.jsx";

const CreatePostPage = () => {
  const { addPosts } = useContext(PostAddContext);
  return (
    <div>
      <CreatePostForm onAddPost={addPosts} />
    </div>
  );
};

export default CreatePostPage;
