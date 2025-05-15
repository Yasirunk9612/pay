import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/CheckoutForm.css";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const CheckoutForm = () => {

    const navigate = useNavigate(); 
  
    const handleNextClick = () => {
      navigate("/payment"); 
    };


  return (
    <>
      <Header />
      <div className="checkout-container">
        <h2 className="checkout-title">CHECKOUT</h2>
        <div className="checkout-box">
          <div className="billing-details">
            <h3>Billing Details</h3>
            <label>First Name</label>
            <input type="text" />

            <label>Last Name</label>
            <input type="text" />

            <label>Address</label>
            <textarea></textarea>

            <label>Phone No.</label>
            <input type="text" />

            <label>Email</label>
            <input type="email" />

            <label>Note</label>
            <textarea></textarea>
          </div>

          <div className="order-details">
            <h3>Your Order</h3>
            <label>Item Name</label>
            <input type="text" />

            <label>Quantity</label>
            <input type="number" />

            <label>Pickup Type</label>
            <select>
              <option>Store Pickup</option>
              <option>Home Delivery</option>
            </select>

            <label>Sub Total</label>
            <input type="text" />

            <label>VAT</label>
            <input type="text" />

            <label>Total</label>
            <input type="text" />

            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export default CheckoutForm;
