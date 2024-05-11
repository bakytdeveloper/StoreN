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


// // !!!!!
// import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import './RelatedSellerProducts.css';
//
// const RelatedSellerProducts = ({ productId }) => {
//     const [sellerProducts, setSellerProducts] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
//     const [scrollPosition, setScrollPosition] = useState(0);
//     const containerRef = useRef(null);
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
//     }, [productId.length]);
//
//
//
//     useEffect(() => {
//         const handleResize = () => {
//             const screenWidth = window.innerWidth;
//             let count = 5; // Количество карточек по умолчанию
//
//             if (screenWidth <= 1100) {
//                 count = 4; // Изменить количество карточек для экранов <= 1100px
//             }
//             if (screenWidth <= 960) {
//                 count = 3; // Изменить количество карточек для экранов <= 960px
//             }
//             if (screenWidth <= 768) {
//                 count = sellerProducts.length; // Показать все карточки на маленьких экранах
//             }
//             setCardCount(count);
//         };
//
//         // Вызываем обработчик при инициализации компонента
//         handleResize();
//
//         // Добавляем обработчик события изменения размера окна
//         window.addEventListener('resize', handleResize);
//
//         // Удаляем обработчик при размонтировании компонента
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [sellerProducts]); // Добавляем sellerProducts в зависимости, чтобы обновить cardCount при изменении данных
//
//
//
//
//     const handleScroll = () => {
//         if (containerRef.current) {
//             setScrollPosition(containerRef.current.scrollLeft);
//         }
//     };
//
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
//     // const handleCardClick = () => {
//     //     // window.scrollTo({ top: 0 }); // Прокрутка к верху страницы с плавным эффектом
//     //     window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка к верху страницы с плавным эффектом
//     // };
//
//     const handleCardClick = () => {
//         document.documentElement.scrollTop = 0;
//     };
//
//     return (
//         <div className="related-seller-products">
//             <h2>Другие товары продавца</h2>
//             <div className="productListRelatedSellerProducts"  ref={containerRef} onScroll={handleScroll}>
//             {/*<div className="products-lists">*/}
//                 {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
//                     <div className="productCardsRelatedSellerProducts" key={product._id}>
//                     {/*<div className="product-cards" key={product._id}>*/}
//                         <Link to={`/products/${product._id}`} onClick={handleCardClick}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="detailsRelatedSellerProducts">
//                                 <div className="typeRelatedSellerProducts">{product.type}</div>
//                                 <div className="brandRelatedSellerProducts">{product.brand}</div>
//                                 <div className="nameRelatedSellerProducts">{product.name}</div>
//                                 {/*<div className="price">*/}
//                                 {/*    <span>KGS</span> {product.price}*/}
//                                 {/*</div>*/}
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//             <div className="sliderControlsRelatedSellerProducts">
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





// !!!!!
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './RelatedSellerProducts.css';

const RelatedSellerProducts = ({ productId }) => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

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
        const handleResizes = () => {
            const screenWidth = window.innerWidth;
            let count = 5; // Количество карточек по умолчанию

            if (screenWidth <= 1100) {
                count = 4; // Изменить количество карточек для экранов <= 1100px
            }
            if (screenWidth <= 960) {
                count = 3; // Изменить количество карточек для экранов <= 960px
            }
            if (screenWidth <= 768) {
                count = Infinity; // Изменить количество карточек для экранов <= 960px
            }
            setCardCount(count);
        };

        // Вызываем функцию сразу после добавления обработчика изменения размера окна
        handleResizes();

        window.addEventListener('resize', handleResizes);
        return () => {
            window.removeEventListener('resize', handleResizes);
        };
    }, []);

    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(sellerProducts.length - cardCount, prevIndex + cardCount));
    };

    const handleCardClick = () => {
        document.documentElement.scrollTop = 0;
    };

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    return (
        <div className="related-seller-products">
            <h2>Другие товары продавца</h2>
            <div className="productListRelatedSellerProducts" ref={containerRef} onScroll={handleScroll}>
                {sellerProducts.map((product, index) => (
                    <div className="productCardsRelatedSellerProducts" key={product._id}>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="detailsRelatedSellerProducts">
                                <div className="typeRelatedSellerProducts">{product.type}</div>
                                <div className="brandRelatedSellerProducts">{product.brand}</div>
                                <div className="nameRelatedSellerProducts">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="sliderControlsRelatedSellerProducts">
                <button className="slider-control-one-left" onClick={handlePrevClick} disabled={currentIndex === 0}>
                    &#8592; Назад
                </button>
                <button className="slider-control-one-right" onClick={handleNextClick} disabled={currentIndex + cardCount >= sellerProducts.length}>
                    Вперёд &#8594;
                </button>
            </div>
        </div>
    );
};

export default RelatedSellerProducts;
