import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem("orders");
        setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    }, []);

    const handleDeleteOrder = (orderId) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if (!confirmed) return;

        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    return (
        <div className="order-history-container">
            <h2>📦 Your Orders</h2>

            {orders.length === 0 ? (
                <p>No past orders found.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <h3>🛒 Order #{order.orderNumber}</h3>
                            <p>📅 {order.date}</p>

                            <ul>
                                {order.items.map((item, i) => (
                                    <li key={i}>
                                        {item.name} - 💲{item.price.toFixed(2)} × {item.quantity}
                                    </li>
                                ))}
                            </ul>

                            <p>💵 ${order.total}</p>

                            <button onClick={() => handleDeleteOrder(order.id)}>
                                ❌ Delete
                            </button>

                            <hr />
                        </li>
                    ))}
                </ul>
            )}

            <button onClick={() => navigate("/")}>🔙 Back to Shop</button>
        </div>
    );
}

export default OrderHistory;