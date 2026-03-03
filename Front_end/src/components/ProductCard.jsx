import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.countInStock === 0) {
      toast.error('Out of stock');
      return;
    }
    addToCart(product, 1);
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.image} alt={product.name} />
        {product.countInStock === 0 && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
      </div>
      <div className="product-card-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <FiStar className="star-icon" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="review-count">({product.numReviews})</span>
        </div>
        <div className="product-card-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="add-cart-btn"
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </Link>
  );
}
