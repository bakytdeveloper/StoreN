// src/components/AdminPanel/ClientListPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ClientListPage.css';

const ClientListPage = ({setShowSidebar}) => {
    const [clients, setClients] = useState([]);
    const history = useHistory();


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            history.push('/');
            return;
        }
    }, [history]);


    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/clients`);
                const data = await response.json();
                console.log('Fetched clients:', data); // Логирование данных
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, []);


    const handleGoBack = () => {
        history.goBack(); // Переход на предыдущую страницу
    };

    // Обновление состояния showSidebar на странице логина и регистрации
    useEffect(() => {
        setShowSidebar(true);
        // Возвращаем функцию для очистки (аналог componentWillUnmount)
        return () => {
            setShowSidebar(true); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);

    return (
        <div className="client-list-page">
            {/*<div className="header">*/}
            <h2>Список клиентов</h2>
            <button onClick={handleGoBack}>&times;</button> {/* Кнопка "крестик" */}
            {/*</div>*/}
            <table>
                <thead>
                <tr>
                    <th>Порядковый номер</th>
                    <th>Имя</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {Array.isArray(clients) && clients.slice().reverse().map((client, index) => (
                    <tr key={client._id}>
                        <td>{index + 1}</td>
                        <td>{client.name}</td>
                        <td>{client.email}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
};

export default ClientListPage;
