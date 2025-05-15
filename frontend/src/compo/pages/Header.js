import React from "react";
import "../css/hf.css";
import image from "../assests/Black_Transparent.png"

const Header = () => {
  return (
    <header className="header">
      <img src={image} alt="Glanzend Arcade Logo" className="logo" />
      
      <nav className="nav-menu">
        <a href="https://github.com/Yasirunk9612">HOME</a>
        <a href="https://github.com/Yasirunk9612">ABOUT US</a>
        <a href="https://github.com/Yasirunk9612">OUR COLLECTION</a>
        <a href="https://github.com/Yasirunk9612">CONTACT US</a>
      </nav>
      
      <div className="user-controls">
        <div className="user-icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="cart-icon">
          <i className="fas fa-shopping-cart"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
