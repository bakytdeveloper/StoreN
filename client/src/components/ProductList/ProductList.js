
import React, {useState, useEffect, useCallback} from 'react';
import './ProductList.css';
import bas from './basket.png';
import {Link, useHistory, useLocation} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import left from "./arrowsL.png";
import right from "./arrowsR.png";
import './ProductList.css';



// const ProductList = ({ searchKeyword, cartItems, setCartItems, products, setProducts, showSidebar, setShowSidebar,
//                          selectedGender, selectedCategory, selectedType, setSelectedGender,
//                          setSelectedCategory, setSelectedType}) => {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeSellers, setActiveSellers] = useState([]);
//     const [productsPerPage, setProductsPerPage] = useState(12);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [resizeTimer, setResizeTimer] = useState(null);
//     const history = useHistory();
//     const location = useLocation();
//
//
//     useEffect(() => {
//         setShowSidebar(false);
//         return () => {
//             setShowSidebar(false);
//         };
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setShowSidebar(false);
//         }
//     }, [windowWidth, setShowSidebar]);
//
//
//     // Сбросить выбранные значения при изменении маршрута
//     useEffect(() => {
//         setSelectedGender(null);
//         setSelectedCategory(null);
//         setSelectedType(null);
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType]);
//
//
//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const gender = params.get('gender');
//         if (gender) {
//             setSelectedGender(decodeURIComponent(gender));
//         }
//     }, [location.search]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         setCurrentPage(1);
//     }, [searchKeyword, products]);
//
//     useEffect(() => {
//         fetchData();
//     }, [searchKeyword, selectedGender, windowWidth,
//         selectedGender, selectedCategory, selectedType]);
//
//
//     // ProductList.js
//     const fetchData = async () => {
//         try {
//             const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}`, { timeout: 10000 });
//             const productsData = await productsResponse.json();
//             setProducts(productsData);
//             const filteredProductsData = filterProducts(productsData || [], activeSellers);
//             setFilteredProducts(filteredProductsData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//
//
//     useEffect(() => {
//         fetchActiveSellers();
//     }, []);
//
//     useEffect(() => {
//         if (products && products.length > 0 && activeSellers.length > 0) {
//             setFilteredProducts(filterProducts(products, activeSellers));
//         } else {
//             fetchData();
//         }
//     }, [products, currentPage, activeSellers]);
//
//     useEffect(() => {
//         const handleResize = () => {
//             clearTimeout(resizeTimer);
//             setResizeTimer(setTimeout(() => {
//                 setWindowWidth(window.innerWidth);
//             }, 200));
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [resizeTimer]);
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setProductsPerPage(15);
//         } else if (windowWidth < 450) {
//             setProductsPerPage(10);
//         } else {
//             setProductsPerPage(12);
//         }
//     }, [windowWidth]);
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setShowSidebar(true);
//         }
//     }, [windowWidth, location.pathname, setShowSidebar]);
//
//     const fetchActiveSellers = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, { timeout: 10000 });
//             const data = await response.json();
//             const activeSellersData = data.filter(seller => seller.status !== 'suspend');
//             setActiveSellers(activeSellersData);
//         } catch (error) {
//             console.error('Error fetching active sellers:', error);
//         }
//     };
//
//     const filterProducts = (productsToFilter, activeSellersData) => {
//         return productsToFilter
//             .filter((product) => !selectedGender || product.gender === selectedGender)
//             .filter((product) => !selectedCategory || product.category === selectedCategory) // Filter by selected category
//             .filter((product) => !selectedType || product.type === selectedType) // Filter by selected type
//             .filter(
//                 (product) =>
//                     searchKeyword
//                         ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                         product.type.toLowerCase().includes(searchKeyword.toLowerCase())
//                         : true
//             )
//             .filter(product => {
//                 const seller = activeSellersData.find(seller => seller.products.includes(product._id));
//                 return seller ? true : false;
//             });
//     };
//
//
//     const handleAddToCart = (product) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//         if (itemInCart) {
//             const updatedCart = cartItems.map((item) =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg',
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                     size: product.size,
//                     color: product.color,
//                 },
//             ]);
//         }
//     };
//
//     const handleBuyNow = (product) => {
//         handleAddToCart(product);
//         history.push('/cart');
//     };
//
//     const handleNextPage = () => {
//         setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//     };
//
//     const handlePrevPage = () => {
//         setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//     };
//
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setProductsPerPage(15);
//         } else if (windowWidth < 450) {
//             setProductsPerPage(10);
//         } else {
//             setProductsPerPage(12);
//         }
//     }, [windowWidth]);
//
//     useEffect(() => {
//         setShowSidebar(false);
//         return () => {
//             setShowSidebar(false);
//         };
//     }, [setShowSidebar]);
//
//     return (
//         <div className="product-list">
//             {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} setShowSidebar={setShowSidebar} selectedOption={selectedCategory} />}
//             {displayedProducts.length ? (
//                 displayedProducts.map((product) => (
//                     <div className="product-card" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//
//                                 <div className="brand-and-name">
//                                     <div className="brand">{product.brand}</div>
//                                     <div className="name">{product.name.length > 7 ? product.name.substring(0, 7) + '...' : product.name}</div>
//                                 </div>
//
//                                  <div className="price">
//                                     KGS {product.price}
//                                 </div>
//                             </div>
//                         </Link>
//                         <div className="actions">
//                             <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
//                                 <strong>+</strong>
//                                 <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                             </button>
//                             {/*<button className="buy-button" title="Buy Now" onClick={() => handleBuyNow(product)}>*/}
//                             {/*    Заказать*/}
//                             {/*</button>*/}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <h2 className="no-products">Идёт загрузка...</h2>
//             )}
//             {displayedProducts.length > 0 && (
//                 <div className="pagination-container">
//                     <div className="pagination">
//                         <hr style={{ color: "black" }} />
//                         <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
//                             <img className="arrowLImg" src={left} alt="Cart" />
//                         </button>
//                         <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
//                         <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                             <img className="arrowRImg" src={right} alt="Cart" />
//                         </button>
//                         <div className="product-list-plinth"></div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default ProductList;






