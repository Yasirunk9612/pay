import React, { useState } from "react";
import "../css/Payment.css";
import { useNavigate } from "react-router-dom";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Payment = () => {
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Format card number with dashes (XXXX-XXXX-XXXX-XXXX)
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    value = value.match(/.{1,4}/g)?.join("-") || ""; // Add dashes every 4 digits

    setCardNumber(value.slice(0, 19)); // Limit to 19 characters (16 digits + 3 dashes)
  };

  // Format expiry input as MM/YY
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    setExpiry(value);
  };

  // Validate inputs
  const validateInputs = () => {
    let errors = {};

    if (!/^[a-zA-Z\s]+$/.test(cardholderName)) {
      errors.cardholderName = "Only letters and spaces allowed";
    }

    if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber)) {
      errors.cardNumber = "Must be 16 digits (formatted as XXXX-XXXX-XXXX-XXXX)";
    }

    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiry)) {
      errors.expiry = "Format must be MM/YY";
    }

    if (!/^\d{3}$/.test(cvc)) {
      errors.cvc = "CVC must be exactly 3 digits";
    }

    if (applied && discountCode && !/^[a-zA-Z0-9-]+$/.test(discountCode)) {
      errors.discountCode = "Invalid discount format";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Apply discount code
  const handleApplyDiscount = () => {
    if (discountCode) {
      setApplied(true);
    }
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      try {
        const response = await fetch("http://localhost:8081/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardholderName,
            cardNumber,
            expiry,
            cvc,
            discountCode,
            name: "John Doe",
            phone: "1234567890",
            address: "123 Street, City",
            totalAmount: "$450.00",
          }),
        });

        if (response.ok) {
          navigate("/summary", {
            state: {
              cardholderName,
              cardNumber,
              expiry,
              cvc,
              discountCode,
              name: "John Doe",
              phone: "1234567890",
              address: "123 Street, City",
              totalAmount: "$450.00",
            },
          });
        } else {
          console.error("Payment submission failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="payment-container">
        <div className="payment-box">
          <h2>Let's Make Payment</h2>
          <p>Enter your card details to proceed with the payment.</p>

          <form className="payment-form" onSubmit={handlePayment}>
            <label>Cardholder’s Name</label>
            <input
              type="text"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
            {errors.cardholderName && <p className="error">{errors.cardholderName}</p>}

            <label>Card Number</label>
            <div className="card-input">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                alt="Card"
              />
              <input
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                maxLength="19"
              />
            </div>
            {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

            <div className="card-details">
              <div>
                <label>Expiry</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={handleExpiryChange}
                  placeholder="MM/YY"
                  maxLength="5"
                />
                {errors.expiry && <p className="error">{errors.expiry}</p>}
              </div>
              <div>
                <label>CVC</label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="XXX"
                  maxLength="3"
                />
                {errors.cvc && <p className="error">{errors.cvc}</p>}
              </div>
            </div>

            <label>Discount Code</label>
            <div className="discount-box">
              <input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                disabled={applied}
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                disabled={applied}
              >
                {applied ? "Applied" : "Apply"}
              </button>
            </div>
            {errors.discountCode && <p className="error">{errors.discountCode}</p>}

            <button className="pay-btn" type="submit">
              Pay
            </button>
          </form>
        </div>

        <div className="summary-box">
          <p>You're paying,</p>
          <h1>$450.00</h1>
          <div className="summary-item">
            <p><strong>Custom Gucci Shoes</strong></p>
            <p>$400.00</p>
          </div>
          <p className="item-details">Size: M | Color: Red</p>

          <div className="summary-item">
            <p><strong>Nivea Cream 400ml</strong></p>
            <p>$50.00</p>
          </div>
          <p className="item-details">Size: M | Color: Blue</p>

          <div className="summary-item">
            <p>Discounts & Offers</p>
            <p>$0.00</p>
          </div>

          <hr />
          <div className="summary-item">
            <p>Tax</p>
            <p>$0.00</p>
          </div>
          <div className="summary-item">
            <p><strong>Total</strong></p>
            <p><strong>$450.00</strong></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
