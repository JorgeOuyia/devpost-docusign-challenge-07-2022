import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Link to="/surveys" className="home-item">
        <div
          className="home-item-principal"
          style={{
            backgroundImage: `url(https://outvio.com/static/3842c37d63c11af0794b1e0303ceec9b/cc6f6/cl2oiesah000m7c3u1b73ecdf.jpg)`,
          }}
        ></div>
        <div className="home-item-secondary">
          <h2 className="home-item-title">My surveys</h2>

          <ul className="home-item-messages">
            <li>Complete and send new surveys directly to ArcGIS Survey123</li>
            <li>Review the already sent surveys</li>
            <li>
              Integrate your survey with the camera trap images directly with
              PowerForms
            </li>
            <li>Request validation for your surveys</li>
          </ul>
        </div>
      </Link>
    </div>
  );
};

export default Home;
