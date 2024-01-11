// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';

const ProductForm = ({ selectedProduct, setProducts, setSelectedProduct }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        type: '',
        brand: '',
        characteristics: [],
        images: [],
    });

    useEffect(() => {
        if (selectedProduct) {
            setFormData(selectedProduct);
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                type: '',
                brand: '',
                characteristics: [],
                images: [],
            });
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = selectedProduct
            ? `http://localhost:5500/api/products/${selectedProduct._id}`
            : 'http://localhost:5500/api/products';

        const method = selectedProduct ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                if (selectedProduct) {
                    // Update existing product
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product._id === selectedProduct._id ? data : product
                        )
                    );
                } else {
                    // Add new product
                    setProducts((prevProducts) => [...prevProducts, data]);
                }

                setSelectedProduct(null);
            } else {
                console.error('Response error:', response);
                console.error('Data error:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{selectedProduct ? 'Edit Product' : 'Add Product'}</h3>
            {/* Add input fields and form controls for product details */}
            <button type="submit">{selectedProduct ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default ProductForm;
