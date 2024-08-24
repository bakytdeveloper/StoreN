
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NewestProducts.css';



const NewestProducts = ({ apiUrl }) => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [columns, setColumns] = useState(6); // начальное значение колонок
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере

    // const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);


    useEffect(() => {
        const fetchNewestProducts = async () => {
            try {
                let limit;
                if (windowWidth >= 1800) {
                    limit = 20;
                } else if (windowWidth >= 1500) {
                    limit = 15;
                } else if (windowWidth >= 1200) {
                    limit = 15;
                } else if (windowWidth >= 960) {
                    limit = 12;
                } else if (windowWidth >= 900) {
                    limit = 12;
                } else {
                    limit = 8;
                }

                const response = await fetch(`${apiUrl}/api/products/newest?limit=${limit}`, { timeout: 10000 });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setNewestProducts(data);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching newest products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewestProducts();
    }, [apiUrl, windowWidth]);

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    // Хук для отслеживания изменения размера окна
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    const calculateDiscountPercentage = (originalPrice, price) => {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.floor((originalPrice - price) / originalPrice * 100).toFixed();
    };

    return (
        <div className="newest-products">
            {/*<h2 className="newest-products-title">Самые Новые Товары</h2>*/}
            <div className="product-list new-product" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {newestProducts.map((product) => (
                    <div className="product-card new-cards" key={product._id}>
                        <Link to={`/products/${product._id}`}>

                            <div className="product-card-images">
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <div className="discount-percentage-badge">
                                        -{calculateDiscountPercentage(product.originalPrice, product.price)}%
                                    </div>
                                )}
                                <img
                                    src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'}
                                    alt={product.name}
                                />
                            </div>


                            <div className="details-new-product">

                                <div className="brand-and-name-new">
                                    <div className="type">{product.type.length > 10 ? product.type.substring(0, 10) + '...' : product.type}</div>
                                    <div className="brand new-brand">{product.brand.length > 7 ? product.brand.substring(0, 7) + '...' : product.brand}</div>
                                </div>

                               <div className="discounted-price-new">

                                    {product.originalPrice ? (
                                        <div className="price-red" style={{fontSize:"18px"}}>{product.price}с</div>
                                    ) : (
                                        <div className="price" style={{fontSize:"18px"}}>{product.price}с</div>
                                    )}

                                {product.originalPrice && product.originalPrice > product.price && (
                                    <div className="original-price"><s>{product.originalPrice}с</s></div>
                                )}
                            </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewestProducts;


