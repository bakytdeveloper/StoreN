// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
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
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />

            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />

            <label>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />

            <label>Type:</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />

            <label>Brand:</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />

            <label>Characteristics:</label>
            {formData.characteristics.map((char, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={char.name}
                        onChange={(e) => handleCharacteristicChange(index, 'name', e.target.value)}
                        placeholder="Characteristic Name"
                    />
                    <input
                        type="text"
                        value={char.value}
                        onChange={(e) => handleCharacteristicChange(index, 'value', e.target.value)}
                        placeholder="Characteristic Value"
                    />
                </div>
            ))}
            <button type="button" onClick={() => setFormData({ ...formData, characteristics: [...formData.characteristics, { name: '', value: '' }] })}>
                Add Characteristic
            </button>

            <label>Images:</label>
            {formData.images.map((image, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="Image URL"
                    />
                </div>
            ))}
            <button type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}>
                Add Image
            </button>

            <button type="submit">Submit</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default ProductForm;
