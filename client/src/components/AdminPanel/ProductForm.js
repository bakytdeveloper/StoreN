import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from 'axios';
import './ProductForm.css';
import ImageManager from "./ImageManager";


const ProductForm = ({ setShowSidebar }) => {
    // eslint-disable-next-line
    const [selectedProduct, setSelectedProduct] = useState(null);
    // eslint-disable-next-line
    const [products, setProducts] = useState([]);
    const {productId} = useParams();
    // eslint-disable-next-line
    const [productData, setProductData] = useState(null);
    const location = useLocation();
    const {product} = location.state || {};
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        direction: "",
        price: '',
        originalPrice: '',
        category: '',
        type: '',
        brand: '',
        gender: '',
        characteristics: [],
        images: [],
        sizes: [],
        colors: [],
        quantity: 10,

    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отслеживания отправки формы
    const [direction, setDirection] = useState('');
    // eslint-disable-next-line
    const [allCategories, setAllCategories] = useState([]);
    // eslint-disable-next-line
    const [imagePreview, setImagePreview] = useState(null);
    const history = useHistory();
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    const handleAddImageByUrl = () => {
        if (formData.images.length >= 5) {
            toast.error('Можно добавить не более 5 изображений');
            return;
        }
        if (imageUrl.trim()) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: [...prevFormData.images, imageUrl.trim()]
            }));
            setImageUrl('');
        }
    };

    const closeProductForm = () => {
        history.goBack()
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            history.push('/');
        }
    }, [history]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (!productId) {
                    return;
                }

                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("DATA:", data)
                    setProductData(data);
                } else {
                    console.error('Failed to fetch product data');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProduct();
    }, [productId]);


    useEffect(() => {
        if (product) {
            setFormData(product);
            if (product.category === 'Аксессуары' && product.direction) {
                setDirection(product.direction); // Установить значение direction, если товар аксессуар и у него есть значение в свойстве direction
            }
        }
    }, [product]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.categories);
                } else {
                    console.error('Failed to fetch categories');
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);



    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types`);
                if (response.ok) {
                    const data = await response.json();
                    setTypes(data.types);  // Исправьте поле здесь
                } else {
                    console.error('Failed to fetch types');  // Сообщение об ошибке
                }
            } catch (error) {
                console.error('Error fetching types:', error);  // Сообщение об ошибке
            }
        };
        fetchTypes();
    }, []);




    const handleCharacteristicChange = (index, field, value) => {
        const updatedCharacteristics = [...formData.characteristics];
        updatedCharacteristics[index][field] = value;
        setFormData({...formData, characteristics: updatedCharacteristics});
    };

    const handleFileChange = async (e) => {

        if (formData.images.length >= 5) {
            toast.error('Можно добавить не более 5 изображений');
            return;
        }

        const file = e.target.files[0];
        const newFormData = new FormData();
        newFormData.append('image', file);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/sellers/upload`, newFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 200) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    images: [...prevFormData.images, response.data.imageUrl]
                }));
                setImagePreview(URL.createObjectURL(file));
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };


    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true); // Устанавливаем состояние отправки формы в true
        console.log(typeof formData.price, typeof formData.originalPrice)
        if (formData.originalPrice && Number(formData.price) >= Number(formData.originalPrice)) {
            toast.error('Цена не должна быть больше или равна Цене до скидки');
            setIsSubmitting(false);
            return;
        }

        try {
            let response;
            const token = localStorage.getItem('token');

            const sellerProductsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!sellerProductsResponse.ok) {
                console.error('Error fetching seller products:', sellerProductsResponse.statusText);
                return;
            }

            const sellerProducts = await sellerProductsResponse.json();

            if (!productId) {
                const existingProduct = sellerProducts.find(
                    (product) =>
                        product.name === formData.name && product.brand === formData.brand
                );

                if (existingProduct) {
                    toast.error('Такой товар уже существует');
                    setIsSubmitting(false);
                    return;
                }
            }

            console.log('Отправляемые данные:', formData);

            if (productId) {
                response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/sellers/products/${productId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
                    }
                );
            } else {
                response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/sellers/products`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ ...formData, direction }),
                    }
                );
            }

            if (response.ok) {
                clearFormFields();
                const updatedProduct = await response.json();
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === updatedProduct._id ? updatedProduct : product
                    )
                );
                setSelectedProduct(null);
                toast.success(productId ? 'Товар успешно обновлен!' : 'Товар успешно создан!');
            } else {
                console.error('Failed to save product');
            }
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const clearFormFields = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            originalPrice: '',
            category: '',
            type: '',
            brand: '',
            gender: '',
            characteristics: [],
            images: [],
            sizes: [],
            colors: [],
            quantity: 10,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) {
            return;
        }
        setIsSubmitting(true); // Устанавливаем состояние отправки формы в true

        const hasValidCharacteristics = formData.characteristics.some(char => char.name.trim() !== '' && char.value.trim() !== '');
        const hasValidImages = formData.images.some(image => image.trim() !== '');

        if (!hasValidCharacteristics) {
            toast.error('Характеристики должны быть заполнены хотя бы одним значением');
            setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false
            return;
        }
        if (!hasValidImages) {
            toast.error('Изображения должны быть заполнены хотя бы одним значением');
            setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false
            return;
        }

        const originalPrice = parseFloat(formData.originalPrice);
        const price = parseFloat(formData.price);
        if (!isNaN(originalPrice) && !isNaN(price) && price >= originalPrice) {
            toast.error('Цена не должна быть больше или равна Цене до скидки');
            setIsSubmitting(false);
            return;
        }



        handleFormSubmit(formData);
    };


    const handleClose = () => {
        history.goBack();
    };


    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
                if (response.ok) {
                    const data = await response.json();
                    setAllCategories(data.categories);  // Исправьте поле здесь
                } else {
                    console.error('Failed to fetch categories');  // Исправьте сообщение об ошибке
                }
            } catch (error) {
                console.error('Error fetching categories:', error);  // Исправьте сообщение об ошибке
            }
        };
        fetchAllCategories();

    }, []);


    const handleColorChange = (index, field, value) => {
        const updatedColors = [...formData.colors];
        updatedColors[index][field] = value;
        setFormData({...formData, colors: updatedColors});
    };

    const handleSizesChange = (e) => {
        const sizes = e.target.value.split(',').map(size => size.trim());
        setFormData({...formData, sizes: sizes});
    };


    const handleDirectionChange = (value) => {
        setDirection(value);
        setFormData({...formData, direction: value}); // Обновить данные формы с учетом измененного направления
    };


    const handleImageRemove = async (index) => {
        const imageToRemove = formData.images[index];
        const token = localStorage.getItem('token'); // Предполагая, что вы храните токен в localStorage

        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/sellers/remove-image`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { imageUrl: imageToRemove }
            });

            if (response.status === 200) {
                setFormData((prevFormData) => {
                    const updatedImages = [...prevFormData.images];
                    updatedImages.splice(index, 1);
                    return {
                        ...prevFormData,
                        images: updatedImages,
                    };
                });
                toast.success('Изображение успешно удалено');
            } else {
                toast.error('Не удалось удалить изображение');
            }
        } catch (error) {
            console.error('Error removing image:', error);
            toast.error('Произошла ошибка при удалении изображения');
        }
    };

    const handleMoveImageUp = (index) => {
        if (index === 0) return;
        const newImages = [...formData.images];
        const temp = newImages[index - 1];
        newImages[index - 1] = newImages[index];
        newImages[index] = temp;
        setFormData({ ...formData, images: newImages });
    };

    const handleMoveImageDown = (index) => {
        if (index === formData.images.length - 1) return;
        const newImages = [...formData.images];
        const temp = newImages[index + 1];
        newImages[index + 1] = newImages[index];
        newImages[index] = temp;
        setFormData({ ...formData, images: newImages });
    };

    useEffect(() => {
        const handleScroll = () => {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.type === 'number') {
                activeElement.blur(); // Remove focus from number inputs on scroll
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const handleChange = async (e) => {
        const { name, value } = e.target;

        if (name === 'quantity' || name === 'originalPrice' || name === 'price') {
            // Prevent setting quantity below zero
            const newValue = parseInt(value, 10);
            if (newValue < 1) {
                toast.error('Количество не может быть меньше нуля');
                return; // Do not update state
            }
        }

        setFormData({ ...formData, [name]: value });

        if (name === 'category') {
            if (value === 'Аксессуары') {
                setDirection('');
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
                if (!response.ok) {
                    console.error('Failed to fetch products');
                    return;
                }
                const data = await response.json();

                let filteredTypes = data
                    .filter(product => product.category === value)
                    .map(product => product.type);

                const uniqueTypes = [...new Set(filteredTypes)];
                setTypes(uniqueTypes);
            } catch (error) {
                console.error('Error handling category change:', error);
            }
        }
    };

    // обработчик события wheel для инпутов с типом number
    useEffect(() => {
        const handleWheel = (e) => {
            if (e.target.type === 'number') {
                e.preventDefault(); // Prevent scrolling from changing the value
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    // фокус должен сбрасываться при скролле
    useEffect(() => {
        const handleScroll = () => {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.type === 'number') {
                activeElement.blur(); // Remove focus from number inputs on scroll
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="product-form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>{productId ? 'Редактирование товара' : 'Создание товара'}</h2>
                    <button type="button" className="close-btn" onClick={handleClose}>
                        &times;
                    </button>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Основная информация</h3>

                    <div className="form-group">
                        <label className="required">Пол:</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Выберите пол</option>
                            <option value="Мужская одежда">Мужская одежда</option>
                            <option value="Женская одежда">Женская одежда</option>
                            <option value="Детская одежда">Детская одежда</option>
                            <option value="Гаджеты">Гаджеты</option>
                            <option value="Унисекс">Унисекс</option>
                            <option value="Бытовая эл.техника">Бытовая эл.техника</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="required">Категория:</label>
                        <div className="select-with-input">
                            <select name="category" value={formData.category} onChange={handleChange}>
                                <option value="">Выберите категорию</option>
                                {categories
                                    .filter(category => category !== "Аксессуары")
                                    .map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                <option value="Аксессуары">Аксессуары</option>
                            </select>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder="Или введите свою категорию"
                                required
                            />
                        </div>
                    </div>

                    {formData.category === 'Аксессуары' && (
                        <div className="form-group">
                            <label className="required">Направление:</label>
                            <select
                                name="direction"
                                value={direction}
                                onChange={(e) => handleDirectionChange(e.target.value)}
                                required
                            >
                                <option value="">Выберите направление</option>
                                {categories
                                    .filter(category => category !== "Аксессуары")
                                    .map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                            </select>
                        </div>
                    )}

                    <div className="form-group">
                        <label className="required">Тип:</label>
                        <div className="select-with-input">
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="">Выберите тип</option>
                                {types.map((type, index) => (
                                    <option key={index} value={type}>{type}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                placeholder="Или введите свой тип"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="required">Бренд:</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label className="required">Название:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
                    </div>

                    <div className="form-group">
                        <label className="required">Описание:</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required/>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Цены и количество</h3>

                    <div className="price-group">
                        <div className="form-group">
                            <label>Цена до скидки:</label>
                            <input
                                min="0"
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-group">
                            <label className="required">Цена:</label>
                            <input
                                min="0"
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="required">Количество:</label>
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Размеры и цвета</h3>

                    <div className="form-group">
                        <label>Размеры:</label>
                        <input
                            type="text"
                            name="sizes"
                            value={Array.isArray(formData.sizes) ? formData.sizes.join(', ') : ''}
                            onChange={handleSizesChange}
                            placeholder="Введите размеры через запятую"
                        />
                        <p className="input-hint">Например: S, M, L, XL</p>
                    </div>

                    <div className="form-group">
                        <label>Цвета:</label>
                        {formData.colors && formData.colors.map((color, index) => (
                            <div key={index} className="color-input-group">
                                <input
                                    type="text"
                                    value={color.name}
                                    onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                    placeholder="Название цвета"
                                />
                                <input
                                    type="color"
                                    value={color.value}
                                    onChange={(e) => handleColorChange(index, 'value', e.target.value)}
                                />
                                <button
                                    className="remove-btn"
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        colors: formData.colors.filter((_, i) => i !== index)
                                    })}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        <button
                            className="add-btn"
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                colors: [...formData.colors, {name: '', value: '#000000'}]
                            })}
                        >
                            + Добавить цвет
                        </button>
                    </div>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Характеристики</h3>

                    {formData.characteristics.map((char, index) => (
                        <div key={index} className="characteristic-input-group">
                            <input
                                type="text"
                                value={char.name}
                                onChange={(e) => handleCharacteristicChange(index, 'name', e.target.value)}
                                placeholder="Название характеристики"
                            />
                            <input
                                type="text"
                                value={char.value}
                                onChange={(e) => handleCharacteristicChange(index, 'value', e.target.value)}
                                placeholder="Значение характеристики"
                            />
                            <button
                                className="remove-btn"
                                type="button"
                                onClick={() => setFormData({
                                    ...formData,
                                    characteristics: formData.characteristics.filter((_, i) => i !== index)
                                })}
                            >
                                &times;
                            </button>
                        </div>
                    ))}

                    <button
                        className="add-btn"
                        type="button"
                        onClick={() => setFormData({
                            ...formData,
                            characteristics: [...formData.characteristics, {name: '', value: ''}]
                        })}
                    >
                        + Добавить характеристику
                    </button>
                </div>

                <div className="form-section">
                    <h3 className="section-title">Изображения</h3>
                    <p className="image-limit">Максимум 5 изображений (добавлено: {formData.images.length})</p>

                    <div className="image-preview-container">
                        {formData.images.map((image, index) => (
                            <ImageManager
                                key={index}
                                image={image}
                                index={index}
                                onMoveUp={handleMoveImageUp}
                                onMoveDown={handleMoveImageDown}
                                onRemove={handleImageRemove}
                            />
                        ))}
                    </div>

                    <div className="image-upload-options">
                        <div className="form-group">
                            <label>Загрузить изображение:</label>
                            <input
                                className="file-input"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                disabled={formData.images.length >= 5}
                            />
                        </div>

                        <div className="form-group">
                            <label>Или указать URL:</label>
                            <div className="url-input-group">
                                <input
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    disabled={formData.images.length >= 5}
                                />
                                <button
                                    className="add-url-btn"
                                    type="button"
                                    onClick={handleAddImageByUrl}
                                    disabled={formData.images.length >= 5 || !imageUrl.trim()}
                                >
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        className="cancel-btn"
                        type="button"
                        onClick={closeProductForm}
                    >
                        Отмена
                    </button>
                    <button
                        className="submit-btn"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="loading">Сохранение...</span>
                        ) : productId ? (
                            'Сохранить изменения'
                        ) : (
                            'Создать товар'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
