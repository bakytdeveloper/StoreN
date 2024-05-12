// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const RelatedAccessories = ({ direction }) => {
//     const [accessories, setAccessories] = useState([]);
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
//
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     return (
//         <div className="related-accessories">
//             <h2>Аксессуары</h2>
//             <div className="accessories-list">
//                 {accessories.map((accessory) => (
//                     <div className="accessory-card" key={accessory._id}>
//                         <Link to={`/accessories/${accessory._id}`}>
//                             <img
//                                 // src={accessory.image || 'placeholder.jpg'}
//                                 src={accessory.images && accessory.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//
//                                 alt={accessory.name}
//                             />
//                             <div className="details">
//                                 <div className="name">{accessory.name}</div>
//                                 <div className="price">
//                                     <span>KGS</span> {accessory.price}
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
// export default RelatedAccessories;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RelatedAccessories.css';

// const RelatedAccessories = ({ direction }) => {
//     const [accessories, setAccessories] = useState([]);
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [cardCount, setCardCount] = useState(5); // Количество карточек по умолчанию
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
//         setCurrentIndex(prevIndex => Math.min(accessories.length - cardCount, prevIndex + cardCount));
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
//                 {accessories.slice(currentIndex, currentIndex + cardCount).map((accessory, index) => (
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
//             </div>
//             <div className="slider-controls-related-accessories">
//                 <button className="prev-button" onClick={handlePrevClick} disabled={currentIndex === 0}>
//                     &#8592; Назад
//                 </button>
//                 <button className="next-button" onClick={handleNextClick} disabled={currentIndex + cardCount >= accessories.length}>
//                     Вперёд &#8594;
//                 </button>
//             </div>
//         </div>
//     );
//
// };
//
// export default RelatedAccessories;










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

    return (
        <div className="related-accessories">
            <h2>Аксессуары</h2>
            <div className="products-list-related-accessories">
                {accessories.slice(currentIndex, currentIndex + cardCount).map((accessory, index) => (
                    <div className="product-card-related-accessories" key={accessory._id}>
                        <Link to={`/products/${accessory._id}`} onClick={handleCardClick}>
                            <img
                                src={accessory.images && accessory.images.length > 0 ? fixImagePath(accessory.images[0]) : 'placeholder.jpg'}
                                alt={accessory.name}
                            />
                            <div className="details-related-accessories">
                                <div className="type-related-accessories">{accessory.type}</div>
                                <div className="brand-related-accessories">{accessory.brand}</div>
                                <div className="name-related-accessories">{accessory.name}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {accessories.length > cardCount && (
                <div className="slider-controls-related-accessories">
                    <button className="prev-button" onClick={handlePrevClick} disabled={currentIndex === 0}>
                        &#8592; Назад
                    </button>
                    <button className="next-button" onClick={handleNextClick} disabled={currentIndex + cardCount >= accessories.length}>
                        Вперёд &#8594;
                    </button>
                </div>
            )}
        </div>
    );
};

export default RelatedAccessories;
