import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { getTotalItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-text">CatoModa</span>
      </Link>

      <button 
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        ☰
      </button>

      <div className={`navbar-content ${mobileMenuOpen ? "active" : ""}`}>
        <div className="navbar-links">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Inicio</Link>
          <Link to="/products" onClick={() => setMobileMenuOpen(false)}>Productos</Link>
          <Link to="/cart" className="cart-link" onClick={() => setMobileMenuOpen(false)}>
            🛒 Carrito
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
        </div>

        <div className="navbar-user">
          {user ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setShowMenu(!showMenu)}
              >
                👤 {user.name}
              </button>
              {showMenu && (
                <div className="user-dropdown">
                  <div className="user-email">{user.email}</div>
                  <button onClick={handleLogout} className="logout-button">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}