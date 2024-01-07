// // src/components/Sidebar/Sidebar.js
//
// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = () => {
//     const [categories, setCategories] = useState([]);
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/categories');
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//
//         fetchCategories();
//     }, []);
//
//     return (
//         <div className="sidebar">
//             <h2>Товары</h2>
//             <ul>
//                 {categories.map((category) => (
//                     <li key={category}>{category}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;
//
//
//
//
//






// // src/components/Sidebar/Sidebar.js
//
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Sidebar.css';
//
// const Sidebar = ({ setProducts, setSelectedType, setSearchKeyword }) => {
//     const [categories, setCategories] = useState([]);
//     const [currentCategory, setCurrentCategory] = useState(null);
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/categories');
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);
//
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`http://localhost:5500/api/products?category=${category}`);
//             const data = await response.json();
//             setProducts(data || []);
//             setCurrentCategory(category);
//             setSelectedType(null);
//             setSearchKeyword('');
//         } catch (error) {
//             console.error('Error fetching products by category:', error);
//         }
//     };
//
//     const handleBackClick = async () => {
//         try {
//             const response = await fetch('http://localhost:5500/api/products');
//             const data = await response.json();
//             setProducts(data || []);
//             setCurrentCategory(null);
//             setSelectedType(null);
//             setSearchKeyword('');
//         } catch (error) {
//             console.error('Error fetching all products:', error);
//         }
//     };
//
//     return (
//         <div className="sidebar">
//             <h2>Товары</h2>
//             <ul>
//                 {currentCategory ? (
//                     <li className="back-button" onClick={handleBackClick}>
//                         Назад
//                     </li>
//                 ) : null}
//                 {categories.map((category) => (
//                     <li key={category} onClick={() => handleCategoryClick(category)}>
//                         {category}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;





// src/components/Sidebar/Sidebar.js

import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ setProducts }) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/products/categories');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Error fetching categories');
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = async (category) => {
        setSelectedCategory(category);

        try {
            const response = await fetch(`http://localhost:5500/api/products/types/${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error('Error fetching products by category');
            }

            const data = await response.json();
            setTypes(data.types);
            setProducts(data.products); // Устанавливаем полученные продукты
        } catch (error) {
            console.error('Error fetching products by category:', error);
            setError('Error fetching products by category');
        }
    };

    const handleTypeClick = (type) => {
        // Обработка нажатия на тип товара
        // Можете реализовать логику выбора типа товара
    };

    return (
        <div className="sidebar">
            <h2>Товары</h2>
            {error ? (
                <p>{error}</p>
            ) : selectedCategory ? (
                <>
                    <button onClick={() => setSelectedCategory(null)}>Назад</button>
                    <ul>
                        {types.map((type) => (
                            <li key={type} onClick={() => handleTypeClick(type)}>
                                {type}
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <ul>
                    {categories.map((category) => (
                        <li key={category} onClick={() => handleCategoryClick(category)}>
                            {category}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Sidebar;
