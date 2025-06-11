import React, { useState, useEffect } from 'react';
import {useHistory, useLocation} from "react-router-dom";
import './Home.css';
import NewestProducts from './NewestProducts/NewestProducts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = ({ setShowSidebar, setCartItems, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [genderImages, setGenderImages] = useState([]);
    const [carouselBgColor, setCarouselBgColor] = useState('#ffffff');
     const [isManualSwitch, setIsManualSwitch] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const genderTitles = [
        'Мужская одежда',
        'Женская одежда',
        'Детская одежда',
        'Унисекс',
        'Гаджеты',
        'Аксессуары',
        'Бытовая эл.техника',
        'Товары для всех'
    ];

    useEffect(() => {
        // Fetch homepage data
        fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
            .then(response => response.json())
            .then(data => {
                setSlides(data.sliderImages);
                setGenderImages(data.genderImages);
                if (data.sliderImages.length > 0) {
                    setCarouselBgColor(data.sliderImages[0].colorBackground || '#ffffff'); // Устанавливаем начальный цвет фона
                }
            })
            .catch(error => console.error('Error fetching homepage data:', error));
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            // Сбрасываем фильтры
            setSelectedGender(null);
            setSelectedCategory(null);
            setSelectedType(null);
            setSearchTerm('');
        }
    }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isManualSwitch) {
                setCurrentSlide((prevSlide) => {
                    const newSlide = (prevSlide + 1) % slides.length;
                    if (slides[newSlide]) {
                        setCarouselBgColor(slides[newSlide].colorBackground || '#ffffff'); // Обновляем цвет фона для нового слайда
                    }
                    return newSlide;
                });
            }
        }, 5000);

        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [slides.length, isManualSwitch]);


    const handleImageClick = async (gender) => {
        setIsFooterCatalog(true);

        try {
            // Формируем URL для запроса
            let url;
            if (gender === 'Товары для всех') {
                catalogPage();
                return;
                // url = `${process.env.REACT_APP_API_URL}/api/products?page=1&limit=1`;
            } else if (gender === 'Аксессуары') {
                url = `${process.env.REACT_APP_API_URL}/api/products?category=${encodeURIComponent('Аксессуары')}&page=1&limit=1`;
            } else {
                url = `${process.env.REACT_APP_API_URL}/api/products?gender=${encodeURIComponent(gender)}&page=1&limit=1`;
            }

            // Запрос к API
            const response = await fetch(url);
            if (!response.ok) throw new Error('Ошибка загрузки данных');

            const products = await response.json();
            console.log("PRODUCTS:", products);

            // Проверяем, есть ли товары по выбранному `gender` или в категории `Аксессуары`
            const hasMatchingProducts = Array.isArray(products) && products.some(product =>
                (gender === 'Аксессуары' && product.category === 'Аксессуары') ||
                (product.gender === gender)
            );

            if (!hasMatchingProducts) {
                toast.info(`Товары в категории "${gender}" отсутствуют`);
                return; // НЕ выполняем переход
            }

            // Если товары есть, выполняем переход
            let redirectUrl = gender === 'Аксессуары'
                ? `/catalog?category=${encodeURIComponent('Аксессуары')}`
                : `/catalog?gender=${encodeURIComponent(gender)}`;

            history.push(redirectUrl);
        } catch (error) {
            console.error('Ошибка проверки товаров:', error);
            toast.error('Произошла ошибка при проверке наличия товаров');
        }
    };

    const catalogPage = () => {
        history.push("/catalog");
    };

    useEffect(() => {
        setShowSidebar(true);
        document.body.classList.remove('no-scroll');
        return () => setShowSidebar(true);
    }, [setShowSidebar]);


    const handleIndicatorClick = (index) => {
        setIsManualSwitch(true);
        setCurrentSlide(index);
        if (slides[index]) {
            setCarouselBgColor(slides[index].colorBackground || '#ffffff');
        }
        setTimeout(() => setIsManualSwitch(false), 5000); // Возобновляем автоматическое переключение через 5 секунд
    };


    // Обработчик клика по боковым кнопкам
    const handleControlClick = (direction) => {
        setIsManualSwitch(true); // Приостанавливаем автоматическое переключение

        setCurrentSlide((prevSlide) => {
            const newSlide = direction === 'prev'
                ? (prevSlide - 1 + slides.length) % slides.length
                : (prevSlide + 1) % slides.length;
            if (slides[newSlide]) {
                setCarouselBgColor(slides[newSlide].colorBackground || '#ffffff');
            }
            return newSlide;
        });

        setTimeout(() => setIsManualSwitch(false), 5000);
    };
    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem('cartItems'));
        if (savedCart) {
            setCartItems(savedCart);
        }
    }, [setCartItems]);

    return (
        <div className="home-container">
            <div id="carouselExampleCaptions" className="carousel slide" style={{ backgroundColor: carouselBgColor, borderRadius:"10px" }}>
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={index}
                            className={index === currentSlide ? 'active' : ''}
                            aria-current={index === currentSlide ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => handleIndicatorClick(index)}
                        ></button>
                    ))}
                </div>
                <div className="carousel-inner" >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                            style={{ height: '100%', border:"none" }} // Высота карусели
                        >
                            <div className="carousel-item-image">
                                <img src={slide.url} className="d-block w-100 carousel-item-img" alt={`Slide ${index + 1}`} />
                            </div>
                            <div className="carousel-caption d-md-block carousel-caption-title-description">
                                <div className="carousel-caption-title" style={{ color: slide.colorTitle || '#000000', fontSize: slide.fontSizeTitle, fontFamily: slide.fontFamilleTitle || 'Arial' }}>{slide.promotions[0]?.title || 'ГОТОВЬСЯ К ЛЕТУ'}</div>
                                <div className="carousel-caption-description" style={{ color: slide.colorDescription || '#000000', fontSize: slide.fontSizeDescription, fontFamily: slide.fontFamilleDescription || 'Arial' }}>{slide.promotions[0]?.description || 'НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ'}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-control-prev"
                    type="button"
                    onClick={() => handleControlClick('prev')}
                >
                    <span className="carousel-control-prev-icon carousel-control-prev-icon-prev" aria-hidden="true">
                        &#x2190; {/* Левая стрелка */}
                    </span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    onClick={() => handleControlClick('next')}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true">
                        &#x2192;
                    </span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>


            <div className="info-blocks">
                {genderImages.map((image, index) => (
                    <div className="info-block" key={index} onClick={() => handleImageClick(genderTitles[index])}>
                        <div className="info-block-title">{genderTitles[index]}</div>
                        <div className="info-block-image">
                            <img className="info-block-img" src={image.url} alt={genderTitles[index]} />
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="newest-products-title">Самые Новые Товары</h2>
                <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
            </div>
        </div>
    );
};

export default Home;