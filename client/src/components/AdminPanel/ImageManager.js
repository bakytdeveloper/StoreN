import React from 'react';
import admin_cross from './admin-images/admin-cross.png';
import admin_up from './admin-images/admin-up.png';
import admin_down from './admin-images/admin-down.png';

const ImageManager = ({ image, index, onMoveUp, onMoveDown, onRemove }) => {
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере


    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };


    return (
        <div className="image-manager">
               <button className="image-manager-move-up" type="button" onClick={() => onMoveUp(index)}>
                <img src={admin_up}/>
            </button>

            <img src={getFullImageUrl(image)} alt={`Image ${index + 1}`} style={{ width: '70px', height: '70px' }} />

            <button className="image-manager-move-down" type="button" onClick={() => onMoveDown(index)}>
                <img src={admin_down}/>
            </button>
            <button className="image-manager-move-delete" type="button" onClick={() => onRemove(index)}>
                <img src={admin_cross}/>
            </button>
        </div>
    );
};

export default ImageManager;