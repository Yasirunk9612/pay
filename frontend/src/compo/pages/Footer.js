import React from "react";
import "../css/hf.css";
import image from "../assests/Black_Transparent.png"


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={image} alt="Glanzend Arcade Logo" className="footer-logo" />
      </div>

      <div className="footer-content">
        <h3>Contact Us</h3>
        <div className="contact-info">
          <p>Head Office & Show Room</p>
          <p>Belcom Tower, Gall Road, Colombo 4</p>
          <p>infoglanzend@gmail.com</p>
          <p>customerglanzend@gmail.com</p>
          <p>+94 112 4441702</p>
          <p>+94 112 4441703</p>
        </div>
      </div>

      <div className="payment-methods">
        <div className="payment-icons">
          <img src="https://i.pinimg.com/736x/62/6a/36/626a3649cec5dd8fe416ff2254b119a7.jpg" alt="Visa" />
        </div>
      </div>

      <div className="social-icons">
        <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
      </div>

      <div className="copyright">
        © 2025 Glanzend Arcade.<br />
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
