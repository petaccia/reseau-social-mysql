import React from "react";
import "./leftBar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import friends from "@assets/icon/friends.png";
import group from "@assets/icon/group.png";
import market from "@assets/icon/market.png";
import media from "@assets/icon/media.jpg";
import memo from "@assets/icon/memories.png";
import event from "@assets/icon/calendar.png";
import gaming from "@assets/icon/gaming.png";
import gallery from "@assets/icon/gallery.png";
import video from "@assets/icon/video.jpg";
import message from "@assets/icon/message.jpg";
import contact from "@assets/icon/contact.jpg";
import connect from "@assets/icon/connect.jpg";
const LeftBar = () => {
  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <FontAwesomeIcon icon={faCircleUser} className="icon" />
            <span>John doe</span>
          </div>
          <div className="items">
            <img src={friends} alt="icone friends" className="imgFriends" />
            <span>Friends</span>
          </div>
          <div className="items">
            <img src={group} alt="icone group" />
            <span>Group</span>
          </div>
          <div className="items">
            <img src={market} alt="icone market" />
            <span>Market</span>
          </div>
          <div className="items">
            <img src={media} alt="icone media" />
            <span>Media</span>
          </div>
          <div className="items">
            <img src={memo} alt="icone memo" />
            <span>Memo</span>
          </div>
        </div>
        <hr className="hr" />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="items">
            <img src={event} alt="icone friends" className="imgFriends" />
            <span>Events</span>
          </div>
          <div className="items">
            <img src={gaming} alt="icone friends" className="imgFriends" />
            <span>Gaming</span>
          </div>
          <div className="items">
            <img src={gallery} alt="icone friends" className="imgFriends" />
            <span>Gallery</span>
          </div>
          <div className="items">
            <img src={video} alt="icone friends" className="imgFriends" />
            <span>Video</span>
          </div>
          <div className="items">
            <img src={message} alt="icone friends" className="imgFriends" />
            <span>Message</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="items">
            <img src={media} alt="icone friends" className="imgFriends" />
            <span>Tutorial</span>
          </div><div className="items">
            <img src={contact} alt="icone friends" className="imgFriends" />
            <span>Contact</span>
          </div><div className="items">
            <img src={connect} alt="icone friends" className="imgFriends" />
            <span>Login/SignUp</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
