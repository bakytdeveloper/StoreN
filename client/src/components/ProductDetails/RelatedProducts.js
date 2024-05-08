import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RelatedProducts = ({ productId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/related/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setRelatedProducts(data);
                } else {
                    console.error('Error fetching related products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [productId]);




    return (
        <div className="related-products">
            <h2>Похожие товары</h2>
            <div className="products-lists">
                {relatedProducts.map((product) => (
                    <div className="product-cards" key={product._id}>
                        <Link to={`/products/${product._id}`}>
                            <img
                                src={product.images && product.images.length > 0 ? product.images[0] : 'placeholder.jpg'}
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
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
