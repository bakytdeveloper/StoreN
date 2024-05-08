// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const RelatedProducts = ({ productId }) => {
//     const [relatedProducts, setRelatedProducts] = useState([]);
//
//
//     useEffect(() => {
//         const fetchRelatedProducts = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/related/${productId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setRelatedProducts(data);
//                 } else {
//                     console.error('Error fetching related products:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching related products:', error);
//             }
//         };
//
//         fetchRelatedProducts();
//     }, [productId]);
//
//
//
//
//     return (
//         <div className="related-products">
//             <h2>Похожие товары</h2>
//             <div className="products-lists">
//                 {relatedProducts.map((product) => (
//                     <div className="product-cards" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg'}
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
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default RelatedProducts;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/related/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRelatedProducts(data);
                } else {
                    console.error('Error fetching related products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [productId]);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let count = 5; // Количество карточек по умолчанию

            if (screenWidth <= 1100) {
                count = 3; // Изменить количество карточек для экранов <= 1100px
            }

            if (screenWidth <= 768) {
                count = 1; // Изменить количество карточек для экранов <= 768px
            }

            setCardCount(count);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(relatedProducts.length - cardCount, prevIndex + cardCount));
    };

    return (
        <div className="related-products">
            <h2>Похожие товары</h2>
            <div className="products-lists">
                {relatedProducts.slice(currentIndex, currentIndex + cardCount).map((product) => (
                    <div className="product-cards" key={product._id}>
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
                    </div>
                ))}
            </div>
            <div className="slider-controls">
                <button onClick={handlePrevClick} disabled={currentIndex === 0}>Prev</button>
                <button onClick={handleNextClick} disabled={currentIndex + cardCount >= relatedProducts.length}>Next</button>
            </div>
        </div>
    );
};

export default RelatedProducts;
