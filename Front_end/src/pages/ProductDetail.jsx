import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiArrowLeft, FiMinus, FiPlus } from 'react-icons/fi';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        toast.error('Product not found');
        navigate('/');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`Added ${qty} item(s) to cart!`);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to write a review');
      return navigate('/login');
    }
    setSubmitting(true);
    try {
      await api.post(`/products/${id}/reviews`, { rating, comment });
      toast.success('Review submitted!');
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setComment('');
      setRating(5);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting review');
    }
    setSubmitting(false);
  };

  if (loading) return <Spinner />;
  if (!product) return null;

  return (
    <div className="container product-detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="product-rating large">
            <FiStar className="star-icon" />
            <span>{product.rating.toFixed(1)}</span>
            <span className="review-count">({product.numReviews} reviews)</span>
          </div>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-desc">{product.description}</p>
          <p className="product-brand">Brand: <strong>{product.brand}</strong></p>

          <div className="product-stock">
            {product.countInStock > 0 ? (
              <span className="in-stock">In Stock ({product.countInStock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          {product.countInStock > 0 && (
            <div className="product-actions">
              <div className="qty-selector">
                <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>
                  <FiMinus />
                </button>
                <span>{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                  disabled={qty >= product.countInStock}
                >
                  <FiPlus />
                </button>
              </div>
              <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                <FiShoppingCart /> Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {product.reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="reviews-list">
            {product.reviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header">
                  <strong>{review.name}</strong>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
                <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="review-form-container">
          <h3>Write a Review</h3>
          <form className="review-form" onSubmit={handleReview}>
            <div className="form-group">
              <label>Rating</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Terrible</option>
              </select>
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
