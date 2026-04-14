import initialProducts from "../data/products.json";

const PRODUCTS_KEY = "products_db";

// Inicializar productos si no existen
export function initProducts() {
  const existing = localStorage.getItem(PRODUCTS_KEY);
  if (!existing) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
}

// Obtener productos
export function getProducts() {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
}

// Guardar productos
export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

// Actualizar stock después de compra
export function updateStock(cart) {
  const products = getProducts();

  const updated = products.map(prod => {
    const item = cart.find(c => c.id === prod.id);
    if (item) {
      return {
        ...prod,
        stock: Math.max(0, prod.stock - item.quantity)
      };
    }
    return prod;
  });

  saveProducts(updated);
}