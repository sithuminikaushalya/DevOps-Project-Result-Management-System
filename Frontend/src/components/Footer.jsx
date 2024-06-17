import React from 'react';
import './Footer.css';
import { FaFacebook, FaInstagram, FaGoogle, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <div className="footer-section">
          <h3>Faculty of Engineering</h3>
          <p>The Faculty of Engineering of University of Ruhuna was established on 1st July 1999 at Hapugala, Galle.</p>
          <p>Admission to the Faculty of Engineering, University of Ruhuna, is subject to the University Grants Commission policy on university admissions.</p>
        </div>
        <div className="footer-section">
          <h3>INFO</h3>
          <ul>
            <li><a href="https://www.ruh.ac.lk/index.php/en/" target="_blank" rel="noopener noreferrer">University of Ruhuna</a></li>
            <li><a href="https://www.eng.ruh.ac.lk/" target="_blank" rel="noopener noreferrer">Faculty of Engineering</a></li>
            <li><a href="https://paravi.ruh.ac.lk/foenmis/index.php" target="_blank" rel="noopener noreferrer">ENG-MIS</a></li>
            <li><a href="https://www.lib.ruh.ac.lk/Eng/index.php" target="_blank" rel="noopener noreferrer">Library</a></li>
            <li><a href="https://www.iesl.lk/index.php?lang=en" target="_blank" rel="noopener noreferrer">IESL</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>CONTACT US</h3>
          <p>Faculty of Engineering, Hapugala, Galle, Sri Lanka.</p>
          <p>Phone: <a href="tel:+94912245765">+(94) 91 2245765/6</a></p>
          <p>E-mail: <a href="mailto:webmaster@eng.ruh.ac.lk">webmaster@eng.ruh.ac.lk</a></p>
        </div>
        <div className="footer-section">
          <h3>GET SOCIAL</h3>
          <div className="social-icons">
            <a href="#facebook"><FaFacebook /></a>
            <a href="#instagram"><FaInstagram /></a>
            <a href="#google"><FaGoogle /></a>
            <a href="#twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>
      <p className="footer-copyright">&copy; 2024 Result Management System</p>
    </footer>
  );
};

export default Footer;
