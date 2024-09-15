// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const UserList = () => {
//     const [users, setUsers] = useState([]);
//     const [roles, setRoles] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [showDeletePopup, setShowDeletePopup] = useState(false);
//     const [currentUser, setCurrentUser] = useState(null);
//     const [formData, setFormData] = useState({ username: '', password: '', roleId: '', active: true });
//     const [deleteUserId, setDeleteUserId] = useState(null);

//     useEffect(() => {
//         fetchUsers();
//         fetchRoles();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await fetch('http://localhost:7879/users/allusers');
//             const data = await response.json();
//             setUsers(data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const fetchRoles = async () => {
//         try {
//             const response = await fetch('http://localhost:7879/roles/allroles');
//             const data = await response.json();
//             setRoles(data);
//         } catch (error) {
//             console.error('Error fetching roles:', error);
//         }
//     };

//     const handleShowModal = (user = null) => {
//         setCurrentUser(user);
//         setFormData(user ? { 
//             username: user.username, 
//             password: user.password, 
//             roleId: user.roles.length > 0 ? user.roles[0].roleId : '', 
//             active: user.active 
//         } : { 
//             username: '', 
//             password: '', 
//             roleId: '', 
//             active: true 
//         });
//         setShowModal(true);
//     };

//     const handleCloseModal = () => setShowModal(false);

//     const handleShowDeletePopup = (userId) => {
//         setDeleteUserId(userId);
//         setShowDeletePopup(true);
//     };

//     const handleCloseDeletePopup = () => setShowDeletePopup(false);

//     const handleFormChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Add or update user logic here
//         handleCloseModal();
//     };

//     const handleDeleteConfirm = async () => {
//         try {
//             await fetch(`http://localhost:7879/users/${deleteUserId}`, { method: 'DELETE' });
//             setUsers(users.filter(user => user.userId !== deleteUserId));
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//         setShowDeletePopup(false);
//     };

//     return (
//         <div className="container">
//             <div className="d-flex justify-content-between">
//                 <h1 className="text-center flex-grow-1">User List</h1>
//                 <Button variant="primary" size="sm" onClick={() => handleShowModal()}>Add New User</Button>
//             </div>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Username</th>
//                         <th>Roles</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user.userId}>
//                             <td>{user.username}</td>
//                             <td>{user.roles.map(role => role.roleName).join(', ')}</td>
//                             <td>{user.active ? 'Active' : 'Inactive'}</td>
//                             <td>
//                                 <Button variant="warning" size="sm" onClick={() => handleShowModal(user)}>Update</Button>
//                                 <Button variant="danger" size="sm" onClick={() => handleShowDeletePopup(user.userId)}>Delete</Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* User Modal */}
//             <Modal show={showModal} onHide={handleCloseModal}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{currentUser ? 'Update User' : 'Add New User'}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formUsername">
//                             <Form.Label>Username</Form.Label>
//                             <Form.Control type="text" name="username" value={formData.username} onChange={handleFormChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formPassword">
//                             <Form.Label>Password</Form.Label>
//                             <Form.Control type="password" name="password" value={formData.password} onChange={handleFormChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formActive">
//                             <Form.Check type="checkbox" name="active" checked={formData.active} label="Active" onChange={handleFormChange} />
//                         </Form.Group>
//                         <Form.Group controlId="formRole">
//                             <Form.Label>Role</Form.Label>
//                             <Form.Control as="select" name="roleId" value={formData.roleId} onChange={handleFormChange} required>
//                                 <option value="">Select Role</option>
//                                 {roles.map(role => (
//                                     <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
//                                 ))}
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit">{currentUser ? 'Update' : 'Add'}</Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>

//             {/* Delete Confirmation Popup */}
//             <Modal show={showDeletePopup} onHide={handleCloseDeletePopup}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Delete</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleCloseDeletePopup}>Cancel</Button>
//                     <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [formData, setFormData] = useState({ username: '', password: '', roleId: '', active: true });
    const [deleteUserId, setDeleteUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:7879/users/allusers');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch('http://localhost:7879/roles/allroles');
            const data = await response.json();
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleShowModal = (user = null) => {
        setCurrentUser(user);
        setFormData(user ? { 
            username: user.username, 
            password: user.password, 
            roleId: user.roleId || '', // Adjusted to handle single role
            active: user.active 
        } : { 
            username: '', 
            password: '', 
            roleId: '', 
            active: true 
        });
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    const handleShowDeletePopup = (userId) => {
        setDeleteUserId(userId);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = currentUser ? `http://localhost:7879/users/${currentUser.userId}` : 'http://localhost:7879/users';
        const method = currentUser ? 'PUT' : 'POST';
        const body = JSON.stringify({
            username: formData.username,
            password: formData.password,
            roleId: formData.roleId,
            active: formData.active
        });

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: body
            });
            if (response.ok) {
                fetchUsers(); // Refresh the user list
                handleCloseModal();
            } else {
                console.error('Failed to save user');
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await fetch(`http://localhost:7879/users/${deleteUserId}`, { method: 'DELETE' });
            setUsers(users.filter(user => user.userId !== deleteUserId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        setShowDeletePopup(false);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h1 className="text-center flex-grow-1">User List</h1>
                <Button variant="primary" size="sm" onClick={() => handleShowModal()}>Add New User</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userId}>
                            <td>{user.username}</td>
                            <td>{user.role ? user.role.roleName : 'None'}</td>
                            <td>{user.active ? 'Active' : 'Inactive'}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShowModal(user)}>Update</Button>
                                <Button variant="danger" size="sm" onClick={() => handleShowDeletePopup(user.userId)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* User Modal */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentUser ? 'Update User' : 'Add New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" value={formData.username} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={formData.password} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group controlId="formActive">
                            <Form.Check type="checkbox" name="active" checked={formData.active} label="Active" onChange={handleFormChange} />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" name="roleId" value={formData.roleId} onChange={handleFormChange} required>
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">{currentUser ? 'Update' : 'Add'}</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Popup */}
            <Modal show={showDeletePopup} onHide={handleCloseDeletePopup}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeletePopup}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;
