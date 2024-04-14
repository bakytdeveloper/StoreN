


// const ProductList = ({ searchKeyword, cartItems, setCartItems, products,
//                          setProducts, showSidebar, setShowSidebar  }) => {
//     const [selectedType, setSelectedType] = useState(null);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//
//     const productsPerPage = 10;
//
//     useEffect(() => {
//         if (products && products.length > 0) {
//             setFilteredProducts(filterProducts(products));
//         } else {
//             fetchProducts();
//         }
//     }, [searchKeyword, selectedType, products, currentPage]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0); // Scroll to the top of the page when currentPage changes
//     }, [currentPage]);
//
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`); // Use process.env.REACT_APP_API_URL
//             const data = await response.json();
//             setFilteredProducts(filterProducts(data || []));
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     const filterProducts = (productsToFilter) => {
//         return productsToFilter
//             .filter((product) => !selectedType || product.type === selectedType)
//             .filter(
//                 (product) =>
//                     searchKeyword
//                         ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.type.toLowerCase().includes(searchKeyword.toLowerCase())
//                         : true
//             );
//     };
//
//     const history = useHistory();
//
//     const handleAddToCart = (product) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
//         if (itemInCart) {
//             const updatedCart = cartItems.map((item) =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg',
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//     };
//
//     const handleBuyNow = (product) => {
//         handleAddToCart(product);
//         history.push('/cart');
//     };
//
//     const handleNextPage = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//     };
//
//     const handlePrevPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//     };
//
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
//
//     return (
//         <div className="product-list">
//             {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} />}
//
//             {displayedProducts.map((product) => (
//                 <div className="product-card" key={product._id}>
//                     <Link to={`/products/${product._id}`}>
//                         <img
//                             src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg'}
//                             alt={product.name}
//                         />
//                         <div className="details">
//                             <div className="type">{product.type}</div>
//                             <div className="brand">{product.brand}</div>
//                             <div className="name">{product.name}</div>
//                             <div className="price">
//                                 <span>KGS</span> {product.price}
//                             </div>
//                         </div>
//                     </Link>
//                     <div className="actions">
//                         <button
//                             className="cart-button"
//                             title="Add to Cart"
//                             onClick={() => handleAddToCart(product)}
//                         >
//                             <strong>+</strong>
//                             <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                         </button>
//                         <button
//                             className="buy-button"
//                             title="Buy Now"
//                             onClick={() => handleBuyNow(product)}
//                         >
//                             Заказать
//                         </button>
//                     </div>
//                 </div>
//             ))}
//             <div className="pagination">
//                 <button className="arrowL"  onClick={handlePrevPage} disabled={currentPage === 1}>
//                     <img className="arrowLImg" src={left}  alt="Cart" />
//                 </button>
//                 <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
//                 <button  className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                     <img  className="arrowRImg" src={right}  alt="Cart" />
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductList;


// require('dotenv').config(); // Import and configure dotenv to load .env file

import React, { useState, useEffect } from 'react';
import './ProductList.css';
import bas from './basket.png';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import left from "./arrowsL.png";
import right from "./arrowsR.png";



// const ProductList = ({ searchKeyword, cartItems, setCartItems, products,
//                          setProducts, showSidebar, setShowSidebar  }) => {
//     const [selectedType, setSelectedType] = useState(null);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//
//     const productsPerPage = 10;
//
//
//     useEffect(() => {
//         window.scrollTo(0, 0); // Scroll to the top of the page when currentPage changes
//     }, [currentPage]);
//
//     useEffect(() => {
//         setCurrentPage(1); // Reset currentPage to 1 when searchKeyword changes
//     }, [searchKeyword]);
//
//     const fetchProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}`); // Добавляем параметр запроса для поиска
//             const data = await response.json();
//             setFilteredProducts(filterProducts(data || []));
//         } catch (error) {
//             console.error('Error fetching products:', error);
//         }
//     };
//
//     useEffect(() => {
//         if (products && products.length > 0) {
//             setFilteredProducts(filterProducts(products));
//         } else {
//             fetchProducts();
//         }
//     }, [searchKeyword, selectedType, products, currentPage]);
//
//
//     const filterProducts = (productsToFilter) => {
//         return productsToFilter
//             .filter((product) => !selectedType || product.type === selectedType)
//             .filter(
//                 (product) =>
//                     searchKeyword
//                         ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.type.toLowerCase().includes(searchKeyword.toLowerCase())
//                         : true
//             );
//     };
//
//     const history = useHistory();
//
//     const handleAddToCart = (product) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
//         if (itemInCart) {
//             const updatedCart = cartItems.map((item) =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg',
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//     };
//
//     const handleBuyNow = (product) => {
//         handleAddToCart(product);
//         history.push('/cart');
//     };
//
//     const handleNextPage = () => {
//         setCurrentPage((prevPage) => prevPage + 1);
//     };
//
//     const handlePrevPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//     };
//
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
//
//     // Функция для исправления пути к изображениям
//     const fixImagePath = (imagePath) => {
//         // Удаляем лишнюю часть пути "images/W/MEDIAX_792452-T2/"
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     return (
//         <div className="product-list">
//             {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} />}
//
//             {displayedProducts.map((product) => (
//                 <div className="product-card" key={product._id}>
//                     <Link to={`/products/${product._id}`}>
//                         <img
//                             src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                             alt={product.name}
//                         />
//                         <div className="details">
//                             <div className="type">{product.type}</div>
//                             <div className="brand">{product.brand}</div>
//                             <div className="name">{product.name}</div>
//                             <div className="price">
//                                 <span>KGS</span> {product.price}
//                             </div>
//                         </div>
//                     </Link>
//                     <div className="actions">
//                         <button
//                             className="cart-button"
//                             title="Add to Cart"
//                             onClick={() => handleAddToCart(product)}
//                         >
//                             <strong>+</strong>
//                             <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                         </button>
//                         <button
//                             className="buy-button"
//                             title="Buy Now"
//                             onClick={() => handleBuyNow(product)}
//                         >
//                             Заказать
//                         </button>
//                     </div>
//                 </div>
//             ))}
//
//             <div className="pagination">
//                 <hr style={{color:"black"}} />
//                 <button className="arrowL"  onClick={handlePrevPage} disabled={currentPage === 1}>
//                     <img className="arrowLImg" src={left}  alt="Cart" />
//                 </button>
//                 <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
//                 <button  className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                     <img  className="arrowRImg" src={right}  alt="Cart" />
//
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default ProductList;





const ProductList = ({ searchKeyword, cartItems, setCartItems, products,
                         setProducts, showSidebar, setShowSidebar  }) => {
    const [selectedType, setSelectedType] = useState(null); // Состояние для отслеживания выбранного типа продукта
    const [filteredProducts, setFilteredProducts] = useState([]); // Состояние для хранения отфильтрованных продуктов
    const [currentPage, setCurrentPage] = useState(1); // Состояние для отслеживания текущей страницы пагинации

    const productsPerPage = 10; // Количество продуктов на одной странице

    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка страницы наверх при изменении currentPage
    }, [currentPage]);

    useEffect(() => {
        setCurrentPage(1); // Сброс currentPage до 1 при изменении searchKeyword
    }, [searchKeyword, products]);

    // Асинхронная функция для получения продуктов с сервера с учетом параметров поиска
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}`);
            const data = await response.json();
            setFilteredProducts(filterProducts(data || [])); // Фильтрация полученных продуктов
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Эффект для загрузки продуктов при изменении searchKeyword, selectedType, products, currentPage
    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredProducts(filterProducts(products)); // Фильтрация продуктов из состояния, если они уже загружены
        } else {
            fetchProducts(); // Иначе, загрузка продуктов с сервера
        }
    }, [searchKeyword, selectedType, products, currentPage]);

    // Функция фильтрации продуктов
    const filterProducts = (productsToFilter) => {
        return productsToFilter
            .filter((product) => !selectedType || product.type === selectedType) // Фильтрация по типу продукта
            .filter(
                (product) =>
                    searchKeyword
                        ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        product.type.toLowerCase().includes(searchKeyword.toLowerCase()) // Фильтрация по ключевому слову поиска
                        : true
            );
    };

    const history = useHistory();

    // Обработчик добавления продукта в корзину
    const handleAddToCart = (product) => {
        const itemInCart = cartItems.find((item) => item.productId === product._id);

        if (itemInCart) {
            const updatedCart = cartItems.map((item) =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([
                ...cartItems,
                {
                    productId: product._id,
                    image: product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg',
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                },
            ]);
        }
    };

    // Обработчик немедленной покупки продукта
    const handleBuyNow = (product) => {
        handleAddToCart(product); // Добавление продукта в корзину
        history.push('/cart'); // Переход на страницу корзины
    };

    // Обработчики для перехода к предыдущей и следующей страницам пагинации
    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    // Вычисление общего количества страниц и индекса начала отображаемых продуктов на текущей странице
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    // Функция для исправления пути к изображениям
    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", ""); // Удаление лишней части пути к изображениям
    };

    return (
        <div className="product-list">
            {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} />}

            {/* Display products based on selected filters */}
            {displayedProducts.map((product) => (
                <div className="product-card" key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <img
                            src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                            alt={product.name}
                        />
                        <div className="details">
                            <div className="type">{product.type}</div>
                            <div className="brand">{product.brand}</div>
                            <div className="name">{product.name}</div>
                            <div className="price">
                                <span>KGS</span> {product.price}
                            </div>
                        </div>
                    </Link>
                    <div className="actions">
                        <button
                            className="cart-button"
                            title="Add to Cart"
                            onClick={() => handleAddToCart(product)}
                        >
                            <strong>+</strong>
                            <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                        </button>
                        <button
                            className="buy-button"
                            title="Buy Now"
                            onClick={() => handleBuyNow(product)}
                        >
                            Заказать
                        </button>
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="pagination">
                <hr style={{ color: "black" }} />
                <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <img className="arrowLImg" src={left} alt="Cart" />
                </button>
                <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
                <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    <img className="arrowRImg" src={right} alt="Cart" />
                </button>
            </div>
        </div>
    );

};

export default ProductList;



