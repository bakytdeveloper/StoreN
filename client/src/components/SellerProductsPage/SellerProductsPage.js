



import React, { useState, useEffect } from 'react';
import ProductForm from './../AdminPanel/ProductForm';
import './../AdminPanel/AdminPanel.css';
import {Link, useHistory} from "react-router-dom";
import bas from './../ProductList/basket.png';
import './SellerProductsPage.css'

// const SellerProductsPage = () => {
//     // const [sellerProducts, setSellerProducts] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [showConfirmation, setShowConfirmation] = useState(false); // Состояние для отслеживания видимости подтверждения удаления
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         type: '',
//         brand: '',
//         characteristics: [],
//         images: [],
//         quantity: 10
//     });
//     const history = useHistory();
//
//     // Проверка, аутентифицирован ли пользователь
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             history.push('/login'); // Перенаправление на страницу входа, если нет токена
//         }
//     }, [history]);
//
//
//     const handleViewSellers = () => {
//         history.push('/sellers');
//     };
//
//     const handleViewOrders = () => {
//         history.push('/orders/orders');
//     };
//
//     const handleViewClients = () => {
//         history.push('/users/clients');
//     };
//
//     useEffect(() => {
//         const fetchSellerProducts = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProducts(data);
//                 } else {
//                     console.error('Error fetching seller products:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching seller products:', error);
//             }
//         };
//
//         fetchSellerProducts();
//     }, []);
//
//     const handleCreateProduct = () => {
//         setSelectedProduct(null);
//         setShowForm(true);
//     };
//
//     const handleEditProduct = (product) => {
//         setSelectedProduct(product);
//         setShowForm(true);
//     };
//
//     const handleDeleteProduct = async (productId) => {
//         setShowConfirmation(true);
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${productId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//
//             if (response.ok) {
//                 setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
//             } else {
//                 console.error('Failed to delete product');
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         } finally {
//             setShowConfirmation(false);
//         }
//     };
//
//
//     const handleConfirmDelete = async () => {
//         try {
//
//             // Получение токена доступа из localStorage
//             const token = localStorage.getItem('token');
//
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}` // Включение токена доступа в заголовке запроса
//
//                 },
//             });
//
//             if (response.ok) {
//                 setProducts((prevProducts) => prevProducts.filter((product) => product._id !== selectedProduct));
//             } else {
//                 console.error('Failed to delete product');
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         } finally {
//             setShowConfirmation(false); // Закрыть сообщение о подтверждении удаления
//             setSelectedProduct(null); // Сбросить id продукта для удаления
//         }
//     };
//
//
//     const handleGoBack = () => {
//         history.goBack(); // Переход на предыдущую страницу
//     };
//
//
//
//     // const handleFormSubmit = async (formData) => {
//     //     try {
//     //         let response;
//     //
//     //         // Получение токена доступа из localStorage
//     //         const token = localStorage.getItem('token');
//     //
//     //         // Проверяем, существует ли выбранный продукт (для обновления) или нет (для создания нового)
//     //         if (selectedProduct) {
//     //             // Если выбран существующий продукт, отправляем PUT-запрос для обновления его данных
//     //             response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct._id}`, {
//     //                 method: 'PUT',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                     'Authorization': `Bearer ${token}` // Включение токена доступа в заголовке запроса
//     //                 },
//     //                 body: JSON.stringify(formData),
//     //             });
//     //         } else {
//     //             // Если продукт не выбран (новый продукт), отправляем POST-запрос для создания нового продукта
//     //             response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                     'Authorization': `Bearer ${token}` // Включение токена доступа в заголовке запроса
//     //                 },
//     //                 body: JSON.stringify(formData),
//     //             });
//     //         }
//     //         if (response.ok) {
//     //             // Если ответ успешен, очищаем значения полей формы
//     //             clearFormFields();
//     //
//     //             // Получаем данные о продукте из ответа
//     //             const data = await response.json();
//     //
//     //             // Обновляем состояние списка продуктов, чтобы отобразить новый продукт
//     //             setProducts((prevProducts) => [...prevProducts, data]);
//     //         } else {
//     //             // Если ответ сервера не успешен, выводим сообщение об ошибке в консоль
//     //             console.error('Failed to save product');
//     //         }
//     //     } catch (error) {
//     //         // Если произошла ошибка при выполнении запроса или парсинге данных, выводим сообщение об ошибке в консоль
//     //         console.error('Error saving product:', error);
//     //     }
//     // };
//
//
//     const handleFormSubmit = async (formData) => {
//         try {
//             let response;
//
//             // Получение токена доступа из localStorage
//             const token = localStorage.getItem('token');
//
//             // Проверяем, существует ли выбранный продукт (для обновления) или нет (для создания нового)
//             if (selectedProduct) {
//                 // Если выбран существующий продукт, отправляем PUT-запрос для обновления его данных
//                 response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct._id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}` // Включение токена доступа в заголовке запроса
//                     },
//                     body: JSON.stringify(formData),
//                 });
//             } else {
//                 // Если продукт не выбран (новый продукт), отправляем POST-запрос для создания нового продукта
//                 response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}` // Включение токена доступа в заголовке запроса
//                     },
//                     body: JSON.stringify(formData),
//                 });
//             }
//             // Проверяем успешность ответа от сервера
//             if (response.ok) {
//                 clearFormFields();
//                 const updatedProduct = await response.json();
//                 setProducts((prevProducts) => prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
//                 setShowForm(false);
//                 setSelectedProduct(null);
//             } else {
//                 // Если ответ сервера не успешен, выводим сообщение об ошибке в консоль
//                 console.error('Failed to save product');
//             }
//         } catch (error) {
//             // Если произошла ошибка при выполнении запроса или парсинге данных, выводим сообщение об ошибке в консоль
//             console.error('Error saving product:', error);
//         }
//     };
//
//
//
//     // Функция для очистки значений полей формы
//     const clearFormFields = () => {
//         setFormData({
//             name: '',
//             description: '',
//             price: '',
//             category: '',
//             type: '',
//             brand: '',
//             characteristics: [],
//             images: [],
//             quantity: 10
//         });
//     };
//
//
//     const handleFormCancel = () => {
//         setShowForm(false);
//         setSelectedProduct(null);
//     };
//
//     // useEffect(() => {
//     //     setShowSidebar(true);
//     //     return () => {
//     //         setShowSidebar(true);
//     //     };
//     // }, [setShowSidebar]);
//
//
//     // Функция для исправления пути к изображениям
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", ""); // Удаление лишней части пути к изображениям
//     };
//
//
//     return (
//         // <div>
//         <div className="seller-panel">
//             {/*<h2>Админ панель</h2>*/}
//             {/*<div className="customerOrders">*/}
//             {/*    <button className="customerOrdersBtnOne" onClick={handleViewOrders}>Список заказов</button>*/}
//             {/*    <button className="customerOrdersBtnTwo" onClick={handleViewClients}>Список клиентов</button>*/}
//             {/*    <button className="customerOrdersBtnThree" onClick={handleViewSellers}>Список продавцов</button>*/}
//             {/*</div>*/}
//
//             <button className="newProduct" onClick={handleCreateProduct}>&#9997; Создать продукт</button>
//             <h1>Мои товары</h1>
//             <button style={{fontSize:"25px", fontWeight:"bold", padding:"0"}} onClick={handleGoBack}>
//                 Назад к профилю
//             </button>
//
//             {/*<div className="admin-product-list">*/}
//             {/*    {products.map((product, index) => (*/}
//                     <div  className="product-list">
//
//
//                         {/*<div>*/}
//                         {/*<div className="product-list">*/}
//
//
//                             {/* Здесь отображаем информацию о товарах */}
//                             {products.map((product) => (
//                                 <div className="product-card" key={product._id}>
//                                     <button className="admin-btn" style={{background: "none"}} onClick={() => handleEditProduct(product)}>&#128736;</button>
//                                     <button className="admin-btn" style={{background: "none"}}  onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>
//
//                                     <Link to={`/products/${product._id}`}>
//                                         <img
//                                             src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                             alt={product.name}
//                                         />
//                                         <div className="details">
//                                             <div className="type">{product.type}</div>
//                                             <div className="brand">{product.brand}</div>
//                                             <div className="name">{product.name}</div>
//                                             <div className="price">
//                                                 <span>KGS</span> {product.price}
//                                             </div>
//                                         </div>
//                                     </Link>
//                                     <div className="actions">
//                                         <button
//                                             className="cart-button"
//                                             title="Add to Cart"
//                                             // onClick={() => handleAddToCart(product)}
//                                         >
//                                             <strong>+</strong>
//                                             <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                                         </button>
//                                         <button
//                                             className="buy-button"
//                                             title="Buy Now"
//                                             // onClick={() => handleBuyNow(product)}
//                                         >
//                                             Заказать
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//
//                         {/*<span>*/}
//                         {/*    <span style={{color: "darkolivegreen", fontSize: "15px", marginRight: "9px" }}>{index} )</span>*/}
//                         {/*    {product.type} - {product.name}*/}
//                         {/*</span>*/}
//
//                         {/*<button className="admin-btn" onClick={() => handleEditProduct(product)}>&#128736;</button>*/}
//                         {/*<button className="admin-btn" onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>*/}
//                     {/*</div>*/}
//             {/*    ))}*/}
//             {/*</div>*/}
//             {/*<button className="newProduct" onClick={handleCreateProduct}>&#9997; Создать продукт</button>*/}
//
//             {showForm && (
//                 <ProductForm
//                     product={selectedProduct}
//                     onSubmit={handleFormSubmit}
//                     onCancel={handleFormCancel}
//                 />
//             )}
//
//             {showConfirmation && (
//                 <div className="confirmation-modal">
//                     <p>Вы уверены, что хотите удалить продукт?</p>
//                     <div className="deleteYN">
//                         <button className="deleteY" onClick={handleConfirmDelete}>Да</button>
//                         <button className="deleteN" onClick={() => setShowConfirmation(false)}>Отмена</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default SellerProductsPage;







// const SellerProductsPage = () => {
//     const [products, setProducts] = useState([]);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [showForm, setShowForm] = useState(false);
//     const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Состояние для отслеживания видимости модального окна подтверждения удаления
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         type: '',
//         brand: '',
//         characteristics: [],
//         images: [],
//         quantity: 10
//     });
//     const history = useHistory();
//
//     // Проверка, аутентифицирован ли пользователь
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             history.push('/login'); // Перенаправление на страницу входа, если нет токена
//         }
//     }, [history]);
//
//     useEffect(() => {
//         const fetchSellerProducts = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProducts(data);
//                 } else {
//                     console.error('Error fetching seller products:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching seller products:', error);
//             }
//         };
//
//         fetchSellerProducts();
//     }, []);
//
//     const handleCreateProduct = () => {
//         setSelectedProduct(null);
//         setShowForm(true);
//     };
//
//     const handleEditProduct = (product) => {
//         setSelectedProduct(product);
//         setShowForm(true);
//     };
//
//     const handleDeleteProduct = (productId) => {
//         setSelectedProduct(productId); // Сохраняем id продукта для удаления
//         setShowConfirmationModal(true); // Показываем модальное окно подтверждения удаления
//         document.body.classList.add('modal_open'); // Добавляем класс для блокировки скролла
//     };
//
//     const handleConfirmDelete = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//
//             if (response.ok) {
//                 setProducts((prevProducts) => prevProducts.filter((product) => product._id !== selectedProduct));
//             } else {
//                 console.error('Failed to delete product');
//             }
//         } catch (error) {
//             console.error('Error deleting product:', error);
//         } finally {
//             setShowConfirmationModal(false); // Закрыть модальное окно подтверждения удаления
//             setSelectedProduct(null); // Сбросить id продукта для удаления
//             document.body.classList.remove('modal_open'); // Убираем класс для разблокировки скролла
//         }
//     };
//
//     const handleFormSubmit = async (formData) => {
//         try {
//             let response;
//             const token = localStorage.getItem('token');
//             if (selectedProduct) {
//                 response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct._id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(formData),
//                 });
//             } else {
//                 response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     },
//                     body: JSON.stringify(formData),
//                 });
//             }
//             if (response.ok) {
//                 clearFormFields();
//                 const updatedProduct = await response.json();
//                 setProducts((prevProducts) => prevProducts.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
//                 setShowForm(false);
//                 setSelectedProduct(null);
//             } else {
//                 console.error('Failed to save product');
//             }
//         } catch (error) {
//             console.error('Error saving product:', error);
//         }
//     };
//
//     const handleFormCancel = () => {
//         setShowForm(false);
//         setSelectedProduct(null);
//     };
//
//     const clearFormFields = () => {
//         setFormData({
//             name: '',
//             description: '',
//             price: '',
//             category: '',
//             type: '',
//             brand: '',
//             characteristics: [],
//             images: [],
//             quantity: 10
//         });
//     };
//
//     const fixImagePath = (imagePath) => {
//         return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
//     };
//
//     const handleGoBack = () => {
//         history.goBack();
//     };
//
//     return (
//         <div className="seller-panel">
//             <button className="newProduct" onClick={handleCreateProduct}>&#9997; Создать продукт</button>
//             <h1>Мои товары</h1>
//             <button style={{fontSize:"25px", fontWeight:"bold", padding:"0"}} onClick={handleGoBack}>
//                 Назад к профилю
//             </button>
//
//             <div className="product-list">
//                 {products.map((product) => (
//                     <div className="product-card" key={product._id}>
//                         <button className="admin-btn" style={{background: "none"}} onClick={() => handleEditProduct(product)}>&#128736;</button>
//                         <button className="admin-btn" style={{background: "none"}}  onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>
//
//                         <Link to={`/products/${product._id}`}>
//                             <img
//                                 src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
//                                 alt={product.name}
//                             />
//                             <div className="details">
//                                 <div className="type">{product.type}</div>
//                                 <div className="brand">{product.brand}</div>
//                                 <div className="name">{product.name}</div>
//                                 <div className="price">
//                                     <span>KGS</span> {product.price}
//                                 </div>
//                             </div>
//                         </Link>
//                         <div className="actions">
//                             <button
//                                 className="cart-button"
//                                 title="Add to Cart"
//                             >
//                                 <strong>+</strong>
//                                 <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
//                             </button>
//                             <button
//                                 className="buy-button"
//                                 title="Buy Now"
//                             >
//                                 Заказать
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//
//             {showForm && (
//                 <ProductForm
//                     product={selectedProduct}
//                     onSubmit={handleFormSubmit}
//                     onCancel={handleFormCancel}
//                 />
//             )}
//
//             {showConfirmationModal && (
//                 <div className="modal-background">
//                     <div className="confirmation-modal">
//                         <p>Вы уверены, что хотите удалить продукт?</p>
//                         <div className="deleteYN">
//                             <button className="deleteY" onClick={handleConfirmDelete}>Да</button>
//                             <button className="deleteN" onClick={() => setShowConfirmationModal(false)}>Отмена</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default SellerProductsPage;

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Состояние для отслеживания видимости модального окна подтверждения удаления
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        type: '',
        brand: '',
        characteristics: [],
        images: [],
        // quantity: 10
    });
    const history = useHistory();

    // Проверка, аутентифицирован ли пользователь
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.push('/login'); // Перенаправление на страницу входа, если нет токена
        }
    }, [history]);

    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error('Error fetching seller products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching seller products:', error);
            }
        };

        fetchSellerProducts();
    }, []);

    const handleCreateProduct = () => {
        history.push('/sellers-products');
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        history.push(`/product-form/${product._id}`, { product });
    };

    const handleDeleteProduct = (productId) => {
        setSelectedProduct(productId); // Сохраняем id продукта для удаления
        setShowConfirmationModal(true); // Показываем модальное окно подтверждения удаления
        document.body.classList.add('modal_open'); // Добавляем класс для блокировки скролла
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== selectedProduct));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setShowConfirmationModal(false); // Закрыть модальное окно подтверждения удаления
            setSelectedProduct(null); // Сбросить id продукта для удаления
            document.body.classList.remove('modal_open'); // Убираем класс для разблокировки скролла
        }
    };

    // const handleFormSubmit = async (formData) => {
    //     try {
    //         let response;
    //         const token = localStorage.getItem('token');
    //
    //         // Проверяем, создается ли новый товар
    //         if (!selectedProduct) {
    //             // Проверяем, есть ли уже товар с таким же названием и брендом
    //             const existingProduct = products.find(
    //                 (product) =>
    //                     product.name === formData.name && product.brand === formData.brand
    //             );
    //
    //             if (existingProduct) {
    //                 // Если товар уже существует, показываем оповещение и выходим из функции
    //                 toast.error('Такой товар уже существует');
    //                 return;
    //             }
    //         }
    //
    //         if (selectedProduct) {
    //             response = await fetch(
    //                 `${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct._id}`,
    //                 {
    //                     method: 'PUT',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(formData),
    //                 }
    //             );
    //         } else {
    //             response = await fetch(
    //                 `${process.env.REACT_APP_API_URL}/api/sellers/products`,
    //                 {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(formData),
    //                 }
    //             );
    //         }
    //         if (response.ok) {
    //             clearFormFields();
    //             const updatedProduct = await response.json();
    //             setProducts((prevProducts) =>
    //                 prevProducts.map((product) =>
    //                     product._id === updatedProduct._id ? updatedProduct : product
    //                 )
    //             );
    //             setShowForm(false);
    //             setSelectedProduct(null);
    //
    //             // Проверка на успешное создание товара и показ оповещения
    //             if (selectedProduct) {
    //                 toast.success('Товар успешно обновлен!');
    //             } else {
    //                 toast.success('Товар успешно создан!');
    //             }
    //         } else {
    //             console.error('Failed to save product');
    //         }
    //     } catch (error) {
    //         console.error('Error saving product:', error);
    //     }
    // };




    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };

    // const clearFormFields = () => {
    //     setFormData({
    //         name: '',
    //         description: '',
    //         price: '',
    //         category: '',
    //         type: '',
    //         brand: '',
    //         characteristics: [],
    //         images: [],
    //         quantity: 10
    //     });
    // };

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    const handleGoBack = () => {
        history.goBack();
    };

    return (
        <div className="seller-panel">
            <h1>Мои товары</h1>
            <div className='sellerButtons'>
                <button className="openProfile"  onClick={handleGoBack}>
                    Назад к профилю
                </button>
                <button className="newProduct" onClick={handleCreateProduct}> Создать продукт</button>
                {/*<button className="newProduct" onClick={handleCreateProduct}>&#9997; Создать продукт</button>*/}

            </div>


            <div>
                <ToastContainer /> {/* Добавляем контейнер для оповещений */}
                {/* Остальной код компонента */}
            </div>

            <div className="products-list">
                {products.map((product) => (
                    <div className="product-cards" key={product._id}>
                        <div className="sellerEditDelete">
                            <button className="admin-btn-edit" style={{background: "none"}} onClick={() => handleEditProduct(product)}>&#128736;</button>
                            <button className="admin-btn-delete" style={{background: "none"}}  onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>

                        </div>

                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details">
                                <div className="type">{product.type}</div>
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.name}</div>
                                <div className="price">
                                    <span>KGS</span> {product.price}
                                </div>
                            </div>
                        </Link>
                        <div className="actions">
                            <button
                                className="cart-button"
                                title="Add to Cart"
                            >
                                <strong>+</strong>
                                <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                            </button>
                            <button
                                className="buy-button"
                                title="Buy Now"
                            >
                                Заказать
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/*{showForm && (*/}
            {/*    <ProductForm*/}
            {/*        product={selectedProduct}*/}
            {/*        onSubmit={handleFormSubmit}*/}
            {/*        onCancel={handleFormCancel}*/}
            {/*    />*/}
            {/*)}*/}

            {showConfirmationModal && (
                <div className="modal-background">
                    <div className="confirmation-modal">
                        <p>Вы уверены, что хотите удалить продукт?</p>
                        <div className="deleteYN">
                            <button className="deleteY" onClick={handleConfirmDelete}>Да</button>
                            <button className="deleteN" onClick={() => setShowConfirmationModal(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerProductsPage;