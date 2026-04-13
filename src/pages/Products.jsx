import { useState } from "react";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "price-asc") {
      return a.price - b.price;
    } else if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        <p>Descubre nuestras mejores prendas urbanas</p>
      </div>

      <div className="products-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="sort-container">
          <label htmlFor="sort">Ordenar por:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Nombre (A-Z)</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
          </select>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div className="no-products">
          <p>No hay productos que coincidan con tu búsqueda.</p>
          <button onClick={() => setSearch("")} className="clear-search">
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="products-info">
          <p>Mostrando {sorted.length} de {products.length} productos</p>
        </div>
      )}

      <div className="grid">
        {sorted.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}