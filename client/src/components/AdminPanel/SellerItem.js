
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

    return (
        <tr key={seller._id}>
            <td>
                <select
                    value={selectedStatus}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>

                </select>
            </td>
        </tr>
    );
};

export default SellerItem;
