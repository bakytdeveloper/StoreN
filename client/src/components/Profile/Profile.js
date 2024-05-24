
// require('dotenv').config(); // Import and configure dotenv to load .env file

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Profile.css';
import {FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faBan} from "@fortawesome/free-solid-svg-icons";


// const Profile = ({ setShowSidebar }) => {
//     const [user, setUser] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [userOrders, setUserOrders] = useState([]);
//     const [activeTab, setActiveTab] = useState('editProfile');
//     const [editPassword, setEditPassword] = useState(false);
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [editedAddress, setEditedAddress] = useState('');
//     const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
//     const [editedName, setEditedName] = useState('');
//     const [editedEmail, setEditedEmail] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const history = useHistory();
//
//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     setUser(null);
//                     return;
//                 }
//                 if (token) {
//                     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
//                         method: 'GET',
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         },
//                     });
//                     const data = await response.json();
//                     if (response.ok) {
//                         setUser(data);
//                         setEditedAddress(data.profile?.address || '');
//                         setEditedPhoneNumber(data.profile?.phoneNumber || '');
//                         setEditedName(data.name || '');
//                         setEditedEmail(data.email || '');
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
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 const data = await response.json();
//                 if (response.ok) {
//                     setOrders(data);
//                 } else {
//                     console.error(data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user orders:', error);
//             }
//         };
//
//         const fetchPurchaseHistory = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 if (!token) {
//                     setUser(null);
//                     return;
//                 }
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/my-orders`, {
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
//                 console.error('Error fetching purchase history:', error);
//             }
//         };
//
//         fetchProfile();
//         fetchUserOrders();
//         fetchPurchaseHistory();
//     }, []);
//
//     const ordersCopy = orders.slice();
//     ordersCopy.reverse();
//     const latestOrder = ordersCopy.find(order => order.user?._id === user?._id);

//     const handleEditProfile = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update-profile/${user._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     name: editedName || user.name,
//                     email: editedEmail || user.email,
//                     address: editedAddress || user.profile?.address || '', // Используем адрес из профиля, если есть
//                     phoneNumber: editedPhoneNumber || user.profile?.phoneNumber || '', // Используем номер телефона из профиля, если есть
//                 }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.user);
//                 toast.success('Профиль успешно обновлен', { position: toast.POSITION.BOTTOM_RIGHT });
//             } else {
//                 const errorMessage = await response.text();
//                 console.error('Error updating profile:', errorMessage);
//                 toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
//         }
//     };
//
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
//         setEditedName(user.name || '');
//         setEditedEmail(user.email || '');
//         setEditedAddress(user.profile?.address || '');
//         setEditedPhoneNumber(user.profile?.phoneNumber || '');
//         setEditPassword(false);
//     };
//
//     const handleSavePassword = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update-password/${user._id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     currentPassword,
//                     newPassword,
//                 }),
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 toast.success('Пароль успешно обновлен', { position: toast.POSITION.BOTTOM_RIGHT });
//             } else {
//                 console.error(data.message);
//                 toast.error('Ошибка при обновлении пароля', { position: toast.POSITION.BOTTOM_RIGHT });
//             }
//         } catch (error) {
//             console.error('Error updating password:', error);
//             toast.error('Ошибка при обновлении пароля', { position: toast.POSITION.BOTTOM_RIGHT });
//         } finally {
//             setEditPassword(false);
//             setCurrentPassword('');
//             setNewPassword('');
//             setConfirmPassword('');
//         }
//     };
//
//     const handleLogout = () => {
//         // Реализуйте функциональность выхода
//         // Например, очистка localStorage и перенаправление на главную страницу
//         // localStorage.removeItem('token');
//         // setUser(null);
//         history.push('/');
//     };
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token && token === "adminToken") {
//             history.push('/admin');
//         }
//     }, [history]);
//
//     // Обновление состояния showSidebar на странице логина и регистрации
//     useEffect(() => {
//         setShowSidebar(true);
//         // Возвращаем функцию для очистки (аналог componentWillUnmount)
//         return () => {
//             setShowSidebar(true); // Восстановим значение при размонтировании компонента
//         };
//     }, [setShowSidebar]);
//
//     return (
//         <div className="profile-container">
//             <div className="side">
//                 <div style={{fontWeight:"bold"}}
//                      className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
//                      onClick={() => setActiveTab('editProfile')}
//                 >
//                     Редактировать профиль
//                 </div>
//                 <div
//                     style={{fontWeight:"bold"}}
//                     className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('editPassword')}
//                 >
//                     Редактировать пароль
//                 </div>
//                 <div
//                     style={{fontWeight:"bold"}}
//                     className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
//                     onClick={() => setActiveTab('purchaseHistory')}
//                 >
//                     История <br/>покупок
//                 </div>
//                 <div
//                     style={{fontWeight:"bold"}}
//                     className="sidebar-item logout"
//                     onClick={handleLogout}
//                 >
//                     На главную
//                 </div>
//             </div>
//
//             <div className="profile-content" >
//                 {user ? (
//                     <div>
//                         <h3 style={{textAlign: "center"}}>Здравствуйте, {user.name} 👋 ! </h3>
//                         {/*<h4 style={{textAlign: "center"}}>Я приготовил ваш профиль 🗂️ </h4>*/}
//
//                            {activeTab === 'editProfile' && (
//                     <>
//                                 <div className="profile-input">
//                                     <label>Name:</label>
//                                     {editPassword ? (
//                                         <input
//                                             type="text"
//                                             value={editedName}
//                                             onChange={(e) => setEditedName(e.target.value)}
//                                         />
//                                     ) : (
//                                         <input
//                                             type="text"
//                                             value={user.name}
//                                             readOnly
//                                         />
//                                     )}
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Email:</label>
//                                     {editPassword ? (
//                                         <input
//                                             type="text"
//                                             value={editedEmail}
//                                             onChange={(e) => setEditedEmail(e.target.value)}
//                                         />
//                                     ) : (
//                                         <input
//                                             type="text"
//                                             value={user.email}
//                                             readOnly
//                                         />
//                                     )}
//                                 </div>
//                                 {latestOrder && (
//                                     <>
//                                         <div className="profile-input">
//                                             <label>Address:</label>
//                                             {editPassword ? (
//                                                 <input
//                                                     type="text"
//                                                     value={editedAddress || latestOrder.address || ''}
//                                                     onChange={(e) => setEditedAddress(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <input
//                                                     type="text"
//                                                     value={latestOrder.address || ''}
//                                                     readOnly
//                                                 />
//                                             )}
//                                         </div>
//                                         <div className="profile-input">
//                                             <label>Phone Number:</label>
//                                             {editPassword ? (
//                                                 <input
//                                                     type="text"
//                                                     value={editedPhoneNumber || latestOrder.phoneNumber || ''}
//                                                     onChange={(e) => setEditedPhoneNumber(e.target.value)}
//                                                 />
//                                             ) : (
//                                                 <input
//                                                     type="text"
//                                                     value={latestOrder.phoneNumber || ''}
//                                                     readOnly
//                                                 />
//                                             )}
//                                         </div>
//                                     </>
//                                 )}
//                                 <div className="profile-buttons">
//                                     {editPassword ? (
//                                         <>
//                                             <button className="addProfile" onClick={handleEditProfile}>Изменить</button>
//                                             <button className="noAdd" onClick={handleCancelEditProfile}>Отменить</button>
//                                         </>
//                                     ) : (
//                                         <button className="updateProfile" onClick={() => setEditPassword(true)}>&#128736;</button>
//                                     )}
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'editPassword' && (
//                             <>
//                                 <div className="profile-input">
//                                     <label>Current Password:</label>
//                                     <div className="password-input-container">
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             value={currentPassword}
//                                             onChange={(e) => setCurrentPassword(e.target.value)}
//                                         />
//                                         <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
//                                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>New Password:</label>
//                                     <div className="password-input-container">
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             value={newPassword}
//                                             onChange={(e) => setNewPassword(e.target.value)}
//                                         />
//                                         <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
//                                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="profile-input">
//                                     <label>Confirm Password:</label>
//                                     <div className="password-input-container">
//                                         <input
//                                             type={showPassword ? 'text' : 'password'}
//                                             value={confirmPassword}
//                                             onChange={(e) => setConfirmPassword(e.target.value)}
//                                         />
//                                         <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
//                                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="profile-buttons">
//                                     <button className="addProfile" onClick={handleSavePassword} >&#128396;</button>
//                                     <button className="noAdd" onClick={handleCancelEditPassword}>&#128465;</button>
//                                 </div>
//                             </>
//                         )}
//                         {activeTab === 'purchaseHistory' && (
//                             <>
//                                 <h4 style={{textAlign: "center"}}>Это ваша история заказов</h4>
//                                 <table className="order-history-table">
//                                     <thead >
//                                     <tr>
//                                         <th>Дата</th>
//                                         <th>Статус</th>
//                                         <th>Товары</th>
//                                         <th>Сумма</th>
//
//                                     </tr>
//                                     </thead>
//                                     <tbody>
//
//                                     {userOrders.slice().reverse().map((order) => (
//                                         // {userOrders.map((order) => (
//                                         <tr key={order._id}>
//                                             <td>{new Date(order.date).toLocaleDateString()}</td>
//                                             <td>{order.status}</td>
//                                             {/*<td>{order.totalAmount}</td>*/}
//                                             <td>
//                                                 <ul>
//                                                     {order.products.map((product) => (
//                                                         <span key={product.product._id}>
//                                                             {product.product.name} - {product.quantity} шт. по {product.product.price} руб.
//                                                       <hr />
//                                                         </span>
//
//                                                     ))}
//                                                 </ul>
//                                             </td>
//                                             <td style={{fontWeight:"bold"}}>{order.totalAmount}</td>
//
//                                         </tr>
//                                     ))}
//                                     </tbody>
//                                 </table>
//                             </>
//                         )}
//                     </div>
//                 ) : (
//                     <div className="registration-notification" style={{ marginTop: "130px", textAlign: "center" }}>
//                         <span>
//                             Для получения своего личного профиля.{' '}
//                             <Link to="/login">
//                                 <p>Нужно Залогиниться, после регистрации "Здесь"</p></Link>.
//                         </span>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default Profile;



const Profile = ({ setShowSidebar }) => {
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
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [page, setPage] = useState(1); // Страница для пагинации
    const [pageSize, setPageSize] = useState(2); // Размер страницы для пагинации
    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setUser(null);
                    return;
                }
                if (token) {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setUser(data);
                        setEditedAddress(data.profile?.address || '');
                        setEditedPhoneNumber(data.profile?.phoneNumber || '');
                        setEditedName(data.name || '');
                        setEditedEmail(data.email || '');
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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders`, {
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
                if (!token) {
                    setUser(null);
                    return;
                }
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/my-orders?page=${page}&pageSize=${pageSize}`, {
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
    }, [page, pageSize]);

    const handleEditProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update-profile/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: editedName || user.name,
                    email: editedEmail || user.email,
                    address: editedAddress || user.profile?.address || '', // Используем адрес из профиля, если есть
                    phoneNumber: editedPhoneNumber || user.profile?.phoneNumber || '', // Используем номер телефона из профиля, если есть
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                toast.success('Профиль успешно обновлен', { position: toast.POSITION.BOTTOM_RIGHT });
            } else {
                const errorMessage = await response.text();
                console.error('Error updating profile:', errorMessage);
                toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
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
        setEditedName(user.name || '');
        setEditedEmail(user.email || '');
        setEditedAddress(user.profile?.address || '');
        setEditedPhoneNumber(user.profile?.phoneNumber || '');
        setEditPassword(false);
    };

    const handleSavePassword = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/update-password/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('Пароль успешно обновлен', { position: toast.POSITION.BOTTOM_RIGHT });
            } else {
                console.error(data.message);
                toast.error('Ошибка при обновлении пароля', { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error('Ошибка при обновлении пароля', { position: toast.POSITION.BOTTOM_RIGHT });
        } finally {
            setEditPassword(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    };

    const handleLogout = () => {
        history.push('/');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token === "adminToken") {
            history.push('/admin');
        }
    }, [history]);

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);


    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    // Проверка на наличие следующей и предыдущей страницы
    const hasNextPage = userOrders.hasNextPage || page < pageSize;
    const hasPrevPage = page > 1;


    const ordersCopy = orders.slice();
    ordersCopy.reverse();
    const latestOrder = ordersCopy.find(order => order.user?._id === user?._id);


    return (
        <div className="profile-container">
            <div className="side">
                <div style={{fontWeight:"bold"}}
                     className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
                     onClick={() => setActiveTab('editProfile')}
                >
                    Редактировать профиль
                </div>
                <div
                    style={{fontWeight:"bold"}}
                    className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editPassword')}
                >
                    Редактировать пароль
                </div>
                <div
                    style={{fontWeight:"bold"}}
                    className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('purchaseHistory')}
                >
                    История <br/>покупок
                </div>
                <div
                    style={{fontWeight:"bold"}}
                    className="sidebar-item logout"
                    onClick={handleLogout}
                >
                    На главную
                </div>
            </div>

            <div className="profile-content" >
                {user ? (
                    <div>
                        <h3 style={{textAlign: "center"}}>Здравствуйте, {user.name} 👋 ! </h3>
                        {/*<h4 style={{textAlign: "center"}}>Я приготовил ваш профиль 🗂️ </h4>*/}

                        {activeTab === 'editProfile' && (
                            <>
                                <div className="profile-input">
                                    <label>Name:</label>
                                    {editPassword ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={user.name}
                                            readOnly
                                        />
                                    )}
                                </div>
                                <div className="profile-input">
                                    <label>Email:</label>
                                    {editPassword ? (
                                        <input
                                            type="text"
                                            value={editedEmail}
                                            onChange={(e) => setEditedEmail(e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={user.email}
                                            readOnly
                                        />
                                    )}
                                </div>
                                {latestOrder && (
                                    <>
                                        <div className="profile-input">
                                            <label>Address:</label>
                                            {editPassword ? (
                                                <input
                                                    type="text"
                                                    value={editedAddress || latestOrder.address || ''}
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
                                                    value={editedPhoneNumber || latestOrder.phoneNumber || ''}
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
                                            <button className="addProfile" onClick={handleEditProfile}>Изменить</button>
                                            <button className="noAdd" onClick={handleCancelEditProfile}>Отменить</button>
                                        </>
                                    ) : (
                                        <button className="updateProfile" onClick={() => setEditPassword(true)}>&#128736;</button>
                                    )}
                                </div>
                            </>
                        )}
                        {activeTab === 'editPassword' && (
                            <>
                                <div className="profile-input">
                                    <label>Current Password:</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-input">
                                    <label>New Password:</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-input">
                                    <label>Confirm Password:</label>
                                    <div className="password-input-container">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-buttons">
                                    <button className="addProfile" onClick={handleSavePassword} >&#128396;</button>
                                    <button className="noAdd" onClick={handleCancelEditPassword}>&#128465;</button>
                                </div>
                            </>
                        )}
                        {activeTab === 'purchaseHistory' && (
                            <>
                                <h4 style={{textAlign: "center"}}>Это ваша история заказов</h4>
                                <table className="order-history-table">
                                    <thead >
                                    <tr>
                                        <th>Дата</th>
                                        <th>Статус</th>
                                        <th>Товары</th>
                                        <th>Сумма</th>

                                    </tr>
                                    </thead>
                                    <tbody>

                                    {userOrders.orders?.map((order) => (
                                        <tr key={order._id}>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <ul>
                                                    {order.products.map((product) => (
                                                        <span key={product.product._id}>
                                                            {product.product.name} - {product.quantity} шт. по {product.product.price} руб.
                                                      <hr />
                                                        </span>

                                                    ))}
                                                </ul>
                                            </td>
                                            <td style={{fontWeight:"bold"}}>{order.totalAmount}</td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="pagination-buttons-users-profile">
                                    {/* Кнопка предыдущей страницы */}
                                    <button className="pagination-buttons-users-profile-prev" onClick={handlePrevPage} disabled={!hasPrevPage}>
                                        {hasPrevPage ? <FontAwesomeIcon icon={faArrowLeft} /> : <FontAwesomeIcon icon={faBan} />} {/* Символ пустой предыдущей страницы */}
                                    </button>
                                    {/* Счётчик страниц */}
                                    <span>Страница {page} из {pageSize}</span>
                                    {/* Кнопка следующей страницы */}
                                    <button className="pagination-buttons-users-profile-next" onClick={handleNextPage} disabled={!hasNextPage}>
                                        {hasNextPage ? <FontAwesomeIcon icon={faArrowRight} /> : <FontAwesomeIcon icon={faBan} />} {/* Символ пустой следующей страницы */}
                                    </button>
                                </div>


                                {/*<div  className="sales-history-pagination">*/}
                                {/*    <button className="sales-history-pagination-prev" onClick={handlePrevPage} disabled={isPrevDisabled}>*/}
                                {/*        {isPrevDisabled ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faArrowLeft} />}*/}
                                {/*    </button>*/}
                                {/*    <span>Страница {page}</span>*/}
                                {/*    <button className="sales-history-pagination-next" onClick={handleNextPage} disabled={isNextDisabled}>*/}
                                {/*        {isNextDisabled ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faArrowRight} />}*/}
                                {/*    </button>*/}
                                {/*</div>*/}

                            </>
                        )}
                    </div>
                ) : (
                    <div className="registration-notification" style={{ marginTop: "130px", textAlign: "center" }}>
                        <span>
                            Для получения своего личного профиля.{' '}
                            <Link to="/login">
                                <p>Нужно Залогиниться, после регистрации "Здесь"</p></Link>.
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;