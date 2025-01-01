import React, { useState } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`}>
      <div className="dropdown-button" onClick={toggleDropdown}>
        Menu <span className="arrow">▼</span>
      </div>
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
