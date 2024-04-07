


// import React, { useEffect, useState } from 'react';
// import './Cart.css';
// import { useHistory } from 'react-router-dom';
// import PaymentForm from '../Payment/PaymentForm';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import CartSummary from './CartSummary';
//
// const Cart = ({ cartItems, setCartItems, setShowSidebar }) => {
//     const [totalPrice, setTotalPrice] = useState(0);
//     const [showPayment, setShowPayment] = useState(false);
//     const [user, setUser] = useState(null);
//     const [showCheckout, setShowCheckout] = useState(false);
//     const [section, setSection] = useState(1);
//     const [section1Filled, setSection1Filled] = useState(false);
//     const [section2Filled, setSection2Filled] = useState(false);
//     const [firstName, setFirstName] = useState('');
//     const [email, setEmail] = useState('');
//     const [address, setAddress] = useState('');
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [comments, setComments] = useState('');
//     const [userName, setUserName] = useState(''); // Состояние для хранения имени пользователя или гостя
//     const [deliveryOption, setDeliveryOption] = useState(''); // Состояние для выбора опции доставки
//
//     const history = useHistory();
//
//     const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
//
//     const handleBackToShopping = () => {
//         history.push('/');
//     };
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     const response = await fetch(`${apiUrl}/api/users/profile`, {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//                     if (response.ok) {
//                         setUser(data);
//                         // Автоматическое заполнение полей имени и email, если пользователь зарегистрирован и залогинен
//                         setFirstName(data.name);
//                         setEmail(data.email);
//                     } else {
//                         console.error(data.message);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching user:', error);
//             }
//         };
//
//         fetchUser();
//     }, [apiUrl]);
//
//     const handleCheckout = () => {
//         setShowCheckout(true);
//         setSection(2);
//     };
//
//     const handlePayment = () => {
//         setShowPayment(true);
//         setSection(3);
//     };
//
//     const handleQuantityChange = (productId, newQuantity) => {
//         const updatedCart = cartItems.map((item) => {
//             if (item.productId === productId) {
//                 const validQuantity = Math.max(newQuantity, 0);
//                 return { ...item, quantity: validQuantity };
//             }
//             return item;
//         });
//         setCartItems(updatedCart);
//         const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         setTotalPrice(total);
//     };
//
//     const handleRemoveItem = (productId) => {
//         const updatedCart = cartItems.filter((item) => item.productId !== productId);
//         setCartItems(updatedCart);
//         if (updatedCart.length === 0) {
//             history.push('/');
//         }
//     };
//
//     const handleContinue = () => {
//         if (section === 1) {
//             setSection1Filled(true);
//             setSection(2);
//         } else if (section === 2) {
//             if (firstName.trim() !== '' && address.trim() !== '' && phoneNumber.trim() !== '') {
//                 setSection2Filled(true);
//                 setUserName(firstName.name);
//                 setSection(3);
//             } else {
//                 toast.error('Пожалуйста, заполните все обязательные поля (Имя, Адрес, Номер телефона)');
//             }
//         }
//     };
//
//     const handlePlaceOrder = async () => {
//         try {
//             if (firstName.trim() === '' || address.trim() === '' || phoneNumber.trim() === '') {
//                 toast.error('Пожалуйста, заполните все обязательные поля (Имя, Адрес, Номер телефона)');
//                 return;
//             }
//
//             const token = localStorage.getItem('token');
//
//             const response = await fetch(`${apiUrl}/api/orders`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     user: token ? { firstName, email } : null,
//                     guestInfo: token ? undefined : { firstName, email },
//                     address,
//                     phoneNumber,
//                     products: cartItems.map((item) => ({ product: item.productId, quantity: item.quantity })),
//                     totalAmount: totalPrice,
//                     paymentMethod,
//                     comments,
//                     userName: userName || 'Гость',
//                 }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 console.log('Order placed successfully:', data);
//
//                 setCartItems([]);
//                 history.push('/');
//                 toast.success('Ваш заказ принят. Спасибо за покупку');
//             } else {
//                 console.error('Failed to place order');
//             }
//         } catch (error) {
//             console.error('Error placing order:', error);
//         }
//     };
//
//     useEffect(() => {
//         const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         setTotalPrice(total);
//         if (cartItems.length === 0) {
//             history.push('/');
//         }
//     }, [cartItems, history]);
//
//     return (
//         <div className="cartAll">
//             <div className="cart">
//                 <span className="closeCart" onClick={handleBackToShopping}>
//                     &#10006;
//                 </span>
//                 <h2>Корзина</h2>
//                 <hr />
//                 <div>
//                     <h3>Подтвердите заказ</h3>
//                     {section === 1 && (
//                         <>
//                             {cartItems.length === 0 ? (
//                                 <p>Ваша корзина пуста</p>
//                             ) : (
//                                 <div className="AllCartInfo">
//                                     {cartItems.map((item) => (
//                                         <div className="cart-item" key={item.productId}>
//                                             <div className="item-info">
//                                                 <img className="cartImg" src={item.image} alt={item.name} />
//                                                 <div className="item-details">
//                                                     <span className="itemName" style={{ fontWeight: 'bold' }}>{item.type}</span>
//                                                     <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.brand}</span>
//                                                     <span>{item.name}</span>
//                                                     <div className="sumKg">
//                                                         <span>KGS</span> {item.price}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="item-quantity">
//                                                 <div className="allSum">
//                                                     <div className="sumOne" style={{ fontWeight: "bold" }}> Сумма:
//                                                         <span>{(item.price * item.quantity).toFixed(2)}</span>
//                                                     </div>
//                                                 </div>
//                                                 <button className="btnMinus" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
//                                                     -
//                                                 </button>
//                                                 <input
//                                                     type="number"
//                                                     style={{ marginTop: "8px" }}
//                                                     value={item.quantity}
//                                                     onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
//                                                 />
//                                                 <button className="btnPlus" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
//                                                     +
//                                                 </button>
//                                                 <button className="deleteOne" onClick={() => handleRemoveItem(item.productId)}>
//                                                     &#10006;
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </>
//                     )}
//                     {section !== 1 && (
//                         <button className="updateSection" onClick={() => setSection(1)}>Изменить</button>
//                     )}
//                     <hr />
//                 </div>
//
//                 <div>
//                     <h3>Оформите заказ</h3>
//                     {section === 2 && (
//                         <>
//                             <div className="checkForm">
//                                 <h2>Оформите заказ</h2>
//                                 <div style={{ fontSize: "10px", fontWeight: "bold" }}>Обязательные поля для заполнения - "<span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>"</div>
//                                 <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Имя:</label>
//                                 <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                                 <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Email:</label>
//                                 <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                 <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>  Адрес доставки:</label>
//                                 <div>
//                                     <input type="radio" name="deliveryOption" value="pickup" onChange={() => { setAddress('г.Бишкек ,  Универмаг ЦУМ, 0 этаж, бутик sotochka.kg'); setDeliveryOption('pickup'); }} /> Самовывоз<br />
//                                     <input type="radio" name="deliveryOption" value="delivery" onChange={() => { setAddress(''); setDeliveryOption('delivery'); }} /> Доставка<br />
//                                 </div>
//                                 {deliveryOption === 'delivery' && (
//                                     <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
//                                 )}
//                                 <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Номер телефона:</label>
//                                 <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//                                 <label> Способ оплаты:</label>
//                                 <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
//                                 <label>Комментарии:</label>
//                                 <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
//                             </div>
//                         </>
//                     )}
//                     {section !== 2 && section > 1 && (
//                         <button className="updateSection" onClick={() => setSection(2)}>Изменить</button>
//                     )}
//                     <hr />
//
//                 </div>
//
//                 <div>
//                     <h3>Оплатите заказ</h3>
//                     {section === 3 && (
//                         <>
//                             <PaymentForm />
//                         </>
//                     )}
//                     <hr />
//                 </div>
//             </div>
//
//             <div className="section-indicator">
//                 {[1, '*', 2, '*', 3].map((item, index) => (
//                     <span key={index} className={typeof item === 'number' && section === item ? 'active' : ''}>
//                         {typeof item === 'number' ? item : ' * * * * * '}
//                         {section1Filled && item === 1 }
//                         {section2Filled && item === 2 }
//                         {/*{section1Filled && item === 1 && ' \u2714'}*/}
//                         {/*{section2Filled && item === 2 && ' \u2714'}*/}
//                     </span>
//                 ))}
//
//                 <button className="buy_next"
//                         onClick={section === 3 ? handlePlaceOrder : handleContinue}
//                         style={{ width: "100px" }}>
//                     {section === 3 ? 'Купить' : 'Продолжить'}
//                 </button>
//             </div>
//
//             <div className="cart-summary">
//                 <CartSummary
//                     totalPrice={totalPrice}
//                     handleCheckout={handleCheckout}
//                     handleClearCart={() => setCartItems([])}
//                 />
//                 <hr />
//             </div>
//         </div>
//     );
// };
// export default Cart;



import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useHistory } from 'react-router-dom';
import PaymentForm from '../Payment/PaymentForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartSummary from './CartSummary';

const Cart = ({ cartItems, setCartItems, setShowSidebar }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0); // Состояние для хранения общего количества товара в корзине

    const [showPayment, setShowPayment] = useState(false);
    const [user, setUser] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [section, setSection] = useState(1);
    const [section1Filled, setSection1Filled] = useState(false);
    const [section2Filled, setSection2Filled] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [comments, setComments] = useState('');
    const [userName, setUserName] = useState(''); // Состояние для хранения имени пользователя или гостя
    const [deliveryType, setDeliveryType] = useState('delivery'); // Состояние для отслеживания выбора типа доставки

    const history = useHistory();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';

    const handleBackToShopping = () => {
        history.push('/');
    };

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch(`${apiUrl}/api/users/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUser(data);
                        // Автоматическое заполнение полей имени и email, если пользователь зарегистрирован и залогинен
                        setFirstName(data.name);
                        setEmail(data.email);
                    } else {
                        console.error(data.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [apiUrl]);

    const handleCheckout = () => {
        setShowCheckout(true);
        setSection(2);
    };

    const handlePayment = () => {
        setShowPayment(true);
        setSection(3);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedCart = cartItems.map((item) => {
            if (item.productId === productId) {
                const validQuantity = Math.max(newQuantity, 0);
                return { ...item, quantity: validQuantity };
            }
            return item;
        });
        setCartItems(updatedCart);
        const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.productId !== productId);
        setCartItems(updatedCart);
        if (updatedCart.length === 0) {
            history.push('/');
        }
    };

    const handleContinue = () => {
        if (section === 1) {
            setSection1Filled(true);
            setSection(2);
        } else if (section === 2) {
            if (firstName.trim() !== '' && address.trim() !== '' && phoneNumber.trim() !== '') {
                setSection2Filled(true);
                setUserName(firstName.name);
                setSection(3);
            } else {
                toast.error('Пожалуйста, заполните все обязательные поля (Имя, Адрес, Номер телефона)');
            }
        }
    };

    const handlePlaceOrder = async () => {
        try {
            if (firstName.trim() === '' || address.trim() === '' || phoneNumber.trim() === '') {
                toast.error('Пожалуйста, заполните все обязательные поля (Имя, Адрес, Номер телефона)');
                return;
            }

            const token = localStorage.getItem('token');

            const response = await fetch(`${apiUrl}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user: token ? { firstName, email } : null,
                    guestInfo: token ? undefined : { name: firstName, email }, // Используем имя гостя
                    address,
                    phoneNumber,
                    products: cartItems.map((item) => ({ product: item.productId, quantity: item.quantity })),
                    totalAmount: totalPrice,
                    paymentMethod,
                    comments,
                    userName: userName || 'Гость',
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Order placed successfully:', data);

                setCartItems([]);
                history.push('/');
                toast.success('Ваш заказ принят. Спасибо за покупку');
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

    const handleDeliveryTypeChange = (type) => {
        if (type === 'pickup') {
            setAddress('г.Бишкек, Универмаг ЦУМ, 0 этаж, бутик sotochka.kg');
        } else {
            setAddress('');
        }
        setDeliveryType(type);
    };

    return (
        <div className="cartAll">
            <div className="cart">
                <span className="closeCart" onClick={handleBackToShopping}>
                    &#10006;
                </span>
                <h2>Корзина</h2>
                <hr />

                <div className="allSection">

                <div className="sectionOne" >
                    <h3>Подтвердите заказ</h3>
                    {section === 1 && (
                        <>
                            {cartItems.length === 0 ? (
                                <p>Ваша корзина пуста</p>
                            ) : (
                                <div className="AllCartInfo">
                                    {cartItems.map((item) => (
                                        <div className="cart-item" key={item.productId}>
                                            <div className="item-info">
                                                <img className="cartImg" src={item.image} alt={item.name} />
                                                <div className="item-details">
                                                    <span className="itemName" style={{ fontWeight: 'bold' }}>{item.type}</span>
                                                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.brand}</span>
                                                    <span>{item.name}</span>
                                                    <div className="sumKg">
                                                        <span>KGS</span> {item.price}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-quantity">
                                                <div className="allSum">
                                                    <div className="sumOne" style={{ fontWeight: "bold" }}> Сумма:
                                                        <span>{(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                                <button className="btnMinus" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    style={{ marginTop: "8px" }}
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                                />
                                                <button className="btnPlus" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                                                    +
                                                </button>
                                                <button className="deleteOne" onClick={() => handleRemoveItem(item.productId)}>
                                                    &#10006;
                                                </button>
                                            </div>
                                            <hr style={{width:"100%", height:"2px", background:"blanchedalmond"}}/>
                                        </div>
                                    ))}
                                </div>

                            )}

                        </>
                    )}
                    {section !== 1 && (
                        <button className="updateSection" onClick={() => setSection(1)}>Изменить</button>
                    )}
                    <hr />
                </div>

                <div  className="sectionTwo">
                    <h3>Оформите заказ</h3>
                    {section === 2 && (
                        <>
                            <div className="checkForm">
                                {/*<h2>Оформите заказ</h2>*/}
                                <div style={{ fontSize: "10px", fontWeight: "bold" }}>Обязательные поля для заполнения - "<span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>"</div>
                                <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Имя:</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Email:</label>
                                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>  Адрес доставки:</label>
                               <div className="radioButtons">
                                   <div className="btnOne">
                                       <input type="radio" id="delivery" name="deliveryType" checked={deliveryType === 'delivery'} onChange={() => handleDeliveryTypeChange('delivery')} />
                                       <label htmlFor="delivery">Доставка
                                       <span>(по г.Бишкек - 250сом)</span>
                                       </label>
                                   </div>
                                   <div  className="btnTwo">
                                       <input type="radio" id="pickup" name="deliveryType" checked={deliveryType === 'pickup'} onChange={() => handleDeliveryTypeChange('pickup')} />
                                       <label htmlFor="pickup">Самовывоз</label>
                                   </div>
                               </div>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={deliveryType === 'pickup'} />
                                <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Номер телефона:</label>
                                <input className="cartPhoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                <label> Способ оплаты:</label>
                                <input type="text" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label>Комментарии:</label>
                                <textarea value={comments} onChange={(e) => setComments(e.target.value)} />
                            </div>
                        </>
                    )}
                    {section !== 2 && section > 1 && (
                        <button className="updateSection" onClick={() => setSection(2)}>Изменить</button>
                    )}
                    <hr />

                </div>

                <div className="sectionThree">
                    {/*<h3>Оплатите заказ</h3>*/}
                    {section === 3 && (
                        <>
                            <PaymentForm />
                        </>
                    )}
                    <hr />
                </div>

                </div>

            </div>

            <div className="cart-summary">
                <CartSummary
                    totalPrice={totalPrice}
                    handleCheckout={handleCheckout}
                    handleClearCart={() => setCartItems([])}
                />
                {/*<hr />*/}
            </div>

            <div className="section-indicator">
                {[1, '*', 2, '*', 3].map((item, index) => (
                    <span key={index} className={typeof item === 'number' && section === item ? 'active' : ''}>
                        {typeof item === 'number' ? item : '* * * * *'}
                        {section1Filled && item === 1 }
                        {section2Filled && item === 2 }
                    </span>
                ))}

                <button className="buy_next"
                        onClick={section === 3 ? handlePlaceOrder : handleContinue}
                        style={{ width: "100px" }}>
                    {section === 3 ? 'Закрыть' : 'Продолжить'}
                    {/*{section === 3 ? 'Купить' : 'Продолжить'}*/}
                </button>
            </div>

        </div>
    );
};
export default Cart;
