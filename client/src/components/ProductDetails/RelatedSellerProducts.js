
// !!!!!
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './RelatedSellerProducts.css';
import sliderLeft from './sliderLeft.png';
import sliderRight from './sliderRight.png';


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
//         fetchRelatedSellerProducts();
//     }, [productId]);
//
//
//
//     const handleResize = () => {
//         const screenWidth = window.innerWidth;
//         let count = 5; // Количество карточек по умолчанию
//         if (screenWidth <= 1100) {
//             count = 4; // Изменить количество карточек для экранов <= 1100px
//         }
//         if (screenWidth <= 960) {
//             count = 3; // Изменить количество карточек для экранов <= 960px
//         }
//         if (screenWidth <= 768) {
//             count = sellerProducts.length; // Показать все карточки на маленьких экранах
//         }
//         setCardCount(count);
//     };
//
//     useEffect(() => {
//         handleResize();
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [sellerProducts.length]);
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
//     // return (
//     //     <div className="related-seller-products">
//     //         <h2>Другие товары продавца</h2>
//     //         <div className="product-list-related-seller-products"  ref={containerRef} onScroll={handleScroll}>
//     //         {/*<div className="products-lists">*/}
//     //             <button className="slider-control-one-left"
//     //                     onClick={handlePrevClick} disabled={currentIndex === 0}>
//     //                 &#8592; Назад
//     //             </button>
//     //             {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
//     //                 <div className="product-cards-related-seller-products" key={product._id}>
//     //                 {/*<div className="product-cards" key={product._id}>*/}
//     //                     <Link to={`/products/${product._id}`} onClick={handleCardClick}>
//     //                         <img
//     //                             src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//     //                             alt={product.name}
//     //                         />
//     //                         <div className="details-related-seller-products">
//     //                             <div className="type-related-seller-products">{product.type}</div>
//     //                             <div className="brand-related-seller-products">{product.brand}</div>
//     //                             <div className="name-related-seller-products">{product.name}</div>
//     //                             {/*<div className="price">*/}
//     //                             {/*    <span>KGS</span> {product.price}*/}
//     //                             {/*</div>*/}
//     //                         </div>
//     //                     </Link>
//     //                 </div>
//     //             ))}
//     //             <button className="slider-control-one-right"
//     //                     onClick={handleNextClick}
//     //                     disabled={currentIndex + cardCount >= sellerProducts.length}>
//     //                 Вперёд &#8594;
//     //             </button>
//     //         </div>
//     //         {/*<div className="slider-controls-related-seller-products">*/}
//     //         {/*    <button className="slider-control-one-left"*/}
//     //         {/*            onClick={handlePrevClick} disabled={currentIndex === 0}>*/}
//     //         {/*        &#8592; Назад*/}
//     //         {/*    </button>*/}
//     //         {/*    <button className="slider-control-one-right"*/}
//     //         {/*            onClick={handleNextClick}*/}
//     //         {/*            disabled={currentIndex + cardCount >= sellerProducts.length}>*/}
//     //         {/*        Вперёд &#8594;*/}
//     //         {/*    </button>*/}
//     //         {/*</div>*/}
//     //     </div>
//     // );
//
//
//     return (
//         <div className="related-seller-products">
//             <h2>Другие товары продавца</h2>
//             <div className="product-list-related-seller-products"  ref={containerRef} onScroll={handleScroll}>
//                 <button className="slider-control-one-left"
//                         onClick={handlePrevClick} disabled={currentIndex === 0}>
//                     &#8592; Назад
//                 </button>
//                 {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
//                     <div className="product-cards-related-seller-products" key={product._id}>
//                         <Link to={`/products/${product._id}`} onClick={handleCardClick}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="details-related-seller-products">
//                                 <div className="type-related-seller-products">{product.type}</div>
//                                 <div className="brand-related-seller-products">{product.brand}</div>
//                                 <div className="name-related-seller-products">{product.name}</div>
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//                 <button className="slider-control-one-right"
//                         onClick={handleNextClick}
//                         disabled={currentIndex + cardCount >= sellerProducts.length}>
//                     Вперёд &#8594;
//                 </button>
//             </div>
//         </div>
//     );
//
//
//
//
// };
//
// export default RelatedSellerProducts;





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

    const handleResize = () => {
        const screenWidth = window.innerWidth;
        let count = 5; // Количество карточек по умолчанию
        if (screenWidth <= 1100) {
            count = 4; // Изменить количество карточек для экранов <= 1100px
        }
        if (screenWidth <= 960) {
            count = 3; // Изменить количество карточек для экранов <= 960px
        }
        if (screenWidth <= 768) {
            count = sellerProducts.length; // Показать все карточки на маленьких экранах
        }
        setCardCount(count);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [sellerProducts.length]);

    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

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
        document.documentElement.scrollTop = 0;
    };

    return (
        <div className="related-seller-products">
            <h2>Другие товары продавца</h2>
            <div className="product-list-related-seller-products"  ref={containerRef} onScroll={handleScroll}>
                <button className={`slider-control-one-left ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    {/*&#8592; Назад*/}
                    <img src={sliderLeft}/>
                </button>
                {sellerProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-cards-related-seller-products" key={product._id}>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details-related-seller-products">
                                <div className="type-related-seller-products">{product.type}</div>
                                <div className="brand-related-seller-products">{product.brand}</div>
                                <div className="name-related-seller-products">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                <button className={`slider-control-one-right ${currentIndex + cardCount >= sellerProducts.length ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= sellerProducts.length}>
                    {/*Вперёд &#8594;*/}
                    <img src={sliderRight}/>
                </button>
            </div>
        </div>
    );
};

export default RelatedSellerProducts;