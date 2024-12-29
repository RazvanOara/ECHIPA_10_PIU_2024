import React, { useState } from 'react';
import MapComponent from './Components/MapComponent';
import DropdownMenu from './Components/DropdownMenu';
import './App.css'; // Optional for global styles

const App = () => {
  const [setSelectedOption] = useState('');

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {/* Dropdown Menu */}
      <DropdownMenu onOptionChange={handleOptionChange} />

      <MapComponent location={[46.7712, 23.6236]} />
    </div>
  );
};

export default App;
