
// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import './Profile.css'; // Подключаем файл стилей
//
// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState('editProfile');
//     const [editPassword, setEditPassword] = useState(false);
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [editedAddress, setEditedAddress] = useState('');
//     const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
//     const [userOrders, setUserOrders] = useState([]);
//
//     const history = useHistory();
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
//                     if (response.ok) {
//                         setUser(data);
//                         // Устанавливаем редактированные значения, если они не установлены
//                         setEditedAddress(data.profile?.address || '');
//                         setEditedPhoneNumber(data.profile?.phoneNumber || '');
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
//                 const response = await fetch('http://localhost:5500/api/orders/my-orders', {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setUserOrders(data);
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
//     const handleEditProfile = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`http://localhost:5500/api/users/update-profile/${user._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     address: editedAddress || user.profile?.address,
//                     phoneNumber: editedPhoneNumber || user.profile?.phoneNumber,
//                 }),
//             });
//
//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.user);
//                 console.log('Profile updated successfully');
//             } else {
//                 const errorMessage = await response.text();
//                 console.error('Error updating profile:', errorMessage);
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };
//
//     const handleEditPassword = () => {
//         setEditPassword(true);
//     };
//
//     const handleCancelEditPassword = () => {
//         setEditPassword(false);
//         setCurrentPassword('');
//         setNewPassword('');
//         setConfirmPassword('');
//     };
//
//     const handleCancelEditProfile = () => {
//         setEditedAddress(user.profile?.address || "");
//         setEditedPhoneNumber(user.profile?.phoneNumber || "");
//         setEditPassword(false);
//     };
//
//     const handleSavePassword = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch('http://localhost:5500/api/users/update-password', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     userId: user._id,
//                     currentPassword,
//                     newPassword,
//                 }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 console.log('Password updated successfully');
//             } else {
//                 console.error(data.message);
//             }
//         } catch (error) {
//             console.error('Error updating password:', error);
//         } finally {
//             setEditPassword(false);
//             setCurrentPassword('');
//             setNewPassword('');
//             setConfirmPassword('');
//         }
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         history.push('/');
//     };
//
//     return (
//         <div className="profile-container">
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
//                     onClick={handleLogout}
//                 >
//                     Выход
//                 </div>
//             </div>
//             {/* Содержимое профиля */}
//             <div className="profile-content">
//                 <h2>Profile</h2>
//                 {user ? (
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
//                                 <div className="profile-input">
//                                     <label>Address:</label>
//                                     {editPassword ? (
//                                         <input
//                                             type="text"
//                                             value={editedAddress || user.profile?.address}
//                                             onChange={(e) => setEditedAddress(e.target.value)}
//                                         />
//                                     ) : (
//                                         <input
//                                             type="text"
//                                             value={user.profile?.address || ''}
//                                             readOnly
//                                         />
//                                     )}
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Phone Number:</label>
//                                     {editPassword ? (
//                                         <input
//                                             type="text"
//                                             value={editedPhoneNumber || user.profile?.phoneNumber}
//                                             onChange={(e) => setEditedPhoneNumber(e.target.value)}
//                                         />
//                                     ) : (
//                                         <input
//                                             type="text"
//                                             value={user.profile?.phoneNumber || ''}
//                                             readOnly
//                                         />
//                                     )}
//                                 </div>
//                                 <div className="profile-buttons">
//                                     {editPassword ? (
//                                         <>
//                                             <button onClick={handleEditProfile}>Сохранить</button>
//                                             <button onClick={handleCancelEditProfile}>Отмена</button>
//                                         </>
//                                     ) : (
//                                         <button onClick={() => setEditPassword(true)}>Редактировать</button>
//                                     )}
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'editPassword' && (
//                             <>
//                                 <div className="profile-input">
//                                     <label>Current Password:</label>
//                                     <input
//                                         type="password"
//                                         value={currentPassword}
//                                         onChange={(e) => setCurrentPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>New Password:</label>
//                                     <input
//                                         type="password"
//                                         value={newPassword}
//                                         onChange={(e) => setNewPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Confirm Password:</label>
//                                     <input
//                                         type="password"
//                                         value={confirmPassword}
//                                         onChange={(e) => setConfirmPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="profile-buttons">
//                                     <button onClick={handleSavePassword}>Сохранить</button>
//                                     <button onClick={handleCancelEditPassword}>Отмена</button>
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'purchaseHistory' && (
//                             <>
//                                 <h3>История покупок</h3>
//                                 {userOrders.map((order) => (
//                                     <div key={order._id} className="order-item">
//                                         <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
//                                         <p>Статус: {order.status}</p>
//                                         <p>Сумма заказа: {order.totalAmount}</p>
//                                         <p>Товары:</p>
//                                         <ul>
//                                             {order.products.map((product) => (
//                                                 <li key={product.product._id}>
//                                                     {product.product.name} - {product.quantity} шт. по {product.product.price} руб.
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                         <p>Адрес доставки: {order.address}</p>
//                                         <p>Номер телефона: {order.phoneNumber}</p>
//                                     </div>
//                                 ))}
//                             </>
//                         )}
//                     </div>
//                 ) : (
//                     // Если пользователь не аутентифицирован
//                     <div className="registration-notification">
//                         <p>
//                             Вы не зарегистрировались.{' '}
//                             <Link to="/login">Для получения личного профиля зарегистрируйтесь здесь</Link>.
//                         </p>
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
import { Link, useHistory } from 'react-router-dom';
import './Profile.css'; // Подключаем файл стилей

const Profile = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('editProfile');
    const [editPassword, setEditPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const history = useHistory();

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
                        // Устанавливаем редактированные значения, если они не установлены
                        setEditedAddress(data.profile?.address || '');
                        setEditedPhoneNumber(data.profile?.phoneNumber || '');
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
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching user orders:', error);
            }
        };
        const fetchPurchaseHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5500/api/orders/my-orders', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUserOrders(data);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            }
        };

        fetchProfile();
        fetchUserOrders();
        fetchPurchaseHistory();
    }, []);

    const ordersCopy = orders.slice();
    ordersCopy.reverse();
    const latestOrder = ordersCopy.find(order => order.user._id === user?._id);

    const handleEditProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5500/api/users/update-profile/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    address: editedAddress || latestOrder.address,
                    phoneNumber: editedPhoneNumber || latestOrder.phoneNumber,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                console.log('Profile updated successfully');
            } else {
                const errorMessage = await response.text(); // Получаем текст ответа
                console.error('Error updating profile:', errorMessage);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    const handleEditPassword = () => {
        setEditPassword(true);
    };

    const handleCancelEditPassword = () => {
        setEditPassword(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    const handleCancelEditProfile = () => {
        setEditedAddress(user.profile?.address || "");
        setEditedPhoneNumber(user.profile?.phoneNumber || "");
        setEditPassword(false);
    };

    const handleSavePassword = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5500/api/users/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userId: user._id,
                    currentPassword,
                    newPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Password updated successfully');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error updating password:', error);
        } finally {
            setEditPassword(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const handleLogout = () => {
        // Реализуйте функциональность выхода
        // Например, очистка localStorage и перенаправление на главную страницу
        localStorage.removeItem('token');
        setUser(null);
        history.push('/');
    };

    return (
        <div className="profile-container">
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
                    onClick={handleLogout}
                >
                    Выход
                </div>
            </div>
            {/* Содержимое профиля */}
            <div className="profile-content">
                <h2>Profile</h2>
                {user ? (
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
                                </div>
                                {latestOrder && (
                                    <>
                                        <div className="profile-input">
                                            <label>Address:</label>
                                            {editPassword ? (
                                                <input
                                                    type="text"
                                                    value={editedAddress || latestOrder.address}
                                                    onChange={(e) => setEditedAddress(e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={latestOrder.address || ''}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                        <div className="profile-input">
                                            <label>Phone Number:</label>
                                            {editPassword ? (
                                                <input
                                                    type="text"
                                                    value={editedPhoneNumber || latestOrder.phoneNumber}
                                                    onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={latestOrder.phoneNumber || ''}
                                                    readOnly
                                                />
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="profile-buttons">
                                    {editPassword ? (
                                        <>
                                            <button onClick={handleEditProfile}>Сохранить</button>
                                            <button onClick={handleCancelEditProfile}>Отмена</button>
                                        </>
                                    ) : (
                                        <button onClick={() => setEditPassword(true)}>Редактировать</button>
                                    )}
                                </div>
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
                            <>
                                <h3>История покупок</h3>
                                {userOrders.map((order) => (
                                    <div key={order._id} className="order-item">
                                        <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
                                        <p>Статус: {order.status}</p>
                                        <p>Сумма заказа: {order.totalAmount}</p>
                                        <p>Товары:</p>
                                        <ul>
                                            {order.products.map((product) => (
                                                <li key={product.product._id}>
                                                    {product.product.name} - {product.quantity} шт. по {product.product.price} руб.
                                                </li>
                                            ))}
                                        </ul>
                                        <p>Адрес доставки: {order.address}</p>
                                        <p>Номер телефона: {order.phoneNumber}</p>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                ) : (
                    // Если пользователь не аутентифицирован
                    <div className="registration-notification">
                        <p>
                            Вы не зарегистрировались.{' '}
                            <Link to="/login">Для получения личного профиля зарегистрируйтесь здесь</Link>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;


