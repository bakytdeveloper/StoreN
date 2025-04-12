// src/components/Admin/OrderItem.js
import React, {useEffect, useState} from 'react';

const SellerItem = ({ seller, onUpdateStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState(seller.status);

    useEffect(() => {
        setSelectedStatus(seller.status);
    }, [seller.status]);

    const handleChange = (e) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus);
        onUpdateStatus(seller._id, newStatus);
    };

    let statusColor;
    if (selectedStatus === 'pending') {
        statusColor = '#06abd4';
    } else if (selectedStatus === 'approved') {
        statusColor = 'greenyellow';
    } else if (selectedStatus === 'suspend') {
        statusColor = '#f15e6f';
    }

    return (
        <td>
            <select
                value={selectedStatus}
                onChange={handleChange}
                style={{ background: statusColor }}
            >
                <option value="pending">Ожидает</option>
                <option value="approved">Одобрен</option>
                <option value="suspend">Приостановлен</option>
            </select>
        </td>
    );
};

export default SellerItem;
