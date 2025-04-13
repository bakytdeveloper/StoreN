import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import './SalesHistory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faBan } from '@fortawesome/free-solid-svg-icons';


const SalesHistory = ({ setShowSidebar }) => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(5);
    const [totalOrders, setTotalOrders] = useState(0);
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => setShowSidebar(true);
    }, [setShowSidebar]);

    useEffect(() => {
        const fetchSalesHistory = async (page) => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/sellers/sales-history?page=${page}&perPage=${perPage}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders);
                    setTotalOrders(data.totalOrders);
                } else {
                    console.error('Error fetching sales history:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching sales history:', error);
            }
        };

        fetchSalesHistory(page);
    }, [page, perPage]);

    const formatDate = (date) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('ru-RU', options);

        // Ручное форматирование дня числом
        const parts = formattedDate.split(' ');
        if (parts.length === 3) {
            const day = parts[0];
            const month = parts[1];
            const year = parts[2];
            return `${day}/${month}/${year}`;
        } else {
            return formattedDate;
        }
    };


    const handleGoBack = () => history.goBack();

    const handleNextPage = () => {
        if ((page - 1) * perPage + orders.length < totalOrders) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const isPrevDisabled = page === 1;
    const isNextDisabled = (page - 1) * perPage + orders.length >= totalOrders;


    console.log("orders", orders)

    return (
        <div className="order">
            <h2>История продаж</h2>
            <span className="sellers-list-close" type="button" onClick={handleGoBack}>
                <span> &#10006;</span>
            </span>
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Статус</th>
                    <th>Тип товара</th>
                    <th>Название товара</th>
                    <th>Цвет товара</th>
                    <th>Размер</th>
                    <th>Кол.</th>
                    <th>Цена товара</th>
                    <th>Сумма</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    order.products.map((item, index) => (
                        <tr key={`${order._id}-${item.product ? item.product._id : index}`}>
                            {index === 0 && (
                                <>
                                    <td rowSpan={order.products.length}>{formatDate(order.date)}</td>
                                    <td rowSpan={order.products.length}>{order.status}</td>
                                </>
                            )}
                            <td>{item.type}</td>
                            <td>{item.name}</td>
                            <td>{item.color}</td>
                            <td>{item.size}</td>
                            <td style={{ textAlign: "center" }}>{item.quantity}</td>
                            <td>{item.price}</td>
                            {index === 0 && <td rowSpan={order.products.length}>{order.totalAmount}</td>}
                        </tr>
                    ))
                ))}
                </tbody>
            </table>
            <div className="sales-history-pagination">
                <button className="sales-history-pagination-prev" onClick={handlePrevPage} disabled={isPrevDisabled}>
                    {isPrevDisabled ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faArrowLeft} />}
                </button>
                <span>Страница {page}</span>
                <button className="sales-history-pagination-next" onClick={handleNextPage} disabled={isNextDisabled}>
                    {isNextDisabled ? <FontAwesomeIcon icon={faBan} /> : <FontAwesomeIcon icon={faArrowRight} />}
                </button>
            </div>
        </div>
    );
};

export default SalesHistory;

