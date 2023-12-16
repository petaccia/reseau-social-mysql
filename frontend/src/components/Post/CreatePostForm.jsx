import React, { useState } from "react";

const CreatePostForm = ({ onAddpost }) => {
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    image: null,
    user: "",
    date: new Date().toDateString().split("T")[0],
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onAddpost(newPost);
    setNewPost({
      title: "",
      description: "",
      image: null,
      user: "",
      date: new Date().toDateString().split("T")[0],
    });
  };
  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewPost({ ...newPost, image: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div className="create-post">
      <h1 className="text-center text-primary">Create Post</h1>
      <div className="create-post-image mb-3 mt-3 p-3">
        {newPost.image && newPost.image !== "" ? (
          <img src={newPost.image} alt="" className="img-fluid w-100" />
        ) : (
          <img
            src="https://via.placeholder.com/300"
            alt=""
            className="img-fluid w-100"
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className="create-post-form mb-3 mt-3 p-3 ">
        <input
          type="file"
          onChange={handleImageChange}
          name="image"
          id="image"
          accept="image/*"
          required
          className="form-control mb-3 mt-3 image-input "
        />
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          value={newPost.title}
          required
          className="form-control mb-3 mt-3"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="description"
          value={newPost.description}
          required
          className="form-control mb-3 mt-3"
        />
        <input
          type="text"
          placeholder="User"
          onChange={handleChange}
          name="user"
          value={newPost.user}
          required
          className="form-control mb-3 mt-3"
        />
        <div className="d-flex justify-content-end">
          <p>{newPost.date}</p>
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Publier
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
