// src/components/AdminHomepage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHomepage.css';



// const AdminHomepage = () => {
//     const [sliderImages, setSliderImages] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//     const [promotion, setPromotion] = useState({});
//     const [newSliderImage, setNewSliderImage] = useState('');
//     const [newGenderImage, setNewGenderImage] = useState('');
//     const [promotionTitle, setPromotionTitle] = useState('');
//     const [promotionDescription, setPromotionDescription] = useState('');
//     const [promotionStartDate, setPromotionStartDate] = useState('');
//     const [promotionEndDate, setPromotionEndDate] = useState('');
//
//     // New states for gender images
//     const [genderImageUrls, setGenderImageUrls] = useState({
//         'Мужская одежда': '',
//         'Женская одежда': '',
//         'Детская одежда': '',
//         'Гаджеты': '',
//         'Унисекс': '',
//         'Аксессуары': '',
//         'Бытовая эл.техника': '',
//         'Товары для всех': ''
//     });
//
//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => {
//                 const { sliderImages, genderImages, promotions } = response.data;
//                 setSliderImages(sliderImages || []);
//                 setGenderImages(genderImages || []);
//                 setPromotion(promotions || {});
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);
//
//     const handleAddSliderImage = () => {
//         setSliderImages([...sliderImages, newSliderImage]);
//         setNewSliderImage('');
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: [...sliderImages, newSliderImage], genderImages, promotions: promotion })
//             .catch(error => console.error('Error updating slider images:', error));
//     };
//
//     const handleRemoveSliderImage = (imageUrl) => {
//         const updatedImages = sliderImages.filter(url => url !== imageUrl);
//         setSliderImages(updatedImages);
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: updatedImages, genderImages, promotions: promotion })
//             .catch(error => console.error('Error updating slider images:', error));
//     };
//
//     const handleGenderImageChange = (category, url) => {
//         setGenderImageUrls(prevState => ({
//             ...prevState,
//             [category]: url
//         }));
//     };
//
//     const handleGenderImageSubmit = () => {
//         setGenderImages(Object.values(genderImageUrls));
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: Object.values(genderImageUrls), promotions: promotion })
//             .catch(error => console.error('Error updating gender images:', error));
//     };
//
//     const handleRemoveGenderImage = (imageUrl) => {
//         const updatedImages = genderImages.filter(url => url !== imageUrl);
//         setGenderImages(updatedImages);
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: updatedImages, promotions: promotion })
//             .catch(error => console.error('Error updating gender images:', error));
//     };
//
//     const handlePromotionUpdate = () => {
//         const updatedPromotion = { title: promotionTitle, description: promotionDescription, startDate: promotionStartDate, endDate: promotionEndDate };
//         setPromotion(updatedPromotion);
//         axios.patch(`${process.env.REACT_APP_API_URL}/api/homepage/promotion`, updatedPromotion)
//             .catch(error => console.error('Error updating promotion:', error));
//     };
//
//     return (
//         <div className="homepage-images">
//             <h1>Admin Homepage Management</h1>
//             <section>
//                 <h2>Slider Images</h2>
//                 <input
//                     type="text"
//                     value={newSliderImage}
//                     onChange={(e) => setNewSliderImage(e.target.value)}
//                     placeholder="Enter slider image URL"
//                 />
//                 <button onClick={handleAddSliderImage}>Add Slider Image</button>
//                 <div>
//                     {sliderImages.map((image, index) => (
//                         <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
//                             <img src={image} alt={`Slider ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                             <button onClick={() => handleRemoveSliderImage(image)}>Remove</button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//             <section>
//                 <h2>Gender Images</h2>
//                 {Object.keys(genderImageUrls).map((category) => (
//                     <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//                         <h3>{category}</h3>
//                         <input
//                             type="text"
//                             value={genderImageUrls[category]}
//                             onChange={(e) => handleGenderImageChange(category, e.target.value)}
//                             placeholder={`Enter URL for ${category}`}
//                         />
//                         <button onClick={handleGenderImageSubmit}>Update Gender Images</button>
//                         {genderImageUrls[category] && (
//                             <div style={{ display: 'inline-block', margin: '10px' }}>
//                                 <img src={genderImageUrls[category]} alt={category} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                                 <button onClick={() => handleRemoveGenderImage(genderImageUrls[category])}>Remove</button>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </section>
//             <section>
//                 <h2>Promotion</h2>
//                 <input
//                     type="text"
//                     value={promotionTitle}
//                     onChange={(e) => setPromotionTitle(e.target.value)}
//                     placeholder="Promotion Title"
//                 />
//                 <input
//                     type="text"
//                     value={promotionDescription}
//                     onChange={(e) => setPromotionDescription(e.target.value)}
//                     placeholder="Promotion Description"
//                 />
//                 <input
//                     type="date"
//                     value={promotionStartDate}
//                     onChange={(e) => setPromotionStartDate(e.target.value)}
//                     placeholder="Promotion Start Date"
//                 />
//                 <input
//                     type="date"
//                     value={promotionEndDate}
//                     onChange={(e) => setPromotionEndDate(e.target.value)}
//                     placeholder="Promotion End Date"
//                 />
//                 <button onClick={handlePromotionUpdate}>Update Promotion</button>
//                 {promotion.title && (
//                     <div>
//                         <h3>{promotion.title}</h3>
//                         <p>{promotion.description}</p>
//                         <p>{`From: ${new Date(promotion.startDate).toLocaleDateString()} To: ${new Date(promotion.endDate).toLocaleDateString()}`}</p>
//                     </div>
//                 )}
//             </section>
//         </div>
//     );
// };
//
// export default AdminHomepage;




