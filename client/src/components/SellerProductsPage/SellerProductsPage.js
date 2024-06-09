



import React, { useState, useEffect } from 'react';
import ProductForm from './../AdminPanel/ProductForm';
import './../AdminPanel/AdminPanel.css';
import {Link, useHistory} from "react-router-dom";
import bas from './../ProductList/basket.png';
import './SellerProductsPage.css'


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
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере

    const history = useHistory();

    // Проверка, аутентифицирован ли пользователь
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            // Если отсутствует токен или роль не является "seller", перенаправляем на страницу входа
            history.push('/login');
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
                setProducts(prevProducts => prevProducts.filter(product => product._id !== selectedProduct));
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



    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };


    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    const handleGoBack = () => {
        history.goBack();
    };

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
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

            <div className="products-list my-products  seller-products-page-products-list">
                {products.map((product) => (
                    <div className="product-card product-card-seller" key={product._id}>
                        <div className="sellerEditDelete">
                            <button className="admin-btn-edit" style={{background: "none"}} onClick={() => handleEditProduct(product)}>&#128736;</button>
                            <button className="admin-btn-delete" style={{background: "none"}}  onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>

                        </div>

                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details details-seller-products-page">
                                <div className="type">{product.type}</div>
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}</div>

                                {/*<div className="name">{product.name}</div>*/}
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
                            {/*<button*/}
                            {/*    className="buy-button"*/}
                            {/*    title="Buy Now"*/}
                            {/*>*/}
                            {/*    Заказать*/}
                            {/*</button>*/}
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



