import "./Navbar.css";
import React from "react";
import { useDispatch } from "react-redux";
import { logOffAction } from "../redux/userDuck";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();

  const logOff = (e) => {
    e.preventDefault();

    dispatch(logOffAction());
  };

  return (
    <nav className="navigationbar">
      <ul className="navigationbar-nav">
        <li className="logo">
          <Link to="/home" className="navigation-link">
            <span className="link-text" style={{ color: "white" }}>
              ArcValetSign
            </span>
            <img src="http://store-images.s-microsoft.com/image/apps.46703.14560072719906134.35713bf3-d456-450b-b4c7-d9db01972e59.587e4824-0f00-4b63-937a-e80e9d928e8c" />
          </Link>
        </li>

        <li className="navigation-item">
          <Link to="/home" className="navigation-link home-link">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="book"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="black"
                d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"
              />
            </svg>
            <span className="link-text">Home</span>
          </Link>
        </li>

        <li className="navigation-item">
          <Link to="/surveys" className="navigation-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M448 336v-288C448 21.49 426.5 0 400 0H352v191.1c0 13.41-15.52 20.88-25.1 12.49L272 160L217.1 204.5C207.5 212.8 192 205.4 192 191.1V0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-32c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"
                fill="black"
              />
            </svg>
            <span className="link-text">My surveys</span>
          </Link>
        </li>

        <li className="navigation-item">
          <Link to="/cameradata" className="navigation-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"
                fill="black"
              />
            </svg>
            <span className="link-text">Camera data</span>
          </Link>
        </li>

        <li className="navigation-item">
          <a href="#" className="navigation-link" onClick={(e) => logOff(e)}>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="power-off"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="svg-inline--fa fa-power-off fa-w-16 fa-3x"
            >
              <path
                fill="red"
                d="M400 54.1c63 45 104 118.6 104 201.9 0 136.8-110.8 247.7-247.5 248C120 504.3 8.2 393 8 256.4 7.9 173.1 48.9 99.3 111.8 54.2c11.7-8.3 28-4.8 35 7.7L162.6 90c5.9 10.5 3.1 23.8-6.6 31-41.5 30.8-68 79.6-68 134.9-.1 92.3 74.5 168.1 168 168.1 91.6 0 168.6-74.2 168-169.1-.3-51.8-24.7-101.8-68.1-134-9.7-7.2-12.4-20.5-6.5-30.9l15.8-28.1c7-12.4 23.2-16.1 34.8-7.8zM296 264V24c0-13.3-10.7-24-24-24h-32c-13.3 0-24 10.7-24 24v240c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24z"
              ></path>
            </svg>
            <span className="link-text">Log off</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
