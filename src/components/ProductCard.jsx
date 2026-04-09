import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} />
      <h3>{product.name}</h3>
      <p>S/ {product.price}</p>
      <Link to={`/product/${product.id}`} className="btn">
        Ver producto
      </Link>
    </div>
  );
}