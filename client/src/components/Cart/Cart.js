// src/components/Cart/Cart.js
import React, { useEffect, useState } from 'react';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await fetch('/cart', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    const data = await response.json();

                    if (response.ok) {
                        setCart(data);
                    } else {
                        console.error(data.message);
                        // Обработка ошибок, например, вывод сообщения об ошибке
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div>
            <h2>Cart</h2>
            {cart.map((item) => (
                <div key={item.product._id}>
                    <p>Name: {item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    {/* Другие поля товара в корзине */}
                </div>
            ))}
        </div>
    );
};

export default Cart;
