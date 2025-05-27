import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {FaCartPlus, FaHeart, FaRegHeart} from 'react-icons/fa';
import { toast } from 'react-toastify';
// import './FavoritesPage.css';

import '../ProductList/ProductList.css'


const FavoritesPage = ({ setShowSidebar, cartItems, setCartItems }) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).userId : null;
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const data = await response.json();
                setFavorites(data);  // Устанавливаем избранные товары
            } catch (error) {
                console.error('Error fetching favorites:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [userId, token, apiUrl]);


    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${apiUrl}${image}` : image;
    };

    const handleFavoriteToggle = async (productId) => {
        if (!token) return history.push('/login');
        try {
            let updatedFavorites;
            if (favorites.some(item => item._id === productId)) {
                await fetch(`${apiUrl}/api/users/${userId}/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                updatedFavorites = favorites.filter(item => item._id !== productId);
            } else {
                await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId }),
                });
                const product = await fetch(`${apiUrl}/api/products/${productId}`).then(res => res.json());
                updatedFavorites = [...favorites, product];
            }

            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };


    const handleAddToCart = (product) => {
        const itemInCart = cartItems.find(item => item.productId === product._id);
        if (itemInCart) {
            const updatedCart = cartItems.map(item =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
            toast.success(`${product.type} ${product.name} добавлен в корзину. Количество увеличено.`);
        } else {
            setCartItems([
                ...cartItems,
                {
                    productId: product._id,
                    image: product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg',
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    size: product.size,
                    color: product.color
                }
            ]);
            toast.success(`${product.type} ${product.name} добавлен в корзину.`);
        }
    };

    const goToCatalog = () => {
        history.push('/catalog');
    };

    //product-list   product-content

    return (
        <div className="product-list-container">
                <h2 className="product-list-container-title favorites-title">Избранные товары</h2>
                <div className="product-list favorite-page-content ">
                    {loading ? (

                        <div className="d-flex justify-content-center" style={{margin: "0 auto"}}>
                            <div className="spinner-border" role="status" style={{margin: "0 auto", textAlign:"center"}}>
                                {/*<span className="visually-hidden">Loading...</span>*/}
                            </div>
                        </div>

                    ) : favorites.length === 0 ? (
                        <div className="emptyCartEls-all favorite-page-content-empty">
                            <div className="emptyCartEls-all favorite-page-content-empty-block">
                                <div className="emptyCartEls favorite-page-content-empty-text">
                                    <div className="emptyCart">Ваша страница избранных товаров пока пуста, кликните сюда, чтобы преобрести товар</div>
                                </div>
                                <div className="empty-cart-login">
                                    <div>Приступить к покупкам</div>
                                    <button className="empty-cart-login-button" onClick={goToCatalog}>
                                        Каталог
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        favorites.map(item => (
                            <div className={`product-card ${!item.isActive ? 'inactive-product' : ''}`} key={item._id}>
                                {item.isActive ? (
                                    <div className="product-card-images">
                                        {item.originalPrice && item.originalPrice > item.price && (
                                            <div className="discount-percentage-badge">
                                                -{Math.floor((item.originalPrice - item.price) / item.originalPrice * 100)}%
                                            </div>
                                        )}
                                        <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(item._id); }}>
                                            {favorites.some(fav => fav._id === item._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                                        </div>
                                        <Link to={`/products/${item._id}`}>
                                            <div>
                                                <img
                                                    src={item.images && item.images.length > 0 ? getFullImageUrl(item.images[0]) : 'placeholder.jpg'}
                                                    alt={item.name}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="product-card-images">
                                        <img src="placeholder.jpg" alt="Product not available" />
                                    </div>
                                )}
                                <div className="product-card-details">
                                    <div className="product-list-details-brand-and-name">
                                        <div className="product-list-type">{item.type.length > 10 ? item.type.substring(0, 10) + '...' : item.type}</div>
                                        <div className="product-list-brand">{item.brand.length > 10 ? item.brand.substring(0, 10) + '...' : item.brand}</div>
                                    </div>
                                    <div className="discounted-price">
                                        {item.originalPrice ? (
                                            <div className="price-red">{item.price}сом</div>
                                        ) : (
                                            <div className="price">{item.price}сом</div>
                                        )}
                                        {item.originalPrice && item.originalPrice > item.price && (
                                            <div className="original-price"><s style={{ display: "inline" }}>{item.originalPrice}сом</s></div>
                                        )}
                                    </div>
                                    <div className="product-list-actions">
                                        <button className="add-to-cart-button cart-button" onClick={() => handleAddToCart(item)}>
                                            <FaCartPlus /> В корзину
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

        </div>
    );
};

export default FavoritesPage;
