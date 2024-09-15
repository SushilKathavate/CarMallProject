import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentCar, setCurrentCar] = useState(null);
    const [formData, setFormData] = useState({
        model: '',
        brand: '',
        pricePerDay: '',
        purchasePrice: '',
        available: true
    });
    const [deleteCarId, setDeleteCarId] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch('http://localhost:7879/cars/allcars');
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    const handleShowAddModal = () => {
        setShowAddModal(true);
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setFormData({
            model: '',
            brand: '',
            pricePerDay: '',
            purchasePrice: '',
            available: true
        });
    };

    const handleShowEditModal = (car) => {
        setCurrentCar(car);
        setFormData({
            model: car.model,
            brand: car.brand,
            pricePerDay: car.pricePerDay,
            purchasePrice: car.purchasePrice,
            available: car.available
        });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setCurrentCar(null);
    };

    const handleShowDeletePopup = (carId) => {
        setDeleteCarId(carId);
        setShowDeletePopup(true);
    };

    const handleCloseDeletePopup = () => setShowDeletePopup(false);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAddCar = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:7879/cars/newcar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            fetchCars();
            handleCloseAddModal();
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleUpdateCar = async (e) => {
        e.preventDefault();
        try {
            await fetch(`http://localhost:7879/cars/${currentCar.carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            fetchCars();
            handleCloseEditModal();
        } catch (error) {
            console.error('Error updating car:', error);
        }
    };

    const handleDeleteCar = async () => {
        try {
            await fetch(`http://localhost:7879/cars/${deleteCarId}`, {
                method: 'DELETE'
            });
            setCars(cars.filter(car => car.carId !== deleteCarId));
        } catch (error) {
            console.error('Error deleting car:', error);
        }
        setShowDeletePopup(false);
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h1 className="text-center flex-grow-1">Car List</h1>
                <Button variant="primary" size="sm" onClick={handleShowAddModal}>Add New Car</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Model</th>
                        <th>Brand</th>
                        <th>Price Per Day</th>
                        <th>Purchase Price</th>
                        <th>Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.carId}>
                            <td>{car.model}</td>
                            <td>{car.brand}</td>
                            <td>${car.pricePerDay}</td>
                            <td>${car.purchasePrice}</td>
                            <td>{car.available ? 'Yes' : 'No'}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShowEditModal(car)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleShowDeletePopup(car.carId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add Car Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddCar}>
                        <Form.Group controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" value={formData.model} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name="brand" value={formData.brand} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPricePerDay">
                            <Form.Label>Price Per Day</Form.Label>
                            <Form.Control type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPurchasePrice">
                            <Form.Label>Purchase Price</Form.Label>
                            <Form.Control type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formAvailable">
                            <Form.Check type="checkbox" name="available" checked={formData.available} label="Available" onChange={handleFormChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Add Car</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Edit Car Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleUpdateCar}>
                        <Form.Group controlId="formModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" name="model" value={formData.model} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formBrand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" name="brand" value={formData.brand} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPricePerDay">
                            <Form.Label>Price Per Day</Form.Label>
                            <Form.Control type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPurchasePrice">
                            <Form.Label>Purchase Price</Form.Label>
                            <Form.Control type="number" name="purchasePrice" value={formData.purchasePrice} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formAvailable">
                            <Form.Check type="checkbox" name="available" checked={formData.available} label="Available" onChange={handleFormChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Update Car</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Popup */}
            <Modal show={showDeletePopup} onHide={handleCloseDeletePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this car?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeletePopup}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteCar}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CarList;
