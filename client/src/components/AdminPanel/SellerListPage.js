import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './SellerListPage.css';
import SellerItem from "./SellerItem";
import ConfirmationModal from "./ConfirmationModal";

const SellerListPage = ({ setShowSidebar }) => {
    const [sellers, setSellers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            history.push('/');
            return;
        }

        const fetchSellersFromDatabase = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/sellers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch sellers');
                }
                const data = await response.json();
                setSellers(data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchSellersFromDatabase();
        // eslint-disable-next-line
    }, [history]);

    const handleClose = () => {
        history.goBack();
    };

    const updateStatusSeller = async (sellerId, newStatus) => {
        try {
            const response = await fetch(`${apiUrl}/api/sellers/update-status/${sellerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedSellers = sellers.map((seller) => {
                    if (seller._id === sellerId) {
                        return { ...seller, status: newStatus, statusHistory: [...seller.statusHistory, { status: newStatus, time: Date.now() }] };
                    }
                    return seller;
                });

                setSellers(updatedSellers);
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDeleteClick = (seller) => {
        setSelectedSeller(seller);
        setShowModal(true);
    };

    const handleDeleteSeller = async (sellerId) => {
        try {
            const response = await fetch(`${apiUrl}/api/sellers/${sellerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setSellers(sellers.filter(seller => seller._id !== sellerId));
                setShowModal(false);
                setSelectedSeller(null);
            } else {
                console.error('Error deleting seller:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting seller:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedSeller(null);
    };

    return (
        <div className="sellers-page-container">
            <div className="sellers-content">
                <div className="sellers-header">
                    <h2 className="sellers-title">Список продавцов</h2>
                    <button
                        className="sellers-close-btn"
                        type="button"
                        onClick={handleClose}
                        aria-label="Закрыть"
                    >
                        &#10006;
                    </button>
                </div>

                <div className="table-container">
                    <table className="sellers-table">
                        <thead>
                        <tr className="table-header-row">
                            <th className="col-number">№</th>
                            <th className="col-company">Название компании</th>
                            <th className="col-name">Имя Фам.</th>
                            <th className="col-email">Email</th>
                            <th className="col-phone">Телефон</th>
                            <th className="col-description">Направление компании</th>
                            <th className="col-created">Время</th>
                            <th className="col-status">Статус</th>
                            <th className="col-status-time">Время изменения статуса</th>
                            <th className="col-actions">Действия</th>
                            <th className="col-products">Товары продавца</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sellers.slice().reverse().map((seller, index) => (
                            <tr key={seller._id} className="seller-row">
                                <td className="col-number">{index + 1}</td>
                                <td className="col-company">{seller.companyName}</td>
                                <td className="col-name">{seller.name}</td>
                                <td className="col-email">{seller.email}</td>
                                <td className="col-phone">{seller.phoneNumber}</td>
                                <td className="col-description">
                                    <textarea
                                        className="seller-description"
                                        value={seller.companyDescription}
                                        readOnly
                                    />
                                </td>
                                <td className="col-created">{new Date(seller.createdAt).toLocaleString()}</td>
                                <td className="col-status">
                                    <SellerItem key={seller._id} seller={seller} onUpdateStatus={updateStatusSeller} />
                                </td>
                                <td className="col-status-time">
                                    {seller.statusHistory && seller.statusHistory.length > 0
                                        ? new Date(seller.statusHistory[seller.statusHistory.length - 1].time).toLocaleString()
                                        : '-'}
                                </td>
                                <td className="col-actions">
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteClick(seller)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                                <td className="col-products" data-visible={seller.isProductsVisible}>
                                    {seller.isProductsVisible ? (
                                        <>
                                            <span className="status-icon" role="img" aria-label="checkmark">✔️</span>
                                            <span className="status-time">{new Date(seller.lastVisibilityChange).toLocaleString()}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="status-icon" role="img" aria-label="exclamation">❗</span>
                                            <span className="status-time">{new Date(seller.lastVisibilityChange).toLocaleString()}</span>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {selectedSeller && (
                    <ConfirmationModal
                        show={showModal}
                        onClose={handleModalClose}
                        onConfirm={handleDeleteSeller}
                        seller={selectedSeller}
                    />
                )}
            </div>
        </div>
    );
};

export default SellerListPage;
