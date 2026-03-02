import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import api from '../api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
      }));

      await api.post('/orders', {
        orderItems,
        shippingAddress: shipping,
        paymentMethod: 'Cash on Delivery',
        totalPrice: cartTotal,
      });

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error placing order');
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-section">
            <h2><FiMapPin /> Shipping Address</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={shipping.fullName} onChange={handleChange} required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={shipping.address} onChange={handleChange} required placeholder="123 Main Street" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" value={shipping.city} onChange={handleChange} required placeholder="New York" />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input type="text" name="postalCode" value={shipping.postalCode} onChange={handleChange} required placeholder="10001" />
              </div>
            </div>
            <div className="form-group">
              <label>Country</label>
              <input type="text" name="country" value={shipping.country} onChange={handleChange} required placeholder="United States" />
            </div>
          </div>

          <div className="checkout-section">
            <h2><FiCreditCard /> Payment Method</h2>
            <div className="payment-option selected">
              <FiCheck /> Cash on Delivery
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order - $${cartTotal.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Items</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="checkout-item-name">{item.name}</p>
                <p className="checkout-item-qty">{item.qty} x ${item.price.toFixed(2)}</p>
              </div>
              <span>${(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
