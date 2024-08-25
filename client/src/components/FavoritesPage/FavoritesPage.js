import React, {useState, useEffect, useRef} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {FaCartPlus, FaHeart, FaPlus, FaRegHeart, FaShoppingCart} from 'react-icons/fa';
import { toast } from 'react-toastify';



// const FavoritesPage = ({ setShowSidebar }) => {
//     const [favorites, setFavorites] = useState([]);
//     const apiUrl = process.env.REACT_APP_API_URL;
//     const token = localStorage.getItem('token');
//     const userId = token ? jwtDecode(token).userId : null;
//     const [cartItems, setCartItems] = useState([]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchFavorites = async () => {
//             if (userId) {
//                 try {
//                     const response = await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//                     setFavorites(data);
//                 } catch (error) {
//                     console.error('Error fetching favorites:', error);
//                 }
//             }
//         };
//         fetchFavorites();
//     }, [userId, token, apiUrl]);
//
//     const getFullImageUrl = (image) => {
//         return image.startsWith('/uploads') ? `${apiUrl}${image}` : image;
//     };
//
//     const handleFavoriteToggle = async (productId) => {
//         try {
//             if (favorites.some(item => item._id === productId)) {
//                 await fetch(`${apiUrl}/api/users/${userId}/favorites/${productId}`, {
//                     method: 'DELETE',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 setFavorites(favorites.filter(item => item._id !== productId));
//             } else {
//                 await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ productId }),
//                 });
//                 const product = await fetch(`${apiUrl}/api/products/${productId}`).then(res => res.json());
//                 setFavorites([...favorites, product]);
//             }
//         } catch (error) {
//             console.error('Error toggling favorite:', error);
//         }
//     };
//
//
//
//     const handleAddToCart = (product) => {
//         if (!cartItems) return;  // Добавьте проверку на `undefined` или `null`
//
//         const itemInCart = cartItems.find(item => item.productId === product._id);
//         if (itemInCart) {
//             const updatedCart = cartItems.map(item => item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item);
//             setCartItems(updatedCart);
//             toast.success(`${product.type} ${product.name} добавлен в корзину. Количество увеличено.`);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg',
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                     size: product.size,
//                     color: product.color,
//                 }
//             ]);
//             toast.success(`${product.type} ${product.name} добавлен в корзину.`);
//         }
//     };
//
//     return (
//         <div className="product-list-container">
//             <h2 className="product-list-container-title">Избранные товары</h2>
//             <div className="product-list favorite-page-content">
//                 {favorites.length === 0 ? (
//                     <p>В избранных товарах ничего нет.</p>
//                 ) : (
//                     favorites.map(item => (
//                         <div className={`product-card ${!item.isActive ? 'inactive-product' : ''}`} key={item._id}>
//                             <div className="product-card-images">
//                                 {item.originalPrice && item.originalPrice > item.price && (
//                                     <div className="discount-percentage-badge">
//                                         - {Math.floor((item.originalPrice - item.price) / item.originalPrice * 100)}%
//                                     </div>
//                                 )}
//                                 <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(item._id); }}>
//                                     {favorites.some(fav => fav._id === item._id) ? <FaHeart color="red" /> : <FaRegHeart />}
//                                 </div>
//                                 <Link to={`/products/${item._id}`}>
//                                     <div>
//                                         <img src={item.images && item.images.length > 0 ? getFullImageUrl(item.images[0]) : 'placeholder.jpg'} alt={item.name} />
//                                     </div>
//                                 </Link>
//                                 <button className="add-to-cart-button" onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}>
//                                     <FaPlus />
//                                 </button>
//                             </div>
//                             <div className="product-card-details">
//                                 <div className="product-list-details-brand-and-name">
//                                     <div className="product-list-type">{item.type.length > 10 ? item.type.substring(0, 10) + '...' : item.type}</div>
//                                     <div className="product-list-brand">{item.brand.length > 10 ? item.brand.substring(0, 10) + '...' : item.brand}</div>
//                                 </div>
//                                 <div className="discounted-price">
//                                     {item.originalPrice ? (
//                                         <div className="price-red">{item.price}сом</div>
//                                     ) : (
//                                         <div className="price">{item.price}сом</div>
//                                     )}
//                                     {item.originalPrice && item.originalPrice > item.price && (
//                                         <div className="original-price">
//                                             <s style={{ display: "inline" }}>{item.originalPrice}сом</s>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default FavoritesPage;

import './FavoritesPage.css';



const FavoritesPage = ({ setShowSidebar, cartItems, setCartItems }) => {
    const [favorites, setFavorites] = useState([]);
    // const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode(token).userId : null;
    const history = useHistory();
    const location = useLocation();
    const previousPathname = useRef(location.pathname);

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    const data = await response.json();
                    setFavorites(data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchFavorites();
    }, [userId, token, apiUrl]);

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${apiUrl}${image}` : image;
    };

    const handleFavoriteToggle = async (productId) => {
        try {
            if (favorites.some(item => item._id === productId)) {
                await fetch(`${apiUrl}/api/users/${userId}/favorites/${productId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setFavorites(favorites.filter(item => item._id !== productId));
            } else {
                await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId }),
                });
                const product = await fetch(`${apiUrl}/api/products/${productId}`).then(res => res.json());
                setFavorites([...favorites, product]);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    // const handleAddToCart = (product) => {
    //     const existingItem = cartItems.find(item => item._id === product._id);
    //     if (existingItem) {
    //         setCartItems(
    //             cartItems.map(item =>
    //                 item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    //             )
    //         );
    //     } else {
    //         setCartItems([...cartItems, { ...product, quantity: 1 }]);
    //     }
    // };


    // Добавление продукта в корзину покупок
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


    return (
        <div className="product-list-container">
            <h2 className="product-list-container-title favorites-title">Избранные товары</h2>
            <div className="product-list favorite-page-content">
                {loading ? (
                    <h2 className="favorite-page-content-loading">Загрузка...</h2>
                ) : favorites.length === 0 ? (
                    <div className="favorite-page-content-loading-text">В избранных товарах ничего нет.</div>
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
                                    <button className="add-to-cart-button" onClick={() => handleAddToCart(item)}>
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