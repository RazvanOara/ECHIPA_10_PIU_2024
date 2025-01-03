import React from 'react';
import '../../stylesheets/InfoPopup.css';

const PoliceMeetingsPopup = ({ onClose }) => {
  return (
    <div className="info-popup">
      <div className="popup-content">
        <h2>Rezervare Sedinte Politie</h2>
        <p>You can reserve a police meeting through this service...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PoliceMeetingsPopup;
