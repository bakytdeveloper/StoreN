

// src/components/Admin/OrderItem.js
import React, { useState } from 'react';

const OrderItem = ({ order, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(order.status);
    const handleChange = (e) => {
        // Обновляем локальное состояние при изменении значения в select
        setSelectedStatus(e.target.value);
        // Выполняем обновление статуса на сервере
        onUpdateStatus(order._id, e.target.value);
    };

    let statusColor;
    if (selectedStatus === 'pending') {
        statusColor = '#ca0644';
    } else if (selectedStatus === 'inProgress') {
        statusColor = '#065fbf';
    }  else if (selectedStatus === 'completed') {
        statusColor = '#34c304';
    } else if (selectedStatus === "cancelled") {
        statusColor = '#9f9d9d';
    }


    return (
                <select
                    value={selectedStatus}
                    onChange={handleChange}
                    style={{ background: statusColor, fontWeight: "bold", color:"white", fontSize:"15px" }}
                    key={order._id}
                >
                    <option value="pending">В ожидании</option>
                    <option value="inProgress">В процессе</option>
                    <option value="completed">Завершено</option>
                    <option value="cancelled">Отменено</option>

                </select>
    );
};

export default OrderItem;
