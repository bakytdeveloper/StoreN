// src/components/AdminPanel/ClientListPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ClientListPage.css';
import ClientConfirmationModal from "./ClientConfirmationModal";


const ClientListPage = ({ setShowSidebar }) => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
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

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true); // Восстановим значение при размонтировании компонента
        };
    }, [setShowSidebar]);

    const handleDeleteClick = (client) => {
        setSelectedClient(client);
        setShowModal(true);
    };

    const handleDeleteClient = async (clientId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/clients/${clientId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setClients(clients.filter(client => client._id !== clientId));
                setShowModal(false);
                setSelectedClient(null);
            } else {
                console.error('Error deleting client:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting client:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedClient(null);
    };

    return (
        <div className="client-list-page">
            <div className="client-list-page-admin">
                <h2>Список клиентов</h2>
                <button className="client-list-page-cross-button" onClick={handleGoBack}>&#10006;</button>
                <table>
                    <thead>
                    <tr>
                        <th>Порядковый номер</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(clients) && clients.slice().reverse().map((client, index) => (
                        <tr key={client._id}>
                            <td style={{fontWeight: "bold"}}>{index + 1}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDeleteClick(client)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {selectedClient && (
                    <ClientConfirmationModal
                        show={showModal}
                        onClose={handleModalClose}
                        onConfirm={handleDeleteClient}
                        client={selectedClient}
                    />
                )}
            </div>
        </div>
    );
};

export default ClientListPage;