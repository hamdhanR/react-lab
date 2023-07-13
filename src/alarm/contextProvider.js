import React, { createContext, useEffect, useState } from "react";

export const AlarmProvider = createContext();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function ContextAlarm({ children }) {
  const [hour, sethour] = useState("");
  const [minutes, setminutes] = useState("");
  const [amPm, setamPm] = useState("");
  const [dayNow, setDayNow] = useState("");
  const [monthNow, setMonthNow] = useState("");
  const [yearNow, setYearNow] = useState("");

  useEffect(() => {
    const myInterval = setInterval(() => {
      let date = new Date();
      let HH = date.getHours(),
        MM = date.getMinutes(),
        day = date.getDate(),
        month = date.getMonth(),
        year = date.getFullYear(),
        ampm;

      if (HH >= 12) {
        HH = HH - 12;
        ampm = "PM";
      } else {
        ampm = "AM";
      }

      if (HH === 0) HH = 12;
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;

      sethour(HH);
      setminutes(MM);
      setamPm(ampm);
      setDayNow(day);
      setMonthNow(months[month]);
      setYearNow(year);
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <AlarmProvider.Provider
      value={{
        hour,
        minutes,
        amPm,
        dayNow,
        monthNow,
        yearNow,
      }}
    >
      {children}
    </AlarmProvider.Provider>
  );
}

export default ContextAlarm;
