import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import api from '../api';
import Spinner from '../components/Spinner';

const statusIcon = {
  Processing: <FiClock />,
  Shipped: <FiTruck />,
  Delivered: <FiCheckCircle />,
  Cancelled: <FiXCircle />,
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-state">
          <FiPackage className="empty-icon" />
          <h3>No orders yet</h3>
          <p>Start shopping to see your orders here!</p>
          <Link to="/" className="btn btn-primary">Shop Now</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div>
                  <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                  <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <span className={`order-status ${order.status.toLowerCase()}`}>
                  {statusIcon[order.status]} {order.status}
                </span>
              </div>
              <div className="order-card-items">
                {order.orderItems.map((item) => (
                  <div key={item._id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <p>{item.name}</p>
                      <span>{item.qty} x ${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-card-footer">
                <span className="order-total">Total: <strong>${order.totalPrice.toFixed(2)}</strong></span>
                <span className={`payment-status ${order.isPaid ? 'paid' : 'unpaid'}`}>
                  {order.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
