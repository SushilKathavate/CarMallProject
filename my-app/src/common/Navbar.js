import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const DashboardNavbar = ({ toggleSidebar }) => {
    const navigate = useNavigate()
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="dashboard-navbar">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mx-auto">
                    <Navbar.Brand href="#" onClick={()=>navigate("/")} className="brand-name" style={{ cursor: 'pointer' }}>
                        Car Mall
                    </Navbar.Brand>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default DashboardNavbar;
