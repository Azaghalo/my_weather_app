import "./App.css";
import bgImage from "./assets/bgTree.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import TempStat from "./TempStat";
import ConditionsElmt from "./ConditionsElmt";
import ForecastElemt from "./ForecastElemt";
import Snowfall from "react-snowfall";

const options = {
  method: "GET",
  url: "http://api.weatherapi.com/v1/forecast.json?key=501f9544ad594420ae4160734231607&q=Námestovo&days=5&aqi=no&alerts=yes",
};

function App() {
  const [weatherData, setWeatherData] = useState({ loading: true });
  const [location, setLocation] = useState("Námestovo");
  const [rain, setRain] = useState(false);
  const [snow, setSnow] = useState(false);

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
        setRain(!!response.data.forecast.forecastday[0].day.daily_will_it_rain);
        setSnow(!!response.data.forecast.forecastday[0].day.daily_will_it_snow);
      });
    }

    fetchData();
  }, [location]);

  return (
    <main className="overflow-hidden max-w-full">
      {rain || snow ? (
        <Snowfall
          color={snow ? "#dee4fd" : "#58bbf4"}
          wind={snow ? [-0.5, 2.0] : [0, 0]}
          radius={snow ? [0.8, 3.0] : [3, 2]}
          speed={snow ? [1.0, 3.0] : [10, 12]}
          snowflakeCount={snow ? 170 : 300}
        />
      ) : (
        <></>
      )}

      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="flex justify-between md:items-center flex-col md:flex-row w-full h-screen bg-no-repeat bg-cover py-16 px-2 md:px-14 md:pt-0"
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
