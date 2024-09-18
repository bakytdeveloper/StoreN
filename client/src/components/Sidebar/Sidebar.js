import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaPhone } from 'react-icons/fa';
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import {useHistory} from "react-router-dom";
import ContactsInfo from './ContactsInfo';
import './Sidebar.css';
import AccordionItem from "./AccordionItem";


const Sidebar = ({
                     setProducts,
                     showSidebar,
                     setShowSidebar,
                     selectedOption,
                     selectedGender,
                     selectedCategory,
                     selectedType,
                     setSelectedGender,
                     setSelectedCategory,
                     setSelectedType,
                     setSearchTerm,
                     onSearch
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
                const genderOrder = [
                    "Мужская одежда",
                    "Женская одежда",
                    "Детская одежда",
                    "Унисекс",
                    "Гаджеты",
                    "Бытовая эл.техника",
                    "Аксессуары"
                ];
                const sortedGenders = data.genders.sort((a, b) => genderOrder.indexOf(a) - genderOrder.indexOf(b));
                setGenders(sortedGenders);
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


    const handleGenderClick = async (gender) => {
        if (selectedGender === gender) {
            setSelectedGender(null);
            setCategories([]);
            setProducts([]);

            setSearchTerm('');
            onSearch('');
            
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories?gender=${gender}`);
                const data = await response.json();

                setSearchTerm('');
                onSearch('');

                setCategories(data.categories);
                setSelectedGender(gender);
                setSelectedCategory(null);
                setSelectedType(null);
                setProducts(data.products);

            } catch (error) {
                console.error('Error fetching categories by gender:', error);
            }
        }
    };

    const handleCategoryClick = async (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
            setTypes([]);
            setProducts([]);
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types?gender=${selectedGender}&category=${category}`);
                const data = await response.json();
                setTypes(data.types);
                setSelectedCategory(category);
                setSelectedType(null);
                setProducts(data.products);

                setSearchTerm('');
                onSearch('');



            } catch (error) {
                console.error('Error fetching types by category:', error);
            }
        }
    };

    const handleTypeClick = async (type) => {
        if (selectedType === type) {
            setSelectedType(null);
            setProducts([]);
        } else {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products?gender=${selectedGender}&category=${selectedCategory}&type=${type}`);
                const data = await response.json();
                setSelectedType(type);
                setProducts(data.products);

                setSearchTerm('');
                onSearch('');

                if (isSmallScreen) {
                    setShowSidebar(false);
                }
            } catch (error) {
                console.error('Error fetching products by type:', error);
            }
        }
    };

    return (
        <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>
            <ul>
                {selectedOption === 'contact' ? (
                    <ContactsInfo />
                ) : (
                    <>
                        <h2 style={{ marginTop: "0", marginBottom: "5px" }}>Товары</h2>
                        <hr />
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
                                isSmallScreen={isSmallScreen}
                                setShowSidebar={setShowSidebar}
                                setSearchTerm={setSearchTerm}
                            />
                        ))}
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;