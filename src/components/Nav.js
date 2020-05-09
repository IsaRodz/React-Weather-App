import React, { useState } from "react";

function Nav(props) {
    const [city, setCity] = useState("Lima");

    const search = e => {
        e.preventDefault();
        props.search(city);
    };

    return (
        <nav>
            <form onSubmit={search}>
                <input
                    autoFocus
                    defaultValue={city}
                    type="text"
                    placeholder="¿En dónde te encuentras?"
                    onChange={e => setCity(e.target.value)}
                />

                <button disabled={city ? false : true} type="submit">
                    Buscar
                </button>
            </form>
        </nav>
    );
}

export default Nav;
