import React, { useState, useEffect } from 'react';
import './../AdminPanel/AdminPanel.css';
import {Link, useHistory} from "react-router-dom";
import './SellerProductsPage.css'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FaEllipsisV, FaEye, FaEyeSlash} from "react-icons/fa";

const SellerProductsPage = ({setShowSidebar}) => {
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
    });
    const imageBaseUrl = process.env.REACT_APP_API_URL;

    const history = useHistory();


    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    // Проверка, аутентифицирован ли пользователь
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
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
                setProducts(prevProducts => prevProducts.filter(product => product._id !== selectedProduct));
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
            setShowConfirmationModal(false);
            setSelectedProduct(null);
            document.body.classList.remove('modal_open');
        }
    };

    const handleToggleActive = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}/toggle-active`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedProduct = await response.json();
                setProducts(prevProducts =>
                    prevProducts.map(product =>
                        product._id === productId ? { ...product, isActive: updatedProduct.product.isActive } : product
                    )
                );
            } else {
                const errorData = await response.json();
                console.error('Failed to toggle product activity:', errorData.message);
            }
        } catch (error) {
            console.error('Failed to toggle product activity:', error);
        }
    };

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

    const handleToggleMenu = (e) => {
        // Закрываем все открытые меню
        document.querySelectorAll('.product-actions-menu.show').forEach(menu => {
            if (menu !== e.currentTarget.nextElementSibling) {
                menu.classList.remove('show');
            }
        });

        // Переключаем текущее меню
        e.currentTarget.nextElementSibling.classList.toggle('show');
    };

    const handleCloseMenu = (e) => {
        e.currentTarget.parentElement.classList.remove('show');
    };


    return (
        <div className="seller-panel" >
            <h1>Мои товары</h1>
            <div className='sellerButtons'>
                <button className="openProfile"  onClick={handleGoBack}>
                    Назад к профилю
                </button>
                <button className="newProduct" onClick={handleCreateProduct}> Создать продукт</button>

            </div>


            <div>
                <ToastContainer /> {/* Добавляем контейнер для оповещений */}
            </div>

            <div className="products-list my-products seller-products-page-products-list">
                {products.map((product) => (
                    <div
                        className={`product-card product-card-seller ${!product.isActive ? 'inactive-product' : ''}`}
                        key={product._id}
                    >
                        <div className="product-card-actions">
                            <button
                                className="product-actions-btn"
                                onClick={handleToggleMenu}
                            >
                                <FaEllipsisV />
                            </button>
                            <div className="product-actions-menu">
                                <button className="close-menu" onClick={handleCloseMenu}>
                                    &#10006;
                                </button>
                                <button className="product-actions-menu-edit" onClick={() => handleEditProduct(product)}>&#128736; Edit</button>
                                <button className="product-actions-menu-edit" onClick={() => handleDeleteProduct(product._id)}>&#10006; Delete</button>
                                <button className="product-actions-menu-edit" onClick={() => handleToggleActive(product._id)}>
                                    {product.isActive ? <FaEyeSlash /> : <FaEye />} {product.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                            </div>
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
                                <div className="discounted-price">
                                    {product.isActive ? (
                                        <>
                                            {product.originalPrice ? (
                                                <div className="price-red" style={{ fontSize: "18px" }}>{product.price} сом</div>
                                            ) : (
                                                <div className="price" style={{ fontSize: "17px" }}>{product.price} сом</div>
                                            )}
                                            {product.originalPrice && product.originalPrice > product.price && (
                                                <div className="original-price"><s>{product.originalPrice} сом</s></div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="price" style={{ fontSize: "17px" }}>Не доступен</div>
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



