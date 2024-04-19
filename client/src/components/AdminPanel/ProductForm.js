// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import {toast} from "react-toastify";
import {useLocation, useParams} from "react-router-dom";

const ProductForm = ({ onSubmit, onCancel }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);

    const location = useLocation();
    const { product } = location.state || {};

    // const [formData, setFormData] = useState({
    //     name: product ? product.name : '',
    //     description: product ? product.description : '',
    //     price: product ? product.price : '',
    //     category: product ? product.category : '',
    //     type: product ? product.type : '',
    //     brand: product ? product.brand : '',
    //     characteristics: product ? product.characteristics : [],
    //     images: product ? product.images : [],
    //     // Остальные поля формы...
    // });


    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: "",
        category: '',
        type: '',
        brand: '',
        characteristics: [],
        images: [],
    });



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
                if (response.ok) {
                    const data = await response.json();
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
        }
    }, [product]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCharacteristicChange = (index, field, value) => {
        const updatedCharacteristics = [...formData.characteristics];
        updatedCharacteristics[index][field] = value;
        setFormData({ ...formData, characteristics: updatedCharacteristics });
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...formData.images];
        updatedImages[index] = value;
        setFormData({ ...formData, images: updatedImages });
    };



    // const handleFormSubmit = async (formData) => {
    //     try {
    //         let response;
    //         const token = localStorage.getItem('token');
    //
    //         // Проверяем, создается ли новый товар
    //         if (!selectedProduct) {
    //             // Проверяем, есть ли уже товар с таким же названием и брендом
    //             const existingProduct = products.find(
    //                 (product) =>
    //                     product.name === formData.name && product.brand === formData.brand
    //             );
    //
    //             if (existingProduct) {
    //                 // Если товар уже существует, показываем оповещение и выходим из функции
    //                 toast.error('Такой товар уже существует');
    //                 return;
    //             }
    //         }
    //
    //         if (selectedProduct) {
    //             response = await fetch(
    //                 `${process.env.REACT_APP_API_URL}/api/sellers/products/${selectedProduct._id}`,
    //                 {
    //                     method: 'PUT',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(formData),
    //                 }
    //             );
    //         } else {
    //             response = await fetch(
    //                 `${process.env.REACT_APP_API_URL}/api/sellers/products`,
    //                 {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                     body: JSON.stringify(formData),
    //                 }
    //             );
    //         }
    //         if (response.ok) {
    //             clearFormFields();
    //             const updatedProduct = await response.json();
    //             setProducts((prevProducts) =>
    //                 prevProducts.map((product) =>
    //                     product._id === updatedProduct._id ? updatedProduct : product
    //                 )
    //             );
    //             // setShowForm(false);
    //             setSelectedProduct(null);
    //
    //             // Проверка на успешное создание товара и показ оповещения
    //             if (selectedProduct) {
    //                 toast.success('Товар успешно обновлен!');
    //             } else {
    //                 toast.success('Товар успешно создан!');
    //             }
    //         } else {
    //             console.error('Failed to save product');
    //         }
    //     } catch (error) {
    //         console.error('Error saving product:', error);
    //     }
    // };


    const handleFormSubmit = async (formData) => {
        try {
            let response;
            const token = localStorage.getItem('token');

            if (productId) {
                // Если есть productId, отправляем запрос на обновление существующего товара
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
                // Если нет productId, отправляем запрос на создание нового товара
                response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/sellers/products`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(formData),
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
        }
    };






    const clearFormFields = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            type: '',
            brand: '',
            characteristics: [],
            images: [],
            quantity: 10
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{marginTop: "111px"}}>

            <label>Категория:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />

            <label>Тип:</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />

            <label>Бренд:</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />


            <label>Название:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Описание:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />

            <label>Цена:</label>
            <input type="number" placeholder="0" name="price" value={formData.price} onChange={handleChange} required />

            <label>Характеристики:</label>
            {formData.characteristics && formData.characteristics.map((char, index) => (
                <div key={index}>
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
                </div>
            ))}
            <button  className="newProductAdd"  type="button" onClick={() => setFormData({ ...formData, characteristics: [...formData.characteristics, { name: '', value: '' }] })}>
                Добавить характеристику
            </button>

            <label>URL картинки:</label>
            {formData.images.map((image, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="URL картинки"
                    />
                </div>
            ))}
            <button  className="newProductAdd"  type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}>
                Добавить изображение
            </button>
        <div className="submitBtn">
            <button className="submit" onClick={() => handleFormSubmit(formData)}>&#10004; Создать продукт</button>
            <button className="cancel" type="button" onClick={onCancel}>
                &#10006;  Отмена
            </button>
        </div>

        </form>
    );
};

export default ProductForm;
