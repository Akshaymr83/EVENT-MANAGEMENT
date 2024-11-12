import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Tables/table.css'; // Import the CSS file

const UsersTable = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user/users"); // Replace with your API endpoint
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="table-container">
            <h2>Users Details</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date of Birth</th>
                        <th>Verified</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                            <td>{user.verified ? "Yes" : "No"}</td>
                            <td>{user.isAdmin ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
