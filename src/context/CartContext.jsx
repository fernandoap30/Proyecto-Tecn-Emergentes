import { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Escuchar cambios en el usuario desde localStorage
  useEffect(() => {
  if (user) {
    setCurrentUser(user);
    loadCartForUser(user.email);
  } else {
    setCurrentUser(null);
    setCart([]);
  }

  setIsLoading(false);
  }, [user]);

  // Cargar carrito del usuario desde localStorage
  const loadCartForUser = (email) => {
    const cartKey = `cart_${email}`;
    const savedCart = localStorage.getItem(cartKey);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error cargando carrito:", error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
    setIsLoading(false);
  };

  // Guardar carrito en localStorage bajo el usuario actual
  useEffect(() => {
    if (!isLoading && currentUser) {
      const cartKey = `cart_${currentUser.email}`;
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, isLoading, currentUser]);

  // Monitorear cambios de usuario (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          if (!currentUser || currentUser.email !== userData.email) {
            setCurrentUser(userData);
            loadCartForUser(userData.email);
          }
        } catch (error) {
          console.error("Error en storage change:", error);
        }
      } else {
        if (currentUser) {
          setCurrentUser(null);
          setCart([]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [currentUser]);

  const addToCart = (product, quantity = 1) => {
    if (!currentUser) {
      return false; // Indicar que no hay usuario
    }

    const exist = cart.find(item => item.id === product.id);

    if (exist) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { 
              ...item, 
              quantity: Math.min(item.quantity + quantity, item.stock || 999)
            }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: Math.min(quantity, product.stock || 999) }]);
    }
    return true;
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const incrementQuantity = (id, stock) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.min(item.quantity + 1, stock || 999) }
        : item
    ));
  };

  const decrementQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getTotal,
        getTotalItems,
        isLoading,
        currentUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
};