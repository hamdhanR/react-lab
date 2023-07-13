import React, { useContext, useEffect, useState } from "react";
import "./Alarm.css";
import { AlarmProvider } from "./contextProvider.js";

let daysInWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function Alarm() {
  const { hour, minutes, amPm, dayNow, monthNow, yearNow } =
    useContext(AlarmProvider);
  let [alarmTime, setAlarmTime] = useState("");
  let [alarmType, setAlarmType] = useState("Once");
  let [day, setDay] = useState("Sunday");
  let [data, setData] = useState([]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      let date = new Date();
      let HH = date.getHours(),
        MM = date.getMinutes(),
        today = date.getDay();
      if (HH < 10) HH = `0${HH}`;
      if (MM < 10) MM = `0${MM}`;
      let orginalTime = HH + ":" + MM;
      today = daysInWeek[today];
      for (let i of data) {
        if (i["alarmDay"] === today || i["alarmType"] === "Every") {
          if (i["alarm"] === orginalTime && !i["status"]) {
            alert("it works");
            removeData(i);
          }
        }
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  });

  function removeData(item) {
    let i = data.indexOf(item);
    let newData = [...data.slice(0, i), ...data.slice(i + 1)];
    if (item["alarmType"] === "Every") {
      item["status"] = true;
      setData([...newData, item]);
      return;
    }
    setData(newData);
    console.log(newData);
  }

  function handleAddData() {
    let obj = {};
    obj["alarm"] = alarmTime;
    obj["alarmType"] = alarmType;
    obj["alarmDay"] = day;
    obj["status"] = false;
    for (let i of data) {
      if (JSON.stringify(i) === JSON.stringify(obj)) {
        alert("already taken");
        return;
      } else if (i["alarmType"] === "Every" && i["alarm"] === obj["alarm"]) {
        alert("already taken");
        return;
      }
    }
    setData([...data, obj]);
  }

  return (
    <>
      <div className="Clock">
        <div className="clock_text">
          <div className="hour">{`${hour}:`}</div>
          <div className="minutes">{minutes}</div>
          <div className="ampm">{amPm}</div>
        </div>
        <div>
          <div className="clock__date">
            <span>{`${dayNow} `}</span>
            <span>{`${monthNow} , `}</span>
            <span>{yearNow}</span>
          </div>
        </div>

        <div>
          <label>Set Alarm time</label>
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
          />
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {daysInWeek.map((day, index) => {
              return (
                <option key={index} value={day}>
                  {day}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <select
            value={alarmType}
            onChange={(e) => setAlarmType(e.target.value)}
          >
            <option value="Once">Once</option>
            <option value="Every">Every Day</option>
          </select>
        </div>

        <button className="btn1" onClick={handleAddData}>
          Add Alarm
        </button>
      </div>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <th>Alarm Time</th>
              <th>Alarm Type</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item["alarm"]}</td>
                  <td>{item["alarmType"]}</td>
                  <td>
                    {item["alarmType"] === "Every"
                      ? "All Day"
                      : item["alarmDay"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Alarm;
