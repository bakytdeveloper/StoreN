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




const AdminHomepage = () => {
    const [sliderImages, setSliderImages] = useState([]);
    const [genderImages, setGenderImages] = useState([]);
    const [promotion, setPromotion] = useState({});
    const [newSliderImage, setNewSliderImage] = useState('');
    const [newGenderImage, setNewGenderImage] = useState('');
    const [promotionTitle, setPromotionTitle] = useState('');
    const [promotionDescription, setPromotionDescription] = useState('');
    const [promotionStartDate, setPromotionStartDate] = useState('');
    const [promotionEndDate, setPromotionEndDate] = useState('');

    // New states for gender images
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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/homepage`)
            .then(response => {
                const { sliderImages, genderImages, promotions } = response.data;
                setSliderImages(sliderImages || []);
                setGenderImages(genderImages || []);
                setPromotion(promotions || {});
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleAddSliderImage = () => {
        setSliderImages([...sliderImages, newSliderImage]);
        setNewSliderImage('');
        axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: [...sliderImages, newSliderImage], genderImages, promotions: promotion })
            .catch(error => console.error('Error updating slider images:', error));
    };

    const handleRemoveSliderImage = (imageUrl) => {
        const updatedImages = sliderImages.filter(url => url !== imageUrl);
        setSliderImages(updatedImages);
        axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages: updatedImages, genderImages, promotions: promotion })
            .catch(error => console.error('Error updating slider images:', error));
    };

    const handleGenderImageChange = (category, url) => {
        setGenderImageUrls(prevState => ({
            ...prevState,
            [category]: url
        }));
    };

    const handleGenderImageSubmit = () => {
        setGenderImages(Object.values(genderImageUrls));
        axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: Object.values(genderImageUrls), promotions: promotion })
            .catch(error => console.error('Error updating gender images:', error));
    };

    const handleRemoveGenderImage = (imageUrl) => {
        const updatedImages = genderImages.filter(url => url !== imageUrl);
        setGenderImages(updatedImages);
        axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, { sliderImages, genderImages: updatedImages, promotions: promotion })
            .catch(error => console.error('Error updating gender images:', error));
    };

    const handlePromotionUpdate = () => {
        const updatedPromotion = { title: promotionTitle, description: promotionDescription, startDate: promotionStartDate, endDate: promotionEndDate };
        setPromotion(updatedPromotion);
        axios.patch(`${process.env.REACT_APP_API_URL}/api/homepage/promotion`, updatedPromotion)
            .catch(error => console.error('Error updating promotion:', error));
    };

    const handleSaveAll = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/homepage`, {
            sliderImages,
            genderImages: Object.values(genderImageUrls),
            promotions: promotion
        })
            .then(response => console.log('Data saved successfully:', response))
            .catch(error => console.error('Error saving data:', error));
    };

    return (
        <div className="homepage-images">
            <h1>Admin Homepage Management</h1>
            <section>
                <h2>Slider Images</h2>
                <input
                    type="text"
                    value={newSliderImage}
                    onChange={(e) => setNewSliderImage(e.target.value)}
                    placeholder="Enter slider image URL"
                />
                <button onClick={handleAddSliderImage}>Add Slider Image</button>
                <div>
                    {sliderImages.map((image, index) => (
                        <div key={index} style={{ display: 'inline-block', margin: '10px' }}>
                            <img src={image} alt={`Slider ${index}`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                            <button onClick={() => handleRemoveSliderImage(image)}>Remove</button>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h2>Gender Images</h2>
                {Object.keys(genderImageUrls).map((category) => (
                    <div key={category} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <h3>{category}</h3>
                        <input
                            type="text"
                            value={genderImageUrls[category]}
                            onChange={(e) => handleGenderImageChange(category, e.target.value)}
                            placeholder={`Enter URL for ${category}`}
                        />
                        {genderImageUrls[category] && (
                            <div style={{ display: 'inline-block', margin: '10px' }}>
                                <img src={genderImageUrls[category]} alt={category} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                                <button onClick={() => handleRemoveGenderImage(genderImageUrls[category])}>Remove</button>
                            </div>
                        )}
                    </div>
                ))}
                <button onClick={handleGenderImageSubmit}>Update Gender Images</button>
            </section>
            <section>
                <h2>Save All</h2>
                <button onClick={handleSaveAll}>Save All Images</button>
            </section>
            <section>
                <h2>Promotion</h2>
                <input
                    type="text"
                    value={promotionTitle}
                    onChange={(e) => setPromotionTitle(e.target.value)}
                    placeholder="Promotion Title"
                />
                <input
                    type="text"
                    value={promotionDescription}
                    onChange={(e) => setPromotionDescription(e.target.value)}
                    placeholder="Promotion Description"
                />
                <input
                    type="date"
                    value={promotionStartDate}
                    onChange={(e) => setPromotionStartDate(e.target.value)}
                    placeholder="Promotion Start Date"
                />
                <input
                    type="date"
                    value={promotionEndDate}
                    onChange={(e) => setPromotionEndDate(e.target.value)}
                    placeholder="Promotion End Date"
                />
                <button onClick={handlePromotionUpdate}>Update Promotion</button>
                {promotion.title && (
                    <div>
                        <h3>{promotion.title}</h3>
                        <p>{promotion.description}</p>
                        <p>{`From: ${new Date(promotion.startDate).toLocaleDateString()} To: ${new Date(promotion.endDate).toLocaleDateString()}`}</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default AdminHomepage;


