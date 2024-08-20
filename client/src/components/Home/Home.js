

import React, { useState, useEffect } from 'react';
import imgHomeOne from './imgHome/imgHomeOne.png';
import imgHomeOne1 from './imgHome/imgHomeOne11.png';
import imgHomeOne2 from './imgHome/imgHomeOne2.png';
import menProducts from './imgHome/men-products.png';
import womenProducts from './imgHome/women-products.png';
import childrenProducts from './imgHome/children-products.png';
import gadgets from './imgHome/gadgets.png';
import unisex from './imgHome/unisex.png';
import accessories from './imgHome/accessories.png';
import allElectricalGoods from './imgHome/allElectricalGoods.png';
import catalog_page from './imgHome/catalog-page.jpg';
import {useHistory, useLocation} from "react-router-dom";
import ContactInfo from "../ContactInfo/ContactInfo";

import './Home.css';


import NewestProducts from './NewestProducts/NewestProducts';
import Footer from "../Footer/Footer";



const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [genderImages, setGenderImages] = useState([]);
    const [carouselBgColor, setCarouselBgColor] = useState('#ffffff'); // Состояние для цвета фона
     const [isManualSwitch, setIsManualSwitch] = useState(false); // Состояние для ручного переключения

    const history = useHistory();
    const location = useLocation();

    const genderTitles = [
        'Мужская одежда',
        'Женская одежда',
        'Детская одежда',
        'Гаджеты',
        'Унисекс',
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
            setSearchTerm(''); // Сбрасываем поисковый запрос
        }
    }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isManualSwitch) { // Проверяем, что автоматическое переключение не приостановлено
                setCurrentSlide((prevSlide) => {
                    const newSlide = (prevSlide + 1) % slides.length;
                    if (slides[newSlide]) {
                        setCarouselBgColor(slides[newSlide].colorBackground || '#ffffff'); // Обновляем цвет фона для нового слайда
                    }
                    return newSlide;
                });
            }
        }, 5000); // Переключаем слайд каждые 5 секунд

        return () => clearInterval(interval);
    }, [slides.length, isManualSwitch]);


    const handleImageClick = (gender) => {
        setIsFooterCatalog(true);
        if (gender === 'Товары для всех') {
            catalogPage();
        } else {
            history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
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


    // Обработчик клика по индикаторам
    const handleIndicatorClick = (index) => {
        setIsManualSwitch(true); // Приостанавливаем автоматическое переключение
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

        setTimeout(() => setIsManualSwitch(false), 5000); // Возобновляем автоматическое переключение через 5 секунд
    };

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
                        &#x2192; {/* Правая стрелка */}
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

            {/*<div className="info-blocks">*/}
            {/*    {genderImages.map((image, index) => {*/}
            {/*        // Применяем разные классы для последних двух карточек*/}
            {/*        let blockClass = "info-block";*/}
            {/*        let imgClass = "info-block-img";*/}

            {/*        if (index === genderImages.length - 2) {*/}
            {/*            blockClass = "info-block info-all one-all";*/}
            {/*            imgClass = "info-block-img info-all-img";*/}
            {/*        } else if (index === genderImages.length - 1) {*/}
            {/*            blockClass = "info-block info-all two-all";*/}
            {/*            imgClass = "info-block-img info-block-img-two";*/}
            {/*        }*/}

            {/*        return (*/}
            {/*            <div className={blockClass} key={index} onClick={() => handleImageClick(genderTitles[index])}>*/}
            {/*                <span>{genderTitles[index]}</span>*/}
            {/*                <img className={imgClass} src={image.url} alt={genderTitles[index]} style={index === genderImages.length - 1 ? { objectFit: "cover" } : {}} />*/}
            {/*            </div>*/}
            {/*        );*/}
            {/*    })}*/}
            {/*</div>*/}

            <div>
                <h2 className="newest-products-title">Самые Новые Товары</h2>
                <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
            </div>
        </div>
    );
};

export default Home;