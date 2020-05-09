import React, { useState } from "react";
import "./App.scss";
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Message from "./components/Message";

function App() {
    const [weather, setWeather] = useState(null);
    const [message, setMessage] = useState(false);

    const API_KEY = "&appid=58803902b889fe680642057ad9747306";
    const api_config = "&units=metric&lang=es";

    const getWeatherByLocation = () => {};

    const search = async city => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${api_config}${API_KEY}`;
        const response = await fetch(url);
        if (response.status !== 200) {
            setMessage(true);
        } else {
            setMessage(false);
            const data = await response.json();
            data.dt = new Date(data.dt).toLocaleTimeString();
            setWeather(data);
            // console.log(data);
        }
    };

    return (
        <div className="app">
            <Nav search={search} />
            {message ? <Message /> : null}
            {weather ? <Weather weather={weather} /> : null}
        </div>
    );
}

export default App;
