// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const RelatedSellerProducts = ({ productId }) => {
//     const [sellerProducts, setSellerProducts] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
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
//     useEffect(() => {
//         const handleResize = () => {
//             const screenWidth = window.innerWidth;
//             let count = 5; // Количество карточек по умолчанию
//
//             if (screenWidth <= 1100) {
//                 count = 4; // Изменить количество карточек для экранов <= 1100px
//             }
//
//             if (screenWidth <= 960) {
//                 count = 3; // Изменить количество карточек для экранов <= 960px
//             }
//
//             setCardCount(count);
//         };
//
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     const handlePrevClick = () => {
//         setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
//     };
//
//     const handleNextClick = () => {
//         setCurrentIndex(prevIndex => Math.min(sellerProducts.length - cardCount, prevIndex + cardCount));
//     };
//
//     return (
//         <div className="related-seller-products">
//             <h2>Другие товары продавца</h2>
//             <div className="products-lists">
//                 {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
//                     <div className="product-cards" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//                                 <div className="brand">{product.brand}</div>
//                                 <div className="name">{product.name}</div>
//                                 {/*<div className="price">*/}
//                                 {/*    <span>KGS</span> {product.price}*/}
//                                 {/*</div>*/}
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//             <div className="slider-controls">
//                 <button className="slider-control-one-left"
//                         onClick={handlePrevClick} disabled={currentIndex === 0}>
//                     &#8592; Назад
//                 </button>
//                 <button className="slider-control-one-right"
//                         onClick={handleNextClick}
//                         disabled={currentIndex + cardCount >= sellerProducts.length}>
//                     Вперёд &#8594;
//                 </button>
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
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию

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

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let count = 5; // Количество карточек по умолчанию

            if (screenWidth <= 1100) {
                count = 4; // Изменить количество карточек для экранов <= 1100px
            }

            if (screenWidth <= 960) {
                count = 3; // Изменить количество карточек для экранов <= 960px
            }

            setCardCount(count);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(sellerProducts.length - cardCount, prevIndex + cardCount));
    };

    const handleCardClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка к верху страницы с плавным эффектом
    };

    return (
        <div className="related-seller-products">
            <h2>Другие товары продавца</h2>
            <div className="products-lists">
                {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-cards" key={product._id}>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details">
                                <div className="type">{product.type}</div>
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.name}</div>
                                {/*<div className="price">*/}
                                {/*    <span>KGS</span> {product.price}*/}
                                {/*</div>*/}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="slider-controls">
                <button className="slider-control-one-left"
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    &#8592; Назад
                </button>
                <button className="slider-control-one-right"
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= sellerProducts.length}>
                    Вперёд &#8594;
                </button>
            </div>
        </div>
    );
};

export default RelatedSellerProducts;
