


import React, { useState, useEffect } from 'react';
import './Sidebar.css';
// import tik from "../Header/tik-tok.png";
// import what from "../Header/whatsapp.png";
// import ins from "../Header/instagram.png";
// import tel from "../Header/telegram.png";
//
// import { FaPhone } from 'react-icons/fa';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import {useHistory} from "react-router-dom";


// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const [selectedType, setSelectedType] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//
//         window.addEventListener('resize', handleResize);
//
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     useEffect(() => {
//         const handleBodyScroll = (event) => {
//             if (!showSidebar && isSmallScreen) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//         };
//
//         if (isSmallScreen) {
//             document.body.style.overflow = showSidebar ? 'auto' : 'hidden';
//             document.body.style.position = showSidebar ? 'static' : 'fixed';
//             document.body.style.width = '100%';
//             document.body.addEventListener('scroll', handleBodyScroll, {passive: false});
//
//             return () => {
//                 document.body.removeEventListener('scroll', handleBodyScroll);
//             };
//         }
//     }, [showSidebar, isSmallScreen]);
//
//
//
//
//     const handleCloseClick = () => {
//         setShowSidebar(true);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setSelectedType(null); // Reset selectedType when a new category is selected
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };

//     const handleBackClick = () => {
//         setSelectedCategory(null);
//         setTypes([]);
//         setProducts([]);
//     };
//
//
//
//     const handleTypeClick = async (type) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//             const data = await response.json();
//             setSelectedType(type);
//             setProducts(data.products);
//             if (isSmallScreen) {
//                 setShowSidebar(true);
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'}`}>
//             <div className="titleShow">
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//                 <h2 className="sbTitle">{selectedOption === 'contact'
//                     ? <span className="contactTitle">Наши контакты</span>
//                     : 'Товары'}</h2>
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//                     <div className="contacts-info">
//                         <div className="phones">
//                             <FaPhone style={{marginTop:"0"}} />
//                             <a style={{marginLeft:"25px"}} href="tel:+996508100777">0(508) 100 777</a>
//                         </div>
//                         <div className="phones">
//                             <a href="https://api.whatsapp.com/send?phone=996508100777">
//                                 <img className="icon" style={{marginTop: "3px"}} src={what} alt="WhatsApp Icon" />
//                                 <span style={{marginLeft:"10px"}}>0(508) 100 777</span>
//                             </a>
//                         </div>
//                         <div className="socials-icons">
//                             <h3>Соц. сети</h3>
//                             <a style={{marginLeft:"22px"}} href="https://www.tiktok.com/">
//                                 <img className="icons" src={tik} alt="Instagram Icon" />
//                             </a>
//                             <a style={{marginLeft:"22px", marginRight:"22px"}} href="https://www.instagram.com/">
//                                 <img className="icons ins" src={ins} alt="Instagram Icon" />
//                             </a>
//                             <a href="https://t.me/kanatasa?phone=+996508100777">
//                                 <img className="icons" src={tel} alt="Telegram Icon" />
//                             </a>
//                         </div>
//                         <div>
//                             <h4>График работы</h4>
//                             <div className="workingTime" style={{fontSize:"20px", marginTop:"-24px"}}>с ПН по ВС - с 10:00 до 21:00</div>
//                         </div>
//                     </div>
//                 ) : (
//                     <>
//                         {selectedCategory ? (
//                             <>
//                                 <li className="sbLiBack" key="back" onClick={handleBackClick}>
//                                     <SlArrowLeft style={{fontSize:"15px"}} />  Назад
//                                 </li>
//                                 {types.map((type) => (
//                                     <li className="sbLi" key={type} onClick={() => handleTypeClick(type)}>
//                                         {/*{type}*/}
//                                         {type} <span className="chevronRight"><SlArrowRight /></span>
//                                     </li>
//                                 ))}
//                             </>
//                         ) : (
//                             categories.map((category) => (
//                                 <li className="sbLi" key={category} onClick={() => handleCategoryClick(category)}>
//                                     {category} <span className="chevronRight"><SlArrowRight /></span>
//                                     {/*{category} <span className="chevronRight"><GoChevronRight /></span>*/}
//                                 </li>
//                             ))
//                         )}
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
//
//
//
// }
//
// export default Sidebar;


//
// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import ContactsInfo from './ContactsInfo';

// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const [selectedType, setSelectedType] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     useEffect(() => {
//         const handleBodyScroll = (event) => {
//             if (!showSidebar && isSmallScreen) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//         };
//         if (isSmallScreen) {
//             document.body.style.overflow = showSidebar ? 'auto' : 'hidden';
//             document.body.style.position = showSidebar ? 'static' : 'fixed';
//             document.body.style.width = '100%';
//             document.body.addEventListener('scroll', handleBodyScroll, { passive: false });
//             return () => {
//                 document.body.removeEventListener('scroll', handleBodyScroll);
//             };
//         }
//     }, [showSidebar, isSmallScreen]);
//
//     const handleCloseClick = () => {
//         setShowSidebar(true);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setSelectedType(null); // Reset selectedType when a new category is selected
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };
//
//     const handleBackClick = () => {
//         setSelectedCategory(null);
//         setTypes([]);
//         setProducts([]);
//     };
//
//     const handleTypeClick = async (type) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//             const data = await response.json();
//             setSelectedType(type);
//             setProducts(data.products);
//             if (isSmallScreen) {
//                 setShowSidebar(true);
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'}`}>
//             <div className="titleShow">
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//                 <h2 className="sbTitle">
//                     {selectedOption === 'contact' ? <span className="contactTitle">Наши контакты</span> : 'Товары'}
//                 </h2>
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//                     <ContactsInfo />
//                 ) : (
//                     <>
//                         {selectedCategory ? (
//                             <>
//                                 <li className="sbLiBack" key="back" onClick={handleBackClick}>
//                                     <SlArrowLeft style={{ fontSize: "15px" }} /> Назад
//                                 </li>
//                                 {types.map((type) => (
//                                     <li className="sbLi" key={type} onClick={() => handleTypeClick(type)}>
//                                         {type} <span className="chevronRight"><SlArrowRight /></span>
//                                     </li>
//                                 ))}
//                             </>
//                         ) : (
//                             categories.map((category) => (
//                                 <li className="sbLi" key={category} onClick={() => handleCategoryClick(category)}>
//                                     {category} <span className="chevronRight"><SlArrowRight /></span>
//                                 </li>
//                             ))
//                         )}
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;





// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
// import ContactsInfo from './ContactsInfo';  // Предполагается, что этот компонент уже создан
// import React, { useState, useEffect } from 'react';
// import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
// import { useHistory } from 'react-router-dom';
// import ContactsInfo from './ContactsInfo'; // или путь к вашему компоненту с контактной информацией

// import React, { useState, useEffect } from 'react';
// import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
// import { useHistory } from 'react-router-dom';
// import ContactsInfo from './ContactsInfo'; // или путь к вашему компоненту с контактной информацией

// const AccordionItem = ({ category, onCategoryClick, selectedCategory, types, onTypeClick, resetProducts }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//
//     const handleCategoryClick = async () => {
//         if (isExpanded) {
//             resetProducts(); // Сбросить товары при сворачивании категории
//         } else {
//             await onCategoryClick(category);
//         }
//         setIsExpanded(!isExpanded);
//     };
//
//     return (
//         <li className="sbLi">
//             <div onClick={handleCategoryClick}>
//                 {category} <span className="chevronRight"><SlArrowRight /></span>
//             </div>
//             {isExpanded && selectedCategory === category && (
//                 <ul>
//                     {types.map((type) => (
//                         <li className="sbLi" key={type} onClick={() => onTypeClick(type)}>
//                             {type} <span className="chevronRight"><SlArrowRight /></span>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </li>
//     );
// };
//
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//                 setProducts(data.products); // Инициализировать товары всеми продуктами
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [setProducts]);
//
//     useEffect(() => {
//         const handleBodyScroll = (event) => {
//             if (!showSidebar && isSmallScreen) {
//                 event.preventDefault();
//                 event.stopPropagation();
//             }
//         };
//         if (isSmallScreen) {
//             document.body.style.overflow = showSidebar ? 'auto' : 'hidden';
//             document.body.style.position = showSidebar ? 'static' : 'fixed';
//             document.body.style.width = '100%';
//             document.body.addEventListener('scroll', handleBodyScroll, { passive: false });
//             return () => {
//                 document.body.removeEventListener('scroll', handleBodyScroll);
//             };
//         }
//     }, [showSidebar, isSmallScreen]);
//
//     const handleCloseClick = () => {
//         setShowSidebar(false);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };
//
//     const handleTypeClick = async (type) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//             const data = await response.json();
//             setProducts(data.products);
//             if (isSmallScreen) {
//                 setShowSidebar(false);
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     const resetProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//             const data = await response.json();
//             setProducts(data.products);
//             setSelectedCategory(null);
//             setTypes([]);
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'}`}>
//             <div className="titleShow">
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//                 <h2 className="sbTitle">
//                     {selectedOption === 'contact' ? <span className="contactTitle">Наши контакты</span> : 'Товары'}
//                 </h2>
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//                     <ContactsInfo />
//                 ) : (
//                     categories.map((category) => (
//                         <AccordionItem
//                             key={category}
//                             category={category}
//                             onCategoryClick={handleCategoryClick}
//                             selectedCategory={selectedCategory}
//                             types={types}
//                             onTypeClick={handleTypeClick}
//                             resetProducts={resetProducts}
//                         />
//                     ))
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;




