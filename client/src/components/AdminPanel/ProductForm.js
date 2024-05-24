// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import {useHistory, useLocation, useParams} from "react-router-dom";
import './ProductForm.css';


// const ProductForm = ({ onSubmit, onCancel }) => {
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([]);
//     const { productId } = useParams();
//     const [productData, setProductData] = useState(null);
//     const location = useLocation();
//     const { product } = location.state || {};
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         type: '',
//         brand: '',
//         characteristics: [],
//         images: [],
//         sizes: [], // Добавляем поле для размеров
//         colors: [], // Добавляем поле для цветов
//     });
//
//     const [categories, setCategories] = useState([]);
//     const [types, setTypes] = useState([]);
//     const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отслеживания отправки формы
//     const [direction, setDirection] = useState('');
//     // const [allTypes, setAllTypes] = useState([]);
//     const [allCategories, setAllCategories] = useState([]);
//
//     const history = useHistory();
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role');
//         if (!token || role !== 'seller') {
//             toast.error('Ваш аккаунт еще не подтвержден');
//             // Если отсутствует токен или роль не является "seller", перенаправляем на страницу входа
//             history.push('/login');
//         }
//     }, [history]);
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 // Проверяем, определен ли productId
//                 if (!productId) {
//                     return;
//                 }
//
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
//         fetchProduct();
//     }, [productId]);
//
//     useEffect(() => {
//         if (product) {
//             setFormData(product);
//         }
//     }, [product]);
//
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setCategories(data.categories);
//                 } else {
//                     console.error('Failed to fetch categories');
//                 }
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchCategories();
//     }, []);
//
//     useEffect(() => {
//         const fetchTypes = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/types`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setTypes(data.types);
//                 } else {
//                     console.error('Failed to fetch types');
//                 }
//             } catch (error) {
//                 console.error('Error fetching types:', error);
//             }
//         };
//         fetchTypes();
//     }, []);
//
//     const handleChange = async (e) => {
//         const { name, value } = e.target;
//         // console.log('Name:', name);
//         // console.log('Value:', value);
//         setFormData({ ...formData, [name]: value });
//
//         if (name === 'category') {
//             if (value === 'Аксессуары') {
//                 setDirection(''); // Сбросить выбранное направление при смене категории на "Аксессуары"
//             }
//         }
//
//         if (name === 'category') {
//             try {
//                 // Получаем все товары из базы данных
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//                 if (!response.ok) {
//                     console.error('Failed to fetch products');
//                     return;
//                 }
//                 const data = await response.json();
//
//                 // Фильтруем типы товаров в зависимости от выбранной категории
//                 let filteredTypes = [];
//                 // if (value === 'Аксессуары') {
//                 //     filteredTypes = ['Для гаджетов', 'Для спорта', 'Для стиля', 'Для орг. техники'];
//                 // } else {
//                     filteredTypes = data
//                         .filter(product => product.category === value)
//                         .map(product => product.type);
//                 // }
//
//                 // Извлекаем уникальные типы из отфильтрованных товаров
//                 const uniqueTypes = [...new Set(filteredTypes)];
//
//                 // Устанавливаем список уникальных типов в состояние types
//                 setTypes(uniqueTypes);
//             } catch (error) {
//                 console.error('Error handling category change:', error);
//             }
//         }
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
//     const handleFormSubmit = async (formData) => {
//         setIsSubmitting(true); // Устанавливаем состояние отправки формы в true
//
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
//                     setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false
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
//                         body: JSON.stringify({...formData, direction}), // Добавляем значение direction в formData
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
//         } finally {
//             setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false, независимо от результата запроса
//         }
//     };
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
//         if (isSubmitting) {
//             return; // Если уже отправляется, выходим
//         }
//
//         setIsSubmitting(true); // Устанавливаем состояние отправки формы в true
//
//         // Проверяем, чтобы хотя бы одно поле характеристик имело заполненное значение
//         const hasValidCharacteristics = formData.characteristics.some(char => char.name.trim() !== '' && char.value.trim() !== '');
//
//         // Проверяем, чтобы хотя бы одно поле картинок имело заполненное значение
//         const hasValidImages = formData.images.some(image => image.trim() !== '');
//
//         if (!hasValidCharacteristics || !hasValidImages) {
//             toast.error('Характеристики и изображения должны быть заполнены хотя бы одним значением');
//             setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false
//
//             return;
//         }
//
//         handleFormSubmit(formData);
//     };
//
//     const handleClose = () => {
//         // history.push('/');
//         history.goBack(); // Переход на предыдущую страницу
//     };
//
//     useEffect(() => {
//         const fetchAllCategories = async () => {
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     setAllCategories(data.types);
//                 } else {
//                     console.error('Failed to fetch types');
//                 }
//             } catch (error) {
//                 console.error('Error fetching types:', error);
//             }
//         };
//         fetchAllCategories();
//     }, []);
//
//
//
// // Добавляем функцию handleColorChange для обновления данных о цветах
//     const handleColorChange = (index, field, value) => {
//         const updatedColors = [...formData.colors];
//         updatedColors[index][field] = value;
//         setFormData({ ...formData, colors: updatedColors });
//     };
//
//
//     const handleSizesChange = (e) => {
//         const sizes = e.target.value.split(',').map(size => size.trim()); // Разделяем строку по запятым и удаляем лишние пробелы
//         setFormData({ ...formData, sizes: sizes });
//     };
//
//
//     return (
//         <form className="sellerFormAdd" onSubmit={handleSubmit}>
//             <h2>Добавить товар</h2>
//             <span className="sellersListClose" type="button" onClick={handleClose}>
//                <span> &#10006;</span>
//             </span>
//             <label>Категория:</label>
//             <select name="category" value={formData.category} onChange={handleChange} >
//                 <option value="">Выберите категорию</option>
//                 {categories.map((category, index) => (
//                     <option key={index} value={category}>{category}</option>
//                 ))}
//                 {/* Добавляем категорию "Аксессуары" */}
//                 <option value="Аксессуары">Аксессуары</option>
//             </select>
//             <input type="text" name="category" value={formData.category} onChange={handleChange} required />
//
//             {formData.category === 'Аксессуары' && (
//                 <div>
//                     <label>Направление:</label>
//                     <select
//                         name="direction"
//                         value={direction}
//                         onChange={(e) => setDirection(e.target.value)}
//                         disabled={!formData.category || formData.category !== 'Аксессуары'}
//                     >
//                         <option value="">Выберите направление</option>
//                         {categories.map((category, index) => (
//                             <option key={index} value={category}>{category}</option>
//                         ))}
//                     </select>
//                 </div>
//             )}
//
//
//             <label>Тип:</label>
//             <select name="type" value={formData.type} onChange={handleChange} >
//                 <option value="">Выберите тип</option>
//                 {types.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                 ))}
//             </select>
//             <input type="text" name="type" value={formData.type} onChange={handleChange} required />
//             <label>Бренд:</label>
//             <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
//             <label>Название:</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//             <label>Описание:</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required />
//             <label>Цена:</label>
//             <input type="number" placeholder="0" name="price" value={formData.price} onChange={handleChange} required />
//
//             <label>Размеры:</label>
//             <input
//                 type="text"
//                 name="sizes"
//                 value={Array.isArray(formData.sizes) ? formData.sizes.join(',') : ''}
//                 onChange={handleSizesChange}
//             />
//             <label>Цвета:</label>
//             {formData.colors && formData.colors.map((color, index) => (
//                 <div key={index}>
//                     <input
//                         type="text"
//                         value={color.name}
//                         onChange={(e) => handleColorChange(index, 'name', e.target.value)}
//                         placeholder="Название цвета"
//                     />
//                     <input
//                         type="color"
//                         value={color.value}
//                         onChange={(e) => handleColorChange(index, 'value', e.target.value)}
//                     />
//                     <button
//                         className="deleteField"
//                         type="button"
//                         onClick={() => setFormData({
//                             ...formData,
//                             colors: formData.colors.filter((_, i) => i !== index)
//                         })}
//                     >
//                         &#10006;
//                     </button>
//                 </div>
//             ))}
//
//             <button className="newProductAdd" type="button" onClick={() => setFormData({ ...formData, colors: [...formData.colors, { name: '', value: '#000000' }] })}>
//                 Добавить цвет
//             </button>
//
//
//             <label>Характеристики:</label>
//             {formData.characteristics.map((char, index) => (
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
//                     <button className="deleteField"
//                             type="button"
//                             onClick={() => setFormData({
//                                 ...formData,
//                                 characteristics: formData.characteristics.filter((_, i) => i !== index)
//                             })}
//                     >
//                         {/*Удалить*/}
//                         &#10006;
//                     </button>
//                 </div>
//             ))}
//             <button className="newProductAdd" type="button" onClick={() => setFormData({ ...formData, characteristics: [...formData.characteristics, { name: '', value: '' }] })}>
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
//                     <button
//                         className="deleteField"
//                         type="button"
//                         onClick={() => setFormData({
//                             ...formData,
//                             images: formData.images.filter((_, i) => i !== index)
//                         })}
//                     >
//                         {/*Удалить*/}
//                         &#10006;
//                     </button>
//                 </div>
//             ))}
//             <button className="newProductAdd" type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}>
//                 Добавить изображение
//             </button>
//             <div className="submitBtn">
//                 <button className="submit" type="submit"  disabled={isSubmitting}>&#10004; Создать продукт</button>
//                 <button className="cancel" type="button" onClick={onCancel}>&#10006; Отмена</button>
//             </div>
//         </form>
//     );
// };
//
// export default ProductForm;









