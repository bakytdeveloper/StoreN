// src/components/Header/ContactInfo.js
import React from 'react';
import ins from "./instagram.png";
import tel from "./telegram.png";
import what from "./whatsapp.png";
import tik from "./tik-tok.png";

const ContactInfo = () => {
    return (
        <div className="contact-info">
            <div className="phone">
                <a href="tel:+996508100777"  target="_blank">0(508) 100 777</a>
            </div>
            <div className="social-icons">
                <a href="https://www.tiktok.com/" target="_blank">
                    <img className="icon" src={tik} alt="TikTok Icon" />
                </a>
                <a href="https://api.whatsapp.com/send?phone=996508100777"  target="_blank">
                    <img className="icon" src={what} alt="WhatsApp Icon" />
                </a>
                <a href="https://www.instagram.com/"  target="_blank" >
                    <img className="icon ins" src={ins} alt="Instagram Icon" />
                </a>
                <a href="https://t.me/kanatasa?phone=+996508100777"  target="_blank">
                    <img className="icon" src={tel} alt="Telegram Icon" />
                </a>
            </div>
            <div className="workingTime">с ПН по ВС - с 10:00 до 21:00</div>
            {/* Не показывать кнопку закрытия на больших экранах */}
            <button className="close-btn">Закрыть</button>
        </div>
    );
};

export default ContactInfo;
