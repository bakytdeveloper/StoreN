// src/components/AdminPanel/ClientListPage.js
import React, { useState, useEffect } from 'react';
// import './ClientListPage.css';

const ClientListPage = ({ onClose }) => {
    const [clients, setClients] = useState([]);

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

    return (
        <div className="client-list-page">
            <h2>Список клиентов</h2>
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
            <button onClick={onClose}>Закрыть</button>
        </div>
    );
};

export default ClientListPage;
