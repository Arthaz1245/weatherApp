import { useState } from "react";

const Weather = () => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState(true);
  const [dateToday, setDateToday] = useState(date);
  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "70053b7a76de23bdc7582dddcbe10757",
  };
  const ICON_URL = "https://api.openweathermap.org/img/w/";
  const handleInput = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && input === "") {
      setErrorMsg("Input cannot be empty");
      setError(true);
    }
    if (event.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}/weather?q=${input}&units=metric&appid=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Failed to fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setIsLoading(false);
          setErrorMsg(err.message);
        });
    }
  };
  return (
    <section className="flex flex-row items-center justify-center mt-[20%] md:m-[10%] ">
      <div className=" flex flex-col p-10 bg-[url('/src/assets/image/weather.jpg')] bg-cover rounded-md">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl text-[#ffffff] p-2 font-bold">Weather App</h1>
          <p className="text-white">{dateToday}</p>
        </div>
        <div className="pt-2 flex justify-center items-center">
          <input
            type="text"
            placeholder="Search city name"
            value={input}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>
        {error ? (
          <p
            className={
              errorMsg != ""
                ? "bg-[#19d49661] text-white rounded-md mt-2"
                : "bg-[#ec252560] text-white rounded-md mt-2"
            }
          >
            {errorMsg}
          </p>
        ) : (
          <div className="flex flex-col justify-center items-center rounded-md p-1 mt-4 bg-[#25a1d297] text-white mb-10">
            <h2 className="p-1">
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="p-1">
              <img
                src={ICON_URL + weather.weather[0].icon + ".png"}
                alt={weather.weather[0].main}
              />
            </div>
            <p className="p-1">Temp: {Math.round(weather.main.temp)} °C</p>
            <p className="p-1">Weather: {weather.weather[0].main}</p>
            <p className="p-1">
              Temp Range: {Math.round(weather.main.temp_min)}°C /{" "}
              {Math.round(weather.main.temp_max)}°C
            </p>
          </div>
        )}
        {isLoading && <h3 className="text-xl text-white">Loading ...</h3>}
      </div>
    </section>
  );
};

export default Weather;
