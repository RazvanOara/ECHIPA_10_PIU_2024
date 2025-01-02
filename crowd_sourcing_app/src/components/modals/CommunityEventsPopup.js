import React from 'react';
import '../../stylesheets/InfoPopup.css';

const CommunityEventsPopup = ({ onClose }) => {
  return (
    <div className="info-popup">
      <div className="popup-content">
        <h2>Evenimente Comunitare</h2>
        <p>Here are some community events happening in your area...</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CommunityEventsPopup;
