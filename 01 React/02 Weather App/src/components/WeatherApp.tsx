import axios from "axios";
import { useEffect, useState } from "react";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

export const WeatherApp = () => {
  const [cities, setCities] = useState<string[]>([
    "Mumbai",
    "Pune",
    "Delhi",
    "Chennai",
    "Kolkata",
  ]);
  const [currCity, setCurrCity] = useState("Pune");
  const [weatherInfo, setWeatherInfo] = useState<WeatherData | null>(null);

  useEffect(() => {
    searchCity(currCity);
  }, [currCity]);

  const searchCity = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c8947fa45393d60963a3746421b117a9`
      );
      setWeatherInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCityClick = (city: string) => {
    setCurrCity(city);
    searchCity(city);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchCity(currCity);
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <hr />
      <div>
        <h2>You may search for some famous cities</h2>
        {cities.map((city, index) => (
          <button
            className="cityButton"
            key={index}
            onClick={() => handleCityClick(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <hr />
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Search City"></label>
          <input
            type="text"
            value={currCity}
            onChange={(e) => {
              setCurrCity(e.target.value);
            }}
            placeholder="Type city name"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <hr />
      {weatherInfo && (
        <div className="weatherCard">
          <h1>Result:</h1>
          <div className="weather-info">
            <div className="temperature">{weatherInfo.main.temp}°C</div>
            <div>City: {weatherInfo.name}</div>
            <div>Max Temperature: {weatherInfo.main.temp_max}°C</div>
            <div>Min Temperature: {weatherInfo.main.temp_min}°C</div>
            <div className="humidity">
              Humidity: {weatherInfo.main.humidity}%
            </div>
            <div className="time">
              Sunrise:{" "}
              {new Date(weatherInfo.sys.sunrise * 1000).toLocaleTimeString()}
            </div>
            <div className="time">
              Sunset:{" "}
              {new Date(weatherInfo.sys.sunset * 1000).toLocaleTimeString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
