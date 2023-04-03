import React from "react";
import "./rightBar.scss";
import leo from "@assets/leo.jpg";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="items">
          <span>Suggestions for you</span>
          <div className="user">
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <span>Leo Petaccia</span>
              <div className="btn">
                <button>follow</button>
                <button>dismiss</button>
              </div>
            </div>
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <span>Leo Petaccia</span>
              <div className="btn">
                <button className="btnFollow">follow</button>
                <button className="btnDis">dismiss</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="items">
          <span>Latest activities</span>
          <div className="user">
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <p>
                <span>Leo Petaccia</span>
                profile picture changed
              </p>
              <span>1 min ago</span>
            </div>
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <p>
                <span>Leo Petaccia</span>
                changed their cover picture
              </p>
              <span>1 min ago</span>
            </div>
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <p>
                <span>Leo Petaccia</span>
                changed their cover picture
              </p>
              <span>1 min ago</span>
            </div>
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <p>
                <span>Leo Petaccia</span>
                changed their cover picture
              </p>
              <span>1 min ago</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="items">
          <span>Latest activities</span>
          <div className="user">
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <div className="online" />
              <span>Leo Petaccia</span>
            </div>
          </div>
          <div className="user">
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <div className="online" />
              <span>Leo Petaccia</span>
            </div>
          </div>
          <div className="user">
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <div className="online" />
              <span>Leo Petaccia</span>
            </div>
          </div>
          <div className="user">
            <div className="infoUser">
              <img src={leo} alt="img leo" />
              <div className="online" />
              <span>Leo Petaccia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
