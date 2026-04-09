import { useState } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products() {
  const [search, setSearch] = useState("");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: "20px",
          padding: "10px",
          width: "80%"
        }}
      />

      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}