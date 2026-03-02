import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      return navigate('/login');
    }
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container empty-cart">
        <FiShoppingBag className="empty-cart-icon" />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <Link to={`/product/${item._id}`} className="cart-item-name">{item.name}</Link>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))} disabled={item.qty <= 1}>
                  <FiMinus />
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQty(item._id, Math.min(item.countInStock, item.qty + 1))}
                  disabled={item.qty >= item.countInStock}
                >
                  <FiPlus />
                </button>
              </div>
              <span className="cart-item-subtotal">${(item.price * item.qty).toFixed(2)}</span>
              <button className="cart-item-remove" onClick={() => removeFromCart(item._id)}>
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({cartItems.reduce((a, i) => a + i.qty, 0)})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-shipping">Free</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block" onClick={handleCheckout}>
            Proceed to Checkout <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
