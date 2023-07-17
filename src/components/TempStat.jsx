export default function TempStat({ data, units }) {
  return (
    <>
      <div className="w-5/6">
        <h3 className="text-left text-2xl font-bold text-white drop-shadow-textOutline">{data.location.name}</h3>
        <div className="flex pl-2">
          <p className="text-10xl text-white font-semibold text-left drop-shadow-textOutline">
            {units ? Math.round(data.current.temp_f) : Math.round(data.current.temp_c)}°
          </p>
          <img className="h-1/2 self-end -ml-12 translate-y-4" src={data.current.condition.icon} alt="" />
        </div>
      </div>
      <div className="font-bold text-white text-xl relative w-1/6 md:m-2 md:w-full">
        <p className="drop-shadow-textOutline whitespace-nowrap absolute top-0 right-1/2 origin-top-right translate-y-1/2 -rotate-90 md:relative md:right-0 md:top-0 md:rotate-0 md:translate-y-0 md:text-left">
          {data.current.condition.text}
        </p>
      </div>
    </>
  );
}
