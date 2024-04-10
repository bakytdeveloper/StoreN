import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import bas from './../ProductList/basket.png';

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


    // Функция для исправления пути к изображениям
    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", ""); // Удаление лишней части пути к изображениям
    };

    return (
        <div style={{marginTop:"110px"}}>
            <h1>Мои товары</h1>
            <button style={{fontSize:"25px", fontWeight:"bold", padding:"0"}} onClick={handleGoBack}>
                Назад к профилю
            </button>

            <div className="product-list">
                {/* Здесь отображаем информацию о товарах */}
                {sellerProducts.map((product) => (
                    <div className="product-card" key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details">
                                <div className="type">{product.type}</div>
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.name}</div>
                                <div className="price">
                                    <span>KGS</span> {product.price}
                                </div>
                            </div>
                        </Link>
                        <div className="actions">
                            <button
                                className="cart-button"
                                title="Add to Cart"
                                // onClick={() => handleAddToCart(product)}
                            >
                                <strong>+</strong>
                                <img style={{ width: '26px', height: '26px' }} src={bas} alt="Cart" />
                            </button>
                            <button
                                className="buy-button"
                                title="Buy Now"
                                // onClick={() => handleBuyNow(product)}
                            >
                                Заказать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SellerProductsPage;

