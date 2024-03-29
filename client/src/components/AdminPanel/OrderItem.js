

// src/components/Admin/OrderItem.js
import React, { useState } from 'react';

const OrderItem = ({ order, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(order.status);

    const handleStatusChange = () => {
        // Выполняем обновление статуса на сервере и в локальном состоянии
        onUpdateStatus(order._id, selectedStatus);
    };

    const handleChange = (e) => {
        // Обновляем локальное состояние при изменении значения в select
        setSelectedStatus(e.target.value);
        // Выполняем обновление статуса на сервере
        onUpdateStatus(order._id, e.target.value);
    };

    return (
        <tr key={order._id}>
            <td>
                <select
                    value={selectedStatus}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </td>
        </tr>
    );
};

export default OrderItem;
