"use client";
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import L from 'leaflet';

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};

const customIcon = new L.Icon({
  iconUrl: '/images/placeholder.png',
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

const Map = ({ data, center }) => {
  return (
    <MapContainer center={center} zoom={12} style={{ height: '650px', width: '100%', zIndex: 1 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ChangeView center={center} />
      {data.map((item) => (
        <Marker key={item.id} position={[item.latitude, item.longitude]} icon={customIcon}>
          <Popup>
            <Image src={item.image} alt="Crime Image" width={100} height={100} />
            <br />
            Timestamp: {item.timestamp}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
    
export default Map;