// import React, { useState, useEffect } from 'react';
// import { SlArrowRight, SlArrowLeft } from 'react-icons/sl';
// import { useHistory } from 'react-router-dom';
import './Sidebar.css';
// import ContactsInfo from './ContactsInfo';

// const AccordionItem = ({ category, onCategoryClick, selectedCategory, types, onTypeClick, resetProducts }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//
//
//     const handleCategoryClick = async () => {
//         if (isExpanded) {
//             resetProducts();
//         } else {
//             await onCategoryClick(category);
//         }
//         setIsExpanded(!isExpanded);
//     };
//
//
//     const handleBackClick = () => {
//         setSelectedCategory(null);
//         setTypes([]);
//         setProducts([]);
//     };
//
//
//     return (
//         <>
//             <li className="sbLi" onClick={handleCategoryClick}>
//                 {category} <SlArrowRight />
//             </li>
//             <div className={`accordionContent ${isExpanded && selectedCategory === category ? 'expanded' : ''}`}>
//                 <li className="sbLiBack" key="back" onClick={handleBackClick}>
//                         <SlArrowLeft style={{ fontSize: "15px" }} /> Назад
//                  </li>
//                 {types.map((type) => (
//                     <li className="sbLi" key={type} onClick={() => onTypeClick(type)}>
//                         {type} <SlArrowRight />
//                     </li>
//                 ))}
//             </div>
//         </>
//     );
// };


