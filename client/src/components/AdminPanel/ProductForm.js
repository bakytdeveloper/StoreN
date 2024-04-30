// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';
import './ProductForm.css';
import {toast} from "react-toastify";
import {useHistory, useLocation, useParams} from "react-router-dom";

// const ProductForm = ({ onSubmit, onCancel }) => {
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([]);
//     const { productId } = useParams();
//     const [productData, setProductData] = useState(null);
//
//     const location = useLocation();
//     const { product } = location.state || {};
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: "",
//         category: '',
//         type: '',
//         brand: '',
//         characteristics: [],
//         images: [],
//     });
//
//
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setProductData(data);
//                 } else {
//                     console.error('Failed to fetch product data');
//                 }
//             } catch (error) {
//                 console.error('Error fetching product data:', error);
//             }
//         };
//
//         fetchProduct();
//     }, [productId]);
//
//
//
//
//     useEffect(() => {
//         if (product) {
//             setFormData(product);
//         }
//     }, [product]);
//
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//
//     const handleCharacteristicChange = (index, field, value) => {
//         const updatedCharacteristics = [...formData.characteristics];
//         updatedCharacteristics[index][field] = value;
//         setFormData({ ...formData, characteristics: updatedCharacteristics });
//     };
//
//     const handleImageChange = (index, value) => {
//         const updatedImages = [...formData.images];
//         updatedImages[index] = value;
//         setFormData({ ...formData, images: updatedImages });
//     };
//
//
//     const handleFormSubmit = async (formData) => {
//         try {
//             let response;
//             const token = localStorage.getItem('token');
//
//             // Получаем список товаров этого продавца
//             const sellerProductsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//             });
//
//             if (!sellerProductsResponse.ok) {
//                 console.error('Error fetching seller products:', sellerProductsResponse.statusText);
//                 return;
//             }
//
//             const sellerProducts = await sellerProductsResponse.json();
//
//             // Проверяем, создается ли новый товар
//             if (!productId) {
//                 // Проверяем, есть ли уже товар с таким же названием и брендом
//                 const existingProduct = sellerProducts.find(
//                     (product) =>
//                         product.name === formData.name && product.brand === formData.brand
//                 );
//
//                 if (existingProduct) {
//                     // Если товар уже существует, показываем оповещение и выходим из функции
//                     toast.error('Такой товар уже существует');
//                     return;
//                 }
//             }
//
//             if (productId) {
//                 // Если есть productId, отправляем запрос на обновление существующего товара
//                 response = await fetch(
//                     `${process.env.REACT_APP_API_URL}/api/sellers/products/${productId}`,
//                     {
//                         method: 'PUT',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${token}`,
//                         },
//                         body: JSON.stringify(formData),
//                     }
//                 );
//             } else {
//                 // Если нет productId, отправляем запрос на создание нового товара
//                 response = await fetch(
//                     `${process.env.REACT_APP_API_URL}/api/sellers/products`,
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${token}`,
//                         },
//                         body: JSON.stringify(formData),
//                     }
//                 );
//             }
//
//             if (response.ok) {
//                 clearFormFields();
//                 const updatedProduct = await response.json();
//                 setProducts((prevProducts) =>
//                     prevProducts.map((product) =>
//                         product._id === updatedProduct._id ? updatedProduct : product
//                     )
//                 );
//                 setSelectedProduct(null);
//                 toast.success(productId ? 'Товар успешно обновлен!' : 'Товар успешно создан!');
//             } else {
//                 console.error('Failed to save product');
//             }
//         } catch (error) {
//             console.error('Error saving product:', error);
//         }
//     };
//
//
//
//
//
//
//
//
//     const clearFormFields = () => {
//         setFormData({
//             name: '',
//             description: '',
//             price: '',
//             category: '',
//             type: '',
//             brand: '',
//             characteristics: [],
//             images: [],
//             quantity: 10
//         });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // onSubmit(formData);
//     };
//
//     return (
//         <form className="sellerFormAdd" onSubmit={handleSubmit} >
//             <h2>Добавить товар</h2>
//             <label>Категория:</label>
//             <input type="text" name="category" value={formData.category} onChange={handleChange} required />
//
//             <label>Тип:</label>
//             <input type="text" name="type" value={formData.type} onChange={handleChange} required />
//
//             <label>Бренд:</label>
//             <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
//
//
//             <label>Название:</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//
//             <label>Описание:</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required />
//
//             <label>Цена:</label>
//             <input type="number" placeholder="0" name="price" value={formData.price} onChange={handleChange} required />
//
//             <label>Характеристики:</label>
//             {formData.characteristics && formData.characteristics.map((char, index) => (
//                 <div key={index}>
//                     <input
//                         type="text"
//                         value={char.name}
//                         onChange={(e) => handleCharacteristicChange(index, 'name', e.target.value)}
//                         placeholder="Название характеристики"
//                     />
//                     <input
//                         type="text"
//                         value={char.value}
//                         onChange={(e) => handleCharacteristicChange(index, 'value', e.target.value)}
//                         placeholder="Значение характеристики"
//                     />
//                 </div>
//             ))}
//             <button  className="newProductAdd"  type="button" onClick={() => setFormData({ ...formData, characteristics: [...formData.characteristics, { name: '', value: '' }] })}>
//                 Добавить характеристику
//             </button>
//
//             <label>URL картинки:</label>
//             {formData.images.map((image, index) => (
//                 <div key={index}>
//                     <input
//                         type="text"
//                         value={image}
//                         onChange={(e) => handleImageChange(index, e.target.value)}
//                         placeholder="URL картинки"
//                     />
//                 </div>
//             ))}
//             <button  className="newProductAdd"  type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}>
//                 Добавить изображение
//             </button>
//         <div className="submitBtn">
//             <button className="submit" onClick={() => handleFormSubmit(formData)}>&#10004; Создать продукт</button>
//             <button className="cancel" type="button" onClick={onCancel}>
//                 &#10006;  Отмена
//             </button>
//         </div>
//
//         </form>
//     );
// };
//
// export default ProductForm;


const ProductForm = ({ onSubmit, onCancel }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const { productId } = useParams();
    const [productData, setProductData] = useState(null);
    const location = useLocation();
    const { product } = location.state || {};
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
    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            // Если отсутствует токен или роль не является "seller", перенаправляем на страницу входа
            history.push('/login');
        }
    }, [history]);

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/${productId}`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setProductData(data);
    //             } else {
    //                 // console.error('Failed to fetch product data');
    //                 setTimeout(() => {
    //                     console.error('Failed to fetch product data')
    //                 }, 100)
    //             }
    //         } catch (error) {
    //             console.error('Error fetching product data:', error);
    //         }
    //     };
    //     fetchProduct();
    // }, [productId]);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Проверяем, определен ли productId
                if (!productId) {
                    return;
                }

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
                    setTypes(data.types);
                } else {
                    console.error('Failed to fetch types');
                }
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };
        fetchTypes();
    }, []);

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

    const handleFormSubmit = async (formData) => {
        try {
            let response;
            const token = localStorage.getItem('token');

            // Получаем список товаров этого продавца
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

            // Проверяем, создается ли новый товар
            if (!productId) {
                // Проверяем, есть ли уже товар с таким же названием и брендом
                const existingProduct = sellerProducts.find(
                    (product) =>
                        product.name === formData.name && product.brand === formData.brand
                );

                if (existingProduct) {
                    // Если товар уже существует, показываем оповещение и выходим из функции
                    toast.error('Такой товар уже существует');
                    return;
                }
            }

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
        handleFormSubmit(formData);
    };

    const handleClose = () => {
        // history.push('/');
        history.goBack(); // Переход на предыдущую страницу
    };


    return (
        <form className="sellerFormAdd" onSubmit={handleSubmit}>
            <h2>Добавить товар</h2>
            <span className="sellersListClose" type="button" onClick={handleClose}>
               <span> &#10006;</span>
            </span>
            <label>Категория:</label>
            <select name="category" value={formData.category} onChange={handleChange} >
                <option value="">Выберите категорию</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />

            <label>Тип:</label>
            <select name="type" value={formData.type} onChange={handleChange} >
                <option value="">Выберите тип</option>
                {types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
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
            <button className="newProductAdd" type="button" onClick={() => setFormData({ ...formData, characteristics: [...formData.characteristics, { name: '', value: '' }] })}>
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
            <button className="newProductAdd" type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}>
                Добавить изображение
            </button>
            <div className="submitBtn">
                <button className="submit" type="submit">&#10004; Создать продукт</button>
                <button className="cancel" type="button" onClick={onCancel}>&#10006; Отмена</button>
            </div>
        </form>
    );
};

export default ProductForm;
