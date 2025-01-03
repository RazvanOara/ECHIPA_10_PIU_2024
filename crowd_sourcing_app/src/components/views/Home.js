import React, { useState, useEffect } from 'react';
import DropdownMenu from "../modals/DropdownMenu";
import MapComponent from "../Map/MapComponent";
import ProblemModal from "../modals/ProblemModal";
import FilteringPopup from "../modals/FilteringPopup"; // Import FilteringPopup
import SolutionsPopup from "../modals/SolutionsPopup"; // Import the SolutionsPopup
import CommunityEventsPopup from "../modals/CommunityEventsPopup"; // Import the CommunityEventsPopup
import PoliceMeetingsPopup from "../modals/PoliceMeetingsPopup"; // Import the PoliceMeetingsPopup
import CampaignsPopup from "../modals/CampaignsPopup"; // Import the CampaignsPopup

const Home = () => {
  const [markers, setMarkers] = useState([]); // Currently displayed markers
  const [originalMarkers, setOriginalMarkers] = useState([]); // Store original markers
  const [isAddingMarker, setIsAddingMarker] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [isFiltering, setIsFiltering] = useState(false); // Track if filtering popup is shown
  const [selectedStatus, setSelectedStatus] = useState(''); // Track the selected filter status
  const [clickedMarker, setClickedMarker] = useState(null); // Track the clicked marker for solutions
  const [isSolutionsPopupOpen, setIsSolutionsPopupOpen] = useState(false); // Track if the solutions popup is open
  const [newSolution, setNewSolution] = useState(''); // Track the new solution text
  const [activePopup, setActivePopup] = useState(null); // Track which popup is active

  // Load markers from localStorage when the component mounts
  useEffect(() => {
    const storedMarkers = JSON.parse(localStorage.getItem('markers'));
    if (storedMarkers) {
      setMarkers(storedMarkers);
      setOriginalMarkers(storedMarkers); // Store the original markers
    }
  }, []);

  // Save markers to localStorage whenever they change
  useEffect(() => {
    if (markers.length > 0) {
      localStorage.setItem('markers', JSON.stringify(markers));
    }
  }, [markers]);

  const handleOptionChange = (option) => {
    if (option === 'Semnaleaza o problema') {
      setIsAddingMarker(true); // Enable marker addition mode
      setIsFiltering(false); // Close filtering popup if it was open
    } else if (option === 'Filtreaza') {
      setIsFiltering(true); // Show the filtering popup
      setIsAddingMarker(false); // Close marker addition mode if it was open
    } else if (option === 'Evenimente comunitare') {
      setActivePopup('communityEvents'); // Show the community events popup
    } else if (option === 'Rezervare sedinte politie') {
      setActivePopup('policeMeetings'); // Show the police meetings popup
    } else if (option === 'Campanii') {
      setActivePopup('campaigns'); // Show the campaigns popup
    }
  };

  const handlePopupClose = () => {
    setActivePopup(null); // Close the active popup
  };

  const handleMapClick = (e) => {
    if (isAddingMarker) {
      const { lat, lng } = e.latlng;
      setModalData({ lat, lng }); // Store the clicked location
      setIsAddingMarker(false); // Disable marker addition mode
    }
  };

  const handleModalSubmit = (description) => {
    if (modalData) {
      const currentDate = new Date().toLocaleString();
      const newMarker = {
        lat: modalData.lat,
        lng: modalData.lng,
        description,
        status: "In Desfasurare", // Make sure the status is set correctly
        date: currentDate,
        solutions: [] // Initialize solutions as an empty array
      };

      setMarkers((prevMarkers) => {
        const updatedMarkers = [...prevMarkers, newMarker];
        return updatedMarkers;
      });
      setModalData(null); // Close the modal
    }
  };

  const handleModalClose = () => {
    setModalData(null); // Close the modal without adding a marker
  };

  const handleFilterClose = (status) => {
    setSelectedStatus(status); // Set the selected status when the filter is applied
    setIsFiltering(false); // Close the filtering popup

    // Filter markers based on selected status
    if (status && status !== '') {
      const filteredMarkers = originalMarkers.filter((marker) => {
        return marker.status.toLowerCase() === status.toLowerCase();
      });
      setMarkers(filteredMarkers); // Set the filtered markers
    } else {
      setMarkers(originalMarkers); // Reset to original markers
    }
  };

  const handleSolutionsPopupClose = () => {
    setIsSolutionsPopupOpen(false); // Close the solutions popup
  };

  const handleShowSolutions = (marker) => {
    setClickedMarker(marker); // Set the clicked marker
    setIsSolutionsPopupOpen(true); // Open the solutions popup
  };

  const handleAddSolution = (solution) => {
    if (clickedMarker) {
      const updatedMarkers = markers.map((marker) => {
        if (marker === clickedMarker) {
          const updatedMarker = {
            ...marker,
            solutions: [...marker.solutions, solution] // Add new solution to the marker's solutions
          };

          // Update the clickedMarker state to trigger a re-render of SolutionsPopup
          setClickedMarker(updatedMarker);

          return updatedMarker;
        }
        return marker;
      });

      setMarkers(updatedMarkers); // Update markers with the new solution
      setNewSolution(''); // Clear the input field
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
          selectedStatus={selectedStatus} // Pass the selected status to FilteringPopup
        />
      )}

      {/* Solutions Popup */}
      {isSolutionsPopupOpen && (
        <SolutionsPopup
          onClose={handleSolutionsPopupClose}
          marker={clickedMarker} // Pass the clicked marker to the solutions popup
          handleAddSolution={handleAddSolution} // Function to add a solution
        />
      )}

      {/* Show the appropriate popup based on the active state */}
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
