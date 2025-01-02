import React, { useState } from 'react';
import '../../stylesheets/ProblemModal.css';

const ProblemModal = ({ onClose, onSubmit }) => {
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(description); 
        setDescription(''); 
    };

    const handleChange = (e) => {
        setDescription(e.target.value); 
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Semnaleaza o Problema</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Detalii Problema:
                        <textarea
                            value={description}
                            onChange={handleChange}
                            required
                        />
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
