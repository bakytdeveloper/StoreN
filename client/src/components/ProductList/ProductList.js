
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



// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 3; // Количество отображаемых страниц до и после текущей
//     const range = [];
//
//     // Создание списка страниц для отображения
//     const createPageRange = () => {
//         let start = Math.max(currentPage - pageRange, 1);
//         let end = Math.min(currentPage + pageRange, totalPages);
//
//         if (currentPage <= pageRange + 1) {
//             end = Math.min(pageRange * 2 + 1, totalPages);
//         } else if (currentPage >= totalPages - pageRange) {
//             start = Math.max(totalPages - pageRange * 2 - 1, 1);
//         }
//
//         // Вставляем точки, если требуется
//         if (start > 1) {
//             range.push(1);
//             if (start > 2) {
//                 range.push('...');
//             }
//         }
//
//         for (let i = start; i <= end; i++) {
//             range.push(i);
//         }
//
//         if (end < totalPages) {
//             if (end < totalPages - 1) {
//                 range.push('...');
//             }
//             range.push(totalPages);
//         }
//     };
//
//     createPageRange();
//
//     return (
//         <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={onPageChange}
//             renderItem={(item) => {
//                 if (item.type === 'page') {
//                     return range.includes(item.page) || typeof item.page === 'string' ? (
//                         <PaginationItem
//                             {...item}
//                             component={item.page === '...' ? 'span' : 'button'}
//                             className={item.page === '...' ? 'pagination-ellipsis' : ''}
//                         />
//                     ) : null;
//                 }
//                 return <PaginationItem {...item} />;
//             }}
//             renderItem={(item) => (
//                 <PaginationItem
//                     {...item}
//                     slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
//                 />
//             )}
//             siblingCount={1}
//             boundaryCount={1}
//             showFirstButton
//             showLastButton
//         />
//     );
// };


// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//     const pageRange = 3; // Количество отображаемых страниц
//     const range = [];
//
//     // Создание списка страниц для отображения
//     const createPageRange = () => {
//         let start = Math.max(currentPage - Math.floor(pageRange / 2), 1);
//         let end = Math.min(start + pageRange - 1, totalPages);
//
//         // Корректировка, если текущая страница близка к началу или концу
//         if (currentPage <= 2) {
//             end = Math.min(pageRange, totalPages);
//         }
//         if (currentPage >= totalPages - 1) {
//             start = Math.max(totalPages - pageRange + 1, 1);
//         }
//
//         for (let i = start; i <= end; i++) {
//             range.push(i);
//         }
//     };
//
//     createPageRange();
//
//     return (
//         <Pagination
//             count={totalPages}
//             page={currentPage}
//             onChange={onPageChange}
//             renderItem={(item) => {
//                 const isActive = item.page === currentPage;
//
//                 return (
//                     <PaginationItem
//                         {...item}
//                         className={`pagination-item ${isActive ? 'active' : ''}`}
//                     />
//                 );
//             }}
//             siblingCount={1}
//             boundaryCount={1}
//             showFirstButton
//             showLastButton
//         />
//     );
// };


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

    // Сброс фильтров и товаров при возвращении на страницу каталога
    useEffect(() => {
        if (location.pathname === '/catalog') {
            setSelectedGender(null);
            setSelectedCategory(null);
            setSelectedType(null);
            // setSearchTerm('');
            // onSearch('');
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

    // Функция для получения данных с сервера
    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams(location.search);
            const sellerId = params.get('sellerId');
            const productsResponse = await fetch(
                `${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}${sellerId ? `&sellerId=${sellerId}` : ''}`,
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
                setSellerInfo(null); // Если нет sellerId, сбросить информацию о продавце
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

// Прокрутка страницы в начало при изменении текущей страницы пагинации
    useEffect(() => {
        window.scrollTo(0, 0);
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
                setProductsPerPage(18);
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
            // .filter(product =>
            //     searchKeyword
            //         ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            //         product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            //         product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            //         product.type.toLowerCase().includes(searchKeyword.toLowerCase())
            //         : true
            // )
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

// Переход на следующую страницу пагинации
    const handleNextPage = () => {
        const params = new URLSearchParams(location.search);
        params.set('page', currentPage + 1);
        history.push({ search: params.toString() });
        setCurrentPage(currentPage + 1);
    };

// Переход на предыдущую страницу пагинации
    const handlePrevPage = () => {
        const params = new URLSearchParams(location.search);
        params.set('page', currentPage - 1);
        history.push({ search: params.toString() });
        setCurrentPage(currentPage - 1);
    };

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

    const handlePageChange = (event, value) => {
        const params = new URLSearchParams(location.search);
        params.set('page', value);
        history.push({ search: params.toString() });
        setCurrentPage(value);
    };





    return (
        <div className="product-list-container">

            {/* Заголовок с информацией о продавце, если есть sellerInfo */}
            {sellerInfo && (
                <div className="product-list-seller-info">
                    <div className="seller-info" >
                        <h3>Приветствую Вас в магазине</h3>
                        <h2>{sellerInfo.companyName}</h2>
                        {/*<p>Компания: {sellerInfo.name}</p>*/}
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
                                    <div className="product-content">
                                        {product.isActive ? (
                                            <Link to={`/products/${product._id}`}>
                                                <div className="product-list-details">
                                                    <div className="product-list-details-brand-and-name">
                                                        <div className="product-list-type">{product.type.length > 11 ? product.type.substring(0, 11) + '.' : product.type}</div>
                                                        <div className="product-list-brand">{product.brand.length > 11 ? product.brand.substring(0, 11) + '.' : product.brand}</div>
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

            {/*{displayedProducts && displayedProducts.length > 0 && (*/}
            {/*    <div className="pagination-container">*/}
            {/*        <div className="pagination">*/}
            {/*            <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>*/}
            {/*                <img className="arrowLImg" src={left} alt="Cart" />*/}
            {/*            </button>*/}
            {/*            <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>*/}
            {/*            <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>*/}
            {/*                <img className="arrowRImg" src={right} alt="Cart" />*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}


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




