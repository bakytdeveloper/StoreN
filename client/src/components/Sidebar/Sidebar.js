
// // src/components/Sidebar/Sidebar.js
//
// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ setProducts }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/products/categories');
//                 const data = await response.json();
//                 setCategories(data.categories);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//                 setError('Error fetching categories');
//             }
//         };
//
//         fetchCategories();
//     }, []);
//
//     const handleCategoryClick = async (category) => {
//         setSelectedCategory(category);
//
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/types/${encodeURIComponent(category)}`);
//             if (!response.ok) {
//                 throw new Error('Error fetching products by category');
//             }
//
//             const data = await response.json();
//             setTypes(data.types);
//             setProducts(data.products); // Устанавливаем полученные продукты
//         } catch (error) {
//             console.error('Error fetching products by category:', error);
//             setError('Error fetching products by category');
//         }
//     };
//
//     const handleTypeClick = (type) => {
//         // Обработка нажатия на тип товара
//         // Можете реализовать логику выбора типа товара
//     };
//
//     return (
//         <div className="sidebar">
//             <h2>Товары</h2>
//             {error ? (
//                 <p>{error}</p>
//             ) : selectedCategory ? (
//                 <>
//                     <button onClick={() => setSelectedCategory(null)}>Назад</button>
//                     <ul>
//                         {types.map((type) => (
//                             <li key={type} onClick={() => handleTypeClick(type)}>
//                                 {type}
//                             </li>
//                         ))}
//                     </ul>
//                 </>
//             ) : (
//                 <ul>
//                     {categories.map((category) => (
//                         <li key={category} onClick={() => handleCategoryClick(category)}>
//                             {category}
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };
//
// export default Sidebar;




// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ onSelectType }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
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
//     const handleCategoryClick = async (category) => {
//         try {
//             const response = await fetch(`http://localhost:5500/api/products/types/${category}`);
//             const data = await response.json();
//
//             setSelectedCategory(category);
//             setTypes(data.types);
//         } catch (error) {
//             console.error('Error fetching products by category:', error);
//         }
//     };
//
//     const handleBackClick = () => {
//         setSelectedCategory(null);
//         setTypes([]);
//     };
//
//     return (
//         <div className="sidebar">
//             <h2>Товары</h2>
//             <ul>
//                 {selectedCategory ? (
//                     <>
//                         <li key="back" onClick={handleBackClick}>
//                             Назад
//                         </li>
//                         {types.map((type) => (
//                             <li key={type} onClick={() => onSelectType(type)}>
//                                 {type}
//                             </li>
//                         ))}
//                     </>
//                 ) : (
//                     categories.map((category) => (
//                         <li key={category} onClick={() => handleCategoryClick(category)}>
//                             {category}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;





// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ setProducts }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
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
//             const response = await fetch(`http://localhost:5500/api/products/types/${category}`);
//             const data = await response.json();
//             setTypes(data.types);
//             setSelectedCategory(category);
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
//             const response = await fetch(`http://localhost:5500/api/products?category=${selectedCategory}&type=${type}`);
//             const data = await response.json();
//             setProducts(data || []);
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     return (
//         <div className="sidebar">
//             <h2>Товары</h2>
//             <ul>
//                 {selectedCategory ? (
//                     <>
//                         <li key="back" onClick={handleBackClick}>
//                             Назад
//                         </li>
//                         {types.map((type) => (
//                             <li key={type} onClick={() => handleTypeClick(type)}>
//                                 {type}
//                             </li>
//                         ))}
//                     </>
//                 ) : (
//                     categories.map((category) => (
//                         <li key={category} onClick={() => handleCategoryClick(category)}>
//                             {category}
//                         </li>
//                     ))
//                 )}
//             </ul>
//         </div>
//     );
// };
//
// export default Sidebar;







// src/components/Sidebar/Sidebar.js

import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = ({ setProducts, showSidebar, setShowSidebar }) => {
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/products/categories');
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

    const handleCloseClick = () => {
        setShowSidebar(false);
    };


    const handleCategoryClick = async (category) => {
        try {
            const response = await fetch(`http://localhost:5500/api/products/types/${category}`);
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
            const response = await fetch(`http://localhost:5500/api/products/types/${selectedCategory}?type=${type}`);
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products by type:', error);
        }
    };



    return (
        <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
            {isSmallScreen && (
                <div className="closeBtn" onClick={handleCloseClick}>
                    &#10006; {/* Это символ крестика (✖) */}
                </div>
            )}
            <h2>Товары</h2>
            <ul>
                {selectedCategory ? (
                    <>
                        <li key="back" onClick={handleBackClick}>
                            Назад
                        </li>
                        {types.map((type) => (
                            <li key={type} onClick={() => handleTypeClick(type)}>
                                {type}
                            </li>
                        ))}
                    </>

                ) : (
                    categories.map((category) => (
                        <li key={category} onClick={() => handleCategoryClick(category)}>
                            {category}
                        </li>

                    ))

                )}

            </ul>
        </div>
    );
};

export default Sidebar;


