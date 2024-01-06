// src/components/Header/Header.js

import React, {useState} from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

import ins from "./instagram.png";
import tel from "./telegram.png";
import what from "./whatsapp.png";
import tik from "./tik-tok.png";

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className="header">
            <Link to="/" className="title">
                <h1 style={{fontSize: "35px"}} className="title"> Store <span className="sp">N</span></h1>
            </Link>
            <div className="contact">
                <div className="phone">XXX-XX-XX-XX</div>
                <div className="social-icons">
                    <a className="icon"  href="https://www.tiktok.com/" >
                        <img src={tik} alt="Instagram Icon" />
                    </a>

                    <a href="https://web.whatsapp.com/">
                        <img className="icon" src={what} alt="Instagram Icon" />
                    </a>
                    <a   href="https://www.instagram.com/">
                        <img className="icon" src={ins} alt="Instagram Icon" />
                    </a>
                    <a className="icon"  href="https://web.telegram.org/">
                    {/*<a className="icon"  href="https://web.telegram.org/" target="_blank">*/}
                        <img src={tel} alt="Instagram Icon" />
                    </a>
                </div>
            </div>
            <div className="auth-buttons">
                <Link to="/login" className="auth-button">Login/Register</Link>
                <Link to="/profile" className="auth-button">Profile</Link>
                <Link to="/cart" className="auth-button">Cart</Link>
            </div>
            <div className="search">
                <input type="text"

                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={handleSearchChange} />
            </div>
        </div>
    );
};

export default Header;
