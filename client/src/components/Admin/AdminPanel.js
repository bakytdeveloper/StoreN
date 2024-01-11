// src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
// import './AdminPanel.css'; // Создайте стили по вашему желанию
import ProductForm from './ProductForm'; // Создайте компонент для формы продукта

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleDeleteProduct = async (productId) => {
        try {
            await fetch(`http://localhost:5500/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <ProductForm
                selectedProduct={selectedProduct}
                setProducts={setProducts}
                setSelectedProduct={setSelectedProduct}
            />
            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="details">
                            <div className="type">{product.type}</div>
                            <div className="brand">{product.brand}</div>
                            <div className="name">{product.name}</div>
                            <div className="price">
                                <span>KGS</span> {product.price}
                            </div>
                        </div>
                        <div className="actions">
                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
