import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      addToast("Debes iniciar sesión para agregar al carrito", "warning", 3000);
      navigate("/login");
      return;
    }

    const success = addToCart(product);
    if (success) {
      addToast(`${product.name} agregado al carrito`, "success");
    }
  };

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <div className="card">
      <div className="card-image">
        <img
          src={product.image}
          alt={product.name}
          onError={(e) => e.target.src = "https://via.placeholder.com/250"}
        />
        {isOutOfStock && <div className="stock-overlay">Sin stock</div>}
        {isLowStock && !isOutOfStock && (
          <div className="stock-warning">Solo {product.stock} disponibles</div>
        )}
      </div>

      <div className="card-content">
        <h3>{product.name}</h3>
        <p className="card-price">S/ {product.price.toFixed(2)}</p>

        <div className="card-actions">
          <button
            onClick={handleAddToCart}
            className="btn-add-cart"
            disabled={isOutOfStock}
            title={isOutOfStock ? "Producto sin stock" : "Agregar al carrito"}
          >
            {isOutOfStock ? "Sin stock" : "🛒 Agregar"}
          </button>
          <Link to={`/product/${product.id}`} className="btn-view-detail">
            Ver
          </Link>
        </div>
      </div>
    </div>
  );
}