
import React, {useState, useEffect, useCallback, useRef} from 'react';
import './ProductList.css';
import bas from './basket.png';
import {Link, useHistory, useLocation} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import left from "./arrowsL.png";
import right from "./arrowsR.png";
import './ProductList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import {Spinner} from "react-bootstrap";

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';
import CustomPagination from "./CustomPagination";
import {jwtDecode} from "jwt-decode";
import {FaHeart, FaRegHeart} from "react-icons/fa";


const ProductList = ({
                         searchKeyword, // Поисковый запрос для фильтрации продуктов
                         cartItems, // Элементы корзины покупок
                         setCartItems, // Функция для обновления элементов корзины покупок
                         products, // Список продуктов для отображения
                         setProducts, // Функция для обновления списка продуктов
                         showSidebar, // Показать боковую панель
                         setShowSidebar, // Функция для управления видимостью боковой панели
                         selectedGender, // Выбранный пол продукта для фильтрации
                         selectedCategory, // Выбранная категория продукта для фильтрации
                         selectedType, // Выбранный тип продукта для фильтрации
                         setSelectedGender, // Функция для обновления выбранного пола продукта
                         setSelectedCategory, // Функция для обновления выбранной категории продукта
                         setSelectedType, // Функция для обновления выбранного типа продукта
                         isFooterCatalog, // Флаг, указывающий, является ли это подвалом каталога
                         onSearch,
                         setSearchTerm,
                         searchTerm
                     }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredProductsNoSearch, setFilteredProductsNoSearch] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [resizeTimer, setResizeTimer] = useState(null);
    const [productsPerPage, setProductsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере
    const previousPathname = useRef(location.pathname);
    const [searchEmptyResult, setSearchEmptyResult] = useState(false);
    const [sellerInfo, setSellerInfo] = useState(null);
    const [lastPath, setLastPath] = useState(location.pathname);
    const [favorites, setFavorites] = useState([]);

    // Сброс фильтров и товаров при возвращении на страницу каталога
    useEffect(() => {
        if (location.pathname === '/catalog') {
            setSelectedGender(null);
            setSelectedCategory(null);
            setSelectedType(null);
            setSearchTerm('');
            onSearch('');
            setCurrentPage(1); // Возвращаемся к первой странице
            history.push(lastPath);
            fetchData(); // Перезагружаем товары
        }
    }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);

    useEffect(() => {
        if (searchTerm === '') {
            setLastPath(location.pathname);
        }
    }, [searchTerm, location.pathname]);

    // Обновление боковой панели при изменении ширины окна
    useEffect(() => {
        const updateSidebar = () => {
            if (windowWidth >= 1200) {
                setShowSidebar(false);
            } else if (windowWidth >= 768) {
                setShowSidebar(false);
            } else {
                setShowSidebar(isFooterCatalog);
            }
        };
        updateSidebar();
    }, [windowWidth, setShowSidebar, isFooterCatalog]);


    // Обновление боковой панели при изменении ширины окна и наличии параметров в URL-адресе
    useEffect(() => {
        const updateSidebar = () => {
            const params = new URLSearchParams(location.search);
            const sellerId = params.get('sellerId');
            if (sellerId && windowWidth <= 768) {
                setShowSidebar(true);
            } else if (windowWidth >= 1200) {
                setShowSidebar(false);
            } else if (windowWidth >= 768) {
                setShowSidebar(false);
            } else {
                setShowSidebar(isFooterCatalog);
            }
        };
        updateSidebar();
    }, [windowWidth, setShowSidebar, isFooterCatalog, location.search]);


    // Сброс выбранных параметров фильтрации при изменении пути URL-адреса
    useEffect(() => {
        if (location.pathname !== previousPathname.current) {
            setSelectedGender(null);
            setSelectedCategory(null);
            setSelectedType(null);
            previousPathname.current = location.pathname;
        }
    }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sellerId = params.get('sellerId');
        if (sellerId) {
            fetchData(sellerId);
        }
    }, [location.search]);



    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(location.search);
            const sellerId = params.get('sellerId');
            const page = params.get('page') || 1;
            const limit = productsPerPage;

            const productsResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}&page=${page}&limit=${limit}${sellerId ? `&sellerId=${sellerId}` : ''}`,
                { timeout: 10000 }
            );
            const productsData = await productsResponse.json();
            setProducts(productsData);
            setFilteredProducts(filterProducts(productsData));
            setFilteredProductsNoSearch(filterProductsNoSearch(productsData));

            if (sellerId) {
                const sellerResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/${sellerId}`);
                const sellerData = await sellerResponse.json();
                setSellerInfo(sellerData);
            } else {
                setSellerInfo(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };



// Устанавливаем page=1 при переходе на страницу каталога
    useEffect(() => {
        if (location.pathname === '/catalog') {
            const params = new URLSearchParams(location.search);
            if (!params.get('page')) {
                params.set('page', '1');
                history.replace({ search: params.toString() });
            }
        }
    }, [location.pathname, location.search, history]);


// Обработка параметров фильтрации из URL-адреса при загрузке страницы
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const gender = params.get('gender');
        const page = params.get('page') ? parseInt(params.get('page'), 10) : 1;
        if (gender) {
            setSelectedGender(decodeURIComponent(gender));
        }
        setCurrentPage(page);
    }, [location.search, setSelectedGender]);



    useEffect(() => {
        // Плавная прокрутка страницы в начало при изменении currentPage
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [currentPage]);




// Запрос данных с сервера при изменении параметров фильтрации
    useEffect(() => {
        fetchData();
    }, [searchKeyword, selectedGender, windowWidth, selectedCategory, selectedType, location.search]);

// Отображение сообщения о пустом результате поиска
    useEffect(() => {
        if (filteredProducts.length === 0 && searchKeyword) {
            setSearchEmptyResult(true);
        } else {
            setSearchEmptyResult(false);
        }
    }, [filteredProducts, searchKeyword]);

// Фильтрация продуктов при получении нового списка продуктов с сервера или изменении текущей страницы пагинации
    useEffect(() => {
        if (products && products.length > 0) {
            const filtered = filterProducts(products);
            const filteredNoSearch = filterProductsNoSearch(products);
            setFilteredProducts(filtered);
            setFilteredProductsNoSearch(filteredNoSearch);
        } else {
            fetchData();
        }
    }, [products, currentPage]);

// Обновление ширины окна браузера при изменении размера окна
    useEffect(() => {
        const handleResize = () => {
            clearTimeout(resizeTimer);
            setResizeTimer(
                setTimeout(() => {
                    setWindowWidth(window.innerWidth);
                }, 200)
            );
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [resizeTimer]);

// Обновление количества отображаемых продуктов на странице при изменении размера окна
    useEffect(() => {
        const updateProductsPerPage = () => {
            if (windowWidth >= 1340) {
                setProductsPerPage(15);
            } else if (windowWidth >= 1200) {
                setProductsPerPage(15);
            } else if (windowWidth < 960) {
                setProductsPerPage(12);
            } else if (windowWidth <= 900) {
                setProductsPerPage(8);
            } else {
                setProductsPerPage(12);
            }
            // if (windowWidth >= 1340) {
            //     setProductsPerPage(1);
            // } else if (windowWidth >= 1200) {
            //     setProductsPerPage(1);
            // } else if (windowWidth < 960) {
            //     setProductsPerPage(1);
            // } else if (windowWidth <= 900) {
            //     setProductsPerPage(1);
            // } else {
            //     setProductsPerPage(1);
            // }
        };
        updateProductsPerPage();
    }, [windowWidth]);

// Фильтрация продуктов по выбранным параметрам
    const filterProducts = (productsToFilter) => {
        const params = new URLSearchParams(location.search);
        const sellerId = params.get('sellerId');

        return productsToFilter
            .filter(product => !selectedGender || product.gender === selectedGender)
            .filter(product => !selectedCategory || product.category === selectedCategory)
            .filter(product => !selectedType || product.type === selectedType)
            .filter(product =>
                searchKeyword
                    ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.type.toLowerCase().includes(searchKeyword.toLowerCase())
                    : true
            )
            .filter(product => !sellerId || product.seller && product.seller._id === sellerId);
    };

// Фильтрация продуктов по выбранным параметрам
    const filterProductsNoSearch = (productsToFilter) => {
        const params = new URLSearchParams(location.search);
        const sellerId = params.get('sellerId');

        return productsToFilter
            .filter(product => !selectedGender || product.gender === selectedGender)
            .filter(product => !selectedCategory || product.category === selectedCategory)
            .filter(product => !selectedType || product.type === selectedType)
            .filter(product => !sellerId || product.seller && product.seller._id === sellerId);
    };

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

// // Переход на следующую страницу пагинации
//     const handleNextPage = () => {
//         const params = new URLSearchParams(location.search);
//         params.set('page', currentPage + 1);
//         history.push({ search: params.toString() });
//         setCurrentPage(currentPage + 1);
//     };
//
// // Переход на предыдущую страницу пагинации
//     const handlePrevPage = () => {
//         const params = new URLSearchParams(location.search);
//         params.set('page', currentPage - 1);
//         history.push({ search: params.toString() });
//         setCurrentPage(currentPage - 1);
//     };

// Вычисление общего количества страниц для пагинации
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const totalPagesNoSearch = Math.ceil(filteredProductsNoSearch.length / productsPerPage);

// Вычисление индекса начала отображаемых продуктов на текущей странице
    const startIndex = (currentPage - 1) * productsPerPage;

// Выборка продуктов для текущей страницы
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
    const displayedProductsNoSearch = filteredProductsNoSearch.slice(startIndex, startIndex + productsPerPage);

// Формирование полного URL-адреса изображения с сервера
    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

// Вычисление процента скидки между оригинальной и текущей ценами продукта
    const calculateDiscountPercentage = (originalPrice, price) => {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.floor((originalPrice - price) / originalPrice * 100).toFixed();
    };

// Обработка скрытия скролла страницы при отображении боковой панели на мобильных устройствах
    useEffect(() => {
        if (!showSidebar && windowWidth <= 768 && location.pathname === "/catalog") {
            document.body.classList.add('no-scroll');
            window.scrollTo(0, 0);
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showSidebar, windowWidth, location.pathname]);

// Определение цвета и ширины прогресс-бара в зависимости от количества товара
    const getProgressBarColor = (quantity) => {
        if (quantity <= 3) return 'red';
        if (quantity <= 10) return 'orange';
        return 'green';
    };

    const getProgressBarWidth = (quantity) => {
        const maxQuantity = 10; // Максимальное количество, при котором прогресс-бар будет заполнен на 100%
        return Math.min((quantity / maxQuantity) * 100, 100) + '%';
    };

// Проверка, находится ли продукт в корзине покупок
    const isInCart = (productId) => {
        return cartItems.some(item => item.productId === productId);
    };

    const clearSearch = () => {
        setSearchTerm('');
        // onSearch('');
    }

    // const handlePageChange = (event, value) => {
    //     const params = new URLSearchParams(location.search);
    //     params.set('page', value);
    //     history.push({ search: params.toString() });
    //     setCurrentPage(value);
    // };

    const handleNextPage = () => {
        const params = new URLSearchParams(location.search);
        const nextPage = currentPage + 1;
        params.set('page', nextPage);
        history.push({ search: params.toString() });
        setCurrentPage(nextPage);
    };

    const handlePrevPage = () => {
        const params = new URLSearchParams(location.search);
        const prevPage = currentPage - 1;
        params.set('page', prevPage);
        history.push({ search: params.toString() });
        setCurrentPage(prevPage);
    };

    const handlePageChange = (event, value) => {
        const params = new URLSearchParams(location.search);
        params.set('page', value);
        history.push({ search: params.toString() });
        setCurrentPage(value);
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
        <div className="product-list-container">
            {/* Заголовок с информацией о продавце, если есть sellerInfo */}
            {sellerInfo && (
                <div className="product-list-seller-info">
                    <div className="seller-info" >
                        <h3>Приветствую Вас в магазине</h3>
                        <h2>{sellerInfo.companyName}</h2>
                        {/* Дополнительная информация о продавце, если нужно */}
                    </div>
                </div>
            )}

            <div className="product-list">
                {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} setShowSidebar={setShowSidebar} selectedOption={selectedCategory} />}

                {loading ? (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            {/*<span className="visually-hidden">Loading...</span>*/}
                        </div>
                    </div>
                ) : (

                    <>
                        {displayedProductsNoSearch && displayedProducts.length ? (
                            displayedProducts.map(product => (
                                <div className={`product-card ${!product.isActive ? 'inactive-product' : ''}`} onClick={clearSearch} key={product._id}>
                                    {product.isActive ? (
                                        <Link to={`/products/${product._id}`}>
                                            <div className="product-card-images">
                                                {product.originalPrice && product.originalPrice > product.price && (
                                                    <div className="discount-percentage-badge">
                                                        - {calculateDiscountPercentage(product.originalPrice, product.price)}%
                                                    </div>
                                                )}
                                                <img src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'} alt={product.name} />

                                                <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(product._id); }}>
                                                    {favorites.includes(product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                                                </div>

                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="product-card-images">
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <div className="discount-percentage-badge">
                                                    - {calculateDiscountPercentage(product.originalPrice, product.price)}%
                                                </div>
                                            )}
                                            <img src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'} alt={product.name} />

                                            <div className="favorite-icon" onClick={(e) => { e.stopPropagation(); handleFavoriteToggle(product._id); }}>
                                                {favorites.includes(product._id) ? <FaHeart color="red" /> : <FaRegHeart />}
                                            </div>

                                        </div>
                                    )}
                                    <div className="product-content">
                                        {product.isActive ? (
                                            <Link to={`/products/${product._id}`}>
                                                <div className="product-list-details">
                                                    <div className="product-list-details-brand-and-name">
                                                        <div className="product-list-type">{product.type.length > 10 ? product.type.substring(0, 10) + '...' : product.type}</div>
                                                        <div className="product-list-brand">{product.brand.length > 10 ? product.brand.substring(0, 10) + '...' : product.brand}</div>
                                                    </div>
                                                    <div className="discounted-price">
                                                        {product.originalPrice ? (
                                                            <div className="price-red">{product.price}<span className="price-som">сом</span></div>
                                                        ) : (
                                                            <div className="price">{product.price}<span style={{ color: "black" }} className="price-som">сом</span></div>
                                                        )}
                                                        {product.originalPrice && product.originalPrice > product.price && (
                                                            <div className="original-price"><s style={{ display: "inline" }}>{product.originalPrice}сом</s></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="product-list-details">
                                                <div className="product-list-details-brand-and-name">
                                                    <div className="product-list-type">{product.type.length > 11 ? product.type.substring(0, 11) + '.' : product.type}</div>
                                                    <div className="product-list-brand">{product.brand}</div>
                                                </div>
                                                <div className="discounted-price">
                                                    {product.originalPrice ? (
                                                        <div className="price-red">{product.price}<span className="price-som">сом</span></div>
                                                    ) : (
                                                        <div className="price">{product.price}<span style={{ color: "black" }} className="price-som">сом</span></div>
                                                    )}
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <div className="original-price"><s style={{ display: "inline" }}>{product.originalPrice}сом</s></div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div className="quantity-progress-bar">
                                            {product.quantity <= 11 && (
                                                <>
                                                    <div className="product-list-quantity">Осталось {product.quantity} шт.</div>
                                                    <div className="progress-bar-container">
                                                        <div className={`progress-bar ${getProgressBarColor(product.quantity)}`} style={{ width: getProgressBarWidth(product.quantity) }} />
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <div className="actions">
                                            {product.isActive ? (
                                                <>
                                                    {isInCart(product._id) ? (
                                                        <button className="cart-button in-cart" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                                            <div className="cart-in-cart">В корзине</div>
                                                        </button>
                                                    ) : (
                                                        <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                                            <strong>+</strong>
                                                            <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                                                        </button>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="product-unavailable">Не доступен</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>
                                <div className="no-products">
                                    <h2>Ничего не нашлось по запросу "{searchKeyword}"</h2>
                                    <div>Попробуйте поискать по другому или сократите запрос</div>
                                    <h1 style={{ marginBottom: "-40px" }}>Возможно вам понравятся:</h1>
                                </div>
                                {displayedProductsNoSearch && displayedProductsNoSearch.map(product => (
                                    <div className={`product-card ${!product.isActive ? 'inactive-product' : ''}`} onClick={clearSearch} key={product._id}>
                                        {product.isActive ? (
                                            <Link to={`/products/${product._id}`}>
                                                <div className="product-card-images">
                                                    {product.originalPrice && product.originalPrice > product.price && (
                                                        <div className="discount-percentage-badge">
                                                            - {calculateDiscountPercentage(product.originalPrice, product.price)}%
                                                        </div>
                                                    )}
                                                    <img src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'} alt={product.name} />
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="product-card-images">
                                                {product.originalPrice && product.originalPrice > product.price && (
                                                    <div className="discount-percentage-badge">
                                                        - {calculateDiscountPercentage(product.originalPrice, product.price)}%
                                                    </div>
                                                )}
                                                <img src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'} alt={product.name} />
                                            </div>
                                        )}
                                        <div style={{ background: 'none' }}>
                                            {product.isActive ? (
                                                <Link to={`/products/${product._id}`}>
                                                    <div className="product-list-details">
                                                        <div className="product-list-details-brand-and-name">
                                                            <div className="product-list-type">{product.type.length > 11 ? product.type.substring(0, 11) + '.' : product.type}</div>
                                                            <div className="product-list-brand">{product.brand}</div>
                                                        </div>
                                                        <div className="discounted-price">
                                                            {product.originalPrice ? (
                                                                <div className="price-red">{product.price}сом</div>
                                                            ) : (
                                                                <div className="price">{product.price}сом</div>
                                                            )}
                                                            {product.originalPrice && product.originalPrice > product.price && (
                                                                <div className="original-price"><s style={{ display: "inline" }}>{product.originalPrice}сом</s></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ) : (
                                                <div className="product-list-details">
                                                    <div className="product-list-details-brand-and-name">
                                                        <div className="product-list-type">{product.type.length > 11 ? product.type.substring(0, 11) + '.' : product.type}</div>
                                                        <div className="product-list-brand">{product.brand}</div>
                                                    </div>
                                                    <div className="discounted-price">
                                                        {product.originalPrice ? (
                                                            <div className="price-red">{product.price}сом</div>
                                                        ) : (
                                                            <div className="price">{product.price}сом</div>
                                                        )}
                                                        {product.originalPrice && product.originalPrice > product.price && (
                                                            <div className="original-price"><s style={{ display: "inline" }}>{product.originalPrice}сом</s></div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="quantity-progress-bar">
                                                {product.quantity <= 11 && (
                                                    <>
                                                        <div className="product-list-quantity">Осталось {product.quantity} шт.</div>
                                                        <div className="progress-bar-container">
                                                            <div className={`progress-bar ${getProgressBarColor(product.quantity)}`} style={{ width: getProgressBarWidth(product.quantity) }} />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="actions">
                                                {isInCart(product._id) ? (
                                                    <button className="cart-button in-cart" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                                        <div>В корзине</div>
                                                    </button>
                                                ) : (
                                                    <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                                        <strong>+</strong>
                                                        <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </>

                )}
            </div>

           <div className="pagination-container-block">
               <div className="pagination-container-block-one">
                   {displayedProducts && displayedProducts.length > 0 && (
                       <div className="pagination-container">
                           <CustomPagination
                               totalPages={totalPages}
                               currentPage={currentPage}
                               onPageChange={handlePageChange}
                           />
                       </div>
                   )}
               </div>


               <div className="pagination-container-block-two">
                   {displayedProducts >= 0 && displayedProductsNoSearch.length > 0 && (
                       <div className="pagination-container">
                           <div className="pagination">
                               <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
                                   <img className="arrowLImg" src={left} alt="Cart" />
                               </button>
                               <span className="numStr">{`Страница ${currentPage} из ${totalPagesNoSearch}`}</span>
                               <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPagesNoSearch}>
                                   <img className="arrowRImg" src={right} alt="Cart" />
                               </button>
                           </div>
                       </div>
                   )}
               </div>
           </div>


        </div>
    );

};

export default ProductList;




