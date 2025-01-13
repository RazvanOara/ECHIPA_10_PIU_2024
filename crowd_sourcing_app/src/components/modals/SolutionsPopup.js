import React, { useState } from 'react';
import '../../stylesheets/SolutionsPopup.css';

const SolutionsPopup = ({ onClose, marker, handleAddSolution }) => {
  const [newSolution, setNewSolution] = useState('');
  const [ratings, setRatings] = useState(marker.solutions.map(() => 0)); // Initialize ratings for existing solutions

  const handleSolutionChange = (e) => {
    setNewSolution(e.target.value);
  };

  const handleSaveSolution = () => {
    if (newSolution) {
      const newSolutionObject = { description: newSolution, rating: 0 }; // Initialize rating as 0 for new solutions
      handleAddSolution(newSolutionObject);
      setNewSolution('');
      setRatings([...ratings, 0]); // Add a new rating for the new solution
    }
  };

  const handleRatingChange = (index, rating) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = rating;
    setRatings(updatedRatings);
  };

  return (
    <div className="solutions-popup">
      <div className="popup-content">
        <h2>Solutii pentru: {marker.description}</h2>
        <p>Status: {marker.status}</p>
        <div className="solutions-container">
          {marker.solutions && marker.solutions.length > 0 ? (
            marker.solutions.map((solution, index) => (
              <div key={index} className="solution-item">
                <textarea
                  value={solution.description}
                  readOnly
                  className="solution-textarea"
                />
                <div className="rating">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`star ${ratings[index] > i ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(index, i + 1)}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
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
