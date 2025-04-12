
// src/components/LoginRegister/LoginRegister.js
import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';
import {FaEye, FaEyeSlash} from "react-icons/fa";



import 'react-toastify/dist/ReactToastify.css';


const LoginRegister = ({ setShowSidebar, setShowHeader }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [isRegisterMode, setRegisterMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Verify OTP, Step 3: Register
    const [resendTimer, setResendTimer] = useState(-1); // Initial state changed to -1
    const [otpError, setOtpError] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false); // State for password match error
    const [forgotPassword, setForgotPassword] = useState(false); // State for showing forgot password form
    const [newPassword, setNewPassword] = useState('');
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1); // Forgot password step (1: Send OTP, 2: Verify OTP)
    const [forgotPasswordResendTimer, setForgotPasswordResendTimer] = useState(-1); // Timer for forgot password OTP resend
    const [otpErrorForgotPassword, setOtpErrorForgotPassword] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false); // Toggle OTP input for forgot password
    const [newPasswordMatchError, setNewPasswordMatchError] = useState(false); // State for new password match error

    const history = useHistory();

    useEffect(() => {
        let timer;
        if (resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prevTime) => prevTime - 1);
            }, 1000); // Changed interval to 1000ms (1 second)
        }
        return () => clearInterval(timer);
    }, [resendTimer]);

    useEffect(() => {
        let timer;
        if (forgotPasswordResendTimer > 0) {
            timer = setInterval(() => {
                setForgotPasswordResendTimer((prevTime) => prevTime - 1);
            }, 1000); // Changed interval to 1000ms (1 second)
        }
        return () => clearInterval(timer);
    }, [forgotPasswordResendTimer]);


    const handleSendOtp = async () => {
        const checkEmailUrl = `${process.env.REACT_APP_API_URL}/api/auth/check-email`;
        const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;

        try {
            // Check if email exists for User or Seller
            const checkEmailResponse = await fetch(checkEmailUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });

            const checkEmailData = await checkEmailResponse.json();
            if (checkEmailData.exists) {
                toast.error('Пользователь с таким email уже существует');
                return;
            }

            // Продолжите отправку OTP, если адрес электронной почты для Пользователя или Продавца не существует.
            const response = await fetch(sendOtpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });

            if (response.ok) {
                toast.success('OTP отправлен на ваш email');
                setStep(2); // Переход к этапу проверки OTP
                setResendTimer(60); // Установить таймер для повторной отправки OTP
                setOtpError(''); // Удалить ошибку OTP в случае успеха
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
                setStep(3); // Переходим к этапу регистрации
                setOtpError(''); //Удалить сообщение об ошибке OTP при успешной проверке
            } else {
                const errorText = await response.text();
                console.error('OTP verification error response text:', errorText);
                setOtpError('Неверный OTP'); // Установить сообщение об ошибке OTP
            }
        } catch (error) {
            console.error('Ошибка проверки OTP:', error);
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
            // Проверка совпадения паролей
            if (password !== confirmPassword) {
                setPasswordMatchError(true);
                return;
            }
            // Проверка минимальной длины пароля
            if (password.length < 6) {
                toast.error('Пароль должен содержать минимум 6 символов');
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
// Логин администратора
        if (email.toLowerCase() === 'a' && password === 'a') {
            const adminUrl = `${process.env.REACT_APP_API_URL}/api/auth/login/admin`;
            try {
                const adminResponse = await fetch(adminUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email.toLowerCase(),
                        password,
                    }),
                });
                if (!adminResponse.ok) {
                    const errorText = await adminResponse.text();
                    console.error('Admin login error response text:', errorText);
                    toast.error('Неверный email или пароль');
                    return;
                }
                const adminData = await adminResponse.json();
                localStorage.setItem('token', adminData.token);
                localStorage.setItem('role', adminData.user.role);
                const userName = adminData.user.name;
                toast.success(`Приветствую вас, ${userName}!`);
                history.push('/admin'); // Проверьте, что это вызывается корректно
            } catch (error) {
                console.error('Admin login fetch error:', error);
                toast.error('Произошла ошибка');
            }
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

    const handleForgotPassword = async () => {
        // Проверка минимальной длины нового пароля
        if (newPassword.length < 6) {
            toast.error('Пароль должен содержать минимум 6 символов');
            setNewPasswordMatchError(true)
            return;
        }

        // Проверка совпадения паролей
        if (newPassword !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        const forgotPasswordUrl = `${process.env.REACT_APP_API_URL}/api/auth/update-password-by-email`;
        try {
            const response = await fetch(forgotPasswordUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    currentPassword: '', // Current password is not required here
                    newPassword: newPassword,
                }),
            });
            if (response.ok) {
                toast.success('Пароль успешно обновлен');
                setForgotPassword(false); // Hide forgot password form
                setPassword(''); // Clear password field
                setConfirmPassword('');
                setNewPassword(''); // Clear new password field
            } else {
                const errorText = await response.text();
                console.error('Password update error response text:', errorText);
                toast.error('Ошибка при обновлении пароля');
            }
        } catch (error) {
            console.error('Password update error:', error);
            toast.error('Ошибка при обновлении пароля');
        }
    };


    const handleSendOtpForgotPassword = async () => {
        const checkEmailUrl = `${process.env.REACT_APP_API_URL}/api/auth/check-email`;
        const sendOtpUrl = `${process.env.REACT_APP_API_URL}/api/auth/send-otp`;

        try {
            // Проверка существования email
            const checkEmailResponse = await fetch(checkEmailUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });

            const checkEmailData = await checkEmailResponse.json();
            if (!checkEmailData.exists) {
                toast.error('У нас нет такого клиента');
                return;
            }

            // Отправка OTP
            const response = await fetch(sendOtpUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase() }),
            });

            if (response.ok) {
                toast.success('OTP отправлен на ваш email');
                setForgotPasswordStep(2); // Переход к шагу проверки OTP
                setForgotPasswordResendTimer(60); // Установка таймера на 60 секунд
                setOtpErrorForgotPassword(''); // Очистка сообщения об ошибке OTP при успешной отправке
                setShowOtpInput(true); // Показать ввод OTP
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

    const handleVerifyOtpForgotPassword = async () => {
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
                setForgotPasswordStep(3); // Move to password reset step
                setOtpErrorForgotPassword(''); // Clear OTP error message on successful verification
            } else {
                const errorText = await response.text();
                console.error('OTP verification error response text:', errorText);
                setOtpErrorForgotPassword('Неверный OTP'); // Set OTP error message
            }
        } catch (error) {
            console.error('OTP verification error:', error);
            toast.error('Произошла ошибка при проверке OTP');
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
            } else if (forgotPassword) {
                if (forgotPasswordStep === 1) {
                    await handleSendOtpForgotPassword();
                } else if (forgotPasswordStep === 2) {
                    await handleVerifyOtpForgotPassword();
                } else if (forgotPasswordStep === 3) {
                    await handleForgotPassword();
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
        // history.goBack();
        history.push('/');
    };

    const handleCloseForm = () => {
        if (isRegisterMode && step > 1) {
            setStep(1); // Reset to step 1 if in register mode and step is greater than 1
        } else {
            history.push('/login'); // Navigate to login page if not in register mode
        }
    };

    const handleCloseFormPassword = () => {
        if (forgotPasswordStep > 1) {
        // if (isRegisterMode && step > 1) {
            setForgotPasswordStep(1); // Reset to step 1 if in register mode and step is greater than 1
        } else {
            history.push('/login'); // Navigate to login page if not in register mode
        }
    };


    return (
        <form className="form">
            <span className="formCloseLogin"  type="button"  onClick={handleClose}>
                &#10006;
            </span>
            <hr className="hr-line"/>
            {/* Register Flow */}
            {isRegisterMode && step === 1 && (
                <div className="form-register-and-login">
                    <h2>Создайте аккаунт</h2>
                    <label>Email:</label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Эл.почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button className="Login-register-button" type="button" onClick={handleSendOtp}>
                        Продолжить
                    </button>
                </div>
            )}
            {isRegisterMode && step === 2 && (
                <div className="form-register-and-login">
                    <span
                        className="form-register-and-login-arrow"
                        onClick={handleCloseForm}>
                        ⟻ назад
                    </span>

                    <h2>Подтвердите эл.почту</h2>
                    <div className="login-step-email">
                        Мы отправили подтверждение на email: <strong>{email}</strong>
                    </div>
                    <label>Введите код подтверждения</label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Введите подтверждение"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    {otpError && <span className="otp-error">{otpError}</span>}
                    <button className="Login-register-button" type="button" onClick={handleVerifyOtp}>
                        Подтвердите
                    </button>
                    <div className="timer-login">
                        {resendTimer > 0 ? (
                            <div className="timer-login-time">
                                Повторная отправка через: <strong>{resendTimer}</strong> секунд
                            </div>
                        ) : (
                            <div className="new-otp-button">
                                <div>Не получили код ?</div>
                                <p className="resend-otp" onClick={handleSendOtp}>
                                    Отправить снова
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isRegisterMode && step === 3 && (
                <div className="form-register-and-login">
                    <h2>Заполните форму</h2>
                    <label>Имя:</label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Введите имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <label>Email:</label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Эл.почта"
                        value={email}
                        onKeyPress={handleKeyPress}
                        readOnly
                    />
                    <div style={{ position: 'relative' }}>
                        <label>Пароль:</label>
                        <input
                            className="formInput"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введите пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <span
                            style={{ position: 'absolute', right: '10px', top: '33px', cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <label>Подтвердите пароль:</label>
                    <input
                        className="formInput"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Введите код"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    {passwordMatchError && (
                        <span className="otp-error">Пароли не совпадают. Пожалуйста, проверьте введенные данные.</span>
                    )}
                    <button className="Login-register-button" type="button" onClick={handleLoginRegister}>
                        Зарегистрировать
                    </button>
                </div>
            )}
            {/* Login Flow */}
            {!isRegisterMode && !forgotPassword && (
                <div className="form-register-and-login">
                    <h2 style={{marginLeft:"0"}}>Войти в аккаунт</h2>
                    <label>Email:</label>
                    <input
                        className="formInput"
                        type="text"
                        placeholder="Эл.адрес"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <div style={{ position: 'relative' }}>
                        <label>Пароль:</label>
                        <input
                            className="formInput"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Введите код"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <span
                            style={{ position: 'absolute', right: '10px', top: '33px', cursor: 'pointer' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button className="Login-register-button" type="button" onClick={handleLoginRegister}>
                        Login
                    </button>
                   <div className="text-login-or-register-block newPassword">
                       <span>Забыли пароль?</span>
                       <p
                           className="text-login-or-register"
                           onClick={() => {
                               setForgotPassword(true);
                               setForgotPasswordStep(1); // Reset forgot password flow step
                               setForgotPasswordResendTimer(-1); // Reset forgot password timer
                               setOtpErrorForgotPassword(''); // Reset OTP error
                               setShowOtpInput(false); // Hide OTP input initially
                           }}
                       >
                           Сменить пароль
                       </p>
                   </div>
                </div>
            )}
            {/* Forgot Password Flow */}
            {forgotPassword && (
                <div>
                    {/*<p className="formCloseLogin" onClick={() => setForgotPassword(false)}>*/}
                    {/*    &#10006;*/}
                    {/*</p>*/}
                    {forgotPasswordStep === 1 && (
                        <div  className="form-register-and-login">
                            <h2>Восстановление пароля</h2>
                            <div style={{marginTop:"11px", marginBottom:"11px"}}>
                                Для восстановления пароля введите email указанный при регистрации</div>
                          <label>Email:</label>
                            <input
                                className="formInput"
                                type="text"
                                placeholder="Эл.почта"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className="Login-register-button" type="button" onClick={handleSendOtpForgotPassword}>
                                Отправить OTP
                            </button>
                        </div>
                    )}
                    {forgotPasswordStep === 2 && (
                        <div className="form-register-and-login">
                              <span
                                  className="form-register-and-login-arrow"
                                  onClick={handleCloseFormPassword}>
                                ⟻ назад
                            </span>
                            <h2>Восстановление пароля</h2>
                            <div className="login-step-email">
                                Мы отправили подтверждение на email: <strong>{email}</strong>
                            </div>
                            <label>Введите код подтверждения:</label>
                            <input
                                className="formInput"
                                type="text"
                                placeholder="Введите код"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            {otpErrorForgotPassword && <span className="otp-error">{otpErrorForgotPassword}</span>}
                            <button className="Login-register-button" type="button" onClick={handleVerifyOtpForgotPassword}>
                                Подтвердите OTP
                            </button>
                            <div className="timer-login">
                                {forgotPasswordResendTimer > 0 ? (
                                    <div className="timer-login-time">
                                        Повторная отправка через: <strong>{forgotPasswordResendTimer}</strong> секунд
                                    </div>
                                ) : (
                                   <div className="load-new-password">
                                       <div>Не получили код?</div>
                                       <p className="resend-otp" onClick={handleSendOtpForgotPassword}>
                                           Отправить снова
                                       </p>
                                   </div>
                                )}
                            </div>
                        </div>
                    )}
                    {forgotPasswordStep === 3 && (
                        <div className="form-register-and-login">
                            <h2>Обновление пароля</h2>
                            <label>Введите пароль:</label>
                            <input
                                className="formInput"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Новый пароль"
                                pattern={"6"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <div style={{ position: 'relative' }}>
                             <label>Подтвердите новый пароль:</label>
                                <input
                                    className="formInput password-yey"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Подтвердите новый пароль"
                                    value={confirmPassword}
                                    pattern={"6"}

                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <span
                                    className="formInput-password-eye"
                                    style={{ position: 'absolute', right: '10px', top: '33px', cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {passwordMatchError && (
                                <span className="otp-error">Пароли не совпадают. Пожалуйста, проверьте введенные данные.</span>
                            )}
                            <button className="Login-register-button" type="button" onClick={handleForgotPassword}>
                                Обновить пароль
                            </button>
                        </div>
                    )}
                </div>
            )}
            {/* Toggle between Login and Register */}
            <div className="text-login-or-register-block">
                <div>
                  {isRegisterMode ? 'У вас уже есть аккаунт?' : 'Еще нет аккаунта?'}
                </div>
                <p
                    className="text-login-or-register"
                    onClick={() => {
                        setRegisterMode(!isRegisterMode);
                        setStep(1); // Reset step when mode changes
                        setResendTimer(-1); // Reset timer when switching modes
                        setForgotPassword(false); // Reset forgot password state
                        setForgotPasswordStep(1); // Reset forgot password flow step
                        setForgotPasswordResendTimer(-1); // Reset forgot password timer
                        setOtpErrorForgotPassword(''); // Reset OTP error
                        setShowOtpInput(false); // Hide OTP input initially
                    }}
                >
                    {isRegisterMode ? 'Войти' : 'Зарегистрируйтесь'}
                </p>
            </div>
        </form>
    );
};

export default LoginRegister;


