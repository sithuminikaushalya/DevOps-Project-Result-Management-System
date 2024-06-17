import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const [selectedSemester, setSelectedSemester] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [results, setResults] = useState([]);
    const [moduleHeaders, setModuleHeaders] = useState([]);

    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
    const departments = ['Marine', 'Electrical', 'Mechanical', 'Civil', 'Computer'];

    useEffect(() => {
        if (selectedSemester && selectedDepartment) {
            fetchResults();
        }
    }, [selectedSemester, selectedDepartment]);

    const fetchResults = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3001/result?department=${selectedDepartment}&semester=${selectedSemester}`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setResults(data);

                if (data.length > 0) {
                    setModuleHeaders(data[0].modules.map(module => module.name));
                }
            } else {
                console.error('Failed to fetch results');
            }
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    const handleSemesterChange = (e) => {
        setSelectedSemester(e.target.value);
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
    };

    const handleRegistrationNumberChange = (e) => {
        setRegistrationNumber(e.target.value);
    };

    const filterResultsByRegistrationNumber = () => {
        if (registrationNumber.trim() === '') {
            fetchResults();
        } else {
            const filteredResults = results.filter(result => {
                return result.registrationNumber.includes(registrationNumber);
            });
            setResults(filteredResults);
        }
    };

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                <h2>Lecturer Dashboard</h2>

                <div className="filter-box">
                    <div className="filter-section">
                        <label htmlFor="semester">Select Semester:</label>
                        <select id="semester" value={selectedSemester} onChange={handleSemesterChange}>
                            <option value="">Select Semester</option>
                            {semesters.map((semester, index) => (
                                <option key={index} value={index + 1}>{semester}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-section">
                        <label htmlFor="department">Select Department:</label>
                        <select id="department" value={selectedDepartment} onChange={handleDepartmentChange}>
                            <option value="">Select Department</option>
                            {departments.map((department, index) => (
                                <option key={index} value={department}>{department}</option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-section">
                        <label htmlFor="registrationNumber">Filter by Registration Number:</label>
                        <input
                            type="text"
                            id="registrationNumber"
                            value={registrationNumber}
                            onChange={handleRegistrationNumberChange}
                        />
                        <button onClick={filterResultsByRegistrationNumber}>Apply Filter</button>
                    </div>
                </div>

                <div className="results-table">
                    <h3>Results</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Registration Number</th>
                                <th>Name</th>
                                {moduleHeaders.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                                <th>SGPA</th>
                                <th>GPA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.registrationNumber}</td>
                                    <td>{result.name}</td>
                                    {result.modules.map((module, i) => (
                                        <td key={i}>{module.result}</td>
                                    ))}
                                    <td>{result.sgpa}</td>
                                    <td>{result.gpa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StudentDashboard;
