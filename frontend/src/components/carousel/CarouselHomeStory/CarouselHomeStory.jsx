import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardStory from "../../Cards/cardStory/CardStory.jsx";
import CustomCarousel from "../Carousel.jsx";
import styles from "./CarouselHomeStory.module.scss";

import chaval from "../../../assets/post/cheval.jpg";
import requin from "../../../assets/post/requin.jpg";
import maldive from "../../../assets/post/maldives.jpg";
import noel from "../../../assets/post/noel.jpg";
import CustomLeftArrowStory from "../../CustomCarousel/CustomCarouselHomeStory/CustomLeftArrowStory.jsx";
import CustomRightArrowStory from "../../CustomCarousel/CustomCarouselHomeStory/CustomRightArrowStory .jsx";

const CarouselHomeStory = () => {
  const stories = [
    {
      image: chaval,
      date: "12/12/2022",
      author: "Oceane",
    },
    {
      image: requin,
      date: "12/12/2022",
      author: "Oceane",
    },
    {
      image: maldive,
      date: "12/12/2022",
      author: "Oceane",
    },
    {
      image: noel,
      date: "12/12/2022",
      author: "Oceane",
    },
    {
      image: chaval,
      date: "12/12/2022",
      author: "Oceane",
    },
    {
      image: requin,
      date: "12/12/2022",
      author: "Oceane",
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <div className={styles.home}>
            <CustomCarousel
              customLeftArrow={<CustomLeftArrowStory />}
              customRightArrow={<CustomRightArrowStory />}
            >
              {stories.map((story, index) => (
                <CardStory
                  key={index}
                  image={story.image}
                  date={story.date}
                  author={story.author}
                />
              ))}
            </CustomCarousel>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CarouselHomeStory;
