import React from "react";
import "./stories.scss";

const Stories = () => {
  const stories = [
    {
      id: 1,
      name: "Leo",
      img: "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
    },
    {
      id: 2,
      name: "Leo",
      img: "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
    },
    {
      id: 2,
      name: "Leo",
      img: "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
    },
    {
      id: 2,
      name: "Leo ",
      img: "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
    },
  ];
  return (
   
      <div className="stories">
        {stories.map((story) => (
          <div className="story" key={story.id}>
            <div className="storyImg">
              <img src={story.img} alt="" />
            </div>
            <div className="spane">
              <span>{story.name}</span>
              <button>+</button>
            </div>
          </div>
        ))}
      </div>
   
  );
};

export default Stories;