// const ProductList = ({
//                          searchKeyword,
//                          cartItems,
//                          setCartItems,
//                          products,
//                          setProducts,
//                          showSidebar,
//                          setShowSidebar,
//                          selectedGender,
//                          selectedCategory,
//                          selectedType,
//                          setSelectedGender,
//                          setSelectedCategory,
//                          setSelectedType
//                      }) => {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeSellers, setActiveSellers] = useState([]);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [resizeTimer, setResizeTimer] = useState(null);
//     const [productsPerPage, setProductsPerPage] = useState(12); // Изменено
//
//     const history = useHistory();
//     const location = useLocation();
//
//     useEffect(() => {
//         setShowSidebar(false);
//         return () => {
//             setShowSidebar(false);
//         };
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setShowSidebar(false);
//         }
//     }, [windowWidth, setShowSidebar, location.pathname]);
//
//     // useEffect(() => {
//     //     if (windowWidth >= 1200) {
//     //         setShowSidebar(true);
//     //     }
//     // }, [windowWidth, location.pathname, setShowSidebar]);
//
//
//     useEffect(() => {
//         setSelectedGender(null);
//         setSelectedCategory(null);
//         setSelectedType(null);
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType]);
//
//
//     const fetchData = async () => {
//         try {
//             const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}`, { timeout: 10000 });
//             const productsData = await productsResponse.json();
//             setProducts(productsData);
//             const filteredProductsData = filterProducts(productsData || [], activeSellers);
//             setFilteredProducts(filteredProductsData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//
//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const gender = params.get('gender');
//         if (gender) {
//             setSelectedGender(decodeURIComponent(gender));
//         }
//     }, [location.search]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         setCurrentPage(1);
//     }, [searchKeyword, products]);
//
//     useEffect(() => {
//         fetchData();
//     }, [searchKeyword, selectedGender, windowWidth, selectedCategory, selectedType]);
//
//     useEffect(() => {
//         fetchActiveSellers();
//     }, []);
//
//     useEffect(() => {
//         if (products && products.length > 0 && activeSellers.length > 0) {
//             setFilteredProducts(filterProducts(products, activeSellers));
//         } else {
//             fetchData();
//         }
//     }, [products, currentPage, activeSellers]);
//
//     useEffect(() => {
//         const handleResize = () => {
//             clearTimeout(resizeTimer);
//             setResizeTimer(
//                 setTimeout(() => {
//                     setWindowWidth(window.innerWidth);
//                 }, 200)
//             );
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [resizeTimer]);
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setProductsPerPage(15);
//         } else if (windowWidth < 450) {
//             setProductsPerPage(10);
//         } else {
//             setProductsPerPage(12);
//         }
//     }, [windowWidth]);
//
//     // useEffect(() => {
//     //     if (windowWidth >= 1200) {
//     //         setShowSidebar(true);
//     //     }
//     // }, [windowWidth, location.pathname, setShowSidebar]);
//
//     const fetchActiveSellers = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, { timeout: 10000 });
//             const data = await response.json();
//             const activeSellersData = data.filter(seller => seller.status !== 'suspend');
//             setActiveSellers(activeSellersData);
//         } catch (error) {
//             console.error('Error fetching active sellers:', error);
//         }
//     };
//
//     const filterProducts = (productsToFilter, activeSellersData) => {
//         return productsToFilter
//             .filter(product => !selectedGender || product.gender === selectedGender)
//             .filter(product => !selectedCategory || product.category === selectedCategory)
//             .filter(product => !selectedType || product.type === selectedType)
//             .filter(product =>
//                 searchKeyword
//                     ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.type.toLowerCase().includes(searchKeyword.toLowerCase())
//                     : true
//             )
//             .filter(product => {
//                 const seller = activeSellersData.find(seller => seller.products.includes(product._id));
//                 return seller ? true : false;
//             });
//     };
//
//     const handleAddToCart = (product) => {
//         const itemInCart = cartItems.find(item => item.productId === product._id);
//         if (itemInCart) {
//             const updatedCart = cartItems.map(item =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg',
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                     size: product.size,
//                     color: product.color
//                 }
//             ]);
//         }
//     };
//
//     const handleBuyNow = (product) => {
//         handleAddToCart(product);
//         history.push('/cart');
//     };
//
//     const handleNextPage = () => {
//         setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
//     };
//
//     const handlePrevPage = () => {
//         setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
//     };
//
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace('images/W/MEDIAX_792452-T2/', '');
//     };
//
//     return (
//         <div className="product-list">
//             {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} setShowSidebar={setShowSidebar} selectedOption={selectedCategory} />}
//             {displayedProducts.length ? (
//                 displayedProducts.map(product => (
//                     <div className="product-card" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'} alt={product.name} />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//                                 <div className="brand-and-name">
//                                     <div className="brand">{product.brand}</div>
//                                     <div className="name">{product.name.length > 7 ? product.name.substring(0, 7) + '...' : product.name}</div>
//                                 </div>
//                                 <div className="price">KGS {product.price}</div>
//                             </div>
//                         </Link>
//                         <div className="actions">
//                             <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
//                                 <strong>+</strong>
//                                 <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                             </button>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <h2 className="no-products">Идёт загрузка...</h2>
//             )}
//             {displayedProducts.length > 0 && (
//                 <div className="pagination-container">
//                     <div className="pagination">
//                         <hr style={{ color: 'black' }} />
//                         <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
//                             <img className="arrowLImg" src={left} alt="Cart" />
//                         </button>
//                         <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
//                         <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                             <img className="arrowRImg" src={right} alt="Cart" />
//                         </button>
//                         <div className="product-list-plinth"></div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default ProductList;





