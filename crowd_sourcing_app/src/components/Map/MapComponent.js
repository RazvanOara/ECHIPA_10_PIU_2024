import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markImage from '../../assets/mark.png';
import '../../stylesheets/popupStyles.css';

const customIcon = new L.Icon({
  iconUrl: markImage,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapComponent = ({ markers, onMapClick, onMarkerClick }) => {
  const initialCoords = [46.7712, 23.6236];
  const [activePopup, setActivePopup] = useState(null); 

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        onMapClick(e);
        setActivePopup(null); 
      },
    });
    return null;
  };

  const handleMarkerClick = (marker) => {
    setActivePopup(marker); 
    onMarkerClick(marker); 
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
          icon={customIcon}
        >
          <Popup
            open={activePopup === marker} 
            onClose={() => setActivePopup(null)} 
          >
            <div className="popup-content">
              <strong>Description:</strong> {marker.description} <br />
              <strong>Status:</strong> {marker.status} <br />
              <strong>Location:</strong> {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)} <br />
              <strong>Created On:</strong> {marker.date} <br /> 
              <button className="marker-details-button" onClick={() => handleMarkerClick(marker)}>Vezi Solutii</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
