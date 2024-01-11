
// src/components/AdminPanel/AdminPanel.js
import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Fetch products from the server
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

    const handleCreateProduct = async () => {
        // Implement logic for creating a new product
        console.log('Create product logic');
    };

    const handleEditProduct = async () => {
        // Implement logic for editing the selected product
        console.log('Edit product logic');
    };

    const handleDeleteProduct = async () => {
        // Implement logic for deleting the selected product
        console.log('Delete product logic');
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <div className="admin-product-list">
                {products.map((product) => (
                    <div key={product._id} className="admin-product-item">
                        <span>{product.name}</span>
                        <button className="admin-btn" onClick={() => handleEditProduct(product)}>Edit</button>
                        <button className="admin-btn" onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <button onClick={handleCreateProduct}>Create Product</button>
        </div>
    );
};

export default AdminPanel;

