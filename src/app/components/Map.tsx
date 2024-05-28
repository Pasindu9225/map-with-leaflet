"use client";
import { IoLocation } from "react-icons/io5";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import L from "leaflet";

// Define the paths to the marker images in the public folder
const markerIconUrl = "/images/marker-icon.png";
const markerShadowUrl = "/images/marker-shadow.png";

// Set up the default icon using the URLs
const defaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  onLocationSelect: (location: LatLngTuple) => void;
}

const Map = ({ onLocationSelect }: MapProps) => {
  const [isClient, setIsClient] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple>([
    51.505, -0.09,
  ]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const MapEvents = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const newPosition: LatLngTuple = [lat, lng];
        setMarkerPosition(newPosition);
        console.log("Clicked location:", { lat, lng });
        onLocationSelect(newPosition); // Pass the location to the parent component
      },
    });
    return null;
  };

  if (!isClient) {
    return null;
  }

  return (
    <MapContainer
      style={{ height: "100vh", width: "100vw" }}
      center={[7.8731, 80.7718]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition} icon={defaultIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapEvents />
    </MapContainer>
  );
};

export default Map;
