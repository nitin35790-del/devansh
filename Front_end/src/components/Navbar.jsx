import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX, FiPackage, FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?keyword=${search.trim()}`);
      setSearch('');
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <FiPackage />
          <span>ShopVerse</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/cart" className="nav-link cart-link" onClick={() => setMenuOpen(false)}>
            <FiShoppingCart />
            <span>Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="nav-link" onClick={() => setMenuOpen(false)}>
                <FiPackage />
                <span>Orders</span>
              </Link>
              <Link to="/profile" className="nav-link" onClick={() => setMenuOpen(false)}>
                <FiUser />
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              <FiUser />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
