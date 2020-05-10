import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Weather from "./components/Weather";
import Message from "./components/Message";

import Swal from "sweetalert2";

function App() {
    useEffect(() => getWeatherByLocation(), []);

    const [weather, setWeather] = useState(null);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather?";
    const API_KEY = "&appid=58803902b889fe680642057ad9747306";
    const API_CONFIG = "&units=metric&lang=es";

    const getWeatherByLocation = () => {
        const getErr = err => {
            Swal.fire({
                text: "Hubo un error al obtener la ubicación",
                icon: "warning",
                toast: true,
                position: "bottom-left",
                timer: 4000,
                showConfirmButton: false,
            });
        };
        const getPos = async pos => {
            let lat = pos.coords.latitude;
            let lon = pos.coords.longitude;
            let url = `${API_URL}${API_KEY}&lat=${lat}&lon=${lon}${API_CONFIG}`;
            let response = await fetch(url);
            let data = await response.json();
            setWeather(data);
        };

        navigator.geolocation.getCurrentPosition(getPos, getErr);
    };

    const search = async city => {
        let url = `${API_URL}${API_KEY}&q=${city}${API_CONFIG}`;
        let response = await fetch(url);
        if (response.status !== 200) {
            Swal.fire({
                text:
                    "La ciudad no fue encontrada. Por favor intenta de nuevo con otra distinta",
                icon: "warning",
                toast: true,
                position: "bottom-left",
                timer: 4000,
                showConfirmButton: false,
            });
        } else {
            let data = await response.json();
            setWeather(data);
        }
    };

    return (
        <div className="app">
            <Nav search={search} />
            {weather ? <Weather weather={weather} /> : <Message />}
        </div>
    );
}

export default App;
