import React, { useState } from 'react';
import './ProductTabs.css';

const ProductTabs = ({ description, characteristics }) => {
    const [activeTab, setActiveTab] = useState('description');

    return (
        <div className="product-tabs">
            <div className="tab-header">
                <button
                    className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Описание
                </button>
                <button
                    className={`tab-btn ${activeTab === 'characteristics' ? 'active' : ''}`}
                    onClick={() => setActiveTab('characteristics')}
                >
                    Характеристики
                </button>
                <button
                    className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                >
                    Отзывы
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'description' && (
                    <div className="description-content">
                        <h3 className="content-title">Описание товара</h3>
                        <div className="description-text">{description}</div>
                    </div>
                )}

                {activeTab === 'characteristics' && (
                    <div className="characteristics-content">
                        <h3 className="content-title">Технические характеристики</h3>
                        <div className="characteristics-grid">
                            {characteristics.map((char, index) => (
                                <React.Fragment key={index}>
                                    <div className="characteristic-name">{char.name}</div>
                                    <div className="characteristic-value">{char.value}</div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="reviews-content">
                        <h3 className="content-title">Отзывы о товаре</h3>
                        <p>Здесь будут отображаться отзывы покупателей</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductTabs;