import React from "react";
import { FcCalendar } from "react-icons/fc";
import "./CustomDateInput.scss";

const CustomDateInput = ({ onClick, value }) => {
  return (
    <div className="custom-date-input" onClick={onClick}>
      <FcCalendar className="calendar-icon" />
      <span>{value.toString()}</span>
    </div>
  );
};

export default CustomDateInput;
