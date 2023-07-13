import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./style.css";

function Start(props) {
  const location = useLocation();
  const data = location.state?.data;
  const dates = location.state?.dates;
  return (
    <div className="startPage">
      <Link className="btn1" to={"/login"} state={{ data: data, dates: dates }}>
        student
      </Link>
      <Link className="btn1" to={"/login"} state={{ data: data, dates: dates }}>
        facuity
      </Link>
    </div>
  );
}

export default Start;
