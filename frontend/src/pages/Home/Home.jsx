import React from "react";
import styles from "./Home.module.scss";
import CardPost from "../../components/Cards/cardPost/CardPost.jsx";
import cheval from "../../assets/post/cheval.jpg";
import requin from "../../assets/post/requin.jpg";
import maldive from "../../assets/post/maldives.jpg";
import noel from "../../assets/post/noel.jpg";
import CardStory from "@components/Cards/cardStory/CardStory";

const Home = () => {
  const posts = [
    { id: 1, title: "balade en cheval", content: "Content 1", image: cheval },
    { id: 2, title: "Post 2", content: "Content 2", image: requin },
    { id: 3, title: "Post 3", content: "Content 3", image: maldive },
    { id: 4, title: "Post 4", content: "Content 4", image: noel },
  ];

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Story</h1>
      <CardStory 
      image="https://picsum.photos/200/300"
      date="12/12/2022"
      author="Oceane"
      />
      {posts.map((post) => (
        <CardPost
          key={post.id}
          title={post.title}
          content={post.content}
          image={post.image}
        />
      ))}
    </div>
  );
};

export default Home;
