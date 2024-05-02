

import React from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailsModal from '../AdminPanel/OrderDetailsModal';




const OrderDetailsPage = ({ orders, onUpdateQuantity, onDeleteItem }) => {
    const { orderId } = useParams();
    const order = orders.find(order => order._id === orderId);

    return (
        <div className="order-details-page">
            {order && (
                <OrderDetailsModal
                    order={order}
                    onUpdateQuantity={onUpdateQuantity}
                    onDeleteItem={onDeleteItem}
                />
            )}
        </div>
    );
};

export default OrderDetailsPage;