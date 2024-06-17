import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();

    const [userType, setUserType] = useState('student');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [batch, setBatch] = useState('');
    const [department, setDepartment] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [idPhoto, setIdPhoto] = useState(null);
    const [error, setError] = useState('');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value);
    };

    const handleFileChange = (e, setter) => {
        const file = e.target.files[0];
        setter(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('role', userType);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('registrationNumber', registrationNumber);
        formData.append('fullName', fullName);
        formData.append('profileImage', profileImage);
        formData.append('idPhoto', idPhoto);

        try {


            if (userType === 'student') {
                formData.append('batch', batch);
            } else if (userType === 'lecturer') {
                formData.append('department', department);
            }

            const response = await axios.post('http://127.0.0.1:3001/auth/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('User registered successfully:', response.data);
            alert('Account created successfully');
            navigate('/login');
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Failed to register user. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <Navbar />
            <div className="content-signup">
                <div className="signup-form-box">
                    <h2>Faculty Of Engineering - Results Management System</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <label htmlFor="userType">User Type:</label>
                        <select id="userType" name="userType" value={userType} onChange={handleUserTypeChange}>
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                        </select>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" value={username} onChange={(e) => handleInputChange(e, setUsername)} />
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
                        <label htmlFor="registrationNumber">Registration Number:</label>
                        <input type="text" id="registrationNumber" name="registrationNumber" value={registrationNumber} onChange={(e) => handleInputChange(e, setRegistrationNumber)} />
                        <label htmlFor="fullName">Full Name:</label>
                        <input type="text" id="fullName" name="fullName" value={fullName} onChange={(e) => handleInputChange(e, setFullName)} />
                        {userType === 'student' && (
                            <>
                                <label htmlFor="batch">Batch:</label>
                                <select id="batch" name="batch" value={batch} onChange={(e) => handleInputChange(e, setBatch)}>
                                    <option value="">Select Batch</option>
                                    <option value="21 batch">21 batch</option>
                                    <option value="22 batch">22 batch</option>
                                    <option value="23 batch">23 batch</option>
                                    <option value="24 batch">24 batch</option>
                                    <option value="Graduate">Graduate</option>
                                </select>
                            </>
                        )}
                        {userType === 'lecturer' && (
                            <>
                                <label htmlFor="department">Department:</label>
                                <select id="department" name="department" value={department} onChange={(e) => handleInputChange(e, setDepartment)}>
                                    <option value="">Select Department</option>
                                    <option value="21 batch">Electrical</option>
                                    <option value="22 batch">Computer</option>
                                    <option value="23 batch">Mechanical</option>
                                    <option value="24 batch">Civil</option>
                                    <option value="Graduate">Marine</option>
                                </select>
                            </>
                        )}
                        <label htmlFor="profileImage">Profile Image:</label>
                        <input type="file" id="profileImage" name="profileImage" onChange={(e) => handleFileChange(e, setProfileImage)} />
                        <label htmlFor="idPhoto">ID Photo:</label>
                        <input type="file" id="idPhoto" name="idPhoto" onChange={(e) => handleFileChange(e, setIdPhoto)} />
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignUp;
