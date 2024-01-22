// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 console.log("T O K E N", token)
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         console.log("D A T A", data)
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                         console.error('Full response:', response); // Вывод полного ответа в консоль
//                         // Обработка ошибок, например, перенаправление на страницу входа
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         fetchProfile();
//     }, []);
//
//     const [orders, setOrders] = useState([]);
//
//
//     useEffect(() => {
//         // Функция для получения списка заказов с бэкенда
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/orders/orders');
//                 const data = await response.json();
//                 // console.log("O R D E R S", data)
//                 setOrders(data);
//
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//
//
//         // Вызываем функцию для получения списка заказов
//         fetchOrders();
//     }, []);
//
//     console.log("O R D E R S", orders.map(order => order.address))
//
//     return (
//         <div>
//             <h2>Profile</h2>
//             {user && (
//                 <div>
//                     <p>Name: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     {orders.map((order, index) => (
//                         <React.Fragment key={index}>
//                             <p> Address: {order.address ? order.address : '-'}</p>
//                             <p> Phone Number: {order.phoneNumber ? order.phoneNumber : '-'}</p>
//                         </React.Fragment>
//                     ))}
//                     {/* Другие поля профиля */}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Profile;
// Profile
//
//
//
//
// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 console.log("T O K E N", token)
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         console.log("D A T A", data)
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                         console.error('Full response:', response); // Вывод полного ответа в консоль
//                         // Обработка ошибок, например, перенаправление на страницу входа
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         fetchProfile();
//     }, []);
//
//     console.log( "U S E R", user)
//
//     const [orders, setOrders] = useState([]);
//
//
//     useEffect(() => {
//         // Функция для получения списка заказов с бэкенда
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/orders/orders');
//                 const data = await response.json();
//                 // console.log("O R D E R S", data)
//                 setOrders(data);
//
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//
//
//         // Вызываем функцию для получения списка заказов
//         fetchOrders();
//     }, []);
//
//     console.log("O R D E R S", orders.map(order => order.address))
//
//     return (
//         <div>
//             <h2>Profile</h2>
//             {user && (
//                 <div>
//                     <p>Name: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     {orders.map((order, index) => (
//                         <React.Fragment key={index}>
//                             <p> Address: {order.address ? order.address : '-'}</p>
//                             <p> Phone Number: {order.phoneNumber ? order.phoneNumber : '-'}</p>
//                         </React.Fragment>
//                     ))}
//                     {/* Другие поля профиля */}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Profile;


//
// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 console.log("T O K E N", token)
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         console.log("D A T A", data)
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                         console.error('Full response:', response); // Вывод полного ответа в консоль
//                         // Обработка ошибок, например, перенаправление на страницу входа
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         fetchProfile();
//     }, []);
//
//     console.log( "U S E R", user)
//
//     const [orders, setOrders] = useState([]);
//
//
//     useEffect(() => {
//         // Функция для получения списка заказов с бэкенда
//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch('http://localhost:5500/api/orders/orders');
//                 const data = await response.json();
//                 // console.log("O R D E R S", data)
//                 setOrders(data);
//
//             } catch (error) {
//                 console.error('Fetch error:', error);
//             }
//         };
//
//
//         // Вызываем функцию для получения списка заказов
//         fetchOrders();
//     }, []);
//
//     console.log("O R D E R S", orders)
//
//     // console.log("O R D E R S", orders.map(order => order.address))
//     // console.log("O R D E R S", orders.map(order => order._id))
//     // console.log("ORDERS I D", orders.map(order => order.user._id))
//     // console.log("USER I D", user._id)
//
//     // let num = orders.filter((order) => order.user._id === user._id)
//     // console.log(num)
//
//     return (
//         <div>
//             <h2>Profile</h2>
//             {user && (
//                 <div>
//                     <p>Name: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     {orders.map((order, index) => (
//                         <React.Fragment key={index}>
//                             <p> Address: {order.address ? order.address : '-'}</p>
//                             <p> Phone Number: {order.phoneNumber ? order.phoneNumber : '-'}</p>
//                         </React.Fragment>
//                     ))}
//                     {/* Другие поля профиля */}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Profile;






// src/components/Profile/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch('http://localhost:5500/api/users/profile', {
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
                console.error('Error:', error);
            }
        };

        const fetchUserOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5500/api/orders/orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setOrders(data);
                    console.log('User Orders:', data); // Выводим заказы в консоль
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };

        fetchProfile();
        fetchUserOrders();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {orders.map((order, index) => (
                        order.user._id === user._id && (
                            <React.Fragment key={index}>
                                <p> Address: {order.address ? order.address : '-'}</p>
                                <p> Phone Number: {order.phoneNumber ? order.phoneNumber : '-'}</p>
                            </React.Fragment>
                        )
                    ))}
                    {/* Другие поля профиля */}
                </div>
            )}
        </div>
    );
};

export default Profile;





