import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import image1 from '../../images/image1.jpeg';
import image2 from '../../images/image2.jpeg';
import image3 from '../../images/image3.jpeg';
import marineImage from '../../images/marine.jpeg';
import civilImage from '../../images/civil.jpeg';
import computerImage from '../../images/computer.jpeg';
import electricalImage from '../../images/electrical.jpeg';
import mechanicalImage from '../../images/mechanical.jpeg';
import lmsImage from '../../images/lms.jpeg';
import misImage from '../../images/MIS.jpeg';
import squirrelMailImage from '../../images/squirrel.jpeg';
import newLmsImage from '../../images/new lms.jpeg';

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2, image3];

    const incrementImageIndex = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        const intervalId = setInterval(incrementImageIndex, 5000); 

        return () => clearInterval(intervalId); 
    }, []); 

    const departments = [
        {
            name: 'Marine',
            url: 'https://www.eng.ruh.ac.lk/dmme/academics/marine-engineering-and-naval-architecture/',
            imageUrl: marineImage,
            details: 'The Marine department focuses on naval architecture and marine engineering.'
        },
        {
            name: 'Civil',
            url: 'https://www.eng.ruh.ac.lk/dcee/',
            imageUrl: civilImage,
            details: 'The Civil department deals with infrastructure, construction, and environmental engineering.'
        },
        {
            name: 'Computer',
            url: 'https://www.eng.ruh.ac.lk/academic/undergraduate-programs/computer-engineering/',
            imageUrl: computerImage,
            details: 'The Computer department offers programs in computer engineering and information technology.'
        },
        {
            name: 'Electrical',
            url: 'https://www.eng.ruh.ac.lk/academic/undergraduate-programs/electrical-information-engineering/',
            imageUrl: electricalImage,
            details: 'The Electrical department specializes in electrical and electronic systems.'
        },
        {
            name: 'Mechanical',
            url: 'https://www.eng.ruh.ac.lk/dmme/',
            imageUrl: mechanicalImage,
            details: 'The Mechanical department focuses on mechanical engineering and related fields.'
        }
    ];

    const otherWebsites = [
        {
            name: 'LMS',
            url: 'http://lms.eng.ruh.ac.lk/',
            imageUrl: lmsImage,
            details: 'Learning Management System for students and lecturers.'
        },
        {
            name: 'MIS',
            url: 'https://paravi.ruh.ac.lk/foenmis/index.php',
            imageUrl: misImage,
            details: 'Management Information System for faculty and administration.'
        },
        {
            name: 'SquirrelMail',
            url: 'http://stm.eng.ruh.ac.lk/src/login.php',
            imageUrl: squirrelMailImage,
            details: 'Webmail interface for RUH Engineering faculty.'
        },
        {
            name: 'New LMS',
            url: 'https://elms.eng.ruh.ac.lk/',
            imageUrl: newLmsImage,
            details: 'Enhanced Learning Management System for RUH students.'
        }
    ];

    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const daysInMonth = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="home-container">
            <Navbar />

            <div className="content">
                <h1>Welcome to Result Management System</h1>
                <div className="image-carousel">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Image ${currentImageIndex + 1}`}
                        className="carousel-image"
                    />
                </div>

                <div className="faculty-details">
                    <h2>Faculty Details</h2>
                    <div className="department-list">
                        {departments.map((department, index) => (
                            <a key={index} href={department.url} className="department-box" target="_blank" rel="noopener noreferrer">
                                <img src={department.imageUrl} alt={department.name} className="department-image" />
                                <div className="department-info">
                                    <h3>{department.name}</h3>
                                    <p>{department.details}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>


                <div className="calendar">
                    <h2>Calendar - {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
                    <div className="days-grid">
                        {daysInMonth.map((day) => (
                            <div
                                key={day}
                                className={`day ${day === currentDate.getDate() ? 'current-day' : ''}`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="other-websites">
                    <h2>Other Websites</h2>
                    <div className="website-list">
                        {otherWebsites.map((website, index) => (
                            <a key={index} href={website.url} className="website-box" target="_blank" rel="noopener noreferrer">
                                <img src={website.imageUrl} alt={website.name} className="website-image" />
                                <div className="website-info">
                                    <h3>{website.name}</h3>
                                    <p>{website.details}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
