import React, { useState, useEffect } from 'react';
import '../../stylesheets/FilteringPopup.css'; 

const FilteringPopup = ({ onClose, selectedStatus }) => {
  const [status, setStatus] = useState(selectedStatus);

  const handleStatusChange = (e) => {
    setStatus(e.target.value); 
  };

  const handleClose = () => {
    onClose(status); 
  };

  useEffect(() => {
    setStatus(selectedStatus); 
  }, [selectedStatus]);

  return (
    <div className="filtering-popup-overlay-custom">
    <div className="filtering-popup-container-custom">
      <h2>Filtreaza</h2>
      <div className="filter-section-custom">
        <label htmlFor="status">Status</label>
        <select id="status" value={status} onChange={handleStatusChange}>
          <option value="">Oricare</option>
          <option value="in desfasurare">In Desfasurare</option>
          <option value="programat pentru rezolvare">Programat pentru Rezolvare</option>
          <option value="rezolvat">Rezolvat</option>
        </select>
      </div>
  
      <div className="popup-buttons-custom">
        <button className="button-custom" onClick={handleClose}>
          {status !== selectedStatus ? 'Apply' : 'Close'}
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default FilteringPopup;
