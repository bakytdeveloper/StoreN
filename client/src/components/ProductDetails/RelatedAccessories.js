


import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import './RelatedAccessories.css';

import sliderLeft from './sliderLeft.png';
import sliderRight from './sliderRight.png';



// const RelatedAccessories = ({ direction }) => {
//     const [accessories, setAccessories] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//
//     useEffect(() => {
//         const fetchAccessories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/accessories/${direction}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setAccessories(data);
//                 } else {
//                     console.error('Error fetching related accessories:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching related accessories:', error);
//             }
//         };
//
//         fetchAccessories();
//     }, [direction]);
//
//     useEffect(() => {
//         const handleScroll = () => {
//             if (
//                 window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
//             ) {
//                 // Пользователь достиг конца страницы, загружаем все доступные аксессуары
//                 loadAllAccessories();
//             }
//         };
//
//         window.addEventListener('scroll', handleScroll);
//
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//
//     const loadAllAccessories = () => {
//         setIsLoading(true);
//         setCurrentIndex(accessories.length);
//     };
//
//     const handleCardClick = () => {
//         document.documentElement.scrollTop = 0;
//     };
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     return (
//         <div className="related-accessories">
//             <h2>Аксессуары</h2>
//             <div className="products-list-related-accessories">
//                 {accessories.map((accessory, index) => (
//                     <div className="product-card-related-accessories" key={accessory._id}>
//                         <Link to={`/products/${accessory._id}`} onClick={handleCardClick}>
//                             <img
//                                 src={accessory.images && accessory.images.length > 0 ? fixImagePath(accessory.images[0]) : 'placeholder.jpg'}
//                                 alt={accessory.name}
//                             />
//                             <div className="details-related-accessories">
//                                 <div className="type-related-accessories">{accessory.type}</div>
//                                 <div className="brand-related-accessories">{accessory.brand}</div>
//                                 <div className="name-related-accessories">{accessory.name}</div>
//                             </div>
//                         </Link>
//                     </div>
//                 ))}
//                 {isLoading && <p>Loading...</p>}
//             </div>
//         </div>
//     );
// };
//
// export default RelatedAccessories;



const RelatedAccessories = ({ direction }) => {
    const [accessories, setAccessories] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const fetchAccessories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/accessories/${direction}`);
                if (response.ok) {
                    const data = await response.json();
                    setAccessories(data);
                } else {
                    console.error('Error fetching related accessories:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related accessories:', error);
            }
        };

        fetchAccessories();
    }, [direction]);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            let count = 5; // Количество карточек по умолчанию

            if (screenWidth <= 1100) {
                count = 5; // Изменить количество карточек для экранов <= 1100px
            }

            if (screenWidth <= 768) {
                count = accessories.length; // Показать все карточки на маленьких экранах
            }

            setCardCount(count);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [accessories.length]);

    const handleScroll = () => {
        if (containerRef.current) {
            setScrollPosition(containerRef.current.scrollLeft);
        }
    };

    const handlePrevClick = () => {
        setCurrentIndex(prevIndex => Math.max(0, prevIndex - cardCount));
    };

    const handleNextClick = () => {
        setCurrentIndex(prevIndex => Math.min(accessories.length - cardCount, prevIndex + cardCount));
    };

    const handleCardClick = () => {
        document.documentElement.scrollTop = 0;
    };

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    // return (
    //     <div className="related-accessories">
    //         <h2>Аксессуары</h2>
    //         <div className="products-list-related-accessories">
    //             {accessories.slice(currentIndex, currentIndex + cardCount).map((accessory, index) => (
    //                 <div className="product-card-related-accessories" key={accessory._id}>
    //                     <Link to={`/products/${accessory._id}`} onClick={handleCardClick}>
    //                         <img
    //                             src={accessory.images && accessory.images.length > 0 ? fixImagePath(accessory.images[0]) : 'placeholder.jpg'}
    //                             alt={accessory.name}
    //                         />
    //                         <div className="details-related-accessories">
    //                             <div className="type-related-accessories">{accessory.type}</div>
    //                             <div className="brand-related-accessories">{accessory.brand}</div>
    //                             <div className="name-related-accessories">{accessory.name}</div>
    //                         </div>
    //                     </Link>
    //                 </div>
    //             ))}
    //         </div>
    //         {accessories.length > cardCount && (
    //             <div className="slider-controls-related-accessories">
    //                 <button className="prev-button" onClick={handlePrevClick} disabled={currentIndex === 0}>
    //                     &#8592; Назад
    //                 </button>
    //                 <button className="next-button" onClick={handleNextClick} disabled={currentIndex + cardCount >= accessories.length}>
    //                     Вперёд &#8594;
    //                 </button>
    //             </div>
    //         )}
    //     </div>
    // );

    return (
        <div className="related-accessories">
            <h2>Другие товары продавца</h2>
            <div className="products-list-related-accessories"  ref={containerRef} onScroll={handleScroll}>
                <button className={`slider-control-one-left ${currentIndex === 0 ? 'disabled' : ''}`}
                        onClick={handlePrevClick} disabled={currentIndex === 0}>
                    {/*&#8592; Назад*/}
                    <img src={sliderLeft}/>
                </button>
                {accessories.slice(currentIndex, currentIndex + cardCount).map((product, index) => (
                    <div className="product-card-related-accessories" key={product._id}>
                        <Link to={`/products/${product._id}`} onClick={handleCardClick}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details-related-accessories">
                                <div className="type-related-accessories">{product.type}</div>
                                <div className="brand-related-accessories">{product.brand}</div>
                                <div className="name-related-accessories">{product.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
                <button className={`slider-control-one-right ${currentIndex + cardCount >= accessories.length ? 'disabled' : ''}`}
                        onClick={handleNextClick}
                        disabled={currentIndex + cardCount >= accessories.length}>
                    {/*Вперёд &#8594;*/}
                    <img src={sliderRight}/>
                </button>
            </div>
        </div>
    );
};

export default RelatedAccessories;
