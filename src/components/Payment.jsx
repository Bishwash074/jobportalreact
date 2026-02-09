// src/Payment.jsx
import React, { useState } from "react";
import { APIAuthenticateClient } from "../api";

const Payment = () => {
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productName: "",
    productId: "",
    amount: "",
    paymentGateway: "esewa",
  });

  const [status, setStatus] = useState("");
  const [pidx, setPidx] = useState(""); // Store payment transaction ID

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Initiate payment
  const initiatePayment = async () => {
    if (!form.productId || !form.amount || !form.customerName) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const res = await APIAuthenticateClient.post("/payments/initiate-payment", form);
      const paymentUrl = res.data.url;
      setPidx(res.data.pidx || form.productId);
      setStatus(res.data.status || "PENDING");

      alert("Redirecting to payment gateway...");
      window.location.href = paymentUrl; // Redirect user to Esewa
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Payment initiation failed: " + (error.response?.data?.message || error.message));
    }
  };

  // Check payment status
  const checkPaymentStatus = async () => {
    if (!form.productId || !pidx) {
      alert("Product ID or payment ID missing!");
      return;
    }

    try {
      const res = await APIAuthenticateClient.post("/payments/payment-status", {
        product_id: form.productId,
        pidx: pidx,
        status: "PENDING",
      });

      setStatus(res.data.status);
      alert(`Payment status: ${res.data.status}`);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to check payment status: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Payment Portal</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="customerEmail"
          placeholder="Customer Email"
          value={form.customerEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="customerPhone"
          placeholder="Customer Phone"
          value={form.customerPhone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="productId"
          placeholder="Product ID"
          value={form.productId}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
        />
        <select name="paymentGateway" value={form.paymentGateway} onChange={handleChange}>
          <option value="esewa">Esewa</option>
          {/* <option value="khalti">Khalti</option> */}
        </select>

        <button
          onClick={initiatePayment}
          style={{ padding: "10px", background: "green", color: "white", cursor: "pointer" }}
        >
          Pay Now
        </button>

        <button
          onClick={checkPaymentStatus}
          style={{ padding: "10px", background: "blue", color: "white", cursor: "pointer" }}
        >
          Check Payment Status
        </button>
      </div>

      {status && (
        <div style={{ marginTop: "20px" }}>
          <strong>Payment Status:</strong> {status}
        </div>
      )}
    </div>
  );
};

export default Payment;
