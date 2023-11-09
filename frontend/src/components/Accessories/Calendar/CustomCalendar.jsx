import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format, getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomCalendar.scss";
import CustomDateInput from "./CustomDateInput/CustomDateInput.jsx";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, i) => 1990 + i); // Génère un tableau d'années de 1990 à l'année actuelle

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const formattedDate = format(selectedDate, "yyyy-MM-dd"); // Format de la date
console.log("formattedDate", formattedDate);

  return (
    <div className="custom-calendar">
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="calendar-container">
            <div>
              <button
                className="react-datepicker__navigation--previous"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {"<"}
              </button>
              <select
                className="react-datepicker__year-select"
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="react-datepicker__month-select"
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                className="react-datepicker__navigation--next"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {">"}
              </button>
            </div>
          </div>
        )}
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        customInput={
          <CustomDateInput
            onClick={() => setSelectedDate(new Date())}
            value={formattedDate}
          />
        }
      />
    </div>
  );
};

export default CustomCalendar;
