import React, { useState } from 'react';
import './DropdownMenu.css';
import ProblemModal from "../modals/ProblemModal";

const DropdownMenu = ({ onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (option === 'Semnaleaza o problema') {
      setIsModalOpen(true);
    } else {
      onOptionChange(option);
    }
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
      <div className={`dropdown-menu ${isOpen ? 'open' : 'closed'}`}>
        <div className="dropdown-button" onClick={toggleDropdown}>
          Menu <span className="arrow">▼</span>
        </div>
        {isOpen && (
            <ul className="dropdown-options">
              <li onClick={() => handleOptionClick('Semnaleaza o problema')}>
                Semnaleaza o problema
              </li>
              <li onClick={() => handleOptionClick('Option 2')}>Option 2</li>
              <li onClick={() => handleOptionClick('Option 3')}>Option 3</li>
            </ul>
        )}
        {isModalOpen && <ProblemModal onClose={closeModal} />}
      </div>
  );
};

export default DropdownMenu;