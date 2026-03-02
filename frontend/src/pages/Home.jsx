import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { FiFilter } from 'react-icons/fi';

const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (keyword) params.keyword = keyword;
        if (activeCategory !== 'All') params.category = activeCategory;
        const { data } = await api.get('/products', { params });
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [keyword, activeCategory]);

  return (
    <div className="home-page">
      {!keyword && (
        <section className="hero">
          <div className="hero-content">
            <h1>Discover Amazing Products</h1>
            <p>Shop the latest trends with unbeatable prices and fast delivery.</p>
          </div>
        </section>
      )}

      <div className="container">
        {keyword && (
          <h2 className="search-results-title">
            Search results for "<span>{keyword}</span>"
          </h2>
        )}

        <div className="category-filter">
          <FiFilter className="filter-icon" />
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : products.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