// const ProductList = ({
//                          searchKeyword,
//                          cartItems,
//                          setCartItems,
//                          products,
//                          setProducts,
//                          showSidebar,
//                          setShowSidebar,
//                          selectedGender,
//                          selectedCategory,
//                          selectedType,
//                          setSelectedGender,
//                          setSelectedCategory,
//                          setSelectedType
//                      }) => {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [activeSellers, setActiveSellers] = useState([]);
//     const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//     const [resizeTimer, setResizeTimer] = useState(null);
//     const [productsPerPage, setProductsPerPage] = useState(12);
//
//     const history = useHistory();
//     const location = useLocation();
//
//     useEffect(() => {
//         setShowSidebar(false);
//         return () => {
//             setShowSidebar(false);
//         };
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         if (windowWidth >= 1200) {
//             setShowSidebar(false);
//         }
//     }, [windowWidth, setShowSidebar, location.pathname]);
//
//     useEffect(() => {
//         setSelectedGender(null);
//         setSelectedCategory(null);
//         setSelectedType(null);
//     }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType]);
//
//     const fetchData = async () => {
//         try {
//             const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}`, { timeout: 10000 });
//             const productsData = await productsResponse.json();
//             setProducts(productsData);
//             const filteredProductsData = filterProducts(productsData || [], activeSellers);
//             setFilteredProducts(filteredProductsData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
//
//     useEffect(() => {
//         const params = new URLSearchParams(location.search);
//         const gender = params.get('gender');
//         if (gender) {
//             setSelectedGender(decodeURIComponent(gender));
//         }
//     }, [location.search]);
//
//     useEffect(() => {
//         window.scrollTo(0, 0);
//         setCurrentPage(1);
//     }, [searchKeyword, products]);
//
//     useEffect(() => {
//         fetchData();
//     }, [searchKeyword, selectedGender, windowWidth, selectedCategory, selectedType]);
//
//     useEffect(() => {
//         fetchActiveSellers();
//     }, []);
//
//     useEffect(() => {
//         if (products && products.length > 0 && activeSellers.length > 0) {
//             setFilteredProducts(filterProducts(products, activeSellers));
//         } else {
//             fetchData();
//         }
//     }, [products, currentPage, activeSellers]);
//
//     useEffect(() => {
//         const handleResize = () => {
//             clearTimeout(resizeTimer);
//             setResizeTimer(
//                 setTimeout(() => {
//                     setWindowWidth(window.innerWidth);
//                 }, 200)
//             );
//         };
//         window.addEventListener('resize', handleResize);
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [resizeTimer]);
//
//     // 960(3), 1340(6), 1200(4), 480(2)
//
//     useEffect(() => {
//         if (windowWidth >= 1340) {
//             setProductsPerPage(18);
//         } else if (windowWidth >= 1200) {
//             setProductsPerPage(15);
//         } else if (windowWidth < 960) {
//             setProductsPerPage(12);
//         } else if (windowWidth <= 900) {
//             setProductsPerPage(8);
//         } else {
//             setProductsPerPage(12);
//         }
//     }, [windowWidth]);
//
//     const fetchActiveSellers = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, { timeout: 10000 });
//             const data = await response.json();
//             const activeSellersData = data.filter(seller => seller.status !== 'suspend');
//             setActiveSellers(activeSellersData);
//         } catch (error) {
//             console.error('Error fetching active sellers:', error);
//         }
//     };
//
//     const filterProducts = (productsToFilter, activeSellersData) => {
//         return productsToFilter
//             .filter(product => !selectedGender || product.gender === selectedGender)
//             .filter(product => !selectedCategory || product.category === selectedCategory)
//             .filter(product => !selectedType || product.type === selectedType)
//             .filter(product =>
//                 searchKeyword
//                     ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//                     product.type.toLowerCase().includes(searchKeyword.toLowerCase())
//                     : true
//             )
//             .filter(product => {
//                 const seller = activeSellersData.find(seller => seller.products.includes(product._id));
//                 return seller ? true : false;
//             });
//     };
//
//     const handleAddToCart = (product) => {
//         const itemInCart = cartItems.find(item => item.productId === product._id);
//         if (itemInCart) {
//             const updatedCart = cartItems.map(item =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg',
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                     size: product.size,
//                     color: product.color
//                 }
//             ]);
//         }
//     };
//
//     const handleBuyNow = (product) => {
//         handleAddToCart(product);
//         history.push('/cart');
//     };
//
//     const handleNextPage = () => {
//         setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
//     };
//
//     const handlePrevPage = () => {
//         setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
//     };
//
//     const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//     const startIndex = (currentPage - 1) * productsPerPage;
//     const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace('images/W/MEDIAX_792452-T2/', '');
//     };
//
//     return (
//         <div className="product-list">
//             {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} setShowSidebar={setShowSidebar} selectedOption={selectedCategory} />}
//             {displayedProducts.length ? (
//                 displayedProducts.map(product => (
//                     <div className="product-card" key={product._id}>
//                         <Link to={`/products/${product._id}`}>
//                             <img src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'} alt={product.name} />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//                                 <div className="brand-and-name">
//                                     <div className="brand">{product.brand}</div>
//                                     <div className="name">{product.name.length > 5 ? product.name.substring(0, 5) + '...' : product.name}</div>
//                                 </div>
//                                 <div className="price">KGS {product.price}</div>
//                             </div>
//                         </Link>
//                         <div className="actions">
//                             <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
//                                 <strong>+</strong>
//                                 <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                             </button>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <h2 className="no-products">Идёт загрузка...</h2>
//             )}
//             {displayedProducts.length > 0 && (
//                 <div className="pagination-container">
//                     <div className="pagination">
//                         <hr style={{ color: 'black' }} />
//                         <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
//                             <img className="arrowLImg" src={left} alt="Cart" />
//                         </button>
//                         <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
//                         <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
//                             <img className="arrowRImg" src={right} alt="Cart" />
//                         </button>
//                         <div className="product-list-plinth"></div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default ProductList;




