import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [userType, setUserType] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); 

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userType !== 'student' && userType !== 'lecturer') {
            setError('Invalid user type');
            return;
        }
    
        const data = {
            role: userType,
            username,
            password
        };

        console.log('Sending data:', data);
    
        try {
            const response = await axios.post('http://127.0.0.1:3001/auth/login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('User Login successfully:', response.data);
            setUsername('');
            setPassword('');
            setError('');

            if (userType === 'lecturer') {
                navigate('/lecturer-dashboard');
            } else {
                navigate('/student-dashboard');
            }

        } catch (error) {
            console.error('Error logging user:', error);
            if (error.response && error.response.data) {
                setError('Failed to login user. Please try again.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    
    
    return (
        <div className="login-container">
            <Navbar />
            <div className="content-login">
                <div className="login-form-box">
                    <h2>Faculty Of Engineering - Results Management System</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="userType">User Type:</label>
                        <select id="userType" name="userType" value={userType} onChange={handleUserTypeChange}>
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                        </select>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
