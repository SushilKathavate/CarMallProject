import React from 'react';
import { Nav } from 'react-bootstrap';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate=useNavigate()
    return (
        <div className="sidebar">
            <Nav defaultActiveKey="/home" className="flex-column">
                {/* <Nav.Link href="/">Home</Nav.Link> */}
                <Nav.Link onClick={()=>navigate("/branch")}>Branch List</Nav.Link>
                <Nav.Link href="/inventory">Inventory</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>
                <Nav.Link href="/transactions">Transactions</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/cars">Cars</Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
