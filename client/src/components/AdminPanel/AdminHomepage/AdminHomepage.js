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
    const [showPromotionSection, setShowPromotionSection] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [imageToRemove, setImageToRemove] = useState('');
    // eslint-disable-next-line
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#ffffff');
    const [titleColor, setTitleColor] = useState('#000000');
    const [descriptionColor, setDescriptionColor] = useState('#000000');
    const [fontSizeTitle, setFontSizeTitle] = useState('16px');
    const [fontSizeDescription, setFontSizeDescription] = useState('14px');
    const [fontFamilleTitle, setFontFamilleTitle] = useState('Arial');
    const [fontFamilleDescription, setFontFamilleDescription] = useState('Arial');
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
            <h1 style={{textAlign:"center"}}>Управление главной страницей</h1>
            <span
                className="sellersListClose"
                type="button" onClick={handleClose}>
                &#10006;
            </span>

            {/* Секция слайдера */}
            <section className="admin-section">
                <h2>Карточка для слайдера</h2>
                <div className="input-group">
                   <div className="input-group-add-card-to-slider">
                       <label>URL новой картинки слайдера:</label>
                       <input
                           type="text"
                           value={newSliderImage}
                           onChange={(e) => setNewSliderImage(e.target.value)}
                           placeholder="Введите URL картинки"
                       />
                       <button
                           className="add-card-to-slider"
                           onClick={() => {
                               setSliderImages([...sliderImages, { url: newSliderImage, promotions: [], colorBackground: '#ffffff' }]);
                               setNewSliderImage('');
                           }}>Добавить карточку к слайдеру</button>
                   </div>
                </div>

                <hr />

                <div className="slider-images-container">
                    {sliderImages.map((image, index) => (
                        <div key={index} className="slider-image-item">
                            <div className="slider-img-background" style={{ backgroundColor: image.colorBackground || '#ffffff' }}>
                                <img src={image.url} alt={`Slider ${index}`} className="slider-thumbnail" />
                            </div>
                            <div className="slider-controls">
                                <div className="color-picker-wrapper">
                                    <label>Цвет фона:</label>
                                    <input
                                        type="color"
                                        value={image.colorBackground || '#ffffff'}
                                        onChange={(e) => {
                                            const updatedSliderImages = sliderImages.map((img, i) =>
                                                i === index ? { ...img, colorBackground: e.target.value } : img
                                            );
                                            setSliderImages(updatedSliderImages);
                                        }}
                                        className="small-color-input"
                                    />
                                </div>
                                <div className="slider-buttons">
                                    <button onClick={() => handleRemoveSliderImage(image.url)}>Удалить</button>
                                    <button onClick={() => handleUpdatePromotion(image)}>Редактировать</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Секция акции */}
            {showPromotionSection && (
                <section className="admin-section">
                    <h2>Настройки акции на слайдере</h2>

                    <div className="input-group">
                        <label>URL изображения:</label>
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
                            placeholder="URL изображения"
                        />
                    </div>

                    <hr/>

                    <div className="input-group">
                        <label>Заголовок акции:</label>
                        <input
                            className="input-promotion-title"
                            type="text"
                            value={promotionTitle}
                            onChange={(e) => setPromotionTitle(e.target.value)}
                            placeholder="Заголовок акции"
                            style={{ color: titleColor, fontSize: fontSizeTitle, fontFamily: fontFamilleTitle }}
                        />
                    </div>

                    <div className="style-controls">
                        <div className="style-control-group">
                            <label>Шрифт:</label>
                            <select
                                value={fontFamilleTitle}
                                onChange={(e) => setFontFamilleTitle(e.target.value)}
                                className="small-select"
                            >
                                {fontFamilies.map((font, index) => (
                                    <option key={index} value={font}>{font}</option>
                                ))}
                            </select>
                        </div>

                        <div className="style-control-group">
                            <label>Размер шрифта:</label>
                            <input
                                type="number"
                                value={fontSizeTitle.replace('px', '')}
                                onChange={(e) => setFontSizeTitle(`${e.target.value}px`)}
                                className="small-input"
                            />
                        </div>

                        <div className="style-control-group">
                            <label>Цвет:</label>
                            <input
                                type="color"
                                value={titleColor}
                                onChange={(e) => setTitleColor(e.target.value)}
                                className="small-color-input"
                            />
                        </div>
                    </div>

                    <hr/>

                    <div className="input-group">
                        <label>Описание акции:</label>
                        <input
                            className="input-promotion-title"
                            type="text"
                            value={promotionDescription}
                            onChange={(e) => setPromotionDescription(e.target.value)}
                            placeholder="Описание акции"
                            style={{ color: descriptionColor, fontSize: fontSizeDescription, fontFamily: fontFamilleDescription }}
                        />
                    </div>

                    <div className="style-controls">
                        <div className="style-control-group">
                            <label>Шрифт:</label>
                            <select
                                value={fontFamilleDescription}
                                onChange={(e) => setFontFamilleDescription(e.target.value)}
                                className="small-select"
                            >
                                {fontFamilies.map((font, index) => (
                                    <option key={index} value={font}>{font}</option>
                                ))}
                            </select>
                        </div>

                        <div className="style-control-group">
                            <label>Размер шрифта:</label>
                            <input
                                type="number"
                                value={fontSizeDescription.replace('px', '')}
                                onChange={(e) => setFontSizeDescription(`${e.target.value}px`)}
                                className="small-input"
                            />
                        </div>


                        <div className="style-control-group">
                            <label>Цвет:</label>
                            <input
                                type="color"
                                value={descriptionColor}
                                onChange={(e) => setDescriptionColor(e.target.value)}
                                className="small-color-input"
                            />
                        </div>
                    </div>

                    <hr/>

                    <div className="date-controls">
                        <div className="input-group">
                            <label>Дата начала:</label>
                            <input
                                type="date"
                                value={promotionStartDate}
                                onChange={(e) => setPromotionStartDate(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label>Дата окончания:</label>
                            <input
                                type="date"
                                value={promotionEndDate}
                                onChange={(e) => setPromotionEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Секция категорий */}
            <section className="admin-section">
                <h2>Картинки по категориям</h2>
                {Object.keys(genderImageUrls).map((category, index) => (
                    <div key={category} className="category-item">
                        <label>{genderTitles[index]}</label>
                        <div className="category-content">
                            {genderImageUrls[category] && (
                                <img src={genderImageUrls[category]} alt={category} className="category-thumbnail" />
                            )}
                            <input
                                type="text"
                                value={genderImageUrls[category]}
                                onChange={(e) => setGenderImageUrls(prevState => ({
                                    ...prevState,
                                    [category]: e.target.value
                                }))}
                                placeholder={`URL картинки ${category}`}
                            />
                        </div>
                    </div>
                ))}
            </section>

            {/* Кнопки управления */}
            <section className="action-buttons">
                <button onClick={handleReset}>Сбросить</button>
                <button onClick={handleSaveAll}>Сохранить все изменения</button>
            </section>

            <ConfirmationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmRemoveSliderImage}
                message="Вы уверены, что хотите удалить этот элемент из слайдера?"
            />
            <ToastContainer />
        </div>
    );
};

export default AdminHomepage;