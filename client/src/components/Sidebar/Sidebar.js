//
//
// import React, { useState, useEffect } from 'react';
// import './Sidebar.css';
//
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
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
//             setProducts(data.products);
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar ? '' : 'show' }`}>
//             {isSmallScreen && (
//                 <div className="closeBtn" onClick={handleCloseClick}>
//                     &#10006; {/* Это символ крестика (✖) */}
//                 </div>
//             )}
//             <h2 className="sbTitle">Товары</h2>
//             <ul>
//                 {selectedCategory ? (
//                     <>
//                         <li className="sbLi" style={{ fontSize:"20px" ,color: "goldenrod", fontFamily: "monospace"}}  key="back" onClick={handleBackClick}>
//                             Назад
//                         </li>
//                         {types.map((type) => (
//                             <li className="sbLi" key={type} onClick={() => handleTypeClick(type)}>
//                                 {type}
//                             </li>
//                         ))}
//                     </>
//
//                 ) : (
//                     categories.map((category) => (
//                         <li className="sbLi" key={category} onClick={() => handleCategoryClick(category)}>
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
// const Sidebar = ({ setProducts, showSidebar, setShowSidebar }) => {
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
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
//     const handleCloseClick = () => {
//         setShowSidebar(true); // При клике на крестик, показываем сайдбар
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
//             setProducts(data.products);
//             setShowSidebar(true); // Показываем сайдбар при выборе типа товара
//         } catch (error) {
//             console.error('Error fetching products by type:', error);
//         }
//     };
//
//     return (
//         <div className={`sidebar ${showSidebar && isSmallScreen ? '' : 'show' }`}>
//             {isSmallScreen && (
//                 <div className="closeBtn" onClick={handleCloseClick}>
//                     &#10006; {/* Это символ крестика (✖) */}
//                 </div>
//             )}
//             <h2 className="sbTitle">Товары</h2>
//             <ul>
//                 {selectedCategory ? (
//                     <>
//                         <li className="sbLi" style={{ fontSize:"20px" ,color: "goldenrod", fontFamily: "monospace"}}  key="back" onClick={handleBackClick}>
//                             Назад
//                         </li>
//                         {types.map((type) => (
//                             <li className="sbLi" key={type} onClick={() => handleTypeClick(type)}>
//                                 {type}
//                             </li>
//                         ))}
//                     </>
//
//                 ) : (
//                     categories.map((category) => (
//                         <li className="sbLi" key={category} onClick={() => handleCategoryClick(category)}>
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
            // Если экран маленький, скрываем боковое меню
            if (isSmallScreen) {
                setShowSidebar(true);
            }
        } catch (error) {
            console.error('Error fetching products by type:', error);
        }
    };

    return (
        <div className={`sidebar ${showSidebar ? '' : 'show' }`}>
            {isSmallScreen && (
                <div style={{marginLeft:"170px"}} className="closeBtn" onClick={handleCloseClick}>
                    &#10006; {/* Это символ крестика (✖) */}
                </div>
            )}
            <h2 className="sbTitle">Товары</h2>
            <ul>
                {selectedCategory ? (
                    <>
                        <li className="sbLi" style={{ fontSize:"20px" ,color: "goldenrod", fontFamily: "monospace"}}  key="back" onClick={handleBackClick}>
                            Назад
                        </li>
                        {types.map((type) => (
                            <li className="sbLi" key={type} onClick={() => handleTypeClick(type)}>
                                {type}
                            </li>
                        ))}
                    </>

                ) : (
                    categories.map((category) => (
                        <li className="sbLi" key={category} onClick={() => handleCategoryClick(category)}>
                            {category}
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
