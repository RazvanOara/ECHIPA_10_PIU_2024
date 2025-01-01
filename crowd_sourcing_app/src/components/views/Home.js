import React, { useState } from 'react';
import DropdownMenu from "../DropDown/DropdownMenu";
import MapComponent from "../Map/MapComponent";

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);

  const handleOptionChange = (option) => {
    if (option === 'Option1') {
      setIsAddingMarker(true); 
    }
  };

  const handleMapClick = (e) => {
    if (isAddingMarker) {
      const { lat, lng } = e.latlng;
      const userText = prompt("Descrieti problema:");
      const currentDate = new Date().toLocaleString();

      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          lat,
          lng,
          description: userText,
          status: "In Desfasurare",
          date: currentDate,
        },
      ]);
      setIsAddingMarker(false);
    }
  };

  return (
    <div>
      <DropdownMenu onOptionChange={handleOptionChange} />
      <MapComponent markers={markers} onMapClick={handleMapClick} />
    </div>
  );
};

export default Home;
