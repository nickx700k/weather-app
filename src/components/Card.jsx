import React from "react";
import "./Card.scss";

export default function Card({ weatherData, cityName, currentCity }) {
  return (
    <div className="Card">
      {typeof weatherData?.main === "undefined" ? (
        <h3>No Data Found</h3>
      ) : (
        <>
          <div className="Card--head">
            <h3>
              <span>{weatherData.name}</span>
            </h3>
            <div className="Card--head-weatherPic">
              <img
                src="/scatteredClouds.png"
                alt="No Photo"
                className="Card--head-pic"
              />
            </div>
            <div className="Card--head-Cel">
              <h3>
                {weatherData?.main?.temp}
                <sup>o</sup> درجه حرارت
              </h3>
            </div>
          </div>
          <div className="Card--body">
            <div className="Card--body-part">
              <h5>
                {weatherData?.main?.temp_max}
                <sup>o</sup> درجه
              </h5>
              <span>بالاترین درجه</span>
            </div>
            <div className="Card--body-part">
              <h5>
                {weatherData?.main?.temp_min}
                <sup>o</sup> درجه
              </h5>
              <span>پایین ترین درجه</span>
            </div>
            <div className="Card--body-part">
              <h5>{weatherData?.main?.humidity}%</h5>
              <span> رطوبت</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
