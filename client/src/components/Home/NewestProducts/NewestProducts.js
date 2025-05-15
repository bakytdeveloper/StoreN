
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './NewestProducts.css';
import {jwtDecode} from "jwt-decode";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const NewestProducts = ({ apiUrl }) => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [columns, setColumns] = useState(6);
    const [favorites, setFavorites] = useState([]);

    const history = useHistory();
    const imageBaseUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    let userId;

    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
    }

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

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchFavorites = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/favorites`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setFavorites(data.map(item => item._id));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId, token]);

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    const calculateDiscountPercentage = (originalPrice, price) => {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.floor((originalPrice - price) / originalPrice * 100).toFixed();
    };

    const handleFavoriteToggle = async (productId) => {
        try {
            if (!token) {
                history.push('/login');
                return;
            }

            if (favorites.includes(productId)) {
                await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setFavorites(favorites.filter(id => id !== productId));
            } else {
                await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/favorites`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId })
                });
                setFavorites([...favorites, productId]);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <div className="newest-products">
            <div className="product-list new-product new-product-cards" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {newestProducts.map((product) => (
                    <div className="product-card new-cards" key={product._id}>
                        <div className="product-card-images">
                            {product.originalPrice && product.originalPrice > product.price && (
                                <div className="discount-percentage-badge">
                                    -{calculateDiscountPercentage(product.originalPrice, product.price)}%
                                </div>
                            )}
                            <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(product._id); }}>
                                {favorites.includes(product._id) ? <FaHeart color="red" /> : <FaRegHeart color="grey" />}
                            </div>
                            <Link to={`/products/${product._id}`}>
                                <img
                                    src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'}
                                    alt={product.name}
                                />
                            </Link>
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewestProducts;
