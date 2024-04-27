

import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './SellerListPage.css';
import SellerItem from "./SellerItem";

const SellerListPage = () => {
    const [sellers, setSellers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const history = useHistory();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const role = localStorage.getItem('role');
    //     if (!token || role !== 'seller') {
    //         // Если отсутствует токен или роль не является "seller", перенаправляем на страницу входа
    //         history.push('/login');
    //     }
    // }, [history]);

    const fetchSellersFromDatabase = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/sellers`);
            if (!response.ok) {
                throw new Error('Failed to fetch sellers');
            }
            const data = await response.json();
            setSellers(data);
        } catch (error) {
            console.error('Error fetching sellers:', error);
        }
    };

    useEffect(() => {
        fetchSellersFromDatabase();
    }, []);

    const handleClose = () => {
        history.push('/');
    };


    const updateStatusSeller = async (sellerId, newStatus) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/update-status/${sellerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
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

    return (
        <div className="sellersListPage">
            <h2  className="sellerTitle">Список продавцов</h2>
            <span className="sellersListClose" type="button" onClick={handleClose}>
               <span> &#10006;</span>
            </span>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Название компании</th>
                    <th>Имя Фам.</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Чем занимается компания</th>
                    <th>Время</th>
                    <th>Статус</th>
                    <th>Время изменения статуса</th>

                </tr>
                </thead>
                <tbody>
                {sellers.slice().reverse().map((seller, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{seller.companyName}</td>
                        <td>{seller.name}</td>
                        <td>{seller.email}</td>
                        <td>{seller.phoneNumber}</td>
                        <td>{seller.companyDescription}</td>
                        <td>{new Date(seller.createdAt).toLocaleString()}</td>
                        <SellerItem key={seller._id} seller={seller} onUpdateStatus={updateStatusSeller} />

                        <td>
                            {seller.statusHistory && seller.statusHistory.length > 0
                                ? new Date(seller.statusHistory[seller.statusHistory.length - 1].time).toLocaleString()
                                : '-'}
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellerListPage;
