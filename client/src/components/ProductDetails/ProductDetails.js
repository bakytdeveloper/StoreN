
import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import { useParams, useHistory } from 'react-router-dom';
import RelatedSellerProducts from "./RelatedSellerProducts";
import RelatedProducts from "./RelatedProducts";
import RelatedAccessories from "./RelatedAccessories";
import ProductTabs from "./ProductTabs/ProductTabs";
import ContactInfo from "../ContactInfo/ContactInfo";



// const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
//     const { productId } = useParams();
//     const [product, setProduct] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [selectedColor, setSelectedColor] = useState(null);
//     const history = useHistory();
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//     useEffect(() => {
//         setSelectedSize(null); // Сбрасываем выбранный размер
//         setSelectedColor(null); // Сбрасываем выбранный цвет
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 const data = await response.json();
//                 if (!data.product) {
//                     console.error('Product data is undefined or null');
//                     return;
//                 }
//                 const productData = data.product;
//                 const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
//                 setProduct({
//                     ...productData,
//                     images: images
//                 });
//                 setSelectedImage(images[0]);
//             } catch (error) {
//                 console.error('Ошибка при получении сведений о продукте:', error);
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
//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//     };
//
//     const handleClose = (event) => {
//         event.preventDefault();
//         window.scrollTo({ top: 0 });
//         history.goBack();
//     };
//
//     const handleAddToCart = (buyNow = false) => {
//         const itemInCart = cartItems.find((item) => item.productId === product._id);
//
//         if (itemInCart) {
//             const updatedCart = cartItems.map((item) =>
//                 item.productId === product._id ? { ...item, quantity: item.quantity + 1 } : item
//             );
//             setCartItems(updatedCart);
//         } else {
//             setCartItems([
//                 ...cartItems,
//                 {
//                     productId: product._id,
//                     image: product.images[0],
//                     brand: product.brand,
//                     name: product.name,
//                     price: product.price,
//                     quantity: 1,
//                     size: selectedSize, // Добавляем выбранный размер
//                     color: selectedColor, // Добавляем выбранный цвет
//
//                 },
//             ]);
//         }
//
//         if (buyNow) {
//             history.push('/cart');
//         }
//     };
//
//     const truncatedDescription = product.description.slice(0, 100) + (product.description.length > 100 ? "..." : "");
//
//     return (
//         <div className="product-details-container">
//             <div className="product-details">
//                 <div className="block-product-details-close-button">
//                     <button className="product-details-close-button" onClick={handleClose}>
//                         ⟻ <span className="span-product-details-close-button">Назад</span>
//                     </button>
//                 </div>
//                 <div className="image-gallery">
//                     <div className="thumbnail-gallery">
//                         {product.images.map((image) => (
//                             <img
//                                 key={image}
//                                 src={image}
//                                 alt={product.name}
//                                 className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
//                                 onClick={() => handleImageClick(image)}
//                             />
//                         ))}
//                     </div>
//                     <img src={selectedImage} alt={product.name} className="main-image" />
//                 </div>
//                 <div className="details">
//                     <div  className="details-names" >
//                         <div className="details-names-all">
//                             <div className="type-details">{product.type}</div>
//                             <div className="brand-details">{product.brand}</div>
//                             <div className="name-details">{product.name}</div>
//                         </div>
//
//                         <div className="price-details">KGS {product.price}</div>
//
//                     </div>
//                     <hr style={{width:"100%", height:"1px", border:"1px solid grey" ,
//                         background:"#a5a4a4"}} />
//                     <div className="description">
//                         <strong>Описание:</strong> {truncatedDescription}
//                     </div>
//
//
//                     <div className="product-sizes">
//                         {product.sizes.length > 0 && (
//                             <>
//                                 <h3>Размеры: {selectedSize}</h3>
//                                 <div className="size-list">
//                                     {product.sizes.map((size, index) => (
//                                         <div
//                                             key={index}
//                                             className={selectedSize === size ? 'size selected-size' : 'size'}
//                                             onClick={() => setSelectedSize(size)}
//                                         >
//                                             {size}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         )}
//                     </div>
//                     <div className="product-colors">
//                         {product.colors.length > 0 && (
//                             <>
//                                 <h3>Цвета: {selectedColor}</h3>
//                                 <div className="color-list">
//                                     {product.colors.map((color, index) => (
//                                         <div
//                                             key={index}
//                                             className={selectedColor === color.name ? 'color selected-color' : 'color'}
//                                             onClick={() => setSelectedColor(color.name)}
//                                         >
//                                             <div className="color-box" style={{ backgroundColor: color.value }}></div>
//                                             {/*<div className="color-name">{color.name}</div>*/}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </>
//                         )}
//                     </div>
//
//                     <div className="actions-details">
//                         <button className="detail-buy-now" onClick={() => handleAddToCart(true)}>
//                             Купить сейчас
//                         </button>
//                         <button className="detail-add-to-cart" onClick={() => handleAddToCart()}>
//                             Добавить в корзину
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <ProductTabs description={product.description} characteristics={product.characteristics} />
//
//             <RelatedSellerProducts productId={productId} />
//             <RelatedProducts productId={productId} />
//             {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
//             <div className="home-page-footer">
//                 <ContactInfo />
//             </div>
//         </div>
//     );
// };
//
// export default ProductDetails;





