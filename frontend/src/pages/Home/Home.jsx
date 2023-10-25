import React from "react";
import CarouselHomeStory from "../../components/carousel/CarouselHomeStory/CarouselHomeStory.jsx";
import ListUser from "../../components/Lists/listUser/ListUser.jsx";
import styles from "./Home.module.scss";
import CardPost from "../../components/Cards/cardPost/CardPost.jsx";
import cheval from "../../assets/post/cheval.jpg";
import requin from "../../assets/post/requin.jpg";
import maldive from "../../assets/post/maldives.jpg";
import noel from "../../assets/post/noel.jpg";

const Home = () => {
  const posts = [
    { id: 1, title: "balade en cheval", content: "Content 1", image: cheval },
    { id: 2, title: "Post 2", content: "Content 2", image: requin },
    { id: 3, title: "Post 3", content: "Content 3", image: maldive },
    { id: 4, title: "Post 4", content: "Content 4", image: noel },
  ];

  const users = [
    {
      id: 1,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 9,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 10,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 11,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
  ];

  return (
    <div className={styles.desktop}>
      <div className={styles.home}>
        <div className={styles.posts}>
          <h1 className={styles.title}>Story</h1>
          <div className={styles.carousel}>
            <CarouselHomeStory />
          </div>
          {posts.map((post) => (
            <CardPost
              key={post.id}
              title={post.title}
              content={post.content}
              image={post.image}
            />
          ))}
        </div>
        <div className={styles.userList}>
          <ListUser users={users} />
        </div>
      </div>
    </div>


  );
};

export default Home;
