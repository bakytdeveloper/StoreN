import React, {useState, useEffect, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './RelatedProducts.css';
import sliderLeft from './sliderLeft.png';
import sliderRight from './sliderRight.png';
import {jwtDecode} from "jwt-decode";
import {FaHeart, FaRegHeart} from "react-icons/fa";

const RelatedProducts = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере
    const [favorites, setFavorites] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/related/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRelatedProducts(data);
                } else {
                    console.error('Error fetching related products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [productId]);

    useEffect(() => {
        const handleResizes = () => {
            const screenWidth = window.innerWidth;
            let count = 5; // Количество карточек по умолчанию

            if (screenWidth <= 1100) {
                count = 4; // Изменить количество карточек для экранов <= 1100px
            }
            if (screenWidth <= 960) {
                count = 3; // Изменить количество карточек для экранов <= 960px
            }
            if (screenWidth <= 768) {
                count = relatedProducts.length; // Показать все карточки на маленьких экранах
            }
            setCardCount(count);
        };

        // Вызываем обработчик при инициализации компонента
        handleResizes();

        // Добавляем обработчик события изменения размера окна
        window.addEventListener('resize', handleResizes);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResizes);
        };
    }, [relatedProducts]); // Добавляем sellerProducts в зависимости, чтобы обновить cardCount при изменении данных


    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };


    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(relatedProducts.length - cardCount, prevIndex + cardCount));
    };

    const handleCardClick = () => {
        document.documentElement.scrollTop = 0;
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
        <div className="related-products">
            {!!relatedProducts.length && <h2>Схожие товары</h2>}
            <div className="product-list-related-products"  ref={containerRef} onScroll={handleScroll}>
                <button className={`slider-control-one-left ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    {/*&#8592; Назад*/}
                    <img src={sliderLeft}/>
                </button>
                {relatedProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-cards-related-products" key={product._id}>
                        <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(product._id); }}>
                            {favorites.includes(product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                        </div>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details-related-products">
                                <div className="type-related-products">{product.type}</div>
                                <div className="brand-related-products">{product.brand}</div>
                                <div className="name-related-products">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                <button className={`slider-control-one-right ${currentIndex + cardCount >= relatedProducts.length ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= relatedProducts.length}>
                    {/*Вперёд &#8594;*/}
                    <img src={sliderRight}/>

                </button>
            </div>
        </div>
    );
};

export default RelatedProducts;
