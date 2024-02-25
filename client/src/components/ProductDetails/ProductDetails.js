


// src/components/ProductDetails/ProductDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        // Очищаем флаг при размонтировании компонента
        return () => setShowSidebar(false);
    }, [setShowSidebar]);

    useEffect(() => {
        // Мокап запроса к бэкенду для получения информации о товаре
        // В реальном проекте замените на реальные запросы к вашему бэкенду
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${productId}`);
                const data = await response.json();
                setProduct(data.product);
                setSelectedImage(data.product.images[0]); // Устанавливаем первую картинку как главную
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleClose = () => {
        history.goBack(); // Переход назад
    };

    const handleAddToCart = (buyNow = false) => {
        const itemInCart = cartItems.find((item) => item.productId === product._id);

        if (itemInCart) {
            const updatedCart = cartItems.map((item) =>
                item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCart);
        } else {
            setCartItems([
                ...cartItems,
                {
                    productId: product._id,
                    image: product.images[0],
                    brand: product.brand,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                },
            ]);
        }

        if (buyNow) {
            // Переход в корзину после добавления товара, только если это "Купить сейчас"
            history.push('/cart');
        }
    };

    return (
        <div className="product-details">
            <button className="close-button" onClick={handleClose}>
                &#10006;
            </button>
            <div className="image-gallery">
                <div className="thumbnail-gallery">
                    {product.images.map((image) => (
                        <img
                            key={image}
                            src={image}
                            alt={product.name}
                            className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
                <img src={selectedImage} alt={product.name} className="main-image" />
            </div>
            <div className="details">
                <div className="type">{product.type}</div>
                <div className="brand">{product.brand}</div>
                <div className="name">{product.name}</div>
                <div className="description">
                    <strong>Описание:</strong> {product.description}
                </div>
                <div className="characteristics">
                    <h3>Характеристики:</h3>
                    <ul>
                        {product.characteristics.map((char) => (
                            <li  className="character" key={char.name}>
                                <strong>{char.name}:</strong> {char.value}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="price">{product.price} KGS</div>
                <div className="actions">
                    <button className="buy-now" onClick={() => handleAddToCart(true)}>
                        Купить
                    </button>
                    <button className="add-to-cart" onClick={() => handleAddToCart()}>
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
