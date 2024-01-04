// src/App.js

import React from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import ProductList from "./components/ProductList/ProductList";

const App = () => {
    // const handleCategorySelect = (category) => {
    //     // Обработка выбора категории, например, загрузка товаров этой категории
    //     console.log(`Selected category: ${category}`);
    // };

    return (
        <div className="app">
            <Header />
            <div className="main-content">
                <Sidebar />
                <ProductList />

                {/* Добавьте другие компоненты и контент здесь */}
            </div>
        </div>
    );
};

export default App;
