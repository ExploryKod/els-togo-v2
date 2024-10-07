'use client'

import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

import styles from './map.module.css';

//import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 1.2120735, lat: 6.4296378};
  const [zoom] = useState(12);


  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      // Get your free API key at https://cloud.maptiler.com
      apiKey: process.env.MAP_API_KEY || "",
    }).addTo(map.current);

  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map}/>
    </div>
  )
}

export default Map;