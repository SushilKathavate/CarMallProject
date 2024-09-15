import React from 'react';
import DashboardNavbar from './Navbar';
import Sidebar from './Sidebar';
import './Dashboard.css';
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home';
import BranchList from '../components/Branch/BranchList';
import BranchForm from '../components/Branch/BranchForm';
import InventoryPage from '../components/Inventory/Inventory';
import OrderPage from '../components/Order/OrderList';
import TransactionPage from '../components/Transaction/TransactionList';
import UserList from '../components/User/UserList';
import CarList from '../components/Car/CarList';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <DashboardNavbar />
            <div className="dashboard-content">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/branch" element={<BranchList />} />
                        <Route path="/branchForm" element={<BranchForm />} />
                        <Route path="/inventory" element={<InventoryPage />} />
                        <Route path="/orders" element={<OrderPage />} />
                        <Route path="/transactions" element={<TransactionPage />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/cars" element={<CarList />} />
                        <Route path="/" element={<Home />} /> {/* Default route */}
                    </Routes>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
