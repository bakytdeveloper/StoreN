



import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
                <Header onSearch={handleSearch} cartItems={cartItems} />
                <div className="main-content">
                    {/*{showSidebar && <Sidebar setProducts={setProducts} />}*/}

                    <Route exact path="/">
                        {showSidebar && <Sidebar setProducts={setProducts} />}
                    </Route>

                    <Switch>

                        <Route path="/products/:productId">
                            <ProductDetails
                                // setShowSidebar={setShowSidebar}
                                             setShowSidebar={() => {}} // Передаем заглушку для setShowSidebar
                                             cartItems={cartItems}
                                             setCartItems={setCartItems}/>
                        </Route>
                        <Route path="/login">
                            <LoginRegister />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/cart">
                            {/* При переходе на страницу корзины скрываем сайтбар */}
                            <Cart
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                setShowSidebar={setShowSidebar}
                            />
                        </Route>

                        <Route path="/orders/orders">
                            <OrderList />
                        </Route>

                        <Route path="/admin">
                            <AdminPanel /> {/* Добавлен маршрут для администраторской панели */}
                        </Route>

                        <Route path="/users/clients"> {/* Добавлен новый маршрут */}
                            <ClientListPage />
                        </Route>

                        <Route path="/">
                            {/* Передаем showSidebar в компонент ProductList */}
                            <ProductList
                                searchKeyword={searchKeyword}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                products={products}
                                showSidebar={showSidebar}
                                setProducts={setProducts} // Передаем функцию setProducts

                            />
                        </Route>
                    </Switch>
                </div>
            </div>
            <ToastContainer />

        </Router>
);
};

export default App;










