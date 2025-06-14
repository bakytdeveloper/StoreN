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
    const statusTranslations = {
        pending: "В ожидании",
        inProgress: "В процессе",
        completed: "Завершено",
        cancelled: "Отменено"
    };

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

    // const formatDate = (date) => {
    //     const options = { day: '2-digit', month: 'long', year: 'numeric' };
    //     const formattedDate = new Date(date).toLocaleDateString('ru-RU', options);
    //
    //     // Ручное форматирование дня числом
    //     const parts = formattedDate.split(' ');
    //     if (parts.length === 3) {
    //         const day = parts[0];
    //         const month = parts[1];
    //         const year = parts[2];
    //         return `${day}/${month}/${year}`;
    //     } else {
    //         return formattedDate;
    //     }
    // };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);

        // Форматирование даты
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        // Форматирование времени
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}.${month}.${year} / ${hours}:${minutes}`;
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


    return (
        <div className="order">
            <h2>История продаж</h2>
            <span className="sellers-list-close" type="button" onClick={handleGoBack}>
                <span> &#10006;</span>
            </span>
            <table>
                <thead>
                <tr>
                    <th>№</th>
                    {/*<th>Дата</th>*/}
                    <th>Дата/Время</th> {/* Новая колонка */}
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
                {orders.map((order, i) => (
                    order.products.map((item, index) => (
                        <tr key={`${order._id}-${item._id || `${item.name}-${item.color}-${item.size}-${index}`}`}>
                            <td>{i+1}</td>
                            {index === 0 && (
                                <>
                                    {/*<td rowSpan={order.products.length}>{formatDate(order.date)}</td>*/}
                                    <td rowSpan={order.products.length}>{formatDateTime(order.date)}</td> {/* Новая ячейка */}
                                    <td rowSpan={order.products.length}>{statusTranslations[order.status] || order.status}</td>
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

