

import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './SellerListPage.css';
import SellerItem from "./SellerItem";
import {toast} from "react-toastify";

const SellerListPage = () => {
    const [sellers, setSellers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const history = useHistory();

    // // Проверка, аутентифицирован ли пользователь
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const role = localStorage.getItem('role');
    //     if (!token || (role === 'admin' && role !== 'seller')) {
    //         toast.error('Ваш аккаунт еще не подтвержден');
    //
    //         history.push('/login'); // Перенаправление на страницу входа, если нет токена или пользователь не является администратором или продавцом
    //     }
    // }, [history]);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const isAdmin = localStorage.getItem('role') === 'admin';
    //     if (!token || token !== "adminToken" || !isAdmin) {
    //         history.push('/login'); // Перенаправление на страницу входа, если нет токена или пользователь не администратор
    //     }
    // }, [history]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            history.push('/login');
            return;
        }
    }, [history]);

    // const fetchSellersFromDatabase = async () => {
    //     try {
    //         const response = await fetch(`${apiUrl}/api/sellers`);
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch sellers');
    //         }
    //         const data = await response.json();
    //         setSellers(data);
    //     } catch (error) {
    //         console.error('Error fetching sellers:', error);
    //     }
    // };

    const fetchSellersFromDatabase = async () => {
        try {
            const token = localStorage.getItem('token');
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


    useEffect(() => {
        fetchSellersFromDatabase();
    }, []);

    const handleClose = () => {
        // history.push('/');
        history.goBack(); // Переход на предыдущую страницу
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