// const AdminHomepage = () => {
//     const [sliderImages, setSliderImages] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//     const [promotion, setPromotion] = useState({});
//     const [newSliderImage, setNewSliderImage] = useState('');
//     const [newGenderImage, setNewGenderImage] = useState('');
//     const [promotionTitle, setPromotionTitle] = useState('');
//     const [promotionDescription, setPromotionDescription] = useState('');
//     const [promotionStartDate, setPromotionStartDate] = useState('');
//     const [promotionEndDate, setPromotionEndDate] = useState('');
//
//     // New states for gender images
//     const [genderImageUrls, setGenderImageUrls] = useState({
//         'Мужская одежда': '',
//         'Женская одежда': '',
//         'Детская одежда': '',
//         'Гаджеты': '',
//         'Унисекс': '',
//         'Аксессуары': '',
//         'Бытовая эл.техника': '',
//         'Товары для всех': ''
//     });
//
//     // useEffect(() => {
//     //     axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
//     //         .then(response => {
//     //             const { sliderImages, genderImages, promotions } = response.data;
//     //             setSliderImages(sliderImages || []);
//     //             setGenderImages(genderImages || []);
//     //             setPromotion(promotions || {});
//     //         })
//     //         .catch(error => console.error('Error fetching data:', error));
//     // }, []);
//
//
//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => {
//                 const { sliderImages, genderImages, promotions } = response.data;
//                 setSliderImages(sliderImages || []);
//                 setGenderImages(genderImages || []);
//
//                 // Заполнение значений по умолчанию
//                 setGenderImageUrls(genderImages.reduce((acc, image) => {
//                     const category = image.category;
//                     acc[category] = image.url;
//                     return acc;
//                 }, {}));
//
//                 // Установка значений для акции
//                 if (sliderImages.length > 0) {
//                     const promo = sliderImages[0].promotions[0] || {};
//                     setPromotionTitle(promo.title || '');
//                     setPromotionDescription(promo.description || '');
//                     setPromotionStartDate(promo.startDate ? promo.startDate.slice(0, 10) : '');
//                     setPromotionEndDate(promo.endDate ? promo.endDate.slice(0, 10) : '');
//                 }
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);
//
//
//
//     const handleAddSliderImage = () => {
//         setSliderImages([...sliderImages, newSliderImage]);
//         setNewSliderImage('');
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: [...sliderImages, newSliderImage], genderImages, promotions: promotion })
//             .catch(error => console.error('Error updating slider images:', error));
//     };
//
//     const handleRemoveSliderImage = (imageUrl) => {
//         const updatedImages = sliderImages.filter(url => url !== imageUrl);
//         setSliderImages(updatedImages);
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: updatedImages, genderImages, promotions: promotion })
//             .catch(error => console.error('Error updating slider images:', error));
//     };
//
//     const handleGenderImageChange = (category, url) => {
//         setGenderImageUrls(prevState => ({
//             ...prevState,
//             [category]: url
//         }));
//     };
//
//     const handleGenderImageSubmit = () => {
//         setGenderImages(Object.values(genderImageUrls));
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: Object.values(genderImageUrls), promotions: promotion })
//             .catch(error => console.error('Error updating gender images:', error));
//     };
//
//     const handleRemoveGenderImage = (imageUrl) => {
//         const updatedImages = genderImages.filter(url => url !== imageUrl);
//         setGenderImages(updatedImages);
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: updatedImages, promotions: promotion })
//             .catch(error => console.error('Error updating gender images:', error));
//     };
//
//     const handlePromotionUpdate = () => {
//         const newPromotion = { title: promotionTitle, description: promotionDescription, startDate: promotionStartDate, endDate: promotionEndDate };
//         const updatedSliderImages = sliderImages.map(img => img.url === selectedSliderImage ? { ...img, promotions: [newPromotion] } : img);
//         setSliderImages(updatedSliderImages);
//         axios.patch(`${process.env.REACT_APP_API_URL}/api/homepage/promotion`, { imageUrl: selectedSliderImage, promotion: newPromotion })
//             .catch(error => console.error('Error updating promotion:', error));
//     };
//
//
//     const handleSaveAll = () => {
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, {
//             sliderImages,
//             genderImages: Object.values(genderImageUrls),
//             promotions: promotion
//         })
//             .then(response => console.log('Data saved successfully:', response))
//             .catch(error => console.error('Error saving data:', error));
//     };
//
//     return (
//         <div className="homepage-images">
//             <h1>Admin Homepage Management</h1>
//             <section>
//                 <h2>Slider Images</h2>
//                 <input
//                     type="text"
//                     value={newSliderImage}
//                     onChange={(e) => setNewSliderImage(e.target.value)}
//                     placeholder="Enter slider image URL"
//                 />
//                 <button onClick={handleAddSliderImage}>Add Slider Image</button>
//                 <div>
//                     {sliderImages.map((image, index) => (
//                         <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
//                             <img src={image} alt={`Slider ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                             <button onClick={() => handleRemoveSliderImage(image)}>Remove</button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//             <section>
//                 <h2>Promotion</h2>
//                 <select
//                     value={selectedSliderImage}
//                     onChange={(e) => setSelectedSliderImage(e.target.value)}
//                 >
//                     <option value="">Select an image</option>
//                     {sliderImages.map(img => (
//                         <option key={img.url} value={img.url}>{img.url}</option>
//                     ))}
//                 </select>
//                 <div>
//                     <input
//                         type="text"
//                         value={promotionTitle}
//                         onChange={(e) => setPromotionTitle(e.target.value)}
//                         placeholder="Promotion Title"
//                     />
//                     <input
//                         type="text"
//                         value={promotionDescription}
//                         onChange={(e) => setPromotionDescription(e.target.value)}
//                         placeholder="Promotion Description"
//                     />
//                     <input
//                         type="date"
//                         value={promotionStartDate}
//                         onChange={(e) => setPromotionStartDate(e.target.value)}
//                     />
//                     <input
//                         type="date"
//                         value={promotionEndDate}
//                         onChange={(e) => setPromotionEndDate(e.target.value)}
//                     />
//                 </div>
//                 <button onClick={handlePromotionUpdate}>Update Promotion</button>
//                 {promotionTitle && (
//                     <div>
//                         <h3>{promotionTitle}</h3>
//                         <p>{promotionDescription}</p>
//                         <p>{`From: ${new Date(promotionStartDate).toLocaleDateString()} To: ${new Date(promotionEndDate).toLocaleDateString()}`}</p>
//                     </div>
//                 )}
//             </section>
//             <section>
//                 <h2>Gender Images</h2>
//                 {Object.keys(genderImageUrls).map((category) => (
//                     <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//                         <h3>{category}</h3>
//                         <input
//                             type="text"
//                             value={genderImageUrls[category]}
//                             onChange={(e) => handleGenderImageChange(category, e.target.value)}
//                             placeholder={`Enter URL for ${category}`}
//                         />
//                         {genderImageUrls[category] && (
//                             <div style={{ display: 'inline-block', margin: '10px' }}>
//                                 <img src={genderImageUrls[category]} alt={category} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                                 <button onClick={() => handleRemoveGenderImage(genderImageUrls[category])}>Remove</button>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </section>
//             <section>
//                 <h2>Save All</h2>
//                 <button onClick={handleSaveAll}>Save All Images</button>
//             </section>
//
//         </div>
//     );
// };
//
// export default AdminHomepage;








// const AdminHomepage = () => {
//     const [sliderImages, setSliderImages] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//     const [promotion, setPromotion] = useState({});
//     const [newSliderImage, setNewSliderImage] = useState('');
//     const [newGenderImage, setNewGenderImage] = useState('');
//     const [promotionTitle, setPromotionTitle] = useState('');
//     const [promotionDescription, setPromotionDescription] = useState('');
//     const [promotionStartDate, setPromotionStartDate] = useState('');
//     const [promotionEndDate, setPromotionEndDate] = useState('');
//     const [selectedSliderImage, setSelectedSliderImage] = useState('');
//     const [genderImageUrls, setGenderImageUrls] = useState({
//         'Мужская одежда': '',
//         'Женская одежда': '',
//         'Детская одежда': '',
//         'Гаджеты': '',
//         'Унисекс': '',
//         'Аксессуары': '',
//         'Бытовая эл.техника': '',
//         'Товары для всех': ''
//     });
//
//     const genderTitles = [
//         'Мужская одежда',
//         'Женская одежда',
//         'Детская одежда',
//         'Гаджеты',
//         'Унисекс',
//         'Аксессуары',
//         'Бытовая эл.техника',
//         'Товары для всех'
//     ];
//
//
//     // useEffect(() => {
//     //     axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
//     //         .then(response => {
//     //             const { sliderImages, genderImages, promotions } = response.data;
//     //             setSliderImages(sliderImages || []);
//     //             setGenderImages(genderImages || []);
//     //             setPromotion(promotions || {});
//     //             // Устанавливаем дефолтные значения для полей промоакций
//     //             if (sliderImages.length > 0) {
//     //                 const firstImage = sliderImages[0];
//     //                 setSelectedSliderImage(firstImage.url);
//     //                 if (firstImage.promotions.length > 0) {
//     //                     const defaultPromotion = firstImage.promotions[0];
//     //                     setPromotionTitle(defaultPromotion.title || '');
//     //                     setPromotionDescription(defaultPromotion.description || '');
//     //                     setPromotionStartDate(defaultPromotion.startDate ? new Date(defaultPromotion.startDate).toISOString().split('T')[0] : '');
//     //                     setPromotionEndDate(defaultPromotion.endDate ? new Date(defaultPromotion.endDate).toISOString().split('T')[0] : '');
//     //                 }
//     //             }
//     //             // Устанавливаем дефолтные значения для изображений по категориям
//     //             const defaultGenderImageUrls = {};
//     //             genderImages.forEach(img => defaultGenderImageUrls[img.category] = img.url);
//     //             setGenderImageUrls(defaultGenderImageUrls);
//     //         })
//     //         .catch(error => console.error('Error fetching data:', error));
//     // }, []);
//
//
//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => {
//                 const { sliderImages, genderImages, promotions } = response.data;
//                 setSliderImages(sliderImages || []);
//                 setGenderImages(genderImages || []);
//                 setPromotion(promotions || {});
//                 // Устанавливаем дефолтные значения для полей промоакций
//                 if (sliderImages.length > 0) {
//                     const firstImage = sliderImages[0];
//                     setSelectedSliderImage(firstImage.url);
//                     if (firstImage.promotions.length > 0) {
//                         const defaultPromotion = firstImage.promotions[0];
//                         setPromotionTitle(defaultPromotion.title || '');
//                         setPromotionDescription(defaultPromotion.description || '');
//                         setPromotionStartDate(defaultPromotion.startDate ? new Date(defaultPromotion.startDate).toISOString().split('T')[0] : '');
//                         setPromotionEndDate(defaultPromotion.endDate ? new Date(defaultPromotion.endDate).toISOString().split('T')[0] : '');
//                     }
//                 }
//                 // Устанавливаем дефолтные значения для изображений по категориям
//                 const defaultGenderImageUrls = {};
//                 genderImages.forEach(img => defaultGenderImageUrls[img.url] = img.url); // Используем URL как ключ
//                 setGenderImageUrls(defaultGenderImageUrls);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);
//
//
//
//     const handleAddSliderImage = () => {
//         const updatedImages = [...sliderImages, { url: newSliderImage, promotions: [] }];
//         setSliderImages(updatedImages);
//         setNewSliderImage('');
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: updatedImages, genderImages, promotions: promotion })
//             .catch(error => console.error('Error updating slider images:', error));
//     };
//
//     const handleRemoveSliderImage = (imageUrl) => {
//         const updatedImages = sliderImages.filter(img => img.url !== imageUrl);
//         setSliderImages(updatedImages);
//         axios.delete(`${process.env.REACT_APP_API_URL}/api/homepage/slider/${encodeURIComponent(imageUrl)}`)
//             .catch(error => console.error('Error removing slider image:', error));
//     };
//
//     const handleGenderImageChange = (category, url) => {
//         setGenderImageUrls(prevState => ({
//             ...prevState,
//             [category]: url
//         }));
//     };
//
//     const handleGenderImageSubmit = () => {
//         const updatedGenderImages = Object.entries(genderImageUrls).map(([category, url]) => ({ category, url }));
//         setGenderImages(updatedGenderImages);
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: updatedGenderImages, promotions: promotion })
//             .catch(error => console.error('Error updating gender images:', error));
//     };
//
//     const handleRemoveGenderImage = (url) => {
//         const updatedImages = genderImages.filter(img => img.url !== url);
//         setGenderImages(updatedImages);
//         axios.delete(`${process.env.REACT_APP_API_URL}/api/homepage/gender/${encodeURIComponent(url)}`)
//             .catch(error => console.error('Error removing gender image:', error));
//     };
//
//     const handlePromotionUpdate = () => {
//         const newPromotion = { title: promotionTitle, description: promotionDescription, startDate: promotionStartDate, endDate: promotionEndDate };
//         const updatedSliderImages = sliderImages.map(img => img.url === selectedSliderImage ? { ...img, promotions: [...img.promotions, newPromotion] } : img);
//         setSliderImages(updatedSliderImages);
//         axios.patch(`${process.env.REACT_APP_API_URL}/api/homepage/promotion`, { imageUrl: selectedSliderImage, promotions: updatedSliderImages.find(img => img.url === selectedSliderImage).promotions })
//             .catch(error => console.error('Error updating promotion:', error));
//     };
//
//     const handleSaveAll = () => {
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, {
//             sliderImages,
//             genderImages: Object.values(genderImageUrls),
//             promotions: promotion
//         })
//             .then(response => console.log('Data saved successfully:', response))
//             .catch(error => console.error('Error saving data:', error));
//     };
//
//     console.log("genderImageUrls", genderImageUrls)
//
//     return (
//         <div className="homepage-images">
//             <h1>Admin Homepage Management</h1>
//             <section>
//                 <h2>Slider Images</h2>
//                 <input
//                     type="text"
//                     value={newSliderImage}
//                     onChange={(e) => setNewSliderImage(e.target.value)}
//                     placeholder="Enter slider image URL"
//                 />
//                 <button onClick={handleAddSliderImage}>Add Slider Image</button>
//                 <div>
//                     {sliderImages.map((image, index) => (
//                         <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
//                             <img src={image.url} alt={`Slider ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                             <button onClick={() => handleRemoveSliderImage(image.url)}>Remove</button>
//                             <button onClick={() => {
//                                 setSelectedSliderImage(image.url);
//                                 const promotionData = image.promotions.length > 0 ? image.promotions[0] : {};
//                                 setPromotionTitle(promotionData.title || '');
//                                 setPromotionDescription(promotionData.description || '');
//                                 setPromotionStartDate(promotionData.startDate ? new Date(promotionData.startDate).toISOString().split('T')[0] : '');
//                                 setPromotionEndDate(promotionData.endDate ? new Date(promotionData.endDate).toISOString().split('T')[0] : '');
//                             }}>Add Promotion</button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//             <section>
//                 <h2>Promotion</h2>
//                 <select
//                     value={selectedSliderImage}
//                     onChange={(e) => setSelectedSliderImage(e.target.value)}
//                 >
//                     <option value="">Select an image</option>
//                     {sliderImages.map(img => (
//                         <option key={img.url} value={img.url}>{img.url}</option>
//                     ))}
//                 </select>
//                 <input
//                     type="text"
//                     value={promotionTitle}
//                     onChange={(e) => setPromotionTitle(e.target.value)}
//                     placeholder="Promotion Title"
//                 />
//                 <input
//                     type="text"
//                     value={promotionDescription}
//                     onChange={(e) => setPromotionDescription(e.target.value)}
//                     placeholder="Promotion Description"
//                 />
//                 <input
//                     type="date"
//                     value={promotionStartDate}
//                     onChange={(e) => setPromotionStartDate(e.target.value)}
//                 />
//                 <input
//                     type="date"
//                     value={promotionEndDate}
//                     onChange={(e) => setPromotionEndDate(e.target.value)}
//                 />
//                 <button onClick={handlePromotionUpdate}>Update Promotion</button>
//                 {promotion.title && (
//                     <div>
//                         <h3>{promotion.title}</h3>
//                         <p>{promotion.description}</p>
//                         <p>{`From: ${new Date(promotion.startDate).toLocaleDateString()} To: ${new Date(promotion.endDate).toLocaleDateString()}`}</p>
//                     </div>
//                 )}
//             </section>
//             <section>
//                 <h2>Gender Images</h2>
//                 {Object.keys(genderImageUrls).map((category, index) => (
//                     <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//                         {/*<h3>{category}</h3>*/}
//                         <span>{genderTitles[index]}</span>
//                         {genderImageUrls[category] && (
//                             <div style={{ display: 'inline-block', margin: '10px' }}>
//                                 <img src={genderImageUrls[category]} alt={category} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                                 {/*<button onClick={() => handleRemoveGenderImage(genderImageUrls[category])}>Remove</button>*/}
//                             </div>
//                         )}
//
//
//                         <input
//                             type="text"
//                             value={genderImageUrls[category]}
//                             style={{width: "300px"}}
//                             onChange={(e) => handleGenderImageChange(category, e.target.value)}
//                             placeholder={`Enter URL for ${category}`}
//                         />
//                     </div>
//                 ))}
//                 <button onClick={handleGenderImageSubmit}>Save Gender Images</button>
//             </section>
//             <section>
//                 <button onClick={handleSaveAll}>Save All Changes</button>
//             </section>
//         </div>
//     );
// };
//
// export default AdminHomepage;
//





// const AdminHomepage = () => {
//     const [sliderImages, setSliderImages] = useState([]);
//     const [genderImages, setGenderImages] = useState([]);
//     const [promotion, setPromotion] = useState({});
//     const [newSliderImage, setNewSliderImage] = useState('');
//     const [promotionTitle, setPromotionTitle] = useState('');
//     const [promotionDescription, setPromotionDescription] = useState('');
//     const [promotionStartDate, setPromotionStartDate] = useState('');
//     const [promotionEndDate, setPromotionEndDate] = useState('');
//     const [selectedSliderImage, setSelectedSliderImage] = useState('');
//     const [genderImageUrls, setGenderImageUrls] = useState({
//         'Мужская одежда': '',
//         'Женская одежда': '',
//         'Детская одежда': '',
//         'Гаджеты': '',
//         'Унисекс': '',
//         'Аксессуары': '',
//         'Бытовая эл.техника': '',
//         'Товары для всех': ''
//     });
//
//     const genderTitles = [
//         'Мужская одежда',
//         'Женская одежда',
//         'Детская одежда',
//         'Гаджеты',
//         'Унисекс',
//         'Аксессуары',
//         'Бытовая эл.техника',
//         'Товары для всех'
//     ];
//
//     useEffect(() => {
//         axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
//             .then(response => {
//                 const { sliderImages, genderImages, promotions } = response.data;
//                 setSliderImages(sliderImages || []);
//                 setGenderImages(genderImages || []);
//                 setPromotion(promotions || {});
//                 if (sliderImages.length > 0) {
//                     const firstImage = sliderImages[0];
//                     setSelectedSliderImage(firstImage.url);
//                     if (firstImage.promotions.length > 0) {
//                         const defaultPromotion = firstImage.promotions[0];
//                         setPromotionTitle(defaultPromotion.title || '');
//                         setPromotionDescription(defaultPromotion.description || '');
//                         setPromotionStartDate(defaultPromotion.startDate ? new Date(defaultPromotion.startDate).toISOString().split('T')[0] : '');
//                         setPromotionEndDate(defaultPromotion.endDate ? new Date(defaultPromotion.endDate).toISOString().split('T')[0] : '');
//                     }
//                 }
//                 const defaultGenderImageUrls = {};
//                 genderImages.forEach(img => defaultGenderImageUrls[img.url] = img.url);
//                 setGenderImageUrls(defaultGenderImageUrls);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }, []);
//
//     const handleSaveAll = () => {
//         const updatedGenderImages = Object.entries(genderImageUrls).map(([category, url]) => ({ category, url }));
//         const newPromotion = { title: promotionTitle, description: promotionDescription, startDate: promotionStartDate, endDate: promotionEndDate };
//         const updatedSliderImages = sliderImages.map(img => img.url === selectedSliderImage ? { ...img, promotions: [newPromotion] } : img);
//
//         axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, {
//             sliderImages: updatedSliderImages,
//             genderImages: updatedGenderImages,
//             promotions: newPromotion
//         })
//             .then(response => console.log('Data saved successfully:', response))
//             .catch(error => console.error('Error saving data:', error));
//     };
//
//     const handleReset = () => {
//         window.location.reload(); // Перезагружает страницу, чтобы вернуть все данные к исходному состоянию
//     };
//
//     return (
//         <div className="homepage-images">
//             <h1>Admin Homepage Management</h1>
//             <section>
//                 <h2>Slider Images</h2>
//                 <input
//                     type="text"
//                     value={newSliderImage}
//                     onChange={(e) => setNewSliderImage(e.target.value)}
//                     placeholder="Enter slider image URL"
//                 />
//                 <button onClick={() => {
//                     setSliderImages([...sliderImages, { url: newSliderImage, promotions: [] }]);
//                     setNewSliderImage('');
//                 }}>Add Slider Image</button>
//                 <div>
//                     {sliderImages.map((image, index) => (
//                         <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
//                             <div>
//                                 <img src={image.url} alt={`Slider ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                             </div>
//                             <button onClick={() => setSliderImages(sliderImages.filter(img => img.url !== image.url))}>Remove</button>
//                             <button onClick={() => {
//                                 setSelectedSliderImage(image.url);
//                                 const promotionData = image.promotions.length > 0 ? image.promotions[0] : {};
//                                 setPromotionTitle(promotionData.title || '');
//                                 setPromotionDescription(promotionData.description || '');
//                                 setPromotionStartDate(promotionData.startDate ? new Date(promotionData.startDate).toISOString().split('T')[0] : '');
//                                 setPromotionEndDate(promotionData.endDate ? new Date(promotionData.endDate).toISOString().split('T')[0] : '');
//                             }}>Add Promotion</button>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//             <section>
//                 <h2>Promotion</h2>
//                 <select
//                     value={selectedSliderImage}
//                     onChange={(e) => setSelectedSliderImage(e.target.value)}
//                 >
//                     <option value="">Select an image</option>
//                     {sliderImages.map(img => (
//                         <option key={img.url} value={img.url}>{img.url}</option>
//                     ))}
//                 </select>
//                 <input
//                     type="text"
//                     value={promotionTitle}
//                     onChange={(e) => setPromotionTitle(e.target.value)}
//                     placeholder="Promotion Title"
//                 />
//                 <input
//                     type="text"
//                     value={promotionDescription}
//                     onChange={(e) => setPromotionDescription(e.target.value)}
//                     placeholder="Promotion Description"
//                 />
//                 <input
//                     type="date"
//                     value={promotionStartDate}
//                     onChange={(e) => setPromotionStartDate(e.target.value)}
//                 />
//                 <input
//                     type="date"
//                     value={promotionEndDate}
//                     onChange={(e) => setPromotionEndDate(e.target.value)}
//                 />
//             </section>
//             <section>
//                 <h2>Gender Images</h2>
//                 {Object.keys(genderImageUrls).map((category, index) => (
//                     <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
//                         <span>{genderTitles[index]}</span>
//                         {genderImageUrls[category] && (
//                             <div style={{ display: 'inline-block', margin: '10px' }}>
//                                 <img src={genderImageUrls[category]} alt={category} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
//                             </div>
//                         )}
//                         <input
//                             type="text"
//                             value={genderImageUrls[category]}
//                             style={{ width: '300px' }}
//                             onChange={(e) => setGenderImageUrls(prevState => ({
//                                 ...prevState,
//                                 [category]: e.target.value
//                             }))}
//                             placeholder={`Enter URL for ${category}`}
//                         />
//                     </div>
//                 ))}
//             </section>
//             <section>
//                 <button onClick={handleSaveAll}>Save All Changes</button>
//                 <button onClick={handleReset} style={{ marginLeft: '10px' }}>Reset</button>
//             </section>
//         </div>
//     );
// };
//
// export default AdminHomepage;


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ConfirmationModal from './ConfirmationModal';
import {useHistory} from "react-router-dom"; // Импортируем модальное окно

const AdminHomepage = () => {
    const [sliderImages, setSliderImages] = useState([]);
    const [genderImages, setGenderImages] = useState([]);
    const [promotion, setPromotion] = useState({});
    const [newSliderImage, setNewSliderImage] = useState('');
    const [promotionTitle, setPromotionTitle] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [promotionStartDate, setPromotionStartDate] = useState('');
    const [promotionEndDate, setPromotionEndDate] = useState('');
    const [selectedSliderImage, setSelectedSliderImage] = useState('');
    const [genderImageUrls, setGenderImageUrls] = useState({
        'Мужская одежда': '',
        'Женская одежда': '',
        'Детская одежда': '',
        'Гаджеты': '',
        'Унисекс': '',
        'Аксессуары': '',
        'Бытовая эл.техника': '',
        'Товары для всех': ''
    });
    const [showPromotionSection, setShowPromotionSection] = useState(false); // Для управления видимостью секции
    const history = useHistory();
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
    const [imageToRemove, setImageToRemove] = useState(''); // URL изображения для удаления
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff'); // Новый стейт для цвета фона
    const [titleColor, setTitleColor] = useState('#000000'); // Цвет заголовка по умолчанию
    const [descriptionColor, setDescriptionColor] = useState('#000000'); // Цвет описания по умолчанию
    const [fontSizeTitle, setFontSizeTitle] = useState('16px');  // Размер шрифта заголовка по умолчанию
    const [fontSizeDescription, setFontSizeDescription] = useState('14px');  // Размер шрифта описания по умолчанию
    const [fontFamilleTitle, setFontFamilleTitle] = useState('Arial');  // Добавлено для выбора шрифта заголовка
    const [fontFamilleDescription, setFontFamilleDescription] = useState('Arial');  // Добавлено для выбора шрифта описания
    const genderTitles = [
        'Мужская одежда',
        'Женская одежда',
        'Детская одежда',
        'Гаджеты',
        'Унисекс',
        'Аксессуары',
        'Бытовая эл.техника',
        'Товары для всех'
    ];

    const fontFamilies = [
        'Arial',
        'Verdana',
        'Times New Roman',
        'Georgia',
        'Courier New',
        'Tahoma',
        'Trebuchet MS',
        'Impact'
    ];

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
            .then(response => {
                const { sliderImages, genderImages, promotions } = response.data;
                setSliderImages(sliderImages || []);
                setGenderImages(genderImages || []);
                setPromotion(promotions || {});
                if (sliderImages.length > 0) {
                    const firstImage = sliderImages[0];
                    setSelectedSliderImage(firstImage.url);
                    setSelectedBackgroundColor(firstImage.colorBackground || '#ffffff');
                    setTitleColor(firstImage.colorTitle || '#000000'); // Установка цвета заголовка
                    setDescriptionColor(firstImage.colorDescription || '#000000'); // Установка цвета описания
                    setFontSizeTitle(firstImage.fontSizeTitle || '16px');  // Установка размера шрифта заголовка
                    setFontSizeDescription(firstImage.fontSizeDescription || '14px');  // Установка размера шрифта описания
                    setFontFamilleTitle(firstImage.fontFamilleTitle || 'Arial');
                    setFontFamilleDescription(firstImage.fontFamilleDescription || 'Arial');
                    if (firstImage.promotions.length > 0) {
                        const defaultPromotion = firstImage.promotions[0];
                        setPromotionTitle(defaultPromotion.title || '');
                        setPromotionDescription(defaultPromotion.description || '');
                        setPromotionStartDate(defaultPromotion.startDate ? new Date(defaultPromotion.startDate).toISOString().split('T')[0] : '');
                        setPromotionEndDate(defaultPromotion.endDate ? new Date(defaultPromotion.endDate).toISOString().split('T')[0] : '');
                    }
                }
                const defaultGenderImageUrls = {};
                genderImages.forEach(img => defaultGenderImageUrls[img.url] = img.url);
                setGenderImageUrls(defaultGenderImageUrls);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    const handleSaveAll = () => {
        const updatedGenderImages = Object.entries(genderImageUrls).map(([category, url]) => ({ category, url }));
        const newPromotion = {
            title: promotionTitle,
            description: promotionDescription,
            startDate: promotionStartDate,
            endDate: promotionEndDate
        };

        const updatedSliderImages = sliderImages.map(img =>
            img.url === selectedSliderImage ?
                {
                    ...img,
                    promotions: [newPromotion],
                    colorTitle: titleColor,  // Сохранение цвета заголовка
                    colorDescription: descriptionColor,  // Сохранение цвета описания
                    fontSizeTitle: fontSizeTitle,  // Сохранение размера шрифта заголовка
                    fontSizeDescription: fontSizeDescription,  // Сохранение размера шрифта описания
                    fontFamilleTitle: fontFamilleTitle,  // Сохранение шрифта заголовка
                    fontFamilleDescription: fontFamilleDescription,  // Сохранение шрифта описания

                } :
                img
        );

        axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, {
            sliderImages: updatedSliderImages,
            genderImages: updatedGenderImages,
            promotions: newPromotion
        })
            .then(response => {
                toast.success('Все обновления успешно сохранены!');
                // Обновляем состояние компонента с новыми данными
                setSliderImages(updatedSliderImages);
                setGenderImages(updatedGenderImages);
                setPromotion(newPromotion);
            })
            .catch(error => {
                toast.error('Произошла ошибка при сохранении данных.');
                console.error('Error saving data:', error);
            });
    };


    const handleReset = () => {
        window.location.reload(); // Перезагружает страницу, чтобы вернуть все данные к исходному состоянию

    };

    const handleRemoveSliderImage = (imageUrl) => {
        setImageToRemove(imageUrl);
        setShowModal(true);
    };

    const confirmRemoveSliderImage = () => {
        setSliderImages(sliderImages.filter(img => img.url !== imageToRemove));
        axios.delete(`${process.env.REACT_APP_API_URL}/api/homepage/slider/${encodeURIComponent(imageToRemove)}`)
            .catch(error => console.error('Error removing slider image:', error));
        setShowModal(false);
    };

    const handleRemoveGenderImage = (url) => {
        setImageToRemove(url);
        setShowModal(true);
    };

    const confirmRemoveGenderImage = () => {
        const updatedImages = genderImages.filter(img => img.url !== imageToRemove);
        setGenderImages(updatedImages);
        axios.delete(`${process.env.REACT_APP_API_URL}/api/homepage/gender/${encodeURIComponent(imageToRemove)}`)
            .catch(error => console.error('Error removing gender image:', error));
        setShowModal(false);
    };


    const handleUpdatePromotion = (image) => {
        setSelectedSliderImage(image.url);
        const promotionData = image.promotions.length > 0 ? image.promotions[0] : {};
        setPromotionTitle(promotionData.title || '');
        setPromotionDescription(promotionData.description || '');
        setPromotionStartDate(promotionData.startDate ? new Date(promotionData.startDate).toISOString().split('T')[0] : '');
        setPromotionEndDate(promotionData.endDate ? new Date(promotionData.endDate).toISOString().split('T')[0] : '');
        setTitleColor(image.colorTitle || '#000000'); // Установка цвета заголовка
        setDescriptionColor(image.colorDescription || '#000000'); // Установка цвета описания
        setFontSizeTitle(image.fontSizeTitle || '16px');  // Установка размера шрифта заголовка
        setFontSizeDescription(image.fontSizeDescription || '14px');  // Установка размера шрифта описания
        setShowPromotionSection(true); // Показываем секцию информации об акции
    };


    return (
        <div className="homepage-images">
            <h1 style={{textAlign:"center"}}>Управления главной страницей</h1>
            <section>
                <h2>Картинка для слайдера</h2>
                <input
                    type="text"
                    value={newSliderImage}
                    onChange={(e) => setNewSliderImage(e.target.value)}
                    placeholder="Введите URL картинки"
                />
                <button onClick={() => {
                    setSliderImages([...sliderImages, { url: newSliderImage, promotions: [], colorBackground: '#ffffff' }]);
                    setNewSliderImage('');
                }}>Добавить слайдер</button>
                <div>
                    {sliderImages.map((image, index) => (
                        <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
                            <div className="slider-img-background" style={{ backgroundColor: image.colorBackground || '#ffffff' }}>
                                <img src={image.url} alt={`Slider ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            </div>
                            <input
                                type="color"
                                value={image.colorBackground || '#ffffff'}
                                onChange={(e) => {
                                    const updatedSliderImages = sliderImages.map((img, i) =>
                                        i === index ? { ...img, colorBackground: e.target.value } : img
                                    );
                                    setSliderImages(updatedSliderImages);
                                }}
                            />
                            <div style={{display:"flex", height:"33px", fontSize:"13px"}}>
                                <div style={{display:"flex", height:"33px", fontSize:"13px"}}>
                                    <button onClick={() => handleRemoveSliderImage(image.url)}>Удалить</button>
                                    <button onClick={() => handleUpdatePromotion(image)}>Обновить акцию</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {showPromotionSection && (
                <section>
                    <h2>Информация об акции, на слайдере</h2>
                    <select
                        value={selectedSliderImage}
                        onChange={(e) => setSelectedSliderImage(e.target.value)}
                    >
                        <option value="">Select an image</option>
                        {sliderImages.map(img => (
                            <option key={img.url} value={img.url}>{img.url}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={promotionTitle}
                        onChange={(e) => setPromotionTitle(e.target.value)}
                        placeholder="Заголовок акции"
                        style={{ color: titleColor, fontSize: fontSizeTitle, fontFamily: fontFamilleTitle }} // Применение цвета заголовка
                    />
                    <input
                        type="number"
                        value={fontSizeTitle.replace('px', '')}  // Убираем 'px' для удобства работы с input type="number"
                        onChange={(e) => setFontSizeTitle(`${e.target.value}px`)}
                        placeholder="Размер шрифта заголовка"
                    />
                    <select
                        value={fontFamilleTitle}
                        onChange={(e) => setFontFamilleTitle(e.target.value)}
                    >
                        {fontFamilies.map((font, index) => (
                            <option key={index} value={font}>{font}</option>
                        ))}
                    </select>
                    <input
                        type="color"
                        value={titleColor}
                        onChange={(e) => setTitleColor(e.target.value)}
                    />
                    <input
                        type="text"
                        value={promotionDescription}
                        onChange={(e) => setPromotionDescription(e.target.value)}
                        placeholder="Описание акции"
                        style={{ color: descriptionColor, fontSize: fontSizeDescription, fontFamily: fontFamilleDescription }} // Применение цвета описания
                    />
                    <input
                        type="number"
                        value={fontSizeDescription.replace('px', '')}  // Убираем 'px' для удобства работы с input type="number"
                        onChange={(e) => setFontSizeDescription(`${e.target.value}px`)}
                        placeholder="Размер шрифта описания"
                    />
                    <select
                        value={fontFamilleDescription}
                        onChange={(e) => setFontFamilleDescription(e.target.value)}
                    >
                        {fontFamilies.map((font, index) => (
                            <option key={index} value={font}>{font}</option>
                        ))}
                    </select>
                    <input
                        type="color"
                        value={descriptionColor}
                        onChange={(e) => setDescriptionColor(e.target.value)}
                    />
                    <input
                        type="date"
                        value={promotionStartDate}
                        onChange={(e) => setPromotionStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        value={promotionEndDate}
                        onChange={(e) => setPromotionEndDate(e.target.value)}
                    />
                </section>


            )}
            <section>
                <h2>Картинки по пренадлежнасти</h2>
                {Object.keys(genderImageUrls).map((category, index) => (
                    <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <span>{genderTitles[index]}</span>
                        {genderImageUrls[category] && (
                            <div style={{ display: 'inline-block', margin: '10px' }}>
                                <img src={genderImageUrls[category]} alt={category} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            </div>
                        )}
                        <input
                            type="text"
                            value={genderImageUrls[category]}
                            style={{ width: '300px' }}
                            onChange={(e) => setGenderImageUrls(prevState => ({
                                ...prevState,
                                [category]: e.target.value
                            }))}
                            placeholder={`Введите URL картинки ${category}`}
                        />
                        {/*<button onClick={() => handleRemoveGenderImage(genderImageUrls[category])}>Remove Image</button>*/}
                    </div>
                ))}
            </section>
            <section>
                <div style={{display:"flex", margin:"0 auto", width:"80%", marginBottom:"30px" }}>
                    <button onClick={handleSaveAll}>Сохранить все обновления</button>
                    <button onClick={handleReset} style={{ marginLeft: '10px' }}>Сбросить</button>
                </div>
            </section>
            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmRemoveSliderImage} // Передаем функцию подтверждения удаления
                message="Вы уверены, что хотите удалить этот элемент из слайдера??"
            />
            <ToastContainer />
        </div>
    );
};

export default AdminHomepage;
