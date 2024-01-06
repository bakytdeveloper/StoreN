// src/components/Profile/Profile.js
import React, { useEffect, useState } from 'react';

const Profile = () => {
    const [user, setUser] = useState(null);

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
                        console.error('Full response:', response); // Вывод полного ответа в консоль
                        // Обработка ошибок, например, перенаправление на страницу входа
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Profile</h2>
            {user && (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    {/* Другие поля профиля */}
                </div>
            )}
        </div>
    );
};

export default Profile;