// const AccordionItem = ({ category, onCategoryClick, selectedCategory, types, onTypeClick, resetProducts }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
//
//     const handleCategoryClick = async () => {
//         if (isExpanded) {
//             resetProducts();
//         } else {
//             await onCategoryClick(category);
//         }
//         setIsExpanded(!isExpanded);
//     };
//
//     const handleBackClick = () => {
//         resetProducts(); // Сбрасывает выбранный тип и возвращает категории товаров
//         setIsExpanded(false); // Сворачивает список типов
//     };
//
//     return (
//         <>
//             <li className="sbLi" onClick={handleCategoryClick}>
//                 {category} <strong>+</strong>
//                 {/*{category} <SlArrowRight />*/}
//             </li>
//             <div className={`accordionContent ${isExpanded && selectedCategory === category ? 'expanded' : ''}`}>
//                 <h5>Типы</h5>
//                 <li className="sbLi" key="back" onClick={handleBackClick}>
//                 {/*<li className="sbLiBack" key="back" onClick={handleBackClick}>*/}
//                     {/*<SlArrowLeft style={{ fontSize: "10px" }} />*/}
//                     Назад<strong>-</strong>
//
//                 </li>
//                 {types.map((type) => (
//                     <li className="sbLi sb-li-type" style={{marginLeft:"15px"}} key={type} onClick={() => onTypeClick(type)}>
//                         {type} <strong>+</strong>
//                         {/*{type} <SlArrowRight />*/}
//                     </li>
//                 ))}
//             </div>
//         </>
//     );
// };
//
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const [selectedType, setSelectedType] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const handleCloseClick = () => {
//         setShowSidebar(true);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setSelectedType(null);
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };
//
//     const handleTypeClick = async (type) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//             const data = await response.json();
//             setSelectedType(type);
//             setProducts(data.products);
//             if (isSmallScreen) {
//                 setShowSidebar(false);
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     const resetProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//             const data = await response.json();
//             setProducts(data.products);
//             setSelectedCategory(null);
//             setTypes([]);
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>
//             <div className="titleShow">
//                 <h2 className="sbTitle">{selectedOption === 'contact' ? 'Наши контакты' : 'Товары'}</h2>
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//                     <ContactsInfo />
//                 ) : (
//                     <>
//                         <li className="sectionTitle">Категории</li>
//                         {categories.map((category) => (
//                             <AccordionItem
//                                 key={category}
//                                 category={category}
//                                 onCategoryClick={handleCategoryClick}
//                                 selectedCategory={selectedCategory}
//                                 types={types}
//                                 onTypeClick={handleTypeClick}
//                                 resetProducts={resetProducts}
//                             />
//                         ))}
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;




// // !!!!!!!!!!!!!!
// const AccordionItem = ({ category, onCategoryClick, selectedCategory, types, onTypeClick, resetProducts }) => {
//     const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
//     const [expandedType, setExpandedType] = useState(null);
//
//     const handleCategoryClick = async () => {
//         if (isCategoryExpanded) {
//             resetProducts();
//         } else {
//             await onCategoryClick(category);
//         }
//         setIsCategoryExpanded(!isCategoryExpanded);
//     };
//
//     const handleTypeClick = async (type) => {
//         if (expandedType === type) {
//             setExpandedType(null);
//         } else {
//             await onTypeClick(type);
//             setExpandedType(type);
//         }
//     };
//
//     const handleBackClick = () => {
//         resetProducts(); // Сбрасывает выбранный тип и возвращает категории товаров
//         setIsCategoryExpanded(false); // Сворачивает список типов
//     };
//
//     return (
//         <>
//             <li className="sbLi" onClick={handleCategoryClick}>
//                 {category} <strong>{isCategoryExpanded ? '-' : '+'}</strong>
//             </li>
//             <div className={`accordionContent ${isCategoryExpanded && selectedCategory === category ? 'expanded' : ''}`}>
//                 <h5>Типы</h5>
//                 {/*<li className="sbLiBack" key="back" onClick={handleBackClick}>*/}
//                 {/*    Назад <strong>-</strong>*/}
//                 {/*</li>*/}
//                 {types.map((type) => (
//                     <li className="sbLi sb-li-type" style={{marginLeft:"15px"}} key={type} onClick={() => handleTypeClick(type)}>
//                         {type} <strong>{expandedType === type ? '-' : '+'}</strong>
//                     </li>
//                 ))}
//             </div>
//         </>
//     );
// };
//
//
//
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const [selectedType, setSelectedType] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const handleCloseClick = () => {
//         setShowSidebar(true);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setSelectedType(null);
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };
//
//     const handleTypeClick = async (type) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//             const data = await response.json();
//             setSelectedType(type);
//             setProducts(data.products);
//             if (isSmallScreen) {
//                 setShowSidebar(false);
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     const resetProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//             const data = await response.json();
//             setProducts(data.products);
//             setSelectedCategory(null);
//             setTypes([]);
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>
//             <div className="titleShow">
//                 <h2 className="sbTitle">{selectedOption === 'contact' ? 'Наши контакты' : 'Товары'}</h2>
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//                     <ContactsInfo />
//                 ) : (
//                     <>
//                         <li className="sectionTitle">Категории</li>
//                         {categories.map((category) => (
//                             <AccordionItem
//                                 key={category}
//                                 category={category}
//                                 onCategoryClick={handleCategoryClick}
//                                 selectedCategory={selectedCategory}
//                                 types={types}
//                                 onTypeClick={handleTypeClick}
//                                 resetProducts={resetProducts}
//                             />
//                         ))}
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;





