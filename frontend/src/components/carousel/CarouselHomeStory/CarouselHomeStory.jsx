import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardStory from "../../Cards/cardStory/CardStory.jsx";
import "./CarouselHomeStory.scss";

import chaval from "../../../assets/post/cheval.jpg";
import requin from "../../../assets/post/requin.jpg";
import maldive from "../../../assets/post/maldives.jpg";
import noel from "../../../assets/post/noel.jpg";
import CustomRightArrowComment from "../../CustomCarousel/CustomCarouselComment/CustomRightArrowComment.jsx";
import CustomLeftArrowComment from "../../CustomCarousel/CustomCarouselComment/CustomLeftArrowComment.jsx";

const CarouselHomeStory = () => {
  const stories = [
    {
      image: chaval,
      date: "12/12/2022",
      author: "Oceane",
      title: "Histoire de cheval",
    },
    {
      image: requin,
      date: "12/12/2022",
      author: "Oceane",
      title: "Aventure sous-marine",
    },
    {
      image: maldive,
      date: "12/12/2022",
      author: "Oceane",
      title: "Vacances aux Maldives",
    },
    {
      image: noel,
      date: "12/12/2022",
      author: "Oceane",
      title: "Joyeux Noël à tous!",
    },
    {
      image: chaval,
      date: "12/12/2022",
      author: "Oceane",
      title: "Encore une histoire de cheval",
    },
    {
      image: requin,
      date: "12/12/2022",
      author: "Oceane",
      title: "Plongée avec les requins",
    },
  ];

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 8000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    desktopSmall: {
      breakpoint: { max: 1200, min: 1040 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1040, min: 950 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 949, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="carousel-container">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customRightArrow={<CustomRightArrowComment />}
        customLeftArrow={<CustomLeftArrowComment />}
        className="carousel"
      >
        {stories.map((story, index) => (
          <CardStory
            key={index}
            image={story.image}
            title={story.title}
            date={story.date}
            author={story.author}
            className="card-story"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselHomeStory;
