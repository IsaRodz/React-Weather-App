import React from "react";
import map from "../icons/map.svg";

export default function Message() {
    return (
        <div className="warning">
            <img src={map} alt="" />
            <p>
                Permite el acceso a tu ubicación para poder brindarte el clima
                en dónde te encuentres.
            </p>
            <p>También puedes escribir una ciudad en la barra de búsqueda.</p>
        </div>
    );
}
