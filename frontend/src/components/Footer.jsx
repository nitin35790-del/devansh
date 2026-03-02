import { FiPackage, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <FiPackage />
          <span>ShopVerse</span>
        </div>
        <p className="footer-text">Your one-stop shop for everything you love.</p>
        <div className="footer-links">
          <a href="#"><FiGithub /></a>
          <a href="#"><FiTwitter /></a>
          <a href="#"><FiInstagram /></a>
        </div>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} ShopVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}
