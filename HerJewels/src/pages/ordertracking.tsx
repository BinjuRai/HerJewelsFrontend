import React, { useState, useEffect } from "react";
import "./ordertracking.css";

interface Order {
  orderId: number;
  productName: string;
  price: number;
  quantity: number;
  total: number;
  orderDate: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch("http://localhost:8080/order/history");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch order history");
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  return (
      <div className="order-tracking-container">
        <h2>Order History</h2>
        <table className="order-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>

          </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.productName}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.total}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default OrderHistory;
