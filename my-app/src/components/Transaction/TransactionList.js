import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Spinner } from 'react-bootstrap';
import './transactionPage.css'; // Include custom styles for enhanced look

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [carDetails, setCarDetails] = useState(null);  // State for storing car details
    const [userDetails, setUserDetails] = useState(null); // State for storing user details

    // Fetch transactions from API
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:7879/transactions/alltransactions');
                setTransactions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    // Fetch car details based on carId
    const fetchCarDetails = async (carId) => {
        try {
            const response = await axios.get(`http://localhost:7879/cars/${carId}`);
            setCarDetails(response.data);
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };

    // Fetch user details based on userId
    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:7879/users/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    // Handle opening the modal and fetching additional car and user data
    const handleRowClick = async (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);

        // Fetch car and user details based on IDs in the selected transaction
        await fetchCarDetails(transaction.order.carId);
        await fetchUserDetails(transaction.order.userId);
    };

    const handleClose = () => {
        setShowModal(false);
        setCarDetails(null);
        setUserDetails(null);
    };

    return (
        <div className="container">
            <h2 className="text-center">Transaction List</h2>
            {
                loading ? (
                    <Spinner animation="border" />
                ) : (
                    <Table striped bordered hover className="mt-4">
                        <thead className="thead-dark">
                            <tr className="text-center">
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Transaction Date</th>
                                <th>Purchase</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction) => (
                                <tr
                                    key={transaction.transactionId}
                                    className="text-center"
                                    onClick={() => handleRowClick(transaction)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>{transaction.transactionId}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.transactionDate}</td>
                                    <td>{transaction.order.purchase ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }

            {/* Modal to show transaction details */}
            {selectedTransaction && (
                <Modal
                    show={showModal}
                    onHide={handleClose}
                    centered
                    size="md" // Reduced modal size
                    animation={true} // Enables animation
                    className="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title className="modal-title-transaction">
                            Transaction Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-6">
                                <h5><strong>User Details:</strong></h5>
                                {userDetails && (
                                    <p><strong>Name:</strong> {userDetails.username}</p>
                                )}
                                <h5><strong>Transaction Details:</strong></h5>
                                <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
                                <p><strong>Date:</strong> {selectedTransaction.transactionDate}</p>
                                <p><strong>Purchase:</strong> {selectedTransaction.order.purchase ? 'Yes' : 'No'}</p>
                            </div>
                            <div className="col-md-6">
                                <h5><strong>Order Details:</strong></h5>
                                <p><strong>Start Date:</strong> {selectedTransaction.order.startDate}</p>
                                <p><strong>End Date:</strong> {selectedTransaction.order.endDate}</p>
                                <p><strong>Branch:</strong> {selectedTransaction.order.branch.name}</p>
                                <p><strong>Location:</strong> {selectedTransaction.order.branch.location}</p>
                                
                                {carDetails && (
                                    <>
                                        <h5><strong>Car Details:</strong></h5>
                                        <p><strong>Brand:</strong> {carDetails.brand}</p>
                                        <p><strong>Model:</strong> {carDetails.model}</p>
                                        <p><strong>Price/Day:</strong> {carDetails.pricePerDay}</p>
                                        <p><strong>Purchase Price:</strong> {carDetails.purchasePrice}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default TransactionPage;
