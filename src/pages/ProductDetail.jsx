import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import products from "../data/products.json";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = products.find(p => p.id == id);

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <h2>❌ Producto no encontrado</h2>
          <p>Lo sentimos, el producto que buscas no existe.</p>
          <button onClick={() => navigate("/products")} className="back-button">
            Volver a Productos
          </button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock));
    setQuantity(value);
  };

  const handleAddToCart = async () => {
    if (!user) {
      addToast("Debes iniciar sesión para agregar al carrito", "warning", 3000);
      navigate("/login");
      return;
    }

    setIsAdding(true);
    
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    addToast(`${quantity} ${quantity === 1 ? "producto" : "productos"} agregado(s) al carrito`, "success");
    setIsAdding(false);
    setTimeout(() => setQuantity(1), 300);
  };

  const outOfStock = product.stock <= 0;

  return (
    <div className="product-detail-container">
      <button onClick={() => navigate("/products")} className="back-link">
        ← Volver a Productos
      </button>

      <div className="product-detail">
        <div className="product-image-section">
          <div className="product-image">
            <img
              src={product.image}
              alt={product.name}
              onError={(e) => e.target.src = "https://via.placeholder.com/400"}
            />
          </div>
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="stock-badge">
              {outOfStock ? (
                <span className="out-of-stock">Sin stock</span>
              ) : product.stock <= 5 ? (
                <span className="low-stock">Solo {product.stock} disponibles</span>
              ) : (
                <span className="in-stock">En stock</span>
              )}
            </div>
          </div>

          <div className="product-price">
            <span className="price">S/ {product.price.toFixed(2)}</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-details-info">
            <div className="detail-item">
              <span className="detail-label">Stock disponible:</span>
              <span className="detail-value">{product.stock} unidades</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Envío:</span>
              <span className="detail-value">S/ 10.00 a nivel nacional</span>
            </div>
          </div>

          <div className="product-quantity-section">
            <label htmlFor="quantity">Cantidad:</label>
            <div className="quantity-control">
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="quantity-input"
                disabled={outOfStock || isAdding}
              />
              <div className="quantity-buttons">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="qty-btn"
                  disabled={quantity <= 1 || outOfStock || isAdding}
                >
                  −
                </button>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="qty-btn"
                  disabled={quantity >= product.stock || outOfStock || isAdding}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              className="add-to-cart-button"
              disabled={outOfStock || isAdding}
            >
              {isAdding ? "Agregando..." : "🛒 Agregar al carrito"}
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="view-cart-button"
            >
              Ver carrito
            </button>
          </div>

          {!user && (
            <div className="login-prompt">
              <p>⚠️ Debes <strong>iniciar sesión</strong> para agregar productos al carrito</p>
            </div>
          )}

          <div className="product-policies">
            <div className="policy-item">
              <span className="policy-icon">🔄</span>
              <span>Cambios y devoluciones dentro de 30 días</span>
            </div>
            <div className="policy-item">
              <span className="policy-icon">🛡️</span>
              <span>Compra segura y protegida</span>
            </div>
            <div className="policy-item">
              <span className="policy-icon">⚡</span>
              <span>Envío rápido a todo el país</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}