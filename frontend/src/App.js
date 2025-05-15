// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CheckoutForm from "./compo/pages/CheckoutForm";
import Payments from "./compo/pages/Payment";
import Summary from "./compo/pages/Summary";

function App() {
  return (
    <Router>
      <div>
        <h1>Welcome to my shop</h1>
        <Routes>
          <Route path="/checkout-form" element={<CheckoutForm />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
