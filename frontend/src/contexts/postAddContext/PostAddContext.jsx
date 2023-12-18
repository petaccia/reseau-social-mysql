import { createContext } from "react";

const PostAddContext = createContext({
  posts: [],
  addposts: () => {},
});

export default PostAddContext;
