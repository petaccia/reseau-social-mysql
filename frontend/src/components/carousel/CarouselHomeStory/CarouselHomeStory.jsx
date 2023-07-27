import React from 'react'
import CardStory from '../../Cards/cardStory/CardStory';

import CustomCarousel from '../Carousel';
import styles from './CarouselHomeStory.module.scss';


import chaval from '../../../assets/post/cheval.jpg';
import requin from '../../../assets/post/requin.jpg';
import maldive from '../../../assets/post/maldives.jpg';
import noel from '../../../assets/post/noel.jpg';
import CustomLeftArrowStory from '@components/CustomCarousel/CustomCarouselHomeStory/CustomLeftArrowComment';
import CustomRightArrowStory from '@components/CustomCarousel/CustomCarouselHomeStory/CustomRightArrowComment c';
const CarouselHomeStory = () => {

  const stories = [
    {
      image: chaval,
      date: '12/12/2022',
      author: 'Oceane',
    },
    {
      image: requin,
      date: '12/12/2022',
      author: 'Oceane',
    },
    {
      image: maldive,
      date: '12/12/2022',
      author: 'Oceane',
    },
    {
      image: noel,
      date: '12/12/2022',
      author: 'Oceane',
    },
    {
      image: chaval,
      date: '12/12/2022',
      author: 'Oceane',
    },
    {
      image: requin,
      date: '12/12/2022',
      author: 'Oceane',
    },
   
  ];
  return (
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
  )
}

export default CarouselHomeStory