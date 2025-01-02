import React, { useState, useEffect } from 'react';
import DropdownMenu from "../modals/DropdownMenu";
import MapComponent from "../Map/MapComponent";
import ProblemModal from "../modals/ProblemModal";
import FilteringPopup from "../modals/FilteringPopup";
import SolutionsPopup from "../modals/SolutionsPopup";
import CommunityEventsPopup from "../modals/CommunityEventsPopup";
import PoliceMeetingsPopup from "../modals/PoliceMeetingsPopup";
import CampaignsPopup from "../modals/CampaignsPopup";

const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [originalMarkers, setOriginalMarkers] = useState([]);
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [clickedMarker, setClickedMarker] = useState(null);
  const [isSolutionsPopupOpen, setIsSolutionsPopupOpen] = useState(false);
  const [newSolution, setNewSolution] = useState('');
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    const storedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (storedMarkers) {
      setMarkers(storedMarkers);
      setOriginalMarkers(storedMarkers);
    }
  }, []);

  useEffect(() => {
    if (markers.length > 0) {
      localStorage.setItem('markers', JSON.stringify(markers));
    }
  }, [markers]);

  const handleOptionChange = (option) => {
    if (option === 'Semnaleaza o problema') {
      setIsAddingMarker(true);
      setIsFiltering(false);
    } else if (option === 'Filtreaza') {
      setIsFiltering(true);
      setIsAddingMarker(false);
    } else if (option === 'Evenimente comunitare') {
      setActivePopup('communityEvents');
    } else if (option === 'Rezervare sedinte politie') {
      setActivePopup('policeMeetings');
    } else if (option === 'Campanii') {
      setActivePopup('campaigns');
    }
  };

  const handlePopupClose = () => {
    setActivePopup(null);
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
      const currentDate = new Date().toLocaleDateString();
      const newMarker = {
        lat: modalData.lat,
        lng: modalData.lng,
        description,
        status: "In Desfasurare",
        date: currentDate,
        solutions: []
      };
  
      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, newMarker];
        return updatedMarkers;
      });
      setModalData(null);
    }
  };

  const handleModalClose = () => {
    setModalData(null);
  };

  const handleFilterClose = (status) => {
    setSelectedStatus(status);
    setIsFiltering(false);

    if (status && status !== '') {
      const filteredMarkers = originalMarkers.filter((marker) => {
        return marker.status.toLowerCase() === status.toLowerCase();
      });
      setMarkers(filteredMarkers);
    } else {
      setMarkers(originalMarkers);
    }
  };

  const handleSolutionsPopupClose = () => {
    setIsSolutionsPopupOpen(false);
  };

  const handleShowSolutions = (marker) => {
    setClickedMarker(marker);
    setIsSolutionsPopupOpen(true);
  };

  const handleAddSolution = (solution) => {
    if (clickedMarker) {
      const updatedMarkers = markers.map((marker) => {
        if (marker === clickedMarker) {
          const updatedMarker = {
            ...marker,
            solutions: [...marker.solutions, solution]
          };

          setClickedMarker(updatedMarker);

          return updatedMarker;
        }
        return marker;
      });

      setMarkers(updatedMarkers);
      setNewSolution('');
    }
  };

  return (
    <div>
      <DropdownMenu onOptionChange={handleOptionChange} />
      <MapComponent markers={markers} onMapClick={handleMapClick} onMarkerClick={handleShowSolutions} />
      {modalData && (
        <ProblemModal
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
      {isFiltering && (
        <FilteringPopup 
          onClose={handleFilterClose} 
          selectedStatus={selectedStatus}
        />
      )}

      {isSolutionsPopupOpen && (
        <SolutionsPopup
          onClose={handleSolutionsPopupClose}
          marker={clickedMarker}
          handleAddSolution={handleAddSolution}
        />
      )}

      {activePopup === 'communityEvents' && (
        <CommunityEventsPopup onClose={handlePopupClose} />
      )}
      {activePopup === 'policeMeetings' && (
        <PoliceMeetingsPopup onClose={handlePopupClose} />
      )}
      {activePopup === 'campaigns' && (
        <CampaignsPopup onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Home;
