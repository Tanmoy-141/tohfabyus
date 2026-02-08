import { useState } from "react";
import { useOrders } from "../context/OrdersContext";

import "./orders.css";

export function Orders() {
  const { orders, cancelOrder } = useOrders();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Filter out cancelled or empty orders
  const activeOrders = orders.filter(
    (order) => order.status !== "Cancelled" && order.totalAmount > 0,
  );

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (activeOrders.length === 0) {
    return (
      <div className="empty-orders">
        <div className="empty-icon">📦</div>
        <h3>No Orders Yet</h3>
        <p>Looks like you haven't placed any orders yet.</p>
        <a href="/" className="shop-now-btn">
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2>My Orders</h2>
        <p className="orders-count">
          {activeOrders.length} {activeOrders.length === 1 ? "Order" : "Orders"}
        </p>
      </div>

      <div className="orders-list">
        {activeOrders.map((order) => {
          const SHIPPING_CHARGE = 50;
          const subtotal = order.totalAmount - SHIPPING_CHARGE;

          return (
            <div key={order.id} className="order-card">
              {/* Order Header */}
              <div className="order-card-header">
                <div className="order-info-row">
                  <div className="order-info-group">
                    <span className="label">Order ID</span>
                    <span className="value">#{order.id.slice(0, 12)}</span>
                  </div>
                  <div className="order-info-group">
                    <span className="label">Placed On</span>
                    <span className="value">{order.createdAt}</span>
                  </div>
                  <div className="order-info-group">
                    <span className="label">Total</span>
                    <span className="value total-amount">
                      ₹{order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="order-status-row">
                  <span
                    className={`order-status ${order.status.toLowerCase()}`}>
                    {order.status === "Processing" && "🔄"}
                    {order.status === "Shipped" && "🚚"}
                    {order.status === "Delivered" && "✓"}
                    {order.status === "Cancelled" && "✕"} {order.status}
                  </span>
                  <button
                    className="toggle-details-btn"
                    onClick={() => toggleOrderDetails(order.id)}>
                    {expandedOrder === order.id
                      ? "Hide Details ▲"
                      : "View Details ▼"}
                  </button>
                </div>
              </div>

              {/* Order Items - Expandable */}
              {expandedOrder === order.id && (
                <div className="order-card-body">
                  <div className="order-items-section">
                    <h4>Order Items ({order.items.length})</h4>
                    <ul className="order-items">
                      {order.items.map((item) => (
                        <li key={item.id} className="order-item">
                          <div className="item-image-wrapper">
                            <img
                              src={item.imgUrl}
                              alt={item.name}
                              className="item-image"
                            />
                          </div>
                          <div className="item-details">
                            <h5 className="item-name">{item.name}</h5>
                            <div className="item-meta">
                              <span className="item-price">
                                ₹{item.price.toFixed(2)}
                              </span>
                              <span className="item-separator">•</span>
                              <span className="item-quantity">
                                Qty: {item.quantity}
                              </span>
                            </div>
                            <div className="item-subtotal">
                              Subtotal: ₹
                              {(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Order Summary */}
                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span className="shipping-charge">
                        ₹{SHIPPING_CHARGE.toFixed(2)}
                      </span>
                    </div>
                    <div className="summary-row total-row">
                      <span>Total:</span>
                      <span>₹{order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="order-actions">
                    {order.status === "Processing" && (
                      <button
                        className="cancel-order-btn"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to cancel this order?",
                            )
                          ) {
                            cancelOrder(order.id);
                          }
                        }}>
                        Cancel Order
                      </button>
                    )}
                    {order.status === "Shipped" && (
                      <button className="track-order-btn">Track Order</button>
                    )}
                    {order.status === "Delivered" && (
                      <button className="reorder-btn">Order Again</button>
                    )}
                    <button className="help-btn">Need Help?</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
