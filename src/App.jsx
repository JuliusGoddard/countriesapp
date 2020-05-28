import React, { useState, useEffect } from "react";
import axios from "axios";
import getWeather from "./services/weather";
const regeneratorRuntime = require("regenerator-runtime");
import Weather from "./components/weather";
import Countries from "./components/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState([]);

  const countriesToShow = countries.filter(
    c => c.name.toUpperCase().indexOf(country.toUpperCase()) !== -1
  );

  const handleChange = e => {
    setCountry(e.target.value);
  };

  const changeFilter = filter => {
    setCountry(filter);
  };

  const location = countriesToShow.map(c => c.capital);

  const locationString = location.toString();

  console.log(locationString);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      setCountries(response.data);
    });
  }, []);

  const SingleCountry = () => {
    if (countriesToShow.length === 1) {
      return (
        <div>
          {countriesToShow.map(c => (
            <h2 key={c.name}>{c.name}</h2>
          ))}
          {countriesToShow.map(c => (
            <p key={c.name}>
              capital:{c.capital} <br />
              population:{c.population} <br />
            </p>
          ))}
          <h2>Languages</h2>
          <ul>
            {countriesToShow.map(c => (
              <li>
                {c.languages.map(c => (
                  <li>{c.name}</li>
                ))}
              </li>
            ))}
          </ul>
          {countriesToShow.map(c => (
            <img height="100px" width="150px" src={c.flag}></img>
          ))}
          <Weather capital={locationString} />
        </div>
      );
    }
    return null;
  };

  const Countries = () => {
    if (countriesToShow.length > 10) {
      return (
        <div>
          <p>Please Refine Your Search</p>
        </div>
      );
    }
    if (countriesToShow.length === 1) {
      return null;
    }
    return (
      <div>
        <ul>
          {countriesToShow.map(c => (
            <li>
              {c.name}
              <button
                onClick={() => {
                  changeFilter(c.name);
                }}
              >
                Show{" "}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      find countries <input value={country} onChange={handleChange}></input>
      <Countries />
      <SingleCountry />
    </div>
  );
};

export default App;
