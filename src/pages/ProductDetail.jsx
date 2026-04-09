import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = products.find(p => p.id == id);

  if (!product) return <h2>Producto no encontrado</h2>;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <img src={product.image} style={{ width: "300px" }} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>S/ {product.price}</h3>

      <button onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
}