import React from "react";
import CarouselHomeStory from "../../carousel/CarouselHomeStory/CarouselHomeStory.jsx";
import ListUser from "../../Lists/listUser/ListUser.jsx";
import "./HomeDesktop.scss";
import CardPost from "../../Cards/cardPost/CardPost.jsx";
import cheval from "../../../assets/post/cheval.jpg";
import requin from "../../../assets/post/requin.jpg";
import maldive from "../../../assets/post/maldives.jpg";
import noel from "../../../assets/post/noel.jpg";

const HomeDesktop = () => {
  const posts = [
    {
      id: 1,
      title: "balade en cheval",
      content: "la balade en cheval au pays des chevaux",
      image: cheval,
      user: "Oceane",
      date: "12/12/2022",
    },
    {
      id: 2,
      title: "balade en mer",
      content: "la balade en mer au pays des requins",
      image: requin,
      user: "Oceane",
      date: "12/12/2022",
    },
    {
      id: 3,
      title: "Les vacances aux Maldives",
      content: "Super vacances aux Maldives",
      image: maldive,
      user: "Oceane",
      date: "12/12/2022",
    },
    {
      id: 4,
      title: "Joyeux Noël à tous!",
      content: "C'est bon c'est parfait le Noël en famille",
      image: noel,
      user: "Oceane",
      date: "12/12/2022",
    },
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
    <div className="desktop">
      <div className="home">
        <div className="posts">
          <h1 className="title">Story</h1>
          <div className="carousel">
            <CarouselHomeStory />
          </div>
          {posts.map((post) => (
            <CardPost key={post.id} post={post} />
          ))}
        </div>
        <div className="usersList">
          <ListUser users={users} />
        </div>
      </div>
    </div>
  );
};

export default HomeDesktop;
