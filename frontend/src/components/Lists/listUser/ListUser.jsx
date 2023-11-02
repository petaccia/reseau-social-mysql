import React from "react";
import CardUser from "../../Cards/cardUser/CardUser.jsx";
import "./ListUser.scss";

const ListUser = ({ users }) => {
  return (
    <div className=" listUserContainer d-flex flex-sm-row flex-md-column overflow-auto py-2 px-1 w-100">
      {users.map((user) => (
        <React.Fragment key={user.id}>
          <div
            className="cardMobileListUser  d-flex align-items-center ms-5 mr-3 p-1 bg-subtle border rounded-3 d-sm-flex d-md-none"
            style={{ boxShadow: "0px 10px 20px 0px #2aa6ff" }}
          >
            <div
              className="user-status mr-2 "
              style={{
                backgroundColor: user.isConnected ? "#28a745" : "#dc3545",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
              }}
            ></div>
            <img
              src={user.image}
              className="rounded-circle ms-2"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "cover",
                marginRight: "10px",
              }}
              alt="avatar"
            />
            <h2
              className="name ml-1 mb-0"
              style={{ fontSize: "14px", color: "#2aa6ff" }}
            >
              {user.name}
            </h2>
          </div>
          <div className="d-none d-md-flex">
            <CardUser user={user} />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ListUser;