// //     !!!!!!!!!!!!!!!!!!!
// const AccordionItem = ({ category, onCategoryClick, selectedCategory, types, onTypeClick, resetProducts }) => {
//     const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
//     const [expandedType, setExpandedType] = useState(null);
//
//     const handleCategoryClick = async () => {
//         if (isCategoryExpanded) {
//             resetProducts();
//         } else {
//             await onCategoryClick(category);
//         }
//         setIsCategoryExpanded(!isCategoryExpanded);
//     };
//
//     const handleTypeClick = async (type) => {
//         if (expandedType === type) {
//             setExpandedType(null);
//         } else {
//             await onTypeClick(type);
//             setExpandedType(type);
//         }
//     };
//
//     const handleBackClick = () => {
//         resetProducts(); // Сбрасывает выбранный тип и возвращает категории товаров
//         setIsCategoryExpanded(false); // Сворачивает список типов
//         setExpandedType(null); // Сбрасывает выбранный тип
//     };
//
//     return (
//         <>
//             <li className="sbLi" onClick={handleCategoryClick}>
//                 {category} <strong>{isCategoryExpanded ? '-' : '+'}</strong>
//             </li>
//             <div className={`accordionContent ${isCategoryExpanded && selectedCategory === category ? 'expanded' : ''}`}>
//                 <h5>Типы</h5>
//                 {types.map((type) => (
//                     <li
//                         className="sbLi sb-li-type"
//                         style={{ marginLeft: "15px" }}
//                         key={type}
//                         onClick={() => handleTypeClick(type)}
//                     >
//                         {expandedType === null || expandedType === type ? (
//                             <>
//                                 {type} <strong>{expandedType === type ? '-' : '+'}</strong>
//                             </>
//                         ) : null}
//                     </li>
//                 ))}
//             </div>
//         </>
//     );
// };
//
//
//
//
//
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const [selectedType, setSelectedType] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const handleCloseClick = () => {
//         setShowSidebar(true);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setSelectedType(null);
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };
//
//     const handleTypeClick = async (type) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//             const data = await response.json();
//             setSelectedType(type);
//             setProducts(data.products);
//             if (isSmallScreen) {
//                 setShowSidebar(false);
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     const resetProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//             const data = await response.json();
//             setProducts(data.products);
//             setSelectedCategory(null);
//             setTypes([]);
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>
//             <div className="titleShow">
//                 <h2 className="sbTitle">{selectedOption === 'contact' ? 'Наши контакты' : 'Товары'}</h2>
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//                     <ContactsInfo />
//                 ) : (
//                     <>
//                         <li className="sectionTitle">Категории</li>
//                         {categories.map((category) => (
//                             <AccordionItem
//                                 key={category}
//                                 category={category}
//                                 onCategoryClick={handleCategoryClick}
//                                 selectedCategory={selectedCategory}
//                                 types={types}
//                                 onTypeClick={handleTypeClick}
//                                 resetProducts={resetProducts}
//                             />
//                         ))}
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;






