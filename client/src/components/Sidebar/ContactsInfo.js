import React from 'react';
import { FaPhone } from 'react-icons/fa';

import tik from "../Header/tik-tok.png";
import what from "../Header/whatsapp.png";
import ins from "../Header/instagram.png";
import tel from "../Header/telegram.png";


const ContactsInfo = ({ setShowSidebar }) => {



    return (
        <div className="contacts-info">
            <h2 style={{marginTop:"11px", color:"black"}}>Наши контакты</h2>


            <div className="phones">
                <FaPhone style={{ marginTop: "0" }} />
                <a style={{ marginLeft: "25px" }} href="tel:+996508100777">0(508) 100 777</a>
            </div>
            <div className="phones">
                <a href="https://api.whatsapp.com/send?phone=996508100777">
                    <img className="icon" style={{ marginTop: "3px" }} src={what} alt="WhatsApp Icon" />
                    <span style={{ marginLeft: "10px" }}>0(508) 100 777</span>
                </a>
            </div>
            <div className="socials-icons">
                <h3>Соц. сети</h3>
                <a style={{ marginLeft: "22px" }} href="https://www.tiktok.com/">
                    <img className="icons" src={tik} alt="TikTok Icon" />
                </a>
                <a style={{ marginLeft: "22px", marginRight: "22px" }} href="https://www.instagram.com/">
                    <img className="icons ins" src={ins} alt="Instagram Icon" />
                </a>
                <a href="https://t.me/kanatasa?phone=+996508100777">
                    <img className="icons" src={tel} alt="Telegram Icon" />
                </a>
            </div>
            <div>
                <h4>График работы</h4>
                <div className="workingTime" style={{ fontSize: "20px", marginTop: "-24px" }}>с ПН по ВС - с 10:00 до 21:00</div>
            </div>
        </div>
    );
};

export default ContactsInfo;
