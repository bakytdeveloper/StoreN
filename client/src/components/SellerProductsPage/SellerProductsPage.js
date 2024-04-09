import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const SellerProductsPage = () => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchSellerProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSellerProducts(data);
                } else {
                    console.error('Error fetching seller products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching seller products:', error);
            }
        };

        fetchSellerProducts();
    }, []);

    const handleGoBack = () => {
        history.goBack(); // Переход на предыдущую страницу
    };

    return (
        <div style={{marginTop:"110px"}}>
            <h1>Мои товары</h1>
            <button style={{fontSize:"25px", fontWeight:"bold", padding:"0"}} onClick={handleGoBack}>
                Назад к профилю
            </button>

            <div>
                {/* Здесь отображаем информацию о товарах */}
                {sellerProducts.map((product) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        <p>Описание: {product.description}</p>
                        <p>Цена: {product.price}</p>
                        {/* Другие детали товара */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerProductsPage;
