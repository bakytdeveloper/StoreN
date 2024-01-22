
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






// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [orders, setOrders] = useState([]);
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         const fetchUserOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch('http://localhost:5500/api/orders/orders', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//
//                 if (response.ok) {
//                     setOrders(data);
//                     console.log('User Orders:', data); // Выводим заказы в консоль
//                 } else {
//                     console.error(data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user orders:', error);
//             }
//         };
//
//         fetchProfile();
//         fetchUserOrders();
//     }, []);
//
//     return (
//         <div>
//             <h2>Profile</h2>
//             {user && (
//                 <div>
//                     <p>Name: {user.name}</p>
//                     <p>Email: {user.email}</p>
//                     {orders.map((order, index) => (
//                         order.user._id === user._id && (
//                             <React.Fragment key={index}>
//                                 <p> Address: {order.address ? order.address : '-'}</p>
//                                 <p> Phone Number: {order.phoneNumber ? order.phoneNumber : '-'}</p>
//                             </React.Fragment>
//                         )
//                     ))}
//                     {/* Другие поля профиля */}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default Profile;











// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
// import './Profile.css'; // Подключаем файл стилей
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState('editProfile'); // Добавим состояние для активной вкладки
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         const fetchUserOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch('http://localhost:5500/api/orders/orders', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//
//                 if (response.ok) {
//                     setOrders(data);
//                     console.log('User Orders:', data); // Выводим заказы в консоль
//                 } else {
//                     console.error(data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user orders:', error);
//             }
//         };
//
//         fetchProfile();
//         fetchUserOrders();
//     }, []);
//
//     return (
//         <div className="profile-container">
//             <h2>Profile</h2>
//
//             {/* Сайтбар */}
//             <div className="sidebar">
//                 <div
//                     className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editProfile')}
//                 >
//                     Редактировать профиль
//                 </div>
//                 <div
//                     className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editPassword')}
//                 >
//                     Редактировать пароль
//                 </div>
//                 <div
//                     className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('purchaseHistory')}
//                 >
//                     История покупок
//                 </div>
//                 <div
//                     className="sidebar-item logout"
//                     onClick={() => {
//                         // Реализуйте функциональность выхода
//                         console.log('Logout clicked');
//                     }}
//                 >
//                     Выход
//                 </div>
//             </div>
//
//             {/* Содержимое профиля */}
//             <div className="profile-content">
//                 <h2>Profile</h2>
//                 {user && (
//                     <div>
//                         {activeTab === 'editProfile' && (
//                             <>
//                                 <div className="profile-input">
//                                     <label>Name:</label>
//                                     <input type="text" value={user.name} readOnly />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Email:</label>
//                                     <input type="text" value={user.email} readOnly />
//                                 </div>
//
//                                 {orders.map((order, index) => (
//                                     order.user._id === user._id && (
//                                         <React.Fragment key={index}>
//
//                                             <div className="profile-input">
//                                                 <label>Address:</label>
//                                                 <input type="text" value={order.address ? order.address : '-'} readOnly />
//                                             </div>
//
//                                             <div className="profile-input">
//                                                 <label>phoneNumber:</label>
//                                                 <input type="text" value={order.phoneNumber ? order.phoneNumber : '-'} readOnly />
//                                             </div>
//
//                                             {/*<p> Address: {order.address ? order.address : '-'}</p>*/}
//                                             {/*<p> Phone Number: {order.phoneNumber ? order.phoneNumber : '-'}</p>*/}
//
//                                         </React.Fragment>
//                                     )
//                                 ))}
//
//                                 {/* Добавьте другие поля профиля */}
//                             </>
//                         )}
//                         {activeTab === 'editPassword' && (
//                             <>
//                                 <div className="profile-input">
//                                     <label>New Password:</label>
//                                     <input type="password" placeholder="Enter new password" />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Confirm Password:</label>
//                                     <input type="password" placeholder="Confirm new password" />
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'purchaseHistory' && (
//                             // Добавьте вывод истории покупок здесь
//                             <p>Coming soon...</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Profile;







//
// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
// import './Profile.css'; // Подключаем файл стилей
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState('editProfile'); // Добавим состояние для активной вкладки
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         const fetchUserOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch('http://localhost:5500/api/orders/orders', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//
//                 if (response.ok) {
//                     setOrders(data);
//                     console.log('User Orders:', data); // Выводим заказы в консоль
//                 } else {
//                     console.error(data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user orders:', error);
//             }
//         };
//
//         fetchProfile();
//         fetchUserOrders();
//     }, []);
//
//     return (
//         <div className="profile-container">
//             <h2>Profile</h2>
//
//             {/* Сайтбар */}
//             <div className="sidebar">
//                 <div
//                     className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editProfile')}
//                 >
//                     Редактировать профиль
//                 </div>
//                 <div
//                     className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editPassword')}
//                 >
//                     Редактировать пароль
//                 </div>
//                 <div
//                     className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('purchaseHistory')}
//                 >
//                     История покупок
//                 </div>
//                 <div
//                     className="sidebar-item logout"
//                     onClick={() => {
//                         // Реализуйте функциональность выхода
//                         console.log('Logout clicked');
//                     }}
//                 >
//                     Выход
//                 </div>
//             </div>
//
//             {/* Содержимое профиля */}
//             <div className="profile-content">
//                 <h2>Profile</h2>
//                 {user && (
//                     <div>
//                         {activeTab === 'editProfile' && (
//                             <>
//                                 <div className="profile-input">
//                                     <label>Name:</label>
//                                     <input type="text" value={user.name} readOnly />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Email:</label>
//                                     <input type="text" value={user.email} readOnly />
//                                 </div>
//
//                                 {orders
//                                     .filter((order) => order.user._id === user._id)
//                                     .map((order, index) => (
//                                         <React.Fragment key={index}>
//                                             <div className="profile-input">
//                                                 <label>Address:</label>
//                                                 <input type="text" value={order.address ? order.address : '-'} readOnly />
//                                             </div>
//                                             <div className="profile-input">
//                                                 <label>PhoneNumber:</label>
//                                                 <input type="text" value={order.phoneNumber ? order.phoneNumber : '-'} readOnly />
//                                             </div>
//                                         </React.Fragment>
//                                     ))
//                                 }
//
//                                 {/* Добавьте другие поля профиля */}
//                             </>
//                         )}
//                         {activeTab === 'editPassword' && (
//                             <>
//                                 <div className="profile-input">
//                                     <label>New Password:</label>
//                                     <input type="password" placeholder="Enter new password" />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Confirm Password:</label>
//                                     <input type="password" placeholder="Confirm new password" />
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'purchaseHistory' && (
//                             // Добавьте вывод истории покупок здесь
//                             <p>Coming soon...</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Profile;
//
//

// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
// import './Profile.css'; // Подключаем файл стилей
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState('editProfile'); // Добавим состояние для активной вкладки
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (token) {
//                     const response = await fetch('http://localhost:5500/api/users/profile', {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//
//                     if (response.ok) {
//                         setUser(data);
//                     } else {
//                         console.error(data.message);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//
//         const fetchUserOrders = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await fetch('http://localhost:5500/api/orders/orders', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//
//                 if (response.ok) {
//                     setOrders(data);
//                     console.log('User Orders:', data); // Выводим заказы в консоль
//                 } else {
//                     console.error(data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user orders:', error);
//             }
//         };
//
//         fetchProfile();
//         fetchUserOrders();
//     }, []);
//
//     // const latestOrder = orders.find(order => order.user._id === user?._id);
//
//     // Копируем массив orders
//     const ordersCopy = orders.slice();
// // Переворачиваем копию
//     ordersCopy.reverse();
// // Ищем последний заказ с определенным пользователем
//     const latestOrder = ordersCopy.find(order => order.user._id === user?._id);
//
//
//     console.log(latestOrder)
//
//     return (
//         <div className="profile-container">
//             <h2>Profile</h2>
//
//             {/* Сайтбар */}
//             <div className="sidebar">
//                 <div
//                     className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editProfile')}
//                 >
//                     Редактировать профиль
//                 </div>
//                 <div
//                     className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editPassword')}
//                 >
//                     Редактировать пароль
//                 </div>
//                 <div
//                     className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('purchaseHistory')}
//                 >
//                     История покупок
//                 </div>
//                 <div
//                     className="sidebar-item logout"
//                     onClick={() => {
//                         // Реализуйте функциональность выхода
//                         console.log('Logout clicked');
//                     }}
//                 >
//                     Выход
//                 </div>
//             </div>
//
//             {/* Содержимое профиля */}
//             <div className="profile-content">
//                 <h2>Profile</h2>
//                 {user && (
//                     <div>
//                         {activeTab === 'editProfile' && (
//                             <>
//
//                                 <div className="profile-input">
//                                     <label>Name:</label>
//                                     <input type="text" value={user.name} readOnly />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Email:</label>
//                                     <input type="text" value={user.email} readOnly />
//                                 </div>
//
//                                 {latestOrder && (
//                                     <>
//                                         <div className="profile-input">
//                                             <label>Address:</label>
//                                             <input type="text" value={latestOrder.address || '-'} readOnly />
//                                         </div>
//
//                                         <div className="profile-input">
//                                             <label>Phone Number:</label>
//                                             <input type="text" value={latestOrder.phoneNumber || '-'} readOnly />
//                                         </div>
//                                     </>
//                                 )}
//                                 {/* Добавьте другие поля профиля */}
//                             </>
//                         )}
//                         {activeTab === 'editPassword' && (
//                             <>
//
//
//                                 <div className="profile-input">
//                                     <label>New Password:</label>
//                                     <input type="password" placeholder="Enter new password" />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Confirm Password:</label>
//                                     <input type="password" placeholder="Confirm new password" />
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'purchaseHistory' && (
//                             // Добавьте вывод истории покупок здесь
//                             <p>Coming soon...</p>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Profile;




// src/components/Profile/Profile.js
import React, { useEffect, useState } from 'react';
import './Profile.css'; // Подключаем файл стилей

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('editProfile'); // Добавим состояние для активной вкладки
    const [editPassword, setEditPassword] = useState(false); // Добавим состояние для редактирования пароля
    const [currentPassword, setCurrentPassword] = useState(''); // Добавим состояние для текущего пароля
    const [newPassword, setNewPassword] = useState(''); // Добавим состояние для нового пароля
    const [confirmPassword, setConfirmPassword] = useState(''); // Добавим состояние для подтверждения нового пароля

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

    // Копируем массив orders
    const ordersCopy = orders.slice();
// Переворачиваем копию
    ordersCopy.reverse();
// Ищем последний заказ с определенным пользователем
    const latestOrder = ordersCopy.find(order => order.user._id === user?._id);
    console.log(latestOrder);





    const handleEditPassword = () => {
        setEditPassword(true);
    };

    const handleCancelEditPassword = () => {
        setEditPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleSavePassword = () => {
        // Реализуйте сохранение нового пароля
        console.log('Save password clicked');
        // Ваши дополнительные действия, например, отправка запроса на сервер
        // Очистите состояния и отключите режим редактирования пароля
        setEditPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {/* Сайтбар */}
            <div className="sidebar">
                <div
                    className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editProfile')}
                >
                    Редактировать профиль
                </div>
                <div
                    className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editPassword')}
                >
                    Редактировать пароль
                </div>
                <div
                    className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('purchaseHistory')}
                >
                    История покупок
                </div>
                <div
                    className="sidebar-item logout"
                    onClick={() => {
                        // Реализуйте функциональность выхода
                        console.log('Logout clicked');
                    }}
                >
                    Выход
                </div>
                </div>
            {/* Содержимое профиля */}
            <div className="profile-content">
                <h2>Profile</h2>
                {user && (
                    <div>
                        {activeTab === 'editProfile' && (
                            <>
                                <div className="profile-input">
                                    <label>Name:</label>
                                    <input type="text" value={user.name} readOnly />
                                </div>
                                <div className="profile-input">
                                    <label>Email:</label>
                                    <input type="text" value={user.email} readOnly />
                                </div>                                {latestOrder && (
                                    <>
                                        <div className="profile-input">
                                            <label>Address:</label>
                                            <input type="text" value={latestOrder.address || '-'} readOnly />
                                        </div>
                                        <div className="profile-input">
                                            <label>Phone Number:</label>
                                            <input type="text" value={latestOrder.phoneNumber || '-'} readOnly />
                                        </div>
                                    </>
                                )}
                                <div className="profile-buttons">
                                    <button onClick={() => console.log('Edit clicked')}>Редактировать</button>
                                    <button onClick={() => console.log('Cancel clicked')}>Отмена</button>
                                </div>
                                {/* Добавьте другие поля профиля */}
                            </>
                        )}
                        {activeTab === 'editPassword' && (
                            <>
                                <div className="profile-input">
                                    <label>Current Password:</label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                </div>
                                <div className="profile-input">
                                    <label>New Password:</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="profile-input">
                                    <label>Confirm Password:</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <div className="profile-buttons">
                                    <button onClick={handleSavePassword}>Сохранить</button>
                                    <button onClick={handleCancelEditPassword}>Отмена</button>
                                </div>
                            </>
                        )}
                        {activeTab === 'purchaseHistory' && (
                            // Добавьте вывод истории покупок здесь
                            <p>Coming soon...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;


