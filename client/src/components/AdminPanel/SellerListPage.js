// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const SellerListPage = () => {
//     const [sellers, setSellers] = useState([]);
//
//     useEffect(() => {
//         const fetchSellers = async () => {
//             try {
//                 // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-comments-admin/${orderId}`, {
//
//                     const response = await fetch(`${process.env.REACT_APP_API_URL}/sellers`);
//                 const data = await response.json();
//                 setSellers(data);
//             } catch (error) {
//                 console.error('Error fetching sellers:', error);
//             }
//         };
//         fetchSellers();
//     }, []);
//
//     return (
//         <div>
//             <h2 style={{marginTop:"311px", color:"red"}}>Список продавцов</h2>
//             <ul>
//                 {sellers.map(seller => (
//                     <li key={seller._id}>
//                         <Link to={`/sellers/${seller._id}`}>{seller.name}</Link>
//                     </li>
//                 ))}
//             </ul>
//             <Link to="/sellers/register">Добавить нового продавца</Link>
//         </div>
//     );
// };
//
// export default SellerListPage;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// const SellerListPage = () => {
//     const [sellers, setSellers] = useState([]); // Состояние для хранения данных о продавцах
//
//     useEffect(() => {
//         const fetchSellers = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/sellers`);
//                 const data = await response.json();
//                 setSellers(data);
//             } catch (error) {
//                 console.error('Error fetching sellers:', error);
//             }
//         };
//         fetchSellers();
//     }, []);
//
//     // Функция для обновления состояния с данными о продавцах
//     const fetchSellersFromDatabase = async () => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/sellers`);
//             const data = await response.json();
//             setSellers(data);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };
//
//     return (
//         <div>
//             <h2 style={{ marginTop: "311px", color: "red" }}>Список продавцов</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Имя</th>
//                     <th>Фамилия</th>
//                     <th>Email</th>
//                     <th>Телефон</th>
//                     <th>Название компании</th>
//                     <th>Описание компании</th>
//                     <th>Пароль</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {sellers.map((seller, index) => (
//                     <tr key={index}>
//                         <td>{seller.firstName}</td>
//                         <td>{seller.lastName}</td>
//                         <td>{seller.email}</td>
//                         <td>{seller.phone}</td>
//                         <td>{seller.companyName}</td>
//                         <td>{seller.companyDescription}</td>
//                         <td>{seller.password}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             <Link to="/sellers/register">Добавить нового продавца</Link>
//         </div>
//     );
// };
//
// export default SellerListPage;
//
//



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from "axios";
// import SellerRegistrationForm from "../Header/SellerRegistrationForm";
//
// const SellerListPage = () => {
//     const [sellers, setSellers] = useState([]); // Состояние для хранения данных о продавцах
//     const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
//     // Функция для загрузки данных о продавцах из базы данных
//     const fetchSellersFromDatabase = async () => {
//         try {
//             const response = await fetch(`${apiUrl}/sellers`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch sellers');
//             }
//             const data = await response.json();
//             setSellers(data);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//
//     };
//     fetchSellersFromDatabase();
//
//
//
//     return (
//         <div>
//             <h2 style={{ marginTop: "311px", color: "red" }}>Список продавцов</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Имя</th>
//                     <th>Фамилия</th>
//                     <th>Email</th>
//                     <th>Телефон</th>
//                     <th>Название компании</th>
//                     <th>Описание компании</th>
//                     <th>Пароль</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {sellers.map((seller, index) => (
//                     <tr key={index}>
//                         <td>{seller.firstName}</td>
//                         <td>{seller.lastName}</td>
//                         <td>{seller.email}</td>
//                         <td>{seller.phone}</td>
//                         <td>{seller.companyName}</td>
//                         <td>{seller.companyDescription}</td>
//                         <td>{seller.password}</td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//
//
//         </div>
//     );
// };
//
// export default SellerListPage;


import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './SellerListPage.css';
import SellerItem from "./SellerItem";

// const SellerListPage = () => {
//     const [sellers, setSellers] = useState([]); // Состояние для хранения данных о продавцах
//     const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
//     const history = useHistory();
//     // Функция для загрузки данных о продавцах из базы данных
//     const fetchSellersFromDatabase = async () => {
//         try {
//             const response = await fetch(`${apiUrl}/api/sellers`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch sellers');
//             }
//             const data = await response.json();
//             setSellers(data);
//         } catch (error) {
//             console.error('Error fetching sellers:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchSellersFromDatabase();
//     }, []); // Вызываем fetchSellersFromDatabase только при монтировании компонента
//
//
//     const handleClose = () => {
//         history.push('/');
//     };
//
//
//     return (
//         <div className="sellersListPage">
//             <h2 className="sellerTitle">Список продавцов</h2>
//             <span className="sellersListClose" type="button" onClick={handleClose}>
//                     &#10006;
//                 </span>
//             <table>
//                 <thead>
//                 <tr>
//                     <th>Название компании</th>
//                     <th>Имя Фам.</th>
//                     {/*<th>Фамилия</th>*/}
//                     <th>Email</th>
//                     <th>Телефон</th>
//                     {/*<th>Название компании</th>*/}
//                     <th>Чем занимается компания</th>
//                     <th>Время</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {sellers.map((seller, index) => (
//                     <tr key={index}>
//                         <td>{seller.companyName}</td>
//                         <td>{seller.name}</td>
//                         {/*<td>{seller.firstName}</td>*/}
//                         {/*<td>{seller.lastName}</td>*/}
//                         <td>{seller.email}</td>
//                         <td>{seller.phoneNumber}</td>
//                         {/*<td>{seller.companyName}</td>*/}
//                         <td>{seller.companyDescription}</td>
//                         <td>{new Date(seller.createdAt).toLocaleString()}</td> {/* Отображение даты и времени создания */}
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// export default SellerListPage;



const SellerListPage = () => {
    const [sellers, setSellers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const history = useHistory();

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
            <h2 className="sellerTitle">Список продавцов</h2>
            <span className="sellersListClose" type="button" onClick={handleClose}>
                &#10006;
            </span>
            <table>
                <thead>
                <tr>
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
                {sellers.map((seller, index) => (
                    <tr key={index}>
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