import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';
import "./inventoryPage.css"; // Custom CSS for styling

const InventoryPage = () => {
    const [inventory, setInventory] = useState([]);
    const [cars, setCars] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch inventory data
                const inventoryResponse = await axios.get("http://localhost:7879/inventories/allinventory");
                setInventory(inventoryResponse.data);

                // Extract carIds and branchIds
                const carIds = [...new Set(inventoryResponse.data.map(item => item.carId))];
                const branchIds = [...new Set(inventoryResponse.data.map(item => item.branchId))];

                // Fetch car and branch details using their IDs
                const carRequests = carIds.map(id => axios.get(`http://localhost:7879/cars/${id}`));
                const branchRequests = branchIds.map(branchId => axios.get(`http://localhost:7879/branches/${branchId}`));

                // Wait for all car and branch requests to complete
                const carResponses = await Promise.all(carRequests);
                const branchResponses = await Promise.all(branchRequests);

                // Set car and branch details from the responses
                setCars(carResponses.map(response => response.data));
                setBranches(branchResponses.map(response => response.data));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
                alert("Error fetching inventory data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    // Find car details by ID
    const findCarById = (carId) => {
        const car = cars.find(car => car.carId === carId); // Update the key according to your API
        return car ? car : { name: 'Unknown' };
    };

    // Find branch details by ID
    const findBranchById = (branchId) => {
        const branch = branches.find(branch => branch.branchId === branchId); // Update the key according to your API
        return branch ? branch : { name: 'Unknown' };
    };

    return (
        <div className="container">
            <h2 className="text-center">Inventory</h2>
            {
                loading ? <Spinner animation="border" /> : (
                    <Table striped bordered hover className="mt-4">
                        <thead className="thead-dark">
                            <tr className='text-center'>

                                <th>Car Brand Name</th>
                                <th>Car Model Name</th>
                                <th>Branch Name</th>
                                <th>Branch Location</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.map((item) => (
                                <tr key={item.inventoryId} className='text-center'>
                                    <td>{findCarById(item.carId).brand}</td> 
                                    <td>{findCarById(item.carId).model}</td> {/* Updated car name */}
                                    <td>{findBranchById(item.branchId).name}</td> {/* Updated branch name */}
                                    <td>{findBranchById(item.branchId).location}</td> {/* Updated branch name */}
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </div>
    );
};

export default InventoryPage;
