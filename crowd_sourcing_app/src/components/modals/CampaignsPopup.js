import React from 'react';
import '../../stylesheets/InfoPopup.css';

const CampaignsPopup = ({ onClose }) => {
  return (
    <div className="info-popup">
      <div className="popup-content">
        <h2>Campanii</h2>
        <p>Learn about various campaigns in your region...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CampaignsPopup;
