"use client"
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import dynamic from 'next/dynamic';

interface MapProps {
    posix: LatLngExpression | LatLngTuple,
    zoom?: number,
}

const defaults = {
    zoom: 19
}

const Map = (Map: MapProps) => {

    const map = useRef(null);

  

    useEffect(() => {
        if (map.current) return; 
      }, []);

    const { zoom = defaults.zoom, posix } = Map

    return (
        <MapContainer
            ref={map}
            center={posix}
            zoom={zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", borderRadius: "5px"}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={posix} draggable={false}>
                <Popup>Els Togo - Tsévié</Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map