const ProductList = ({
                         searchKeyword,
                         cartItems,
                         setCartItems,
                         products,
                         setProducts,
                         showSidebar,
                         setShowSidebar,
                         selectedGender,
                         selectedCategory,
                         selectedType,
                         setSelectedGender,
                         setSelectedCategory,
                         setSelectedType
                     }) => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeSellers, setActiveSellers] = useState([]);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [resizeTimer, setResizeTimer] = useState(null);
    const [productsPerPage, setProductsPerPage] = useState(12);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        setShowSidebar(false);
        return () => {
            setShowSidebar(false);
        };
    }, [setShowSidebar]);

    useEffect(() => {
        if (windowWidth >= 1200) {
            setShowSidebar(false);
        }
    }, [windowWidth, setShowSidebar, location.pathname]);

    useEffect(() => {
        setSelectedGender(null);
        setSelectedCategory(null);
        setSelectedType(null);
    }, [location.pathname, setSelectedGender, setSelectedCategory, setSelectedType]);

    const fetchData = async () => {
        try {
            const productsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products?search=${searchKeyword}&gender=${selectedGender}&category=${selectedCategory}&type=${selectedType}`, { timeout: 10000 });
            const productsData = await productsResponse.json();
            setProducts(productsData);
            const filteredProductsData = filterProducts(productsData || [], activeSellers);
            setFilteredProducts(filteredProductsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const gender = params.get('gender');
        if (gender) {
            setSelectedGender(decodeURIComponent(gender));
        }
    }, [location.search]);

    useEffect(() => {
        window.scrollTo(0, 0);
        setCurrentPage(1);
    }, [searchKeyword, products]);

    useEffect(() => {
        fetchData();
    }, [searchKeyword, selectedGender, windowWidth, selectedCategory, selectedType]);

    useEffect(() => {
        fetchActiveSellers();
    }, []);

    useEffect(() => {
        if (products && products.length > 0 && activeSellers.length > 0) {
            setFilteredProducts(filterProducts(products, activeSellers));
        } else {
            fetchData();
        }
    }, [products, currentPage, activeSellers]);

    useEffect(() => {
        const handleResize = () => {
            clearTimeout(resizeTimer);
            setResizeTimer(
                setTimeout(() => {
                    setWindowWidth(window.innerWidth);
                }, 200)
            );
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [resizeTimer]);

    useEffect(() => {
        if (windowWidth >= 1340) {
            setProductsPerPage(18);
        } else if (windowWidth >= 1200) {
            setProductsPerPage(15);
        } else if (windowWidth < 960) {
            setProductsPerPage(12);
        } else if (windowWidth <= 900) {
            setProductsPerPage(8);
        } else {
            setProductsPerPage(12);
        }
    }, [windowWidth]);

    const fetchActiveSellers = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers`, { timeout: 10000 });
            const data = await response.json();
            const activeSellersData = data.filter(seller => seller.status !== 'suspend');
            setActiveSellers(activeSellersData);
        } catch (error) {
            console.error('Error fetching active sellers:', error);
        }
    };

    const filterProducts = (productsToFilter, activeSellersData) => {
        return productsToFilter
            .filter(product => !selectedGender || product.gender === selectedGender)
            .filter(product => !selectedCategory || product.category === selectedCategory)
            .filter(product => !selectedType || product.type === selectedType)
            .filter(product =>
                searchKeyword
                    ? product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.brand.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                    product.type.toLowerCase().includes(searchKeyword.toLowerCase())
                    : true
            )
            .filter(product => {
                const seller = activeSellersData.find(seller => seller.products.includes(product._id));
                return seller ? true : false;
            });
    };

    const handleAddToCart = (product) => {
        const itemInCart = cartItems.find(item => item.productId === product._id);
        if (itemInCart) {
            const updatedCart = cartItems.map(item =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([
                ...cartItems,
                {
                    productId: product._id,
                    image: product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg',
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    size: product.size,
                    color: product.color
                }
            ]);
        }
    };

    const handleBuyNow = (product) => {
        handleAddToCart(product);
        history.push('/cart');
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const startIndex = (currentPage - 1) * productsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

    const fixImagePath = (imagePath) => {
        return imagePath.replace('images/W/MEDIAX_792452-T2/', '');
    };

    return (
        <div className="product-list">
            {showSidebar && <Sidebar setProducts={setProducts} showSidebar={showSidebar} setShowSidebar={setShowSidebar} selectedOption={selectedCategory} />}
            {displayedProducts.length ? (
                displayedProducts.map(product => (
                    <div className="product-card" key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'} alt={product.name} />
                            <div className="details">
                                <div className="type">{product.type}</div>
                                <div className="brand-and-name">
                                    <div className="brand">{product.brand}</div>
                                    <div className="name">{product.name.length > 5 ? product.name.substring(0, 5) + '...' : product.name}</div>
                                </div>
                                <div className="price">KGS {product.price}</div>
                            </div>
                        </Link>
                        <div className="actions">
                            <button className="cart-button" title="Add to Cart" onClick={() => handleAddToCart(product)}>
                                <strong>+</strong>
                                <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <h2 className="no-products">Идёт загрузка...</h2>
            )}
            {displayedProducts.length > 0 && (
                <div className="pagination-container">
                    <div className="pagination">
                        <hr style={{ color: 'black' }} />
                        <button className="arrowL" onClick={handlePrevPage} disabled={currentPage === 1}>
                            <img className="arrowLImg" src={left} alt="Cart" />
                        </button>
                        <span className="numStr">{`Страница ${currentPage} из ${totalPages}`}</span>
                        <button className="arrowR" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <img className="arrowRImg" src={right} alt="Cart" />
                        </button>
                        <div className="product-list-plinth"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;


