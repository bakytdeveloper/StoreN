// SellerProductsPage.js
import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

const SellerProductsPage = () => {
    const [sellerProducts, setSellerProducts] = useState([]);
    const history = useHistory();

    useEffect(() => {
        // Здесь вы можете отправить запрос на сервер для получения информации о товарах данного продавца
        // и установить полученные данные в sellerProducts
    }, []);

    const handleGoBack = () => {
        history.goBack(); // Переход на предыдущую страницу
    };

    return (
        <div style={{marginTop:"110px"}}>
            <h1>Мои товары</h1>
            <button style={{fontSize:"25px", fontWeight:"bold", padding:"0"}} onClick={handleGoBack}>
                Назад к профилю
            </button> {/* Кнопка "крестик" */}
            {/*<button style={{fontSize:"25px", fontWeight:"bold", padding:"0"}} onClick={handleGoBack}>&times;</button> /!* Кнопка "крестик" *!/*/}

            <div>
                {/* Здесь отображаем информацию о товарах */}
                {sellerProducts.map((product) => (
                    <div key={product._id}>
                        <h3>{product.name}</h3>
                        {/* Другие детали товара */}
                    </div>
                ))}
            </div>
            {/*<Link to="/sellers/profile">Назад к профилю</Link>*/}
        </div>
    );
};

export default SellerProductsPage;
