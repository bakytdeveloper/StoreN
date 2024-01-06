// src/components/LoginRegister/LoginRegister.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);

    const history = useHistory();

    const handleLoginRegister = async () => {
        const url = isRegisterMode ? '/register' : '/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Успешная регистрация или вход
                // Сохранить токен в localStorage или cookies
                localStorage.setItem('token', data.token);

                // Перейти на страницу профиля или другую нужную
                history.push('/profile');
            } else {
                console.error(data.message);
                // Обработка ошибок, например, вывод сообщения об ошибке
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
            {isRegisterMode && (
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            )}
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLoginRegister}>
                {isRegisterMode ? 'Register' : 'Login'}
            </button>
            <p onClick={() => setRegisterMode(!isRegisterMode)}>
                {isRegisterMode ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
            </p>
        </div>
    );
};

export default LoginRegister;
