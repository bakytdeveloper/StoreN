

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
import SellerRegistrationForm from "./components/Header/SellerRegistrationForm/SellerRegistrationForm";
import SellerListPage from "./components/AdminPanel/SellerListPage";
import SellerProfile from "./components/SellerProfile/SellerProfile";
import SellerProductsPage from "./components/SellerProductsPage/SellerProductsPage";
import ProductForm from "./components/AdminPanel/ProductForm";
import SalesHistory from "./components/SalesHistory/SalesHistory";
import OrderDetailsPage from "./components/OrderDetailsPage/OrderDetailsPage";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ContactInfo from "./components/ContactInfo/ContactInfo";
import LoadingSpinner from "./components/LoadingSpinner";
import PurchaseBuyHistory from "./components/SellerProfile/PurchaseBuyHistory";
import AdminHomepage from "./components/AdminPanel/AdminHomepage/AdminHomepage";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";


const App = () => {
    const pathname = useLocation().pathname;
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showHeader, setShowHeader] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [orders, setOrders] = useState([]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Состояние для загрузки
    const [activeComponent, setActiveComponent] = useState(null); // Состояние для активного компонента
    const [isFooterCatalog, setIsFooterCatalog] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    }, []);

    const setToken = (token) => {
        localStorage.setItem('token', token);
    };

    useEffect(() => {
        const fetchOrders = async (token) => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setOrders(data);
                setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
            } catch (error) {
                console.error('Fetch error:', error);
                setIsLoading(false); // Устанавливаем isLoading в false даже при ошибке
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

    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Router>
            <div className="app">
                {isLoading && <LoadingSpinner />}
                {!isLoading && (
                    <>
                        {showHeader && (
                            <Header
                                onSearch={handleSearch}
                                cartItems={cartItems}
                                setShowSidebar={setShowSidebar}
                                showSidebar={showSidebar}
                                resetFilter={resetFilter}
                                setSelectedOption={setSelectedOption}
                                setCurrentPage={setCurrentPage}
                                setIsFooterCatalog={setIsFooterCatalog}
                                setSearchTerm={setSearchTerm}
                                searchTerm={searchTerm}
                            />
                        )}
                        <div className="content">
                            <Sidebar
                                setProducts={setProducts}
                                showSidebar={showSidebar}
                                setShowSidebar={setShowSidebar}
                                selectedOption={selectedOption}
                                selectedGender={selectedGender}
                                selectedCategory={selectedCategory}
                                selectedType={selectedType}
                                setSelectedGender={setSelectedGender}
                                setSelectedCategory={setSelectedCategory}
                                setSelectedType={setSelectedType}
                                setSearchTerm={setSearchTerm}

                                onSearch={handleSearch}
                            />
                        <Switch>
                            <Route path="/" exact>
                                <Home
                                    setIsFooterCatalog={setIsFooterCatalog}
                                    setShowSidebar={setShowSidebar}
                                    setSelectedGender={setSelectedGender}
                                    setSelectedCategory={setSelectedCategory}
                                    setSelectedType={setSelectedType}
                                    setSearchTerm={setSearchTerm}

                                    setCartItems={setCartItems}
                                />
                            </Route>

                            {!isLoading && (
                            <Route path="/catalog" exact>
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
                                    isFooterCatalog={isFooterCatalog}
                                    setSearchTerm={setSearchTerm}
                                    searchTerm={searchTerm}
                                    onSearch={handleSearch}

                                />
                            </Route>
                            )}
                            <Route path="/sellers/register">
                                <SellerRegistrationForm
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                />
                            </Route>
                            <Route path="/sellers">
                                <SellerListPage
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                />
                            </Route>
                            <Route path="/seller/products">
                                <SellerProductsPage
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                />
                            </Route>
                            <Route path="/sellers-products">
                                <ProductForm
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                />
                            </Route>

                            <Route path="/favorites">
                                <FavoritesPage
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                    cartItems={cartItems}
                                    setCartItems={setCartItems}
                                />
                            </Route>
                            <Route path="/product-form/:productId">
                                <ProductForm
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                />
                            </Route>
                            <Route path="/sellerProfile">
                                <SellerProfile setShowSidebar={setShowSidebar} />
                            </Route>
                            <Route path="/seller/sales-history">
                                <SalesHistory
                                    showSidebar={showSidebar}
                                    setShowSidebar={setShowSidebar}
                                />
                            </Route>

                            <Route path="/seller/purchase-history">
                                <PurchaseBuyHistory
                                    showSidebar={showSidebar}
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
                                    showHeader={showHeader}
                                    setShowHeader={setShowHeader}
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
                                    setActiveComponent={setActiveComponent} // Передача setActiveComponent

                                />
                            </Route>
                            <Route path="/orders">
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

                            <Route path="/homepage-images">
                                <AdminHomepage
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
                        <Footer
                            cartItems={cartItems}
                            showSidebar={showSidebar}
                            setShowSidebar={setShowSidebar}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            resetFilter={resetFilter}
                            setCurrentPage={setCurrentPage}
                            setActiveComponent={setActiveComponent}
                            activeComponent={activeComponent}
                            setIsFooterCatalog={setIsFooterCatalog}
                        />
                        <ContactInfo />
                    </>
                )}
            </div>
            <ToastContainer style={{zIndex:"999999"}} />
        </Router>
    );
};

export default App;