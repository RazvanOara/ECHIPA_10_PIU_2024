import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  // Coordinates for Cluj-Napoca
  const clujNapocaCoords = [46.7712, 23.6236];

  return (
    <MapContainer
      center={clujNapocaCoords} // Set the initial center of the map
      zoom={13} // Adjust the zoom level
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={clujNapocaCoords}>
        <Popup>
          Welcome to Cluj-Napoca! <br /> You can customize this popup.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
