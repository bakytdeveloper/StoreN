

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './components/ProductList/ProductList';
import './App.css';
import ProductDetails from './components/ProductDetails/ProductDetails';
import LoginRegister from './components/LoginRegister/LoginRegister';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import OrderList from "./components/AdminPanel/OrderList";
import ClientListPage from './components/AdminPanel/ClientListPage'; // Добавляем новый компонент
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as PropTypes from "prop-types";
import SellerRegistrationForm from "./components/Header/SellerRegistrationForm";
import SellerListPage from "./components/AdminPanel/SellerListPage";
import SellerProfile from "./components/SellerProfile/SellerProfile";
import SellerProductsPage from "./components/SellerProductsPage/SellerProductsPage";
import ProductForm from "./components/AdminPanel/ProductForm";
import SalesHistory from "./components/SalesHistory/SalesHistory";
import OrderDetailsPage from "./components/OrderDetailsPage/OrderDetailsPage";
import Home from "./components/Home/Home";


const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    // const [showSidebar, setShowSidebar] = useState(true);
    const [showHeader, setShowHeader] = useState(true); // Добавлено состояние для отображения или скрытия шапки
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // добавляем состояние currentPage и функцию setCurrentPage
    const [orders, setOrders] = useState([]);

    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    // Проверяем, есть ли токен в localStorage при загрузке приложения
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Если токен найден, устанавливаем его в состояние
            setToken(token);
        }
    }, []);






    // Функция для установки токена и сохранения его в localStorage
    const setToken = (token) => {
        localStorage.setItem('token', token);
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const resetFilter = () => {
        setSearchKeyword('');
        setProducts([]);
    };


    return (
        <Router>
            <div className="app">
                {showHeader && (
                    <Header
                        onSearch={handleSearch}
                        cartItems={cartItems}
                        setShowSidebar={setShowSidebar}
                        showSidebar={showSidebar}
                        resetFilter={resetFilter} // Передача функции для сброса фильтров
                        setSelectedOption={setSelectedOption}
                        setCurrentPage={setCurrentPage} // передаем setCurrentPage в Header

                    />
                )}

                {/*<button onClick={toggleSidebar}>Toggle Sidebar</button>*/}

                <Sidebar
                    setProducts={setProducts}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    selectedOption={selectedOption}

                    // setProducts={setProducts}
                    // showSidebar={showSidebar}
                    // setShowSidebar={setShowSidebar}
                    // selectedOption={selectedCategory}
                    selectedGender={selectedGender}
                    selectedCategory={selectedCategory}
                    selectedType={selectedType}
                    setSelectedGender={setSelectedGender}
                    setSelectedCategory={setSelectedCategory}
                    setSelectedType={setSelectedType}
                />
                <Switch>


                    <Route path="/" exact>
                        <Home
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>


                    <Route path="/catalog">
                        <ProductList
                            searchKeyword={searchKeyword}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            products={products}
                            showSidebar={showSidebar}
                            setProducts={setProducts}
                            setShowSidebar={setShowSidebar}


                            selectedGender={selectedGender}
                            selectedCategory={selectedCategory}
                            selectedType={selectedType}
                            setSelectedGender={setSelectedGender}
                            setSelectedCategory={setSelectedCategory}
                            setSelectedType={setSelectedType}
                        />
                    </Route>

                    <Route path="/sellers/register">
                        <SellerRegistrationForm  />
                    </Route>
                    <Route path="/sellers">
                        <SellerListPage />
                    </Route>

                    <Route path="/seller/products">
                        <SellerProductsPage />
                    </Route>

                    <Route path="/sellers-products">
                        <ProductForm />
                    </Route>


                    <Route path="/product-form/:productId">
                        <ProductForm/>
                    </Route>


                    <Route path="/sellerProfile">
                        <SellerProfile
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>

                    <Route path="/seller/sales-history">
                        <SalesHistory  />
                    </Route>

                    <Route path="/products/:productId">
                        <ProductDetails
                            setShowSidebar={setShowSidebar}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                        />
                    </Route>
                    <Route path="/login">
                        <LoginRegister
                            showHeader={showHeader} // Передаем состояние showHeader в компонент LoginRegister
                            setShowHeader={setShowHeader} // Передаем функцию для изменения состояния showHeader
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>
                    <Route path="/profile">
                        <Profile
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>
                    <Route path="/cart">
                        <Cart
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>
                    <Route path="/orders/">
                        <OrderList
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>

                    <Route path="/order/:orderId">
                        <OrderDetailsPage
                            orders={orders}
                            setOrders={setOrders}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>

                    <Route path="/admin">
                        <AdminPanel
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>
                    <Route path="/users/clients">
                        <ClientListPage
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                        />
                    </Route>

                </Switch>
            </div>
            <ToastContainer />
        </Router>
    );
};

export default App;


