import "./App.css";
import bgImage from "./assets/bgTree.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import TempStat from "./TempStat";
import ConditionsElmt from "./ConditionsElmt";
import ForecastElemt from "./ForecastElemt";

const options = {
  method: "GET",
  url: "http://api.weatherapi.com/v1/forecast.json?key=501f9544ad594420ae4160734231607&q=Sao-Paulo&days=5&aqi=no&alerts=yes",
};

function App() {
  const [weatherData, setWeatherData] = useState({ loading: true });
  const [location, setLocation] = useState("london");

  useEffect(() => {
    async function fetchData() {
      if ("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition(function (position) {
          setLocation(`${position.coords.latitude},${position.coords.longitude}`);
        });
      }

      options.url = options.url.replace(/q=[^&]*/, `q=${location}`);

      await axios.request(options).then((response) => {
        setWeatherData({ ...response.data, loading: false });
      });
    }

    fetchData();
  }, [location]);

  return (
    <main className="overflow-hidden max-w-full">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="flex justify-between flex-col md:flex-row w-full h-screen bg-no-repeat bg-cover py-16 px-3"
      >
        <div id="tempLocationContainer" className="flex md:flex-col justify-between h-52">
          {weatherData.loading ? <LoadingSpinner size={120} /> : <TempStat data={weatherData} />}
        </div>
        <div id="conditionsContainer" className="w-full flex justify-center md:items-center md:w-1/2 flex-col md:h-60">
          <div className="flex w-full">
            {weatherData.loading ? <LoadingSpinner size={50}></LoadingSpinner> : <ForecastElemt data={weatherData.forecast.forecastday} />}
          </div>
          <div className="text-white drop-shadow-textOutline content-center divide-x shadow-inner grid grid-cols-3 rounded-b-xl bg-[#4444442f] h-14 w-full border-[2px]">
            <div>
              {weatherData.loading ? <LoadingSpinner size={50} /> : <ConditionsElmt data={weatherData.current.humidity} dataText={"Humidity"} />}
            </div>
            <div>
              {weatherData.loading ? <LoadingSpinner size={50} /> : <ConditionsElmt data={weatherData.current.vis_km} dataText={"Visibility"} />}
            </div>
            <div>{weatherData.loading ? <LoadingSpinner size={50} /> : <ConditionsElmt data={weatherData.current.uv} dataText={"UV Index"} />}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
