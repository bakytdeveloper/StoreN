

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
import {useHistory} from "react-router-dom";
import ContactInfo from "../Header/ContactInfo";

import './Home.css';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { title: "ГОТОВЬСЯ К ЛЕТУ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne1 },
        { title: "ГОТОВЬСЯ К ОСЕНИ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ОСЕННЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne2 },
        { title: "ГОТОВЬСЯ К ЗИМЕ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ЗИМНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne }
    ];

    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Переключаем слайд каждые 5 секунд

        return () => clearInterval(interval);
    }, [slides.length]);

    const handleImageClick = (gender) => {
        history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
    };


    const catalogPage = () => {
        history.push("/catalog");
    };


    return (
        <div className="home-container">
            <div className="carousel">
                <div className="carousel-track">
                    {slides.map((slide, index) => (
                        <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
                            <div className="text-container">
                                <h1 className="title">{slide.title}</h1>
                                <h2 className="subtitle">{slide.subtitle}</h2>
                                <h3 className="description">{slide.description}</h3>
                            </div>
                            <img className="slide-image" src={slide.image} alt={`Slide ${index + 1}`} />
                            <div className="slide-button">ПОСМОТРЕТЬ СЕЙЧАС</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="info-blocks">
                <div className="info-block" onClick={() => handleImageClick('Мужская одежда')}>
                    <span>Мужская одежда</span>
                    <img className="info-block-img" src={menProducts} alt="Мужская одежда" />
                </div>
                <div className="info-block" onClick={() => handleImageClick('Женская одежда')}>
                    <span>Женская одежда</span>
                    <img className="info-block-img" src={womenProducts} alt="Женская одежда" />
                </div>
                <div className="info-block" onClick={() => handleImageClick('Детская одежда')}>
                    <span>Детская одежда</span>
                    <img className="info-block-img" src={childrenProducts} alt="Детская одежда" />
                </div>
                <div className="info-block" onClick={() => handleImageClick('Гаджеты')}>
                    <span>Гаджеты</span>
                    <img className="info-block-img" src={gadgets} alt="Гаджеты" />
                </div>
                <div className="info-block" onClick={() => handleImageClick('Унисекс')}>
                    <span>Унисекс одежда</span>
                    <img className="info-block-img" src={unisex} alt="Унисекс одежда" />
                </div>
                <div className="info-block" onClick={() => handleImageClick('Аксессуары')}>
                    <span>Аксессуары</span>
                    <img className="info-block-img" src={accessories} alt="Аксессуары" />
                </div>


                <div className="info-block info-all" onClick={() => handleImageClick('Бытовая эл.техника')}>
                    <span>Бытовая эл.техника</span>
                    <img className="info-block-img info-all-img" src={allElectricalGoods} alt="Бытовая эл.техника" />
                </div>

                <div className="info-block info-all" onClick={catalogPage}>
                    <span>ВСЕ ТОВАРЫ</span>
                    <img style={{objectFit:"cover"}} className="info-block-img" src={catalog_page} alt="Аксессуары" />
                </div>

            </div>
            <div className="home-page-footer">
                <ContactInfo />
            </div>
        </div>
    );
};

export default Home;