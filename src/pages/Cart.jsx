import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carrito</h2>

      {cart.map(item => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <p>
            {item.name} - S/ {item.price} x {item.quantity}
          </p>
          <button onClick={() => removeFromCart(item.id)}>
            Eliminar
          </button>
        </div>
      ))}

      <h3>Total: S/ {total}</h3>
    </div>
  );
}