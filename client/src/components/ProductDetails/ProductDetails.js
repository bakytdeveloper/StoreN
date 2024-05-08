


import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams, useHistory } from 'react-router-dom';
import RelatedSellerProducts from "./RelatedSellerProducts";

const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        // Clear the flag when the component is unmounted
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
                const data = await response.json();
                if (!data.product) {
                    console.error('Product data is undefined or null');
                    return;
                }
                const productData = data.product;
                const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
                setProduct({
                    ...productData,
                    images: images
                });
                setSelectedImage(images[0]); // Set the first image as the main one
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
        // history.push('/');
        history.goBack(); // Go back to the previous page
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
            // Navigate to the cart after adding the item only if it's "Buy Now"
            history.push('/cart');
        }
    };

    return (
        <div className="product-details-container">
            <div className="product-details">
                <button className="closeButton" onClick={handleClose}>
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
                                <li className="character" key={char.name}>
                                    <strong>{char.name}:</strong> {char.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="price">{product.price} KGS</div>
                    <div className="actions">
                        <button className="buy-now" onClick={() => handleAddToCart(true)}>
                            Купить сейчас
                        </button>
                        <button className="add-to-cart" onClick={() => handleAddToCart()}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
            <RelatedSellerProducts productId={productId} />
        </div>
    );
};

export default ProductDetails;