const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        setSelectedSize(null);
        setSelectedColor(null);
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
                setSelectedImage(images[0]);
            } catch (error) {
                console.error('Ошибка при получении сведений о продукте:', error);
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

    const handleClose = (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0 });
        history.goBack();
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
                    size: selectedSize,
                    color: selectedColor,
                },
            ]);
        }

        if (buyNow) {
            history.push('/cart');
        }
    };

    const truncatedDescription = product.description.slice(0, 100) + (product.description.length > 100 ? "..." : "");

    return (
        <div className="product-details-container">
            <div className="product-details">
                <div className="block-product-details-close-button">
                    <button className="product-details-close-button" onClick={handleClose}>
                        ⟻ <span className="span-product-details-close-button">Назад</span>
                    </button>
                </div>
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

                    <div className="main-picture-detail">
                        <img src={selectedImage} alt={product.name} className="main-image" />

                    </div>

                </div>
                <div className="details">
                    <div className="details-names">
                        <div className="details-names-all">
                            <div className="type-details">{product.type}</div>
                            <div className="brand-details">{product.brand}</div>
                            <div className="name-details">{product.name}</div>
                        </div>

                        <div className="price-details">KGS {product.price}</div>
                    </div>
                    <hr style={{ width: "100%", height: "1px", border: "1px solid grey", background: "#a5a4a4" }} />
                    <div className="description">
                        <strong>Описание:</strong> {truncatedDescription}
                    </div>

                    <div className="product-sizes">
                        {product.sizes.length > 0 && (
                            <>
                                <h3>Размеры: {selectedSize}</h3>
                                <div className="size-list">
                                    {product.sizes.map((size, index) => (
                                        <div
                                            key={index}
                                            className={selectedSize === size ? 'size selected-size' : 'size'}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="product-colors">
                        {product.colors.length > 0 && (
                            <>
                                <h3>Цвета: {selectedColor}</h3>
                                <div className="color-list">
                                    {product.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            className={selectedColor === color.name ? 'color selected-color' : 'color'}
                                            onClick={() => setSelectedColor(color.name)}
                                        >
                                            <div className="color-box" style={{ backgroundColor: color.value }}></div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="actions-details">
                        <button className="detail-buy-now" onClick={() => handleAddToCart(true)}>
                            Купить сейчас
                        </button>
                        <button className="detail-add-to-cart add-to-cart-fixed" onClick={() => handleAddToCart()}>
                            Добавить в корзину
                        </button>
                    </div>
                </div>
            </div>
            <ProductTabs description={product.description} characteristics={product.characteristics} />

            <RelatedSellerProducts productId={productId} />
            <RelatedProducts productId={productId} />
            {product.category && !product.direction && <RelatedAccessories direction={product.category} />}            <div className="home-page-footer">
                <ContactInfo />
            </div>
        </div>
    );
};

export default ProductDetails;