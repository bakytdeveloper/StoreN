

import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Profile.css';
import {FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight, FaEye, FaEyeSlash} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faBan} from "@fortawesome/free-solid-svg-icons";



import {jwtDecode} from 'jwt-decode'; // Ensure you have jwt-decode installed


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
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setUser(null);
                    return;
                }

                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;

                if (userRole === 'seller') {
                    history.push('/sellerProfile');
                    return;
                }

                const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const profileData = await profileResponse.json();
                if (!profileResponse.ok) {
                    console.error(profileData.message);
                    toast.error('Ошибка загрузки профиля', { position: toast.POSITION.BOTTOM_RIGHT });
                    return;
                }

                setUser(profileData);
                setEditedName(profileData.name || '');
                setEditedEmail(profileData.email || '');

                // Fetch last order details
                const lastOrderResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/last-order/${profileData._id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const lastOrderData = await lastOrderResponse.json();
                if (lastOrderResponse.ok) {
                    setEditedAddress(lastOrderData.lastOrder?.address || '');
                    setEditedPhoneNumber(lastOrderData.lastOrder?.phoneNumber || '');
                } else {
                    console.error('Ошибка загрузки последнего заказа:', lastOrderData.message);
                    // toast.error('Ошибка загрузки последнего заказа', { position: toast.POSITION.BOTTOM_RIGHT });
                }
            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
                toast.error('Ошибка загрузки профиля', { position: toast.POSITION.BOTTOM_RIGHT });
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
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    const data = await response.json();
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
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/my-orders?page=${page}&perPage=${pageSize}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserOrders(data.orders);
                    setTotalPages(data.totalPages);
                } else {
                    const data = await response.json();
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
                    address: editedAddress || '',
                    phoneNumber: editedPhoneNumber || '',
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
        } finally {
            setEditPassword(false);
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
        setEditedAddress('');
        setEditedPhoneNumber('');
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
            if (response.ok) {
                toast.success('Пароль успешно обновлен', { position: toast.POSITION.BOTTOM_RIGHT });
            } else {
                const data = await response.json();
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

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage((prevPage) => Math.min(prevPage + 1, totalPages));
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prevPage) => Math.max(prevPage - 1, 1));
        }
    };

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return (
        <div className="profile-container">
            <div className="side">
                <div
                    style={{ fontWeight: "bold" }}
                    className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editProfile')}
                >
                    Редактировать профиль
                </div>
                <div
                    style={{ fontWeight: "bold" }}
                    className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editPassword')}
                >
                    Редактировать пароль
                </div>
                <div
                    style={{ fontWeight: "bold" }}
                    className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`}
                    onClick={() => setActiveTab('purchaseHistory')}
                >
                    История покупок
                </div>
                <div
                    style={{ fontWeight: "bold" }}
                    className="sidebar-item logout"
                    onClick={handleLogout}
                >
                    На главную
                </div>
            </div>

            <div className="profile-content">
                {user ? (
                    <div>
                        <h3 style={{ textAlign: "center" }}>Здравствуйте, {user.name} 👋 ! </h3>

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
                                <div className="profile-input">
                                    <label>Address:</label>
                                    {editPassword ? (
                                        <input
                                            type="text"
                                            value={editedAddress}
                                            onChange={(e) => setEditedAddress(e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={editedAddress}
                                            readOnly
                                        />
                                    )}
                                </div>
                                <div className="profile-input">
                                    <label>Phone Number:</label>
                                    {editPassword ? (
                                        <input
                                            type="text"
                                            value={editedPhoneNumber}
                                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={editedPhoneNumber}
                                            readOnly
                                        />
                                    )}
                                </div>
                                <div className="profile-buttons">
                                    {editPassword ? (
                                        <>
                                            <button className="addProfile" onClick={handleEditProfile}>Изменить</button>
                                            <button className="noAdd" onClick={handleCancelEditProfile}>Отменить</button>
                                        </>
                                    ) : (
                                        <button className="updateProfile" onClick={() => setEditPassword(true)}>Редактировать профиль</button>
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
                                    <button className="addProfile" onClick={handleSavePassword}>Изменить</button>
                                    <button className="noAdd" onClick={handleCancelEditPassword}>Отменить</button>
                                </div>
                            </>
                        )}
                        {activeTab === 'purchaseHistory' && (
                            <div className="purchase-history">
                                <table className="order-history-table">
                                    <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Дата создания</th>
                                        <th>Статус</th>
                                        <th>Продукты</th>
                                        <th>Общая сумма</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userOrders.map((order, index) => (
                                        <tr key={order._id}>
                                            <td>{(page - 1) * pageSize + index + 1}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <ul>
                                                    {order.products.map(item => (
                                                        <li key={item.product?._id}>
                                                            {item.product?.name} - Количество: {item.quantity} - Цена: {item.product?.price}сом
                                                            {/*<hr />*/}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>{order.totalAmount}сом</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <div className="pagination-my-history">
                                    <button
                                        className={`pagination-my-history-prev ${!hasPrevPage ? 'disabled' : ''}`}
                                        onClick={handlePrevPage}
                                        disabled={!hasPrevPage}
                                    >
                                        Назад
                                    </button>
                                    <span className="pagination-my-history-pages">Страница {page} из {totalPages}</span>
                                    <button
                                        className={`pagination-my-history-next ${!hasNextPage ? 'disabled' : ''}`}
                                        onClick={handleNextPage}
                                        disabled={!hasNextPage}
                                    >
                                        Вперёд
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="registration-notification" style={{ marginTop: "130px", textAlign: "center" }}>
                        {/*<span>*/}
                            Для получения своего личного профиля.{' '}
                            <Link to="/login">
                                <span className="registration-notification-span">Нужно Залогиниться, после регистрации "Здесь"</span>
                                {/*<p>Нужно Залогиниться, после регистрации "Здесь"</p>*/}
                            </Link>.
                        {/*</span>*/}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;