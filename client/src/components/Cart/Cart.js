
// // src/components/Cart/Cart.js
//
// import React, { useState, useEffect } from 'react';
// import './Cart.css';
// import { useHistory } from 'react-router-dom';
//
// const Cart = ({ cartItems, setCartItems, setShowSidebar }) => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(false);
//         // Очищаем флаг при размонтировании компонента
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     // Функция для изменения количества товара в корзине
//     const handleQuantityChange = (productId, newQuantity) => {
//         const updatedCart = cartItems.map((item) => {
//             if (item.productId === productId) {
//                 return { ...item, quantity: newQuantity };
//             }
//             return item;
//         });
//         setCartItems(updatedCart);
//     };
//
//     // Функция для удаления товара из корзины
//     const handleRemoveItem = (productId) => {
//         const updatedCart = cartItems.filter((item) => item.productId !== productId);
//         setCartItems(updatedCart);
//         if (updatedCart.length === 0) {
//             history.push('/products'); // Замените на нужный URL вашей страницы с товарами
//         }
//     };
//
//     // Функция для расчета общей стоимости товаров в корзине
//     useEffect(() => {
//         const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         setTotalPrice(total);
//         if (cartItems.length === 0) {
//             history.push('/products'); // Замените на нужный URL вашей страницы с товарами
//         }
//     }, [cartItems, history]);
//
//     const handleBackToShopping = () => {
//         history.push('/products'); // Замените на нужный URL вашей страницы с товарами
//     };
//
//     return (
//         <div className="cart">
//             <h2>Корзина</h2>
//             {cartItems.length === 0 ? (
//                 <p>Your cart is empty</p>
//             ) : (
//                 <div>
//                     {cartItems.map((item) => (
//                         <div className="cart-item" key={item.productId}>
//                             <div className="item-info">
//                                 <img src={item.image} alt={item.name} />
//                                 <div className="item-details">
//                                     <div style={{ fontWeight: 'bold' }}>{item.type}</div>
//                                     <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.brand}</div>
//                                     <div>{item.name}</div>
//                                     <div>
//                                         <span>KGS</span> {item.price}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="item-quantity">
//                                 <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
//                                 <input
//                                     type="number"
//                                     value={item.quantity}
//                                     onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//                                 />
//                                 <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
//                                 <div>
//                                     <div> Сумма: </div>
//                                     <span>{(item.price * item.quantity).toFixed(2)}</span>
//                                 </div>
//                                 <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
//                             </div>
//                         </div>
//                     ))}
//                     <div className="cart-summary">
//                         <div>
//                             <span>Общая сумма: </span>
//                             <span>{totalPrice.toFixed(2)}</span>
//                         </div>
//                         <button>Order</button>
//                         <button onClick={() => setCartItems([])}>Clear Cart</button>
//                         <button onClick={handleBackToShopping}>Back to Shopping</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Cart;






// src/components/Cart/Cart.js

import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useHistory } from 'react-router-dom';

import CheckoutForm from '../Checkout/CheckoutForm';

const Cart = ({ cartItems, setCartItems, setShowSidebar }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [user, setUser] = useState(null);

    const history = useHistory();


    useEffect(() => {
        setShowSidebar(false);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCart = cartItems.map((item) => {
            if (item.productId === productId) {
                const validQuantity = Math.max(newQuantity, 0);
                return { ...item, quantity: validQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.productId !== productId);
        setCartItems(updatedCart);
        if (updatedCart.length === 0) {
            history.push('/');
        }
    };

    const handleBackToShopping = () => {
        history.push('/');
    };

    const handleCheckout = () => {
        setShowCheckout(true);
    };

    // const handlePlaceOrder = async (userData) => {
    //     try {
    //         const response = await fetch('http://localhost:5502/api/orders', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 user: null, // Здесь вы можете добавить логику для передачи пользователя, если он зарегистрирован
    //                 guestInfo: {
    //                     name: `${userData.firstName}`,
    //                     email: userData.email,
    //                     address: userData.address,
    //                     phoneNumber: userData.phoneNumber,
    //                 },
    //                 products: cartItems.map((item) => ({ product: item.productId, quantity: item.quantity })),
    //                 totalAmount: totalPrice,
    //                 paymentMethod: userData.paymentMethod,
    //                 comments: userData.comments,
    //             }),
    //         });
    //
    //         if (response.ok) {
    //             const data = await response.json();
    //             console.log('Order placed successfully:', data);
    //
    //             // Очистите корзину после успешного заказа
    //             setCartItems([]);
    //             history.push('/products');
    //         } else {
    //             console.error('Failed to place order');
    //         }
    //     } catch (error) {
    //         console.error('Error placing order:', error);
    //     }
    // };



    const handlePlaceOrder = async (userData) => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:5502/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: token ? userData : null,
                    guestInfo: token ? undefined : {
                        name: userData.firstName,
                        email: userData.email,
                        // address: userData.address,
                        // phoneNumber: userData.phoneNumber,
                        // password: userData.password,  // Добавьте пароль для гостя
                    },
                    address: userData.address,
                    phoneNumber: userData.phoneNumber,
                    products: cartItems.map((item) => ({ product: item.productId, quantity: item.quantity })),
                    totalAmount: totalPrice,
                    paymentMethod: userData.paymentMethod,
                    comments: userData.comments,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Order placed successfully:', data);

                // Очистите корзину после успешного заказа
                setCartItems([]);
                history.push('/');
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };





    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
        if (cartItems.length === 0) {
            history.push('/');
        }
    }, [cartItems, history]);



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch('http://localhost:5502/api/users/profile', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUser(data);
                    } else {
                        console.error(data.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);


    // Обновление состояния showSidebar на странице логина и регистрации
    useEffect(() => {
        setShowSidebar(true);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(false); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);


    return (
        <div className="cart">
            <span className="closeCart"  onClick={handleBackToShopping}>
                &#10006; {/* Это символ крестика (✖) */}
            </span>
            <h2>Корзина</h2>
            {cartItems.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div className="cart-item" key={item.productId}>
                            <div className="item-info" >
                                <img className="cartImg" src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <div style={{ fontWeight: 'bold' }}>{item.type}</div>
                                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.brand}</div>
                                    <div>{item.name}</div>
                                    <div>
                                        <span>KGS</span> {item.price}
                                    </div>
                                </div>
                            </div>
                            <div className="item-quantity">
                                <button className="btnMinus" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
                                <input
                                    type="number"
                                    style={{marginTop:"8px"}}
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                />
                                <button  className="btnPlus"  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
                                <div className="allSum">
                                    <div style={{fontWeight:"bold"}}> Сумма: </div>
                                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                {/*<button style={{background:"orangered"}} onClick={() => handleRemoveItem(item.productId)}>Удалить</button>*/}
                                <button className="deleteOne"  onClick={() => handleRemoveItem(item.productId)}>
                                    &#10006;
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="cart-summary">
                        <div>
                            <span>Общая сумма: </span>
                            <span>{totalPrice.toFixed(2)}</span>
                        </div>
                       <div style={{display: "flex"}}>
                           <button className="checkCart" onClick={handleCheckout}>Оформить заказ</button>
                           <button className="clearCart" onClick={() => setCartItems([])}>Очистить корзину</button>
                           {/*<button onClick={handleBackToShopping}>Вернуться к покупкам</button>*/}
                       </div>
                    </div>
                </div>
            )}

            {showCheckout && (
                <CheckoutForm onSubmit={handlePlaceOrder}  user={user}  />
            )}
        </div>
    );
};

export default Cart;
