// src/components/Admin/OrderItem.js
import React, { useState } from 'react';

const OrderItem = ({ order, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(order.status);

    const handleStatusChange = () => {
        // Выполняем обновление статуса на сервере и в локальном состоянии
        onUpdateStatus(order._id, selectedStatus);
    };

    return (
        <tr key={order._id}>
            {/* ... (ваш уже существующий код) */}
            <td>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                <button onClick={handleStatusChange}>Изменить</button>
            </td>
            {/* ... (ваш уже существующий код) */}
        </tr>
    );
};

export default OrderItem;
