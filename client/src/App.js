





// // src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import ProductList from './components/ProductList/ProductList';
// import './App.css';
// import ProductDetails from "./components/ProductDetails/ProductDetails";
// import LoginRegister from "./components/LoginRegister/LoginRegister";
// import Profile from "./components/Profile/Profile";
// import Cart from "./components/Cart/Cart";
//
// const App = () => {
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [cartItems, setCartItems] = useState([]);
//     const [products, setProducts] = useState([]); // Добавили новое состояние
//
//     const handleSearch = (keyword) => {
//         setSearchKeyword(keyword);
//     };
//
//     return (
//         <Router>
//             <div className="app">
//                 <Header onSearch={handleSearch} cartItems={cartItems} />
//                 <div className="main-content">
//                     <Sidebar setProducts={setProducts} />
//                     <Switch>
//                         <Route path="/products/:productId">
//                             <ProductDetails />
//                         </Route>
//                         <Route path="/login">
//                             <LoginRegister />
//                         </Route>
//                         <Route path="/profile">
//                             <Profile />
//                         </Route>
//                         <Route path="/cart">
//                             <Cart cartItems={cartItems} setCartItems={setCartItems} />
//                         </Route>
//                         <Route path="/">
//                             <ProductList
//                                 searchKeyword={searchKeyword}
//                                 cartItems={cartItems}
//                                 setCartItems={setCartItems}
//                                 setProducts={setProducts} // Передаем функцию setProducts
//                             />
//                         </Route>
//                     </Switch>
//                 </div>
//             </div>
//         </Router>
//     );
// };
//
// export default App;





// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import ProductList from './components/ProductList/ProductList';
// import './App.css';
// import ProductDetails from './components/ProductDetails/ProductDetails';
// import LoginRegister from './components/LoginRegister/LoginRegister';
// import Profile from './components/Profile/Profile';
// import Cart from './components/Cart/Cart';
//
// const App = () => {
//     const [searchKeyword, setSearchKeyword] = useState('');
//     const [cartItems, setCartItems] = useState([]);
//     const [products, setProducts] = useState([]);
//
//     const handleSearch = (keyword) => {
//         setSearchKeyword(keyword);
//     };
//
//
//
//
//     return (
//         <Router>
//             <div className="app">
//                 <Header onSearch={handleSearch} cartItems={cartItems} />
//                 <div className="main-content">
//                     <Sidebar setProducts={setProducts} />
//                     <Switch>
//                         <Route path="/products/:productId">
//                             <ProductDetails />
//                         </Route>
//                         <Route path="/login">
//                             <LoginRegister />
//                         </Route>
//                         <Route path="/profile">
//                             <Profile />
//                         </Route>
//                         <Route path="/cart">
//                             <Cart cartItems={cartItems} setCartItems={setCartItems} />
//                         </Route>
//                         <Route path="/">
//                             <ProductList
//                                 searchKeyword={searchKeyword}
//                                 cartItems={cartItems}
//                                 setCartItems={setCartItems}
//                                 products={products}
//
//                             />
//                         </Route>
//                     </Switch>
//                 </div>
//             </div>
//         </Router>
//     );
// };
//
// export default App;




import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './components/ProductList/ProductList';
import './App.css';
import ProductDetails from './components/ProductDetails/ProductDetails';
import LoginRegister from './components/LoginRegister/LoginRegister';
import Profile from './components/Profile/Profile';
import Cart from './components/Cart/Cart';

const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    return (
        <Router>
            <div className="app">
                <Header onSearch={handleSearch} cartItems={cartItems} />
                <div className="main-content">
                    {showSidebar && <Sidebar setProducts={setProducts} />}
                    <Switch>
                        <Route path="/products/:productId">
                            <ProductDetails  setShowSidebar={setShowSidebar} />
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
                        <Route path="/">
                            {/* Передаем showSidebar в компонент ProductList */}
                            <ProductList
                                searchKeyword={searchKeyword}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                products={products}
                                showSidebar={showSidebar}
                            />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;










