import React, { useState, useEffect } from 'react';
import {useHistory} from "react-router-dom";
import './SellerListPage.css';
import SellerItem from "./SellerItem";
import ConfirmationModal from "./ConfirmationModal";

const SellerListPage = ({ setShowSidebar }) => {
    const [sellers, setSellers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSeller, setSelectedSeller] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5505';
    const history = useHistory();

    useEffect(() => {
        setShowSidebar(true);
        return () => {
            setShowSidebar(true);
        };
    }, [setShowSidebar]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (!token || role !== 'admin') {
            history.push('/');
            return;
        }

        const fetchSellersFromDatabase = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/sellers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch sellers');
                }
                const data = await response.json();
                setSellers(data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            }
        };

        fetchSellersFromDatabase();
        // eslint-disable-next-line
    }, [history]);

    const handleClose = () => {
        history.goBack();
    };

    const updateStatusSeller = async (sellerId, newStatus) => {
        try {
            const response = await fetch(`${apiUrl}/api/sellers/update-status/${sellerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                const updatedSellers = sellers.map((seller) => {
                    if (seller._id === sellerId) {
                        return { ...seller, status: newStatus, statusHistory: [...seller.statusHistory, { status: newStatus, time: Date.now() }] };
                    }
                    return seller;
                });

                setSellers(updatedSellers);
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDeleteClick = (seller) => {
        setSelectedSeller(seller);
        setShowModal(true);
    };

    const handleDeleteSeller = async (sellerId) => {
        try {
            const response = await fetch(`${apiUrl}/api/sellers/${sellerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setSellers(sellers.filter(seller => seller._id !== sellerId));
                setShowModal(false);
                setSelectedSeller(null);
            } else {
                console.error('Error deleting seller:', await response.text());
            }
        } catch (error) {
            console.error('Error deleting seller:', error);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedSeller(null);
    };

    return (
        <div className="sellersListPage">
          <div className="sellers-list-page-table">
              <h2 className="sellerTitle">Список продавцов</h2>
              <div className="sellersListClose" type="button" onClick={handleClose}>
                  <span> &#10006;</span>
              </div>
              <table>
                  <thead>
                  <tr>
                      <th>№</th>
                      <th>Название компании</th>
                      <th>Имя Фам.</th>
                      <th>Email</th>
                      <th>Телефон</th>
                      <th style={{ padding: '0 25px', width:"177px" }}>Направление компания</th>
                      <th>Время</th>
                      <th>Статус</th>
                      <th>Время изменения статуса</th>
                      <th>Действия</th>
                      <th>Товары продавца</th>
                  </tr>
                  </thead>
                  <tbody>
                  {sellers.slice().reverse().map((seller, index) => (
                      <tr key={seller._id}>
                          <td style={{fontWeight:"bold"}}>{index + 1}</td>
                          <td>{seller.companyName}</td>
                          <td>{seller.name}</td>
                          <td>{seller.email}</td>
                          <td>{seller.phoneNumber}</td>
                          <td>
                            <textarea className="seller-list-page-textarea"
                                      value={seller.companyDescription}
                                      readOnly
                            />
                          </td>
                          <td>{new Date(seller.createdAt).toLocaleString()}</td>
                          <SellerItem key={seller._id} seller={seller} onUpdateStatus={updateStatusSeller} />
                          <td>
                              {seller.statusHistory && seller.statusHistory.length > 0
                                  ? new Date(seller.statusHistory[seller.statusHistory.length - 1].time).toLocaleString()
                                  : '-'}
                          </td>
                          <td>
                              <button className="delete-button" onClick={() => handleDeleteClick(seller)}>Удалить</button>
                          </td>
                          <td  className="checkmark-button"  style={{ background: seller.isProductsVisible ? '#08a911' : '#ee579e'}}>
                              {seller.isProductsVisible ? (
                                  <>
                                      <span role="img" aria-label="checkmark" style={{ fontSize: '20px' }}>✔️</span>
                                      {` ${new Date(seller.lastVisibilityChange).toLocaleString()}`}
                                  </>
                              ) : (
                                  <>
                                      <span role="img" aria-label="exclamation" style={{ fontSize: '20px' }}>❗</span>
                                      {` ${new Date(seller.lastVisibilityChange).toLocaleString()}`}
                                  </>
                              )}
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              {selectedSeller && (
                  <ConfirmationModal
                      show={showModal}
                      onClose={handleModalClose}
                      onConfirm={handleDeleteSeller}
                      seller={selectedSeller}
                  />
              )}
          </div>
        </div>
    );
};

export default SellerListPage;
