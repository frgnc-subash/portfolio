import React, { useState, useEffect } from "react";

const WeatherBoard = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());
  const API_KEY = "674a6af0d0456a6f0449cdc98fcd457e"; // replace with your OpenWeatherMap API key
  const CITY = "Kathmandu,Nepal";

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
    fetchWeather();
  }, []);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!weather || !weather.main)
    return (
      <div className="fixed right-6 top-20 w-56 space-y-2 p-1 z-50">
        <div className="bg-gray-200/80 p-2 rounded shadow text-sm">
          Loading weather...
        </div>
      </div>
    );

  const status = weather.weather[0].main; // e.g., Rain, Clear, Clouds

  return (
    <div className="fixed right-6 top-20 w-56 space-y-2 z-50">
      {/* Block 1: Weather status */}
      <div className="bg-yellow-100/90 border border-brown-600 rounded-lg p-2 shadow text-center font-bold text-gray-800">
        <p className="text-sm">Status</p>
        <p className="text-xl">{status}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          className="w-12 h-12 mx-auto"
        />
      </div>

      {/* Block 2: Actual data */}
      <div className="bg-white/90 border border-gray-400 rounded-lg p-2 shadow font-sans text-gray-800 text-sm">
        <p className="font-bold text-center mb-1">Weather Data</p>
        <p>🌡 {Math.round(weather.main.temp)}°C</p>
        <p>💧 {weather.main.humidity}% Humidity</p>
        <p>💨 {weather.wind.speed} m/s Wind</p>
      </div>

      {/* Block 3: Current time */}
      <div className="bg-blue-100/90 border border-blue-500 rounded-lg p-2 shadow text-center font-mono text-gray-800 text-sm">
        <p className="font-bold mb-1">Local Time</p>
        <p>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p>{time.toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default WeatherBoard;
