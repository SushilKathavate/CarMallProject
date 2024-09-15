import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner, Button, Modal, Form } from 'react-bootstrap';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        userId: '',
        carId: '',
        startDate: '',
        endDate: '',
        branchId: '',
        purchase: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all orders
                const ordersResponse = await axios.get('http://localhost:7879/orders/allorders');
                const ordersData = ordersResponse.data;
                setOrders(ordersData);

                // Extract userIds and carIds
                const userIds = [...new Set(ordersData.map(order => order.userId))];
                const carIds = [...new Set(ordersData.map(order => order.carId))];

                // Fetch user and car details based on IDs
                const userRequests = userIds.map(userId => axios.get(`http://localhost:7879/users/${userId}`));
                const carRequests = carIds.map(carId => axios.get(`http://localhost:7879/cars/${carId}`));

                const [userResponses, carResponses] = await Promise.all([
                    Promise.all(userRequests),
                    Promise.all(carRequests)
                ]);

                setUsers(userResponses.map(response => response.data));
                setCars(carResponses.map(response => response.data));

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
                alert("Error fetching orders data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    const fetchBranches = async () => {
        try {
            const response = await axios.get('http://localhost:7879/branches/allbranches');
            setBranches(response.data);
        } catch (error) {
            console.error("Error fetching branches", error);
            alert("Error fetching branches data. Please try again later.");
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setFormData({
            userId: '',
            carId: '',
            startDate: '',
            endDate: '',
            branchId: '',
            purchase: false
        });
    };

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            ...formData,
            userId: parseInt(formData.userId, 10),
            carId: parseInt(formData.carId, 10),
            branchId: parseInt(formData.branchId, 10)
        };
        try {
            await axios.post('http://localhost:7879/orders/neworder', orderData);
            setOrders([...orders, orderData]); // Optionally update state here
            handleCloseAddModal();
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Error adding order. Please try again later.');
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="text-center flex-grow-1">Orders</h2>
                <Button variant="primary" onClick={handleShowAddModal}>New Order</Button>
            </div>
            {loading ? (
                <Spinner animation="border" />
            ) : (
                <Table striped bordered hover className="mt-4">
                    <thead className="thead-dark">
                        <tr className="text-center">
                            <th>User Name</th>
                            <th>Car Brand</th>
                            <th>Purchase</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const user = users.find(user => user.userId === order.userId) || {};
                            const car = cars.find(car => car.carId === order.carId) || {};
                            return (
                                <tr key={order.orderId} className="text-center">
                                    <td>{user.username || 'Unknown'}</td>
                                    <td>{car.brand || 'Unknown'}</td>
                                    <td>{order.purchase ? 'Yes' : 'No'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            )}

            {/* Add Order Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddOrder}>
                        <Form.Group controlId="formUserId">
                            <Form.Label>User</Form.Label>
                            <Form.Control as="select" name="userId" value={formData.userId} onChange={handleFormChange} required>
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.userId} value={user.userId}>
                                        {user.username}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formCarId">
                            <Form.Label>Car</Form.Label>
                            <Form.Control as="select" name="carId" value={formData.carId} onChange={handleFormChange} required>
                                <option value="">Select Car</option>
                                {cars.map(car => (
                                    <option key={car.carId} value={car.carId}>
                                        {car.brand} {car.model}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBranchId">
                            <Form.Label>Branch</Form.Label>
                            <Form.Control as="select" name="branchId" value={formData.branchId} onChange={handleFormChange} required>
                                <option value="">Select Branch</option>
                                {branches.map(branch => (
                                    <option key={branch.branchId} value={branch.branchId}>
                                        {branch.name} {/* Adjust according to actual branch data structure */}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" name="startDate" value={formData.startDate} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" name="endDate" value={formData.endDate} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPurchase">
                            <Form.Check type="checkbox" name="purchase" checked={formData.purchase} label="Purchase" onChange={handleFormChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Order</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default OrderPage;


