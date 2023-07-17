export default function ForecastElemt({ data }) {
  return (
    <div className="grid grid-cols-5 w-full h-full gap-4 border-[2px] bg-[#4444442f] rounded-t-xl drop-shadow-textOutline border-b-0">
      {data.map((day) => {
        return (
          <div key={day.date_epoch} className="flex flex-col items-center">
            <span className="text-white text-lg font-semibold drop-shadow-textOutline">
              {new Date(day.date + " 00:00:00").toLocaleString("en-US", { weekday: "short" })}
            </span>
            <img className="w-12" src={day.day.condition.icon} alt="dayWeatherIcon" />
            <div className="flex justify-around w-full">
              <span className="text-blue-400 text-lg font-semibold drop-shadow-textOutline">{Math.round(day.day.mintemp_c)}°</span>
              <span className="text-red-400  text-lg font-semibold drop-shadow-textOutline">{Math.round(day.day.maxtemp_c)}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
