import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './HomePage.css'; // Подключим CSS для стилей компонента
import imgHomeOne from './imgHome/imgHomeOne.png'
import mensProducts from './imgHome/mens-products.png';
import childrenProducts from './imgHome/children-products.png';
import womenProducts from './imgHome/womens-products.png';
import unisex from './imgHome/unisex.png';
import gadgets from './imgHome/gadgets.png';
import accessories from './imgHome/accessories.png'

const HomePage = () => {
    return (
        <div className="homepage">
            <div className="carousel-container">
                <Carousel
                    autoPlay
                    interval={7000}
                    infiniteLoop
                    showThumbs={false}
                    showStatus={false}
                >
                    <div className="carousel-slide">
                        <div className="carousel-content">
                            <div className="carousel-title title1">ГОТОВЬСЯ К ЛЕТУ</div>
                            <div className="carousel-title title2">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</div>
                            <div className="carousel-title title3">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</div>
                        </div>
                        <img src={imgHomeOne} alt="Slide 1" className="carousel-image" />
                    </div>
                    <div className="carousel-slide">
                        <div className="carousel-content">
                            <div className="carousel-title title1">ГОТОВЬСЯ К ЛЕТУ</div>
                            <div className="carousel-title title2">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</div>
                            <div className="carousel-title title3">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</div>
                        </div>
                        <img src={imgHomeOne} alt="Slide 2" className="carousel-image" />
                    </div>
                    <div className="carousel-slide">
                        <div className="carousel-content">
                            <div className="carousel-title title1">ГОТОВЬСЯ К ЛЕТУ</div>
                            <div className="carousel-title title2">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</div>
                            <div className="carousel-title title3">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</div>
                        </div>
                        <img src={imgHomeOne} alt="Slide 3" className="carousel-image" />
                    </div>
                </Carousel>
            </div>
            <div className="elements-container">

                    <div className="element">
                        <img className="element-images" src={mensProducts}/>
                    </div>

                    <div className="element">
                        <img className="element-images" src={womenProducts}/>
                    </div>

                    <div className="element">
                        <img className="element-images" src={childrenProducts}/>
                    </div>

                    <div className="element">
                        <img className="element-images" src={unisex}/>
                    </div>

                    <div className="element">
                        <img className="element-images" src={gadgets}/>
                    </div>

                    <div className="element">
                        <img className="element-images" src={accessories}/>
                    </div>

            </div>
            <div style={{width:"100%", height:"100px", marginTop:"33px", background:"#eceaea"}}></div>
        </div>
    );
};

export default HomePage;