const ProductForm = ({ onSubmit, onCancel }) => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const {productId} = useParams();
    const [productData, setProductData] = useState(null);
    const location = useLocation();
    const {product} = location.state || {};
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        direction: "",
        price: '',
        category: '',
        type: '',
        brand: '',
        gender: '', // Добавляем поле gender
        characteristics: [],
        images: [],
        sizes: [], // Добавляем поле для размеров
        colors: [], // Добавляем поле для цветов
    });

    const [categories, setCategories] = useState([]);
    const [types, setTypes] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Состояние для отслеживания отправки формы
    const [direction, setDirection] = useState('');
    const [allCategories, setAllCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (!token || role !== 'seller') {
            toast.error('Ваш аккаунт еще не подтвержден');
            history.push('/login');
        }
    }, [history]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
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

    const handleChange = async (e) => {
        const { name, value } = e.target;
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

    const handleCharacteristicChange = (index, field, value) => {
        const updatedCharacteristics = [...formData.characteristics];
        updatedCharacteristics[index][field] = value;
        setFormData({...formData, characteristics: updatedCharacteristics});
    };

    const handleImageChange = (index, value) => {
        const updatedImages = [...formData.images];
        updatedImages[index] = value;
        setFormData({...formData, images: updatedImages});
    };

    const handleFormSubmit = async (formData) => {
        setIsSubmitting(true); // Устанавливаем состояние отправки формы в true

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
            return; // Если уже отправляется, выходим
        }
        setIsSubmitting(true); // Устанавливаем состояние отправки формы в true

        const hasValidCharacteristics = formData.characteristics.some(char => char.name.trim() !== '' && char.value.trim() !== '');
        const hasValidImages = formData.images.some(image => image.trim() !== '');

        if (!hasValidCharacteristics || !hasValidImages) {
            toast.error('Характеристики и изображения должны быть заполнены хотя бы одним значением');
            setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false
            return;
        }

        handleFormSubmit(formData);
    };

    const handleClose = () => {
        history.goBack(); // Переход на предыдущую страницу
    };

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products/categories`);
                if (response.ok) {
                    const data = await response.json();
                    setAllCategories(data.types);
                } else {
                    console.error('Failed to fetch types');
                }
            } catch (error) {
                console.error('Error fetching types:', error);
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


    return (
        <form className="sellerFormAdd" onSubmit={handleSubmit}>
            <h2>Добавить товар</h2>
            <span className="sellersListClose" type="button" onClick={handleClose}>
           <span> &#10006;</span>
        </span>
            <label className="seller-form-add-once">Категория:</label>
            <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Выберите категорию</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
                <option value="Аксессуары">Аксессуары</option>
            </select>
            <input type="text" name="category" value={formData.category} onChange={handleChange} required/>

            {formData.category === 'Аксессуары' && (
                <div>
                    <label>Направление:</label>
                    <select
                        name="direction"
                        value={direction}
                        onChange={(e) => handleDirectionChange(e.target.value)} // Обновлено: добавлен обработчик изменения направления
                        disabled={!formData.category || formData.category !== 'Аксессуары'}
                    >
                        <option value="">Выберите направление</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            )}

            <label>Тип:</label>
            <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Выберите тип</option>
                {types.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                ))}
            </select>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required/>

            <label>Пол:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Выберите пол</option>
                <option value="Мужская одежда">Мужская одежда</option>
                <option value="Женская одежда">Женская одежда</option>
                <option value="Детская одежда">Детская одежда</option>
                <option value="Гаджеты">Гаджеты</option>
                <option value="Унисекс">Унисекс</option>
                <option value="Аксессуары">Аксессуары</option>
                <option value="Бытовая эл.техника">Бытовая эл.техника</option>
            </select>

            <label>Бренд:</label>
            <input type="text" name="brand" value={formData.brand} onChange={handleChange} required/>

            <label>Название:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required/>

            <label>Описание:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required/>

            <label>Цена:</label>
            <input type="number" placeholder="0" name="price" value={formData.price} onChange={handleChange} required/>

            <label>Размеры:</label>
            <input
                type="text"
                name="sizes"
                value={Array.isArray(formData.sizes) ? formData.sizes.join(',') : ''}
                onChange={handleSizesChange}
            />
            <label>Цвета:</label>
            {formData.colors && formData.colors.map((color, index) => (
                <div key={index}>
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
                        className="deleteField"
                        type="button"
                        onClick={() => setFormData({
                            ...formData,
                            colors: formData.colors.filter((_, i) => i !== index)
                        })}
                    >
                        &#10006;
                    </button>
                </div>
            ))}

            <button className="newProductAdd" type="button" onClick={() => setFormData({
                ...formData,
                colors: [...formData.colors, {name: '', value: '#000000'}]
            })}>
                Добавить цвет
            </button>

            <label>Характеристики:</label>
            {formData.characteristics.map((char, index) => (
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
                    <button className="deleteField"
                            type="button"
                            onClick={() => setFormData({
                                ...formData,
                                characteristics: formData.characteristics.filter((_, i) => i !== index)
                            })}
                    >
                        &#10006;
                    </button>
                </div>
            ))}
            <button className="newProductAdd" type="button" onClick={() => setFormData({
                ...formData,
                characteristics: [...formData.characteristics, {name: '', value: ''}]
            })}>
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
                    <button
                        className="deleteField"
                        type="button"
                        onClick={() => setFormData({
                            ...formData,
                            images: formData.images.filter((_, i) => i !== index)
                        })}
                    >
                        &#10006;
                    </button>
                </div>
            ))}
            <button className="newProductAdd" type="button"
                    onClick={() => setFormData({...formData, images: [...formData.images, '']})}>
                Добавить изображение
            </button>

            <div className="submitBtn">
                {/*<button className="submit" type="submit" disabled={isSubmitting}>&#10004; Создать продукт</button>*/}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Создать продукт'}
                </button>

                <button className="cancel" type="button" onClick={onCancel}>&#10006; Отмена</button>
            </div>
        </form>
    );
};


export default ProductForm;