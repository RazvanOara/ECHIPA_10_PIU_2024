import React, { useState } from 'react';
import DropdownMenu from "../DropDown/DropdownMenu";
import MapComponent from "../Map/MapComponent";
import ProblemModal from "../modals/ProblemModal";

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleOptionChange = (option) => {
    if (option === 'Semnaleaza o problema') {
      setIsAddingMarker(true); 
    }
  };

  const handleMapClick = (e) => {
    if (isAddingMarker) {
      const { lat, lng } = e.latlng;
      setModalData({ lat, lng }); 
      setIsAddingMarker(false); 
    }
  };

  const handleModalSubmit = (description) => {
    if (modalData) {
      const currentDate = new Date().toLocaleString();
      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          lat: modalData.lat,
          lng: modalData.lng,
          description,
          status: "In Desfasurare",
          date: currentDate,
        },
      ]);
      setModalData(null); 
    }
  };

  const handleModalClose = () => {
    setModalData(null); 
  };

  return (
    <div>
      <DropdownMenu onOptionChange={handleOptionChange} />
      <MapComponent markers={markers} onMapClick={handleMapClick} />
      {modalData && (
        <ProblemModal
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default Home;
