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





// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const RelatedProducts = ({ productId }) => {
//     const [relatedProducts, setRelatedProducts] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
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
//     useEffect(() => {
//         const handleResizes = () => {
//             const screenWidth = window.innerWidth;
//             let count = 5; // Количество карточек по умолчанию
//
//             if (screenWidth <= 1100) {
//                 count = 4; // Изменить количество карточек для экранов <= 1100px
//             }
//
//             if (screenWidth <= 768) {
//                 count = 3; // Изменить количество карточек для экранов <= 768px
//             }
//
//             setCardCount(count);
//         };
//
//         window.addEventListener('resize', handleResizes);
//
//         return () => {
//             window.removeEventListener('resize', handleResizes);
//         };
//     }, []);
//
//     const handlePrevClick = () => {
//         setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
//     };
//
//     const handleNextClick = () => {
//         setCurrentIndex(prevIndex => Math.min(relatedProducts.length - cardCount, prevIndex + cardCount));
//     };
//
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//
//     return (
//         <div className="related-products">
//             <h2>Похожие товары</h2>
//             <div className="products-lists">
//                 {relatedProducts.slice(currentIndex, currentIndex + cardCount).map((product) => (
//                     <div className="product-cards" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 // src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg'}
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
//                 <button onClick={handlePrevClick} disabled={currentIndex === 0}>
//                     &#8592; Назад
//                 </button>
//                 <button onClick={handleNextClick}
//                         disabled={currentIndex + cardCount >= relatedProducts.length}>
//                     Вперёд &#8594;
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// export default RelatedProducts;



import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './RelatedProducts.css';

import sliderLeft from './sliderLeft.png';
import sliderRight from './sliderRight.png';

const RelatedProducts = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef = useRef(null);

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
                count = relatedProducts.length; // Показать все карточки на маленьких экранах
            }
            setCardCount(count);
        };

        // Вызываем обработчик при инициализации компонента
        handleResizes();

        // Добавляем обработчик события изменения размера окна
        window.addEventListener('resize', handleResizes);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResizes);
        };
    }, [relatedProducts]); // Добавляем sellerProducts в зависимости, чтобы обновить cardCount при изменении данных


    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };


    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(relatedProducts.length - cardCount, prevIndex + cardCount));
    };

    // const handleCardClick = () => {
    //     window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокрутка к верху страницы с плавным эффектом
    // };

    const handleCardClick = () => {
        document.documentElement.scrollTop = 0;
    };

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    // return (
    //     <div className="related-products">
    //         <h2>Похожие товары</h2>
    //         <div className="product-list-related-products"
    //              ref={containerRef} onScroll={handleScroll}>
    //             {relatedProducts.slice(currentIndex, currentIndex + cardCount).map((product) => (
    //                 <div className="product-cards-related-products" key={product._id}>
    //                     <Link to={`/products/${product._id}`} onClick={handleCardClick}>
    //                         <img
    //                             src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
    //                             alt={product.name}
    //                         />
    //                         <div className="details-related-products">
    //                             <div className="type-related-products">{product.type}</div>
    //                             <div className="brand-related-products">{product.brand}</div>
    //                             <div className="name-related-products">{product.name}</div>
    //                             {/*<div className="price">*/}
    //                             {/*    <span>KGS</span> {product.price}*/}
    //                             {/*</div>*/}
    //                         </div>
    //                     </Link>
    //                 </div>
    //             ))}
    //         </div>
    //         <div className="slider-controls-related-products">
    //             <button onClick={handlePrevClick} disabled={currentIndex === 0}>
    //                 &#8592; Назад
    //             </button>
    //             <button onClick={handleNextClick} disabled={currentIndex + cardCount >= relatedProducts.length}>
    //                 Вперёд &#8594;
    //             </button>
    //         </div>
    //     </div>
    // );


    return (
        <div className="related-products">
            <h2>Другие товары продавца</h2>
            <div className="product-list-related-products"  ref={containerRef} onScroll={handleScroll}>
                <button className={`slider-control-one-left ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    {/*&#8592; Назад*/}
                    <img src={sliderLeft}/>
                </button>
                {relatedProducts.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-cards-related-products" key={product._id}>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details-related-products">
                                <div className="type-related-products">{product.type}</div>
                                <div className="brand-related-products">{product.brand}</div>
                                <div className="name-related-products">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                <button className={`slider-control-one-right ${currentIndex + cardCount >= relatedProducts.length ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= relatedProducts.length}>
                    {/*Вперёд &#8594;*/}
                    <img src={sliderRight}/>

                </button>
            </div>
        </div>
    );
};

export default RelatedProducts;
