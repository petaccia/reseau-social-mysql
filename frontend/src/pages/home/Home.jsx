import React from "react";
import Posts from "@components/posts/Posts";
import Stories from "@components/stories/Stories";

function Home() {
  return (
    <section>
      <div className="stories">
        <Stories />
      </div>
      <div className="posts">
        <Posts />
      </div>
    </section>
  );
}

export default Home;
