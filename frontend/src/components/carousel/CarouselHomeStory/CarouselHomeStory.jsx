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
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktopLarge: {
      breakpoint: { max: 3000, min: 2000 },
      items: 7,
    },
    desktopMedium: {
      breakpoint: { max: 2000, min: 1400 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1200 },
      items: 5,
    },
    desktopSmall: {
      breakpoint: { max: 1200, min: 1040 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1040, min: 869 },
      items: 4,
    },
    tabletSmall: {
      breakpoint: { max: 868, min: 768 },
      items: 3,
    },
    mobileLarge: {
      breakpoint: { max: 767, min: 576 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 576, min: 361 },
      items: 4,
    },
    mobileSmall: {
      breakpoint: { max: 360, min: 0 },
      items: 3,
    },

  };

  return (
    <div className="carousel-container">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        arrows={false}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        customRightArrow={<CustomRightArrowComment />}
        customLeftArrow={<CustomLeftArrowComment />}
        className="carousel ms-md-3"
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
