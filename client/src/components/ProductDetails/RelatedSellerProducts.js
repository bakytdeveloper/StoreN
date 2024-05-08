// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const RelatedSellerProducts = ({ productId }) => {
//     const [sellerProducts, setSellerProducts] = useState([]);
//
//     useEffect(() => {
//         const fetchRelatedSellerProducts = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/seller/products`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setSellerProducts(data);
//                 } else {
//                     console.error('Error fetching related seller products:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching related seller products:', error);
//             }
//         };
//
//         fetchRelatedSellerProducts();
//     }, [productId]);
//
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//
//     return (
//         <div className="related-seller-products">
//             <h2>Другие товары продавца</h2>
//             <div className="products-list">
//                 {sellerProducts.map((product) => (
//                     <div className="product-card" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//                                 <div className="brand">{product.brand}</div>
//                                 {/*<div className="name">{product.name}</div>*/}
//                                 {/* Ограничиваем длину названия товара до 10 символов */}
//                                 <div className="name">{product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}</div>
//
//                                 <div className="price">
//                                     <span>KGS</span> {product.price}
//                                 </div>
//                             </div>                        </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default RelatedSellerProducts;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RelatedSellerProducts = ({ productId }) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchRelatedSellerProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/seller/products`);
                if (response.ok) {
                    const data = await response.json();
                    setSellerProducts(data);
                } else {
                    console.error('Error fetching related seller products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related seller products:', error);
            }
        };

        fetchRelatedSellerProducts();
    }, [productId]);

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(sellerProducts.length - 1, prevIndex + 1));
    };

    return (
        <div className="related-seller-products">
            <h2>Другие товары продавца</h2>
            <div className="products-list">
                {sellerProducts.slice(currentIndex, currentIndex + 5).map((product, index) => (
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
                    </div>
                ))}
            </div>
            <div className="slider-controls">
                <button onClick={handlePrevClick} disabled={currentIndex === 0}>Prev</button>
                <button onClick={handleNextClick} disabled={currentIndex + 5 >= sellerProducts.length}>Next</button>
            </div>
        </div>
    );
};

export default RelatedSellerProducts;
