// // src/components/LoginRegister/LoginRegister.js
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import './LoginRegister.css';
//
// const LoginRegister = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//
//     const history = useHistory();
//
//     const handleLoginRegister = async () => {
//         const url = isRegisterMode ? 'http://localhost:5500/api/users/register'
//             : 'http://localhost:5500/api/users/login';
//
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password,
//                     name,
//                 }),
//             });
//
//             const data = await response.json();
//
//             if (response.ok) {
//                 // Успешная регистрация или вход
//                 // Сохранить токен в localStorage или cookies
//                 localStorage.setItem('token', data.token);
//
//                 // Перейти на страницу профиля или другую нужную
//                 history.push('api/products');
//                 // history.push('/profile');
//             } else {
//                 console.error('Response error:', response);
//                 console.error('Data error:', data);
//                 // Обработка ошибок, например, вывод сообщения об ошибке
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     };
//
//     return (
//         <form>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && (
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             )}
//             <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button onClick={handleLoginRegister}>
//                 {isRegisterMode ? 'Register' : 'Login'}
//             </button>
//             <p onClick={() => setRegisterMode(!isRegisterMode)}>
//                 {isRegisterMode ? 'Already have an account? Login here.' : 'Don\'t have an account? Register here.'}
//             </p>
//         </form>
//     );
// };
//
// export default LoginRegister;






// // src/components/LoginRegister/LoginRegister.js
// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import './LoginRegister.css';
//
// const LoginRegister = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//
//     const history = useHistory();
//
//     const handleLoginRegister = async () => {
//         const url = isRegisterMode ? 'http://localhost:5500/api/users/register'
//             : 'http://localhost:5500/api/users/login';
//
//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email,
//                     password,
//                     name,
//                 }),
//             });
//
//             const data = await response.json();
//
//             if (response.ok) {
//                 // Успешная регистрация или вход
//                 // Сохранить токен в localStorage или cookies
//                 localStorage.setItem('token', data.token);
//
//                 // Перейти на страницу профиля или другую нужную
//                 history.push('/');
//             } else {
//                 console.error('Response error:', response);
//                 console.error('Data error:', data);
//                 // Обработка ошибок, например, вывод сообщения об ошибке
//             }
//         } catch (error) {
//             console.error('Fetch error:', error);
//         }
//     };
//
//     return (
//         <form>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && (
//                 <input
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />
//             )}
//             <input
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <button type="button" onClick={handleLoginRegister}>
//                 {isRegisterMode ? 'Register' : 'Login'}
//             </button>
//             <p onClick={() => setRegisterMode(!isRegisterMode)}>
//                 {isRegisterMode ? 'Already have an account? Login here.' : "Don't have an account? Register here."}
//             </p>
//         </form>
//     );
// };
//
// export default LoginRegister;








// src/components/LoginRegister/LoginRegister.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';

const LoginRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);

    const history = useHistory();

    const handleLoginRegister = async () => {
        const url = isRegisterMode ? 'http://localhost:5500/api/users/register' : 'http://localhost:5500/api/users/login';

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
                history.push('/');
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

    return (
        <form>
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
            <button type="button" onClick={handleLoginRegister}>
                {isRegisterMode ? 'Register' : 'Login'}
            </button>
            <p onClick={() => setRegisterMode(!isRegisterMode)}>
                {isRegisterMode ? 'Already have an account? Login here.' : "Don't have an account? Register here."}
            </p>
            <ToastContainer />
        </form>
    );
};

export default LoginRegister;
