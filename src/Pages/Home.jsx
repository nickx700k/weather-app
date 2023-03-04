import React, { useEffect, useState } from "react";
import "./Home.scss";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import Card from "../components/Card";

const Home = () => {
  const [cityName, setCityName] = useState("");
  const [currentData, setCurrentData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const apiPoint = "https://api.openweathermap.org/data/2.5/weather?";
  const apiKey = "c8891cb8557f461af5a6be312534ad3c";

  const handleCity = (e) => {
    setCityName(e.target.value);
  };

  const handleFetch = async () => {
    const api = `${apiPoint}q=${cityName}&appid=${apiKey}`;
    const response = await fetch(api);
    const json = await response.json();
    setWeatherData(json);
    setCity(weatherData.name);
  };

  const handleClick = () => {
    handleFetch();
  };

  const handleCurrent = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    let finaApiPoint = `${apiPoint}lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${apiKey}`;
    const response = await fetch(finaApiPoint);
    const json = await response.json();

    setCurrentData(json);

    console.log(weatherData);
  };

  useEffect(() => {
    handleCurrent();
  });

  useEffect(() => {
    if (cityName !== city) {
      setWeatherData(null);
    }
  }, [cityName]);

  return (
    <div className="Home">
      <div className="container">
        <div className="container--search">
          <input
            type="text"
            className="container--search-input"
            placeholder="Search City"
            value={cityName}
            onChange={handleCity}
          />
          <button className="container--search-btn" onClick={handleClick}>
            <BsSearch />
          </button>
        </div>

        <Card
          cityName={cityName}
          weatherData={!weatherData ? currentData : weatherData}
        />
      </div>
      <p className="alert">
        این هواشناسی دارای ای پی آی رایگان میباشد اگر کار نکرد به دلیل اتمام
        تاریخ رایگان آن خواهد بود
      </p>
    </div>
  );
};

export default Home;
