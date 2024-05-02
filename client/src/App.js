

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


    const [orders, setOrders] = useState([]);

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


    const onUpdateQuantity = async (orderId, productId, newQuantity) => {
        // Отправить запрос на обновление количества товара в заказе
        console.log("onUpdate_orderId:",orderId)
        console.log("onUpdate_productId:",productId)
        console.log("onUpdate_newQuantity:",newQuantity)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-quantity/${orderId}/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity }),
            });
            if (response.ok) {
                // Обновить список заказов
                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        const updatedProducts = order.products.map((item) => {
                            if (item.product._id === productId) {
                                return { ...item, quantity: newQuantity };
                            }
                            return item;
                        });
                        return { ...order, products: updatedProducts };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            } else {
                console.error('Failed to update quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const onDeleteItem = async (orderId, productId) => {
        // Отправить запрос на удаление товара из заказа
        console.log("orderId:",orderId)
        console.log("productId:",productId)
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/delete-item/${orderId}/${productId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Обновить список заказов
                const updatedOrders = orders.map((order) => {
                    if (order._id === orderId) {
                        const updatedProducts = order.products.filter((item) => item.product._id !== productId);
                        return { ...order, products: updatedProducts };
                    }
                    return order;
                });
                setOrders(updatedOrders);
            } else {
                console.error('Failed to delete item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
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
                            onUpdateQuantity={onUpdateQuantity}
                            onDeleteItem={onDeleteItem}
                            orders={orders} />
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


