
// !!!!!
import React, { useState, useEffect, useRef } from 'react';
import {Link, useHistory} from 'react-router-dom';
import './RelatedSellerProducts.css';
import sliderLeft from './sliderLeft.png';
import sliderRight from './sliderRight.png';
import {jwtDecode} from "jwt-decode";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const RelatedSellerProducts = ({ productId }) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
    // eslint-disable-next-line
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const fetchRelatedSellerProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/seller/products`);
                if (response.ok) {
                    const data = await response.json();
                    setSellerProducts(data);
                } else {
                    console.error('Error fetching related seller products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related seller products:', error);
            }
        };
        fetchRelatedSellerProducts();
    }, [productId]);

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        let count = 5; // Количество карточек по умолчанию
        if (screenWidth <= 1100) {
            count = 4; // Изменить количество карточек для экранов <= 1100px
        }
        if (screenWidth <= 960) {
            count = 3; // Изменить количество карточек для экранов <= 960px
        }
        if (screenWidth <= 768) {
            count = sellerProducts.length; // Показать все карточки на маленьких экранах
        }
        setCardCount(count);
    };



    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line
    }, [sellerProducts.length]);

    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(sellerProducts.length - cardCount, prevIndex + cardCount));
    };

    const handleCardClick = () => {
        document.documentElement.scrollTop = 0;
    };

    const token = localStorage.getItem('token');
    let userId;

    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId; // или decodedToken.id в зависимости от структуры вашего токена
    }


    useEffect(() => {
        const fetchFavorites = async () => {
            // 1. Проверяем наличие необходимых данных для запроса
            if (!userId || !token) {
                setFavorites([]); // Сбрасываем избранное если нет авторизации
                return;
            }

            try {
                // 2. Выполняем запрос с обработкой возможных ошибок сети
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/users/${userId}/favorites`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    }
                );

                // 3. Проверяем статус ответа
                if (!response.ok) {
                    // Если 401 - пользователь не авторизован
                    if (response.status === 401) {
                        console.warn('User not authorized');
                    }
                    setFavorites([]);
                    return;
                }

                // 4. Парсим ответ и проверяем его структуру
                const data = await response.json();

                // 5. Обрабатываем разные форматы ответа
                if (Array.isArray(data)) {
                    // Если массив объектов с _id
                    if (data.length > 0 && data[0]._id) {
                        setFavorites(data.map(item => item._id));
                    }
                    // Если массив строк (ID)
                    else {
                        setFavorites(data);
                    }
                } else {
                    console.warn('Unexpected favorites data format:', data);
                    setFavorites([]);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
                setFavorites([]); // Всегда сбрасываем при ошибках
            }
        };

        fetchFavorites();
    }, [userId, token]); // Зависимости для повторного запроса


    const handleFavoriteToggle = async (productId) => {
        try {
            if (!token) {
                history.push('/login')
            }

            if (favorites.includes(productId)) {
                // Удаление из избранного
                await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setFavorites(favorites.filter(id => id !== productId));
            } else {
                // Добавление в избранное
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

    return (
        <div className="related-seller-products">
            <h2 className="related-seller-products-title">Другие товары продавца</h2>
            <div className="product-list-related-seller-products"  ref={containerRef} onScroll={handleScroll}>
                <button className={`slider-control-one-left ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    <img src={sliderLeft} alt="img"/>
                </button>
                {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-cards-related-seller-products" key={product._id}>
                        <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(product._id); }}>
                            {favorites.includes(product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                        </div>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details-related-seller-products">
                                <div className="type-related-seller-products">{product.type}</div>
                                <div className="brand-related-seller-products">{product.brand}</div>
                                <div className="name-related-seller-products">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                <button className={`slider-control-one-right ${currentIndex + cardCount >= sellerProducts.length ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= sellerProducts.length}>
                    <img src={sliderRight} alt="img"/>
                </button>
            </div>
        </div>
    );
};

export default RelatedSellerProducts;