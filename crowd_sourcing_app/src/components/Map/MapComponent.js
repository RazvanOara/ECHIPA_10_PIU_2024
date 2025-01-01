import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markImage from '../../assets/mark.jpg'; // Correct relative path
import './popupStyles.css'; // Import the CSS file

const customIcon = new L.Icon({
  iconUrl: markImage, // Use the imported image here
  iconSize: [32, 32], // Adjust the size of the icon
  iconAnchor: [16, 32], // Anchor the icon (center bottom)
  popupAnchor: [0, -32], // Position of the popup relative to the icon
});

const MapComponent = ({ markers, onMapClick }) => {
  const initialCoords = [46.7712, 23.6236]; // Initial map center

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onMapClick(e); // Pass the click event to the parent
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={initialCoords}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={customIcon} // Use the custom icon here
        >
          <Popup className="custom-popup">
            <div className="popup-content">
              <strong>Description:</strong> {marker.description} <br />
              <strong>Status:</strong> {marker.status} <br />
              <strong>Location:</strong> {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
