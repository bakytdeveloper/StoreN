

// src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import './AdminPanel.css';
import {useHistory} from "react-router-dom";


const AdminPanel = ({setShowSidebar}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const history = useHistory();



    const handleViewOrders = () => {
        history.push('/orders/orders');
    };

    const handleViewClients = () => {
        history.push('/users/clients'); // Изменим путь для перехода к списку клиентов
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/products');
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

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5500/api/admin/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    const handleFormSubmit = async (formData) => {
        try {
            let response;

            if (selectedProduct) {
                response = await fetch(`http://localhost:5500/api/admin/products/${selectedProduct._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
            } else {
                response = await fetch('http://localhost:5500/api/admin/products', {
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


    // Обновление состояния showSidebar на странице логина и регистрации
    useEffect(() => {
        setShowSidebar(true);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(false); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);

    return (
        <div className="admin-panel">
            <h2>Админ панель</h2>
            <div className="customerOrders">
                <button className="customerOrdersBtnOne" onClick={handleViewOrders}>Список заказов</button>
                <button className="customerOrdersBtnTwo" onClick={handleViewClients}>Список клиентов</button>
            </div>


            <div className="admin-product-list">
                {products.map((product, index) => (
                    <div key={product._id} className="admin-product-item">
                        <span>
                            <span style={{color:"darkolivegreen", fontSize:"15px", marginRight:"9px"}}>{index} )</span>
                            {product.type} - {product.name}
                        </span>

                        <button className="admin-btn" onClick={() => handleEditProduct(product)}>&#128736;</button>
                        {/*<button className="admin-btn" onClick={() => handleEditProduct(product)}>Edit</button>*/}
                        <button className="admin-btn" onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>
                        {/*<button className="admin-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>*/}
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


        </div>
    );
};

export default AdminPanel;


