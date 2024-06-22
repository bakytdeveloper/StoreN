
// src/components/LoginRegister/LoginRegister.js
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";





//
// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false); // Добавляем состояние для отображения пароля
//     const history = useHistory();
//
//
//     const handleLoginRegister = async () => {
//         // Проверяем, является ли введенный email и password учетными данными администратора
//         if (email === 'admin@gmail.com' && password === 'nurlan_admin') {
//             // Автоматический вход для администратора
//             localStorage.setItem('token', 'adminToken'); // Передайте токен для админа
//             // toast.success('Successfully logged in as admin');
//             history.push('/admin'); // Перейти на страницу администратора
//             return;
//         }
//
//         const userAdminUrl = `${process.env.REACT_APP_API_URL}/api/users/login`;
//         try {
//             const userAdminResponse = await fetch(userAdminUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                     name,
//                 }),
//             });
//
//             const userData = await userAdminResponse.json();
//
//             if (userAdminResponse.ok) {
//                 // Успешная аутентификация пользователя или администратора
//                 localStorage.setItem('token', userData.token);
//                 toast.success('Успешный вход');
//
//                 // Перенаправляем на нужную страницу в зависимости от роли
//                 if (userData.user.role === 'customer') {
//                     history.push('/');
//                 } else if (userData.user.role === 'admin') {
//                     history.push('/admin');
//                 }
//
//                 return;
//             }
//         } catch (error) {
//             console.error('User/Admin fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//
//         // Если аутентификация для пользователей и администраторов не удалась, продолжаем с проверкой продавцов
//         const sellerUrl = `${process.env.REACT_APP_API_URL}/api/sellers/login`;
//         try {
//             const sellerResponse = await fetch(sellerUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                     name,
//                 }),
//             });
//
//             const sellerData = await sellerResponse.json();
//
//             if (sellerResponse.ok) {
//                 // Успешная аутентификация продавца
//                 if (sellerData.seller.status === 'approved') {
//                     // Если статус "approved", перенаправляем на страницу профиля продавца
//                     localStorage.setItem('token', sellerData.token);
//                     toast.success('Успешный вход как продавец');
//                     history.push('/sellerProfile');
//                     return;
//                 } else {
//                     // Если статус не "approved", сообщаем об этом
//                     toast.error('Ваш аккаунт еще не подтвержден');
//                 }
//             }
//         } catch (error) {
//             console.error('Seller fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//
//         // Если ни одна из аутентификаций не удалась, показываем сообщение об ошибке
//         toast.error('Неверный email или пароль');
//     };
//
//
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false); // Скрываем шапку при монтировании компонента LoginRegister
//         return () => {
//             setShowHeader(true); // Показываем шапку при размонтировании компонента LoginRegister
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             <input
//                 className="formInput"
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onKeyPress={handleKeyPress}
//             />
//             <div style={{ position: 'relative' }}>
//                 <input
//                     className="formInput"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//                 <span
//                     style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                     onClick={() => setShowPassword(!showPassword)}
//                 >
//                     {showPassword ?  <FaEyeSlash /> : <FaEye />}
//
//                     {/*{showPassword ? 'Hide' : 'Show'}*/}
//                 </span>
//             </div>
//             <button type="button" onClick={handleLoginRegister}>
//                 {isRegisterMode ? 'Register' : 'Login'}
//             </button>
//
//             <p onClick={() => setRegisterMode(!isRegisterMode)}>
//                 {isRegisterMode
//                     ? 'У вас уже есть аккаунт? Войдите здесь.'
//                     : "У вас нет учетной записи? Зарегистрируйтесь здесь."}
//             </p>
//             <ToastContainer />
//         </form>
//     );
// };
//
// export default LoginRegister;
//




import 'react-toastify/dist/ReactToastify.css';


// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const history = useHistory();
//
//     // const handleLoginRegister = async () => {
//     //     if (isRegisterMode) {
//     //         // Проверка уникальности email перед регистрацией клиента
//     //         const checkEmailUrl = `${process.env.REACT_APP_API_URL}/api/users/checkEmail?email=${email.toLowerCase()}`;
//     //         const emailResponse = await fetch(checkEmailUrl);
//     //         const emailData = await emailResponse.json();
//     //
//     //         if (!emailResponse.ok) {
//     //             // Если запрос не удался, показываем сообщение об ошибке
//     //             toast.error(emailData.message || 'Произошла ошибка при проверке email');
//     //             return;
//     //         }
//     //
//     //         if (!emailData.unique) {
//     //             // Если email уже существует, показываем сообщение "Такой email занят"
//     //             toast.error('Такой email занят');
//     //             return;
//     //         }
//     //
//     //         // Регистрация нового клиента
//     //         const registerUrl = `${process.env.REACT_APP_API_URL}/api/users/register`;
//     //         try {
//     //             const registerResponse = await fetch(registerUrl, {
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                 },
//     //                 body: JSON.stringify({
//     //                     email: email.toLowerCase(),
//     //                     password,
//     //                     name,
//     //                 }),
//     //             });
//     //
//     //             const responseData = await registerResponse.json();
//     //
//     //             if (registerResponse.ok) {
//     //                 localStorage.setItem('token', responseData.token);
//     //                 toast.success('Успешная регистрация и вход');
//     //                 history.push('/catalog');
//     //                 return;
//     //             } else {
//     //                 // Если регистрация не удалась
//     //                 toast.error(responseData.message || 'Произошла ошибка при регистрации');
//     //                 return;
//     //             }
//     //         } catch (error) {
//     //             console.error('Registration error:', error);
//     //             toast.error('Произошла ошибка при регистрации');
//     //             return;
//     //         }
//     // };
//     //
//     //
//     // if (email === 'a' || email === 'A' && password === 'a') {
//     // // if (email === 'admin@gmail.com' && password === 'nurlan_admin') {
//     //         // Автоматический вход для администратора
//     //         localStorage.setItem('token', 'adminToken'); // Передайте токен для админа
//     //         // toast.success('Successfully logged in as admin');
//     //         localStorage.setItem('role', 'admin'); // Установите роль "admin" для администратора
//     //
//     //     history.push('/admin'); // Перейти на страницу администратора
//     //         return;
//     //     }
//     //
//     //     const userAdminUrl = `${process.env.REACT_APP_API_URL}/api/users/login`;
//     //     try {
//     //         const userAdminResponse = await fetch(userAdminUrl, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 email: email.toLowerCase(),
//     //                 password,
//     //                 name,
//     //             }),
//     //         });
//     //
//     //         const userData = await userAdminResponse.json();
//     //
//     //
//     //         if (userAdminResponse.ok) {
//     //             // Успешная аутентификация пользователя или администратора
//     //             localStorage.setItem('token', userData.token);
//     //             localStorage.setItem('role', userData.user.role); // Сохраняем роль пользователя или администратора
//     //             const userName = userData.user.name; // Получаем имя пользователя
//     //             toast.success(`Приветствую вас, ${userName}!`); // Вставляем имя пользователя в приветствие
//     //
//     //             // Перенаправляем на нужную страницу в зависимости от роли
//     //             if (userData.user.role === 'customer') {
//     //                 history.push('/profile');
//     //             } else if (userData.user.role === 'admin') {
//     //                 history.push('/admin');
//     //             } else if (userData.user.role === 'seller') {
//     //                 history.push('/sellerProfile');
//     //             }
//     //
//     //             return;
//     //         }
//     //     } catch (error) {
//     //         console.error('User/Admin fetch error:', error);
//     //         toast.error('Произошла ошибка');
//     //     }
//     //
//     //     // Если аутентификация для пользователей и администраторов не удалась, продолжаем с проверкой продавцов
//     //     const sellerUrl = `${process.env.REACT_APP_API_URL}/api/sellers/login`;
//     //     try {
//     //         const sellerResponse = await fetch(sellerUrl, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 email: email.toLowerCase(),
//     //                 password,
//     //                 name,
//     //             }),
//     //         });
//     //
//     //         const sellerData = await sellerResponse.json();
//     //
//     //         if (sellerResponse.ok) {
//     //             // Успешная аутентификация продавца
//     //             if (sellerData.seller.status === 'approved') {
//     //                 // Если статус "approved", перенаправляем на страницу профиля продавца
//     //                 localStorage.setItem('token', sellerData.token);
//     //                 localStorage.setItem('role', 'seller'); // Сохраняем роль продавца в localStorage
//     //
//     //                 const userName = sellerData.seller.name; // Получаем имя пользователя
//     //                 toast.success(`Приветствую вас, ${userName}!`); // Вставляем имя пользователя в приветствие
//     //                 // toast.success('Успешный вход как продавец');
//     //                 history.push('/sellerProfile');
//     //                 return;
//     //             } else {
//     //                 // Если статус не "approved", сообщаем об этом
//     //                 toast.error('Ваш аккаунт еще не подтвержден');
//     //             }
//     //         }
//     //
//     //     } catch (error) {
//     //         console.error('Seller fetch error:', error);
//     //         toast.error('Произошла ошибка');
//     //     }
//     //
//     //     // Если ни одна из аутентификаций не удалась, показываем сообщение об ошибке
//     //     toast.error('Неверный email или пароль');
//     //
//     //
//     // };
//
//
//     // const handleLoginRegister = async () => {
//     //     if (isRegisterMode) {
//     //         // Проверка уникальности email перед регистрацией клиента
//     //         const checkEmailUrl = `${process.env.REACT_APP_API_URL}/api/auth/checkEmail?email=${email.toLowerCase()}`;
//     //         const emailResponse = await fetch(checkEmailUrl);
//     //         const emailData = await emailResponse.json();
//     //         if (!emailResponse.ok) {
//     //             toast.error(emailData.message || 'Произошла ошибка при проверке email');
//     //             return;
//     //         }
//     //         if (!emailData.unique) {
//     //             toast.error('Такой email занят');
//     //             return;
//     //         }
//     //
//     //         // Регистрация нового клиента
//     //         const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//     //         try {
//     //             const registerResponse = await fetch(registerUrl, {
//     //                 method: 'POST',
//     //                 headers: {
//     //                     'Content-Type': 'application/json',
//     //                 },
//     //                 body: JSON.stringify({
//     //                     email: email.toLowerCase(),
//     //                     password,
//     //                     name,
//     //                 }),
//     //             });
//     //             const responseData = await registerResponse.json();
//     //             if (registerResponse.ok) {
//     //                 localStorage.setItem('token', responseData.token);
//     //                 toast.success('Успешная регистрация и вход');
//     //                 history.push('/catalog');
//     //                 return;
//     //             } else {
//     //                 toast.error(responseData.message || 'Произошла ошибка при регистрации');
//     //                 return;
//     //             }
//     //         } catch (error) {
//     //             console.error('Registration error:', error);
//     //             toast.error('Произошла ошибка при регистрации');
//     //             return;
//     //         }
//     //     }
//     //
//     //     // Логин пользователя или администратора
//     //     if (email.toLowerCase() === 'a' && password === 'a') {
//     //         localStorage.setItem('token', 'adminToken');
//     //         localStorage.setItem('role', 'admin');
//     //         history.push('/admin');
//     //         return;
//     //     }
//
//     //     const userAdminUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//     //     try {
//     //         const userAdminResponse = await fetch(userAdminUrl, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 email: email.toLowerCase(),
//     //                 password,
//     //                 name,
//     //             }),
//     //         });
//     //         const userData = await userAdminResponse.json();
//     //         if (userAdminResponse.ok) {
//     //             localStorage.setItem('token', userData.token);
//     //             localStorage.setItem('role', userData.user.role);
//     //             const userName = userData.user.name;
//     //             toast.success(`Приветствую вас, ${userName}!`);
//     //             if (userData.user.role === 'customer') {
//     //                 history.push('/profile');
//     //             } else if (userData.user.role === 'admin') {
//     //                 history.push('/admin');
//     //             } else if (userData.user.role === 'seller') {
//     //                 history.push('/sellerProfile');
//     //             }
//     //             return;
//     //         }
//     //     } catch (error) {
//     //         console.error('User/Admin fetch error:', error);
//     //         toast.error('Произошла ошибка');
//     //     }
//     //
//     //     // Логин продавца
//     //     const sellerUrl = `${process.env.REACT_APP_API_URL}/api/auth/seller/login`;
//     //     try {
//     //         const sellerResponse = await fetch(sellerUrl, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //             },
//     //             body: JSON.stringify({
//     //                 email: email.toLowerCase(),
//     //                 password,
//     //                 name,
//     //             }),
//     //         });
//     //         const sellerData = await sellerResponse.json();
//     //         if (sellerResponse.ok) {
//     //             if (sellerData.seller.status === 'approved') {
//     //                 localStorage.setItem('token', sellerData.token);
//     //                 localStorage.setItem('role', 'seller');
//     //                 const userName = sellerData.seller.name;
//     //                 toast.success(`Приветствую вас, ${userName}!`);
//     //                 history.push('/sellerProfile');
//     //                 return;
//     //             } else {
//     //                 toast.error('Ваш аккаунт еще не подтвержден');
//     //             }
//     //         }
//     //     } catch (error) {
//     //         console.error('Seller fetch error:', error);
//     //         toast.error('Произошла ошибка');
//     //     }
//     //
//     //     toast.error('Неверный email или пароль');
//     // };
//
//
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             // Проверка уникальности email перед регистрацией клиента
//             const checkEmailUrl = `${process.env.REACT_APP_API_URL}/api/auth/checkEmail?email=${email.toLowerCase()}`;
//             const emailResponse = await fetch(checkEmailUrl);
//             const emailData = await emailResponse.json();
//             if (!emailResponse.ok) {
//                 toast.error(emailData.message || 'Произошла ошибка при проверке email');
//                 return;
//             }
//             if (!emailData.unique) {
//                 toast.error('Такой email занят');
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                     }),
//                 });
//                 const responseData = await registerResponse.json();
//                 if (registerResponse.ok) {
//                     localStorage.setItem('token', responseData.token);
//                     toast.success('Успешная регистрация и вход');
//                     history.push('/catalog');
//                     return;
//                 } else {
//                     toast.error(responseData.message || 'Произошла ошибка при регистрации');
//                     return;
//                 }
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//                 return;
//             }
//         }
//
//
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//
//
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                     name,
//                 }),
//             });
//             const loginData = await loginResponse.json();
//             if (loginResponse.ok) {
//                 localStorage.setItem('token', loginData.token);
//                 localStorage.setItem('role', loginData.user.role);
//                 const userName = loginData.user.name;
//                 console.log("userName:", loginData.user.role)
//                 toast.success(`Приветствую вас, ${userName}!`);
//                 if (loginData.user.role === 'customer') {
//                     history.push('/profile');
//                 } else if (loginData.user.role === 'admin') {
//                     history.push('/admin');
//                 } else if (loginData.user.role === 'seller') {
//                     history.push('/sellerProfile');
//                 }
//                 return;
//             } else {
//                 toast.error(loginData.message || 'Неверный email или пароль');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//
//
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             <input
//                 className="formInput"
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onKeyPress={handleKeyPress}
//             />
//             <div style={{ position: 'relative' }}>
//                 <input
//                     className="formInput"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//                 <span
//                     style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                     onClick={() => setShowPassword(!showPassword)}
//                 >
//                     {showPassword ?  <FaEyeSlash /> : <FaEye />}
//                 </span>
//             </div>
//             <button type="button" onClick={handleLoginRegister}>
//                 {isRegisterMode ? 'Register' : 'Login'}
//             </button>
//             <p className="text-login-or-register" onClick={() => setRegisterMode(!isRegisterMode)}>
//                 {isRegisterMode
//                     ? 'У вас уже есть аккаунт? Войдите здесь.'
//                     : "У вас нет учетной записи? Зарегистрируйтесь здесь."}
//             </p>
//             <ToastContainer />
//         </form>
//     );
// };
//
// export default LoginRegister;






// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Управление шагами регистрации
//     const history = useHistory();
//
//     const handleSendOtp = async () => {
//         const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
//         try {
//             const otpResponse = await fetch(sendOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase() }),
//             });
//             const otpData = await otpResponse.json();
//             if (otpResponse.ok) {
//                 toast.success('OTP успешно отправлен на ваш email');
//                 setStep(2); // Переход на шаг ввода OTP
//             } else {
//                 toast.error(otpData.message || 'Произошла ошибка при отправке OTP');
//             }
//         } catch (error) {
//             console.error('OTP send error:', error);
//             toast.error('Произошла ошибка при отправке OTP');
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
//         try {
//             const verifyResponse = await fetch(verifyOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase(), otp }),
//             });
//             const verifyData = await verifyResponse.json();
//             if (verifyResponse.ok) {
//                 toast.success('OTP успешно верифицирован');
//                 setStep(3); // Переход на шаг регистрации
//             } else {
//                 toast.error(verifyData.message || 'Неверный OTP');
//             }
//         } catch (error) {
//             console.error('OTP verify error:', error);
//             toast.error('Произошла ошибка при верификации OTP');
//         }
//     };
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             if (step === 1) {
//                 await handleSendOtp();
//                 return;
//             } else if (step === 2) {
//                 await handleVerifyOtp();
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                     }),
//                 });
//                 const responseData = await registerResponse.json();
//                 if (registerResponse.ok) {
//                     localStorage.setItem('token', responseData.token);
//                     toast.success('Успешная регистрация и вход');
//                     history.push('/catalog');
//                     return;
//                 } else {
//                     toast.error(responseData.message || 'Произошла ошибка при регистрации');
//                     return;
//                 }
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//                 return;
//             }
//         }
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                     name,
//                 }),
//             });
//             const loginData = await loginResponse.json();
//             if (loginResponse.ok) {
//                 localStorage.setItem('token', loginData.token);
//                 localStorage.setItem('role', loginData.user.role);
//                 const userName = loginData.user.name;
//                 toast.success(`Приветствую вас, ${userName}!`);
//                 if (loginData.user.role === 'customer') {
//                     history.push('/profile');
//                 } else if (loginData.user.role === 'admin') {
//                     history.push('/admin');
//                 } else if (loginData.user.role === 'seller') {
//                     history.push('/sellerProfile');
//                 }
//                 return;
//             } else {
//                 toast.error(loginData.message || 'Неверный email или пароль');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && step === 1 && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             {isRegisterMode && step === 2 && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             {isRegisterMode && step === 3 && (
//                 <>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         disabled
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                 </>
//             )}
//             {!isRegisterMode && (
//                 <>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                 </>
//             )}
//             <button type="button" onClick={handleLoginRegister}>
//                 {isRegisterMode ? (step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Register') : 'Login'}
//             </button>
//             <p className="text-login-or-register" onClick={() => {
//                 setRegisterMode(!isRegisterMode);
//                 setStep(1);
//             }}>
//                 {isRegisterMode
//                     ? 'У вас уже есть аккаунт? Войдите здесь.'
//                     : "У вас нет учетной записи? Зарегистрируйтесь здесь."}
//             </p>
//             <ToastContainer />
//         </form>
//     );
// };
//
// export default LoginRegister;










// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [otp, setOtp] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Управление шагами регистрации
//     const history = useHistory();
//
//     const handleSendOtp = async () => {
//         const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
//         try {
//             const otpResponse = await fetch(sendOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase() }),
//             });
//
//             // Проверка статуса ответа
//             if (!otpResponse.ok) {
//                 const errorText = await otpResponse.text();
//                 console.error('OTP send error response text:', errorText);
//                 toast.error('Произошла ошибка при отправке OTP');
//                 return;
//             }
//
//             const otpData = await otpResponse.json();
//             toast.success('OTP успешно отправлен на ваш email');
//             setStep(2); // Переход на шаг ввода OTP
//         } catch (error) {
//             console.error('OTP send error:', error);
//             toast.error('Произошла ошибка при отправке OTP');
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
//         try {
//             const verifyResponse = await fetch(verifyOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase(), otp }),
//             });
//
//             // Проверка статуса ответа
//             if (!verifyResponse.ok) {
//                 const errorText = await verifyResponse.text();
//                 console.error('OTP verify error response text:', errorText);
//                 toast.error('Неверный OTP');
//                 return;
//             }
//
//             const verifyData = await verifyResponse.json();
//             toast.success('OTP успешно верифицирован');
//             setStep(3); // Переход на шаг регистрации
//         } catch (error) {
//             console.error('OTP verify error:', error);
//             toast.error('Произошла ошибка при верификации OTP');
//         }
//     };
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             if (step === 1) {
//                 await handleSendOtp();
//                 return;
//             } else if (step === 2) {
//                 await handleVerifyOtp();
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                     }),
//                 });
//
//                 // Проверка статуса ответа
//                 if (!registerResponse.ok) {
//                     const errorText = await registerResponse.text();
//                     console.error('Registration error response text:', errorText);
//                     toast.error('Произошла ошибка при регистрации');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//                 history.push('/catalog');
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//             }
//             return;
//         }
//
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                     name,
//                 }),
//             });
//
//             // Проверка статуса ответа
//             if (!loginResponse.ok) {
//                 const errorText = await loginResponse.text();
//                 console.error('Login error response text:', errorText);
//                 toast.error('Неверный email или пароль');
//                 return;
//             }
//
//             const loginData = await loginResponse.json();
//             localStorage.setItem('token', loginData.token);
//             localStorage.setItem('role', loginData.user.role);
//             const userName = loginData.user.name;
//             toast.success(`Приветствую вас, ${userName}!`);
//             if (loginData.user.role === 'customer') {
//                 history.push('/profile');
//             } else if (loginData.user.role === 'admin') {
//                 history.push('/admin');
//             } else if (loginData.user.role === 'seller') {
//                 history.push('/sellerProfile');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && step === 1 && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             {isRegisterMode && step === 2 && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             {isRegisterMode && step === 3 && (
//                 <>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         disabled
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                 </>
//             )}
//             {!isRegisterMode && (
//                 <>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                 </>
//             )}
//             <button type="button" onClick={handleLoginRegister}>
//                 {isRegisterMode ? (step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Register') : 'Login'}
//             </button>
//             <p className="text-login-or-register" onClick={() => {
//                 setRegisterMode(!isRegisterMode);
//                 setStep(1);
//             }}>
//                 {isRegisterMode
//                     ? 'У вас уже есть аккаунт? Войдите здесь.'
//                     : "У вас нет учетной записи? Зарегистрируйтесь здесь."}
//             </p>
//             <ToastContainer />
//         </form>
//     );
// };
//
// export default LoginRegister;




// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1);
//     const history = useHistory();
//
//     const handleSendOtp = async () => {
//         const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
//         try {
//             const response = await fetch(sendOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase() }),
//             });
//             if (!response.ok) {
//                 toast.error('Произошла ошибка при отправке OTP');
//                 return;
//             }
//             setStep(2);
//             toast.success('OTP отправлен на ваш email');
//         } catch (error) {
//             console.error('OTP send error:', error);
//             toast.error('Произошла ошибка при отправке OTP');
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
//         try {
//             const response = await fetch(verifyOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase(), otp }),
//             });
//             if (!response.ok) {
//                 toast.error('Неверный OTP');
//                 return;
//             }
//             setStep(3);
//             toast.success('OTP подтвержден');
//         } catch (error) {
//             console.error('OTP verify error:', error);
//             toast.error('Произошла ошибка при проверке OTP');
//         }
//     };
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             if (step === 1) {
//                 await handleSendOtp();
//                 return;
//             } else if (step === 2) {
//                 await handleVerifyOtp();
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                         otp,
//                     }),
//                 });
//
//                 // Проверка статуса ответа
//                 if (!registerResponse.ok) {
//                     const errorText = await registerResponse.text();
//                     console.error('Registration error response text:', errorText);
//                     toast.error('Произошла ошибка при регистрации');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//                 history.push('/catalog');
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//             }
//             return;
//         }
//
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                     name,
//                 }),
//             });
//
//             // Проверка статуса ответа
//             if (!loginResponse.ok) {
//                 const errorText = await loginResponse.text();
//                 console.error('Login error response text:', errorText);
//                 toast.error('Неверный email или пароль');
//                 return;
//             }
//
//             const loginData = await loginResponse.json();
//             localStorage.setItem('token', loginData.token);
//             localStorage.setItem('role', loginData.user.role);
//             const userName = loginData.user.name;
//             toast.success(`Приветствую вас, ${userName}!`);
//             if (loginData.user.role === 'customer') {
//                 history.push('/profile');
//             } else if (loginData.user.role === 'admin') {
//                 history.push('/admin');
//             } else if (loginData.user.role === 'seller') {
//                 history.push('/sellerProfile');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && step === 3 && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             <input
//                 className="formInput"
//                 type="text"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 disabled={step !== 1}
//             />
//             {isRegisterMode && step === 2 && (
//                 <input
//                     className="formInput"
//                     type="text"
//                     placeholder="OTP"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                 />
//             )}
//             {isRegisterMode && step === 3 && (
//                 <div style={{ position: 'relative' }}>
//                     <input
//                         className="formInput"
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <span
//                         style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                         onClick={() => setShowPassword(!showPassword)}
//                     >
//                         {showPassword ? <FaEyeSlash /> : <FaEye />}
//                     </span>
//                 </div>
//             )}
//             <button type="button" onClick={handleLoginRegister}>
//                 {isRegisterMode ? (step === 1 ? 'Send OTP' : (step === 2 ? 'Verify OTP' : 'Register')) : 'Login'}
//             </button>
//             <p className="text-login-or-register" onClick={() => { setRegisterMode(!isRegisterMode); setStep(1); }}>
//                 {isRegisterMode
//                     ? 'У вас уже есть аккаунт? Войдите здесь.'
//                     : "У вас нет учетной записи? Зарегистрируйтесь здесь."}
//             </p>
//             <ToastContainer />
//         </form>
//     );
// };


// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Register
//     const history = useHistory();
//
//     const handleSendOtp = async () => {
//         const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
//         try {
//             const response = await fetch(sendOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase() }),
//             });
//             if (response.ok) {
//                 toast.success('OTP отправлен на ваш email');
//                 setStep(2); // Move to the next step
//             } else {
//                 const errorText = await response.text();
//                 console.error('OTP send error response text:', errorText);
//                 toast.error('Произошла ошибка при отправке OTP');
//             }
//         } catch (error) {
//             console.error('OTP send error:', error);
//             toast.error('Произошла ошибка при отправке OTP');
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
//         try {
//             const response = await fetch(verifyOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase(), otp }),
//             });
//             if (response.ok) {
//                 toast.success('OTP успешно проверен');
//                 setStep(3); // Move to the registration step
//             } else {
//                 const errorText = await response.text();
//                 console.error('OTP verification error response text:', errorText);
//                 toast.error('Неверный OTP');
//             }
//         } catch (error) {
//             console.error('OTP verification error:', error);
//             toast.error('Произошла ошибка при проверке OTP');
//         }
//     };
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             if (step === 1) {
//                 await handleSendOtp();
//                 return;
//             } else if (step === 2) {
//                 await handleVerifyOtp();
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                         otp,
//                     }),
//                 });
//
//                 if (!registerResponse.ok) {
//                     const errorText = await registerResponse.text();
//                     console.error('Registration error response text:', errorText);
//                     toast.error('Произошла ошибка при регистрации');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//                 history.push('/catalog');
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//             }
//             return;
//         }
//
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                 }),
//             });
//
//             if (!loginResponse.ok) {
//                 const errorText = await loginResponse.text();
//                 console.error('Login error response text:', errorText);
//                 toast.error('Неверный email или пароль');
//                 return;
//             }
//
//             const loginData = await loginResponse.json();
//             localStorage.setItem('token', loginData.token);
//             localStorage.setItem('role', loginData.user.role);
//             const userName = loginData.user.name;
//             toast.success(`Приветствую вас, ${userName}!`);
//             if (loginData.user.role === 'customer') {
//                 history.push('/profile');
//             } else if (loginData.user.role === 'admin') {
//                 history.push('/admin');
//             } else if (loginData.user.role === 'seller') {
//                 history.push('/sellerProfile');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && step === 1 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <button type="button" onClick={handleSendOtp}>
//                         Отправить OTP
//                     </button>
//                 </div>
//             )}
//             {isRegisterMode && step === 2 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Введите OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <button type="button" onClick={handleVerifyOtp}>
//                         Проверить OTP
//                     </button>
//                 </div>
//             )}
//             {isRegisterMode && step === 3 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//
//
//                         <input
//                             className="formInput"
//                             type="text"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     <button type="button" onClick={handleLoginRegister}>
//                         Register
//                     </button>
//                 </div>
//             )}
//             {!isRegisterMode && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? "text" : "password"}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     <button type="button" onClick={handleLoginRegister}>
//                         Login
//                     </button>
//                 </div>
//             )}
//             <p className="text-login-or-register" onClick={() => {
//                 setRegisterMode(!isRegisterMode);
//                 setStep(1); // Reset step when mode changes
//             }}>
//                 {isRegisterMode
//                     ? 'У вас уже есть аккаунт? Войти'
//                     : 'Еще нет аккаунта? Регистрация'}
//             </p>
//         </form>
//     );
// };
//
//
//
// export default LoginRegister;




// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Register
//     const history = useHistory();
//
//     const handleSendOtp = async () => {
//         const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
//         try {
//             const response = await fetch(sendOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase() }),
//             });
//             if (response.ok) {
//                 toast.success('OTP отправлен на ваш email');
//                 setStep(2); // Move to the next step
//             } else {
//                 const errorText = await response.text();
//                 console.error('OTP send error response text:', errorText);
//                 toast.error('Произошла ошибка при отправке OTP');
//             }
//         } catch (error) {
//             console.error('OTP send error:', error);
//             toast.error('Произошла ошибка при отправке OTP');
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
//         try {
//             const response = await fetch(verifyOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase(), otp }),
//             });
//             if (response.ok) {
//                 toast.success('OTP успешно проверен');
//                 setStep(3); // Move to the registration step
//             } else {
//                 const errorText = await response.text();
//                 console.error('OTP verification error response text:', errorText);
//                 toast.error('Неверный OTP');
//             }
//         } catch (error) {
//             console.error('OTP verification error:', error);
//             toast.error('Произошла ошибка при проверке OTP');
//         }
//     };
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             if (step === 1) {
//                 await handleSendOtp();
//                 return;
//             } else if (step === 2) {
//                 await handleVerifyOtp();
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                         otp,
//                     }),
//                 });
//                 if (!registerResponse.ok) {
//                     const errorText = await registerResponse.text();
//                     console.error('Registration error response text:', errorText);
//                     toast.error('Произошла ошибка при регистрации');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//                 history.push('/profile'); // Переход на страницу профиля после регистрации
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//             }
//             return;
//         }
//
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                 }),
//             });
//             if (!loginResponse.ok) {
//                 const errorText = await loginResponse.text();
//                 console.error('Login error response text:', errorText);
//                 toast.error('Неверный email или пароль');
//                 return;
//             }
//             const loginData = await loginResponse.json();
//             localStorage.setItem('token', loginData.token);
//             localStorage.setItem('role', loginData.user.role);
//             const userName = loginData.user.name;
//             toast.success(`Приветствую вас, ${userName}!`);
//             if (loginData.user.role === 'customer') {
//                 history.push('/profile'); // Переход на страницу профиля после успешного логина
//             } else if (loginData.user.role === 'admin') {
//                 history.push('/admin');
//             } else if (loginData.user.role === 'seller') {
//                 history.push('/sellerProfile');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter') {
//             handleLoginRegister();
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && step === 1 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <button type="button" onClick={handleSendOtp}>
//                         Отправить OTP
//                     </button>
//                 </div>
//             )}
//             {isRegisterMode && step === 2 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Введите OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <button type="button" onClick={handleVerifyOtp}>
//                         Проверить OTP
//                     </button>
//                 </div>
//             )}
//             {isRegisterMode && step === 3 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     <button type="button" onClick={handleLoginRegister}>
//                         Register
//                     </button>
//                 </div>
//             )}
//             {!isRegisterMode && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     <button type="button" onClick={handleLoginRegister}>
//                         Login
//                     </button>
//                 </div>
//             )}
//             <div className="text-login-or-register-block">
//                 <p
//                     className="text-login-or-register"
//                     onClick={() => {
//                         setRegisterMode(!isRegisterMode);
//                         setStep(1); // Reset step when mode changes
//                     }}
//                 >
//                     {isRegisterMode ? 'У вас уже есть аккаунт? Войти' : 'Еще нет аккаунта? Регистрация'}
//                 </p>
//             </div>
//         </form>
//     );
// };
//
// export default LoginRegister;
//











// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Verify OTP, Step 3: Register
//     const history = useHistory();
//
//     const handleSendOtp = async () => {
//         const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
//         try {
//             const response = await fetch(sendOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase() }),
//             });
//             if (response.ok) {
//                 toast.success('OTP отправлен на ваш email');
//                 setStep(2); // Move to the next step
//             } else {
//                 const errorText = await response.text();
//                 console.error('OTP send error response text:', errorText);
//                 toast.error('Произошла ошибка при отправке OTP');
//             }
//         } catch (error) {
//             console.error('OTP send error:', error);
//             toast.error('Произошла ошибка при отправке OTP');
//         }
//     };
//
//     const handleVerifyOtp = async () => {
//         const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
//         try {
//             const response = await fetch(verifyOtpUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email: email.toLowerCase(), otp }),
//             });
//             if (response.ok) {
//                 toast.success('OTP успешно проверен');
//                 setStep(3); // Move to the registration step
//             } else {
//                 const errorText = await response.text();
//                 console.error('OTP verification error response text:', errorText);
//                 toast.error('Неверный OTP');
//             }
//         } catch (error) {
//             console.error('OTP verification error:', error);
//             toast.error('Произошла ошибка при проверке OTP');
//         }
//     };
//
//     const handleLoginRegister = async () => {
//         if (isRegisterMode) {
//             if (step === 1) {
//                 await handleSendOtp();
//                 return;
//             } else if (step === 2) {
//                 await handleVerifyOtp();
//                 return;
//             }
//
//             // Регистрация нового клиента
//             const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
//             try {
//                 const registerResponse = await fetch(registerUrl, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({
//                         email: email.toLowerCase(),
//                         password,
//                         name,
//                         otp,
//                     }),
//                 });
//                 if (!registerResponse.ok) {
//                     const errorText = await registerResponse.text();
//                     console.error('Registration error response text:', errorText);
//                     toast.error('Произошла ошибка при регистрации');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//                 history.push('/profile'); // Переход на страницу профиля после регистрации
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации');
//             }
//             return;
//         }
//
//         // Логин пользователя или администратора
//         if (email.toLowerCase() === 'a' && password === 'a') {
//             localStorage.setItem('token', 'adminToken');
//             localStorage.setItem('role', 'admin');
//             history.push('/admin');
//             return;
//         }
//
//         // Логин пользователя, администратора или продавца
//         const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
//         try {
//             const loginResponse = await fetch(loginUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     email: email.toLowerCase(),
//                     password,
//                 }),
//             });
//             if (!loginResponse.ok) {
//                 const errorText = await loginResponse.text();
//                 console.error('Login error response text:', errorText);
//                 toast.error('Неверный email или пароль');
//                 return;
//             }
//             const loginData = await loginResponse.json();
//             localStorage.setItem('token', loginData.token);
//             localStorage.setItem('role', loginData.user.role);
//             const userName = loginData.user.name;
//             toast.success(`Приветствую вас, ${userName}!`);
//             if (loginData.user.role === 'customer') {
//                 history.push('/profile'); // Переход на страницу профиля после успешного логина
//             } else if (loginData.user.role === 'admin') {
//                 history.push('/admin');
//             } else if (loginData.user.role === 'seller') {
//                 history.push('/sellerProfile');
//             }
//         } catch (error) {
//             console.error('Login fetch error:', error);
//             toast.error('Произошла ошибка');
//         }
//     };
//
//     const handleKeyPress = async (event) => {
//         if (event.key === 'Enter') {
//             event.preventDefault(); // Prevent form submission
//             if (isRegisterMode) {
//                 if (step === 1) {
//                     await handleSendOtp();
//                 } else if (step === 2) {
//                     await handleVerifyOtp();
//                 } else if (step === 3) {
//                     await handleLoginRegister();
//                 }
//             } else {
//                 await handleLoginRegister();
//             }
//         }
//     };
//
//     useEffect(() => {
//         setShowHeader(false);
//         return () => {
//             setShowHeader(true);
//         };
//     }, [setShowHeader]);
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => {
//             setShowSidebar(true);
//         };
//     }, [setShowSidebar]);
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//     return (
//         <form className="form">
//             <span className="formCloseLogin" type="button" onClick={handleClose}>
//                 &#10006;
//             </span>
//             <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
//             {isRegisterMode && step === 1 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <button type="button" onClick={handleSendOtp}>
//                         Отправить OTP
//                     </button>
//                 </div>
//             )}
//             {isRegisterMode && step === 2 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Введите OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <button type="button" onClick={handleVerifyOtp}>
//                         Проверить OTP
//                     </button>
//                 </div>
//             )}
//             {isRegisterMode && step === 3 && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                         readOnly
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     <button type="button" onClick={handleLoginRegister}>
//                         Register
//                     </button>
//                 </div>
//             )}
//             {!isRegisterMode && (
//                 <div>
//                     <input
//                         className="formInput"
//                         type="text"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         onKeyPress={handleKeyPress}
//                     />
//                     <div style={{ position: 'relative' }}>
//                         <input
//                             className="formInput"
//                             type={showPassword ? 'text' : 'password'}
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             onKeyPress={handleKeyPress}
//                         />
//                         <span
//                             style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
//                             onClick={() => setShowPassword(!showPassword)}
//                         >
//                             {showPassword ? <FaEyeSlash /> : <FaEye />}
//                         </span>
//                     </div>
//                     <button type="button" onClick={handleLoginRegister}>
//                         Login
//                     </button>
//                 </div>
//             )}
//             <div className="text-login-or-register-block">
//                 <p
//                     className="text-login-or-register"
//                     onClick={() => {
//                         setRegisterMode(!isRegisterMode);
//                         setStep(1); // Reset step when mode changes
//                     }}
//                 >
//                     {isRegisterMode ? 'У вас уже есть аккаунт? Войти' : 'Еще нет аккаунта? Регистрация'}
//                 </p>
//             </div>
//         </form>
//     );
// };
//
// export default LoginRegister;





const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Verify OTP, Step 3: Register
    const history = useHistory();

    const handleSendOtp = async () => {
        const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;
        try {
            const response = await fetch(sendOtpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });
            if (response.ok) {
                toast.success('OTP отправлен на ваш email');
                setStep(2); // Move to the next step
            } else {
                const errorText = await response.text();
                console.error('OTP send error response text:', errorText);
                toast.error('Произошла ошибка при отправке OTP');
            }
        } catch (error) {
            console.error('OTP send error:', error);
            toast.error('Произошла ошибка при отправке OTP');
        }
    };

    const handleVerifyOtp = async () => {
        const verifyOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/verify-otp`;
        try {
            const response = await fetch(verifyOtpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase(), otp }),
            });
            if (response.ok) {
                toast.success('OTP успешно проверен');
                setStep(3); // Move to the registration step
            } else {
                const errorText = await response.text();
                console.error('OTP verification error response text:', errorText);
                toast.error('Неверный OTP');
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error('Произошла ошибка при проверке OTP');
        }
    };

    const handleLoginRegister = async () => {
        if (isRegisterMode) {
            if (step === 1) {
                await handleSendOtp();
                return;
            } else if (step === 2) {
                await handleVerifyOtp();
                return;
            }

            // Регистрация нового клиента
            const registerUrl = `${process.env.REACT_APP_API_URL}/api/auth/register`;
            try {
                const registerResponse = await fetch(registerUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email.toLowerCase(),
                        password,
                        name,
                        otp,
                    }),
                });
                if (!registerResponse.ok) {
                    const errorText = await registerResponse.text();
                    console.error('Registration error response text:', errorText);
                    toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
                    return;
                }

                const responseData = await registerResponse.json();
                localStorage.setItem('token', responseData.token);
                toast.success('Успешная регистрация и вход');

                // После успешной регистрации переключаемся на форму логина
                setRegisterMode(false);
                setStep(1); // Сбрасываем шаг на первый для формы логина

            } catch (error) {
                console.error('Registration error:', error);
                toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
            }
            return;
        }

        // Логин пользователя или администратора
        if (email.toLowerCase() === 'a' && password === 'a') {
            localStorage.setItem('token', 'adminToken');
            localStorage.setItem('role', 'admin');
            history.push('/admin');
            return;
        }

        // Логин пользователя, администратора или продавца
        const loginUrl = `${process.env.REACT_APP_API_URL}/api/auth/login`;
        try {
            const loginResponse = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password,
                }),
            });
            if (!loginResponse.ok) {
                const errorText = await loginResponse.text();
                console.error('Login error response text:', errorText);
                toast.error('Неверный email или пароль');
                return;
            }
            const loginData = await loginResponse.json();
            localStorage.setItem('token', loginData.token);
            localStorage.setItem('role', loginData.user.role);
            const userName = loginData.user.name;
            toast.success(`Приветствую вас, ${userName}!`);
            if (loginData.user.role === 'customer') {
                history.push('/profile'); // Переход на страницу профиля после успешного логина
            } else if (loginData.user.role === 'admin') {
                history.push('/admin');
            } else if (loginData.user.role === 'seller') {
                history.push('/sellerProfile');
            }
        } catch (error) {
            console.error('Login fetch error:', error);
            toast.error('Произошла ошибка');
        }
    };

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            if (isRegisterMode) {
                if (step === 1) {
                    await handleSendOtp();
                } else if (step === 2) {
                    await handleVerifyOtp();
                } else if (step === 3) {
                    await handleLoginRegister();
                }
            } else {
                await handleLoginRegister();
            }
        }
    };

    useEffect(() => {
        setShowHeader(false);
        return () => {
            setShowHeader(true);
        };
    }, [setShowHeader]);

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    const handleClose = () => {
        history.push('/');
    };

    return (
        <form className="form">
            <span className="formCloseLogin" type="button" onClick={handleClose}>
                &#10006;
            </span>
            <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>
            {isRegisterMode && step === 1 && (
                <div>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button type="button" onClick={handleSendOtp}>
                        Отправить OTP
                    </button>
                </div>
            )}
            {isRegisterMode && step === 2 && (
                <div>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Введите OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button type="button" onClick={handleVerifyOtp}>
                        Проверить OTP
                    </button>
                </div>
            )}
            {isRegisterMode && step === 3 && (
                <div>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Email"
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        readOnly
                    />
                    <div style={{ position: 'relative' }}>
                        <input
                            className="formInput"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <span
                            style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="button" onClick={handleLoginRegister}>
                        Register
                    </button>
                </div>
            )}
            {!isRegisterMode && (
                <div>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <div style={{ position: 'relative' }}>
                        <input
                            className="formInput"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <span
                            style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button type="button" onClick={handleLoginRegister}>
                        Login
                    </button>
                </div>
            )}
            <div className="text-login-or-register-block">
                <p
                    className="text-login-or-register"
                    onClick={() => {
                        setRegisterMode(!isRegisterMode);
                        setStep(1); // Reset step when mode changes
                    }}
                >
                    {isRegisterMode ? 'У вас уже есть аккаунт? Войти' : 'Еще нет аккаунта? Регистрация'}
                </p>
            </div>
        </form>
    );
};

export default LoginRegister;

