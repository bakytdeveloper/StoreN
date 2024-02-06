

// src/components/AdminPanel/ClientListPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const ClientListPage = ({setShowSidebar}) => {
    const [clients, setClients] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:5500/api/users/clients');
                const data = await response.json();
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
            setShowSidebar(false); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);

    return (
        <div className="client-list-page" style={{ marginTop: "220px" }}>
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
                {clients.slice().reverse().map((client, index) => (
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
