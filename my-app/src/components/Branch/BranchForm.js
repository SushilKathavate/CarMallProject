import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const BranchForm = () => {
    const [branchName, setBranchName] = useState('');
    const [branchLocation, setBranchLocation] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { method, branch } = location.state || {};

    // Set form values for update if branch data is provided
    useEffect(() => {
        if (method === 'Update' && branch) {
            setBranchName(branch.name);
            setBranchLocation(branch.location);
        }
    }, [method, branch]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const branchData = { name: branchName, location: branchLocation };

        if (method === 'Create') {
            axios.post('http://localhost:7879/branches/newbranch', branchData)
                .then(() => {
                    setSuccess('Branch added successfully!');
                    setError(null);
                    setBranchName('');
                    setBranchLocation('');
                    setTimeout(() => navigate('/branches'), 2000); // Redirect after 2 seconds
                })
                .catch(() => {
                    setError('Failed to add branch. Please try again.');
                    setSuccess(null);
                });
        } else if (method === 'Update' && branch) {
            axios.put(`http://localhost:7879/branches/${branch.branchId}`, branchData)
                .then(() => {
                    setSuccess('Branch updated successfully!');
                    setError(null);
                    setTimeout(() => navigate('/branches'), 2000); // Redirect after 2 seconds
                })
                .catch(() => {
                    setError('Failed to update branch. Please try again.');
                    setSuccess(null);
                });
        }
    };

    return (
        <Container>
            <h2 className="text-center mt-4">
                {method === 'Update' ? 'Update Branch' : 'Add New Branch'}
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit} className="mt-4">
                <Form.Group controlId="formBranchName">
                    <Form.Label>Branch Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter branch name"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBranchLocation" className="mt-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter branch location"
                        value={branchLocation}
                        onChange={(e) => setBranchLocation(e.target.value)}
                        required
                    />
                </Form.Group>

                <div className="d-flex justify-content-end mt-4">
                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={() => navigate('/branch')}
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                    >
                        {method === 'Update' ? 'Update Branch' : 'Add Branch'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default BranchForm;
