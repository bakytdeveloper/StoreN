

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

const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showHeader, setShowHeader] = useState(true); // Добавлено состояние для отображения или скрытия шапки

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

    return (
        <Router>
            <div className="app">
                {showHeader && (
                    <Header
                        onSearch={handleSearch}
                        cartItems={cartItems}
                        setShowSidebar={setShowSidebar}
                        showSidebar={showSidebar}
                    />
                )}
                <Sidebar
                    setProducts={setProducts}
                    showSidebar={showSidebar}
                    setShowSidebar={setShowSidebar}
                />
                <Switch>
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
                        />
                    </Route>
                </Switch>
            </div>
            <ToastContainer />
        </Router>
    );
};

export default App;


