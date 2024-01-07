//
//
//
//
//
// import React, { useState, useEffect } from 'react';
// import './ProductList.css';
// import bas from './basket.png';
// import { Link } from 'react-router-dom';
//
// const ProductList = ({ searchKeyword }) => {
//     const [products, setProducts] = useState([]);
//     const [selectedType, setSelectedType] = useState(null);
//
//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products'); // Замените на реальный эндпоинт
//                 const data = await response.json();
//                 setProducts(data || []);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };
//
//         fetchProducts();
//     }, []);
//
//     const filteredProducts = products
//         .filter((product) => !selectedType || product.type === selectedType)
//         .filter(
//             (product) =>
//                 searchKeyword
//                     ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.brand.toLowerCase().includes(searchKeyword.toLowerCase())
//                     : true
//         );
//
//     return (
//         <div className="product-list">
//             {filteredProducts.map((product) => (
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
//                         <button className="cart-button" title="Add to Cart">
//                             <img style={{ width: '15px', height: '15px' }} src={bas} alt="Cart" />
//                         </button>
//                         <button className="buy-button" title="Buy Now">
//                             Buy
//                         </button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// export default ProductList;




// src/components/ProductList/ProductList.js

import React, { useState, useEffect } from 'react';
import './ProductList.css';
import bas from './basket.png';
import { Link } from 'react-router-dom';

const ProductList = ({ searchKeyword, cartItems, setCartItems }) => {
    const [products, setProducts] = useState([]);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/products'); // Замените на реальный эндпоинт
                const data = await response.json();
                setProducts(data || []);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        const itemInCart = cartItems.find((item) => item.productId === product._id);

        if (itemInCart) {
            const updatedCart = cartItems.map((item) =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { productId: product._id, name: product.name, quantity: 1 }]);
        }
    };

    const filteredProducts = products
        .filter((product) => !selectedType || product.type === selectedType)
        .filter(
            (product) =>
                searchKeyword
                    ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.brand.toLowerCase().includes(searchKeyword.toLowerCase())
                    : true
        );

    return (
        <div className="product-list">
            {filteredProducts.map((product) => (
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
                        <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                            <img style={{ width: '15px', height: '15px' }} src={bas} alt="Cart" />
                        </button>
                        <button className="buy-button" title="Buy Now">
                            Buy
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