// const AccordionItem = ({ category, onCategoryClick, selectedCategory, types, onTypeClick, resetProducts }) => {
//     const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
//     const [expandedType, setExpandedType] = useState(null);
//
//     const handleCategoryClick = async () => {
//         if (isCategoryExpanded) {
//             resetProducts();
//         } else {
//             await onCategoryClick(category);
//         }
//         setIsCategoryExpanded(!isCategoryExpanded);
//     };
//
//     const handleTypeClick = async (type) => {
//         if (expandedType === type) {
//             setExpandedType(null);
//             await onCategoryClick(category); // Показать все товары категории при повторном клике на тип
//         } else {
//             await onTypeClick(type);
//             setExpandedType(type);
//         }
//     };
//
//     const handleBackClick = () => {
//         resetProducts(); // Сбрасывает выбранный тип и возвращает категории товаров
//         setIsCategoryExpanded(false); // Сворачивает список типов
//         setExpandedType(null); // Сбрасывает выбранный тип
//     };
//
//     return (
//         <>
//             <li className="sbLi" onClick={handleCategoryClick}>
//
//                 {category} <strong>{isCategoryExpanded ? '-' : '+'}</strong>
//             </li>
//             <div className={`accordionContent ${isCategoryExpanded && selectedCategory === category ? 'expanded' : ''}`}>
//                 <h5 style={{marginTop:"7px", marginBottom:"0"}}>Типы</h5>
//                 {types.map((type) => (
//                     <li
//                         className="sbLi sb-li-type"
//                         style={{ marginLeft: "15px" }}
//                         key={type}
//                         onClick={() => handleTypeClick(type)}
//                     >
//                         {expandedType === null || expandedType === type ? (
//                             <>
//                                 {type} <strong>{expandedType === type ? '-' : '+'}</strong>
//                             </>
//                         ) : null}
//                     </li>
//                 ))}
//             </div>
//         </>
//     );
// };
//
//
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
//     const [selectedType, setSelectedType] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//
//         const handleResize = () => {
//             setIsSmallScreen(window.innerWidth <= 768);
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);
//
//     const handleCloseClick = () => {
//         setShowSidebar(true);
//     };
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
//             setSelectedType(null);
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching types by category:', error);
//         }
//     };
//
//     const handleTypeClick = async (type) => {
//         try {
//             if (selectedType === type) {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}`);
//                 const data = await response.json();
//                 setTypes(data.types);
//                 setSelectedType(null);
//                 setProducts(data.products);
//             } else {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
//                 const data = await response.json();
//                 setSelectedType(type);
//                 setProducts(data.products);
//                 if (isSmallScreen) {
//                     setShowSidebar(false);
//                 }
//             }
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     const resetProducts = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//             const data = await response.json();
//             setProducts(data.products);
//             setSelectedCategory(null);
//             setTypes([]);
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };
//
//
//
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>
//             <div className="titleShow">
//                 {/*<h2 className="sbTitle">{selectedOption === 'contact' ? 'Наши контакты' : 'Товары'}</h2>*/}
//                 {isSmallScreen && (
//                     <div className="closeBtn" onClick={handleCloseClick}>
//                         &#215;
//                     </div>
//                 )}
//             </div>
//             <ul>
//                 {selectedOption === 'contact' ? (
//
//
//
//                     <ContactsInfo />
//                 ) : (
//                     <>
//                         <h2>Товары</h2>
//
//                         {/*{isSmallScreen && (*/}
//                         {/*    <div className="closeBtn" onClick={handleCloseClick}>*/}
//                         {/*        &#215;*/}
//                         {/*    </div>*/}
//                         {/*)}*/}
//
//                         <li className="sectionTitle">Категории</li>
//                         {categories.map((category) => (
//                             <AccordionItem
//                                 key={category}
//                                 category={category}
//                                 onCategoryClick={handleCategoryClick}
//                                 selectedCategory={selectedCategory}
//                                 types={types}
//                                 onTypeClick={handleTypeClick}
//                                 resetProducts={resetProducts}
//                             />
//                         ))}
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;
//








