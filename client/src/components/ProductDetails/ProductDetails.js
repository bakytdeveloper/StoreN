import React, {useState, useEffect, useCallback} from 'react';
import './ProductDetails.css';
import {useParams, useHistory, Link} from 'react-router-dom';
import RelatedSellerProducts from "./RelatedSellerProducts";
import RelatedProducts from "./RelatedProducts";
import RelatedAccessories from "./RelatedAccessories";
import ProductTabs from "./ProductTabs/ProductTabs";



const ProductDetails = ({ setShowSidebar, cartItems, setCartItems }) => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const history = useHistory();
    const [sellerName, setSellerName] = useState(null);

    const imageBaseUrl = process.env.REACT_APP_API_URL;

    // Функции переключения изображений
    const handlePrevImage = useCallback(() => {
        if (!product?.images) return;
        const newIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
        setSelectedImage(product.images[newIndex]);
        setCurrentImageIndex(newIndex);
    }, [currentImageIndex, product]);

    const handleNextImage = useCallback(() => {
        if (!product?.images) return;
        const newIndex = (currentImageIndex + 1) % product.images.length;
        setSelectedImage(product.images[newIndex]);
        setCurrentImageIndex(newIndex);
    }, [currentImageIndex, product]);

    // Обработчик клавиш клавиатуры
    const handleKeyDown = useCallback((e) => {
        if (!isModalOpen || !product?.images || product.images.length <= 1) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                handlePrevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                handleNextImage();
                break;
            case 'Escape':
                e.preventDefault();
                handleCloseModal();
                break;
            default:
                break;
        }
    }, [isModalOpen, handlePrevImage, handleNextImage, product]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

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
                if (!response.ok) {
                    if (response.status === 403) {
                        history.push('/catalog')
                        return;
                    }
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (!data.product) return;

                const productData = data.product;
                const images = productData.images ? productData.images.map(image => image.replace("images/W/MEDIAX_792452-T2/", "")) : [];
                setProduct({
                    ...productData,
                    images: images
                });
                setSelectedImage(images[0]);

                const sellerResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/products/product/${productData._id}/seller`);
                const sellerData = await sellerResponse.json();
                setSellerName(sellerData.companyName);

            } catch (error) {
                console.error('Ошибка при получении сведений о продукте:', error);
            }
        };

        fetchProductDetails();
        // eslint-disable-next-line
    }, [productId]);

    useEffect(() => {
        if (isModalOpen) {
            // Запоминаем текущую позицию скролла
            const scrollY = window.scrollY;
            // Блокируем скролл
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            document.body.style.overflow = 'hidden';
        } else {
            // Разблокируем скролл и возвращаем позицию
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            document.body.style.overflow = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }

        return () => {
            // Очистка при размонтировании компонента
            if (isModalOpen) {
                const scrollY = document.body.style.top;
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                document.body.style.overflow = '';
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (selectedImage && product?.images) {
            const index = product.images.indexOf(selectedImage);
            setCurrentImageIndex(index);
        }
    }, [selectedImage, product]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleMainImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            handleCloseModal();
            // setIsModalOpen(false);
        }
    };
    const handleModalContentClick = (e) => {
        if (e.target.classList.contains('modal-content')) {
            handleCloseModal();
            // setIsModalOpen(false);
        }
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

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    const truncatedDescription = product.description.slice(0, 100) + (product.description.length > 100 ? "..." : "");

    const calculateDiscountPercentage = (originalPrice, price) => {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.floor((originalPrice - price) / originalPrice * 100).toFixed();
    };


    return (
        <div className="product-details-container">
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleModalClick}>
                    <div className="modal-content" onClick={handleModalContentClick}>
                        <button className="modal-close-button" onClick={handleCloseModal}>×</button>
                        <img
                            src={getFullImageUrl(selectedImage)}
                            alt={product.name}
                            className="modal-image"
                        />
                        {product.images.length > 1 && (
                            <div className="modal-navigation">
                                <button className="modal-arrow modal-arrow-left" onClick={handlePrevImage}>❮</button>
                                <button className="modal-arrow modal-arrow-right" onClick={handleNextImage}>❯</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="product-details">
                <div className="block-product-details-close-button">
                    <button className="product-details-close-button" onClick={handleClose}>
                        ⟻ <span className="span-product-details-close-button">Назад</span>
                    </button>
                </div>
                <div className="main-picture-detail-two">
                    {product.originalPrice && product.originalPrice > product.price && (
                        <div className="main-picture-detail-two-discount-percentage-badge">
                            -{calculateDiscountPercentage(product.originalPrice, product.price)}%
                        </div>
                    )}

                    <div className="main-image-center-img" onClick={handleMainImageClick}>
                        <img className="main-image-center" src={getFullImageUrl(selectedImage)} alt={product.name} />
                    </div>
                </div>
                <div className="image-gallery">
                    <div className="thumbnail-gallery">
                        {product.images.map((image) => (
                            <img
                                key={image}
                                src={getFullImageUrl(image)}
                                alt={product.name}
                                className={selectedImage === image ? 'thumbnail active' : 'thumbnail'}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                    <div className="main-picture-detail-one">
                        {product.originalPrice && product.originalPrice > product.price && (
                            <div className="main-picture-detail-one-discount-percentage-badge">
                                -{calculateDiscountPercentage(product.originalPrice, product.price)}%
                            </div>
                        )}

                        <div className="main-picture-detail-one-img" onClick={handleMainImageClick}>
                            <img className="main-image-center" src={getFullImageUrl(selectedImage)} alt={product.name} />
                        </div>
                    </div>
                </div>

                {/* Остальной код остается без изменений */}
                <div className="details">
                    <div className="details-names">
                        <div className="details-names-all">
                            <div className='details-names-all-type-band'>
                                <div className="type-details">{product.type}</div>
                                <div className="brand-details">{product.brand}</div>
                            </div>
                            <div className="name-details">{product.name}</div>
                        </div>

                        <div className="details-names-price">
                            {product.originalPrice ? (
                                <div className="price-red">{product.price} сом</div>
                            ) : (
                                <div className="price">{product.price} сом</div>
                            )}

                            {product.originalPrice && product.originalPrice > product.price && (
                                <div className="details-names-price-original-price"><s>{product.originalPrice} сом</s></div>
                            )}
                        </div>

                        {sellerName && (
                            <div className="seller-details">
                                <div>Посетите наш магазин:</div>
                                <Link to={`/catalog?sellerId=${product.seller._id}`} className="seller-link">
                                    {sellerName}
                                </Link>
                            </div>
                        )}
                    </div>
                    <hr style={{ width: "100%", height: "1px", border: "1px solid grey", background: "#a5a4a4" }} />
                    <div className="description">
                        <strong>Описание:</strong> {truncatedDescription}
                    </div>

                    <div className="product-sizes">
                        {product.sizes.length > 0 && (
                            <>
                                <h5>Размеры: {selectedSize}</h5>
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
                                <h5>Цвета: {selectedColor}</h5>
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
            <div>
                <ProductTabs description={product.description} characteristics={product.characteristics} />
            </div>

            <RelatedSellerProducts productId={productId} />
            <RelatedProducts productId={productId} />
            {product.category && !product.direction && <RelatedAccessories direction={product.category} />}
        </div>
    );
};

export default ProductDetails;