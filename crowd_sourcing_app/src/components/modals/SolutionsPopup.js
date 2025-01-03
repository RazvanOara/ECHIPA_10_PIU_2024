import React, { useState } from 'react';
import '../../stylesheets/SolutionsPopup.css';

const SolutionsPopup = ({ onClose, marker, handleAddSolution }) => {
  const [newSolution, setNewSolution] = useState('');

  const handleSolutionChange = (e) => {
    setNewSolution(e.target.value);
  };

  const handleSaveSolution = () => {
    if (newSolution) {
      handleAddSolution(newSolution);
      setNewSolution(''); 
    }
  };

  return (
    <div className="solutions-popup">
      <div className="popup-content">
        <h2>Solutii pentru: {marker.description}</h2>
        <p>Status: {marker.status}</p>
        <div className="solutions-container">
          {marker.solutions && marker.solutions.length > 0 ? (
            marker.solutions.map((solution, index) => (
              <textarea
                key={index}
                value={solution}
                readOnly
                className="solution-textarea"
              />
            ))
          ) : (
            <p>No solutions yet.</p>
          )}
        </div>

        <textarea
          value={newSolution}
          onChange={handleSolutionChange}
          placeholder="Add a new solution..."
          className="new-solution-textarea"
        />
        <button className="save-button" onClick={handleSaveSolution}>
          Save
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SolutionsPopup;
