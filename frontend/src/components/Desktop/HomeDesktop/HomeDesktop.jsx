import React from "react";
import "./HomeDesktop.scss";

import { Col, Container, Row } from "react-bootstrap";
import cheval from "../../../assets/post/cheval.jpg";
import requin from "../../../assets/post/requin.jpg";
import maldive from "../../../assets/post/maldives.jpg";
import noel from "../../../assets/post/noel.jpg";
import CarouselHomeStory from "../../carousel/CarouselHomeStory/CarouselHomeStory.jsx";
import CardPost from "../../Cards/cardPost/CardPost.jsx";
import ListUser from "../../Lists/listUser/ListUser.jsx";

const HomeDesktop = () => {
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
    <Container fluid className="home-desktop">
      <Row>
        <Col xs={12} lg={8} className="story-column">
          <h1 className="title">Story</h1>
          <div className="carousel">
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
        </Col>
        <Col xs={12} lg={4} className="users-column border">
          <h1 className="title">Users</h1>
          <div className="list-user">
            <ListUser users={users} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default HomeDesktop;
