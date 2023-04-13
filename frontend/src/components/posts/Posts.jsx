import "./posts.scss";
import Post from "@components/post/Post";

const Posts = () => {
  const posts = [
    {
      id: 1,
      name: "Leo",
      userId: 1,
      profilPic:
        "https://pixabay.com/get/g2341efde849d403337e168e78848d3084977f3279c14b0b202302716403f0db2507eaacd2a82c682934c5c74a8d60ae03a7361cdbb5b36289940217dfdd6cc265909ac99908bb4953e524aff4742703c_1920.jpg",
      desc:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, ullam cum maxime, veritatis itaque iusto reiciendis alias, nulla labore laboriosam provident sunt consequatur aspernatur repellendus veniam vero quaerat. Dolorem, sit. Minima eius esse nihil officia? Eum quam reprehenderit repellat praesentium?",
      img: "https://pixabay.com/get/g2b4da55b799dbe90741e633c07f4052b03a2c76cc0b23e120c8175ec6532eba83eaaf5f9ee36b78880d4b68f955e363ddda264ac6d66cb7a8c47ff7c3797838e32eb6b6bd7c421a2247293988e42975d_1920.jpg",
    },
    {
      id: 2,
      name: "Laure",
      userId: 2,
      profilPic:
        "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
      desc:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio, ullam cum maxime, veritatis itaque iusto reiciendis alias, nulla labore laboriosam provident sunt consequatur aspernatur repellendus veniam vero quaerat. Dolorem, sit. Minima eius esse nihil officia? Eum quam reprehenderit repellat praesentium?",
      img: "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
    },
  ];
  return (
    <div className="posts">
      {posts.map((post) => (
         <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
