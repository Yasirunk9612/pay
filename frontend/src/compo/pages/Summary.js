import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/summary.css";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location || {};

  const [name, setName] = useState(state?.name || "");
  const [email] = useState(state?.email || "");
  const [phone, setPhone] = useState(state?.phone || "");
  const [address, setAddress] = useState(state?.address || "");
  
  // Payment details state
  const [cardholderName, setCardholderName] = useState(state?.cardholderName || "");
  const [cardNumber, setCardNumber] = useState(state?.cardNumber || "");
  const [expiry, setExpiry] = useState(state?.expiry || "");

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleEdit = () => setIsEditing(!isEditing);
  const togglePaymentEdit = () => setIsEditingPayment(!isEditingPayment);

  const handleConfirm = async () => {
    setShowPopup(true);
    setIsEditing(false);
    setIsEditingPayment(false);

    // Save updated details to the backend
    try {
      const response = await fetch("/api/payment", {
        method: "PUT", // Update payment details
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          cardholderName,
          cardNumber,
          expiry,
        }),
      });

      if (!response.ok) throw new Error("Failed to update payment details");

      console.log("Payment details updated successfully");
    } catch (error) {
      console.error(error.message);
    }

    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <>
      <Header />
      <div className="summary-container">
        <h2>Order Summary</h2>

        <div className="summary-content">
          {/* Customer Details */}
          <div className="customer-section">
            <div className="edit-section">
              <h3>Customer Details</h3>
              <button className="edit-btn" onClick={toggleEdit}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />

            <label>Email</label>
            <input type="email" value={email} disabled className="readonly-input" />

            <label>Phone</label>
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />

            <label>Address</label>
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} disabled={!isEditing} />
          </div>

          {/* Payment Details */}
          <div className="payment-section">
            <div className="edit-section">
              <h3>Payment Details</h3>
              <button className="edit-btn" onClick={togglePaymentEdit}>
                {isEditingPayment ? "Save" : "Edit"}
              </button>
            </div>

            <label>Cardholder</label>
            <input type="text" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} disabled={!isEditingPayment} />

            <label>Card Number</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} disabled={!isEditingPayment} />

            <label>Expiry</label>
            <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} disabled={!isEditingPayment} />

            <h3>Total Amount</h3>
            <p className="total-amount">{state?.totalAmount}</p>
          </div>
        </div>

        <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              <h3>✅ Order Confirmed!</h3>
              <p>Your order has been successfully updated.</p>
              <button className="popup-btn" onClick={() => navigate("/payment")}>OK</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Summary;
