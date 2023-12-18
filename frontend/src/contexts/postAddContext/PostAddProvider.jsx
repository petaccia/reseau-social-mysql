import { useState } from "react";
import PostAddContext from "./PostAddContext.jsx";

const PostAddProvider = ({ children }) => {
  const [posts, setPostAdd] = useState([]);

  const addPosts = (newPost) => {
    setPostAdd([...posts, newPost]);
  };
  return (
    <PostAddContext.Provider value={{ posts, addPosts }}>
      {children}
    </PostAddContext.Provider>
  );
};

export default PostAddProvider;
