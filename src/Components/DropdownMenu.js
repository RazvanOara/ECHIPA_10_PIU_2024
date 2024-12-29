import React, { useState } from 'react';
import './DropdownMenu.css'; // Import custom CSS for styling

const DropdownMenu = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage open/close

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle the dropdown visibility
  };

  const handleOptionClick = (option) => {
    onOptionChange(option); // Pass the selected option to the parent component
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`}>
      {/* Custom dropdown button */}
      <div className="dropdown-button" onClick={toggleDropdown}>
        Menu {/* Keep the button text static */}
        <span className="arrow"> ▼</span> {/* Custom arrow */}
      </div>

      {/* Custom dropdown options */}
      {isOpen && (
        <ul className="dropdown-options">
          <li onClick={() => handleOptionClick('Option1')}>Semnaleaza o problema</li>
          <li onClick={() => handleOptionClick('Option2')}>Option 2</li>
          <li onClick={() => handleOptionClick('Option3')}>Option 3</li>
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;
