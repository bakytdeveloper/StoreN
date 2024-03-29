


import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import tik from "../Header/tik-tok.png";
import what from "../Header/whatsapp.png";
import ins from "../Header/instagram.png";
import tel from "../Header/telegram.png";

import { FaPhone } from 'react-icons/fa';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";


const Sidebar = ({ setProducts, showSidebar, setShowSidebar, selectedOption }) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        const handleBodyScroll = (event) => {
            if (!showSidebar && isSmallScreen) {
                event.preventDefault();
                event.stopPropagation();
            }
        };

        if (isSmallScreen) {
            document.body.style.overflow = showSidebar ? 'auto' : 'hidden';
            document.body.style.position = showSidebar ? 'static' : 'fixed';
            document.body.style.width = '100%';
            document.body.addEventListener('scroll', handleBodyScroll, {passive: false});

            return () => {
                document.body.removeEventListener('scroll', handleBodyScroll);
            };
        }
    }, [showSidebar, isSmallScreen]);




    const handleCloseClick = () => {
        setShowSidebar(true);
    };

    const handleCategoryClick = async (category) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${category}`);
            const data = await response.json();
            setTypes(data.types);
            setSelectedCategory(category);
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching types by category:', error);
        }
    };

    const handleBackClick = () => {
        setSelectedCategory(null);
        setTypes([]);
        setProducts([]);
    };

    const handleTypeClick = async (type) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types/${selectedCategory}?type=${type}`);
            const data = await response.json();
            setProducts(data.products);
            if (isSmallScreen) {
                setShowSidebar(true);
            }
        } catch (error) {
            console.error('Error fetching products by type:', error);
        }
    };

    return (
        <div className={`sidebar ${showSidebar ? '' : 'show'}`}>
            <div className="titleShow">
                {isSmallScreen && (
                    <div className="closeBtn" onClick={handleCloseClick}>
                        &#215;
                    </div>
                )}
                <h2 className="sbTitle">{selectedOption === 'contact' ? <span className="contactTitle">Наши контакты</span> : 'Товары'}</h2>
            </div>
            <ul>
                {selectedOption === 'contact' ? (
                    <div className="contacts-info">
                        <div className="phones">
                            <FaPhone style={{marginTop:"0"}} />
                            <a style={{marginLeft:"25px"}} href="tel:+996508100777">0(508) 100 777</a>

                        </div>
                        <div className="phones">
                            <a href="https://api.whatsapp.com/send?phone=996508100777">
                                <img className="icon" style={{marginTop: "3px"}} src={what} alt="WhatsApp Icon" />
                                <span style={{marginLeft:"10px"}}>0(508) 100 777</span>
                            </a>

                        </div>
                        <div className="socials-icons">
                            <h3>Соц. сети</h3>
                            <a style={{marginLeft:"22px"}} href="https://www.tiktok.com/">
                                <img className="icons" src={tik} alt="Instagram Icon" />
                            </a>

                            <a style={{marginLeft:"22px", marginRight:"22px"}} href="https://www.instagram.com/">
                                <img className="icons ins" src={ins} alt="Instagram Icon" />
                            </a>
                            <a href="https://t.me/kanatasa?phone=+996508100777">
                                <img className="icons" src={tel} alt="Telegram Icon" />
                            </a>
                        </div>
                        <div>
                            <h4>График работы</h4>
                        <div className="workingTime" style={{fontSize:"20px", marginTop:"-24px"}}>с ПН по ВС - с 10:00 до 21:00</div>
                        </div>
                    </div>
                ) : (

                    <>
                        {selectedCategory ? (
                            <>

                                <li className="sbLiBack"
                                    key="back" onClick={handleBackClick}>
                                   <SlArrowLeft style={{fontSize:"15px"}} />  Назад
                                </li>


                                {types.map((type) => (
                                    <li className="sbLi" key={type} onClick={() => handleTypeClick(type)}>
                                        {/*{type}*/}
                                        {type} <span className="chevronRight"><SlArrowRight /></span>
                                    </li>
                                ))}
                            </>
                        ) : (
                            categories.map((category) => (
                                <li className="sbLi" key={category} onClick={() => handleCategoryClick(category)}>
                                    {category} <span className="chevronRight"><SlArrowRight /></span>
                                    {/*{category} <span className="chevronRight"><GoChevronRight /></span>*/}
                                </li>
                            ))
                        )}
                    </>
                )}
            </ul>
        </div>
    );


}

export default Sidebar;




