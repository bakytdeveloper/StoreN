
import React, {useState, useEffect, useCallback} from 'react';
import './ProductList.css';
import bas from './basket.png';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import left from "./arrowsL.png";
import right from "./arrowsR.png";




// const ProductList = ({ searchKeyword, cartItems, setCartItems, products, setProducts, showSidebar, setShowSidebar }) => {
//     const [selectedType, setSelectedType] = useState(null);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeSellers, setActiveSellers] = useState([]);
//     // const productsPerPage = 12;
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setProductsPerPage(15);
//         } else {
//             setProductsPerPage(12);
//         }
//     }, [windowWidth]);
//
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         setCurrentPage(1); // Сброс текущей страницы при изменении searchKeyword или products
//     }, [searchKeyword, products]);
//
//     useEffect(() => {
//         fetchData(); // Получение данных при загрузке компонента или изменении selectedType
//     }, [searchKeyword, selectedType]); // Вызов fetchData при изменении searchKeyword или selectedType
//
//     useEffect(() => {
//         fetchActiveSellers(); // Получение активных продавцов при загрузке компонента
//     }, []);
//
//     useEffect(() => {
//         if (products && products.length > 0 && activeSellers.length > 0) {
//             setFilteredProducts(filterProducts(products, activeSellers)); // Фильтрация продуктов при загрузке активных продавцов или изменении страницы
//         } else {
//             fetchData(); // Получение данных при загрузке продуктов или изменении страницы
//         }
//     }, [products, currentPage, activeSellers]); // Вызов fetchData при изменении products, currentPage или activeSellers
//
//     const fetchActiveSellers = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, { timeout: 10000 });
//             const data = await response.json();
//             const activeSellersData = data.filter(seller => seller.status !== 'suspend');
//             setActiveSellers(activeSellersData);
//         } catch (error) {
//             console.error('Error fetching active sellers:', error);
//         }
//     };
//
//     const fetchData = async () => {
//         try {
//             const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}`, { timeout: 10000 });
//             const productsData = await productsResponse.json();
//             setProducts(productsData); // Обновляем список продуктов (для возврата назад)
//             const filteredProductsData = filterProducts(productsData || [], activeSellers);
//             setFilteredProducts(filteredProductsData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//
//     const filterProducts = (productsToFilter, activeSellersData) => {
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
//             ).filter(product => {
//                 const seller = activeSellersData.find(seller => seller.products.includes(product._id));
//                 return seller ? true : false;
//             });
//     };
//
//     const history = useHistory();
//
//     const handleAddToCart = (product) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
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
//         setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
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
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     return (
//         <div className="product-list">
//             {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} />}
//
//             {displayedProducts.length ? (
//                 displayedProducts.map((product) => (
//                     <div className="product-card" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//                                 <div className="brand">{product.brand}</div>
//                                 <div className="name">{product.name}</div>
//                                 <div className="price">
//                                     <span>KGS</span> {product.price}
//                                 </div>
//                             </div>
//                         </Link>
//                         <div className="actions">
//                             <button
//                                 className="cart-button"
//                                 title="Add to Cart"
//                                 onClick={() => handleAddToCart(product)}
//                             >
//                                 <strong>+</strong>
//                                 <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                             </button>
//                             <button
//                                 className="buy-button"
//                                 title="Buy Now"
//                                 onClick={() => handleBuyNow(product)}
//                             >
//                                 Заказать
//                             </button>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <h2 className="no-products">Что-то пошло не так, мы работаем над этой проблемой...</h2>
//             )}
//
//             {displayedProducts.length > 0 && (
//                 <div className="pagination">
//                     <hr style={{ color: "black" }} />
//                     <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
//                         <img className="arrowLImg" src={left} alt="Cart" />
//                     </button>
//                     <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
//                     <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                         <img className="arrowRImg" src={right} alt="Cart" />
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default ProductList;




const ProductList = ({ searchKeyword, cartItems, setCartItems, products, setProducts, showSidebar, setShowSidebar }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSellers, setActiveSellers] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(12); // Изменено количество карточек на странице
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [resizeTimer, setResizeTimer] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentPage(1); // Сброс текущей страницы при изменении searchKeyword или products
    }, [searchKeyword, products]);

    useEffect(() => {
        fetchData(); // Получение данных при загрузке компонента или изменении selectedType
    }, [searchKeyword, selectedType, windowWidth]); // Вызов fetchData при изменении searchKeyword, selectedType или ширины экрана

    useEffect(() => {
        fetchActiveSellers(); // Получение активных продавцов при загрузке компонента
    }, []);

    useEffect(() => {
        if (products && products.length > 0 && activeSellers.length > 0) {
            setFilteredProducts(filterProducts(products, activeSellers)); // Фильтрация продуктов при загрузке активных продавцов или изменении страницы
        } else {
            fetchData(); // Получение данных при загрузке продуктов или изменении страницы
        }
    }, [products, currentPage, activeSellers]); // Вызов fetchData при изменении products, currentPage или activeSellers

    useEffect(() => {
        const handleResize = () => {
            clearTimeout(resizeTimer);
            setResizeTimer(setTimeout(() => {
                setWindowWidth(window.innerWidth);
            }, 200));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [resizeTimer]);

    const fetchActiveSellers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, { timeout: 10000 });
            const data = await response.json();
            const activeSellersData = data.filter(seller => seller.status !== 'suspend');
            setActiveSellers(activeSellersData);
        } catch (error) {
            console.error('Error fetching active sellers:', error);
        }
    };

    const fetchData = async () => {
        try {
            const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}`, { timeout: 10000 });
            const productsData = await productsResponse.json();
            setProducts(productsData); // Обновляем список продуктов (для возврата назад)
            const filteredProductsData = filterProducts(productsData || [], activeSellers);
            setFilteredProducts(filteredProductsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterProducts = (productsToFilter, activeSellersData) => {
        return productsToFilter
            .filter((product) => !selectedType || product.type === selectedType)
            .filter(
                (product) =>
                    searchKeyword
                        ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        product.type.toLowerCase().includes(searchKeyword.toLowerCase())
                        : true
            ).filter(product => {
                const seller = activeSellersData.find(seller => seller.products.includes(product._id));
                return seller ? true : false;
            });
    };

    const history = useHistory();

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

    const handleBuyNow = (product) => {
        handleAddToCart(product);
        history.push('/cart');
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    useEffect(() => {
        if (windowWidth >= 1400) {
            setProductsPerPage(15);
        } else {
            setProductsPerPage(12);
        }
    }, [windowWidth]);

    return (
        <div className="product-list">
            {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} />}

            {displayedProducts.length ? (
                displayedProducts.map((product) => (
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
                ))
            ) : (
                <h2 className="no-products">Что-то пошло не так, мы работаем над этой проблемой...</h2>
            )}

            {displayedProducts.length > 0 && (
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
            )}
        </div>
    );
};

export default ProductList;







