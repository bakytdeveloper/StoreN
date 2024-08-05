import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SellerProfile.css';
import SellerProductsHide from "./SellerProductsHide";

const SellerProfile = ({ setShowSidebar }) => {
    const [seller, setSeller] = useState(null);
    const [activeTab, setActiveTab] = useState('editProfile');
    const [editedCompanyName, setEditedCompanyName] = useState('');
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editPassword, setEditPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null); // 'hide' или 'show'

    // const [isProductsVisible, setIsProductsVisible] = useState(true);

    const history = useHistory();


    const handleShowModal = (action) => {
        setModalAction(action);
        setShowModal(true);
    };

    const handleConfirm = async () => {
        setShowModal(false);
        if (modalAction) {
            await handleToggleProductsVisibility();
        }
    };

    const handleCancel = () => {
        setShowModal(false);
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            // Если отсутствует токен или роль не является "seller", перенаправляем на страницу входа
            history.push('/login');
        }
    }, [history]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            history.push('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/seller/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (!data) {
                        throw new Error('Профиль не найден');
                    }

                    console.log("DATA:",data)

                    if (data.status === 'suspend') {
                        toast.error('Ваш аккаунт приостановлен');
                        history.push('/login');
                        return;
                    }
                    setSeller(data);
                    setEditedCompanyName(data.companyName || '');
                    setEditedName(data.name || '');
                    setEditedEmail(data.email || '');
                    setEditedAddress(data.address || '');
                    setEditedPhoneNumber(data.phoneNumber || '');
                } else if (response.status === 404) {
                    // Профиль не найден, возможный случай удаления
                    toast.error('Ваш аккаунт был удален');
                    history.push('/login');
                } else {
                    console.error('Error fetching seller profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching seller profile:', error);
                toast.error('Ошибка при загрузке профиля');
                history.push('/login');
            }
        };
        fetchProfile();
    }, [history]);


    const handleEditProfile = async () => {
        // Обновляем профиль продавца
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/update-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    companyName: editedCompanyName || seller.companyName,
                    name: editedName || seller.name,
                    email: editedEmail || seller.email,
                    address: editedAddress || seller.address,
                    phoneNumber: editedPhoneNumber || seller.phoneNumber,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setSeller(data);
                toast.success('Профиль успешно обновлен', { position: toast.POSITION.BOTTOM_RIGHT });
            } else {
                const errorMessage = await response.text();
                console.error('Error updating seller profile:', errorMessage);
                toast.error('Ошибка при обновлении профиля', { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error('Error updating seller profile:', error);
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


    const handleSavePassword = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/update-password`, {
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
                const errorMessage = await response.text();
                console.error('Error updating seller password:', errorMessage);
                toast.error('Ошибка при обновлении пароля', { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error('Error updating seller password:', error);
            toast.error('Ошибка при обновлении пароля', { position: toast.POSITION.BOTTOM_RIGHT });
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
        // localStorage.removeItem('token');
        // setSeller(null);
        history.push('/');
    };

    useEffect(() => {
        setShowSidebar(true);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(true); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);

    const handleSellerProducts = () => {
        // Перенаправляем пользователя на страницу с товарами продавца
        history.push('/seller/products');
    };

    const handleSellerOrders = () => {
        // Перенаправляем пользователя на страницу с товарами продавца
        history.push('/seller/sales-history');
    };



    const handleToggleProductsVisibility = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Добавьте эту строку
            console.log('Seller ID:', seller._id); // Добавьте эту строку
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/${seller._id}/toggle-products-visibility`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSeller(prevSeller => ({
                    ...prevSeller,
                    isProductsVisible: data.isProductsVisible,
                    lastVisibilityChange: data.lastVisibilityChange
                }));
                toast.success(`Товары ${data.isProductsVisible ? 'отображаются' : 'скрыты'}`, { position: toast.POSITION.BOTTOM_RIGHT });
            } else {
                const errorMessage = await response.text();
                console.error('Error toggling products visibility:', errorMessage);
                toast.error('Ошибка при изменении видимости товаров', { position: toast.POSITION.BOTTOM_RIGHT });
            }
        } catch (error) {
            console.error('Error toggling products visibility:', error);
            toast.error('Ошибка при изменении видимости товаров', { position: toast.POSITION.BOTTOM_RIGHT });
        }
    };

    return (
        <div className="profile-container">
            <div className="side">
                <div className={`sidebar-item ${activeTab === 'editProfile' ? 'active' : ''}`} onClick={() => setActiveTab('editProfile')}>
                    Редактировать профиль
                </div>
                <div className={`sidebar-item ${activeTab === 'editPassword' ? 'active' : ''}`} onClick={() => setActiveTab('editPassword')}>
                    Редактировать пароль
                </div>
                <div className={`sidebar-item ${activeTab === 'sellerProducts' ? 'active' : ''}`} onClick={handleSellerProducts} >
                    Витрина
                </div>
                <div className={`sidebar-item ${activeTab === 'purchaseHistory' ? 'active' : ''}`} onClick={handleSellerOrders}>
                    История продаж
                </div>

                <div className="visibility-toggle">
                    <button onClick={() => handleShowModal(seller && seller.isProductsVisible ? 'hide' : 'show')}>
                        {seller && seller.isProductsVisible ? (
                            <>
                                Скрыть товары <FaEyeSlash />
                            </>
                        ) : (
                            <>
                                Показать товары <FaEye />
                            </>
                        )}
                    </button>
                    <span>Последнее изменение: {seller && new Date(seller.lastVisibilityChange).toLocaleString()}</span>
                </div>

                <div className="sidebar-item logout" onClick={handleLogout}>
                    На главную
                </div>
            </div>

            <div className="profile-content" >
                {seller ? (
                    <div>
                        <h3>Профиль Компании/ИП, "{seller.companyName}"</h3>

                        {activeTab === 'editProfile' && (
                            <div>
                                <div>
                                    <label>Компания/ИП:</label>
                                    <input type="text" value={editedCompanyName} onChange={(e) => setEditedCompanyName(e.target.value)} />
                                </div>
                                <div>
                                    <label>Имя:</label>
                                    <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                </div>
                                <div>
                                    <label>Email:</label>
                                    <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label>Адрес:</label>
                                    <input type="text" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} />
                                </div>
                                <div>
                                    <label>Номер телефона:</label>
                                    <input type="text" value={editedPhoneNumber} onChange={(e) => setEditedPhoneNumber(e.target.value)} />
                                </div>
                                <button onClick={handleEditProfile}>Сохранить</button>
                            </div>
                        )}
                        {activeTab === 'editPassword' && (
                            <div>
                                <div>
                                    <label>Текущий пароль:</label>
                                    <input type={showPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                                    <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                <div>
                                    <label>Новый пароль:</label>
                                    <input type={showPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                    <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                <div>
                                    <label>Подтвердите новый пароль:</label>
                                    <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    <div className="password-icon" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                                <div className="seller-profile-buttons">
                                    <button className="seller-profile-buttons-add" onClick={handleSavePassword}>Сохранить</button>
                                    <button className="seller-profile-buttons-none" onClick={handleCancelEditPassword}>Отмена</button>
                                </div>
                            </div>
                        )}
                        {activeTab === 'purchaseHistory' && (
                            <div>
                                <h4>Это ваша история заказов</h4>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Дата</th>
                                        <th>Статус</th>
                                        <th>Товары</th>
                                        <th>Сумма</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {seller.orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <ul>
                                                    {order.products.map((product) => (
                                                        <li key={product._id}>{product.name}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>{order.totalAmount}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="registration-notification">
                        <p>Для доступа к профилю необходимо войти в систему.</p>
                        <p>Пожалуйста, <Link to="/login">войдите</Link> или <Link to="/register">зарегистрируйтесь</Link>.</p>
                    </div>
                )}
            </div>

            {/* Модальное окно */}
            <SellerProductsHide
                show={showModal}
                actionText={modalAction === 'hide' ? 'скрыть товары' : 'показать товары'}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </div>
    );
};

export default SellerProfile;
