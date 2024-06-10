// src/components/AdminPanel/ProductForm.js
import React, { useState, useEffect } from 'react';
import {toast} from "react-toastify";
import {useHistory, useLocation, useParams} from "react-router-dom";
import axios from 'axios';
import './ProductForm.css';
import ImageManager from "./ImageManager";





// const ProductForm = ({ setShowSidebar, onSubmit, onCancel }) => {
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [products, setProducts] = useState([]);
//     const {productId} = useParams();
//     const [productData, setProductData] = useState(null);
//     const location = useLocation();
//     const {product} = location.state || {};
//     const [formData, setFormData] = useState({
//         name: '',
//         description: '',
//         direction: "",
//         price: '',
//         category: '',
//         type: '',
//         brand: '',
//         gender: '', // Добавляем поле gender
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
//     const [allCategories, setAllCategories] = useState([]);
//     const [imagePreview, setImagePreview] = useState(null);
//     const history = useHistory();
//
//
//     useEffect(() => {
//         setShowSidebar(true);
//         return () => setShowSidebar(true);
//     }, [setShowSidebar]);
//
//
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role');
//         if (!token || role !== 'seller') {
//             toast.error('Ваш аккаунт еще не подтвержден');
//             history.push('/login');
//         }
//     }, [history]);
//
//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 if (!productId) {
//                     return;
//                 }
//
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/products/${productId}`);
//                 if (response.ok) {
//                     const data = await response.json();
//                     console.log("DATA:", data)
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
//
//     useEffect(() => {
//         if (product) {
//             setFormData(product);
//             if (product.category === 'Аксессуары' && product.direction) {
//                 setDirection(product.direction); // Установить значение direction, если товар аксессуар и у него есть значение в свойстве direction
//             }
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
//         setFormData({ ...formData, [name]: value });
//
//         if (name === 'category') {
//             if (value === 'Аксессуары') {
//                 setDirection('');
//             }
//
//             try {
//                 const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
//                 if (!response.ok) {
//                     console.error('Failed to fetch products');
//                     return;
//                 }
//                 const data = await response.json();
//
//                 let filteredTypes = data
//                     .filter(product => product.category === value)
//                     .map(product => product.type);
//
//                 const uniqueTypes = [...new Set(filteredTypes)];
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
//         setFormData({...formData, characteristics: updatedCharacteristics});
//     };
//
//     const handleImageChange = (index, value) => {
//         const updatedImages = [...formData.images];
//         updatedImages[index] = value;
//         setFormData({...formData, images: updatedImages});
//     };
//
//     const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         const newFormData = new FormData();
//         newFormData.append('image', file);
//         try {
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/sellers/upload`, newFormData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             if (response.status === 200) {
//                 setFormData(prevFormData => ({
//                     ...prevFormData,
//                     images: [...prevFormData.images, response.data.imageUrl]
//                 }));
//                 setImagePreview(URL.createObjectURL(file));
//             } else {
//                 console.error('Failed to upload image');
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//         }
//     };
//
//     const handleFormSubmit = async (formData) => {
//         setIsSubmitting(true); // Устанавливаем состояние отправки формы в true
//
//         try {
//             let response;
//             const token = localStorage.getItem('token');
//
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
//             if (!productId) {
//                 const existingProduct = sellerProducts.find(
//                     (product) =>
//                         product.name === formData.name && product.brand === formData.brand
//                 );
//
//                 if (existingProduct) {
//                     toast.error('Такой товар уже существует');
//                     setIsSubmitting(false);
//                     return;
//                 }
//             }
//
//             console.log('Отправляемые данные:', formData);
//
//             if (productId) {
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
//                 response = await fetch(
//                     `${process.env.REACT_APP_API_URL}/api/sellers/products`,
//                     {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                             Authorization: `Bearer ${token}`,
//                         },
//                         body: JSON.stringify({ ...formData, direction }),
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
//             setIsSubmitting(false);
//         }
//     };
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
//             gender: '',
//             characteristics: [],
//             images: [],
//             sizes: [],
//             colors: [],
//             quantity: 10,
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (isSubmitting) {
//             return; // Если уже отправляется, выходим
//         }
//         setIsSubmitting(true); // Устанавливаем состояние отправки формы в true
//
//         const hasValidCharacteristics = formData.characteristics.some(char => char.name.trim() !== '' && char.value.trim() !== '');
//         const hasValidImages = formData.images.some(image => image.trim() !== '');
//
//         if (!hasValidCharacteristics || !hasValidImages) {
//             toast.error('Характеристики и изображения должны быть заполнены хотя бы одним значением');
//             setIsSubmitting(false); // Устанавливаем состояние отправки формы обратно в false
//             return;
//         }
//
//         handleFormSubmit(formData);
//     };
//
//     const handleClose = () => {
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
//     const handleColorChange = (index, field, value) => {
//         const updatedColors = [...formData.colors];
//         updatedColors[index][field] = value;
//         setFormData({...formData, colors: updatedColors});
//     };
//
//     const handleSizesChange = (e) => {
//         const sizes = e.target.value.split(',').map(size => size.trim());
//         setFormData({...formData, sizes: sizes});
//     };
//
//
//     const handleDirectionChange = (value) => {
//         setDirection(value);
//         setFormData({...formData, direction: value}); // Обновить данные формы с учетом измененного направления
//     };
//
//
//     const handleImageAdd = () => {
//         setFormData({
//             ...formData,
//             images: [...formData.images, ''],
//         });
//     };
//
//     const handleImageRemove = async (index) => {
//         const updatedImages = [...formData.images];
//         const removedImage = updatedImages.splice(index, 1)[0];
//         setFormData({ ...formData, images: updatedImages });
//
//         try {
//             const imageName = removedImage.split('/').pop(); // Извлекаем имя файла из URL
//             const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/sellers/images/${imageName}`);
//             if (response.status === 200) {
//                 console.log('Image deleted successfully');
//             } else {
//                 console.error('Failed to delete image');
//             }
//         } catch (error) {
//             console.error('Error deleting image:', error);
//         }
//     };
//
//
//     // console.log(
//     //     "FORMADATA", {formData}
//     // )
//     return (
//         <form className="sellerFormAdd" onSubmit={handleSubmit}>
//               <span style={{background:"none"}} className="sellersListClose" type="button" onClick={handleClose}>
//            &#10006;
//         </span>
//             <h2>Создание товара</h2>
//
//             <label className="seller-form-add-once">Категория:</label>
//             <select name="category" value={formData.category} onChange={handleChange}>
//                 <option value="">Выберите категорию</option>
//                 {categories.map((category, index) => (
//                     <option key={index} value={category}>{category}</option>
//                 ))}
//                 <option value="Аксессуары">Аксессуары</option>
//             </select>
//             <input type="text" name="category" value={formData.category} onChange={handleChange} required/>
//
//             {formData.category === 'Аксессуары' && (
//                 <div>
//                     <label>Направление:</label>
//                     <select
//                         name="direction"
//                         value={direction}
//                         onChange={(e) => handleDirectionChange(e.target.value)} // Обновлено: добавлен обработчик изменения направления
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
//             <label>Тип:</label>
//             <select name="type" value={formData.type} onChange={handleChange}>
//                 <option value="">Выберите тип</option>
//                 {types.map((type, index) => (
//                     <option key={index} value={type}>{type}</option>
//                 ))}
//             </select>
//             <input type="text" name="type" value={formData.type} onChange={handleChange} required/>
//
//             <label>Пол:</label>
//             <select name="gender" value={formData.gender} onChange={handleChange}>
//                 <option value="">Выберите пол</option>
//                 <option value="Мужская одежда">Мужская одежда</option>
//                 <option value="Женская одежда">Женская одежда</option>
//                 <option value="Детская одежда">Детская одежда</option>
//                 <option value="Гаджеты">Гаджеты</option>
//                 <option value="Унисекс">Унисекс</option>
//                 <option value="Аксессуары">Аксессуары</option>
//                 <option value="Бытовая эл.техника">Бытовая эл.техника</option>
//             </select>
//
//             <label>Бренд:</label>
//             <input type="text" name="brand" value={formData.brand} onChange={handleChange} required/>
//
//             <label>Название:</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} required/>
//
//             <label>Описание:</label>
//             <textarea name="description" value={formData.description} onChange={handleChange} required/>
//
//             <label>Цена:</label>
//             <input type="number" placeholder="0" name="price" value={formData.price} onChange={handleChange} required/>
//
//             <label>Размеры:</label>
//             <input
//                 type="text"
//                 name="sizes"
//                 value={Array.isArray(formData.sizes) ? formData.sizes.join(',') : ''}
//                 onChange={handleSizesChange}
//
//             />
//             <label>Цвета:</label>
//             {formData.colors && formData.colors.map((color, index) => (
//                 <div key={index}>
//                     <input
//                         type="text"
//                         value={color.name}
//
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
//             <button className="newProductAdd" type="button" onClick={() => setFormData({
//                 ...formData,
//                 colors: [...formData.colors, {name: '', value: '#000000'}]
//             })}>
//                 Добавить цвет
//             </button>
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
//                         &#10006;
//                     </button>
//                 </div>
//             ))}
//             <button className="newProductAdd" type="button" onClick={() => setFormData({
//                 ...formData,
//                 characteristics: [...formData.characteristics, {name: '', value: ''}]
//             })}>
//                 Добавить характеристику
//             </button>
//
//             <label>Изображения:</label>
//             {formData.images.map((image, index) => (
//                 <div key={index} className="dynamic-field">
//                     <input type="text" value={image} onChange={(e) => handleImageChange(index, e.target.value)} placeholder="URL изображения" />
//                     <button type="button" onClick={() => handleImageRemove(index)}>Удалить</button>
//                 </div>
//             ))}
//             <button className="newProductAdd" type="button" onClick={handleImageAdd}>
//                 Добавить изображение
//             </button>
//             <input className="newProductAdd-input" type="file" onChange={handleFileChange} accept="image/*" />
//             {imagePreview && <img src={imagePreview} alt="Предпросмотр изображения" style={{ width: '100px', height: '100px' }} />}
//
//
//             <div className="submitBtn">
//                 {/*<button className="submit" type="submit" disabled={isSubmitting}>&#10004; Создать продукт</button>*/}
//
//                 <button className="submit" type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? 'Отправка...' : productId ? 'Изменить продукт' : 'Создать продукт'}
//                 </button>
//
//                 <button className="cancel" type="button" onClick={onCancel}>&#10006; Отмена</button>
//             </div>
//         </form>
//     );
// };
//
//
// export default ProductForm;





const ProductForm = ({ setShowSidebar, onSubmit, onCancel }) => {
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
    const [imagePreview, setImagePreview] = useState(null);
    const history = useHistory();


    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);



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

    const handleFileChange = async (e) => {
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


    const handleImageAdd = () => {
        setFormData({
            ...formData,
            images: [...formData.images, ''],
        });
    };

    const handleImageRemove = async (index) => {
        const updatedImages = [...formData.images];
        const removedImage = updatedImages.splice(index, 1)[0];
        setFormData({ ...formData, images: updatedImages });

        try {
            const imageName = removedImage.split('/').pop(); // Извлекаем имя файла из URL
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/sellers/images/${imageName}`);
            if (response.status === 200) {
                console.log('Image deleted successfully');
            } else {
                console.error('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
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



    // console.log(
    //     "FORMADATA", {formData}
    // )
    return (
        <form className="sellerFormAdd" onSubmit={handleSubmit}>
              <span style={{background:"none"}} className="sellersListClose" type="button" onClick={handleClose}>
           &#10006;
        </span>
            <h2>Создание товара</h2>

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

            <label>Изображения:</label>
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
            <button className="newProductAdd" type="button" onClick={handleImageAdd}>
                Добавить изображение
            </button>
            <input className="newProductAdd-input" type="file" onChange={handleFileChange} accept="image/*" />
            {imagePreview && <img src={imagePreview} alt="Предпросмотр изображения" style={{ width: '100px', height: '100px' }} />}


            <div className="submitBtn">
                {/*<button className="submit" type="submit" disabled={isSubmitting}>&#10004; Создать продукт</button>*/}

                <button className="submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : productId ? 'Изменить продукт' : 'Создать продукт'}
                </button>

                <button className="cancel" type="button" onClick={onCancel}>&#10006; Отмена</button>
            </div>
        </form>
    );
};


export default ProductForm;

