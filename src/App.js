import React, { useState, useEffect } from "react";
import "./App.scss";
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Message from "./components/Message";

import map from "./icons/map.svg";

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
                    <img src={map} alt="" />
                    <p>
                        Permite el acceso a tu ubicación para poder brindarte el
                        clima en dónde te encuentres.
                    </p>
                    <p>
                        También puedes escribir una ciudad en la barra de
                        búsqueda.
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
