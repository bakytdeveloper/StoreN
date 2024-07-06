



import React, { useState, useEffect } from 'react';
import ProductForm from './../AdminPanel/ProductForm';
import './../AdminPanel/AdminPanel.css';
import {Link, useHistory} from "react-router-dom";
import bas from './../ProductList/basket.png';
import './SellerProductsPage.css'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Состояние для отслеживания видимости модального окна подтверждения удаления
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        type: '',
        brand: '',
        characteristics: [],
        images: [],
        // quantity: 10
    });
    const imageBaseUrl = process.env.REACT_APP_API_URL; // Базовый URL для изображений на сервере

    const history = useHistory();

    // Проверка, аутентифицирован ли пользователь
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            // Если отсутствует токен или роль не является "seller", перенаправляем на страницу входа
            history.push('/login');
        }
    }, [history]);


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
                    setProducts(data);
                } else {
                    console.error('Error fetching seller products:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching seller products:', error);
            }
        };

        fetchSellerProducts();
    }, []);

    const handleCreateProduct = () => {
        history.push('/sellers-products');
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        history.push(`/product-form/${product._id}`, { product });
    };

    const handleDeleteProduct = async (productId) => {
        setSelectedProduct(productId); // Сохраняем id продукта для удаления
        setShowConfirmationModal(true); // Показываем модальное окно подтверждения удаления
        document.body.classList.add('modal_open'); // Добавляем класс для блокировки скролла
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                // Remove the product from the local state
                setProducts(prevProducts => prevProducts.filter(product => product._id !== selectedProduct));

                // Also remove associated images from the state
                const deletedProduct = products.find(product => product._id === selectedProduct);
                if (deletedProduct && deletedProduct.images) {
                    for (const imageUrl of deletedProduct.images) {
                        const updatedImages = formData.images.filter(image => image !== imageUrl);
                        setFormData(prevState => ({
                            ...prevState,
                            images: updatedImages
                        }));
                    }
                }

                toast.success('Продукт успешно удален');
            } else {
                console.error('Failed to delete product');
                toast.error('Не удалось удалить продукт');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Ошибка при удалении продукта');
        } finally {
            setShowConfirmationModal(false); // Close the confirmation modal
            setSelectedProduct(null); // Reset selected product
            document.body.classList.remove('modal_open'); // Remove class to unlock scroll
        }
    };



    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedProduct(null);
    };


    // const fixImagePath = (imagePath) => {
    //     return imagePath.replace("images/W/MEDIAX_792452-T2/", "");
    // };

    const handleGoBack = () => {
        history.goBack();
    };

    const getFullImageUrl = (image) => {
        return image.startsWith('/uploads') ? `${imageBaseUrl}${image}` : image;
    };

    const calculateDiscountPercentage = (originalPrice, price) => {
        if (!originalPrice || originalPrice <= price) return 0;
        return Math.floor((originalPrice - price) / originalPrice * 100).toFixed();
    };

    return (
        <div className="seller-panel">
            <h1>Мои товары</h1>
            <div className='sellerButtons'>
                <button className="openProfile"  onClick={handleGoBack}>
                    Назад к профилю
                </button>
                <button className="newProduct" onClick={handleCreateProduct}> Создать продукт</button>

            </div>


            <div>
                <ToastContainer /> {/* Добавляем контейнер для оповещений */}
                {/* Остальной код компонента */}
            </div>

            <div className="products-list my-products  seller-products-page-products-list">
                {products.map((product) => (
                    <div className="product-card product-card-seller" key={product._id}>
                        <div className="sellerEditDelete" >
                            <button className="seller-btn-edit" style={{background: "none"}} onClick={() => handleEditProduct(product)}>&#128736;</button>
                            <button className="seller-btn-delete" style={{background: "none"}}  onClick={() => handleDeleteProduct(product._id)}>&#10006;</button>

                        </div>

                        <Link to={`/products/${product._id}`}>

                            <div className="product-card-images">
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <div className="discount-percentage-badge">
                                        -{calculateDiscountPercentage(product.originalPrice, product.price)}%
                                    </div>
                                )}
                            <img
                                src={product.images && product.images.length > 0 ? getFullImageUrl(product.images[0]) : 'placeholder.jpg'}
                                alt={product.name}
                            />
                            </div>
                            <div className="details details-seller-products-page">
                                <div className="type">{product.type}</div>
                                <div className="brand">{product.brand}</div>
                                <div className="name">{product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name}</div>

                                {/*<div className="name">{product.name}</div>*/}
                                <div className="discounted-price">

                                    {/*<div className="price">KGS {product.price}</div>*/}

                                    {product.originalPrice ? (
                                        <div className="price-red" style={{fontSize:"18px"}}>{product.price} сом</div>
                                    ) : (
                                        <div className="price" style={{fontSize:"17px"}}>{product.price} сом</div>
                                    )}

                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <div className="original-price"><s>{product.originalPrice} сом</s></div>
                                    )}
                                </div>
                            </div>
                        </Link>

                    </div>
                ))}
            </div>
            
            {showConfirmationModal && (
                <div className="modal-background">
                    <div className="confirmation-modal">
                        <p>Вы уверены, что хотите удалить продукт?</p>
                        <div className="deleteYN">
                            <button className="deleteY" onClick={handleConfirmDelete}>Да</button>
                            <button className="deleteN" onClick={() => setShowConfirmationModal(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerProductsPage;



