import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
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

                if (response.status !== 200) {
                    throw new Error('Failed to delete user');
                }

                setUsers(users.filter((user) => user.email !== email)); // Update state directly
                console.log('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleEdit = (index) => {
        setEditedUser(users[index]);
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setEditedUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
    };

    const handleSave = async () => {
        console.log("Edited user : ", editedUser.email);
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/users/update/${editedUser.email}`, editedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("headhunter-token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status !== 200) {
                throw new Error('Failed to update user');
            }

            // Update the user in the list
            const updatedUsers = users.map(user => {
                if (user.email === editedUser.email) {
                    return editedUser;
                }
                return user;
            });

            setUsers(updatedUsers);
            setEditedUser(null); // Clear edited user state
            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Roles</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user?.id}>
                                        <td>
                                            {editedUser && editedUser.email === user.email ? (
                                                <input
                                                    type="text"
                                                    value={editedUser.username}
                                                    onChange={(e) => handleInputChange(e, 'username')}
                                                />
                                            ) : user.username}
                                        </td>
                                        <td>
                                            {editedUser && editedUser.email === user.email ? (
                                                <input
                                                    type="email"
                                                    value={editedUser.email}
                                                    onChange={(e) => handleInputChange(e, 'email')}
                                                />
                                            ) : user.email}
                                        </td>
                                        <td>
                                            {editedUser && editedUser.email === user.email ? (
                                                <input
                                                    type="text"
                                                    value={editedUser.roles}
                                                    onChange={(e) => handleInputChange(e, 'roles')}
                                                />
                                            ) : user.roles}
                                        </td>
                                        <td>
                                            {editedUser && editedUser.email === user.email ? (
                                                <button className='save-button' onClick={handleSave}>Save</button>
                                            ) : (
                                                <button className='edit-button' onClick={() => handleEdit(index)}>Edit</button>
                                            )}
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
