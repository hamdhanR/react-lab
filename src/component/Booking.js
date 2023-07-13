import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";

let originalDate = {
  "Monday 5-7PM": 8,
  "Wednesday 1-2PM": 4,
  "Thusday 3-6PM": 12,
  "Friday 9:30-10:30AM": 4,
};
let names = [
  "ajay",
  "kannan",
  "prakash",
  "guru",
  "vallal",
  "saravana Raju",
  "govarathanan",
  "hamdhan",
  "shiva Arjun",
  "suriya Rai",
  "ajay1",
  "kannan1",
  "prakash1",
  "guru1",
  "vallal1",
  "saravana Raju1",
  "govarathanan1",
  "hamdhan1",
  "shiva Arjun1",
  "suriya Rai1",
];

function Booking() {
  const location = useLocation();
  const dataofdate = location.state?.data;
  const dataofdates = location.state?.dates;
  const [date, setDate] = useState("Monday 5-7PM");
  const [team, setTeam] = useState(dataofdate || []);
  const [teamNo, setTeamNo] = useState("");
  const [dates, setDates] = useState(
    dataofdates || {
      "Monday 5-7PM": 8,
      "Wednesday 1-2PM": 4,
      "Thusday 3-6PM": 12,
      "Friday 9:30-10:30AM": 4,
    }
  );

  function handleTeamNo(e) {
    setTeamNo(e.target.value);
  }

  useEffect(handleTeamResult, [date]);

  function handleTeamResult() {
    let res;
    if (teamNo !== "") {
      res =
        "Date : " +
        date +
        "\n" +
        "Name : " +
        names[teamNo - 1] +
        "\n" +
        "Available Slot : " +
        (originalDate[date] - dates[date] + 1);
      document.getElementById("teamResult").innerText = res;
    } else {
      document.getElementById("teamResult").innerText = "";
    }
  }

  function bookedSlotResult() {
    let res = document.getElementById("teamResult");
    res.innerText = res.innerText.replace("Available", "Booked");
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleBooked() {
    let slot = getslot();
    let updatedates;
    let checkTeam = getcheckTeam();
    if (slot >= 0 && checkTeam && teamNo !== "") {
      let getdata = {
        teamNo: teamNo,
        booked: true,
        name: names[teamNo - 1],
        date: date,
        slot: slot + 1,
      };
      let updateArray = [...team, getdata];
      setTeam(updateArray);
      updatedates = dates;
      updatedates[date] = dates[date] - 1;
      setDates(updatedates);
      bookedSlotResult();
    } else {
      if (checkTeam) alert("slot not available");
      else alert("team alreay taken ..!");
    }
    setTeamNo("");
  }

  function getslot() {
    let slot = 0;
    if (dates[date] !== 0) {
      slot = originalDate[date] - dates[date];
      return slot;
    }
    return -1;
  }

  function getcheckTeam() {
    let flag = true;
    team.forEach((element) => {
      if (element["teamNo"] === teamNo) {
        flag = false;
        return;
      }
    });
    return flag;
  }

  return (
    <div className="App">
      <Link className="btn1 logout" to="/" state={{ data: team, dates: dates }}>
        logout
      </Link>
      <div>
        <select value={date} onChange={handleDate}>
          <option value={"Monday 5-7PM"}>Monday 5-7PM</option>
          <option value={"Wednesday 1-2PM"}>Wednesday 1-2PM</option>
          <option value={"Thusday 3-6PM"}>Thusday 3-6PM</option>
          <option value={"Friday 9:30-10:30AM"}>Friday 9:30-10:30AM</option>
        </select>
        <br />
        <input
          onBlur={handleTeamResult}
          value={teamNo}
          onChange={handleTeamNo}
          placeholder="Enter the Teams No"
        />
        <center>
          <button className="btn1 button5" onClick={handleBooked}>
            book
          </button>
        </center>
        <div id="teamResult">result</div>
      </div>
    </div>
  );
}

export default Booking;
