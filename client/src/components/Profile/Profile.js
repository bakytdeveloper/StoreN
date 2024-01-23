


//
// // src/components/Profile/Profile.js
// import React, { useEffect, useState } from 'react';
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
//                 const response = await fetch('http://localhost:5500/api/orders/orders', {
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
//         fetchProfile();
//         fetchUserOrders();
//     }, []);
//
//     const ordersCopy = orders.slice();
//     ordersCopy.reverse();
//     const latestOrder = ordersCopy.find(order => order.user._id === user?._id);
//
//     console.log( "ЭТО ПОСЛЕДНИЙ ЭЛЕМЕНТ" , latestOrder)
//     // let {_id} = {...latestOrder};
//     // console.log( "ЭТО ID ЭЛЕМЕНТ" , _id)
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
//                     address: editedAddress,
//                     phoneNumber: editedPhoneNumber,
//                 }),
//             });
//
//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.user);
//                 console.log('Profile updated successfully');
//             } else {
//                 const errorMessage = await response.text(); // Получаем текст ответа
//                 console.error('Error updating profile:', errorMessage);
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
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
//     return (
//         <div className="profile-container">
//             <h2>Profile</h2>
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
//                                 {latestOrder && (
//                                     <>
//                                         <div className="profile-input">
//                                             <label>Address:</label>
//                                             {editPassword ? (
//                                                 <input
//                                                     type="text"
//                                                     value={editedAddress}
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
//                                                     value={editedPhoneNumber}
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
//                                             <button onClick={handleEditProfile}>Сохранить</button>
//                                             <button onClick={() => console.log('Cancel clicked')}>Отмена</button>
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
    const [activeTab, setActiveTab] = useState('editProfile');
    const [editPassword, setEditPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');

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

        fetchProfile();
        fetchUserOrders();
    }, []);

    const ordersCopy = orders.slice();
    ordersCopy.reverse();
    const latestOrder = ordersCopy.find(order => order.user._id === user?._id);

    console.log("ЭТО ПОСЛЕДНИЙ ЭЛЕМЕНТ", latestOrder);

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
                    address: editedAddress,
                    phoneNumber: editedPhoneNumber,
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
                                </div>
                                {latestOrder && (
                                    <>
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
                                                    value={editedPhoneNumber}
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
                                            <button onClick={() => console.log('Cancel clicked')}>Отмена</button>
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
                            <p>Coming soon...</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;

