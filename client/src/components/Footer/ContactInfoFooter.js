import React, {useEffect} from 'react';
import tik from './../Header/tik-tok1.png';
import what from './../Header/whatsapp1.png';
import ins from './../Header/instagram1.png';
import tel from './../Header/telegram1.png';
import './Footer.css';
import cross from './cross.png';

const ContactInfoFooter = ({setShowSidebar, onClose}) => {
    const handleGoBack = () => {
        onClose();
    };


    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);



    return (
        <div className="contact-info-modal">
            <button className="close-btn-modal" onClick={handleGoBack}>
                <img src={cross} alt="Закрыть"/>
            </button>

            <h2 className="contact-info-modal-title">Наши контакты</h2>
            <div className="phone-modal">
                <a className="phone-link-modal" href="tel:+996508100777"  target="_blank"  rel="noopener noreferrer">
                    0(508) 100 777
                </a>
            </div>
            <div className="social-icons-modal">
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
                    <img className="icon-modal" src={tik} alt="TikTok Icon" />
                </a>
                <a href="https://api.whatsapp.com/send?phone=996508100777" target="_blank" rel="noopener noreferrer">
                    <img className="icon-modal" src={what} alt="WhatsApp Icon" />
                </a>
                <a href="https://www.instagram.com/"  target="_blank"  rel="noopener noreferrer">
                    <img className="icon-modal ins-modal" src={ins} alt="Instagram Icon" />
                </a>
                <a href="https://t.me/kanatasa?phone=+996508100777" target="_blank" rel="noopener noreferrer">
                    <img className="icon-modal" src={tel} alt="Telegram Icon" />
                </a>
            </div>
            <div className="workingTime-modal">с ПН по ВС - с 10:00 до 21:00</div>
        </div>
    );
};

export default ContactInfoFooter;
