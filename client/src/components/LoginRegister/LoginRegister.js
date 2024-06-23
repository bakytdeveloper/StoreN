
// src/components/LoginRegister/LoginRegister.js
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";




import 'react-toastify/dist/ReactToastify.css';

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
//                     toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//
//                 // После успешной регистрации переключаемся на форму логина
//                 setRegisterMode(false);
//                 setStep(1); // Сбрасываем шаг на первый для формы логина
//
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
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
//                         // onChange={(e) => setEmail(e.target.value)}
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
//








// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Verify OTP, Step 3: Register
//     const [resendTimer, setResendTimer] = useState(0);
//     const history = useHistory();
//
//     useEffect(() => {
//         let timer;
//         if (resendTimer > 0) {
//             timer = setInterval(() => {
//                 setResendTimer((prevTime) => prevTime - 1);
//             }, 100);
//         }
//
//         return () => clearInterval(timer);
//     }, [resendTimer]);
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
//                 setResendTimer(60); // Set timer for 60 seconds
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
//                     toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//
//                 // После успешной регистрации переключаемся на форму логина
//                 setRegisterMode(false);
//                 setStep(1); // Сбрасываем шаг на первый для формы логина
//
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
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
//                     {resendTimer > 0 ? (
//                         <p>Повторная отправка через: {resendTimer} секунд</p>
//                     ) : (
//                         <p className="resend-otp" onClick={handleSendOtp}>
//                             Отправить снова
//                         </p>
//                     )}
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
//                         // onChange={(e) => setEmail(e.target.value)}
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











// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Verify OTP, Step 3: Register
//     const [resendTimer, setResendTimer] = useState(0);
//     const history = useHistory();
//
//     useEffect(() => {
//         let timer;
//         if (resendTimer > 0) {
//             timer = setInterval(() => {
//                 setResendTimer((prevTime) => prevTime - 1);
//             }, 1000);
//         }
//
//         return () => clearInterval(timer);
//     }, [resendTimer]);
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
//                 setResendTimer(60); // Set timer for 60 seconds
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
//                     toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//
//                 // После успешной регистрации переключаемся на форму логина
//                 setRegisterMode(false);
//                 setStep(1); // Сбрасываем шаг на первый для формы логина
//
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
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
//                     {resendTimer > 0 ? (
//                         // <p>Повторная отправка через: {resendTimer} секунд</p>
//                         <p className="resend-otp" onClick={handleSendOtp}>
//                             Отправить снова
//                         </p>
//                     ) : (
//                         <p>Повторная отправка через: {resendTimer} секунд</p>
//
//                         // <p className="resend-otp" onClick={handleSendOtp}>
//                         //     Отправить снова
//                         // </p>
//                     )}
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











// const LoginRegister = ({ showSidebar, setShowSidebar, setShowHeader }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [otp, setOtp] = useState('');
//     const [isRegisterMode, setRegisterMode] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Verify OTP, Step 3: Register
//     const [resendTimer, setResendTimer] = useState(0);
//     const history = useHistory();
//
//     useEffect(() => {
//         let timer;
//         if (resendTimer > 0) {
//             timer = setInterval(() => {
//                 setResendTimer((prevTime) => prevTime - 1);
//             }, 1000);
//         }
//
//         return () => clearInterval(timer);
//     }, [resendTimer]);
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
//                 setResendTimer(60); // Set timer for 60 seconds
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
//                     toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
//                     return;
//                 }
//
//                 const responseData = await registerResponse.json();
//                 localStorage.setItem('token', responseData.token);
//                 toast.success('Успешная регистрация и вход');
//
//                 // После успешной регистрации переключаемся на форму логина
//                 setRegisterMode(false);
//                 setStep(1); // Сбрасываем шаг на первый для формы логина
//
//             } catch (error) {
//                 console.error('Registration error:', error);
//                 toast.error('Произошла ошибка при регистрации, клиент с таким email уже существует');
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
//                     {resendTimer > 0 ? (
//                         <p>Повторная отправка через: {resendTimer} секунд</p>
//                     ) : (
//                         <p className="resend-otp" onClick={handleSendOtp}>
//                             Отправить снова
//                         </p>
//                     )}
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
    const [resendTimer, setResendTimer] = useState(0);
    const history = useHistory();

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [resendTimer]);

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
                setResendTimer(60); // Set timer for 60 seconds
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
            <h2>{isRegisterMode ? '' : 'Login'}</h2>
            {isRegisterMode && step === 1 && (
                <div>
                    <h2>{isRegisterMode ? 'Создать аккаунт' : 'Login'}</h2>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button type="button" onClick={handleSendOtp}>
                        Продолжить
                    </button>
                </div>
            )}
            {isRegisterMode && step === 2 && (
                <div>
                    <h2>{isRegisterMode ? 'Подтвердите эл.почту' : 'Login'}</h2>
                    <div className="login-step-email">
                        Мы отправили подтверждение на email: <strong>{email}</strong>
                    </div>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Введите OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button type="button" onClick={handleVerifyOtp}>
                        Продолжить
                    </button>
                   <div className="timer-login">
                       {resendTimer > 0 ? (
                           <div className="timer-login-time">Повторная отправка через:
                               <strong> {resendTimer}</strong>секунд</div>
                       ) : (
                           <p className="resend-otp" onClick={handleSendOtp}>
                               Отправить снова
                           </p>
                       )}
                   </div>
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
