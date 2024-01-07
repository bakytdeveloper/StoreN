// src/components/Sidebar/Sidebar.js

import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/products/categories');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="sidebar">
            <h2>Товары</h2>
            <ul>
                {categories.map((category) => (
                    <li key={category}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;





