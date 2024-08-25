


import React, {useState, useEffect, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './RelatedAccessories.css';

import sliderLeft from './sliderLeft.png';
import sliderRight from './sliderRight.png';
import {jwtDecode} from "jwt-decode";
import {FaHeart, FaRegHeart} from "react-icons/fa";



const RelatedAccessories = ({ direction }) => {
    const [accessories, setAccessories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере
    const [favorites, setFavorites] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/accessories/${direction}`);
                if (response.ok) {
                    const data = await response.json();
                    setAccessories(data);
                } else {
                    console.error('Error fetching related accessories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related accessories:', error);
            }
        };

        fetchAccessories();
    }, [direction]);

    useEffect(() => {
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
                count = accessories.length; // Показать все карточки на маленьких экранах
            }

            setCardCount(count);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [accessories.length]);

    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(accessories.length - cardCount, prevIndex + cardCount));
    };

    const handleCardClick = () => {
        document.documentElement.scrollTop = 0;
    };

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };


    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };


    const token = localStorage.getItem('token');
    let userId;

    if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId; // или decodedToken.id в зависимости от структуры вашего токена
    }


    useEffect(() => {
        const fetchFavorites = async () => {
            try {



                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${userId}/favorites`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await response.json();
                setFavorites(data.map(item => item._id)); // Предполагается, что данные содержат только идентификаторы
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [userId, token]);


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
        <div className="related-accessories">
            {!!accessories.length && <h2>Аксессуары</h2>}
            <div className="products-list-related-accessories"  ref={containerRef} onScroll={handleScroll}>
                <button className={`slider-control-one-left ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    {/*&#8592; Назад*/}
                    <img src={sliderLeft}/>
                </button>
                {accessories.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-card-related-accessories" key={product._id}>
                        <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(product._id); }}>
                            {favorites.includes(product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                        </div>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details-related-accessories">
                                <div className="type-related-accessories">{product.type}</div>
                                <div className="brand-related-accessories">{product.brand}</div>
                                <div className="name-related-accessories">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                <button className={`slider-control-one-right ${currentIndex + cardCount >= accessories.length ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= accessories.length}>
                    {/*Вперёд &#8594;*/}
                    <img src={sliderRight}/>
                </button>
            </div>
        </div>
    );
};

export default RelatedAccessories;
