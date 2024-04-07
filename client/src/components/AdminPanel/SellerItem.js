
// src/components/Admin/OrderItem.js
import React, { useState } from 'react';

const SellerItem = ({ seller, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(seller.status);

    const handleStatusChange = () => {
        // Выполняем обновление статуса на сервере и в локальном состоянии
        onUpdateStatus(seller._id, selectedStatus);
    };

    const handleChange = (e) => {
        // Обновляем локальное состояние при изменении значения в select
        setSelectedStatus(e.target.value);
        // Выполняем обновление статуса на сервере
        onUpdateStatus(seller._id, e.target.value);
    };

    let statusColor;
    if (selectedStatus === 'pending') {
        statusColor = '#06abd4';
    } else if (selectedStatus === 'approved') {
        statusColor = 'greenyellow';
    }

    return (
        <tr key={seller._id}>
            <td>
                <select
                    value={selectedStatus}
                    onChange={handleChange}
                    style={{ background: statusColor }}
                >
                    <option value="pending">Ожидает</option>
                    <option value="approved">Одобрен</option>

                </select>
            </td>
        </tr>
    );
};

export default SellerItem;
