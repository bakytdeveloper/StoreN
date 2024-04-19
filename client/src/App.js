

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



const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showHeader, setShowHeader] = useState(true); // Добавлено состояние для отображения или скрытия шапки
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // добавляем состояние currentPage и функцию setCurrentPage

    useEffect(() => {
        const handleBeforeUnload = () => {
            // Очистка localStorage
            localStorage.clear();
        };

        // Добавление обработчика события перед выходом со страницы
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Удаление обработчика события при размонтировании компонента
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const resetFilter = () => {
        setSearchKeyword(''); // Сброс ключевого слова для поиска
        setProducts([]); // Очистка списка продуктов
        // Можно добавить другие действия по сбросу фильтров, если необходимо
        // setShowSidebar(true); // Сбрасываем состояние сайтбара
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


                <Sidebar
                    setProducts={setProducts}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                    selectedOption={selectedOption}
                />
                <Switch>

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



                    <Route path="/sellerProfile">
                        <SellerProfile
                            setShowSidebar={setShowSidebar}
                        />
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
                    <Route path="/orders/orders">
                        <OrderList
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
                    <Route path="/">
                        <ProductList
                            searchKeyword={searchKeyword}
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                            products={products}
                            showSidebar={showSidebar}
                            setProducts={setProducts}
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


