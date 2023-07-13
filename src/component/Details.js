import React from "react";
import { useLocation, Link } from "react-router-dom";

function Details() {
  const location = useLocation();
  const data = location.state?.data;
  const dates = location.state?.dates;
  return (
    <div>
      <Link
        className="btn1 logout1"
        to="/"
        state={{ data: data, dates: dates }}
      >
        logout
      </Link>
      <table border={1}>
        <thead>
          <tr>
            <th>Team No</th>
            <th>Status</th>
            <th>Name</th>
            <th>Date</th>
            <th>Slot Number</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item["teamNo"]}</td>
                <td>{item["booked"]}True</td>
                <td>{item["name"]}</td>
                <td>{item["date"]}</td>
                <td>{item["slot"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Details;
