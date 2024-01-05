// // src/components/ProductDetails/ProductDetails.js
//
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import './ProductDetails.css';
//
// const ProductDetails = () => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//
//     useEffect(() => {
//         // Мокап запроса к бэкенду для получения информации о товаре
//         // В реальном проекте замените на реальные запросы к вашему бэкенду
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5500/api/products/${productId}`); // Замените на реальный эндпоинт
//                 const data = await response.json();
//                 setProduct(data.product);
//             } catch (error) {
//                 console.error('Error fetching product details:', error);
//             }
//         };
//
//         fetchProductDetails();
//     }, [productId]);
//
//     if (!product) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className="product-details">
//             <img src={product.images[0]} alt={product.name} />
//             <div className="details">
//                 <div className="type">{product.type}</div>
//                 <div className="brand">{product.brand}</div>
//                 <div className="name">{product.name}</div>
//                 <div className="price">${product.price}</div>
//                 <div className="description">{product.description}</div>
//                 <div className="characteristics">
//                     <h3>Characteristics:</h3>
//                     <ul>
//                         {product.characteristics.map((char) => (
//                             <li key={char.name}>
//                                 <strong>{char.name}:</strong> {char.value}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default ProductDetails;




// src/components/ProductDetails/ProductDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        // Мокап запроса к бэкенду для получения информации о товаре
        // В реальном проекте замените на реальные запросы к вашему бэкенду
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5500/api/products/${productId}`); // Замените на реальный эндпоинт
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
        // Мокап перенаправления на предыдущую страницу
        // В реальном проекте замените на свой маршрут или метод возврата
        window.history.back();
    };


    return (
        <div className="product-details">
            <button className="close-button" onClick={handleClose}>
                &#10006;
            </button>
            <div className="image-gallery">


                <img src={selectedImage} alt={product.name} className="main-image" />
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
            </div>
            <div className="details">

                alt={product.name} />
                <div className="details">

                    <div className="type">{product.type}</div>
                    <div className="brand">{product.brand}</div>
                    <div className="name">{product.name}</div>
                    {/*<div className="price">${product.price}</div>*/}
                    <div className="description">{product.description}</div>
                    <div className="characteristics">
                        <h3>Characteristics:</h3>
                        <ul>
                            {product.characteristics.map((char) => (
                                <li key={char.name}>
                                    <strong>{char.name}:</strong> {char.value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="price">${product.price}</div>

                </div>
            </div>
            <div className="actions">
                <button className="buy-now">Купить сейчас</button>
                <button className="add-to-cart">Положить в корзину</button>
            </div>
        </div>
    );
};

export default ProductDetails;
