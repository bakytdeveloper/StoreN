



import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import './AdminPanel.css';
import {Link, useHistory} from "react-router-dom";

const AdminPanel = ({ setShowSidebar }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false); // Состояние для отслеживания видимости подтверждения удаления

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'admin') {
            history.push('/'); // Перенаправление на страницу входа, если нет токена или пользователь не администратор
        }
    }, [history]);



    const handleViewSellers = () => {
        history.push('/sellers');
    };


    const handleViewOrders = async () => {
        try {
            const token = localStorage.getItem('token');

            // Проверяем наличие токена
            if (!token) {
                history.push('/'); // Перенаправляем на страницу входа, если токен отсутствует
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/?page=1&perPage=20`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched orders:', data);
                // Перенаправляем на страницу заказов после успешного получения данных
                history.push('/orders/');
            } else {
                throw new Error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            // Обрабатываем ошибку запроса заказов
            // Можно добавить обработку ошибки и отображение сообщения об ошибке пользователю
        }
    };




    const handleViewClients = () => {
        history.push('/users/clients');
    };

    const handleHomeImages = () => {
        history.push('/homepage-images');
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleCreateProduct = () => {
        setSelectedProduct(null);
        setShowForm(true);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleDeleteProduct = (productId) => {
        setShowConfirmation(true); // Открыть сообщение о подтверждении удаления
        setSelectedProduct(productId); // Сохранить id продукта для удаления
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/products/${selectedProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
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
            setShowConfirmation(false); // Закрыть сообщение о подтверждении удаления
            setSelectedProduct(null); // Сбросить id продукта для удаления
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            let response;

            if (selectedProduct) {
                response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/products/${selectedProduct._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                response = await fetch(`${process.env.REACT_APP_API_URL}/api/admin/products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            }

            if (response.ok) {
                const data = await response.json();

                if (selectedProduct) {
                    setProducts((prevProducts) => prevProducts.map((product) => (product._id === data._id ? data : product)));
                } else {
                    setProducts((prevProducts) => [...prevProducts, data]);
                }

                setShowForm(false);
                setSelectedProduct(null);
            } else {
                console.error('Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    return (
        <div className="admin-panel">
            <h2>Админ панель</h2>
            <Link className="admin-panel-button-close" to="/" > &#10006;</Link>
            <div className="customerOrders">
                <button className="customerOrdersBtnOne" onClick={handleViewOrders}>Список заказов</button>
                <button className="customerOrdersBtnTwo" onClick={handleViewClients}>Список клиентов</button>
                <button className="customerOrdersBtnThree" onClick={handleViewSellers}>Список продавцов</button>
                <button className="customerOrdersBtnFour" onClick={handleHomeImages}>Управление главной страницей</button>
            </div>

            <div className="admin-product-list">
                {products.map((product, index) => (
                    <div key={product._id} className="admin-product-item">
                        <span>
                            <span style={{color: "darkolivegreen", fontSize: "15px", marginRight: "9px" }}>{index} )</span>
                            {product.type} - {product.name}
                        </span>

                        <button className="admin-btn" onClick={() => handleEditProduct(product)}>&#128736;</button>
                        <button className="admin-btn" onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>
                    </div>
                ))}
            </div>
            <button className="newProduct" onClick={handleCreateProduct}>&#9997; Создать продукт</button>

            {showForm && (
                <ProductForm
                    product={selectedProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                />
            )}

            {showConfirmation && (
                <div className="confirmation-modal">
                    <p>Вы уверены, что хотите удалить продукт?</p>
                    <div className="deleteYN">
                        <button className="deleteY" onClick={handleConfirmDelete}>Да</button>
                        <button className="deleteN" onClick={() => setShowConfirmation(false)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
