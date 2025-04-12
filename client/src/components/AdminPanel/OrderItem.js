

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
        statusColor = '#f81a60';
    } else if (selectedStatus === 'inProgress') {
        statusColor = '#3291f8';
    }  else if (selectedStatus === 'completed') {
        statusColor = '#e0dcdc';
    } else if (selectedStatus === "cancelled") {
        statusColor = '#9f9d9d';
    }


    return (
                <select
                    value={selectedStatus}
                    onChange={handleChange}
                    style={{ background: statusColor }}
                    key={order._id}
                >
                    <option value="pending">Pending</option>
                    <option value="inProgress">in Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
    );
};

export default OrderItem;
