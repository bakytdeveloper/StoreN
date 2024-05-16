import React, { useState } from 'react';
import './ProductTabs.css';

const ProductTabs = ({ description, characteristics }) => {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className="product-tabs">
            <div className="tab-header">
                <div
                    className={activeTab === 'description' ? 'tab-item active' : 'tab-item'}
                    onClick={() => setActiveTab('description')}
                >
                    Описание
                </div>
                <div
                    className={activeTab === 'characteristics' ? 'tab-item active' : 'tab-item'}
                    onClick={() => setActiveTab('characteristics')}
                >
                    Характеристики
                </div>
                <div
                    className={activeTab === 'reviews' ? 'tab-item active' : 'tab-item'}
                    onClick={() => setActiveTab('reviews')}
                >
                    Отзывы
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'description' && <div className="description-content">{description}</div>}
                {activeTab === 'characteristics' && (
                    <div className="characteristics-content">
                        <h3>Характеристики:</h3>
                        <ul>
                            {characteristics.map((char) => (
                                <li className="character" key={char.name}>
                                    <strong>{char.name}:</strong> {char.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {activeTab === 'reviews' && <div className="reviews-content">Здесь будут отзывы</div>}
            </div>
        </div>
    );
};

export default ProductTabs;
