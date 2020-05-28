import axios from "axios";
const regeneratorRuntime = require("regenerator-runtime");
const baseUrl =
  "http://api.weatherstack.com/current?access_key=df1add4bf7380839cb05f01a477863a4&query=";

const getWeather = async capital => {
  const response = await axios.get(`${baseUrl}${capital}`);
  return response.data.current;
};

export default getWeather;
