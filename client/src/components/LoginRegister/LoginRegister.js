





// src/components/LoginRegister/LoginRegister.js
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';

const LoginRegister = ({ showSidebar, setShowSidebar }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);
    const history = useHistory();


    const handleLoginRegister = async () => {
        const url = isRegisterMode
            ? 'http://localhost:5500/api/users/register'
            : 'http://localhost:5500/api/users/login';


            // Проверяем, является ли введенный email и password учетными данными администратора
            if (email === 'admin@gmail.com' && password === 'admin') {
                // Автоматический вход для администратора
                localStorage.setItem('token', 'adminToken'); // Передайте токен для админа
                toast.success('Successfully logged in as admin');
                history.push('/admin'); // Перейти на страницу администратора
            }



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
                toast.success('Successfully logged in or registered');

                if (isRegisterMode) {
                    // Присвоение роли 'customer' после регистрации
                    data.user.role = 'customer';
                }

                if (email === 'admin@gmail.com' && password === 'admin') {
                    // Если введенные данные администратора
                    localStorage.setItem('token', 'adminToken'); // Передайте токен для админа
                    toast.success('Successfully logged in as admin');
                    history.push('/admin'); // Перейти на страницу администратора
                } else {
                    // Перейти на страницу профиля или другую нужную
                    history.push('/');
                }
            } else {
                console.error('Response error:', response);
                console.error('Data error:', data);

                // Оповещение об ошибке
                toast.error(data.message || 'An error occurred');

                // Другие действия при неудачной аутентификации
            }
        } catch (error) {
            console.error('Fetch error:', error);

            // Оповещение об ошибке
            toast.error('An error occurred');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLoginRegister();
        }
    };


    // Обновление состояния showSidebar на странице логина и регистрации
    useEffect(() => {
        setShowSidebar(false);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(true); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);


    return (
        <form style={{marginTop: "130px"}}>
            <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
            {isRegisterMode && (
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            )}
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}

            />
            <button type="button" onClick={handleLoginRegister}>
                {isRegisterMode ? 'Register' : 'Login'}
            </button>
            <p onClick={() => setRegisterMode(!isRegisterMode)}>
                {isRegisterMode
                    ? 'У вас уже есть аккаунт? Войдите здесь.'
                    : "У вас нет учетной записи? Зарегистрируйтесь здесь."}
            </p>
            <ToastContainer />
        </form>
    );
};

export default LoginRegister;
