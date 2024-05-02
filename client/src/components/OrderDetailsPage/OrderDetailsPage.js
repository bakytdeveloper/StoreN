

import React from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailsModal from '../AdminPanel/OrderDetailsModal';




const OrderDetailsPage = ({ orders }) => {
    const { orderId } = useParams();
    const order = orders.find(order => order._id === orderId);

    return (
        <div className="order-details-page">
            {order && <OrderDetailsModal order={order} />}
        </div>
    );
};

export default OrderDetailsPage;