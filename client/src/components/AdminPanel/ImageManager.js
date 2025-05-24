import React from 'react';
import admin_cross from './admin-images/admin-cross.png';

const ImageManager = ({ image, index, onMoveUp, onMoveDown, onRemove }) => {
    const imageBaseUrl = process.env.REACT_APP_API_URL;

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    return (
        <div className="image-manager-item">
            <div className="image-manager-preview">

                <img
                    src={getFullImageUrl(image)}
                    alt={`Image ${index + 1}` || ''}
                    className="image-preview"
                />
            </div>
            <div className="image-manager-controls">
                <button
                    className="image-manager-btn move-left"
                    type="button"
                    onClick={() => onMoveUp(index)}
                    aria-label="Move image left"
                >
                    &larr; {/* Символ стрелки влево */}
                </button>
                <button
                    className="image-manager-btn move-right"
                    type="button"
                    onClick={() => onMoveDown(index)}
                    aria-label="Move image right"
                >
                    &rarr; {/* Символ стрелки вправо */}
                </button>
                <button
                    className="image-manager-btn remove"
                    type="button"
                    onClick={() => onRemove(index)}
                    aria-label="Remove image"
                >
                    <img src={admin_cross} alt="Remove" />
                </button>
            </div>
        </div>
    );
};

export default ImageManager;