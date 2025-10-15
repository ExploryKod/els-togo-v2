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

    // Check if API key is loaded
    const rawKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const apiKey = (rawKey || '')
      .trim()
      .replace(/^['"]|['"]$/g, '') // strip surrounding quotes
      .replace(/\s+/g, '') // remove any whitespace
      .replace(/[^A-Za-z0-9]/g, ''); // keep only safe chars

    // Debug: Log the key (remove this after debugging)
    console.log('MapTiler API Key Debug:', {
      rawKey: rawKey ? `${rawKey.substring(0, 10)}...` : 'undefined',
      apiKey: apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined',
      keyLength: apiKey ? apiKey.length : 0
    });

    if (!apiKey) {
      // Fallback to OSM when key is missing/invalid
      map.current = new L.Map(mapContainer.current, {
        center: L.latLng(center.lat, center.lng),
        zoom: zoom
      });
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map.current);
      return;
    }

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    // Create a MapTiler Layer inside Leaflet
    try {
      const mtLayer = new MaptilerLayer({
        // Get your free API key at https://cloud.maptiler.com
        apiKey: apiKey,
      }).addTo(map.current);
    } catch (_e) {
      // If MapTiler fails (e.g., 403), fallback to OSM
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map.current);
    }

  }, [center.lng, center.lat, zoom]);

  return (
    <div className={styles.mapWrap}>
      <div ref={mapContainer} className={styles.map}/>
    </div>
  )
}

export default Map;