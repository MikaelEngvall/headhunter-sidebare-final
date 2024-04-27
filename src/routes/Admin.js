import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const url = "http://localhost:8080/api/v1/users/findAll";

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("headhunter-token")}`,
                        "Content-Type": "application/json",
                    },
                });
                setUsers(response.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (email) => {
        if (window.confirm(`Are you sure you want to delete user with email: ${email}?`)) {
            try {
                const response = await axios.delete(`http://localhost:8080/api/v1/users/delete/${email}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("headhunter-token")}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }

                setUsers(users.filter((user) => user.email !== email)); // Update state directly
                console.log('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <div className='admin'>
            <div className='admin-card'>
                <h1>Admin</h1>
                {isLoading ? (
                    <p>Loading users...</p>
                ) : error ? (
                    <p>Error fetching users: {error.message}</p>
                ) : users.length > 0 ? (
                    <div className='user-list'>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user?.id}>
                                        <td>{user?.id}</td>
                                        <td>{user?.username}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            <button className='edit-button'>Edit</button> {/* Replace with custom edit functionality */}
                                            <button className='delete-button' onClick={() => handleDelete(user.email)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No users found.</p>
                )}
            </div>
        </div>
    );
}

export default Admin;
