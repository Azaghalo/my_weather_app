import "./App.css";
import bgImage from "./assets/bgTree.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import TempStat from "./TempStat";
import ConditionsElmt from "./ConditionsElmt";

const options = {
  method: "GET",
  url: "http://api.weatherapi.com/v1/current.json?key=501f9544ad594420ae4160734231607&q=London&aqi=yes",
};

function App() {
  const [weatherData, setWeatherData] = useState({ loading: true });

  useEffect(() => {
    async function fetchData() {
      await axios.request(options).then((response) => {
        setWeatherData({ ...response.data, loading: false });
      });
    }
    fetchData();
  }, []);

  console.log(weatherData);

  return (
    <main className="overflow-hidden max-w-full">
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="flex justify-between flex-col md:flex-row w-full h-screen bg-no-repeat bg-cover py-16 px-5"
      >
        <div id="tempLocationContainer" className="flex md:flex-col justify-between h-48">
          {weatherData.loading ? <LoadingSpinner size={120} /> : <TempStat data={weatherData} />}
        </div>
        <div id="conditionsContainer" className="w-full md:h-48 flex justify-center md:items-center md:w-1/2">
          <div className="text-white drop-shadow-textOutline content-center divide-x shadow-inner grid grid-cols-3 rounded-xl bg-[#ffffff2f] h-16 w-full border-[1px]">
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
