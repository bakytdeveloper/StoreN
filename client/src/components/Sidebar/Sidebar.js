import React, { useState, useEffect, useCallback } from 'react';
import './Sidebar.css';
import { useHistory } from "react-router-dom";
import ContactsInfo from './ContactsInfo';
import AccordionItem from "./AccordionItem";
import {FaTimes} from "react-icons/fa";

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

    // Функция для загрузки полов с сервера
    const fetchGenders = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchGenders();

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [fetchGenders]);

    // Оптимизированный обработчик выбора пола
    const handleGenderClick = useCallback(async (gender) => {
        if (selectedGender === gender) {
            // Сброс фильтров
            setSelectedGender(null);
            setCategories([]);
            setTypes([]);
            setProducts([]);
            setSearchTerm('');
            onSearch('');
            history.push('/catalog');
        } else {
            try {
                // Сначала обновляем состояние, чтобы UI реагировал мгновенно
                setSelectedGender(gender);
                setSelectedCategory(null);
                setSelectedType(null);
                setSearchTerm('');
                onSearch('');

                // Затем делаем запрос к API
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/products/categories?gender=${gender}`
                );
                const data = await response.json();

                // Обновляем состояния одним пакетом
                setCategories(data.categories || []);
                setTypes([]);
                setProducts(data.products || []);
            } catch (error) {
                console.error('Error fetching categories by gender:', error);
            }
        }
    }, [selectedGender, setSelectedGender, setProducts, setSearchTerm, onSearch, history]);

    // Оптимизированный обработчик выбора категории
    const handleCategoryClick = useCallback(async (category) => {
        if (selectedCategory === category) {
            // Сброс фильтров
            setSelectedCategory(null);
            setTypes([]);
            setProducts([]);
        } else {
            try {
                // Сначала обновляем состояние
                setSelectedCategory(category);
                setSelectedType(null);

                // Затем делаем запрос
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/products/types?gender=${selectedGender}&category=${category}`
                );
                const data = await response.json();

                // Обновляем состояния
                setTypes(data.types || []);
                setProducts(data.products || []);
                setSearchTerm('');
                onSearch('');
            } catch (error) {
                console.error('Error fetching types by category:', error);
            }
        }
    }, [selectedCategory, selectedGender, setSelectedCategory, setProducts, setSearchTerm, onSearch]);

    // Оптимизированный обработчик выбора типа
    const handleTypeClick = useCallback(async (type) => {
        if (selectedType === type) {
            // Сброс фильтров
            setSelectedType(null);
            setProducts([]);
        } else {
            try {
                // Сначала обновляем состояние
                setSelectedType(type);

                // Затем делаем запрос
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/products?gender=${selectedGender}&category=${selectedCategory}&type=${type}`
                );
                const data = await response.json();

                // Обновляем состояние
                setProducts(data.products || []);
                setSearchTerm('');
                onSearch('');

                // Закрываем сайдбар на мобильных устройствах
                if (isSmallScreen) {
                    setShowSidebar(false);
                }
            } catch (error) {
                console.error('Error fetching products by type:', error);
            }
        }
    }, [selectedType, selectedGender, selectedCategory, setProducts, setSearchTerm, onSearch, isSmallScreen, setShowSidebar]);

    return (
        <div className={`sidebar ${showSidebar ? '' : 'show'} ${isSmallScreen ? '' : 'permanent'}`}>

            {isSmallScreen && (
                <button
                    className="sidebar-close-btn"
                    onClick={() => setShowSidebar(true)}
                    aria-label="Закрыть меню"
                >
                    <FaTimes />
                </button>
            )}

            <ul>
                {selectedOption === 'contact' ? (
                    <ContactsInfo />
                ) : (
                    <>
                        <h2 style={{ marginTop: "0", marginBottom: "5px" }}>Товары</h2>
                        <hr />
                        {genders.map((gender) => (
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
                                selectedType={selectedType}
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

export default React.memo(Sidebar);