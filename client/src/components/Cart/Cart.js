
import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useHistory} from 'react-router-dom';
import PaymentForm from '../Payment/PaymentForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartSummary from './CartSummary';
import emptyCart from './emptyCart.png'
import NewestProducts from "../Home/NewestProducts/NewestProducts";
import {jwtDecode} from 'jwt-decode';

const Cart = ({ cartItems, setCartItems, setShowSidebar, setActiveComponent }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
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
    const [userName, setUserName] = useState('');
    const [deliveryType, setDeliveryType] = useState('delivery');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const imageBaseUrl = process.env.REACT_APP_API_URL;
    const [tokenUser, setTokenUser] = useState('')


    const handleBackToShopping = () => {
        setActiveComponent(null);
        history.goBack();
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
                    setTokenUser(token)
                    const response = await fetch(`${apiUrl}/api/auth/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok && data) {
                        setUser(data);
                        setFirstName(data.name);
                        setEmail(data.email);
                    } else if (!response.ok && data) {
                        console.error(data.message);
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [apiUrl]);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
        setTotalItems(cartItems.reduce((acc, item) => acc + item.quantity, 0));
    }, [cartItems, setCartItems]);

    const handleCheckout = () => {
        setShowCheckout(true);
        setSection(2);
    };

    const handlePayment = () => {
        setShowPayment(true);
        setSection(3);
    };

    const handleQuantityChange = (productId, newQuantity) => {

        // Убедитесь, что newQuantity находится в пределах имеющегося запаса
        const existingItem = cartItems.find(item => item.productId === productId);
        if (existingItem && existingItem.quantity + newQuantity > existingItem.available) {
            toast.error(`Недостаточно запасов ${existingItem.name}`);
            return;
        }

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
        if (window.confirm('Вы уверены, что хотите удалить этот товар из корзины?')) {
            const updatedCart = cartItems.filter((item) => item.productId !== productId);
            setCartItems(updatedCart);
            toast.success('Товар удален из корзины');
        }
    };

    const handleContinue = () => {
        if (orderPlaced) {
            return;
        }
        if (section === 1) {
            // Проверка, что корзина не пуста и общая сумма больше нуля
            if (totalItems === 0 || totalPrice === 0) {
                toast.error('Ваша корзина пуста или общая сумма равна нулю. Пожалуйста, добавьте товары в корзину.');
                return;
            }
            setSection1Filled(true);
            setSection(2);
        } else if (section === 2) {
            if (firstName.trim() !== '' && address.trim() !== '' && phoneNumber.trim() !== '') {
                setSection2Filled(true);
                setUserName(firstName);
                setSection(3);
            } else {
                toast.error('Пожалуйста, заполните все обязательные поля (Имя, Адрес, Номер телефона)');
            }
        }
    };



    const handlePlaceOrder = async () => {
        if (orderPlaced) return;

        setOrderPlaced(true);
        setIsLoading(true);

        if (totalItems === 0 || totalPrice === 0) {
            toast.error('Ваша корзина пуста или общая сумма равна нулю. Невозможно оформить заказ.');
            setOrderPlaced(false);
            setIsLoading(false);
            return;
        }

        if (firstName.trim() === '' || address.trim() === '' || phoneNumber.trim() === '') {
            toast.error('Пожалуйста, заполните все обязательные поля (Имя, Адрес, Номер телефона)');
            setOrderPlaced(false);
            setIsLoading(false);
            return;
        }

        const token = localStorage.getItem('token');

        let role = 'guest';
        if (token) {
            const decodedToken = jwtDecode(token);
            role = decodedToken.role;

        }

        const orderData = {
            user: role === 'customer' ? { firstName, email } : null,
            guestInfo: role === 'guest' ? { name: firstName, email } : undefined,
            address,
            phoneNumber,
            products: cartItems.map(item => ({
                product: item.productId,
                quantity: item.quantity,
                size: item.size,
                color: item.color,
            })),
            totalAmount: totalPrice,
            paymentMethod,
            comments,
            userName: userName || 'Гость',
        };

        try {
            const [orderResponse, emailResponse] = await Promise.all([
                fetch(`${apiUrl}/api/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(orderData),
                }),
                sendOrderEmail()
            ]);

            if (orderResponse.ok) {
                const data = await orderResponse.json();
                console.log('Order placed successfully:', data);

                setCartItems([]); // Очистка корзины

                setTimeout(() => {
                    history.push('/'); // Редирект на главную
                }, 500);

                toast.success('Ваш заказ принят. Спасибо за покупку');
            } else {
                const data = await orderResponse.json();
                if (data.message === 'Insufficient product quantities') {
                    toast.error(`Недостаточно запасов ${data.products.map(p => p.name).join(', ')}`);
                } else {
                    console.error('Failed to place order:', data.message);
                }
                setOrderPlaced(false);
            }

        } catch (error) {
            console.error('Error placing order:', error);
            setOrderPlaced(false);
        }
        setIsLoading(false);
    };



    const handleDeliveryTypeChange = (type) => {
        if (type === 'pickup') {
            setAddress('г.Бишкек, Универмаг ЦУМ, 0 этаж, бутик LimPoPo.kg');
        } else {
            setAddress('');
        }
        setDeliveryType(type);
    };

    const getFullImageUrl = (image) => {
        if (!image) {
            return './../bag.jpg';
        }
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    const goToCatalog = () => {
        history.push('/catalog')
    }

    const sendOrderEmail = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/orders/send-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    address,
                    phoneNumber,
                    cartItems,
                    totalPrice
                }),
            });

            if (!response.ok) {
                toast.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send email');
        }
    };

    const goToLogin = (event) => {
        event.preventDefault();
        event.stopPropagation();
        history.push("/login");
    };

    return (
        <div className="cartAll">
            <div className="cart">
                <div className="closeCart" onClick={handleBackToShopping}>
                    &#10006;
                </div>
                <h2>Корзина</h2>
                {cartItems.length === 0 ? (
                    <div className="emptyCartEls-all">
                        <div className="emptyCartEls">
                            <div onClick={goToCatalog}>
                                <img className="emptyCart" src={emptyCart} alt="Ваша корзина пока пуста" />
                                <p className="emptyCart">Ваша корзина пока пуста, кликните сюда, чтобы преобрести товар</p>
                            </div>
                            {tokenUser ? (
                                // Если пользователь залогинен
                                <div className="empty-cart-login">
                                    <div>Приступить к покупкам</div>
                                    <button className="empty-cart-login-button" onClick={goToCatalog}>
                                        Каталог
                                    </button>
                                </div>
                            ) : (
                                <div className="empty-cart-login">
                                    <div>Или входите через свой аккаунт</div>
                                    <button className="empty-cart-login-button" onClick={goToLogin}>
                                        Войти
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="empty-cart-products">
                            <h2 className="newest-products-title">Наши новинки</h2>
                            <NewestProducts apiUrl={process.env.REACT_APP_API_URL} />
                        </div>
                    </div>
                ) : (
                    <div className="allSection">
                        <div className="sectionOne">
                            <h5>1) Подтвердите заказ</h5>
                            {section === 1 && (
                                <div className="AllCartInfo">
                                    {cartItems.map((item) => (
                                        <div className="cart-item" key={item.productId}>
                                            <div className="item-info">
                                                <img className="cartImg" src={getFullImageUrl(item.image)} alt={item.name} />
                                                <div className="item-details">
                                                    <div className="item-details-type-brand-name">
                                                        <span className="itemName" style={{ fontWeight: 'bold' }}>{item.type}</span>
                                                        <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{item.brand} </span>
                                                        <span style={{marginLeft:"5px"}}>{item.name}</span>
                                                    </div>
                                                    <div className="item-details-color-size">
                                                        {item.color && (
                                                            <div className="item-details-color">
                                                                <span style={{fontWeight:"500"}}>Цвет: </span>
                                                                {" " + item.color}
                                                            </div>
                                                        )}
                                                        {item.size && (
                                                            <div className="item-details-size">
                                                                <span style={{fontWeight:"500"}}>Размер:</span>
                                                                {" " + item.size}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="sumKg">
                                                        <span className="sum-one-product">Цена: </span>
                                                        {item.price}<span> сом</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="calculator-item-quantity">
                                            <div className="item-quantity">
                                                <button className="btnMinus" onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    style={{ marginTop: "13px", marginBottom:"12px" }}
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
                                            </div>
                                            <hr style={{width:"100%", height:"2px"}} />
                                            <div className="sumOne">Сумма:
                                                <span style={{ marginLeft: "7px", width:"222px" }}>{(item.price * item.quantity)} сом</span>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        className="buy_next buy_next_small_monitor"
                                        onClick={handleContinue}
                                        disabled={orderPlaced}
                                    >
                                        Оформить заказ
                                    </button>
                                </div>
                            )}
                            {section !== 1 && (
                                <button className="updateSection" onClick={() => setSection(1)}>Изменить</button>
                            )}
                            {/*<hr />*/}
                        </div>
                        <div className="sectionTwo">
                            <h5>2) Оформите заказ</h5>
                            {section === 2 && (
                                <div className="checkForm">
                                    <div style={{ fontSize: "10px", fontWeight: "bold" }}>Обязательные поля для заполнения - "<span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span>"</div>
                                    <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Имя:</label>
                                    <input type="text" value={firstName} placeholder="Введите ваше имя" onChange={(e) => setFirstName(e.target.value)} />

                                    <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Email:</label>
                                    <input type="text" value={email} placeholder="Введите ваш Email" onChange={(e) => setEmail(e.target.value)} />

                                    <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Адрес доставки:</label>
                                    <div className="radioButtons">
                                        <div className="btnOne">
                                            <input type="radio" id="delivery" name="deliveryType"
                                                   className="btn-one-radio"
                                                   checked={deliveryType === 'delivery'}
                                                   onChange={() => handleDeliveryTypeChange('delivery')} />
                                            <label htmlFor="delivery">Доставка
                                                <span>(по г.Бишкек - 250 сом)</span>
                                            </label>
                                        </div>
                                        <div className="btnTwo">
                                            <input type="radio" id="pickup"
                                                   name="deliveryType" checked={deliveryType === 'pickup'}
                                                   onChange={() => handleDeliveryTypeChange('pickup')} />
                                            <label htmlFor="pickup">Самовывоз</label>
                                        </div>
                                    </div>
                                    <input className="address-input" placeholder="Укажите адрес доставки" type="text" value={address} onChange={(e) => setAddress(e.target.value)} disabled={deliveryType === 'pickup'} />


                                    <label><span style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>*</span> Телефонный №:</label>
                                    <input className="cartPhoneNumber" placeholder="Введите ваш номер телефона" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

                                    <label>Способ оплаты:</label>
                                    <input type="text" value={paymentMethod} placeholder="Введите ваш желаемый способ оплаты" onChange={(e) => setPaymentMethod(e.target.value)} />

                                    <label>Комментарии:</label>
                                    <textarea placeholder="Введите уточнения или рекомендации, если они есть" value={comments} onChange={(e) => setComments(e.target.value)} />
                                    <button
                                        className="buy_next buy_next_small_monitor"
                                        onClick={handleContinue}
                                        disabled={orderPlaced}
                                    >
                                        Продолжить
                                    </button>
                                </div>
                            )}

                            {section !== 2 && section > 1 && (
                                <button className="updateSection" onClick={() => setSection(2)}>Изменить</button>
                            )}
                        </div>
                        <div className="sectionThree">
                            <h5>3) Оплатить заказ</h5>
                            {section === 3 && (
                               <div>
                                   <PaymentForm />
                                   <button
                                       className="buy_next buy_next_small_monitor"
                                       onClick={handlePlaceOrder}
                                       disabled={orderPlaced}
                                   >
                                       Закрыть
                                   </button>
                               </div>

                            )}
                        </div>

                    </div>
                )}
                <div className="cart-summary" style={{ display: cartItems.length > 0 ? 'block' : 'none' }}>
                    <CartSummary
                        totalPrice={totalPrice}
                        totalItems={totalItems}
                        handleCheckout={handleCheckout}
                        handleClearCart={() => setCartItems([])}
                    />
                </div>
            </div>
            <div className="section-indicator" style={{ display: cartItems.length > 0 ? 'block' : 'none' }}>
                {[1, '*', 2, '*', 3].map((item, index) => (
                    <span key={index} className={typeof item === 'number' && section === item ? 'active' : ''}>
                        {typeof item === 'number' ? item : ' * * * * * '}
                        {section1Filled && item === 1}
                        {section2Filled && item === 2}
                    </span>
                ))}

               <div className="section-indicator-button">
                   <button
                       className="buy_next buy_next_big_monitor"
                       onClick={section === 3 ? handlePlaceOrder : handleContinue}
                       disabled={orderPlaced || isLoading}
                   >
                       {isLoading ? (
                           <div className="spinner"></div>
                       ) : (
                           section === 3 ? 'Закрыть' : 'Продолжить'
                       )}
                   </button>
               </div>

            </div>
        </div>
    );
};

export default Cart;


