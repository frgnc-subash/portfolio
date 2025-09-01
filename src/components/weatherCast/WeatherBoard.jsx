import React, { useState, useEffect } from "react";

const WeatherBoard = () => {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState(0);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const CITY = "Kathmandu,Nepal";

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeather();
  }, [API_KEY]);

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-slide panels
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActivePanel((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-black border-2 border-cyan-400/60 rounded-lg p-8 shadow-[0_0_20px_rgba(0,255,255,0.5)]">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-cyan-300 font-mono animate-pulse">
              LOADING
            </span>
            <span className="text-cyan-300 animate-pulse">.</span>
            <span
              className="text-cyan-300 animate-pulse"
              style={{ animationDelay: "0.2s" }}
            >
              .
            </span>
            <span
              className="text-cyan-300 animate-pulse"
              style={{ animationDelay: "0.4s" }}
            >
              .
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!weather || !weather.main) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-black border-2 border-red-500/60 rounded-lg p-8 shadow-[0_0_20px_rgba(255,0,0,0.5)]">
          <p className="text-red-400 font-mono text-center">
            ❌ WEATHER OFFLINE
          </p>
        </div>
      </div>
    );
  }

  const temp = Math.round(weather.main.temp);
  const humidity = weather.main.humidity;
  const windSpeed = Math.round(weather.wind.speed * 10) / 10;
  const feelsLike = Math.round(weather.main.feels_like);
  const visibility = weather.visibility
    ? (weather.visibility / 1000).toFixed(1)
    : "N/A";

  const getWeatherPixelArt = (icon) => {
    const iconMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "❄️",
      "13n": "❄️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return iconMap[icon] || "🌡️";
  };

  const panels = [
    // Panel 0: Time and Location
    {
      id: "time",
      content: (
        <div className="text-center py-4">
          <div className="mb-4">
            <div className="text-cyan-300 text-5xl font-mono font-bold mb-2 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
              {time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-yellow-300 text-sm font-mono uppercase tracking-wider">
              {time.toLocaleDateString([], {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,0,0.8)]"></div>
            <span className="text-green-400 text-xs font-mono uppercase">
              Kathmandu Online
            </span>
          </div>
        </div>
      ),
    },
    // Panel 1: Weather Main
    {
      id: "weather",
      content: (
        <div className="flex items-center justify-around py-4">
          <div className="text-center">
            <div
              className="text-6xl mb-2 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              {getWeatherPixelArt(weather.weather[0].icon)}
            </div>
            <p className="text-cyan-300 text-sm font-mono capitalize">
              {weather.weather[0].description}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-start justify-center">
              <span className="text-5xl font-mono font-bold text-yellow-300 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]">
                {temp}
              </span>
              <span className="text-2xl font-mono text-cyan-300 mt-1">°C</span>
            </div>
            <p className="text-purple-400 text-sm font-mono mt-2">
              Feels {feelsLike}°
            </p>
          </div>
        </div>
      ),
    },
    // Panel 2: Stats
    {
      id: "stats",
      content: (
        <div className="grid grid-cols-3 gap-6 py-4">
          <div className="text-center">
            <div className="text-2xl mb-1">💧</div>
            <p className="text-xl font-mono font-bold text-cyan-300">
              {humidity}%
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase">
              Humidity
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">༄｡°</div>
            <p className="text-xl font-mono font-bold text-cyan-300">
              {windSpeed}
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase">
              Wind m/s
            </p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">😶‍🌫️</div>
            <p className="text-xl font-mono font-bold text-cyan-300">
              {visibility}
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase">
              Visible km
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-black border-2 border-cyan-400/60 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.8)] transition-shadow">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 px-4 py-2 border-b border-cyan-400/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 text-sm animate-pulse">⚡</span>
              <span className="font-mono text-cyan-300 text-xs uppercase tracking-wider">
                Weather System
              </span>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="relative h-32">
          {panels.map((panel, index) => (
            <div
              key={panel.id}
              className={`absolute inset-0 px-6 transition-all duration-700 ease-in-out ${index === activePanel
                ? "translate-x-0 opacity-100"
                : index < activePanel
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
                }`}
            >
              {panel.content}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center pb-3 gap-2">
          {panels.map((_, index) => (
            <button
              key={index}
              onClick={() => setActivePanel(index)}
              className={`transition-all duration-300 ${index === activePanel
                ? "w-8 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]"
                : "w-2 h-2 bg-gray-600 hover:bg-gray-500"
                } rounded-full`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherBoard;
