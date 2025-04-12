// src/components/Header/ContactInfo.js
import React from 'react';
import ins from "../Header/instagram1.png";
import tel from "../Header/telegram1.png";
import what from "../Header/whatsapp1.png";
import tik from "../Header/tik-tok1.png";
import './ContactInfo.css';

const ContactInfo = () => {
    return (
        <div className="contact-info footer-contact-info new-footer-adaptive">
           <div className="contact-info-all-context">
               <div className="phone">
                   <a className="phone-link" href="tel:+996508100777"  target="_blank">0(508) 100 777</a>
               </div>
               <div className="social-icons">
                   <a href="https://www.tiktok.com/" target="_blank">
                       <img className="icon" src={tik} alt="TikTok Icon" />
                   </a>
                   <a href="https://api.whatsapp.com/send?phone=996508100777" target="_blank">
                       <img className="icon" src={what} alt="WhatsApp Icon" />
                   </a>
                   <a href="https://www.instagram.com/"  target="_blank" >
                       <img className="icon ins" src={ins} alt="Instagram Icon" />
                   </a>
                   <a href="https://t.me/kanatasa?phone=+996508100777" target="_blank">
                       <img className="icon" src={tel} alt="Telegram Icon" />
                   </a>
               </div>
               <div className="workingTime">с ПН по ВС - с 10:00 до 21:00</div>
           </div>
        </div>
    );
};

export default ContactInfo;
