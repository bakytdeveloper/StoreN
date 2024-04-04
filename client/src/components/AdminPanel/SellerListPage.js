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



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import SellerRegistrationForm from "../Header/SellerRegistrationForm";

const SellerListPage = () => {
    const [sellers, setSellers] = useState([]); // Состояние для хранения данных о продавцах
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    // Функция для загрузки данных о продавцах из базы данных
    const fetchSellersFromDatabase = async () => {
        try {
            const response = await fetch(`${apiUrl}/sellers`);
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



    return (
        <div>
            <h2 style={{ marginTop: "311px", color: "red" }}>Список продавцов</h2>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Название компании</th>
                    <th>Описание компании</th>
                    <th>Пароль</th>
                </tr>
                </thead>
                <tbody>
                {sellers.map((seller, index) => (
                    <tr key={index}>
                        <td>{seller.firstName}</td>
                        <td>{seller.lastName}</td>
                        <td>{seller.email}</td>
                        <td>{seller.phone}</td>
                        <td>{seller.companyName}</td>
                        <td>{seller.companyDescription}</td>
                        <td>{seller.password}</td>
                    </tr>
                ))}
                </tbody>
            </table>


        </div>
    );
};

export default SellerListPage;