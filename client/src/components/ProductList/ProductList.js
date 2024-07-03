
import React, {useState, useEffect, useCallback, useRef} from 'react';
import './ProductList.css';
import bas from './basket.png';
import {Link, useHistory, useLocation} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import left from "./arrowsL.png";
import right from "./arrowsR.png";
import './ProductList.css';
// import {Spinner} from "react-bootstrap";


const ProductList = ({
                         searchKeyword,
                         cartItems,
                         setCartItems,
                         products,
                         setProducts,
                         showSidebar,
                         setShowSidebar,
                         selectedGender,
                         selectedCategory,
                         selectedType,
                         setSelectedGender,
                         setSelectedCategory,
                         setSelectedType,
                         isFooterCatalog
                     }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [resizeTimer, setResizeTimer] = useState(null);
    const [productsPerPage, setProductsPerPage] = useState(12);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const location = useLocation();
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере
    const previousPathname = useRef(location.pathname);

    useEffect(() => {
        if (windowWidth >= 1200) {
            setShowSidebar(false);
        } else if (windowWidth >= 768) {
            setShowSidebar(false);
        } else {
            setShowSidebar(isFooterCatalog);
        }
    }, [windowWidth, setShowSidebar, location.pathname, isFooterCatalog]);

    useEffect(() => {
        if (location.pathname !== previousPathname.current) {
            setSelectedGender(null);
            setSelectedCategory(null);
            setSelectedType(null);
            previousPathname.current = location.pathname;
        }
    }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}`, { timeout: 10000 });
            const productsData = await productsResponse.json();
            setProducts(productsData);

            // Не требуется отдельный запрос для activeSellers на клиенте
            const activeSellersData = productsData.map(product => product.sellerId); // Предположим, что в данных продукта есть поле sellerId
            setFilteredProducts(filterProducts(productsData || [], activeSellersData));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

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
        window.scrollTo(0, 0);
    }, [currentPage]);

    useEffect(() => {
        fetchData();
    }, [searchKeyword, selectedGender, windowWidth, selectedCategory, selectedType]);

    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredProducts(filterProducts(products, products.map(product => product.sellerId)));
        } else {
            fetchData();
        }
    }, [products, currentPage]);

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

    useEffect(() => {
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
    }, [windowWidth]);

    const filterProducts = (productsToFilter, activeSellersData) => {
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
            .filter(product => activeSellersData.includes(product.sellerId));
    };

    const handleAddToCart = (product) => {
        const itemInCart = cartItems.find(item => item.productId === product._id);
        if (itemInCart) {
            const updatedCart = cartItems.map(item =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
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
        }
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => {
            const nextPage = Math.min(prevPage + 1, totalPages);
            if (nextPage !== prevPage) {
                history.push(`?page=${nextPage}`);
            }
            return nextPage;
        });
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => {
            const prevPageNew = Math.max(prevPage - 1, 1);
            if (prevPageNew !== prevPage) {
                history.push(`?page=${prevPageNew}`);
            }
            return prevPageNew;
        });
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    useEffect(() => {
        if (!showSidebar && windowWidth <= 768 && location.pathname === "/catalog") {
            document.body.classList.add('no-scroll');
            window.scrollTo(0, 0);
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [showSidebar, windowWidth, location.pathname]);


    return (
        <div className="product-list-container">
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
                        {displayedProducts.length ? (
                            displayedProducts.map(product => (
                                <div className="product-card" key={product._id}>
                                    <Link to={`/products/${product._id}`}>
                                        <div className="product-card-images">
                                            <img src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'} alt={product.name} />
                                        </div>
                                        <div className="product-list-details">
                                            <div className="product-list-details-brand-and-name">
                                                <div className="product-list-type">{product.type.length > 11 ? product.type.substring(0, 11) + '.' : product.type}</div>
                                                <div className="product-list-brand">{product.brand}</div>
                                            </div>
                                            <div className="price">{product.price} сом</div>
                                            {/*<div className="price">KGS {product.price}</div>*/}
                                        </div>
                                    </Link>
                                    <div className="actions">
                                        <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                            <strong>+</strong>
                                            <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2 style={{ marginTop: "111px" }} className="no-products">Нет продуктов для отображения</h2>
                        )}
                    </>
                )}
            </div>

            {displayedProducts.length > 0 && (
                <div className="pagination-container">
                    <div className="pagination">
                        <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <img className="arrowLImg" src={left} alt="Cart" />
                        </button>
                        <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
                        <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <img className="arrowRImg" src={right} alt="Cart" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;




