import React from 'react';
import '../../stylesheets/ProblemModal.css';

const ProblemModal = ({ onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Problem submitted successfully!');
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Semnaleaza o Problema</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Detalii Problema:
                        <textarea required />
                    </label>
                    <div className="modal-buttons">
                        <button type="submit">Trimite</button>
                        <button type="button" onClick={onClose}>
                            Inchide
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProblemModal;