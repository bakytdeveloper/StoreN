// src/App.js

import React, {useState} from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import ProductList from "./components/ProductList/ProductList";

const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');


    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    return (
        <div className="app">
            <Header onSearch={handleSearch}  />
            <div className="main-content">
                <Sidebar />
                <ProductList searchKeyword={searchKeyword} />

                {/* Добавьте другие компоненты и контент здесь */}
            </div>
        </div>
    );
};

export default App;
