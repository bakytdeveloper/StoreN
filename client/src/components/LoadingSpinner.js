import React from 'react';
import '../App.css'; // Импортируем стили

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
