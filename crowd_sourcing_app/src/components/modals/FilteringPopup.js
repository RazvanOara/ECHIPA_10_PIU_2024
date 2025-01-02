import React, { useState, useEffect } from 'react';
import '../../stylesheets/FilteringPopup.css'; // Ensure you have the CSS for styling

const FilteringPopup = ({ onClose, selectedStatus }) => {
  const [status, setStatus] = useState(selectedStatus); // Initialize with the selected status

  const handleStatusChange = (e) => {
    setStatus(e.target.value); // Update the selected status
  };

  const handleClose = () => {
    onClose(status); // Pass the selected status back to the parent
  };

  useEffect(() => {
    setStatus(selectedStatus); // Update the dropdown value when the parent changes the status
  }, [selectedStatus]);

  return (
    <div className="filtering-popup-overlay">
      <div className="filtering-popup-container">
        <h2>Filtreaza</h2>
        <div className="filter-section">
          <label htmlFor="status">Status</label>
          <select 
            id="status" 
            value={status} 
            onChange={handleStatusChange}
          >
            <option value="">Oricare</option>
            <option value="in desfasurare">In Desfasurare</option>
            <option value="programat pentru rezolvare">Programat pentru Rezolvare</option>
            <option value="rezolvat">Rezolvat</option>
          </select>
        </div>

        {/* Add other filter options here if needed */}
        
        <div className="popup-buttons">
          <button onClick={handleClose}>
            {status !== selectedStatus ? 'Apply' : 'Close'} {/* Change the button text based on filter change */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilteringPopup;