const AccordionItem = ({ gender, onGenderClick, selectedGender, categories, onCategoryClick, selectedCategory, types, onTypeClick }) => {
    const [isGenderExpanded, setIsGenderExpanded] = useState(false);
    const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
    const [expandedType, setExpandedType] = useState(null);

    const handleGenderClick = async () => {
        if (isGenderExpanded) {
            setIsGenderExpanded(false);
        } else {
            await onGenderClick(gender);
            setIsGenderExpanded(true);
        }
    };

    const handleCategoryClick = async (category) => {
        if (isCategoryExpanded && selectedCategory === category) {
            setIsCategoryExpanded(false);
        } else {
            await onCategoryClick(category);
            setIsCategoryExpanded(true);
        }
    };

    const handleTypeClick = async (type) => {
        if (expandedType === type) {
            setExpandedType(null);
        } else {
            await onTypeClick(type);
            setExpandedType(type);
        }
    };

    return (
        <>
            <li className="sbLi" onClick={handleGenderClick}>
                {gender} <strong>{isGenderExpanded ? '-' : '+'}</strong>
            </li>
            <div className={`accordionContent ${isGenderExpanded && selectedGender === gender ? 'expanded' : ''}`}>
                {categories.map((category) => (
                    <div key={category}>
                        <li className="sbLi" onClick={() => handleCategoryClick(category)}>
                            {category} <strong>{isCategoryExpanded && selectedCategory === category ? '-' : '+'}</strong>
                        </li>
                        {isCategoryExpanded && selectedCategory === category && (
                            <div className="nestedContent">
                                {types.map((type) => (
                                    <li
                                        className={`sbLi sb-li-type ${expandedType === type ? 'selected-type' : ''}`}
                                        style={{ marginLeft: "15px" }}
                                        key={type}
                                        onClick={() => handleTypeClick(type)}
                                    >
                                        {type}
                                    </li>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};


const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption,
                     selectedGender, selectedCategory, selectedType, setSelectedGender, setSelectedCategory, setSelectedType
                }) => {
    const [genders, setGenders] = useState([]);
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);



    const history = useHistory();

    useEffect(() => {
        const fetchGenders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/genders`);
                const data = await response.json();
                setGenders(data.genders);
            } catch (error) {
                console.error('Error fetching genders:', error);
            }
        };
        fetchGenders();

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleCloseClick = () => {
        setShowSidebar(true);
    };


    const handleGenderClick = async (gender) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories?gender=${gender}`);
            const data = await response.json();
            setCategories(data.categories);
            setSelectedGender(gender); // Установка выбранного пола
            setSelectedCategory(null);
            setSelectedType(null);
            setProducts(data.products); // Установка товаров с учетом выбранного пола
        } catch (error) {
            console.error('Error fetching categories by gender:', error);
        }
    };

    const handleCategoryClick = async (category) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types?gender=${selectedGender}&category=${category}`);
            const data = await response.json();
            setTypes(data.types);
            setSelectedCategory(category); // Установка выбранной категории
            setSelectedType(null);
            setProducts(data.products); // Установка товаров с учетом выбранного пола и категории
        } catch (error) {
            console.error('Error fetching types by category:', error);
        }
    };

    const handleTypeClick = async (type) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?gender=${selectedGender}&category=${selectedCategory}&type=${type}`);
            const data = await response.json();
            setSelectedType(type); // Установка выбранного типа товара
            setProducts(data.products); // Установка товаров с учетом выбранного пола, категории и типа товара
            if (isSmallScreen) {
                setShowSidebar(false);
            }
        } catch (error) {
            console.error('Error fetching products by type:', error);
        }
    };



    return (
        <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>
            <div className="titleShow">
                {isSmallScreen && (
                    <div className="closeBtn" onClick={handleCloseClick}>
                        &#215;
                    </div>
                )}
            </div>
            <ul>
                {selectedOption === 'contact' ? (
                    <ContactsInfo />
                ) : (
                    <>
                        <h2>Товары</h2>
                        <li className="sectionTitle">Пол</li>
                        {genders && genders.map((gender) => (
                            <AccordionItem
                                key={gender}
                                gender={gender}
                                onGenderClick={handleGenderClick}
                                selectedGender={selectedGender}
                                categories={categories}
                                onCategoryClick={handleCategoryClick}
                                selectedCategory={selectedCategory}
                                types={types}
                                onTypeClick={handleTypeClick}
                            />
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;


