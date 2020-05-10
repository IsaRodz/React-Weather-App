import React, { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Message from "./components/Message";

function App() {
    useEffect(() => getWeatherByLocation(), []);

    const [weather, setWeather] = useState(null);
    const [message, setMessage] = useState(false);

    const API_KEY = "&appid=58803902b889fe680642057ad9747306";
    const api_config = "&units=metric&lang=es";

    const getWeatherByLocation = () => {
        const getErr = err => console.error(err);
        const getPos = async pos => {
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;
            let url = `https://api.openweathermap.org/data/2.5/weather?${API_KEY}&lat=${lat}&lon=${lon}${api_config}`;
            let response = await fetch(url);
            let data = await response.json();
            setWeather(data);
        };

        navigator.geolocation.getCurrentPosition(getPos, getErr);
    };

    const search = async city => {
        let url = `https://api.openweathermap.org/data/2.5/weather?${API_KEY}&q=${city}${api_config}`;
        let response = await fetch(url);
        if (response.status !== 200) {
            setMessage(true);
        } else {
            setMessage(false);
            let data = await response.json();
            data.dt = new Date(data.dt).toLocaleTimeString();
            setWeather(data);
        }
    };

    return (
        <div className="app">
            <Nav search={search} />
            {message ? <Message /> : null}
            {weather ? (
                <Weather weather={weather} />
            ) : (
                <div className="warning">
                    <svg viewBox="0 0 14 14">
                        <path
                            d="M7 0C3.15 0 0 3.15 0 7C0 10.85 3.15 14 7 14C10.85 14 14 10.85 14 7C14 3.15 10.85 0 7 0ZM6.45 3H7.55V8.5H6.45V3V3ZM7 11.5C6.6 11.5 6.25 11.15 6.25 10.75C6.25 10.35 6.6 10 7 10C7.4 10 7.75 10.35 7.75 10.75C7.75 11.15 7.4 11.5 7 11.5Z"
                            fill="white"
                        />
                    </svg>

                    <h2>No hemos podido obtener tu ubicación :(</h2>
                    <p>
                        No hay problema, puedes buscar el clima de otra ciudad
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
