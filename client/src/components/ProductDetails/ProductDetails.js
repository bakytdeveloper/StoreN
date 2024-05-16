


import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams, useHistory } from 'react-router-dom';
import RelatedSellerProducts from "./RelatedSellerProducts";
import RelatedProducts from "./RelatedProducts";
import RelatedAccessories from "./RelatedAccessories";

// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(true);
//         // Clear the flag when the component is unmounted
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 const data = await response.json();
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 setSelectedImage(images[0]); // Set the first image as the main one
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };
//
//         fetchProductDetails();
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//
//
//
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     const handleClose = () => {
//         // history.push('/');
//         history.goBack(); // Go back to the previous page
//     };
//
//     const handleAddToCart = (buyNow = false) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
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
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//
//         if (buyNow) {
//             // Navigate to the cart after adding the item only if it's "Buy Now"
//             history.push('/cart');
//         }
//     };
//
//     return (
//         <div className="product-details-container">
//             <div className="product-details">
//                 <button className="closeButton" onClick={handleClose}>
//                     &#10006;
//                 </button>
//                 <div className="image-gallery">
//                     <div className="thumbnail-gallery">
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div className="type">{product.type}</div>
//                     <div className="brand">{product.brand}</div>
//                     <div className="name">{product.name}</div>
//                     <div className="description">
//                         <strong>Описание:</strong> {product.description}
//                     </div>
//                     <div className="characteristics">
//                         <h3>Характеристики:</h3>
//                         <ul>
//                             {product.characteristics.map((char) => (
//                                 <li className="character" key={char.name}>
//                                     <strong>{char.name}:</strong> {char.value}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="price">{product.price} KGS</div>
//                     <div className="actions">
//                         <button className="buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             {/* Вставляем компонент */}
//
//         </div>
//     );
// };
//
// export default ProductDetails;






// // !!!!!!!!!!!!
// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(true);
//         // Clear the flag when the component is unmounted
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 const data = await response.json();
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 setSelectedImage(images[0]); // Set the first image as the main one
//             } catch (error) {
//                 console.error('Ошибка при получении сведений о продукте:', error);
//             }
//         };
//
//         fetchProductDetails();
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     const handleClose = (event) => {
//         event.preventDefault(); // Prevent default behavior of the link
//         window.scrollTo({ top: 0 }); // Scroll to the top of the page
//         // history.push('/');
//         history.goBack(); // Go back to the previous page
//     };
//
//     const handleAddToCart = (buyNow = false) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
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
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//
//         if (buyNow) {
//             // Navigate to the cart after adding the item only if it's "Buy Now"
//             history.push('/cart');
//         }
//     };
//
//     return (
//         <div className="product-details-container">
//             <div className="product-details">
//                 <button className="closeButton" onClick={handleClose}>
//                     &#10006;
//                 </button>
//                 <div className="image-gallery">
//                     <div className="thumbnail-gallery">
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div className="typeDetails">{product.type}</div>
//                     <div className="brandDetails">{product.brand}</div>
//                     <div className="nameDetails">{product.name}</div>
//                     <hr />
//                     <div className="description">
//                         <strong>Описание:</strong> {product.description}
//                     </div>
//                     <div className="characteristics">
//                         <h3>Характеристики:</h3>
//                         <ul>
//                             {product.characteristics.map((char) => (
//                                 <li className="character" key={char.name}>
//                                     <strong>{char.name}:</strong> {char.value}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="price">{product.price} KGS</div>
//                     <div className="actions">
//                         <button className="buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             <RelatedAccessories direction={product.category} /> {/* Передаем направление текущего товара */}
//
//             {/* Вставляем компонент */}
//
//         </div>
//     );
// };
//
// export default ProductDetails;





import { Link } from 'react-router-dom';
import ProductTabs from "./ProductTabs/ProductTabs";



// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(true);
//         // Clear the flag when the component is unmounted
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 const data = await response.json();
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 setSelectedImage(images[0]); // Set the first image as the main one
//             } catch (error) {
//                 console.error('Ошибка при получении сведений о продукте:', error);
//             }
//         };
//
//         fetchProductDetails();
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     const handleClose = (event) => {
//         event.preventDefault(); // Prevent default behavior of the link
//         window.scrollTo({ top: 0 }); // Scroll to the top of the page
//         // history.push('/');
//         history.goBack(); // Go back to the previous page
//     };
//
//     const handleAddToCart = (buyNow = false) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
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
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//
//         if (buyNow) {
//             // Navigate to the cart after adding the item only if it's "Buy Now"
//             history.push('/cart');
//         }
//     };
//
// // &#10006;
//
//     return (
//         <div className="product-details-container">
//
//             <div className="product-details">
//                 <div className="block-product-details-close-button">
//                     <button className="product-details-close-button" onClick={handleClose}>
//                         ⟻ <span className="span-product-details-close-button">Назад</span>
//                     </button>
//                 </div>
//                 <div className="image-gallery">
//
//                     <div className="thumbnail-gallery">
//
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div className="type-details">{product.type}</div>
//                     <div className="brand-details">{product.brand}</div>
//                     <div className="name-details">{product.name}</div>
//
//
//
//                     <hr />
//                     <div className="description">
//                         <strong>Описание:</strong> {product.description}
//                     </div>
//                     <div className="characteristics">
//                         <h3>Характеристики:</h3>
//                         <ul>
//                             {product.characteristics.map((char) => (
//                                 <li className="character" key={char.name}>
//                                     <strong>{char.name}:</strong> {char.value}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="price">{product.price} KGS</div>
//                     <div className="actions">
//                         <button className="buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
//
//             {/* Вставляем компонент */}
//         <div className="plinth">
//             {/*<span style={{textAlign:"center", color:"black"}}>https://kiosk.kg</span>*/}
//         </div>
//         </div>
//     );
// };
//
// export default ProductDetails;







// // Создаем и экспортируем компонент ProductDetails
// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     // Используем хук useParams для получения параметра productId из URL
//     const { productId } = useParams();
//     // Используем useState для хранения данных о товаре и его изображениях
//     const [product, setProduct] = useState(null);
//     // Используем useState для хранения показанного изображения товара
//     const [selectedImage, setSelectedImage] = useState(null);
//     // Используем хук useHistory для навигации назад
//     const history = useHistory();
//
//     // Запускаем эффект при монтировании компонента
//     useEffect(() => {
//         // Устанавливаем флаг setShowSidebar в true
//         setShowSidebar(true);
//         // Очищаем флаг при размонтировании компонента
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     // Запускаем эффект при изменении productId
//     useEffect(() => {
//         // Функция для получения данных о товаре по его productId
//         const fetchProductDetails = async () => {
//             try {
//                 // Отправляем запрос на сервер для получения данных о товаре
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 // Получаем ответ от сервера в формате JSON
//                 const data = await response.json();
//                 // Проверяем, есть ли данные о товаре в ответе
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 // Извлекаем данные о товаре и его изображениях из ответа
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 // Обновляем состояние компонента данными о товаре и его изображениях
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 // Устанавливаем первое изображение товара как основное
//                 setSelectedImage(images[0]);
//             } catch (error) {
//                 console.error('Ошибка при получении сведений о продукте:', error);
//             }
//         };
//
//         // Вызываем функцию для получения данных о товаре
//         fetchProductDetails();
//     }, [productId]);
//
//     // Если данные о товаре еще загружаются, отображаем сообщение "Loading..."
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     // Функция для обработки клика по изображению товара
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     // Функция для закрытия деталей товара
//     const handleClose = (event) => {
//         event.preventDefault();
//         window.scrollTo({ top: 0 });
//         history.goBack();
//     };
//
//     // Функция для добавления товара в корзину
//     const handleAddToCart = (buyNow = false) => {
//         // Проверяем, есть ли товар уже в корзине
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
//         // Если товар уже есть в корзине, увеличиваем его количество
//         if (itemInCart) {
//             const updatedCart = cartItems.map((item) =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             // Если товара нет в корзине, добавляем его в корзину
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//
//         // Если buyNow равен true, переходим на страницу корзины
//         if (buyNow) {
//             history.push('/cart');
//         }
//     };
//
//     return (
//         <div className="product-details-container">
//             <div className="product-details">
//                 <div className="block-product-details-close-button">
//                     <button className="product-details-close-button" onClick={handleClose}>
//                         ⟻ <span className="span-product-details-close-button">Назад</span>
//                     </button>
//                 </div>
//                 <div className="image-gallery">
//                     <div className="thumbnail-gallery">
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div className="type-details">{product.type}</div>
//                     <div className="brand-details">{product.brand}</div>
//                     <div className="name-details">{product.name}</div>
//                     <hr />
//                     <div className="description">
//                         <strong>Описание:</strong> {product.description}
//                     </div>
//                     <div className="characteristics">
//                         <h3>Характеристики:</h3>
//                         <ul>
//                             {product.characteristics.map((char) => (
//                                 <li className="character" key={char.name}>
//                                     <strong>{char.name}:</strong> {char.value}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     {/* Добавляем раздел для отображения размеров товаров */}
//                     <div className="product-sizes">
//                         <h3>Размеры:</h3>
//                         <div className="size-list">
//                             {/* Мапим массив размеров и выводим их */}
//                             {product.sizes.map((size, index) => (
//                                 <div key={index} className="size" onClick={() => console.log(size)}>
//                                     <div className="size-icon">{size}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     {/* Добавляем раздел для отображения цветов товаров */}
//                     <div className="product-colors">
//                         <h3>Цвета:</h3>
//                         <div className="color-list">
//                             {/* Мапим массив цветов и выводим их */}
//                             {product.colors.map((color, index) => (
//                                 <div key={index} className="color-name-product" onClick={() => console.log(color)}>
//                                     <div className="color-box" style={{ backgroundColor: `${color.value}` }}></div>
//                                     <div className="color-name">{color.name}</div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="price">{product.price} KGS</div>
//                     <div className="actions">
//                         <button className="buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {/*/!* Добавляем раздел для отображения размеров товаров *!/*/}
//             {/*<div className="product-sizes">*/}
//             {/*    <h3>Размеры:</h3>*/}
//             {/*    <div className="size-list">*/}
//             {/*        /!* Мапим массив размеров и выводим их *!/*/}
//             {/*        {product.sizes.map((size, index) => (*/}
//             {/*            <div key={index} className="size" onClick={() => console.log(size)}>*/}
//             {/*                <div className="size-icon">{size}</div>*/}
//             {/*            </div>*/}
//             {/*        ))}*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//             {/*/!* Добавляем раздел для отображения цветов товаров *!/*/}
//             {/*<div className="product-colors">*/}
//             {/*    <h3>Цвета:</h3>*/}
//             {/*    <div className="color-list">*/}
//             {/*        /!* Мапим массив цветов и выводим их *!/*/}
//             {/*        {product.colors.map((color, index) => (*/}
//             {/*            <div key={index} className="color" onClick={() => console.log(color)}>*/}
//             {/*                <div className="color-box" style={{width:"33px", height:"30px", backgroundColor: `${color.value}` }}></div>*/}
//             {/*                <div className="color-name">{color.name}</div>*/}
//             {/*            </div>*/}
//             {/*        ))}*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//             {/* Добавляем компоненты */}
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
//             <div className="plinth"></div>
//         </div>
//     );
// };
//
// // Экспортируем компонент ProductDetails
// export default ProductDetails;



//
// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 const data = await response.json();
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 setSelectedImage(images[0]);
//             } catch (error) {
//                 console.error('Ошибка при получении сведений о продукте:', error);
//             }
//         };
//
//         fetchProductDetails();
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     const handleClose = (event) => {
//         event.preventDefault();
//         window.scrollTo({ top: 0 });
//         history.goBack();
//     };
//
//     const handleAddToCart = (buyNow = false) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
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
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//
//         if (buyNow) {
//             history.push('/cart');
//         }
//     };
//
//     return (
//         <div className="product-details-container">
//             <div className="product-details">
//                 <div className="block-product-details-close-button">
//                     <button className="product-details-close-button" onClick={handleClose}>
//                         ⟻ <span className="span-product-details-close-button">Назад</span>
//                     </button>
//                 </div>
//                 <div className="image-gallery">
//                     <div className="thumbnail-gallery">
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div className="type-details">{product.type}</div>
//                     <div className="brand-details">{product.brand}</div>
//                     <div className="name-details">{product.name}</div>
//                     <hr />
//                     <div className="description">
//                         <strong>Описание:</strong> {product.description}
//                     </div>
//                     <div className="product-sizes">
//                         <h3>Размеры: {selectedSize}</h3>
//                         <div className="size-list">
//                             {product.sizes.map((size, index) => (
//                                 <div
//                                     key={index}
//                                     className={selectedSize === size ? 'size selected' : 'size'}
//                                     onClick={() => setSelectedSize(size)}
//                                 >
//                                     {size}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="product-colors">
//                         <h3>Цвета: {selectedColor}</h3>
//                         <div className="color-list">
//                             {product.colors.map((color, index) => (
//                                 <div
//                                     key={index}
//                                     className={selectedColor === color.name ? 'color selected' : 'color'}
//                                     onClick={() => setSelectedColor(color.name)}
//                                 >
//                                     <div className="color-box" style={{ backgroundColor: color.value }}></div>
//                                     {/*<div className="color-name">{color.name}</div>*/}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="characteristics">
//                         <h3>Характеристики:</h3>
//                         <ul>
//                             {product.characteristics.map((char) => (
//                                 <li className="character" key={char.name}>
//                                     <strong>{char.name}:</strong> {char.value}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="price">{product.price} KGS</div>
//                     <div className="actions">
//                         <button className="buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             {/*<div className="product-sizes">*/}
//             {/*    <h3>Размеры: {selectedSize}</h3>*/}
//             {/*    <div className="size-list">*/}
//             {/*        {product.sizes.map((size, index) => (*/}
//             {/*            <div*/}
//             {/*                key={index}*/}
//             {/*                className={selectedSize === size ? 'size selected' : 'size'}*/}
//             {/*                onClick={() => setSelectedSize(size)}*/}
//             {/*            >*/}
//             {/*                {size}*/}
//             {/*            </div>*/}
//             {/*        ))}*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//             {/*<div className="product-colors">*/}
//             {/*    <h3>Цвета: {selectedColor}</h3>*/}
//             {/*    <div className="color-list">*/}
//             {/*        {product.colors.map((color, index) => (*/}
//             {/*            <div*/}
//             {/*                key={index}*/}
//             {/*                className={selectedColor === color.name ? 'color selected' : 'color'}*/}
//             {/*                onClick={() => setSelectedColor(color.name)}*/}
//             {/*            >*/}
//             {/*                <div className="color-box" style={{ backgroundColor: color.value }}></div>*/}
//             {/*                <div className="color-name">{color.name}</div>*/}
//             {/*            </div>*/}
//             {/*        ))}*/}
//             {/*    </div>*/}
//             {/*</div>*/}
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
//             <div className="plinth"></div>
//         </div>
//     );
// };
//
// export default ProductDetails;







// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 const data = await response.json();
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 setSelectedImage(images[0]);
//             } catch (error) {
//                 console.error('Ошибка при получении сведений о продукте:', error);
//             }
//         };
//
//         fetchProductDetails();
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     const handleClose = (event) => {
//         event.preventDefault();
//         window.scrollTo({ top: 0 });
//         history.goBack();
//     };
//
//     const handleAddToCart = (buyNow = false) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
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
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                 },
//             ]);
//         }
//
//         if (buyNow) {
//             history.push('/cart');
//         }
//     };
//
//     return (
//         <div className="product-details-container">
//             <div className="product-details">
//                 <div className="block-product-details-close-button">
//                     <button className="product-details-close-button" onClick={handleClose}>
//                         ⟻ <span className="span-product-details-close-button">Назад</span>
//                     </button>
//                 </div>
//                 <div className="image-gallery">
//                     <div className="thumbnail-gallery">
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div className="type-details">{product.type}</div>
//                     <div className="brand-details">{product.brand}</div>
//                     <div className="name-details">{product.name}</div>
//                     <hr />
//                     <div className="description">
//                         <strong>Описание:</strong> {product.description}
//                     </div>
//                     <div className="product-sizes">
//                         <h3>Размеры: {selectedSize}</h3>
//                         <div className="size-list">
//                             {product.sizes.map((size, index) => (
//                                 <div
//                                     key={index}
//                                     className={selectedSize === size ? 'size selected' : 'size'}
//                                     onClick={() => setSelectedSize(size)}
//                                 >
//                                     {size}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="product-colors">
//                         <h3>Цвета: {selectedColor}</h3>
//                         <div className="color-list">
//                             {product.colors.map((color, index) => (
//                                 <div
//                                     key={index}
//                                     className={selectedColor === color.name ? 'color selected' : 'color'}
//                                     onClick={() => setSelectedColor(color.name)}
//                                 >
//                                     <div className="color-box" style={{ backgroundColor: color.value }}></div>
//                                     {/*<div className="color-name">{color.name}</div>*/}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <div className="characteristics">
//                         <h3>Характеристики:</h3>
//                         <ul>
//                             {product.characteristics.map((char) => (
//                                 <li className="character" key={char.name}>
//                                     <strong>{char.name}:</strong> {char.value}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <div className="price">{product.price} KGS</div>
//                     <div className="actions">
//                         <button className="buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
//             <div className="plinth"></div>
//         </div>
//     );
// };
//
// export default ProductDetails;








const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        setSelectedSize(null); // Сбрасываем выбранный размер
        setSelectedColor(null); // Сбрасываем выбранный цвет
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
                const data = await response.json();
                if (!data.product) {
                    console.error('Product data is undefined or null');
                    return;
                }
                const productData = data.product;
                const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
                setProduct({
                    ...productData,
                    images: images
                });
                setSelectedImage(images[0]);
            } catch (error) {
                console.error('Ошибка при получении сведений о продукте:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0 });
        history.goBack();
    };

    const handleAddToCart = (buyNow = false) => {
        const itemInCart = cartItems.find((item) => item.productId === product._id);

        if (itemInCart) {
            const updatedCart = cartItems.map((item) =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([
                ...cartItems,
                {
                    productId: product._id,
                    image: product.images[0],
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    size: selectedSize, // Добавляем выбранный размер
                    color: selectedColor, // Добавляем выбранный цвет

                },
            ]);
        }

        if (buyNow) {
            history.push('/cart');
        }
    };

    const truncatedDescription = product.description.slice(0, 100) + (product.description.length > 100 ? "..." : "");

    return (
        <div className="product-details-container">
            <div className="product-details">
                <div className="block-product-details-close-button">
                    <button className="product-details-close-button" onClick={handleClose}>
                        ⟻ <span className="span-product-details-close-button">Назад</span>
                    </button>
                </div>
                <div className="image-gallery">
                    <div className="thumbnail-gallery">
                        {product.images.map((image) => (
                            <img
                                key={image}
                                src={image}
                                alt={product.name}
                                className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                    <img src={selectedImage} alt={product.name} className="main-image" />
                </div>
                <div className="details">
                    <div  className="details-names" >
                        <div className="details-names-all">
                            <div className="type-details">{product.type}</div>
                            <div className="brand-details">{product.brand}</div>
                            <div className="name-details">{product.name}</div>
                        </div>

                        <div className="price-details">KGS {product.price}</div>

                    </div>
                    <hr style={{width:"100%", height:"1px", border:"1px solid darkgrey" ,
                        background:"#ffffff"}} />
                    <div className="description">
                        <strong>Описание:</strong> {truncatedDescription}
                    </div>
                    {/*<div className="price">KGS {product.price}</div>*/}

                    {/*<div className="product-sizes">*/}
                    {/*    <h3>Размеры: {selectedSize}</h3>*/}
                    {/*    <div className="size-list">*/}
                    {/*        {product.sizes.map((size, index) => (*/}
                    {/*            <div*/}
                    {/*                key={index}*/}
                    {/*                className={selectedSize === size ? 'size selected-size' : 'size'}*/}
                    {/*                onClick={() => setSelectedSize(size)}*/}
                    {/*            >*/}
                    {/*                {size}*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="product-colors">*/}
                    {/*    <h3>Цвета: {selectedColor}</h3>*/}
                    {/*    <div className="color-list">*/}
                    {/*        {product.colors.map((color, index) => (*/}
                    {/*            <div*/}
                    {/*                key={index}*/}
                    {/*                className={selectedColor === color.name ? 'color selected-color' : 'color'}*/}
                    {/*                onClick={() => setSelectedColor(color.name)}*/}
                    {/*            >*/}
                    {/*                <div className="color-box" style={{ backgroundColor: color.value }}></div>*/}
                    {/*                /!*<div className="color-name">{color.name}</div>*!/*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    <div className="product-sizes">
                        {product.sizes.length > 0 && (
                            <>
                                <h3>Размеры: {selectedSize}</h3>
                                <div className="size-list">
                                    {product.sizes.map((size, index) => (
                                        <div
                                            key={index}
                                            className={selectedSize === size ? 'size selected-size' : 'size'}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="product-colors">
                        {product.colors.length > 0 && (
                            <>
                                <h3>Цвета: {selectedColor}</h3>
                                <div className="color-list">
                                    {product.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className={selectedColor === color.name ? 'color selected-color' : 'color'}
                                            onClick={() => setSelectedColor(color.name)}
                                        >
                                            <div className="color-box" style={{ backgroundColor: color.value }}></div>
                                            {/*<div className="color-name">{color.name}</div>*/}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="actions">
                        <button className="buy-now" onClick={() => handleAddToCart(true)}>
                            Купить сейчас
                        </button>
                        <button className="add-to-cart" onClick={() => handleAddToCart()}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
            <ProductTabs description={product.description} characteristics={product.characteristics} />

            <RelatedSellerProducts productId={productId} />
            <RelatedProducts productId={productId} />
            {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
            <div className="plinth"></div>
        </div>
    );
};

export default ProductDetails;