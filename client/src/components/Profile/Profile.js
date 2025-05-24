
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Profile.css';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {jwtDecode} from 'jwt-decode';


const Profile = ({ setShowSidebar }) => {
    const [user, setUser] = useState(null);
    // eslint-disable-next-line
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
    // eslint-disable-next-line
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const history = useHistory();

    // Добавляем объект с переводами статусов
    const statusTranslations = {
        pending: "В ожидании",
        inProgress: "В процессе",
        completed: "Завершено",
        cancelled: "Отменено"
    };

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    history.push('/login');
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

                if (!profileResponse.ok) {
                    throw new Error('Ошибка загрузки профиля');
                }

                const profileData = await profileResponse.json();
                if (!profileData) {
                    history.push('/login');
                    return;
                }

                setUser(profileData);
                setEditedName(profileData.name || '');
                setEditedEmail(profileData.email || '');

                const lastOrderResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/last-order/${profileData._id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (lastOrderResponse.ok) {
                    const lastOrderData = await lastOrderResponse.json();
                    setEditedAddress(lastOrderData.lastOrder?.address || '');
                    setEditedPhoneNumber(lastOrderData.lastOrder?.phoneNumber || '');
                } else if (lastOrderResponse.status === 404) {
                    console.log('У пользователя нет заказов');
                    setEditedAddress('');
                    setEditedPhoneNumber('');
                } else {
                    console.error('Ошибка загрузки последнего заказа:', await lastOrderResponse.json().message);
                }

            } catch (error) {
                console.error('Ошибка загрузки профиля:', error);
                toast.error('Ошибка загрузки профиля', { position: toast.POSITION.BOTTOM_RIGHT });
                history.push('/login');
            }
        };

        const fetchUserOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const role = localStorage.getItem('role');

                if (!token) {
                    history.push('/login');
                    return;
                }

                // Используем правильный эндпоинт в зависимости от роли
                const endpoint = role === 'customer'
                    ? '/api/orders/my-orders'
                    : '/api/orders/seller/purchase-history';

                const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Ошибка загрузки заказов');
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Ошибка загрузки заказов:', error.message);
                toast.error(error.message || 'Ошибка загрузки заказов');
            }
        };

        const fetchPurchaseHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                const role = localStorage.getItem('role');

                if (role === 'seller') {
                    return;
                }

                if (!token) {
                    history.push('/login');
                    return;
                }

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/orders/my-orders?page=${page}&perPage=${pageSize}`,
                    {
                        headers: { 'Authorization': `Bearer ${token}` }
                    }
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Ошибка загрузки истории покупок');
                }

                const data = await response.json();
                setUserOrders(data.orders);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Ошибка загрузки истории покупок:', error.message);
                toast.error(error.message || 'Ошибка загрузки истории покупок');
            }
        };

        fetchProfile();
        fetchUserOrders();
        fetchPurchaseHistory();
        // eslint-disable-next-line
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
                console.error('Ошибка при обновлении профиля:', errorMessage);
                toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error('Ошибка при обновлении профиля:', error);
            toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
        } finally {
            setEditPassword(false);
        }
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
            console.error('Ошибка при обновлении пароля:', error);
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
                        <h3 style={{ textAlign: "center" }}>Здравствуйте, {user.name}!</h3>

                        {activeTab === 'editProfile' && (
                            <>
                                <div className="profile-input">
                                    <label>Имя:</label>
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
                                {!!editedAddress.length && (
                                    <div className="profile-input">
                                        <label>Адрес доставки:</label>
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
                                )}
                                {!!editedPhoneNumber.length && (
                                    <div className="profile-input">
                                        <label>№ Телефона:</label>
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
                                )}
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
                                    <label>Текущий пароль:</label>
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
                                    <label>Новый пароль:</label>
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
                                    <label>Подтвердите пароль:</label>
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
                                    <button className="noAdd" onClick={handleCancelEditPassword}>Отменить</button>
                                    <button className="addProfile" onClick={handleSavePassword}>Изменить</button>
                                </div>
                            </>
                        )}
                        {activeTab === 'purchaseHistory' && (
                            <div className="purchase-history">
                                <table className="order-history-table">
                                    <thead>
                                    <tr className="purchase-history-title">
                                        <th>№</th>
                                        <th>Дата создания</th>
                                        <th>Статус</th>
                                        <th>Продукты</th>
                                        <th>Общая сумма</th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {userOrders.map((order, index) => {
                                        // Функция для форматирования даты
                                        const formatDate = (date) => {
                                            const d = new Date(date);
                                            const day = d.getDate().toString().padStart(2, '0');

                                            // Названия месяцев на русском языке
                                            const months = [
                                                'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
                                                'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
                                            ];
                                            const month = months[d.getMonth()]; // Получаем название месяца
                                            const year = d.getFullYear();

                                            return `${day} ${month} ${year}г.`;
                                        };

                                        return (
                                            <tr key={order._id}>
                                                <td>{(page - 1) * pageSize + index + 1}</td>
                                                <td>{formatDate(order.date)}</td>
                                                <td>{statusTranslations[order.status] || order.status}</td>
                                                <td>
                                                    <ul>
                                                        {order.products.map(item => (
                                                            <li key={`${item.product?._id}-${item}`}
                                                                style={{ padding: "0 5px", background:"none" }}
                                                            >
                                                                {item.product?.name || item.name} - Количество: {item.quantity} - Цена: {item.product?.price || item.price} сом
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>{order.totalAmount} сом</td>
                                            </tr>
                                        );
                                    })}
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
                        Для получения своего личного профиля.{' '}
                        <Link to="/login">
                            <span className="registration-notification-span">Нужно Залогиниться, после регистрации "Здесь"</span>
                        </Link>.
                    </div>
                )}
            </div>
        </div>
    );



};

export default Profile;