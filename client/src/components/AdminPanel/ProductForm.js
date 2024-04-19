// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>

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
            <button className="submit" type="submit">&#10004; Создать продукт</button>
            <button className="cancel" type="button" onClick={onCancel}>
                &#10006;  Отмена
            </button>
        </div>

        </form>
    );
};

export default ProductForm;
