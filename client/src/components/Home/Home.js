

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


// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm,
//                   setSelectedCategory , setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slides = [
//         { title: "ГОТОВЬСЯ К ЛЕТУ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne1 },
//         { title: "ГОТОВЬСЯ К ОСЕНИ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ОСЕННЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne2 },
//         { title: "ГОТОВЬСЯ К ЗИМЕ", subtitle: "НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ", description: "НОВОЕ ПОСТУПЛЕНИЕ ЗИМНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ", image: imgHomeOne }
//     ];
//     const history = useHistory();
//     const location = useLocation();
//
//     // Сброс фильтров при возвращении на страницу каталога
//     useEffect(() => {
//         if (location.pathname === '/') {
//             // Сбрасываем фильтры
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm(''); // Сбрасываем поисковый запрос
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true)
//         history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//     };
//
//     const catalogPage = () => {
//         history.push("/catalog");
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track">
//                     {slides.map((slide, index) => (
//                         <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
//                             <div className="text-container">
//                                 <h1 className="title slide-title">{slide.title}</h1>
//                                 <h2 className="subtitle">{slide.subtitle}</h2>
//                                 <h3 className="description-home">{slide.description}</h3>
//                             </div>
//                             <img className="slide-image" src={slide.image} alt={`Slide ${index + 1}`} />
//                             {/*<div className="slide-button">ПОСМОТРЕТЬ СЕЙЧАС</div>*/}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 <div className="info-block" onClick={() => handleImageClick('Мужская одежда')}>
//                     <span>Мужская одежда</span>
//                     <img className="info-block-img" src={menProducts} alt="Мужская одежда" />
//                 </div>
//                 <div className="info-block" onClick={() => handleImageClick('Женская одежда')}>
//                     <span>Женская одежда</span>
//                     <img className="info-block-img" src={womenProducts} alt="Женская одежда" />
//                 </div>
//                 <div className="info-block" onClick={() => handleImageClick('Детская одежда')}>
//                     <span>Детская одежда</span>
//                     <img className="info-block-img" src={childrenProducts} alt="Детская одежда" />
//                 </div>
//                 <div className="info-block" onClick={() => handleImageClick('Гаджеты')}>
//                     <span>Гаджеты</span>
//                     <img className="info-block-img" src={gadgets} alt="Гаджеты" />
//                 </div>
//                 <div className="info-block" onClick={() => handleImageClick('Унисекс')}>
//                     <span>Унисекс одежда</span>
//                     <img className="info-block-img" src={unisex} alt="Унисекс одежда" />
//                 </div>
//                 <div className="info-block" onClick={() => handleImageClick('Аксессуары')}>
//                     <span>Аксессуары</span>
//                     <img className="info-block-img" src={accessories} alt="Аксессуары" />
//                 </div>
//                 <div className="info-block info-all one-all" onClick={() => handleImageClick('Бытовая эл.техника')}>
//                     <span>Бытовая эл.техника</span>
//                     <img className="info-block-img info-all-img" src={allElectricalGoods} alt="Бытовая эл.техника" />
//                 </div>
//                 <div className="info-block info-all two-all" onClick={catalogPage}>
//                     <span>Товары для всех</span>
//                     <img style={{ objectFit: "cover" }} className="info-block-img info-block-img-two" src={catalog_page} alt="Аксессуары" />
//                 </div>
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//
//             {/*<div className="home-page-footer">*/}
//             {/*    <ContactInfo />*/}
//             {/*    /!*<Footer />*!/*/}
//             {/*</div>*/}
//         </div>
//     );
// };
//
// export default Home;




// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm,
//                   setSelectedCategory , setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     useEffect(() => {
//         // Fetch homepage data
//         fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => response.json())
//             .then(data => {
//                 setSlides(data.sliderImages);
//                 setGenderImages(data.genderImages);
//             })
//             .catch(error => console.error('Error fetching homepage data:', error));
//     }, []);
//
//     // Сброс фильтров при возвращении на страницу каталога
//     useEffect(() => {
//         if (location.pathname === '/') {
//             // Сбрасываем фильтры
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm(''); // Сбрасываем поисковый запрос
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true);
//         history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//     };
//
//     const catalogPage = () => {
//         history.push("/catalog");
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track">
//                     {slides.map((image, index) => (
//                         <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
//                             <div className="text-container">
//                                 <h1 className="title slide-title">ГОТОВЬСЯ К ЛЕТУ</h1> {/* Placeholder title */}
//                                 <h2 className="subtitle">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</h2> {/* Placeholder subtitle */}
//                                 <h3 className="description-home">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</h3> {/* Placeholder description */}
//                             </div>
//                             <img className="slide-image" src={image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 {genderImages.map((image, index) => (
//                     <div className="info-block" key={index} onClick={() => handleImageClick('Мужская одежда')}>
//                         <span>Мужская одежда</span> {/* Placeholder text */}
//                         <img className="info-block-img" src={image} alt="Мужская одежда" />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//         </div>
//     );
// };
//
// export default Home;




// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm,
//                   setSelectedCategory , setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     const titles = [
//         "Мужская одежда",
//         "Женская одежда",
//         "Детская одежда",
//         "Гаджеты",
//         "Унисекс",
//         "Аксессуары",
//         "Бытовая эл.техника",
//         "Товары для всех"
//     ];
//
//     useEffect(() => {
//         // Fetch homepage data
//         fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => response.json())
//             .then(data => {
//                 setSlides(data.sliderImages);
//                 setGenderImages(data.genderImages);
//             })
//             .catch(error => console.error('Error fetching homepage data:', error));
//     }, []);
//
//     // Сброс фильтров при возвращении на страницу каталога
//     useEffect(() => {
//         if (location.pathname === '/') {
//             // Сбрасываем фильтры
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm(''); // Сбрасываем поисковый запрос
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true);
//         history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track">
//                     {slides.map((image, index) => (
//                         <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
//                             <div className="text-container">
//                                 <h1 className="title slide-title">ГОТОВЬСЯ К ЛЕТУ</h1> {/* Placeholder title */}
//                                 <h2 className="subtitle">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</h2> {/* Placeholder subtitle */}
//                                 <h3 className="description-home">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</h3> {/* Placeholder description */}
//                             </div>
//                             <img className="slide-image" src={image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 {genderImages.map((image, index) => (
//                     <div className="info-block" key={index} onClick={() => handleImageClick(titles[index])}>
//                         <span>{titles[index]}</span>
//                         <img className="info-block-img" src={image} alt={titles[index]} />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//         </div>
//     );
// };
//
// export default Home;




// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     const genderTitles = [
//         'Мужская одежда',
//         'Женская одежда',
//         'Детская одежда',
//         'Гаджеты',
//         'Унисекс',
//         'Аксессуары',
//         'Бытовая эл.техника',
//         'Товары для всех'
//     ];
//
//     useEffect(() => {
//         // Fetch homepage data
//         fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => response.json())
//             .then(data => {
//                 setSlides(data.sliderImages);
//                 setGenderImages(data.genderImages);
//             })
//             .catch(error => console.error('Error fetching homepage data:', error));
//     }, []);
//
//     // Сброс фильтров при возвращении на страницу каталога
//     useEffect(() => {
//         if (location.pathname === '/') {
//             // Сбрасываем фильтры
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm(''); // Сбрасываем поисковый запрос
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true);
//         history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//     };
//
//     const catalogPage = () => {
//         history.push("/catalog");
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track">
//                     {slides.map((image, index) => (
//                         <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
//                             <div className="text-container">
//                                 <h1 className="title slide-title">ГОТОВЬСЯ К ЛЕТУ</h1> {/* Placeholder title */}
//                                 <h2 className="subtitle">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</h2> {/* Placeholder subtitle */}
//                                 <h3 className="description-home">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</h3> {/* Placeholder description */}
//                             </div>
//                             <img className="slide-image" src={image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 {genderImages.map((image, index) => (
//                     <div className="info-block" key={index} onClick={() => handleImageClick(genderTitles[index])}>
//                         <span>{genderTitles[index]}</span>
//                         <img className="info-block-img" src={image} alt={genderTitles[index]} />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//         </div>
//     );
// };
//
// export default Home;





// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     const genderTitles = [
//         'Мужская одежда',
//         'Женская одежда',
//         'Детская одежда',
//         'Гаджеты',
//         'Унисекс',
//         'Аксессуары',
//         'Бытовая эл.техника',
//         'Товары для всех'
//     ];
//
//     useEffect(() => {
//         // Fetch homepage data
//         fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => response.json())
//             .then(data => {
//                 setSlides(data.sliderImages);
//                 setGenderImages(data.genderImages);
//             })
//             .catch(error => console.error('Error fetching homepage data:', error));
//     }, []);
//
//     // Сброс фильтров при возвращении на страницу каталога
//     useEffect(() => {
//         if (location.pathname === '/') {
//             // Сбрасываем фильтры
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm(''); // Сбрасываем поисковый запрос
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true);
//         if (gender === 'Товары для всех') {
//             catalogPage();
//         } else {
//             history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//         }
//     };
//
//     const catalogPage = () => {
//         history.push("/catalog");
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track">
//                     {slides.map((image, index) => (
//                         <div className="slide" key={index} style={{ display: index === currentSlide ? 'block' : 'none' }}>
//                             <div className="text-container">
//                                 <h1 className="title slide-title">ГОТОВЬСЯ К ЛЕТУ</h1> {/* Placeholder title */}
//                                 <h2 className="subtitle">НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ</h2> {/* Placeholder subtitle */}
//                                 <h3 className="description-home">НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ</h3> {/* Placeholder description */}
//                             </div>
//                             <img className="slide-image" src={image} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 {genderImages.map((image, index) => (
//                     <div className="info-block" key={index} onClick={() => handleImageClick(genderTitles[index])}>
//                         <span>{genderTitles[index]}</span>
//                         <img className="info-block-img" src={image} alt={genderTitles[index]} />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//         </div>
//     );
// };
//
// export default Home;




// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//     const [slideColors, setSlideColors] = useState([]);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     const genderTitles = [
//         'Мужская одежда',
//         'Женская одежда',
//         'Детская одежда',
//         'Гаджеты',
//         'Унисекс',
//         'Аксессуары',
//         'Бытовая эл.техника',
//         'Товары для всех'
//     ];
//
//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => response.json())
//             .then(data => {
//                 setSlides(data.sliderImages);
//                 setGenderImages(data.genderImages);
//                 setSlideColors(data.sliderImages.map(image => image.colorBackground || '#ffffff'));
//             })
//             .catch(error => console.error('Error fetching homepage data:', error));
//     }, []);
//
//     useEffect(() => {
//         if (location.pathname === '/') {
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm('');
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
//         }, 5000);
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true);
//         if (gender === 'Товары для всех') {
//             catalogPage();
//         } else {
//             history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//         }
//     };
//
//     const catalogPage = () => {
//         history.push("/catalog");
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     return (
//         <div className="home-container">
//             {/*<div className="carousel">*/}
//                 <div className="carousel-track">
//                     {slides.map((image, index) => (
//                         <div
//                             className="slide"
//                             key={index}
//                             style={{
//                                 display: index === currentSlide ? 'block' : 'none',
//                                 backgroundColor: slideColors[index] // Устанавливаем цвет фона для слайда
//                             }}
//                         >
//                             <div className="text-container">
//                                 <h1 className="title slide-title">{image.promotions[0]?.title || 'Заголовок акции'}</h1>
//                                 <h2 className="subtitle">{image.promotions[0]?.subtitle || 'Подзаголовок акции'}</h2>
//                                 <h3 className="description-home">{image.promotions[0]?.description || 'Описание акции'}</h3>
//                             </div>
//                             <img className="slide-image" src={image.url} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             {/*</div>*/}
//             <div className="info-blocks">
//                 {genderImages.map((image, index) => (
//                     <div className="info-block" key={index} onClick={() => handleImageClick(genderTitles[index])}>
//                         <span>{genderTitles[index]}</span>
//                         <img className="info-block-img" src={image.url} alt={genderTitles[index]} />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//         </div>
//     );
// };
//
// export default Home;



// const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [slides, setSlides] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     const genderTitles = [
//         'Мужская одежда',
//         'Женская одежда',
//         'Детская одежда',
//         'Гаджеты',
//         'Унисекс',
//         'Аксессуары',
//         'Бытовая эл.техника',
//         'Товары для всех'
//     ];
//
//     useEffect(() => {
//         // Fetch homepage data
//         fetch(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => response.json())
//             .then(data => {
//                 setSlides(data.sliderImages);
//                 setGenderImages(data.genderImages);
//             })
//             .catch(error => console.error('Error fetching homepage data:', error));
//     }, []);
//
//     useEffect(() => {
//         if (location.pathname === '/') {
//             // Сбрасываем фильтры
//             setSelectedGender(null);
//             setSelectedCategory(null);
//             setSelectedType(null);
//             setSearchTerm(''); // Сбрасываем поисковый запрос
//         }
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType, setSearchTerm]);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
//         }, 5000); // Переключаем слайд каждые 5 секунд
//         return () => clearInterval(interval);
//     }, [slides.length]);
//
//     const handleImageClick = (gender) => {
//         setIsFooterCatalog(true);
//         if (gender === 'Товары для всех') {
//             catalogPage();
//         } else {
//             history.push(`/catalog?gender=${encodeURIComponent(gender)}`);
//         }
//     };
//
//     const catalogPage = () => {
//         history.push("/catalog");
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         document.body.classList.remove('no-scroll');
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     return (
//         <div className="home-container">
//             <div className="carousel">
//                 <div className="carousel-track">
//                     {slides.map((slide, index) => (
//                         <div
//                             className="slide"
//                             key={index}
//                             style={{
//                                 display: index === currentSlide ? 'block' : 'none',
//                                 backgroundColor: slide.colorBackground || '#ffffff' // Применение цвета фона
//                             }}
//                         >
//                             <div className="text-container">
//                                 <h1 className="title slide-title">{slide.promotions[0]?.title || 'ГОТОВЬСЯ К ЛЕТУ'}</h1>
//                                 <h2 className="subtitle">{slide.promotions[0]?.description || 'НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ'}</h2>
//                                 <h3 className="description-home">{slide.promotions[0]?.description || 'НОВОЕ ПОСТУПЛЕНИЕ ЛЕТНЕЙ КОЛЛЕКЦИИ ОДЕЖДЫ'}</h3>
//                             </div>
//                             <img className="slide-image" src={slide.url} alt={`Slide ${index + 1}`} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="info-blocks">
//                 {genderImages.map((image, index) => (
//                     <div className="info-block" key={index} onClick={() => handleImageClick(genderTitles[index])}>
//                         <span>{genderTitles[index]}</span>
//                         <img className="info-block-img" src={image.url} alt={genderTitles[index]} />
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <h2 className="newest-products-title">Самые Новые Товары</h2>
//                 <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
//             </div>
//         </div>
//     );
// };
//
// export default Home;



const Home = ({ setShowSidebar, setIsFooterCatalog, setSelectedGender, setSearchTerm, setSelectedCategory, setSelectedType }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState([]);
    const [genderImages, setGenderImages] = useState([]);
    const [carouselBgColor, setCarouselBgColor] = useState('#ffffff'); // Состояние для цвета фона

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
            setCurrentSlide((prevSlide) => {
                const newSlide = (prevSlide + 1) % slides.length;
                if (slides[newSlide]) {
                    setCarouselBgColor(slides[newSlide].colorBackground || '#ffffff'); // Обновляем цвет фона для нового слайда
                }
                return newSlide;
            });
        }, 5000); // Переключаем слайд каждые 5 секунд
        return () => clearInterval(interval);
    }, [slides.length]);

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
        setCurrentSlide(index);
        if (slides[index]) {
            setCarouselBgColor(slides[index].colorBackground || '#ffffff');
        }
    };


    return (
        <div className="home-container">
            {/*<div id="carouselExampleCaptions" className="carousel slide" style={{ backgroundColor: carouselBgColor }}>*/}
            {/*    <div className="carousel-indicators">*/}
            {/*        {slides.map((_, index) => (*/}
            {/*            <button*/}
            {/*                key={index}*/}
            {/*                type="button"*/}
            {/*                data-bs-target="#carouselExampleCaptions"*/}
            {/*                data-bs-slide-to={index}*/}
            {/*                className={index === currentSlide ? 'active' : ''}*/}
            {/*                aria-current={index === currentSlide ? 'true' : 'false'}*/}
            {/*                aria-label={`Slide ${index + 1}`}*/}
            {/*                onClick={() => handleIndicatorClick(index)}*/}
            {/*            ></button>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*    <div className="carousel-inner">*/}
            {/*        {slides.map((slide, index) => (*/}
            {/*            <div*/}
            {/*                key={index}*/}
            {/*                className={`carousel-item ${index === currentSlide ? 'active' : ''}`}*/}
            {/*                style={{ height: '100%' }} // Задает высоту карусели*/}
            {/*            >*/}
            {/*                <img src={slide.url} className="d-block w-100" alt={`Slide ${index + 1}`} />*/}
            {/*                <div className="carousel-caption d-none d-md-block carousel-caption-title-description">*/}
            {/*                    <div className="carousel-caption-title">{slide.promotions[0]?.title || 'ГОТОВЬСЯ К ЛЕТУ'}</div>*/}
            {/*                    <div className="carousel-caption-description">{slide.promotions[0]?.description || 'НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ'}</div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">*/}
            {/*        <span className="carousel-control-prev-icon" aria-hidden="true"></span>*/}
            {/*        <span className="visually-hidden">Previous</span>*/}
            {/*    </button>*/}
            {/*    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">*/}
            {/*        <span className="carousel-control-next-icon" aria-hidden="true"></span>*/}
            {/*        <span className="visually-hidden">Next</span>*/}
            {/*    </button>*/}
            {/*</div>*/}

            <div id="carouselExampleCaptions" className="carousel slide" style={{ backgroundColor: carouselBgColor }}>
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
                <div className="carousel-inner">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
                            style={{ height: '100%' }} // Высота карусели
                        >
                            <img src={slide.url} className="d-block w-100" alt={`Slide ${index + 1}`} />
                            <div className="carousel-caption d-none d-md-block carousel-caption-title-description">
                                <div className="carousel-caption-title">{slide.promotions[0]?.title || 'ГОТОВЬСЯ К ЛЕТУ'}</div>
                                <div className="carousel-caption-description">{slide.promotions[0]?.description || 'НОВАЯ КОЛЛЕКЦИЯ ВОШЛА В ЧАТ'}</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/*<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">*/}
                {/*    <span className="carousel-control-prev-icon carousel-control-prev-icon-prev" aria-hidden="true"></span>*/}
                {/*    <span className="visually-hidden">Previous</span>*/}
                {/*</button>*/}
                {/*<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">*/}
                {/*    <span className="carousel-control-next-icon" aria-hidden="true"></span>*/}
                {/*    <span className="visually-hidden">Next</span>*/}
                {/*</button>*/}

                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon carousel-control-prev-icon-prev" aria-hidden="true">
                            &#x2190; {/* Левая стрелка */}
                        </span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true">
                            &#x2192; {/* Правая стрелка */}
                        </span>
                    <span className="visually-hidden">Next</span>
                </button>


            </div>


            <div className="info-blocks">
                {genderImages.map((image, index) => (
                    <div className="info-block" key={index} onClick={() => handleImageClick(genderTitles[index])}>
                        <span>{genderTitles[index]}</span>
                        <img className="info-block-img" src={image.url} alt={genderTitles[index]} />
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