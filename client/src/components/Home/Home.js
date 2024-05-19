// import React, { useState, useEffect } from 'react';
// import './Home.css';
//
// const Home = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slides = [
//         { title: "Заголовок 1", subtitle: "Подзаголовок 1", description: "Описание 1", image: "placeholder.jpg" },
//         { title: "Заголовок 2", subtitle: "Подзаголовок 2", description: "Описание 2", image: "placeholder.jpg" },
//         { title: "Заголовок 3", subtitle: "Подзаголовок 3", description: "Описание 3", image: "placeholder.jpg" }
//     ];
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                     {slides.map((slide, index) => (
//                         <div className="slide" key={index}>
//                             <div className="text-container">
//                                 <h1 className="title">{slide.title}</h1>
//                                 <p className="subtitle">{slide.subtitle}</p>
//                                 <p className="description">{slide.description}</p>
//                             </div>
//                             <img className="slide-image" src={slide.image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 <div className="info-block">Информация 1</div>
//                 <div className="info-block">Информация 2</div>
//                 <div className="info-block">Информация 3</div>
//                 <div className="info-block">Информация 4</div>
//                 <div className="info-block">Информация 5</div>
//                 <div className="info-block">Информация 6</div>
//             </div>
//         </div>
//     );
// };
//
// export default Home;


//
// import React, { useState, useEffect } from 'react';
// import './Home.css';
//
// const Home = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slides = [
//         { title: "Заголовок 1", subtitle: "Подзаголовок 1", description: "Описание 1", image: "placeholder.jpg" },
//         { title: "Заголовок 2", subtitle: "Подзаголовок 2", description: "Описание 2", image: "placeholder.jpg" },
//         { title: "Заголовок 3", subtitle: "Подзаголовок 3", description: "Описание 3", image: "placeholder.jpg" }
//     ];
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                     {slides.map((slide, index) => (
//                         <div className="slide" key={index}>
//                             <div className="text-container">
//                                 <h1 className="title">{slide.title}</h1>
//                                 <p className="subtitle">{slide.subtitle}</p>
//                                 <p className="description">{slide.description}</p>
//                             </div>
//                             <img className="slide-image" src={slide.image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 <div className="info-block">Информация 1</div>
//                 <div className="info-block">Информация 2</div>
//                 <div className="info-block">Информация 3</div>
//                 <div className="info-block">Информация 4</div>
//                 <div className="info-block">Информация 5</div>
//                 <div className="info-block">Информация 6</div>
//             </div>
//         </div>
//     );
// };
//
// export default Home;



// import React, { useState, useEffect } from 'react';
// import './Home.css';
//
// const Home = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slides = [
//         { title: "Заголовок 1", subtitle: "Подзаголовок 1", description: "Описание 1", image: "placeholder.jpg" },
//         { title: "Заголовок 2", subtitle: "Подзаголовок 2", description: "Описание 2", image: "placeholder.jpg" },
//         { title: "Заголовок 3", subtitle: "Подзаголовок 3", description: "Описание 3", image: "placeholder.jpg" }
//     ];
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
//                     {slides.map((slide, index) => (
//                         <div className="slide" key={index}>
//                             <div className="text-container">
//                                 <h1 className="title">{slide.title}</h1>
//                                 <p className="subtitle">{slide.subtitle}</p>
//                                 <p className="description">{slide.description}</p>
//                             </div>
//                             <img className="slide-image" src={slide.image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 <div className="info-block">Информация 1</div>
//                 <div className="info-block">Информация 2</div>
//                 <div className="info-block">Информация 3</div>
//                 <div className="info-block">Информация 4</div>
//                 <div className="info-block">Информация 5</div>
//                 <div className="info-block">Информация 6</div>
//             </div>
//         </div>
//     );
// };
//
// export default Home;




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
import {useHistory} from "react-router-dom";
import ContactInfo from "../Header/ContactInfo";

import './Home.css';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { title: "ГОТОВЬСЯ К ЛЕТУ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne1 },
        { title: "ГОТОВЬСЯ К ОСЕНИ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ОСЕННЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne1 },
        { title: "ГОТОВЬСЯ К ЗИМЕ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ЗИМНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne1 }
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


    return (
        <div className="home-container">
            <div className="carousel">
                <div className="carousel-track">
                    {slides.map((slide, index) => (
                        <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
                            <div className="text-container">
                                <h1 className="title">{slide.title}</h1>
                                <p className="subtitle">{slide.subtitle}</p>
                                <p className="description">{slide.description}</p>
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
            </div>
            <div className="home-page-footer">
                <ContactInfo />
            </div>
        </div>
    );
};

export default Home;
