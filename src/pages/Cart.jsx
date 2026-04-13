import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, getTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  if (!user) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>🔐 Debes iniciar sesión</h2>
          <p>Para acceder a tu carrito, primero inicia sesión en tu cuenta.</p>
          <Link to="/login" className="cart-link-button">Iniciar sesión</Link>
        </div>
      </div>
    );
  }

  const total = getTotal();
  const shipping = cart.length > 0 ? 10 : 0;
  const subtotal = total;
  const finalTotal = subtotal + shipping;

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simular procesamiento de pago
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addToast("¡Pago exitoso! Gracias por tu compra.", "success", 4000);
    clearCart();
    setIsProcessing(false);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>🛒 Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu compra.</p>
          <Link to="/products" className="cart-link-button">Ver Productos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Mi Carrito</h1>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image-placeholder">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => e.target.src = "https://via.placeholder.com/80"}
                />
              </div>

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">S/ {item.price.toFixed(2)}</p>
                {item.stock && (
                  <p className="item-stock">Stock disponible: {item.stock}</p>
                )}
              </div>

              <div className="item-quantity">
                <button 
                  onClick={() => decrementQuantity(item.id)}
                  className="quantity-btn"
                >
                  −
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                  onClick={() => incrementQuantity(item.id, item.stock)}
                  className="quantity-btn"
                  disabled={item.quantity >= (item.stock || 999)}
                >
                  +
                </button>
              </div>

              <div className="item-total">
                <p>S/ {(item.price * item.quantity).toFixed(2)}</p>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="item-remove"
                title="Eliminar del carrito"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen del pedido</h2>

          <div className="summary-row">
            <span>Subtotal ({cart.length} items):</span>
            <span>S/ {subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Envío:</span>
            <span>S/ {shipping.toFixed(2)}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <strong>Total:</strong>
            <strong>S/ {finalTotal.toFixed(2)}</strong>
          </div>

          <button 
            onClick={handleCheckout}
            className="checkout-button"
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando..." : "Proceder al pago"}
          </button>

          <Link to="/products" className="continue-shopping">
            Continuar comprando
          </Link>

          <button 
            onClick={clearCart}
            className="clear-cart-button"
            disabled={isProcessing}
          >
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}