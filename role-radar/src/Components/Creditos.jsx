import React from 'react';

function Creditos() {
    return (
        <div className="creditos">
            <a
                href="https://www.geoapify.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="creditos-link"
            >
                Powerd by Geoapify
            </a>
            <span> • </span>
            <a
                href="https://www.openstreetmap.org/copyright"
                target="_blank"
                rel="noopener noreferrer"
                className="creditos-link"
            >
                OpenStreetMap contributors
            </a>
        </div>
    );
}

export default Creditos;