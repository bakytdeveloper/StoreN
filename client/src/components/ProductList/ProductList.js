

import React, { useState, useEffect } from 'react';
import './ProductList.css';
import bas from './basket.png';
import { Link, useHistory } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import left from "./arrowsL.png";
import right from "./arrowsR.png";

const ProductList = ({ searchKeyword, cartItems, setCartItems, products,
                         setProducts, showSidebar, setShowSidebar  }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 10;

    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredProducts(filterProducts(products));
        } else {
            fetchProducts();
        }
    }, [searchKeyword, selectedType, products, currentPage]);

    useEffect(() => {
        window.scrollTo(0, 0); // Прокрутка страницы вверх при изменении currentPage
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5500/api/products');
            const data = await response.json();
            setFilteredProducts(filterProducts(data || []));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const filterProducts = (productsToFilter) => {
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
            );
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
                    image: product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg',
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
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    return (
        <div className="product-list">
            {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} />}

            {displayedProducts.map((product) => (
                <div className="product-card" key={product._id}>
                    <Link to={`/products/${product._id}`}>
                        <img
                            src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg'}
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
            <div className="pagination">
                <button className="arrowL"  onClick={handlePrevPage} disabled={currentPage === 1}>
                    {/*<span className="arrowL" >*/}
                        <img className="arrowLImg" src={left}  alt="Cart" />
                    {/*️️</span>*/}
                </button>
                <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
                <button  className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
                     {/*<span className="arrowR">*/}
                         <img  className="arrowRImg" src={right}  alt="Cart" />
                     {/*</span>*/}
                </button>
            </div>
        </div>
    );
};

export default ProductList;








