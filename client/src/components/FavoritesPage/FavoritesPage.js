import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            const userId = token ? jwtDecode(token).userId : null;
            if (userId) {
                try {
                    const response = await fetch(`${apiUrl}/api/users/${userId}/favorites`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setFavorites(data);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }
            }
        };

        fetchFavorites();
    }, []);

    console.log("favorites", ...favorites)

    return (
        <div className="favorites-page">
            <h2>Избранные товары</h2>
            {favorites.length === 0 ? (
                <p>В избранных товарах ничего нет.</p>
            ) : (
                <ul>
                    {favorites.map((item) => (
                        <li key={item._id}>
                            <h3>{item.name}</h3>
                            <img src={item.imageUrl} alt={item.name} />
                            <p>{item.description}</p>
                            <p>Цена: {item.price} ₽</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FavoritesPage;
