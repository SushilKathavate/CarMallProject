import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Spinner, Alert, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './BranchList.css';

const BranchList = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:7879/branches/Allbranches')
            .then(response => {
                setBranches(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch branches.');
                setLoading(false);
            });
    }, []);

    const handleBackClick = () => {
        navigate("/"); // Navigate back to the previous page
    };

    const handleCreateNewBranch = () => {
        navigate('/branchForm', {
            state: {
                method: 'Create'
            }
        });
    };

    const handleUpdateClick = (branch) => {
        navigate('/branchForm', {
            state: {
                method: 'Update',
                branch: branch
            }
        });
    };

    const handleDeleteClick = (branch) => {
        setSelectedBranch(branch);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        if (selectedBranch) {
            axios.delete(`http://localhost:7879/branches/${selectedBranch.branchId}`)
                .then(() => {
                    setBranches(branches.filter(branch => branch.branchId !== selectedBranch.branchId));
                    setShowConfirm(false);
                    setSelectedBranch(null);
                })
                .catch(() => {
                    setError('Failed to delete branch.');
                });
        }
    };

    const handleCancel = () => {
        setShowConfirm(false);
        setSelectedBranch(null);
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-1">
                <h2>Branches List</h2>
                <div>
                    <Button
                        variant="outline-secondary"
                        className="me-2"
                        onClick={handleBackClick}
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleCreateNewBranch}
                    >
                        Create New Branch
                    </Button>
                </div>
            </div>
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {branches?.map((branch, index) => (
                        <tr key={index}>
                            <td>{branch?.name}</td>
                            <td>{branch?.location}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleUpdateClick(branch)}
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteClick(branch)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showConfirm} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this branch?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BranchList;
