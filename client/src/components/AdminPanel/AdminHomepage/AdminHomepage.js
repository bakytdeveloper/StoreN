import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminHomepage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';
import {useHistory} from "react-router-dom";

const AdminHomepage = () => {
    const [sliderImages, setSliderImages] = useState([]);
    // eslint-disable-next-line
    const [genderImages, setGenderImages] = useState([]);
    // eslint-disable-next-line
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
        'Унисекс': '',
        'Гаджеты': '',
        'Аксессуары': '',
        'Бытовая эл.техника': '',
        'Товары для всех': ''
    });
    const [showPromotionSection, setShowPromotionSection] = useState(false); // Для управления видимостью секции
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
    const [imageToRemove, setImageToRemove] = useState(''); // URL изображения для удаления
    // eslint-disable-next-line
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
        'Унисекс',
        'Гаджеты',
        'Аксессуары',
        'Бытовая эл.техника',
        'Товары для всех'
    ];

    const fontFamilies = [
        'Arial',
        'Verdana',
        'DIN Alternate',
        'SignPainter',
        'Phosphate',
        'STSong',
        'Bradley Hand',
        'Rockwell',
        'Ayuthaya',
        'Trattatello',
        'PT Mono',
        'Heiti TC',
        'Luminari',
        'PT Serif Caption',
        'Menlo',
        'Copperplate',
        'Arial Black',
        'Comic Sans MS',
        'Hiragino Sans',
        'Times New Roman',
        'Georgia',
        'Sathu',
        'Oswald',
        'Courier New',
        "American Typewriter",
        'Trebuchet MS',
        'Impact'
    ];

    const history = useHistory();

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
                    setTitleColor(firstImage.colorTitle || '#000000');
                    setDescriptionColor(firstImage.colorDescription || '#000000');
                    setFontSizeTitle(firstImage.fontSizeTitle || '16px');
                    setFontSizeDescription(firstImage.fontSizeDescription || '14px');
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
                    colorTitle: titleColor,
                    colorDescription: descriptionColor,
                    fontSizeTitle: fontSizeTitle,
                    fontSizeDescription: fontSizeDescription,
                    fontFamilleTitle: fontFamilleTitle,
                    fontFamilleDescription: fontFamilleDescription,

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
        window.location.reload();
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


    const handleUpdatePromotion = (image) => {
        setSelectedSliderImage(image.url);
        const promotionData = image.promotions.length > 0 ? image.promotions[0] : {};
        setPromotionTitle(promotionData.title || '');
        setPromotionDescription(promotionData.description || '');
        setPromotionStartDate(promotionData.startDate ? new Date(promotionData.startDate).toISOString().split('T')[0] : '');
        setPromotionEndDate(promotionData.endDate ? new Date(promotionData.endDate).toISOString().split('T')[0] : '');
        setTitleColor(image.colorTitle || '#000000');
        setDescriptionColor(image.colorDescription || '#000000');
        setFontSizeTitle(image.fontSizeTitle || '16px');
        setFontSizeDescription(image.fontSizeDescription || '14px');
        setShowPromotionSection(true);
    };


    useEffect(() => {
        const handleWheel = (e) => {
            if (e.target.type === 'number') {
                e.preventDefault();
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.type === 'number') {
                activeElement.blur();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClose = () => {
        history.goBack();
    };


    return (
        <div className="homepage-images">
            <h1 style={{textAlign:"center"}}>Управления главной страницей</h1>
            <span
                className="sellersListClose"
                type="button" onClick={handleClose}>
                &#10006;
            </span>
            <section>
                <h2>Картинка для слайдера</h2>
                <input
                    type="text"
                    value={newSliderImage}
                    onChange={(e) => setNewSliderImage(e.target.value)}
                    placeholder="Введите URL картинки новой картики слайдера"
                    style={{marginBottom:"10px", marginTop:"10px"}}
                />
                <button onClick={() => {
                    setSliderImages([...sliderImages, { url: newSliderImage, promotions: [], colorBackground: '#ffffff' }]);
                    setNewSliderImage('');
                }}>Добавить картинку в слайдер</button>
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
                    <h2>Информация об акции на слайдере</h2>
                    <input
                        type="text"
                        value={selectedSliderImage}
                        onChange={(e) => {
                            setSelectedSliderImage(e.target.value);
                            const updatedImages = sliderImages.map(img =>
                                img.url === selectedSliderImage ? { ...img, url: e.target.value } : img
                            );
                            setSliderImages(updatedImages);
                        }}
                        placeholder="Введите URL изображения для редактирования"
                    />

                    <input
                        type="text"
                        value={promotionTitle}
                        onChange={(e) => setPromotionTitle(e.target.value)}
                        placeholder="Заголовок акции"
                        style={{ marginBottom:"10px", marginTop:"10px", color: titleColor, fontSize: fontSizeTitle, fontFamily: fontFamilleTitle }} // Применение цвета заголовка
                    />

                    <input
                        type="number"
                        value={fontSizeTitle.replace('px', '')}  // Убираем 'px' для удобства работы с input type="number"
                        onChange={(e) => setFontSizeTitle(`${e.target.value}px`)}
                        placeholder="Размер шрифта заголовка"
                    />

                    <select
                        style={{marginBottom:"10px", marginTop:"10px"}}
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
                        style={{ color: descriptionColor, marginBottom:"10px", marginTop:"10px", fontSize: fontSizeDescription, fontFamily: fontFamilleDescription }} // Применение цвета описания
                    />

                    <input
                        type="number"
                        value={fontSizeDescription.replace('px', '')}  // Убираем 'px' для удобства работы с input type="number"
                        onChange={(e) => setFontSizeDescription(`${e.target.value}px`)}
                        placeholder="Размер шрифта описания"
                    />

                    <select
                        style={{marginBottom:"10px", marginTop:"10px"}}
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
                        style={{marginBottom:"10px", marginTop:"10px"}}
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
                    </div>
                ))}
            </section>
            <section>
                <div style={{display:"flex", margin:"0 auto", width:"80%", marginBottom:"30px" }}>
                    <button onClick={handleReset} style={{ marginLeft: '10px' }}>Сбросить</button>
                    <button onClick={handleSaveAll}>Сохранить все обновления</button>
                </div>
            </section>
            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmRemoveSliderImage} // Передаем функцию подтверждения удаления
                message="Вы уверены, что хотите удалить этот элемент из слайдера?"
            />
            <ToastContainer />
        </div>
    );
};

export default AdminHomepage;
