// // src/App.js
//
// import React, {useState} from 'react';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import './App.css';
// import ProductList from "./components/ProductList/ProductList";
//
// const App = () => {
//     const [searchKeyword, setSearchKeyword] = useState('');
//
//
//     const handleSearch = (keyword) => {
//         setSearchKeyword(keyword);
//     };
//
//     return (
//         <div className="app">
//             <Header onSearch={handleSearch}  />
//             <div className="main-content">
//                 <Sidebar />
//                 <ProductList searchKeyword={searchKeyword} />
//
//                 {/* Добавьте другие компоненты и контент здесь */}
//             </div>
//         </div>
//     );
// };
//
// export default App;




// src/App.js// src/App.js

// // src/App.js
//
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from './components/Header/Header';
// import Sidebar from './components/Sidebar/Sidebar';
// import ProductList from './components/ProductList/ProductList';
// import './App.css';
// import ProductDetails from "./components/ProductDetails/ProductDetails";
//
// const App = () => {
//     const [searchKeyword, setSearchKeyword] = useState('');
//
//     const handleSearch = (keyword) => {
//         setSearchKeyword(keyword);
//     };
//
//     return (
//         <Router>
//             <div className="app">
//                 <Header onSearch={handleSearch} />
//                 <div className="main-content">
//                     <Sidebar />
//                     <Switch>
//                         <Route path="/products/:productId">
//                             <ProductDetails />
//                         </Route>
//                         <Route path="/">
//                             <ProductList searchKeyword={searchKeyword} />
//                         </Route>
//                     </Switch>
//                 </div>
//             </div>
//         </Router>
//     );
// };
//
// export default App;






// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import ProductList from './components/ProductList/ProductList';
import './App.css';
import ProductDetails from "./components/ProductDetails/ProductDetails";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";

// const App = () => {
//     const [searchKeyword, setSearchKeyword] = useState('');
//
//     const handleSearch = (keyword) => {
//         setSearchKeyword(keyword);
//     };
//
//     return (
//         <Router>
//             <div className="app">
//                 <Header onSearch={handleSearch} />
//                 <div className="main-content">
//                     <Sidebar />
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
//                             <Cart />
//                         </Route>
//                         <Route path="/">
//                             <ProductList searchKeyword={searchKeyword} />
//                         </Route>
//                     </Switch>
//                 </div>
//             </div>
//         </Router>
//     );
// };
//
// export default App;






const App = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [cartItems, setCartItems] = useState([]);

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    return (
        <Router>
            <div className="app">
                <Header onSearch={handleSearch} cartItems={cartItems} />
                <div className="main-content">
                    <Sidebar />
                    <Switch>
                        <Route path="/products/:productId">
                            <ProductDetails />
                        </Route>
                        <Route path="/login">
                            <LoginRegister />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/cart">
                            <Cart cartItems={cartItems} />
                        </Route>
                        <Route path="/">
                            <ProductList searchKeyword={searchKeyword} cartItems={cartItems} setCartItems={setCartItems} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;