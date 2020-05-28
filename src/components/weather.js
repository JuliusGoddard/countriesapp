import React, { useState } from "react";
import getWeather from "../services/weather";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState();
  getWeather(capital).then(e => setWeather(e));

  if (weather === undefined) {
    return <p>Weather unavailable</p>;
  }
  return (
    <div>
      <h1>Weather</h1>
    </div>
  );
};

export default Weather;
