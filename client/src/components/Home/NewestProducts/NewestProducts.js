
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NewestProducts.css';

const NewestProducts = ({ apiUrl }) => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewestProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/products/newest`, { timeout: 10000 });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setNewestProducts(data);
                } else {
                    throw new Error('Unexpected response format');
                }
            } catch (error) {
                setError(error.message);
                console.error('Error fetching newest products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewestProducts();
    }, [apiUrl]);

    const fixImagePath = (imagePath) => {
        return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <div className="newest-products">
            <h2 className="newest-products-title">Самые Новые Товары</h2>
            <div className="product-list new-product">
                {newestProducts.map((product) => (
                    <div className="product-card new-cards" key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.images && product.images.length > 0 ? fixImagePath(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            <div className="details">
                                <div className="type">{product.type}</div>
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}</div>
                                <div className="price">KGS {product.price}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewestProducts;
