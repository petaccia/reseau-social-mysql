import React from "react";
// import { BiComment, BiShare } from "react-icons/bi";
import Card from "react-bootstrap/Card";
// import InputGroup from "react-bootstrap/InputGroup";
// import FormControl from "react-bootstrap/FormControl";
import "./CardPost.scss";
import LikeButton from "../../UI/LikeButton/LikeButton.jsx";
import CommentButton from "../../UI/CommentButton/CommentButton.jsx";
import ShareButton from "../../UI/ShareButton/ShareButton.jsx";

const CardPost = ({ post }) => {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  // const handleChangeTitle = (e) => {
  //   setTitle(e.target.value);
  // };

  // const handleChangeContent = (e) => {
  //   setContent(e.target.value);
  // };

  return (
    <Card className="cardPost w-50  border rounded-4  ">
      <Card.Img variant="top" className="cardPost-image rounded-top-4" src={post.image} />
      <Card.Body className="cardPost-body border-bottom border-top ">
        <Card.Title className="cardPost-title text-primary fs-2 text-center ">
          {post.title}
        </Card.Title>
        <Card.Text className="cardPost-content text-secondary fs-4 text-center">
          {post.content}
        </Card.Text>
        <Card.Text className="cardPost-container-infoUser d-flex justify-content-around text-">
          <Card.Text className="cardPost-date text-secondary">
            {post.date}
          </Card.Text>
          <Card.Text className="cardPost-user text-secondary">
            {post.user}
          </Card.Text>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-around text-primary">
        <LikeButton />
        <CommentButton />
        <ShareButton />
      </Card.Footer>
    </Card>
  );
};

export default CardPost;
