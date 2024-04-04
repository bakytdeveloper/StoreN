import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SellerListPage = () => {
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/orders/update-comments-admin/${orderId}`, {

                    const response = await fetch(`${process.env.REACT_APP_API_URL}/sellers`);
                const data = await response.json();
                setSellers(data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };
        fetchSellers();
    }, []);

    return (
        <div>
            <h2 style={{marginTop:"311px", color:"red"}}>Список продавцов</h2>
            <ul>
                {sellers.map(seller => (
                    <li key={seller._id}>
                        <Link to={`/sellers/${seller._id}`}>{seller.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/sellers/register">Добавить нового продавца</Link>
        </div>
    );
};

export default SellerListPage;
